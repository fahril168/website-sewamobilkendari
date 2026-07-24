import pool from "@/lib/db";
import StatusBadge from "@/components/admin/StatusBadge";
import UpdateBookingStatus from "@/components/admin/UpdateBookingStatus";
import CreateBookingModal from "@/components/admin/CreateBookingModal";

export default async function BookingsPage() {
  const [bookingsResult, carsResult] = await Promise.all([
    pool.query(`
      SELECT b.*, c.name as car_name
      FROM bookings b
      LEFT JOIN cars c ON b.car_id = c.id
      ORDER BY b.created_at DESC
    `),
    pool.query(`SELECT id, name, price_per_day FROM cars WHERE status != 'maintenance' ORDER BY name`),
  ]);

  const bookings = bookingsResult.rows;
  const cars = carsResult.rows;

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#223A50]">
            Manajemen Pemesanan
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Kelola dan catat semua pemesanan mobil pelanggan
          </p>
        </div>
        <CreateBookingModal cars={cars} />
      </div>

      {/* Stats Summary */}
      <div className="mb-6 grid gap-3 sm:grid-cols-4">
        {["pending", "confirmed", "completed", "cancelled"].map((status) => {
          const count = bookings.filter(
            (b: { status: string }) => b.status === status
          ).length;
          const labels: Record<string, string> = {
            pending: "Pending",
            confirmed: "Dikonfirmasi",
            completed: "Selesai",
            cancelled: "Dibatalkan",
          };
          return (
            <div
              key={status}
              className="rounded-lg border border-slate-200 bg-white px-4 py-3 shadow-sm"
            >
              <p className="text-xs font-medium text-slate-500">
                {labels[status]}
              </p>
              <p className="mt-0.5 text-xl font-bold text-[#223A50]">
                {count}
              </p>
            </div>
          );
        })}
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-100 bg-slate-50/80">
            <tr>
              <th className="px-4 py-3 font-medium text-slate-500">Kode</th>
              <th className="px-4 py-3 font-medium text-slate-500">Pelanggan</th>
              <th className="px-4 py-3 font-medium text-slate-500">Mobil</th>
              <th className="px-4 py-3 font-medium text-slate-500">Tanggal</th>
              <th className="px-4 py-3 font-medium text-slate-500">Durasi</th>
              <th className="px-4 py-3 font-medium text-slate-500">Total</th>
              <th className="px-4 py-3 font-medium text-slate-500">Status</th>
              <th className="px-4 py-3 font-medium text-slate-500">Ubah Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {bookings.length === 0 ? (
              <tr>
                <td
                  colSpan={8}
                  className="px-4 py-8 text-center text-slate-400"
                >
                  Belum ada booking
                </td>
              </tr>
            ) : (
              bookings.map(
                (booking: {
                  id: string;
                  booking_code: string;
                  customer_name: string;
                  customer_phone: string;
                  car_name: string;
                  start_date: string;
                  end_date: string;
                  total_days: number;
                  total_price: string;
                  status: string;
                }) => (
                  <tr
                    key={booking.id}
                    className="transition-colors hover:bg-slate-50/50"
                  >
                    <td className="px-4 py-3 font-mono text-xs font-medium text-[#223A50]">
                      {booking.booking_code}
                    </td>
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-medium text-slate-700">
                          {booking.customer_name}
                        </p>
                        <p className="text-xs text-slate-400">
                          {booking.customer_phone}
                        </p>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-slate-600">
                      {booking.car_name || "-"}
                    </td>
                    <td className="px-4 py-3 text-slate-500">
                      <div className="text-xs">
                        <p>{formatDate(booking.start_date)}</p>
                        <p className="text-slate-400">
                          s/d {formatDate(booking.end_date)}
                        </p>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-slate-600">
                      {booking.total_days} hari
                    </td>
                    <td className="px-4 py-3 font-medium text-[#223A50]">
                      {formatPrice(parseFloat(booking.total_price))}
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge
                        status={
                          booking.status as
                            | "pending"
                            | "confirmed"
                            | "completed"
                            | "cancelled"
                        }
                      />
                    </td>
                    <td className="px-4 py-3">
                      <UpdateBookingStatus
                        bookingId={booking.id}
                        currentStatus={booking.status}
                      />
                    </td>
                  </tr>
                )
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
