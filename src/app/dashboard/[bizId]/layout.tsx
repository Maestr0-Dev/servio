"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import {
  LayoutDashboard,
  Store,
  Package,
  CalendarDays,
  LogOut,
  Menu,
  X,
  CreditCard,
} from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const segments = pathname.split("/").filter(Boolean);
  const bizId = segments.length >= 2 ? segments[1] : null;
  const basePath = bizId ? `/dashboard/${bizId}` : "/dashboard";

  const navItems = [
    { href: basePath, label: "Overview", icon: LayoutDashboard, exact: true },
    { href: `${basePath}/shop`, label: "Shop", icon: Store },
    { href: `${basePath}/services`, label: "Services", icon: Package },
    { href: `${basePath}/bookings`, label: "Bookings", icon: CalendarDays },
    { href: `${basePath}/credits`, label: "Credits", icon: CreditCard },
  ];

  const userInitial = session?.user?.name?.[0]?.toUpperCase() || session?.user?.email?.[0]?.toUpperCase() || "U";

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/20 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 lg:translate-x-0 lg:static lg:z-auto ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <Link href="/businesses" className="text-xl font-bold text-gray-900">
            Servio
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="px-3 py-4 space-y-1">
          {navItems.map((item) => {
            const isActive = item.exact
              ? pathname === item.href
              : pathname.startsWith(item.href) && pathname !== basePath;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-gray-900 text-white"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-gray-100 space-y-1">
          <Link
            href="/businesses"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
          >
            <Store className="w-5 h-5" />
            All Businesses
          </Link>
          <button
            onClick={() => signOut({ callbackUrl: "/home" })}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-sm border-b border-gray-200">
          <div className="flex items-center gap-4 px-4 sm:px-6 py-4">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-gray-600 hover:text-gray-900">
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex-1" />
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center text-white text-sm font-medium">
                {userInitial}
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
