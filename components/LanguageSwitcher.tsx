"use client";

import { useLang } from "@/lib/i18n/context";
import { Lang } from "@/lib/i18n/translations";

const LANGS: { code: Lang; label: string }[] = [
  { code: "ja", label: "JP" },
  { code: "en", label: "EN" },
  { code: "zh", label: "中" },
];

export default function LanguageSwitcher() {
  const { lang, setLang } = useLang();
  return (
    <div className="flex gap-1">
      {LANGS.map(({ code, label }) => (
        <button
          key={code}
          onClick={() => setLang(code)}
          className={`px-2.5 py-1 rounded-full text-xs font-semibold border transition-colors ${
            lang === code
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-white text-gray-500 border-gray-300 hover:border-blue-400"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
