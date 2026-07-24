import pool from "@/lib/db";
import CarCard from "./CarCard";
import { cars as defaultCars, Car } from "@/data/cars";
import { ScrollFadeUp, StaggerContainer, StaggerItem } from "@/components/ScrollAnimation";

export default async function CarCatalog() {
  let carList: Car[] = defaultCars;

  try {
    const result = await pool.query(`
      SELECT c.*, cat.name as category_name,
        COALESCE(
          json_agg(cf.feature_name) FILTER (WHERE cf.feature_name IS NOT NULL),
          '[]'
        ) as features
      FROM cars c
      LEFT JOIN categories cat ON c.category_id = cat.id
      LEFT JOIN car_features cf ON c.id = cf.car_id
      WHERE c.status != 'maintenance'::car_status
      GROUP BY c.id, cat.name
      ORDER BY c.is_featured DESC, c.created_at DESC
    `);

    if (result.rows.length > 0) {
      carList = result.rows.map((row) => ({
        id: row.id,
        name: row.name,
        type: row.category_name || "Lainnya",
        transmission: row.transmission,
        fuel: row.fuel_type,
        capacity: row.capacity,
        pricePerDay: parseFloat(row.price_per_day),
        image: row.image_url,
        features: row.features || [],
        status: row.status,
      }));
    }
  } catch (error) {
    console.error("Error fetching cars in CarCatalog:", error);
    carList = defaultCars;
  }

  return (
    <section id="katalog" className="bg-white px-4 py-16 sm:px-6 lg:px-8 overflow-hidden">
      <div className="mx-auto max-w-7xl">
        <ScrollFadeUp>
          <div className="text-center">
            <h2 className="text-2xl font-bold text-[#223A50] sm:text-3xl">
              Katalog Mobil Kami
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-sm text-slate-500">
              Pilih kendaraan yang sesuai dengan kebutuhan perjalanan Anda di
              Kendari dan sekitarnya.
            </p>
          </div>
        </ScrollFadeUp>

        <StaggerContainer className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {carList.map((car) => (
            <StaggerItem key={car.id}>
              <CarCard car={car} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

