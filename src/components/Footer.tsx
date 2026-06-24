"use client";

import { useLanguage } from "@/contexts/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-gray-100 py-8">
      <div className="max-w-6xl mx-auto px-4 text-center text-sm text-gray-400">
        {t.footer.copyright.replace("{year}", String(year))}
      </div>
    </footer>
  );
}
