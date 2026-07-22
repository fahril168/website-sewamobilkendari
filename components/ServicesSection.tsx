import { KeyRound, UserCheck, PlaneTakeoff, CalendarRange } from "lucide-react";

const services = [
  {
    icon: KeyRound,
    title: "Sewa Mobil Lepas Kunci",
    subtitle: "Self-Drive Rental",
    description:
      "Kendalikan kemudi sendiri dengan fleksibel. Pilihan tepat untuk perjalanan yang mengutamakan privasi dan kebebasan mengeksplorasi Kota Kendari.",
  },
  {
    icon: UserCheck,
    title: "Sewa Mobil Plus Driver",
    subtitle: "With Professional Driver",
    description:
      "Perjalanan lebih santai bersama pengemudi berpengalaman yang ramah dan menguasai rute wilayah Sulawesi Tenggara. Nikmati perjalanan tanpa perlu lelah menyetir.",
  },
  {
    icon: PlaneTakeoff,
    title: "Antar-Jemput Bandara Haluoleo",
    subtitle: "Airport Transfer Service",
    description:
      "Layanan penjemputan dan pengantaran tepat waktu di Bandara Haluoleo Kendari. Kendaraan sudah siap menyambut kedatangan Anda tanpa perlu menunggu lama.",
  },
  {
    icon: CalendarRange,
    title: "Sewa Harian, Mingguan & Bulanan",
    subtitle: "Flexible Rental Duration",
    description:
      "Paket sewa yang dapat disesuaikan dengan kebutuhan Anda, mulai dari harian untuk wisata, mingguan untuk dinas, hingga kontrak jangka panjang instansi.",
  },
];

export default function ServicesSection() {
  return (
    <section id="layanan" className="bg-[#F8FAFC] px-4 py-16 sm:px-6 lg:px-8 border-t border-slate-200">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <span className="inline-block rounded bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-700 border border-amber-500/20">
            Pilihan Solusi Perjalanan
          </span>
          <h2 className="mt-3 text-2xl font-bold text-[#223A50] sm:text-3xl">
            Layanan Rental Mobil Kami
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-slate-500">
            Berbagai opsi sewa kendaraan fleksibel yang dirancang untuk memenuhi kebutuhan perjalanan dinas, pribadi, maupun wisata di Kendari.
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((item) => (
            <div
              key={item.title}
              className="group flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-md"
            >
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#F8FAFC] text-[#223A50] transition-colors group-hover:bg-amber-50 group-hover:text-amber-600">
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-lg font-bold text-[#223A50]">
                  {item.title}
                </h3>
                <p className="text-xs font-medium text-amber-600 mb-3">
                  {item.subtitle}
                </p>
                <p className="text-sm leading-relaxed text-slate-500">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
