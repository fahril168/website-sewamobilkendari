import { cars } from "@/data/cars";
import CarCard from "./CarCard";

export default function CarCatalog() {
  return (
    <section id="katalog" className="bg-white px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#223A50] sm:text-3xl">
            Katalog Mobil Kami
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-slate-500">
            Pilih kendaraan yang sesuai dengan kebutuhan perjalanan Anda di
            Kendari dan sekitarnya.
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      </div>
    </section>
  );
}
