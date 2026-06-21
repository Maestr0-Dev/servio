import {
  TrendingUp,
  Clock,
  BarChart3,
  DollarSign,
  HeartHandshake,
  Zap,
} from "lucide-react";

const benefits = [
  {
    title: "Weekly Call Insights",
    description:
      "Get a clear breakdown of every customer interaction. See what they asked, what they booked, and what they wanted but you didn't offer. Know your customers better than ever.",
    icon: BarChart3,
    color: "text-indigo-600",
    bg: "bg-indigo-50",
    stat: "Weekly reports",
  },
  {
    title: "Never Miss a Lead Again",
    description:
      "Every missed call is lost revenue. Your smart receptionist picks up every single time — evenings, weekends, holidays. Capture 100% of your potential bookings.",
    icon: Zap,
    color: "text-amber-600",
    bg: "bg-amber-50",
    stat: "100% pickup rate",
  },
  {
    title: "Save on Staff Costs",
    description:
      "A full-time receptionist can cost alot every year. Servio handles calls, bookings, and confirmations for a fraction of the price — no salary, no sick days, no training.",
    icon: DollarSign,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    stat: "Up to 90% savings",
  },
  {
    title: "Focus on What You Do Best",
    description:
      "Stop juggling the phone while cutting hair, fixing teeth, or repairing cars. Let your smart receptionist handle the admin while you focus on your craft.",
    icon: HeartHandshake,
    color: "text-rose-600",
    bg: "bg-rose-50",
    stat: "3+ hours saved daily",
  },
  {
    title: "Instant Customer Confirmations",
    description:
      "Customers get a text the moment their booking is approved. No awkward back-and-forth, no forgotten appointments. Professional and seamless every time.",
    icon: Clock,
    color: "text-sky-600",
    bg: "bg-sky-50",
    stat: "Instant SMS alerts",
  },
  {
    title: "Grow Without Limits",
    description:
      "Whether you get 5 calls or 500 a day, Servio scales with you. Add new services, update hours, and post notices — all from one simple dashboard.",
    icon: TrendingUp,
    color: "text-violet-600",
    bg: "bg-violet-50",
    stat: "Unlimited calls",
  },
];

export default function Benefits() {
  return (
    <section className="w-full bg-gray-50 py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
          Why you should Choose Servio
        </h2>
        <p className="text-center text-gray-500 mb-14 max-w-2xl mx-auto text-lg">
          It&apos;s not just about answering calls. It&apos;s about running a
          better business.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <div
                key={benefit.title}
                className="flex gap-5 p-6 rounded-2xl bg-white border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200"
              >
                <div
                  className={`w-12 h-12 rounded-xl ${benefit.bg} flex items-center justify-center shrink-0`}
                >
                  <Icon
                    className={`w-6 h-6 ${benefit.color}`}
                    strokeWidth={1.8}
                  />
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
