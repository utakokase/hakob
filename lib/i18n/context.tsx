"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Lang, Translations, translations } from "./translations";

type LangContextType = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Translations;
};

const LangContext = createContext<LangContextType>({
  lang: "ja",
  setLang: () => {},
  t: translations.ja,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("ja");

  useEffect(() => {
    const saved = localStorage.getItem("roompass-lang") as Lang | null;
    if (saved && saved in translations) setLangState(saved);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("roompass-lang", l);
  };

  return (
    <LangContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);
