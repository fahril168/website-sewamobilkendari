import pool from "@/lib/db";
import CarForm from "@/components/admin/CarForm";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function CreateCarPage() {
  const categoriesResult = await pool.query(
    "SELECT id, name FROM categories ORDER BY name"
  );

  return (
    <div>
      <div className="mb-6">
        <Link
          href="/admin/cars"
          className="mb-2 inline-flex items-center gap-1 text-sm text-slate-500 transition-colors hover:text-[#223A50]"
        >
          <ArrowLeft className="h-4 w-4" />
          Kembali ke Katalog
        </Link>
        <h1 className="text-2xl font-bold text-[#223A50]">Tambah Mobil Baru</h1>
        <p className="mt-1 text-sm text-slate-500">
          Isi data di bawah untuk menambahkan mobil ke katalog
        </p>
      </div>

      <CarForm categories={categoriesResult.rows} />
    </div>
  );
}
