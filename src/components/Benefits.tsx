"use client";

import {
  TrendingUp,
  Clock,
  BarChart3,
  DollarSign,
  HeartHandshake,
  Zap,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const iconConfigs = [
  { icon: BarChart3, color: "text-indigo-600", bg: "bg-indigo-50" },
  { icon: Zap, color: "text-amber-600", bg: "bg-amber-50" },
  { icon: DollarSign, color: "text-emerald-600", bg: "bg-emerald-50" },
  { icon: HeartHandshake, color: "text-rose-600", bg: "bg-rose-50" },
  { icon: Clock, color: "text-sky-600", bg: "bg-sky-50" },
  { icon: TrendingUp, color: "text-violet-600", bg: "bg-violet-50" },
];

export default function Benefits() {
  const { t } = useLanguage();

  return (
    <section className="w-full bg-gray-50 py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
          {t.benefits.title}
        </h2>
        <p className="text-center text-gray-500 mb-14 max-w-2xl mx-auto text-lg">
          {t.benefits.subtitle}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {t.benefits.items.map((benefit, i) => {
            const { icon: Icon, color, bg } = iconConfigs[i];
            return (
              <div
                key={benefit.title}
                className="flex gap-5 p-6 rounded-2xl bg-white border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200"
              >
                <div
                  className={`w-12 h-12 rounded-xl ${bg} flex items-center justify-center shrink-0`}
                >
                  <Icon className={`w-6 h-6 ${color}`} strokeWidth={1.8} />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {benefit.title}
                    </h3>
                    <span className="text-xs font-medium text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                      {benefit.stat}
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
