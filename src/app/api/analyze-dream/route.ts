const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";

export async function POST(request: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return new Response(
        JSON.stringify({
          error:
            "Gemini API 키가 설정되어 있지 않습니다. .env.local에 GEMINI_API_KEY를 추가해 주세요."
        }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const { dream, locale } = await request.json();
    if (!dream || typeof dream !== "string") {
      return new Response(
        JSON.stringify({ error: "dream 필드에 꿈 내용을 문자열로 보내 주세요." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const supportedLocales = [
      "ko",
      "en",
      "ja",
      "zh",
      "ar",
      "vi",
      "th",
      "id",
      "ru",
      "fr"
    ];
    const responseLocale =
      typeof locale === "string" && supportedLocales.includes(locale)
        ? locale
        : "en";

    const systemInstruction = `
역할: 당신은 따뜻하고 섬세한 감성을 가진 전문 'AI 꿈해몽가'입니다.

목표:
- 사용자가 적어준 꿈 내용을 바탕으로, 상징과 감정, 반복되는 패턴을 중심으로 의미를 해석합니다.
- 점을 치거나 단정적으로 미래를 예언하지 않습니다.
- 대신 사용자의 현재 마음 상태, 무의식, 고민, 바람 등에 대해 조심스럽게 짚어 줍니다.

응답 형식:
1. 꿈의 핵심 장면 정리 (간단 요약 2~3줄)
2. 상징과 의미 분석 (불, 물, 길, 높이, 인물 관계 등)
3. 감정 중심 해석 (꿈 속에서 느꼈던 감정 위주)
4. 일상에서 생각해 볼 점 (조언 형태로 2~4줄)

[중요 - 언어 처리]
- 사용자가 선택한 UI 언어인 "${responseLocale}"로 반드시 해석 결과를 작성하세요.
- locale: ko=한국어, en=English, ja=日本語, zh=中文, ar=العربية, vi=Tiếng Việt, th=ไทย, id=Bahasa Indonesia, ru=Русский, fr=Français
- 꿈 내용의 언어와 관계없이, 응답은 항상 사용자가 선택한 "${responseLocale}" 언어로 작성하세요.
`;

    const body = {
      contents: [
        {
          parts: [
            {
              text: `${systemInstruction}\n\n---\n사용자가 적어준 꿈 내용:\n${dream}`
            }
          ]
        }
      ]
    };
    // 1) Try ListModels at v1, then fallback to v1beta
    const listEndpoints = [
      `https://generativelanguage.googleapis.com/v1/models?key=${apiKey}`,
      `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`
    ];

    let models: any[] = [];
    let lastListError: any = null;
    for (const url of listEndpoints) {
      try {
        console.log("Requesting ListModels from", url);
        const res = await fetch(url);
        const txt = await res.text();
        if (!res.ok) {
          console.warn("ListModels returned non-ok:", res.status, txt);
          lastListError = { status: res.status, text: txt, url };
          continue;
        }
        const j = JSON.parse(txt);
        models = j.models ?? j;
        if (!Array.isArray(models)) {
          // sometimes response wraps models differently
          models = j.models ?? [];
        }
        if (models.length > 0) break;
      } catch (e) {
        console.error("ListModels fetch error:", e);
        lastListError = e;
      }
    }

    if (!models || models.length === 0) {
      return new Response(
        JSON.stringify({
          error: "generateContent를 지원하는 모델을 찾을 수 없습니다.",
          detail: "ListModels 호출 결과가 비어있습니다.",
          lastListError
        }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    // Build candidate model ids (prioritize gemini models)
    const candidates = models
      .map((m: any) => {
        const name = m.name ?? m.model ?? m;
        // normalize to short id if contains '/'
        const id = typeof name === "string" ? name.split("/").pop() : null;
        return { raw: m, id, name };
      })
      .filter((x: any) => x.id)
      .sort((a: any, b: any) => {
        const aGem = a.id.includes("gemini") ? -1 : 1;
        const bGem = b.id.includes("gemini") ? -1 : 1;
        return aGem - bGem;
      });

    // Limit number of attempts to avoid long loops
    const maxAttempts = Math.min(candidates.length, 6);
    let lastErrorResp: any = null;
    for (let i = 0; i < maxAttempts; i++) {
      const c = candidates[i];
      const modelId = c.id;
      const generateUrl = `https://generativelanguage.googleapis.com/v1/models/${modelId}:generateContent?key=${apiKey}`;
      console.log(`Trying model (${i + 1}/${maxAttempts}):`, modelId, generateUrl);
      try {
        const resp = await fetch(generateUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body)
        });
        const respText = await resp.text();
        console.log("Response status for", modelId, resp.status);
        if (!resp.ok) {
          console.warn("Model call failed:", modelId, resp.status, respText.slice(0, 300));
          lastErrorResp = { modelId, status: resp.status, text: respText };
          // try next model
          continue;
        }
        // parse and extract
        let parsed: any = {};
        try {
          parsed = JSON.parse(respText);
        } catch (e) {
          console.error("Failed to parse generateContent JSON:", e);
          return new Response(
            JSON.stringify({ error: "응답 파싱 실패", raw: respText }),
            { status: 500, headers: { "Content-Type": "application/json" } }
          );
        }
        const candidate = parsed.candidates?.[0] ?? parsed.output?.[0] ?? null;
        const text =
          candidate?.content?.parts?.map((p: any) => p.text).join("\n\n") ??
          candidate?.text ??
          parsed.output?.map((o: any) => o.content)?.join("\n\n") ??
          "해석 결과를 불러오지 못했습니다.";

        return new Response(
          JSON.stringify({
            result: text,
            debug: { modelTried: modelId, preview: JSON.stringify(parsed).slice(0, 200) }
          }),
          { status: 200, headers: { "Content-Type": "application/json" } }
        );
      } catch (e) {
        console.error("Error calling generateContent for", modelId, e);
        lastErrorResp = e;
        continue;
      }
    }

    return new Response(
      JSON.stringify({
        error: "모든 후보 모델에서 generateContent 호출에 실패했습니다.",
        lastError: lastErrorResp,
        tried: candidates.slice(0, maxAttempts).map((c: any) => c.id)
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Analyze dream route error:", error);
    return new Response(
      JSON.stringify({
        error: "꿈 해석 중 알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해 주세요."
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
}