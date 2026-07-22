import { ShieldCheck, Clock, BadgeDollarSign, FileCheck } from "lucide-react";

const advantages = [
  {
    icon: ShieldCheck,
    title: "Kondisi Prima",
    description:
      "Seluruh unit mobil kami dalam kondisi terawat, bersih, dan siap pakai dengan perawatan berkala.",
  },
  {
    icon: Clock,
    title: "Tepat Waktu di Bandara Haluoleo",
    description:
      "Layanan antar-jemput bandara yang punctual. Kami pastikan Anda tidak menunggu lama.",
  },
  {
    icon: BadgeDollarSign,
    title: "Harga Transparan",
    description:
      "Tanpa biaya tersembunyi. Harga yang tertera sudah termasuk asuransi dan pajak kendaraan.",
  },
  {
    icon: FileCheck,
    title: "Syarat Mudah",
    description:
      "Cukup KTP dan SIM A untuk lepas kunci. Proses cepat tanpa ribet, bisa langsung jalan.",
  },
];

export default function Advantages() {
  return (
    <section
      id="keunggulan"
      className="bg-white px-4 py-16 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#223A50] sm:text-3xl">
            Mengapa Memilih Kami?
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-slate-500">
            Kami berkomitmen memberikan pengalaman sewa mobil terbaik di Kendari.
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {advantages.map((item) => (
            <div
              key={item.title}
              className="group rounded-lg border border-slate-200 bg-white p-6 text-center transition-all duration-300 hover:-translate-y-1.5 hover:shadow-md"
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-[#F8FAFC] transition-colors group-hover:bg-slate-100">
                <item.icon className="h-6 w-6 text-[#223A50]" />
              </div>
              <h3 className="mt-4 text-base font-bold text-[#223A50]">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
