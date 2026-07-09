"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Features from "@/components/Features";
import Benefits from "@/components/Benefits";
import Footer from "@/components/Footer";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      {/* Hero */}
      <section className="w-full max-w-4xl mx-auto text-center py-28 px-4">
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
          <Link
            href="/register"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white rounded-xl font-medium text-lg hover:bg-gray-800 transition-colors"
          >
            Start Using Servio
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
      <Features />
      <Benefits />
      <Footer />
    </main>
  );
}
