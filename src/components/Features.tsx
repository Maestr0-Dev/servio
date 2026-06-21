import {
  Phone,
  MessageSquare,
  MessageCircle,
  Megaphone,
  Settings,
  Shield,
} from "lucide-react";

const features = [
  {
    title: "24/7 Smart Receptionist",
    description:
      "Never miss a call. Your smart receptionist answers questions, takes bookings, and provides information around the clock.",
    icon: Phone,
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    title: "Telegram Approval System",
    description:
      "Review and approve bookings with one tap. Stay in control while the system handles the heavy lifting.",
    icon: MessageSquare,
    color: "text-sky-600",
    bg: "bg-sky-50",
  },
  {
    title: "Automatic SMS Confirmations",
    description:
      "Customers receive instant booking confirmations via text message. No manual follow-up needed.",
    icon: MessageCircle,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    title: "Live Business Updates",
    description:
      'Post temporary notices like "Closed today" or "New hours". Your receptionist will inform callers automatically.',
    icon: Megaphone,
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
  {
    title: "Service Management",
    description:
      "Add, edit, or remove services and pricing. Your receptionist always has the latest information.",
    icon: Settings,
    color: "text-violet-600",
    bg: "bg-violet-50",
  },
  {
    title: "Multi-Tenant Isolation",
    description:
      "Each business gets its own isolated setup. Your data, your bot, your control.",
    icon: Shield,
    color: "text-rose-600",
    bg: "bg-rose-50",
  },
];

export default function Features() {
  return (
    <section className="w-full max-w-5xl mx-auto py-20 px-4">
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
        What Servio Lets You Do
      </h2>
      <p className="text-center text-gray-500 mb-14 max-w-2xl mx-auto text-lg">
        A complete smart receptionist system for your business. Here&apos;s
        everything you get.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <div
              key={feature.title}
              className="p-6 rounded-2xl border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-200 bg-white"
            >
              <div
                className={`w-12 h-12 rounded-xl ${feature.bg} flex items-center justify-center mb-4`}
              >
                <Icon className={`w-6 h-6 ${feature.color}`} strokeWidth={1.8} />
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
