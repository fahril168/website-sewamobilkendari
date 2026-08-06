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
      className="relative px-4 py-16 sm:px-6 lg:px-8 overflow-hidden text-white border-b border-slate-700/50"
    >
      {/* Background Image with Dark Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/destinations-bg.jpg"
          alt="Background Destinasi Wisata"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#162738]/90 via-[#182b3d]/85 to-[#0e1a26]/95 backdrop-blur-[2px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <ScrollFadeUp>
          <div className="text-center">
            <span className="inline-block rounded-md bg-amber-500/20 border border-amber-500/30 px-3 py-1 text-xs font-semibold text-amber-400 mb-3">
              Jelajahi Kendari
            </span>
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl tracking-tight">
              Destinasi Wisata Kendari
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-base text-slate-300">
              Jelajahi keindahan alam Sulawesi Tenggara dengan armada kendaraan nyaman dan prima dari kami.
            </p>
          </div>
        </ScrollFadeUp>

        <StaggerContainer className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {destinationList.map((dest) => (
            <StaggerItem key={dest.id}>
              <div className="group overflow-hidden rounded-xl border border-slate-700/70 bg-slate-900/80 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-amber-500/40 hover:shadow-2xl hover:shadow-amber-500/10 h-full flex flex-col justify-between">
                <div>
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-950">
                    <Image
                      src={dest.image}
                      alt={dest.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-60" />
                  </div>
                  <div className="p-5">
                    <h3 className="flex items-center gap-2 text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
                      <MapPin className="h-4 w-4 text-amber-400 shrink-0" />
                      {dest.name}
                    </h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-slate-300">
                      {dest.description}
                    </p>
                  </div>
                </div>
                {dest.recommendedCar && (
                  <div className="p-5 pt-0">
                    <div className="flex items-center gap-2 rounded-lg border border-slate-700/60 bg-slate-800/60 px-3.5 py-2 text-xs text-slate-300">
                      <Car className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                      Rekomendasi: <span className="font-semibold text-amber-400">{dest.recommendedCar}</span>
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
