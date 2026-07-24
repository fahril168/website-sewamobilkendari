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
    <section className="border-y border-slate-200 bg-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <StaggerContainer className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
          {stats.map((item, idx) => (
            <StaggerItem key={idx}>
              <div className="flex flex-col items-center text-center sm:flex-row sm:text-left sm:items-start gap-3.5 p-3 rounded-lg transition-colors hover:bg-slate-50">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600 border border-amber-200/60">
                  <item.icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-2xl font-extrabold tracking-tight text-[#223A50]">
                    {item.value}
                  </p>
                  <p className="text-sm font-semibold text-slate-800">
                    {item.label}
                  </p>
                  <p className="text-xs text-slate-500">
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
