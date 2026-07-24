"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  Car,
  CalendarCheck,
  Compass,
  Settings,
  TrendingUp,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";

const menuItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Katalog Mobil", href: "/admin/cars", icon: Car },
  { label: "Pemesanan", href: "/admin/bookings", icon: CalendarCheck },
  { label: "Laporan Keuangan", href: "/admin/reports", icon: TrendingUp },
  { label: "Wisata", href: "/admin/destinations", icon: Compass },
  { label: "Pengaturan Web", href: "/admin/settings", icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  return (
    <aside
      className={`fixed left-0 top-0 z-40 flex h-screen flex-col bg-[#223A50] text-white transition-all duration-300 ${
        collapsed ? "w-[72px]" : "w-64"
      }`}
    >
      {/* Logo */}
      <div className="flex h-16 items-center gap-2 border-b border-slate-600/50 px-4">
        <Car className="h-7 w-7 shrink-0 text-amber-400" />
        {!collapsed && (
          <span className="text-base font-bold tracking-tight">
            SewaMobil<span className="text-amber-400">.admin</span>
          </span>
        )}
      </div>

      {/* Menu */}
      <nav className="mt-4 flex flex-1 flex-col gap-1 px-3">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                active
                  ? "bg-amber-500/15 text-amber-400 shadow-sm"
                  : "text-slate-300 hover:bg-white/5 hover:text-white"
              }`}
              title={collapsed ? item.label : undefined}
            >
              <Icon className={`h-5 w-5 shrink-0 ${active ? "text-amber-400" : ""}`} />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="border-t border-slate-600/50 p-3">
        <form action="/api/admin/auth/logout" method="POST">
          <button
            type="submit"
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-400 transition-colors hover:bg-red-500/10 hover:text-red-400"
            title={collapsed ? "Keluar" : undefined}
          >
            <LogOut className="h-5 w-5 shrink-0" />
            {!collapsed && <span>Keluar</span>}
          </button>
        </form>
      </div>

      {/* Collapse Toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 flex h-6 w-6 items-center justify-center rounded-full border border-slate-600 bg-[#223A50] text-slate-400 shadow-md transition-colors hover:text-white"
      >
        {collapsed ? (
          <ChevronRight className="h-3.5 w-3.5" />
        ) : (
          <ChevronLeft className="h-3.5 w-3.5" />
        )}
      </button>
    </aside>
  );
}
