"use client";

import WaitlistForm from "./WaitlistForm";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="w-full max-w-4xl mx-auto text-center py-28 px-4">
      <div className="inline-flex items-center px-4 py-1.5 mb-8 text-sm font-medium text-gray-700 bg-gray-100 rounded-full">
        {t.hero.badge}
      </div>
      <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight leading-tight">
        {t.hero.title1}
        <br />
        <span className="bg-gradient-to-r from-gray-900 via-gray-600 to-gray-400 bg-clip-text text-transparent">
          {t.hero.title2}
        </span>
      </h1>
      <p className="text-lg md:text-xl text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed">
        {t.hero.description}
      </p>
      <div className="mb-6">
        <WaitlistForm />
      </div>
      <p className="text-sm text-gray-400">{t.hero.waitlistNote}</p>
    </section>
  );
}
