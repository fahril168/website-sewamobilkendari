import { MapPin, Phone, Clock, MessageCircle } from "lucide-react";
import { generateGeneralWhatsAppLink } from "@/lib/whatsapp";
import { ScrollFadeUp } from "@/components/ScrollAnimation";
import { getContactSettings } from "@/lib/settings";

// Custom SVG icon for Instagram
function InstagramIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export default async function ContactSection() {
  const contact = await getContactSettings();

  const whatsappNumber = contact.whatsapp_number || "+62 823-4567-8901";
  const instagramHandle = contact.instagram_handle || "@sewamobilkendari_official";
  const instagramUrl = contact.instagram_url || "https://instagram.com";
  const mapsSrc =
    contact.maps_embed_url ||
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127116.74872719247!2d122.463242!3d-3.998462!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2d98b2512f45511b%3A0xa597394c8e718b53!2sKendari%2C%20Kendari%20City%2C%20Southeast%20Sulawesi!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid";

  return (
    <section id="kontak" className="bg-[#F8FAFC] px-4 py-16 sm:px-6 lg:px-8 border-t border-slate-200 overflow-hidden">
      <div className="mx-auto max-w-7xl">
        <ScrollFadeUp>
          <div className="text-center">
            <span className="inline-block rounded bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-700 border border-amber-500/20">
              Layanan 24 Jam
            </span>
            <h2 className="mt-3 text-2xl font-bold text-[#223A50] sm:text-3xl">
              Lokasi &amp; Kontak Rental
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-sm text-slate-500">
              Kunjungi garasi kami di Kendari atau hubungi tim customer service kami untuk pemesanan cepat.
            </p>
          </div>
        </ScrollFadeUp>

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12 items-stretch">
          {/* Google Maps Embed (Kiri) */}
          <ScrollFadeUp delay={0.2} yOffset={35} className="h-full">
            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white min-h-[350px] lg:min-h-[100%] flex flex-col shadow-sm h-full">
              <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                <span className="text-sm font-semibold text-[#223A50] flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-amber-500" /> Peta Lokasi Garasi (Kendari)
                </span>
                <span className="text-xs text-slate-400">Google Maps</span>
              </div>
              <div className="relative flex-1 w-full min-h-[320px]">
                <iframe
                  title="Lokasi Sewa Mobil Kendari"
                  src={mapsSrc}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 w-full h-full"
                ></iframe>
              </div>
            </div>
          </ScrollFadeUp>

          {/* Info & Tombol Kontak (Kanan) */}
          <ScrollFadeUp delay={0.3} yOffset={35} className="h-full">
            <div className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm h-full">
              <div>
                <h3 className="text-xl font-bold text-[#223A50] border-b border-slate-100 pb-4">
                  Informasi Kontak &amp; Garasi
                </h3>

                <div className="mt-6 space-y-5 text-sm text-slate-600">
                  <div className="flex items-start gap-3.5">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-[#223A50]">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-[#223A50]">Alamat Utama</p>
                      <p className="mt-0.5 leading-relaxed text-slate-500">
                        {contact.address}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-[#223A50]">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-[#223A50]">Jam Operasional</p>
                      <p className="mt-0.5 text-slate-500">{contact.operational_hours}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-[#223A50]">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-[#223A50]">Nomor WhatsApp / Telepon</p>
                      <p className="mt-0.5 text-slate-500">{whatsappNumber}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-[#223A50]">
                      <InstagramIcon className="h-5 w-5 text-pink-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-[#223A50]">Instagram Resmi</p>
                      <p className="mt-0.5 text-slate-500">{instagramHandle}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-col sm:flex-row gap-3.5 pt-6 border-t border-slate-100">
                <a
                  href={generateGeneralWhatsAppLink(whatsappNumber)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2.5 rounded-lg bg-emerald-600 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-emerald-700 shadow-sm"
                >
                  <MessageCircle className="h-5 w-5" />
                  Chat via WhatsApp
                </a>

                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2.5 rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition-colors hover:bg-slate-50 hover:text-slate-900 shadow-sm"
                >
                  <InstagramIcon className="h-5 w-5 text-pink-600" />
                  Follow Instagram
                </a>
              </div>
            </div>
          </ScrollFadeUp>
        </div>
      </div>
    </section>
  );
}
