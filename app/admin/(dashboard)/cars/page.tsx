import pool from "@/lib/db";
import Link from "next/link";
import StatusBadge from "@/components/admin/StatusBadge";
import DeleteCarButton from "@/components/admin/DeleteCarButton";
import ToggleCarStatus from "@/components/admin/ToggleCarStatus";
import { Plus } from "lucide-react";

export default async function CarsPage() {
  // Sync car status with active bookings (rented vs available, preserving maintenance)
  await pool.query(`
    UPDATE cars
    SET status = CASE
      WHEN (
        SELECT COUNT(*) FROM bookings b
        WHERE b.car_id = cars.id AND b.status IN ('pending', 'confirmed')
      ) > 0 THEN 'rented'::car_status
      ELSE 'available'::car_status
    END
    WHERE status != 'maintenance'::car_status
  `);

  const result = await pool.query(`
    SELECT c.*, cat.name as category_name,
      COALESCE(
        json_agg(cf.feature_name) FILTER (WHERE cf.feature_name IS NOT NULL),
        '[]'
      ) as features
    FROM cars c
    LEFT JOIN categories cat ON c.category_id = cat.id
    LEFT JOIN car_features cf ON c.id = cf.car_id
    GROUP BY c.id, cat.name
    ORDER BY c.created_at DESC
  `);

  const cars = result.rows;

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#223A50]">Katalog Mobil</h1>
          <p className="mt-1 text-sm text-slate-500">
            Kelola armada mobil rental Anda
          </p>
        </div>
        <Link
          href="/admin/cars/create"
          className="inline-flex items-center gap-2 rounded-lg bg-amber-500 px-4 py-2.5 text-sm font-semibold text-[#223A50] shadow-sm transition-colors hover:bg-amber-400"
        >
          <Plus className="h-4 w-4" />
          Tambah Mobil
        </Link>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-100 bg-slate-50/80">
            <tr>
              <th className="px-4 py-3 font-medium text-slate-500">Mobil</th>
              <th className="px-4 py-3 font-medium text-slate-500">Tipe</th>
              <th className="px-4 py-3 font-medium text-slate-500">Transmisi</th>
              <th className="px-4 py-3 font-medium text-slate-500">Kapasitas</th>
              <th className="px-4 py-3 font-medium text-slate-500">Harga/Hari</th>
              <th className="px-4 py-3 font-medium text-slate-500">Tampilkan di Web</th>
              <th className="px-4 py-3 font-medium text-slate-500">Status</th>
              <th className="px-4 py-3 font-medium text-slate-500">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {cars.length === 0 ? (
              <tr>
                <td
                  colSpan={8}
                  className="px-4 py-8 text-center text-slate-400"
                >
                  Belum ada mobil
                </td>
              </tr>
            ) : (
              cars.map((car) => (
                <tr
                  key={car.id}
                  className="transition-colors hover:bg-slate-50/50"
                >
                  <td className="px-4 py-3">
                    <div>
                      <p className="font-medium text-[#223A50]">{car.name}</p>
                      <p className="text-xs text-slate-400">{car.fuel_type}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="rounded bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">
                      {car.category_name || "-"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{car.transmission}</td>
                  <td className="px-4 py-3 text-slate-600">{car.capacity} Kursi</td>
                  <td className="px-4 py-3 font-medium text-[#223A50]">
                    {formatPrice(parseFloat(car.price_per_day))}
                  </td>
                  <td className="px-4 py-3">
                    <ToggleCarStatus carId={car.id} currentStatus={car.status} />
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={car.status} />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/admin/cars/${car.id}/edit`}
                        className="rounded-md border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-50"
                      >
                        Edit
                      </Link>
                      <DeleteCarButton carId={car.id} carName={car.name} />
                    </div>
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

