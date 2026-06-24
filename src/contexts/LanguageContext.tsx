"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Locale, getDictionary, locales, Dictionary } from "@/lib/i18n";

interface LanguageContextType {
  locale: Locale;
  t: Dictionary;
  setLocale: (locale: Locale) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

function detectBrowserLocale(): Locale {
  if (typeof window === "undefined") return "en";
  const browserLang = navigator.language.split("-")[0];
  return locales.includes(browserLang as Locale) ? (browserLang as Locale) : "en";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");
  const [t, setT] = useState<Dictionary>(getDictionary("en"));
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("servio-locale") as Locale | null;
    const initial = saved && locales.includes(saved) ? saved : detectBrowserLocale();
    setLocaleState(initial);
    setT(getDictionary(initial));
    setMounted(true);
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    setT(getDictionary(newLocale));
    localStorage.setItem("servio-locale", newLocale);
  };

  if (!mounted) {
    return (
      <LanguageContext.Provider value={{ locale: "en", t: getDictionary("en"), setLocale }}>
        {children}
      </LanguageContext.Provider>
    );
  }

  return (
    <LanguageContext.Provider value={{ locale, t, setLocale }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
}
