"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Store, ArrowRight, CreditCard, Loader2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface Business {
  id: string;
  name: string;
  credits: number;
}

export default function BusinessesPage() {
  const { t } = useLanguage();
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [creating, setCreating] = useState(false);
  const [newName, setNewName] = useState("");

  useEffect(() => {
    fetchBusinesses();
  }, []);

  const fetchBusinesses = async () => {
    try {
      const res = await fetch("/api/businesses");
      if (res.ok) {
        const data = await res.json();
        setBusinesses(data);
      }
    } catch (error) {
      console.error("Failed to fetch businesses:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;
    setCreating(true);

    try {
      const res = await fetch("/api/businesses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newName }),
      });

      if (res.ok) {
        const business = await res.json();
        setBusinesses([business, ...businesses]);
        setNewName("");
        setShowCreate(false);
      }
    } catch (error) {
      console.error("Failed to create business:", error);
    } finally {
      setCreating(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{t.businesses.title}</h1>
          <p className="text-gray-500 mt-2">{t.businesses.subtitle}</p>
        </div>

        {loading ? (
          <div className="text-center py-16">
            <Loader2 className="w-8 h-8 mx-auto mb-3 text-gray-400 animate-spin" />
            <p className="text-gray-500">{t.businesses.loading}</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {businesses.map((biz) => (
                <Link
                  key={biz.id}
                  href={`/dashboard/${biz.id}`}
                  className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg hover:border-gray-300 transition-all group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center group-hover:bg-gray-900 transition-colors">
                      <Store className="w-6 h-6 text-gray-600 group-hover:text-white transition-colors" />
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-gray-900 transition-colors" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{biz.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <CreditCard className="w-4 h-4" />
                    <span>{Number(biz.credits)} {t.businesses.credits}</span>
                  </div>
                </Link>
              ))}

              <button
                onClick={() => setShowCreate(true)}
                className="bg-white rounded-2xl border-2 border-dashed border-gray-300 p-6 hover:border-gray-900 hover:bg-gray-50 transition-all text-left group"
              >
                <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-gray-900 transition-colors">
                  <Plus className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{t.businesses.createNew}</h3>
                <p className="text-sm text-gray-500">{t.businesses.createDescription}</p>
              </button>
            </div>

            {showCreate && (
              <div className="fixed inset-0 bg-black/20 z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl border border-gray-200 p-6 w-full max-w-md shadow-xl">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">{t.businesses.createModal.title}</h2>
                  <form onSubmit={handleCreate} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">{t.businesses.createModal.nameLabel}</label>
                      <input
                        type="text"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        placeholder={t.businesses.createModal.namePlaceholder}
                        required
                        autoFocus
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-gray-900 placeholder-gray-400 transition-all"
                      />
                    </div>
                    <div className="flex gap-3 justify-end">
                      <button
                        type="button"
                        onClick={() => { setShowCreate(false); setNewName(""); }}
                        className="px-4 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                      >
                        {t.businesses.createModal.cancel}
                      </button>
                      <button
                        type="submit"
                        disabled={creating || !newName.trim()}
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors disabled:opacity-50"
                      >
                        {creating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                        {t.businesses.createModal.create}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {businesses.length === 0 && !showCreate && (
              <div className="text-center py-16">
                <Store className="w-16 h-16 mx-auto mb-4 text-gray-200" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">{t.businesses.noBusinesses}</h3>
                <p className="text-gray-500 mb-6">{t.businesses.noBusinessesDescription}</p>
                <button
                  onClick={() => setShowCreate(true)}
                  className="inline-flex items-center gap-2 px-5 py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  {t.businesses.createFirst}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
