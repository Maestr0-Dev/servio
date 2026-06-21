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

function VerifyContent() {
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
            {already ? "You're Already Verified" : "You're Verified!"}
          </h1>
          <p className="text-gray-500 mb-3">
            {already
              ? "Your email was already confirmed. You're all set on the waitlist."
              : "Your email has been confirmed. You're officially on the Servio waitlist."}
          </p>
          <p className="text-sm text-gray-400 mb-8">
            We'll let you know as soon as Servio is ready.
          </p>
          <a
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </a>
        </div>
      </main>
    );
  }

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
          {error === "missing-token"
            ? "Link Incomplete"
            : error === "invalid-token"
            ? "Link Expired or Invalid"
            : "Something Went Wrong"}
        </h1>

        <p className="text-gray-500 mb-6">
          {error === "missing-token"
            ? "The verification link is missing the security token. Please use the full link from your email."
            : error === "invalid-token"
            ? "This verification link is no longer valid. It may have already been used or expired."
            : "We couldn't verify your email right now. This is a temporary issue — please try again in a moment."}
        </p>

        <div className="bg-gray-50 rounded-xl p-4 mb-8 text-left">
          <p className="text-sm font-medium text-gray-700 mb-2">What to do:</p>
          <ul className="space-y-2 text-sm text-gray-500">
            <li className="flex items-start gap-2">
              <Mail className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
              Check your inbox for the latest verification email
            </li>
            <li className="flex items-start gap-2">
              <RefreshCw className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
              If the link expired, go back and join the waitlist again with your email
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-3">
          <a
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </a>
        </div>
      </div>
    </main>
  );
}

export default function VerifyPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-gray-400">Verifying your email...</div>
        </div>
      }
    >
      <VerifyContent />
    </Suspense>
  );
}
