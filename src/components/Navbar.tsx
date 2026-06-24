"use client";

import { Globe } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { locales, Locale } from "@/lib/i18n";

export default function Navbar() {
  const { t, locale, setLocale } = useLanguage();

  const toggleLocale = () => {
    const next = locales[(locales.indexOf(locale) + 1) % locales.length];
    setLocale(next);
  };

  return (
    <nav className="w-full border-b border-gray-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-gray-900">{t.nav.brand}</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-400 font-medium hidden sm:block">
            {t.nav.tagline}
          </div>
          <button
            onClick={toggleLocale}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            title={t.nav.language}
          >
            <Globe className="w-4 h-4" />
            {locale.toUpperCase()}
          </button>
        </div>
      </div>
    </nav>
  );
}
