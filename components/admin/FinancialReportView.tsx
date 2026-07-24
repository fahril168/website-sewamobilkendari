"use client";

import { useState } from "react";
import StatusBadge from "./StatusBadge";
import {
  TrendingUp,
  DollarSign,
  Calendar,
  CheckCircle2,
  Clock,
  Printer,
  Download,
  Car,
  Filter,
} from "lucide-react";

interface BookingRecord {
  id: string;
  booking_code: string;
  customer_name: string;
  customer_phone: string;
  customer_email?: string;
  car_name?: string;
  start_date: string;
  end_date: string;
  total_price: string;
  status: "available" | "rented" | "maintenance" | "pending" | "confirmed" | "completed" | "cancelled";
  created_at: string;
}

interface CarPerformance {
  car_id: string;
  car_name: string;
  total_revenue: number;
  booking_count: number;
}

interface MonthlyTrend {
  month_key: string;
  month_label: string;
  revenue: string;
  booking_count: string;
}

interface FinancialReportViewProps {
  initialData: {
    summary: {
      totalRevenue: number;
      completedRevenue: number;
      potentialRevenue: number;
      totalBookingsCount: number;
      completedCount: number;
      confirmedCount: number;
      pendingCount: number;
      cancelledCount: number;
      avgOrderValue: number;
    };
    carPerformance: CarPerformance[];
    monthlyTrend: MonthlyTrend[];
    bookings: BookingRecord[];
  };
}

export default function FinancialReportView({ initialData }: FinancialReportViewProps) {
  const [period, setPeriod] = useState<string>("all");
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);

  const fetchPeriodData = async (selectedPeriod: string) => {
    setPeriod(selectedPeriod);
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/reports?period=${selectedPeriod}`);
      const json = await res.json();
      if (res.ok) {
        setData(json);
      }
    } catch (err) {
      console.error("Failed to load report data:", err);
    } finally {
      setLoading(false);
    }
  };

  const formatIDR = (val: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(val);

  const exportCSV = () => {
    const headers = [
      "Kode Booking",
      "Pelanggan",
      "Telepon",
      "Mobil",
      "Tanggal Mulai",
      "Tanggal Selesai",
      "Status",
      "Total Harga (Rp)",
    ];
    const rows = data.bookings.map((b) => [
      b.booking_code,
      `"${b.customer_name}"`,
      `"${b.customer_phone}"`,
      `"${b.car_name || "-"}"`,
      new Date(b.start_date).toLocaleDateString("id-ID"),
      new Date(b.end_date).toLocaleDateString("id-ID"),
      b.status,
      b.total_price,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `Laporan_Keuangan_SewaMobil_${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const maxTrendRevenue = Math.max(
    ...data.monthlyTrend.map((m) => parseFloat(m.revenue) || 0),
    1
  );

  return (
    <div className="space-y-6">
      {/* Print Only Header */}
      <div className="hidden print:block print:mb-6">
        <h1 className="text-2xl font-bold text-slate-800">
          SewaMobilKendari.com — Laporan Keuangan & Analisis
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Tanggal Cetak: {new Date().toLocaleDateString("id-ID", { dateStyle: "full" })}
        </p>
      </div>

      {/* Page Header & Controls */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between print:hidden">
        <div>
          <h1 className="text-2xl font-bold text-[#223A50]">Laporan & Analisis Keuangan</h1>
          <p className="mt-1 text-sm text-slate-500">
            Ringkasan omzet, omzet per armada, serta riwayat pendapatan sewa
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Period Filter Buttons */}
          <div className="flex items-center rounded-lg border border-slate-200 bg-white p-1 shadow-sm text-xs font-medium text-slate-600">
            <button
              onClick={() => fetchPeriodData("all")}
              className={`rounded-md px-3 py-1.5 transition-colors ${
                period === "all"
                  ? "bg-[#223A50] text-white font-semibold shadow-xs"
                  : "hover:bg-slate-100"
              }`}
            >
              Semua Waktu
            </button>
            <button
              onClick={() => fetchPeriodData("this_month")}
              className={`rounded-md px-3 py-1.5 transition-colors ${
                period === "this_month"
                  ? "bg-[#223A50] text-white font-semibold shadow-xs"
                  : "hover:bg-slate-100"
              }`}
            >
              Bulan Ini
            </button>
            <button
              onClick={() => fetchPeriodData("last_month")}
              className={`rounded-md px-3 py-1.5 transition-colors ${
                period === "last_month"
                  ? "bg-[#223A50] text-white font-semibold shadow-xs"
                  : "hover:bg-slate-100"
              }`}
            >
              Bulan Lalu
            </button>
            <button
              onClick={() => fetchPeriodData("this_year")}
              className={`rounded-md px-3 py-1.5 transition-colors ${
                period === "this_year"
                  ? "bg-[#223A50] text-white font-semibold shadow-xs"
                  : "hover:bg-slate-100"
              }`}
            >
              Tahun Ini
            </button>
          </div>

          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-sm transition-colors hover:bg-slate-50"
          >
            <Printer className="h-4 w-4 text-slate-500" />
            Cetak PDF
          </button>

          <button
            onClick={exportCSV}
            className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3.5 py-2 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-emerald-500"
          >
            <Download className="h-4 w-4" />
            Ekspor CSV
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-emerald-100 bg-emerald-50/50 p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-800">
              Total Pendapatan (Omzet)
            </span>
            <div className="rounded-lg bg-emerald-100 p-2 text-emerald-700">
              <DollarSign className="h-5 w-5" />
            </div>
          </div>
          <p className="mt-3 text-2xl font-extrabold text-[#223A50]">
            {formatIDR(data.summary.totalRevenue)}
          </p>
          <p className="mt-1 text-xs text-emerald-700 font-medium">
            Termasuk pesanan Selesai & Dikonfirmasi
          </p>
        </div>

        <div className="rounded-xl border border-blue-100 bg-blue-50/50 p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-800">
              Pendapatan Terealisasi
            </span>
            <div className="rounded-lg bg-blue-100 p-2 text-blue-700">
              <CheckCircle2 className="h-5 w-5" />
            </div>
          </div>
          <p className="mt-3 text-2xl font-extrabold text-[#223A50]">
            {formatIDR(data.summary.completedRevenue)}
          </p>
          <p className="mt-1 text-xs text-blue-700 font-medium">
            Dari {data.summary.completedCount} pesanan selesai
          </p>
        </div>

        <div className="rounded-xl border border-amber-100 bg-amber-50/50 p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-800">
              Rata-Rata Sewa (AOV)
            </span>
            <div className="rounded-lg bg-amber-100 p-2 text-amber-700">
              <TrendingUp className="h-5 w-5" />
            </div>
          </div>
          <p className="mt-3 text-2xl font-extrabold text-[#223A50]">
            {formatIDR(data.summary.avgOrderValue)}
          </p>
          <p className="mt-1 text-xs text-amber-700 font-medium">Per transaksi selesai</p>
        </div>

        <div className="rounded-xl border border-purple-100 bg-purple-50/50 p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-purple-800">
              Total Booking Terdata
            </span>
            <div className="rounded-lg bg-purple-100 p-2 text-purple-700">
              <Calendar className="h-5 w-5" />
            </div>
          </div>
          <p className="mt-3 text-2xl font-extrabold text-[#223A50]">
            {data.summary.totalBookingsCount} <span className="text-sm font-normal text-slate-500">Transaksi</span>
          </p>
          <p className="mt-1 text-xs text-purple-700 font-medium">
            {data.summary.pendingCount} Menunggu Konfirmasi
          </p>
        </div>
      </div>

      {/* Main Charts & Breakdown Section */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Trend Bar Chart (2 cols) */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-base font-semibold text-[#223A50]">
                Grafik Tren Pendapatan
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Perkembangan omzet sewa berdasarkan periode
              </p>
            </div>
            <span className="rounded bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
              {data.monthlyTrend.length} Periode
            </span>
          </div>

          <div className="mt-6">
            {data.monthlyTrend.length === 0 ? (
              <div className="flex h-48 items-center justify-center text-sm text-slate-400">
                Belum ada data pendapatan pada periode ini
              </div>
            ) : (
              <div className="space-y-4">
                {data.monthlyTrend.map((t) => {
                  const rev = parseFloat(t.revenue) || 0;
                  const pct = Math.min(Math.round((rev / maxTrendRevenue) * 100), 100);

                  return (
                    <div key={t.month_key} className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-slate-700">{t.month_label}</span>
                        <span className="font-bold text-[#223A50]">
                          {formatIDR(rev)}{" "}
                          <span className="text-slate-400 font-normal">
                            ({t.booking_count} sewa)
                          </span>
                        </span>
                      </div>
                      <div className="h-3.5 w-full overflow-hidden rounded-full bg-slate-100">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-amber-500 to-amber-400 transition-all duration-500"
                          style={{ width: `${Math.max(pct, 4)}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Top Cars Performance (1 col) */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="text-base font-semibold text-[#223A50] flex items-center gap-1.5">
                <Car className="h-4 w-4 text-amber-500" /> Performance Armada
              </h3>
              <span className="text-xs text-slate-400">Top Omzet</span>
            </div>

            <div className="mt-4 space-y-3.5">
              {data.carPerformance.length === 0 ? (
                <p className="text-center py-6 text-xs text-slate-400">Belum ada transaksi</p>
              ) : (
                data.carPerformance.map((c, idx) => (
                  <div key={c.car_id} className="rounded-lg border border-slate-100 p-3 bg-slate-50/50">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-[#223A50]">
                        {idx + 1}. {c.car_name}
                      </span>
                      <span className="font-bold text-amber-600">
                        {formatIDR(c.total_revenue)}
                      </span>
                    </div>
                    <div className="mt-1 flex items-center justify-between text-[11px] text-slate-400">
                      <span>{c.booking_count} kali disewa</span>
                      <span>
                        {data.summary.totalRevenue > 0
                          ? `${Math.round((c.total_revenue / data.summary.totalRevenue) * 100)}% Omzet`
                          : "0%"}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Transaction Records Table */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 p-4 bg-slate-50/50 flex items-center justify-between">
          <h3 className="font-semibold text-[#223A50] text-sm">
            Rincian Transaksi Transaksi ({data.bookings.length})
          </h3>
        </div>

        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-100 bg-slate-50/80 text-xs font-medium text-slate-500">
            <tr>
              <th className="px-4 py-3">Kode Booking</th>
              <th className="px-4 py-3">Pelanggan</th>
              <th className="px-4 py-3">Mobil</th>
              <th className="px-4 py-3">Tanggal Sewa</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Total Biaya</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {data.bookings.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-slate-400">
                  Tidak ada transaksi yang cocok
                </td>
              </tr>
            ) : (
              data.bookings.map((b) => (
                <tr key={b.id} className="transition-colors hover:bg-slate-50/50">
                  <td className="px-4 py-3 font-mono text-xs font-medium text-[#223A50]">
                    {b.booking_code}
                  </td>
                  <td className="px-4 py-3 font-medium text-slate-700">
                    {b.customer_name}
                    {b.customer_phone && (
                      <span className="block text-xs text-slate-400 font-normal">
                        {b.customer_phone}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-slate-600">{b.car_name || "-"}</td>
                  <td className="px-4 py-3 text-xs text-slate-500">
                    {new Date(b.start_date).toLocaleDateString("id-ID")} -{" "}
                    {new Date(b.end_date).toLocaleDateString("id-ID")}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={b.status} />
                  </td>
                  <td className="px-4 py-3 text-right font-semibold text-[#223A50]">
                    {formatIDR(parseFloat(b.total_price))}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
