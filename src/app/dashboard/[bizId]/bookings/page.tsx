"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { CalendarDays, Clock, User, Phone, Filter, CheckCircle, XCircle, Hourglass, Loader2 } from "lucide-react";

type BookingStatus = "pending" | "confirmed" | "rejected";

interface Booking {
  id: string;
  customerName: string;
  customerPhone: string;
  serviceName: string;
  appointmentTime: string;
  status: BookingStatus;
}

const statusConfig = {
  pending: { label: "Pending", icon: Hourglass, color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-200" },
  confirmed: { label: "Confirmed", icon: CheckCircle, color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-200" },
  rejected: { label: "Rejected", icon: XCircle, color: "text-red-600", bg: "bg-red-50", border: "border-red-200" },
};

export default function BookingsPage() {
  const { bizId } = useParams();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<BookingStatus | "all">("all");

  useEffect(() => {
    fetchBookings();
  }, [bizId]);

  const fetchBookings = async () => {
    try {
      const res = await fetch(`/api/businesses/${bizId}/bookings`);
      if (res.ok) {
        const data = await res.json();
        setBookings(data);
      }
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  const filtered = filter === "all" ? bookings : bookings.filter((b) => b.status === filter);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 text-gray-400 animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Bookings</h1>
        <p className="text-gray-500 mt-1">View and manage all incoming bookings</p>
      </div>

      <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
        <Filter className="w-4 h-4 text-gray-400 shrink-0" />
        {(["all", "pending", "confirmed", "rejected"] as const).map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors whitespace-nowrap ${
              filter === status
                ? "bg-gray-900 text-white"
                : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
            }`}
          >
            {status === "all" ? "All" : statusConfig[status].label}
            {status === "pending" && bookings.filter((b) => b.status === "pending").length > 0 && (
              <span className="ml-1.5 text-xs opacity-60">{bookings.filter((b) => b.status === "pending").length}</span>
            )}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-200 text-center py-16">
            <CalendarDays className="w-12 h-12 mx-auto mb-3 text-gray-200" />
            <p className="text-gray-400">
              {filter === "all"
                ? "No bookings yet. Connect your Telegram bot and start receiving calls."
                : `No ${filter} bookings.`}
            </p>
          </div>
        ) : (
          filtered.map((booking) => {
            const status = statusConfig[booking.status];
            const StatusIcon = status.icon;
            return (
              <div key={booking.id} className="bg-white rounded-2xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="flex items-center gap-2 text-sm font-medium text-gray-900">
                        <User className="w-4 h-4 text-gray-400" />
                        {booking.customerName}
                      </div>
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded-full ${status.bg} ${status.color} border ${status.border}`}>
                        <StatusIcon className="w-3 h-3" />
                        {status.label}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Phone className="w-3.5 h-3.5" />
                        {booking.customerPhone}
                      </span>
                      <span>{booking.serviceName}</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {new Date(booking.appointmentTime).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
