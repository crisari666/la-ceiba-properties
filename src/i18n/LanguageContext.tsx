import React, { createContext, useContext, useState, useCallback } from "react";
import { translations, type Language } from "./translations";

type TranslationsType = typeof translations.es;

interface LanguageContextType {
  lang: Language;
  t: TranslationsType;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>("es");

  const setLang = useCallback((l: Language) => setLangState(l), []);
  const toggleLang = useCallback(() => setLangState((prev) => (prev === "es" ? "en" : "es")), []);

  const t = translations[lang];

  return (
    <LanguageContext.Provider value={{ lang, t, setLang, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
};
