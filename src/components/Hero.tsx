import { Bot } from "lucide-react";
import WaitlistForm from "./WaitlistForm";

export default function Hero() {
  return (
    <section className="w-full max-w-4xl mx-auto text-center py-28 px-4">
      <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 text-sm font-medium text-gray-700 bg-gray-100 rounded-full">
        
        Coming Soon
      </div>
      <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight leading-tight">
        Run your business,
        <br />
        <span className="bg-gradient-to-r from-gray-900 via-gray-600 to-gray-400 bg-clip-text text-transparent">
          we handle the rest.
        </span>
      </h1>
      <p className="text-lg md:text-xl text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed">
        Never miss a call again. Servio gives your business a 24/7 smart
        receptionist that answers calls, books appointments, and sends
        confirmations &mdash; all while you approve with one tap on Telegram.
      </p>
      <div className="mb-6">
        <WaitlistForm />
      </div>
      <p className="text-sm text-gray-400">
        Join the waitlist. Be the first to know when we launch.
      </p>
    </section>
  );
}
