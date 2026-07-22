import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "SewaMobilKendari.com — Sewa Mobil Mudah & Terpercaya di Kendari",
  description:
    "Layanan sewa mobil lepas kunci dan dengan driver profesional di Kendari, Sulawesi Tenggara. Harga transparan, unit terawat, proses cepat.",
  keywords: [
    "sewa mobil kendari",
    "rental mobil kendari",
    "sewa mobil sulawesi tenggara",
    "rental mobil bandara haluoleo",
    "sewa mobil lepas kunci kendari",
  ],
  openGraph: {
    title: "SewaMobilKendari.com — Sewa Mobil Mudah & Terpercaya di Kendari",
    description:
      "Layanan sewa mobil lepas kunci dan dengan driver profesional di Kendari, Sulawesi Tenggara.",
    type: "website",
    locale: "id_ID",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${inter.variable} h-full`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col font-sans antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
