import Image from "next/image";
import { MapPin, Car } from "lucide-react";
import pool from "@/lib/db";
import { destinations as defaultDestinations, Destination } from "@/data/destinations";
import { ScrollFadeUp, StaggerContainer, StaggerItem } from "@/components/ScrollAnimation";

export default async function Destinations() {
  let destinationList: Destination[] = [];

  try {
    const result = await pool.query(
      `SELECT id, name, description, image, recommended_car as "recommendedCar" FROM destinations ORDER BY created_at DESC`
    );
    if (result.rows.length > 0) {
      destinationList = result.rows;
    } else {
      destinationList = defaultDestinations;
    }
  } catch (error) {
    console.error("Error fetching destinations:", error);
    destinationList = defaultDestinations;
  }

  return (
    <section
      id="destinasi"
      className="bg-[#F8FAFC] px-4 py-16 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl">
        <ScrollFadeUp>
          <div className="text-center">
            <h2 className="text-2xl font-bold text-[#223A50] sm:text-3xl">
              Destinasi Wisata Kendari
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-sm text-slate-500">
              Jelajahi keindahan Sulawesi Tenggara dengan kendaraan nyaman dari
              kami.
            </p>
          </div>
        </ScrollFadeUp>

        <StaggerContainer className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {destinationList.map((dest) => (
            <StaggerItem key={dest.id}>
              <div className="group overflow-hidden rounded-lg border border-slate-200 bg-white transition-shadow hover:shadow-md h-full flex flex-col justify-between">
                <div>
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                    <Image
                      src={dest.image}
                      alt={dest.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="flex items-center gap-1.5 text-lg font-bold text-[#223A50]">
                      <MapPin className="h-4 w-4 text-amber-500" />
                      {dest.name}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-500">
                      {dest.description}
                    </p>
                  </div>
                </div>
                {dest.recommendedCar && (
                  <div className="p-4 pt-0">
                    <div className="flex items-center gap-1.5 rounded border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs text-slate-500">
                      <Car className="h-3.5 w-3.5" />
                      Rekomendasi: <span className="font-semibold text-[#223A50]">{dest.recommendedCar}</span>
                    </div>
                  </div>
                )}
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
