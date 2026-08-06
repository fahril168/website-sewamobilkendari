import { Award, ShieldCheck, Car, Star } from "lucide-react";
import { StaggerContainer, StaggerItem } from "@/components/ScrollAnimation";

const stats = [
  {
    icon: Award,
    value: "500+",
    label: "Perjalanan Sukses",
    subtext: "Dinas, Wisata & Keluarga",
  },
  {
    icon: ShieldCheck,
    value: "100%",
    label: "Unit Kondisi Prima",
    subtext: "Terawat & Bersih",
  },
  {
    icon: Car,
    value: "15+",
    label: "Mobil Prima",
    subtext: "MPV, SUV, City Car & Van",
  },
  {
    icon: Star,
    value: "4.9/5",
    label: "Rating Kepuasan",
    subtext: "Ulasan Pelanggan Setia",
  },
];

export default function StatsBanner() {
  return (
    <section className="border-y border-slate-200 bg-white py-6 px-2 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <StaggerContainer className="grid grid-cols-4 gap-2 sm:gap-4 md:gap-8">
          {stats.map((item, idx) => (
            <StaggerItem key={idx}>
              <div className="flex flex-col items-center text-center gap-1.5 p-1 sm:p-3 rounded-lg transition-colors hover:bg-slate-50">
                <div className="flex h-9 w-9 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-lg sm:rounded-xl bg-amber-50 text-amber-600 border border-amber-200/60">
                  <item.icon className="h-4.5 w-4.5 sm:h-6 sm:w-6" />
                </div>
                <div>
                  <p className="text-base sm:text-2xl font-extrabold tracking-tight text-[#223A50]">
                    {item.value}
                  </p>
                  <p className="text-[11px] sm:text-sm font-semibold leading-tight text-slate-800">
                    {item.label}
                  </p>
                  <p className="mt-0.5 text-[10px] sm:text-xs text-slate-500 hidden sm:block">
                    {item.subtext}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
