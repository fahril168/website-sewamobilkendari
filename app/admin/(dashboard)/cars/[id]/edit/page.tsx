import pool from "@/lib/db";
import CarForm from "@/components/admin/CarForm";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function EditCarPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [carResult, featuresResult, categoriesResult] = await Promise.all([
    pool.query("SELECT * FROM cars WHERE id = $1", [id]),
    pool.query("SELECT feature_name FROM car_features WHERE car_id = $1", [id]),
    pool.query("SELECT id, name FROM categories ORDER BY name"),
  ]);

  if (carResult.rows.length === 0) {
    notFound();
  }

  const car = carResult.rows[0];
  const features = featuresResult.rows.map((r) => r.feature_name);

  const initialData = {
    id: car.id,
    name: car.name,
    slug: car.slug,
    category_id: car.category_id,
    transmission: car.transmission,
    fuel_type: car.fuel_type,
    capacity: car.capacity,
    price_per_day: parseFloat(car.price_per_day),
    image_url: car.image_url,
    status: car.status,
    is_featured: car.is_featured,
    features,
  };

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
        <h1 className="text-2xl font-bold text-[#223A50]">
          Edit: {car.name}
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Perbarui informasi mobil di bawah
        </p>
      </div>

      <CarForm
        initialData={initialData}
        categories={categoriesResult.rows}
        isEdit
      />
    </div>
  );
}
