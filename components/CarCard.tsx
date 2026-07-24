import Image from "next/image";
import { Users, Fuel, Settings2 } from "lucide-react";
import { formatPrice, generateWhatsAppLink } from "@/lib/whatsapp";
import type { Car } from "@/data/cars";

interface CarCardProps {
  car: Car;
}

export default function CarCard({ car }: CarCardProps) {
  return (
    <div className="group overflow-hidden rounded-lg border border-slate-200 bg-white transition-shadow hover:shadow-sm">
      {/* Image */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100">
        <Image
          src={car.image}
          alt={car.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded bg-amber-500 px-2.5 py-0.5 text-xs font-semibold text-[#223A50]">
          {car.type}
        </span>
        {car.status === "rented" ? (
          <span className="absolute right-3 top-3 rounded border border-rose-700/40 bg-rose-600 px-2.5 py-0.5 text-xs font-semibold text-white shadow-sm">
            Sedang Disewa
          </span>
        ) : (
          <span className="absolute right-3 top-3 rounded border border-emerald-700/40 bg-emerald-600 px-2.5 py-0.5 text-xs font-semibold text-white shadow-sm">
            Tersedia
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-bold text-[#223A50]">{car.name}</h3>

        {/* Specs */}
        <div className="mt-3 flex flex-wrap gap-4 text-sm text-slate-500">
          <span className="flex items-center gap-1.5">
            <Users className="h-4 w-4" />
            {car.capacity} Kursi
          </span>
          <span className="flex items-center gap-1.5">
            <Settings2 className="h-4 w-4" />
            {car.transmission}
          </span>
          <span className="flex items-center gap-1.5">
            <Fuel className="h-4 w-4" />
            {car.fuel}
          </span>
        </div>

        {/* Features */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {car.features.map((f) => (
            <span
              key={f}
              className="rounded border border-slate-200 bg-slate-50 px-2 py-0.5 text-xs text-slate-500"
            >
              {f}
            </span>
          ))}
        </div>

        {/* Price & CTA */}
        <div className="mt-4 flex items-end justify-between border-t border-slate-100 pt-4">
          <div>
            <p className="text-xl font-bold text-[#223A50]">
              {formatPrice(car.pricePerDay)}
            </p>
            <p className="text-xs text-slate-400">per hari</p>
          </div>
          {car.status === "rented" ? (
            <a
              href={generateWhatsAppLink(car.name, car.pricePerDay)}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md bg-amber-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-amber-500"
            >
              Tanya Jadwal
            </a>
          ) : (
            <a
              href={generateWhatsAppLink(car.name, car.pricePerDay)}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md bg-[#223A50] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#1a2e40]"
            >
              Book Now
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
