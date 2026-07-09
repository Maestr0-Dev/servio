"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { CreditCard, Plus, TrendingDown, TrendingUp, Clock } from "lucide-react";

interface CreditTransaction {
  id: string;
  type: "topup" | "usage";
  amount: number;
  description: string;
  date: string;
}

export default function CreditsPage() {
  const { bizId } = useParams();
  const [balance] = useState(0);
  const transactions: CreditTransaction[] = [];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Credits</h1>
        <p className="text-gray-500 mt-1">Manage your call credits and billing</p>
      </div>

      {/* Balance card */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 mb-1">Current Balance</p>
            <p className="text-4xl font-bold text-gray-900">{balance}</p>
            <p className="text-sm text-gray-400 mt-1">credits available</p>
          </div>
          <div className="w-16 h-16 bg-violet-50 rounded-2xl flex items-center justify-center">
            <CreditCard className="w-8 h-8 text-violet-600" />
          </div>
        </div>
        <button className="mt-6 inline-flex items-center gap-2 px-5 py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-colors">
          <Plus className="w-4 h-4" />
          Top Up Credits
        </button>
      </div>

      {/* How it works */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">How Credits Work</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-600">
          <div className="p-4 bg-gray-50 rounded-xl">
            <div className="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center mb-2">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
            </div>
            <p className="font-medium text-gray-900 mb-1">1. Top Up</p>
            <p>Add credits to your business. Pay what you want.</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl">
            <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center mb-2">
              <TrendingDown className="w-4 h-4 text-blue-600" />
            </div>
            <p className="font-medium text-gray-900 mb-1">2. Use Credits</p>
            <p>Credits are used automatically as calls come in.</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl">
            <div className="w-8 h-8 bg-amber-50 rounded-lg flex items-center justify-center mb-2">
              <Plus className="w-4 h-4 text-amber-600" />
            </div>
            <p className="font-medium text-gray-900 mb-1">3. Top Up Again</p>
            <p>Run low? Add more credits anytime.</p>
          </div>
        </div>
      </div>

      {/* Transaction history */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">Transaction History</h2>
        </div>
        {transactions.length === 0 ? (
          <div className="text-center py-12">
            <Clock className="w-12 h-12 mx-auto mb-3 text-gray-200" />
            <p className="text-gray-400">No transactions yet. Top up to get started.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {transactions.map((tx) => (
              <div key={tx.id} className="flex items-center gap-4 px-6 py-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${tx.type === "topup" ? "bg-emerald-50" : "bg-red-50"}`}>
                  {tx.type === "topup" ? (
                    <TrendingUp className="w-5 h-5 text-emerald-600" />
                  ) : (
                    <TrendingDown className="w-5 h-5 text-red-600" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{tx.description}</p>
                  <p className="text-xs text-gray-400">{tx.date}</p>
                </div>
                <span className={`text-sm font-medium ${tx.type === "topup" ? "text-emerald-600" : "text-red-600"}`}>
                  {tx.type === "topup" ? "+" : "-"}{tx.amount}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
