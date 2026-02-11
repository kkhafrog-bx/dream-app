export type Locale =
  | "ko"
  | "en"
  | "ja"
  | "zh"
  | "ar"
  | "vi"
  | "th"
  | "id"
  | "ru"
  | "fr"
  | "de"
  | "hi";

export const SUPPORTED_LOCALES: Locale[] = [
  "ko",
  "en",
  "ja",
  "zh",
  "ar",
  "vi",
  "th",
  "id",
  "ru",
  "fr",
  "de",
  "hi",
];

export function detectBrowserLocale(): Locale {
  if (typeof window === "undefined") return "en";
  const lang = navigator.language || (navigator as any).userLanguage || "";
  const code = lang.toLowerCase().split("-")[0];
  const map: Record<string, Locale> = {
    ko: "ko",
    en: "en",
    ja: "ja",
    zh: "zh",
    ar: "ar",
    vi: "vi",
    th: "th",
    id: "id",
    ru: "ru",
    fr: "fr",
    de: "de",
    hi: "hi",
  };
  return map[code] ?? "en";
}

export function isRTL(locale: Locale): boolean {
  return locale === "ar";
}

const localeContent = {
  ko: {
    label: "한국어",
    brand: "kkhafrog v1.0",
    title: "당신의 꿈을 섬세하게 해석해 드려요",
    description:
      "전 세계 어디서든, 어느 시간대든, 밤사이 꾸었던 꿈을 적어 주시면 상징과 감정을 중심으로 부드럽게 풀어 드립니다.",
    sectionTitle: "꿈 내용을 자유롭게 적어 주세요",
    hint: "언제, 어디서, 누구와 있었는지, 기억나는 장면을 최대한 자세히 써 줄수록 분석이 더 풍부해져요.",
    placeholder:
      "(예시) 새벽 3시쯤 끝없이 이어진 보라색 숲길을 혼자 걷고 있었어요. 나무 사이사이에서 금빛 불꽃이 천천히 떠올랐고, 멀리서 누군가 제 이름을 부르는 소리가 들렸어요...",
    badge: "다국어 입력 지원",
    disclaimer:
      "해석은 참고용일 뿐이며, 사용자의 현재 마음 상태를 이해하는 데 초점을 맞춥니다.",
    button: "꿈 분석하기",
    buttonLoading: "분석 중…",
    resultTitle: "꿈 해석 결과",
    resultPlaceholder:
      "위에 꿈 내용을 적고 '꿈 분석하기' 버튼을 누르면, 이곳에 정리한 꿈 해석 결과가 나타납니다.",
    chars: (n: number) => `${n}자`,
    errors: {
      analyzeFailed: "분석 요청에 실패했습니다.",
      noResult: "결과를 불러오지 못했습니다.",
      network: "네트워크 오류가 발생했습니다.",
    },
  },
  en: {
    label: "English",
    brand: "kkhafrog v1.0",
    title: "Interpreting Your Dreams with Care",
    description:
      "Wherever you are, whenever it is. Write down the dream you had last night, and we will gently unpack its symbols and emotions for you.",
    sectionTitle: "Write your dream freely",
    hint: "The more detail you provide—when, where, who you were with, and what you remember—the richer the analysis will be.",
    placeholder:
      "(Example) I was walking alone through an endless purple forest around 3am. Golden flames slowly rose between the trees, and I heard someone calling my name from far away...",
    badge: "Multilingual Input",
    disclaimer:
      "Interpretations are for reference only, focusing on understanding your current state of mind.",
    button: "Analyze Dream",
    buttonLoading: "Analyzing…",
    resultTitle: "Dream Interpretation Result",
    resultPlaceholder:
      "Enter your dream above and press 'Analyze Dream'. Your interpreted result will appear here.",
    chars: (n: number) => `${n} chars`,
    errors: {
      analyzeFailed: "Analysis request failed.",
      noResult: "Could not load the result.",
      network: "A network error occurred.",
    },
  },
  ja: {
    label: "日本語",
    brand: "kkhafrog v1.0",
    title: "あなたの夢を丁寧に解釈します",
    description:
      "世界中のどこでも、いつでも。夜に見た夢を書き留めてください。象徴と感情を中心に、優しく読み解きます。",
    sectionTitle: "夢の内容を自由に書いてください",
    hint: "いつ、どこで、誰といたか、思い出せる場面をできるだけ詳しく書くほど、分析がより豊かになります。",
    placeholder:
      "（例）深夜3時頃、果てしなく続く紫色の森を一人で歩いていました。木々の間から黄金の炎がゆっくりと浮かび上がり、遠くから誰かが私の名前を呼ぶ声が聞こえました...",
    badge: "多言語入力対応",
    disclaimer:
      "解釈は参考用であり、現在の心の状態を理解することに焦点を当てています。",
    button: "夢を分析する",
    buttonLoading: "分析中…",
    resultTitle: "夢の解釈結果",
    resultPlaceholder:
      "上に夢の内容を入力して「夢を分析する」ボタンを押すと、こちらに解釈結果が表示されます。",
    chars: (n: number) => `${n}文字`,
    errors: {
      analyzeFailed: "分析リクエストに失敗しました。",
      noResult: "結果を取得できませんでした。",
      network: "ネットワークエラーが発生しました。",
    },
  },
  zh: {
    label: "简体中文",
    brand: "kkhafrog v1.0",
    title: "为您悉心解读梦境",
    description:
      "无论何时何地。只需写下您昨夜的梦境，我们将结合象征与情感，为您带来温柔的解惑。",
    sectionTitle: "请自由描述您的梦境",
    hint: "描写得越详细（如时间、地点、人物及难忘的场景），解析结果就会越丰富。",
    placeholder:
      "（例如）凌晨3点左右，我独自走在一条无尽的紫色森林小路上。树木间缓缓升起金色的火焰，远处隐约听到有人在呼唤我的名字...",
    badge: "支持多语言输入",
    disclaimer: "解读结果仅供参考，旨在帮助您更好地理解当前的心理状态。",
    button: "开始解析梦境",
    buttonLoading: "解析中...",
    resultTitle: "梦境解析结果",
    resultPlaceholder:
      "在上方输入梦境内容并点击“开始解析梦境”按钮，此处将为您展示整理后的解析结果。",
    chars: (n: number) => `${n}字`,
    errors: {
      analyzeFailed: "解析请求失败。",
      noResult: "无法获取解析结果。",
      network: "发生网络错误。",
    },
  },
  ar: {
    label: "العربية",
    brand: "kkhafrog v1.0",
    title: "تفسير أحلامك بدقة",
    description:
      "أينما كنت، ومتى كان ذلك. اكتب الحلم الذي رأيته الليلة الماضية، وسنقوم بفك رموزه وعواطفه بلطف من أجلك.",
    sectionTitle: "اكتب حلمك بحرية",
    hint: "كلما زادت التفاصيل التي تقدمها - متى وأين ومع من كنت وما تتذكره - أصبح التحليل أغنى.",
    placeholder:
      "(مثال) كنت أسير وحدي في غابة بنفسجية لا نهاية لها حوالي الساعة الثالثة صباحاً. ارتفعت ألسنة نار ذهبية ببطء بين الأشجار، وسمعت شخصاً ينادي اسمي من بعيد...",
    badge: "متعدد اللغات",
    disclaimer:
      "التفسيرات للمرجعية فقط، وتركز على فهم حالتك الذهنية الحالية.",
    button: "تحليل الحلم",
    buttonLoading: "جاري التحليل…",
    resultTitle: "نتيجة تفسير الحلم",
    resultPlaceholder:
      "أدخل حلمك أعلاه واضغط على 'تحليل الحلم'. ستظهر النتيجة هنا.",
    chars: (n: number) => `${n} حرف`,
    errors: {
      analyzeFailed: "فشل طلب التحليل.",
      noResult: "تعذر تحميل النتيجة.",
      network: "حدث خطأ في الشبكة.",
    },
  },
  vi: {
    label: "Tiếng Việt",
    brand: "kkhafrog v1.0",
    title: "Giải mã giấc mơ của bạn",
    description:
      "Dù bạn ở đâu, bất cứ lúc nào. Hãy viết ra giấc mơ đêm qua, và chúng tôi sẽ nhẹ nhàng giúp bạn hiểu biểu tượng và cảm xúc trong đó.",
    sectionTitle: "Viết giấc mơ của bạn tự do",
    hint: "Càng chi tiết - khi nào, ở đâu, cùng ai, bạn nhớ gì - thì phân tích càng phong phú.",
    placeholder:
      "(Ví dụ) Khoảng 3 giờ sáng, tôi đi bộ một mình qua khu rừng tím vô tận. Những ngọn lửa vàng từ từ bay lên giữa các cây, và tôi nghe ai đó gọi tên tôi từ xa...",
    badge: "Đa ngôn ngữ",
    disclaimer:
      "Giải thích chỉ mang tính tham khảo, tập trung vào việc hiểu trạng thái tâm lý hiện tại của bạn.",
    button: "Phân tích giấc mơ",
    buttonLoading: "Đang phân tích…",
    resultTitle: "Kết quả giải mã giấc mơ",
    resultPlaceholder:
      "Nhập giấc mơ ở trên và nhấn 'Phân tích giấc mơ'. Kết quả sẽ hiển thị tại đây.",
    chars: (n: number) => `${n} ký tự`,
    errors: {
      analyzeFailed: "Yêu cầu phân tích thất bại.",
      noResult: "Không thể tải kết quả.",
      network: "Đã xảy ra lỗi mạng.",
    },
  },
  th: {
    label: "ไทย",
    brand: "kkhafrog v1.0",
    title: "ตีความความฝันของคุณอย่างละเอียด",
    description:
      "ไม่ว่าคุณจะอยู่ที่ไหน เมื่อไหร่ เขียนความฝันที่คุณฝันเมื่อคืน และเราจะช่วยตีความสัญลักษณ์และอารมณ์ให้คุณอย่างอ่อนโยน",
    sectionTitle: "เขียนความฝันของคุณอย่างอิสระ",
    hint: "ยิ่งรายละเอียดมาก เมื่อไหร่ ที่ไหน กับใคร คุณจำอะไรได้บ้าง การวิเคราะห์ยิ่งสมบูรณ์",
    placeholder:
      "(ตัวอย่าง) ประมาณตี 3 ฉันเดินอยู่คนเดียวผ่านป่าสีม่วงที่ไม่มีที่สิ้นสุด เปลวไฟสีทองค่อยๆ ลอยขึ้นระหว่างต้นไม้ และฉันได้ยินมีคนเรียกชื่อฉันจากที่ไกล...",
    badge: "หลายภาษา",
    disclaimer:
      "การตีความใช้เพื่ออ้างอิงเท่านั้น มุ่งเน้นการเข้าใจสภาวะจิตใจปัจจุบันของคุณ",
    button: "วิเคราะห์ความฝัน",
    buttonLoading: "กำลังวิเคราะห์…",
    resultTitle: "ผลการตีความความฝัน",
    resultPlaceholder:
      "กรอกความฝันด้านบนแล้วกดปุ่ม 'วิเคราะห์ความฝัน' ผลลัพธ์จะแสดงที่นี่",
    chars: (n: number) => `${n} อักขระ`,
    errors: {
      analyzeFailed: "คำขอวิเคราะห์ล้มเหลว",
      noResult: "ไม่สามารถโหลดผลลัพธ์ได้",
      network: "เกิดข้อผิดพลาดเครือข่าย",
    },
  },
  id: {
    label: "Bahasa Indonesia",
    brand: "kkhafrog v1.0",
    title: "Menafsirkan Mimpi Anda dengan Saksama",
    description:
      "Di mana pun Anda berada, kapan pun. Tuliskan mimpi yang Anda alami semalam, dan kami akan membantu Anda menguraikan simbol-simbolnya dengan lembut.",
    sectionTitle: "Tulis mimpi Anda secara bebas",
    hint: "Semakin detail - kapan, di mana, dengan siapa, apa yang Anda ingat - semakin kaya analisisnya.",
    placeholder:
      "(Contoh) Sekitar jam 3 pagi, saya berjalan sendirian melalui hutan ungu yang tak berujung. Api emas perlahan naik di antara pepohonan, dan saya mendengar seseorang memanggil nama saya dari jauh...",
    badge: "Multibahasa",
    disclaimer:
      "Tafsiran hanya sebagai referensi, berfokus pada pemahaman keadaan pikiran Anda saat ini.",
    button: "Analisis Mimpi",
    buttonLoading: "Menganalisis…",
    resultTitle: "Hasil Tafsiran Mimpi",
    resultPlaceholder:
      "Masukkan mimpi di atas dan tekan 'Analisis Mimpi'. Hasilnya akan muncul di sini.",
    chars: (n: number) => `${n} karakter`,
    errors: {
      analyzeFailed: "Permintaan analisis gagal.",
      noResult: "Tidak dapat memuat hasil.",
      network: "Terjadi kesalahan jaringan.",
    },
  },
  ru: {
    label: "Русский",
    brand: "kkhafrog v1.0",
    title: "Интерпретация ваших снов",
    description:
      "Где бы вы ни были, когда бы ни было. Запишите сон, который вам приснился прошлой ночью, и мы бережно расшифруем его символы и эмоции для вас.",
    sectionTitle: "Опишите ваш сон свободно",
    hint: "Чем больше деталей — когда, где, с кем вы были, что помните — тем богаче анализ.",
    placeholder:
      "(Пример) Около 3 часов ночи я шёл один через бесконечный фиолетовый лес. Золотые огни медленно поднимались между деревьями, и я услышал, как кто-то зовёт меня по имени издалека...",
    badge: "Мультиязычность",
    disclaimer:
      "Интерпретации носят справочный характер и сосредоточены на понимании вашего текущего психического состояния.",
    button: "Анализировать сон",
    buttonLoading: "Анализ…",
    resultTitle: "Результат интерпретации сна",
    resultPlaceholder:
      "Введите сон выше и нажмите «Анализировать сон». Результат появится здесь.",
    chars: (n: number) => `${n} симв.`,
    errors: {
      analyzeFailed: "Запрос на анализ не удался.",
      noResult: "Не удалось загрузить результат.",
      network: "Произошла сетевая ошибка.",
    },
  },
  fr: {
    label: "Français",
    brand: "kkhafrog v1.0",
    title: "Interprétation de vos rêves avec soin",
    description:
      "Où que vous soyez, à tout moment. Notez le rêve que vous avez fait la nuit dernière, et nous déroulerons doucement ses symboles et émotions pour vous.",
    sectionTitle: "Écrivez votre rêve librement",
    hint: "Plus vous donnez de détails — quand, où, avec qui, ce que vous vous souvenez — plus l'analyse sera riche.",
    placeholder:
      "(Exemple) Vers 3h du matin, je marchais seul dans une forêt violette sans fin. Des flammes dorées s'élevaient lentement entre les arbres, et j'ai entendu quelqu'un m'appeler de loin...",
    badge: "Multilingue",
    disclaimer:
      "Les interprétations sont à titre indicatif uniquement, axées sur la compréhension de votre état d'esprit actuel.",
    button: "Analyser le rêve",
    buttonLoading: "Analyse en cours…",
    resultTitle: "Résultat d'interprétation du rêve",
    resultPlaceholder:
      "Entrez votre rêve ci-dessus et appuyez sur « Analyser le rêve ». Votre résultat apparaîtra ici.",
    chars: (n: number) => `${n} caractères`,
    errors: {
      analyzeFailed: "La demande d'analyse a échoué.",
      noResult: "Impossible de charger le résultat.",
      network: "Une erreur réseau s'est produite.",
    },
  },
  de: {
    label: "Deutsch",
    brand: "kkhafrog v1.0",
    title: "Ihre Träume einfühlsam gedeutet",
    description:
      "Egal wo Sie sind, egal zu welcher Zeit. Beschreiben Sie Ihren Traum der letzten Nacht, und wir werden Symbole und Emotionen behutsam für Sie entschlüsseln.",
    sectionTitle: "Beschreiben Sie Ihren Traum ganz frei",
    hint: "Je mehr Details – wann, wo, mit wem und an welche Szenen Sie sich erinnern – desto reichhaltiger wird die Analyse.",
    placeholder:
      "(Beispiel) Gegen 3 Uhr morgens ging ich allein durch einen endlosen violetten Wald. Goldene Flammen stiegen langsam zwischen den Bäumen auf, und von weitem hörte ich jemanden meinen Namen rufen...",
    badge: "Mehrsprachige Eingabe möglich",
    disclaimer:
      "Deutungen dienen nur als Referenz und konzentrieren sich darauf, Ihren aktuellen Geisteszustand zu verstehen.",
    button: "Traum analysieren",
    buttonLoading: "Analyse läuft…",
    resultTitle: "Ergebnis der Traumdeutung",
    resultPlaceholder:
      "Geben Sie oben Ihren Traum ein und klicken Sie auf 'Traum analysieren'. Das Ergebnis wird hier angezeigt.",
    chars: (n: number) => `${n} Zeichen`,
    errors: {
      analyzeFailed: "Analyse-Anfrage fehlgeschlagen.",
      noResult: "Ergebnis konnte nicht geladen werden.",
      network: "Ein Netzwerkfehler ist aufgetreten.",
    },
  },
  hi: {
    label: "हिन्दी",
    brand: "kkhafrog v1.0",
    title: "आपके सपनों की गहराई से व्याख्या",
    description:
      "आप कहीं भी हों, किसी भी समय। पिछली रात आपने जो सपना देखा था उसे लिखें, और हम आपके लिए उसके प्रतीकों और भावनाओं को सहजता से समझाएंगे।",
    sectionTitle: "अपना सपना खुलकर लिखें",
    hint: "जितना अधिक विवरण—कब, कहाँ, आप किसके साथ थे, और आपको क्या याद है—उतना ही बेहतर विश्लेषण होगा।",
    placeholder:
      "(उदाहरण) सुबह 3 बजे के आसपास मैं एक अंतहीन बैंगनी जंगल में अकेला चल रहा था। पेड़ों के बीच से सुनहरी लपटें धीरे-धीरे उठ रही थीं, और मैंने दूर से किसी को अपना नाम पुकारते सुना...",
    badge: "बहुभाषी इनपुट",
    disclaimer:
      "व्याख्या केवल संदर्भ के लिए है, जिसका उद्देश्य आपकी वर्तमान मानसिक स्थिति को समझना है।",
    button: "सपनों का विश्लेषण करें",
    buttonLoading: "विश्लेषण हो रहा है...",
    resultTitle: "सपना व्याख्या परिणाम",
    resultPlaceholder:
      "ऊपर अपना सपना दर्ज करें और 'सपनों का विश्लेषण करें' दबाएं। आपका परिणाम यहां दिखाई देगा।",
    chars: (n: number) => `${n} वर्ण`,
    errors: {
      analyzeFailed: "विश्लेषण अनुरोध विफल रहा।",
      noResult: "परिणाम लोड नहीं किया जा सका।",
      network: "नेटवर्क त्रुटि हुई।",
    },
  },
};

export const locales: Record<Locale, typeof localeContent.ko> = localeContent;