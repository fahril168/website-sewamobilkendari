import Image from "next/image";
import { CheckCircle2, MessageCircle } from "lucide-react";
import { generateGeneralWhatsAppLink } from "@/lib/whatsapp";
import { ScrollFadeUp } from "@/components/ScrollAnimation";
import HeroImageShapes from "@/components/HeroImageShapes";
import { getHeroSettings, getContactSettings } from "@/lib/settings";

export default async function Hero() {
  const hero = await getHeroSettings();
  const contact = await getContactSettings();

  const keyFeatures = hero.features || [
    "Antar-jemput Bandara Haluoleo",
    "Sopir berpengalaman",
    "Respon cepat via WhatsApp",
  ];

  return (
    <section
      id="beranda"
      className="relative bg-[#223A50] text-white px-4 py-12 sm:px-6 lg:px-8 lg:py-20 border-b border-slate-700 overflow-hidden"
    >
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          {/* Teks Kiri */}
          <div className="relative z-20 flex flex-col items-start text-left">
            <ScrollFadeUp delay={0.1} yOffset={20}>
              <span className="inline-block rounded-md bg-slate-800/80 border border-slate-700 px-3 py-1 text-xs font-semibold text-amber-400">
                {hero.tag}
              </span>
            </ScrollFadeUp>

            <ScrollFadeUp delay={0.2} yOffset={30}>
              <h1 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
                {hero.title}
              </h1>
            </ScrollFadeUp>

            <ScrollFadeUp delay={0.3} yOffset={30}>
              <p className="mt-4 text-base leading-relaxed text-slate-300 sm:text-lg">
                {hero.description}
              </p>
            </ScrollFadeUp>

            {/* Informasi Teks / Key Features */}
            <ScrollFadeUp delay={0.4} yOffset={25}>
              <div className="mt-6 flex flex-col gap-2.5">
                {keyFeatures.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-sm font-medium text-slate-200">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-amber-400" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </ScrollFadeUp>

            {/* Tombol CTA WhatsApp */}
            <ScrollFadeUp delay={0.5} yOffset={25}>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href={generateGeneralWhatsAppLink(contact.whatsapp_number)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative z-30 inline-flex items-center justify-center gap-2 rounded-md bg-amber-500 px-6 py-3.5 text-base font-bold text-[#223A50] transition-transform duration-200 hover:scale-105 hover:bg-amber-400 shadow-sm"
                >
                  <MessageCircle className="h-5 w-5" />
                  Chat &amp; Booking via WhatsApp
                </a>
              </div>
            </ScrollFadeUp>
          </div>

          {/* Gambar Mobil Kanan dengan Animated Dark Blue Shapes */}
          <ScrollFadeUp delay={0.3} yOffset={40}>
            <div className="relative z-10">
              {/* Moving Dark Blue Background Shapes specifically around the image */}
              <HeroImageShapes />

              <div className="relative z-10 overflow-hidden rounded-xl border border-slate-700 bg-slate-800/60 p-2 shadow-xl backdrop-blur-sm">
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg bg-slate-900">
                  <Image
                    src={hero.image_url || "/cars/innova-reborn.jpg"}
                    alt={hero.title}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <div className="mt-3 flex items-center justify-between px-2 pb-1 text-xs text-slate-300">
                  <span className="font-semibold text-white">{hero.favorite_unit}</span>
                  <span className="rounded bg-amber-500/20 text-amber-400 border border-amber-500/30 px-2 py-0.5 font-medium">
                    Unit Terfavorit
                  </span>
                </div>
              </div>
            </div>
          </ScrollFadeUp>
        </div>
      </div>
    </section>
  );
}
