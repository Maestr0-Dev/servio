"use client";

import {
  Phone,
  MessageSquare,
  MessageCircle,
  Megaphone,
  Settings,
  Shield,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const icons = [
  { icon: Phone, color: "text-blue-600", bg: "bg-blue-50" },
  { icon: MessageSquare, color: "text-sky-600", bg: "bg-sky-50" },
  { icon: MessageCircle, color: "text-emerald-600", bg: "bg-emerald-50" },
  { icon: Megaphone, color: "text-amber-600", bg: "bg-amber-50" },
  { icon: Settings, color: "text-violet-600", bg: "bg-violet-50" },
  { icon: Shield, color: "text-rose-600", bg: "bg-rose-50" },
];

export default function Features() {
  const { t } = useLanguage();

  return (
    <section className="w-full max-w-5xl mx-auto py-20 px-4">
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
        {t.features.title}
      </h2>
      <p className="text-center text-gray-500 mb-14 max-w-2xl mx-auto text-lg">
        {t.features.subtitle}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {t.features.items.map((feature, i) => {
          const { icon: Icon, color, bg } = icons[i];
          return (
            <div
              key={feature.title}
              className="p-6 rounded-2xl border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-200 bg-white"
            >
              <div
                className={`w-12 h-12 rounded-xl ${bg} flex items-center justify-center mb-4`}
              >
                <Icon className={`w-6 h-6 ${color}`} strokeWidth={1.8} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
