"use client";

import { useState } from "react";
import { Menu, X, Car } from "lucide-react";
import { generateGeneralWhatsAppLink } from "@/lib/whatsapp";

const navLinks = [
  { label: "Beranda", href: "#beranda" },
  { label: "Katalog Mobil", href: "#katalog" },
  { label: "Layanan", href: "#layanan" },
  { label: "Destinasi Wisata", href: "#destinasi" },
  { label: "Keunggulan", href: "#keunggulan" },
  { label: "Kontak", href: "#kontak" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#223A50] text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Brand */}
        <a href="#beranda" className="flex items-center gap-2">
          <Car className="h-6 w-6 text-amber-400" />
          <span className="text-lg font-bold tracking-tight">
            SewaMobilKendari<span className="text-amber-400">.com</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-7 lg:gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-200 transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA Desktop */}
        <a
          href={generateGeneralWhatsAppLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden rounded-md bg-amber-500 px-5 py-2 text-sm font-semibold text-[#223A50] transition-colors hover:bg-amber-400 md:inline-block"
        >
          Hubungi Kami
        </a>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="text-white md:hidden"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="border-t border-slate-600 bg-[#223A50] px-4 pb-4 md:hidden">
          <nav className="flex flex-col gap-3 pt-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-sm font-medium text-slate-200 transition-colors hover:text-white"
              >
                {link.label}
              </a>
            ))}
            <a
              href={generateGeneralWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 rounded-md bg-amber-500 px-5 py-2 text-center text-sm font-semibold text-[#223A50] transition-colors hover:bg-amber-400"
            >
              Hubungi Kami
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
