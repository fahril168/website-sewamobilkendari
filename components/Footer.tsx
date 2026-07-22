import { MapPin, Phone, Mail, Car } from "lucide-react";
import { generateGeneralWhatsAppLink } from "@/lib/whatsapp";

export default function Footer() {
  return (
    <footer id="kontak" className="bg-[#223A50] text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2">
              <Car className="h-6 w-6 text-amber-400" />
              <span className="text-lg font-bold text-white">
                SewaMobilKendari<span className="text-amber-400">.com</span>
              </span>
            </div>
            <p className="mt-3 text-sm leading-relaxed">
              Penyedia layanan sewa mobil terpercaya di Kota Kendari, Sulawesi
              Tenggara. Melayani lepas kunci maupun dengan driver profesional.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
              Kontak
            </h4>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
                Jl. Sultan Hasanuddin No. 12, Kendari, Sulawesi Tenggara 93111
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-amber-400" />
                +62 823-4567-8901
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-amber-400" />
                info@sewamobilkendari.com
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
              Navigasi
            </h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a href="#beranda" className="transition-colors hover:text-white">
                  Beranda
                </a>
              </li>
              <li>
                <a href="#katalog" className="transition-colors hover:text-white">
                  Katalog Mobil
                </a>
              </li>
              <li>
                <a href="#destinasi" className="transition-colors hover:text-white">
                  Destinasi Wisata
                </a>
              </li>
              <li>
                <a
                  href={generateGeneralWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-white"
                >
                  Hubungi via WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-600 pt-6 text-center text-xs text-slate-400">
          © 2026 SewaMobilKendari.com — Seluruh hak cipta dilindungi.
        </div>
      </div>
    </footer>
  );
}
