"use client";

import { useState } from "react";
import { Send, Loader2, CheckCircle, AlertCircle, Mail } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function WaitlistForm() {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error" | "pending_verification"
  >("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setMessage(t.form.success);
        setEmail("");
      } else if (data.code === "pending_verification") {
        setStatus("pending_verification");
        setMessage(t.form.pendingMessage);
      } else {
        setStatus("error");
        setMessage(data.error || "Something went wrong");
      }
    } catch {
      setStatus("error");
      setMessage(t.form.networkError);
    }
  };

  const handleResend = async () => {
    setStatus("loading");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, action: "resend" }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setMessage(t.form.success);
      } else {
        setStatus("error");
        setMessage(data.error || "Failed to resend email");
      }
    } catch {
      setStatus("error");
      setMessage(t.form.networkError);
    }
  };

  if (status === "success") {
    return (
      <div className="flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 max-w-md mx-auto">
        <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
        <p className="text-emerald-800 font-medium text-sm">{message}</p>
      </div>
    );
  }

  if (status === "pending_verification") {
    return (
      <div className="flex flex-col gap-3 max-w-md mx-auto">
        <div className="flex items-center gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4">
          <Mail className="w-5 h-5 text-amber-600 shrink-0" />
          <div>
            <p className="text-amber-800 font-medium text-sm">{t.form.pendingTitle}</p>
            <p className="text-amber-700 text-xs mt-0.5">{message}</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleResend}
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-all"
          >
            <Send className="w-4 h-4" />
            {t.form.resendButton}
          </button>
          <button
            onClick={() => {
              setStatus("idle");
              setEmail("");
            }}
            className="px-4 py-3 border border-gray-200 text-gray-600 rounded-xl font-medium hover:bg-gray-50 transition-all"
          >
            {t.form.differentEmail}
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row gap-3 w-full max-w-md mx-auto"
    >
      <div className="flex-1 relative">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t.hero.formPlaceholder}
          required
          className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-gray-900 placeholder-gray-400 transition-all"
        />
      </div>
      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 active:bg-gray-950 transition-all disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
      >
        {status === "loading" ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            {t.hero.formLoading}
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            {t.hero.formButton}
          </>
        )}
      </button>
      {status === "error" && (
        <div className="flex items-center gap-2 text-red-600 text-sm sm:col-span-2 mt-1">
          <AlertCircle className="w-4 h-4 shrink-0" />
          {message}
        </div>
      )}
    </form>
  );
}
