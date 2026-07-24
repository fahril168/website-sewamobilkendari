import pool from "@/lib/db";
import StatCard from "@/components/admin/StatCard";
import StatusBadge from "@/components/admin/StatusBadge";
import { Car, CheckCircle, Clock, CalendarCheck, Compass } from "lucide-react";
import Link from "next/link";

export default async function AdminDashboard() {
  // Fetch stats from database
  const [carsResult, availableResult, bookingsResult, pendingResult, destinationsResult, recentBookings] =
    await Promise.all([
      pool.query("SELECT COUNT(*) FROM cars"),
      pool.query("SELECT COUNT(*) FROM cars WHERE status = 'available'"),
      pool.query("SELECT COUNT(*) FROM bookings"),
      pool.query("SELECT COUNT(*) FROM bookings WHERE status = 'pending'"),
      pool.query("SELECT COUNT(*) FROM destinations"),
      pool.query(
        `SELECT b.booking_code, b.customer_name, b.status, b.start_date, b.end_date, b.total_price, c.name as car_name
         FROM bookings b
         LEFT JOIN cars c ON b.car_id = c.id
         ORDER BY b.created_at DESC
         LIMIT 5`
      ),
    ]);

  const totalCars = parseInt(carsResult.rows[0].count);
  const availableCars = parseInt(availableResult.rows[0].count);
  const totalBookings = parseInt(bookingsResult.rows[0].count);
  const pendingBookings = parseInt(pendingResult.rows[0].count);
  const totalDestinations = parseInt(destinationsResult.rows[0].count);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#223A50]">Dashboard</h1>
        <p className="mt-1 text-sm text-slate-500">
          Selamat datang di panel admin SewaMobilKendari
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <StatCard
          icon={Car}
          label="Total Mobil"
          value={totalCars}
          color="blue"
        />
        <StatCard
          icon={CheckCircle}
          label="Mobil Tersedia"
          value={availableCars}
          color="green"
        />
        <StatCard
          icon={CalendarCheck}
          label="Total Pemesanan"
          value={totalBookings}
          color="amber"
        />
        <StatCard
          icon={Clock}
          label="Pemesanan Menunggu"
          value={pendingBookings}
          color="red"
        />
        <StatCard
          icon={Compass}
          label="Total Wisata"
          value={totalDestinations}
          color="purple"
        />
      </div>

      {/* Recent Bookings Table */}
      <div className="mt-8">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-[#223A50]">
            Pemesanan Terbaru
          </h2>
          <Link
            href="/admin/bookings"
            className="text-sm font-medium text-amber-600 hover:text-amber-700"
          >
            Lihat Semua →
          </Link>
        </div>

        <div className="mt-4 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-slate-100 bg-slate-50/80">
              <tr>
                <th className="px-4 py-3 font-medium text-slate-500">Kode</th>
                <th className="px-4 py-3 font-medium text-slate-500">Pelanggan</th>
                <th className="px-4 py-3 font-medium text-slate-500">Mobil</th>
                <th className="px-4 py-3 font-medium text-slate-500">Tanggal</th>
                <th className="px-4 py-3 font-medium text-slate-500">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recentBookings.rows.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-8 text-center text-slate-400"
                  >
                    Belum ada booking
                  </td>
                </tr>
              ) : (
                recentBookings.rows.map((booking) => (
                  <tr
                    key={booking.booking_code}
                    className="transition-colors hover:bg-slate-50/50"
                  >
                    <td className="px-4 py-3 font-mono text-xs font-medium text-[#223A50]">
                      {booking.booking_code}
                    </td>
                    <td className="px-4 py-3 text-slate-700">
                      {booking.customer_name}
                    </td>
                    <td className="px-4 py-3 text-slate-600">
                      {booking.car_name}
                    </td>
                    <td className="px-4 py-3 text-slate-500">
                      {new Date(booking.start_date).toLocaleDateString("id-ID")}
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={booking.status} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
