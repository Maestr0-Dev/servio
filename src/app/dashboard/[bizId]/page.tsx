"use client";

import { useState, useEffect } from "react";
import {
  Phone,
  CalendarDays,
  CreditCard,
  TrendingUp,
  ArrowUpRight,
  Store,
  Package,
  MessageSquare,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

interface Business {
  id: string;
  name: string;
  credits: number;
}

const stats = [
  { label: "Total Calls", value: "0", icon: Phone, color: "text-blue-600", bg: "bg-blue-50" },
  { label: "Bookings", value: "0", icon: CalendarDays, color: "text-emerald-600", bg: "bg-emerald-50" },
  { label: "Credits", value: "0", icon: CreditCard, color: "text-violet-600", bg: "bg-violet-50" },
  { label: "Conversion", value: "0%", icon: TrendingUp, color: "text-amber-600", bg: "bg-amber-50" },
];

export default function DashboardOverview() {
  const { bizId } = useParams();
  const [business, setBusiness] = useState<Business | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/businesses/${bizId}`)
      .then((res) => res.json())
      .then((data) => {
        setBusiness(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [bizId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 text-gray-400 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          {business?.name || "Dashboard"}
        </h1>
        <p className="text-gray-500 mt-1">Overview of your business performance</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-2xl border border-gray-200 p-5">
            <div className="flex items-center justify-between">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.bg}`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Setup</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link
            href={`/dashboard/${bizId}/shop`}
            className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 hover:border-gray-900 hover:bg-gray-50 transition-colors group"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
              <Store className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">Set up shop</p>
              <p className="text-xs text-gray-500">Add your business info</p>
            </div>
            <ArrowUpRight className="w-4 h-4 text-gray-300 group-hover:text-gray-900 transition-colors" />
          </Link>

          <Link
            href={`/dashboard/${bizId}/services`}
            className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 hover:border-gray-900 hover:bg-gray-50 transition-colors group"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
              <Package className="w-5 h-5 text-emerald-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">Add services</p>
              <p className="text-xs text-gray-500">Define what you offer</p>
            </div>
            <ArrowUpRight className="w-4 h-4 text-gray-300 group-hover:text-gray-900 transition-colors" />
          </Link>

          <Link
            href={`/dashboard/${bizId}/shop`}
            className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 hover:border-gray-900 hover:bg-gray-50 transition-colors group"
          >
            <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-sky-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">Connect Telegram</p>
              <p className="text-xs text-gray-500">Receive booking requests</p>
            </div>
            <ArrowUpRight className="w-4 h-4 text-gray-300 group-hover:text-gray-900 transition-colors" />
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">Recent Bookings</h2>
        </div>
        <div className="text-center py-12">
          <CalendarDays className="w-12 h-12 mx-auto mb-3 text-gray-200" />
          <p className="text-gray-400">No bookings yet. Set up your shop and connect your Telegram bot.</p>
        </div>
      </div>
    </div>
  );
}
