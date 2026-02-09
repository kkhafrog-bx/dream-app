"use client";

import { useState, useEffect, type ReactNode } from "react";
import {
  locales,
  SUPPORTED_LOCALES,
  detectBrowserLocale,
  isRTL,
  type Locale,
} from "@/locales";

function formatResultText(text: string): string {
  return text
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/^\s*\*\s+/gm, "• ")
    .replace(/^\s*-\s+/gm, "• ")
    .replace(/\*/g, "")
    .replace(/\n*---+\n*/g, "\n")
    .replace(/^\-+\s*$/gm, "");
}

function parseResultWithHangingIndent(text: string): ReactNode {
  const formatted = formatResultText(text);
  const lines = formatted.split("\n");
  const nodes: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const match = line.match(/^(\d+)\.\s+(.*)$/);
    if (match) {
      const num = match[1];
      const parts: string[] = [match[2]];
      i++;
      while (i < lines.length && !lines[i].match(/^\d+\.\s+/) && lines[i].trim() !== "") {
        parts.push(lines[i]);
        i++;
      }
      const textContent = parts.join("\n");
      nodes.push(
        <div key={`item-${num}-${nodes.length}`} className="result-item">
          <span className="result-num">{num}.</span>
          <span className="result-text">{textContent}</span>
        </div>
      );
    } else {
      const trimmed = line.trim();
      const isDashesOnly = /^\-+$/.test(trimmed);
      if (trimmed && !isDashesOnly) {
        nodes.push(
          <p key={`p-${i}`} className="result-p">
            {line}
          </p>
        );
      } else if (!isDashesOnly && nodes.length > 0) {
        nodes.push(<br key={`br-${i}`} />);
      }
      i++;
    }
  }
  return <div className="result-content">{nodes}</div>;
}

export default function Home() {
  const [dream, setDream] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [locale, setLocale] = useState<Locale>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setLocale(detectBrowserLocale());
    setMounted(true);
  }, []);

  const t = locales[locale];
  const rtl = isRTL(locale);

  const analyzeDream = async () => {
    if (!dream.trim()) return;
    setError("");
    setLoading(true);
    setResult("");

    try {
      const res = await fetch("/api/analyze-dream", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dream: dream.trim(), locale }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || t.errors.analyzeFailed);
        return;
      }
      if (data.result) setResult(data.result);
      else setError(t.errors.noResult);
    } catch {
      setError(t.errors.network);
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[var(--bg-base)] flex items-center justify-center">
        <div className="dream-font text-white/60">Loading…</div>
      </div>
    );
  }

  return (
    <div dir={rtl ? "rtl" : "ltr"} className={rtl ? "text-right" : ""}>
      <div className="background-layer">
        <div className="gradient-overlay" />
        <div className="grid-layer" />
        <div className="orb purple" />
        <div className="orb pink" />
        <div className="orb yellow" />
      </div>

      <main className="ui-layer w-full max-w-4xl mx-auto px-4 sm:px-6 md:px-8 py-10 sm:py-16 lg:py-24 space-y-12 sm:space-y-16 md:space-y-20">
        <section className="text-center space-y-4 sm:space-y-6">
          <div className="flex justify-end -mt-2 mb-2">
            <div className="btn-dream-wrapper">
              <select
                value={locale}
                onChange={(e) => setLocale(e.target.value as Locale)}
                className="locale-select"
                aria-label="Language"
              >
                {SUPPORTED_LOCALES.map((code) => (
                  <option key={code} value={code}>
                    {locales[code].label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <h1 className="h1-hero">{t.title}</h1>
          <div className="flex flex-wrap items-center justify-between gap-3 text-left">
            <p className="desc flex-1 min-w-0">{t.description}</p>
            <span className="badge-multilang shrink-0">{t.badge}</span>
          </div>
        </section>

        <section className="panel p-5 sm:p-6 md:p-8 space-y-5 sm:space-y-6">
          <div>
            <h2 className="section-title">{t.sectionTitle}</h2>
            <p className="hint mt-1">{t.hint}</p>
          </div>

          <div className="textarea-neon p-4 sm:p-4 flex flex-col">
            <textarea
              value={dream}
              onChange={(e) => setDream(e.target.value)}
              placeholder={t.placeholder}
              rows={10}
              dir={rtl ? "rtl" : "ltr"}
              className="block w-full bg-transparent border-none outline-none resize-none text-[var(--text-main)] text-[15px] sm:text-[15px] leading-relaxed placeholder:text-white/40"
            />
            <div className="flex justify-end mt-1">
              <span className="hint">{t.chars(dream.length)}</span>
            </div>
          </div>

          {error && (
            <p className="hint text-red-400" style={{ fontSize: "13px" }}>
              {error}
            </p>
          )}

          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <span className="hint order-2 sm:order-1">{t.disclaimer}</span>
            <button
              type="button"
              onClick={analyzeDream}
              disabled={loading || !dream.trim()}
              className="primary-btn shrink-0 disabled:opacity-50 disabled:pointer-events-none order-1 sm:order-2 w-full sm:w-auto min-h-[40px] sm:min-h-0 touch-manipulation dream-font"
            >
              {loading ? t.buttonLoading : t.button}
            </button>
          </div>
        </section>

        <section className="panel p-5 sm:p-6 md:p-8">
          <h2 className="section-title mb-4">{t.resultTitle}</h2>

          {!result ? (
            <p className="text-placeholder-same">{t.resultPlaceholder}</p>
          ) : (
            <div className="text-[15px] leading-relaxed text-[var(--text-sub)]">
              {parseResultWithHangingIndent(result)}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
