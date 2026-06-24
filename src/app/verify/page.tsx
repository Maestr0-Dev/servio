"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import {
  CheckCircle,
  Info,
  XCircle,
  ArrowLeft,
  Mail,
  RefreshCw,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

function VerifyContent() {
  const { t } = useLanguage();
  const searchParams = useSearchParams();
  const success = searchParams.get("success") === "true";
  const already = searchParams.get("already") === "true";
  const error = searchParams.get("error");

  if (success || already) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl border border-gray-200 p-8 text-center shadow-sm">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-emerald-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-3">
            {already ? t.verify.success.alreadyTitle : t.verify.success.title}
          </h1>
          <p className="text-gray-500 mb-3">
            {already ? t.verify.success.alreadyMessage : t.verify.success.message}
          </p>
          <p className="text-sm text-gray-400 mb-8">{t.verify.success.subtext}</p>
          <a
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {t.verify.success.button}
          </a>
        </div>
      </main>
    );
  }

  const errorKey = error === "missing-token"
    ? "missingToken"
    : error === "invalid-token"
    ? "invalidToken"
    : "server";

  const errorData = t.verify.error[errorKey];

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl border border-gray-200 p-8 text-center shadow-sm">
        <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
          {error === "server" ? (
            <XCircle className="w-8 h-8 text-amber-600" />
          ) : (
            <Info className="w-8 h-8 text-amber-600" />
          )}
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-3">
          {errorData.title}
        </h1>

        <p className="text-gray-500 mb-6">{errorData.message}</p>

        <div className="bg-gray-50 rounded-xl p-4 mb-8 text-left">
          <p className="text-sm font-medium text-gray-700 mb-2">
            {t.verify.error.whatToDo}
          </p>
          <ul className="space-y-2 text-sm text-gray-500">
            {t.verify.error.instructions.map((instruction, i) => (
              <li key={i} className="flex items-start gap-2">
                {i === 0 ? (
                  <Mail className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
                ) : (
                  <RefreshCw className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
                )}
                {instruction}
              </li>
            ))}
          </ul>
        </div>

        <a
          href="/"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          {t.verify.error.button}
        </a>
      </div>
    </main>
  );
}

export default function VerifyPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-gray-400">Verifying...</div>
        </div>
      }
    >
      <VerifyContent />
    </Suspense>
  );
}
