import pool from "@/lib/db";
import Link from "next/link";
import Image from "next/image";
import DeleteDestinationButton from "@/components/admin/DeleteDestinationButton";
import { Plus, MapPin, Car } from "lucide-react";

export default async function DestinationsAdminPage() {
  const result = await pool.query(`
    SELECT id, name, description, image, recommended_car as "recommendedCar", created_at
    FROM destinations
    ORDER BY created_at DESC
  `);

  const destinations = result.rows;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#223A50]">Kelola Wisata</h1>
          <p className="mt-1 text-sm text-slate-500">
            Kelola daftar destinasi wisata Kendari & Sulawesi Tenggara
          </p>
        </div>
        <Link
          href="/admin/destinations/create"
          className="inline-flex items-center gap-2 rounded-lg bg-amber-500 px-4 py-2.5 text-sm font-semibold text-[#223A50] shadow-sm transition-colors hover:bg-amber-400"
        >
          <Plus className="h-4 w-4" />
          Tambah Wisata
        </Link>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-100 bg-slate-50/80">
            <tr>
              <th className="px-4 py-3 font-medium text-slate-500">Gambar</th>
              <th className="px-4 py-3 font-medium text-slate-500">Destinasi</th>
              <th className="px-4 py-3 font-medium text-slate-500">Deskripsi</th>
              <th className="px-4 py-3 font-medium text-slate-500">Rekomendasi Mobil</th>
              <th className="px-4 py-3 font-medium text-slate-500 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {destinations.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-8 text-center text-slate-400"
                >
                  Belum ada data destinasi wisata
                </td>
              </tr>
            ) : (
              destinations.map((dest) => (
                <tr
                  key={dest.id}
                  className="transition-colors hover:bg-slate-50/50"
                >
                  <td className="px-4 py-3">
                    <div className="relative h-14 w-24 overflow-hidden rounded-lg border border-slate-200 bg-slate-100">
                      <Image
                        src={dest.image}
                        alt={dest.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div>
                      <p className="font-semibold text-[#223A50] flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                        {dest.name}
                      </p>
                      <p className="font-mono text-xs text-slate-400 mt-0.5">{dest.id}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3 max-w-md">
                    <p className="line-clamp-2 text-xs text-slate-600 leading-relaxed">
                      {dest.description}
                    </p>
                  </td>
                  <td className="px-4 py-3">
                    {dest.recommendedCar ? (
                      <span className="inline-flex items-center gap-1 rounded border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-700">
                        <Car className="h-3 w-3 text-slate-400" />
                        {dest.recommendedCar}
                      </span>
                    ) : (
                      <span className="text-xs text-slate-400">-</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/destinations/${dest.id}/edit`}
                        className="rounded-md border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-50"
                      >
                        Edit
                      </Link>
                      <DeleteDestinationButton
                        destinationId={dest.id}
                        destinationName={dest.name}
                      />
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
