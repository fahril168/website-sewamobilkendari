import Image from "next/image";
import { CheckCircle2, MessageCircle } from "lucide-react";
import { generateGeneralWhatsAppLink } from "@/lib/whatsapp";

export default function Hero() {
  const keyFeatures = [
    "Antar-jemput Bandara Haluoleo",
    "Sopir berpengalaman",
    "Respon cepat via WhatsApp",
  ];

  return (
    <section
      id="beranda"
      className="bg-[#223A50] text-white px-4 py-12 sm:px-6 lg:px-8 lg:py-20 border-b border-slate-700"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          {/* Teks Kiri */}
          <div className="flex flex-col items-start text-left">
            <span className="inline-block rounded-md bg-slate-800/80 border border-slate-700 px-3 py-1 text-xs font-semibold text-amber-400">
              #1 Rental Mobil Terpercaya di Kendari
            </span>

            <h1 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
              Sewa Mobil Mudah &amp; Terpercaya di Kendari
            </h1>

            <p className="mt-4 text-base leading-relaxed text-slate-300 sm:text-lg">
              Layanan sewa mobil lepas kunci atau dengan driver profesional untuk
              keperluan dinas, wisata, dan perjalanan keluarga di Sulawesi Tenggara.
            </p>

            {/* Informasi Teks / Key Features */}
            <div className="mt-6 flex flex-col gap-2.5">
              {keyFeatures.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-sm font-medium text-slate-200">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-amber-400" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            {/* Tombol CTA WhatsApp */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={generateGeneralWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-amber-500 px-6 py-3.5 text-base font-bold text-[#223A50] transition-colors hover:bg-amber-400 shadow-sm"
              >
                <MessageCircle className="h-5 w-5" />
                Chat &amp; Booking via WhatsApp
              </a>
            </div>
          </div>

          {/* Gambar Mobil Kanan */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-xl border border-slate-700 bg-slate-800/40 p-2 shadow-sm">
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg bg-slate-900">
                <Image
                  src="/cars/innova-reborn.jpg"
                  alt="Sewa Mobil Kendari Toyota Innova Reborn"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="mt-3 flex items-center justify-between px-2 pb-1 text-xs text-slate-300">
                <span className="font-semibold text-white">Toyota Innova Reborn Premium</span>
                <span className="rounded bg-amber-500/20 text-amber-400 border border-amber-500/30 px-2 py-0.5 font-medium">
                  Unit Terfavorit
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
