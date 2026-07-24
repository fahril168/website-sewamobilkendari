import pool from "@/lib/db";
import DestinationForm from "@/components/admin/DestinationForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";

export default async function EditDestinationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [destResult, carsResult] = await Promise.all([
    pool.query(
      `SELECT id, name, description, image, recommended_car as "recommendedCar"
       FROM destinations
       WHERE id = $1`,
      [id]
    ),
    pool.query("SELECT id, name FROM cars ORDER BY name ASC"),
  ]);

  if (destResult.rows.length === 0) {
    notFound();
  }

  const destination = destResult.rows[0];

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-6">
        <Link
          href="/admin/destinations"
          className="mb-2 inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-[#223A50]"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Kembali ke Daftar Wisata
        </Link>
        <h1 className="text-2xl font-bold text-[#223A50]">Edit Destinasi Wisata</h1>
        <p className="mt-1 text-sm text-slate-500">
          Ubah informasi destinasi wisata &quot;{destination.name}&quot;
        </p>
      </div>

      <DestinationForm
        initialData={destination}
        cars={carsResult.rows}
        isEdit={true}
      />
    </div>
  );
}
