"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Benefits from "@/components/Benefits";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Features />
      <Benefits />
      <Footer />
    </main>
  );
}
