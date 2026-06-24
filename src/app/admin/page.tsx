"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Users, CheckCircle, Clock } from "lucide-react";

interface WaitlistEntry {
  id: string;
  email: string;
  verified: boolean;
  createdAt: Date;
}

export default function AdminPage() {
  const { t } = useLanguage();

  return (
    <AdminContent t={t} />
  );
}

function AdminContent({ t }: { t: ReturnType<typeof useLanguage>["t"] }) {
  const [entries, setEntries] = useState<WaitlistEntry[]>([]);
  const [loading, setLoading] = useState(true);

  // We'll fetch data client-side since this is a "use client" component now
  // The original server-side approach won't work with the language provider

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl font-bold text-gray-900">{t.admin.title}</h1>
        </div>
        <p className="text-gray-500 mb-8 ml-13">{t.admin.subtitle}</p>

        <AdminStats t={t} />
        <AdminTable t={t} />
      </div>
    </main>
  );
}

function AdminStats({ t }: { t: ReturnType<typeof useLanguage>["t"] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
      <div className="bg-white rounded-2xl border border-gray-200 p-5">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
            <Users className="w-5 h-5 text-gray-600" />
          </div>
          <span className="text-sm text-gray-500 font-medium">
            {t.admin.totalSignups}
          </span>
        </div>
        <AdminTotalCount />
      </div>
      <div className="bg-white rounded-2xl border border-gray-200 p-5">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center">
            <CheckCircle className="w-5 h-5 text-emerald-600" />
          </div>
          <span className="text-sm text-gray-500 font-medium">
            {t.admin.verified}
          </span>
        </div>
        <AdminVerifiedCount />
      </div>
      <div className="bg-white rounded-2xl border border-gray-200 p-5">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center">
            <Clock className="w-5 h-5 text-amber-600" />
          </div>
          <span className="text-sm text-gray-500 font-medium">{t.admin.pending}</span>
        </div>
        <AdminPendingCount />
      </div>
    </div>
  );
}

function AdminTotalCount() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    fetch("/api/waitlist/stats").then(r => r.json()).then(d => setCount(d.total));
  }, []);
  return <div className="text-3xl font-bold text-gray-900">{count}</div>;
}

function AdminVerifiedCount() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    fetch("/api/waitlist/stats").then(r => r.json()).then(d => setCount(d.verified));
  }, []);
  return <div className="text-3xl font-bold text-emerald-600">{count}</div>;
}

function AdminPendingCount() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    fetch("/api/waitlist/stats").then(r => r.json()).then(d => setCount(d.pending));
  }, []);
  return <div className="text-3xl font-bold text-amber-600">{count}</div>;
}

function AdminTable({ t }: { t: ReturnType<typeof useLanguage>["t"] }) {
  const [entries, setEntries] = useState<WaitlistEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/waitlist/stats")
      .then(r => r.json())
      .then(d => {
        setEntries(d.entries || []);
        setLoading(false);
      });
  }, []);

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="text-left px-5 py-3.5 text-sm font-medium text-gray-500">
              {t.admin.email}
            </th>
            <th className="text-left px-5 py-3.5 text-sm font-medium text-gray-500">
              {t.admin.status}
            </th>
            <th className="text-left px-5 py-3.5 text-sm font-medium text-gray-500">
              {t.admin.joined}
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {loading ? (
            <tr>
              <td colSpan={3} className="px-5 py-12 text-center text-gray-400">
                Loading...
              </td>
            </tr>
          ) : entries.length === 0 ? (
            <tr>
              <td colSpan={3} className="px-5 py-12 text-center text-gray-400">
                {t.admin.noEntries}
              </td>
            </tr>
          ) : (
            entries.map((entry) => (
              <tr key={entry.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-5 py-4 text-sm text-gray-900 font-medium">
                  {entry.email}
                </td>
                <td className="px-5 py-4">
                  {entry.verified ? (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <CheckCircle className="w-3.5 h-3.5" />
                      {t.admin.verifiedBadge}
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                      <Clock className="w-3.5 h-3.5" />
                      {t.admin.pendingBadge}
                    </span>
                  )}
                </td>
                <td className="px-5 py-4 text-sm text-gray-500">
                  {new Date(entry.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
