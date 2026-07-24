import pool from "@/lib/db";
import DestinationForm from "@/components/admin/DestinationForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function CreateDestinationPage() {
  const carsResult = await pool.query(
    "SELECT id, name FROM cars ORDER BY name ASC"
  );

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
        <h1 className="text-2xl font-bold text-[#223A50]">Tambah Destinasi Wisata</h1>
        <p className="mt-1 text-sm text-slate-500">
          Tambahkan destinasi wisata baru yang menarik di Sulawesi Tenggara
        </p>
      </div>

      <DestinationForm cars={carsResult.rows} />
    </div>
  );
}
