"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { HeroSettings, ContactSettings } from "@/lib/settings-defaults";
import { Upload, X, Plus, CheckCircle, Sliders, PhoneCall, Layout, ImageIcon } from "lucide-react";
import Image from "next/image";

interface SiteSettingsFormProps {
  initialHero: HeroSettings;
  initialContact: ContactSettings;
  availableCars?: { id: string; name: string; image_url: string }[];
}

export default function SiteSettingsForm({
  initialHero,
  initialContact,
  availableCars = [],
}: SiteSettingsFormProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"hero" | "contact">("hero");
  const [hero, setHero] = useState<HeroSettings>(initialHero);
  const [contact, setContact] = useState<ContactSettings>(initialContact);

  const [featureInput, setFeatureInput] = useState("");
  const [loadingHero, setLoadingHero] = useState(false);
  const [loadingContact, setLoadingContact] = useState(false);
  const [uploadingHeroImage, setUploadingHeroImage] = useState(false);

  const [heroMessage, setHeroMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [contactMessage, setContactMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleHeroImageUpload = async (file: File) => {
    setUploadingHeroImage(true);
    setHeroMessage(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", "cars");

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        setHeroMessage({ type: "error", text: data.error || "Gagal mengupload gambar" });
        return;
      }

      setHero({ ...hero, image_url: data.imageUrl });
    } catch {
      setHeroMessage({ type: "error", text: "Terjadi kesalahan saat mengupload gambar" });
    } finally {
      setUploadingHeroImage(false);
    }
  };

  const addHeroFeature = () => {
    const trimmed = featureInput.trim();
    if (trimmed && !hero.features.includes(trimmed)) {
      setHero({ ...hero, features: [...hero.features, trimmed] });
      setFeatureInput("");
    }
  };

  const removeHeroFeature = (index: number) => {
    setHero({ ...hero, features: hero.features.filter((_, i) => i !== index) });
  };

  const handleSaveHero = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingHero(true);
    setHeroMessage(null);

    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: "hero", value: hero }),
      });

      const data = await res.json();

      if (!res.ok) {
        setHeroMessage({ type: "error", text: data.error || "Gagal menyimpan Hero Section" });
        return;
      }

      setHeroMessage({ type: "success", text: "Konten Hero Section berhasil diperbarui!" });
      router.refresh();
    } catch {
      setHeroMessage({ type: "error", text: "Terjadi kesalahan jaringan" });
    } finally {
      setLoadingHero(false);
    }
  };

  const handleSaveContact = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingContact(true);
    setContactMessage(null);

    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: "contact", value: contact }),
      });

      const data = await res.json();

      if (!res.ok) {
        setContactMessage({ type: "error", text: data.error || "Gagal menyimpan informasi kontak" });
        return;
      }

      setContactMessage({ type: "success", text: "Informasi kontak berhasil diperbarui!" });
      router.refresh();
    } catch {
      setContactMessage({ type: "error", text: "Terjadi kesalahan jaringan" });
    } finally {
      setLoadingContact(false);
    }
  };

  const inputClass =
    "w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500/50 transition-colors";
  const labelClass = "mb-1.5 block text-sm font-medium text-slate-600";

  return (
    <div className="space-y-6">
      {/* Tabs Header */}
      <div className="flex border-b border-slate-200">
        <button
          onClick={() => setActiveTab("hero")}
          className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-semibold transition-colors ${
            activeTab === "hero"
              ? "border-amber-500 text-amber-600"
              : "border-transparent text-slate-500 hover:text-slate-700"
          }`}
        >
          <Layout className="h-4 w-4" />
          Konten Hero Section
        </button>
        <button
          onClick={() => setActiveTab("contact")}
          className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-semibold transition-colors ${
            activeTab === "contact"
              ? "border-amber-500 text-amber-600"
              : "border-transparent text-slate-500 hover:text-slate-700"
          }`}
        >
          <PhoneCall className="h-4 w-4" />
          Informasi Kontak & Garasi
        </button>
      </div>

      {/* Tab 1: Hero Section Settings */}
      {activeTab === "hero" && (
        <form onSubmit={handleSaveHero} className="space-y-6">
          {heroMessage && (
            <div
              className={`rounded-lg border px-4 py-3 text-sm ${
                heroMessage.type === "success"
                  ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                  : "border-red-200 bg-red-50 text-red-700"
              }`}
            >
              {heroMessage.text}
            </div>
          )}

          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-base font-semibold text-[#223A50]">
              Teks & Deskripsi Utama
            </h3>

            <div className="space-y-4">
              <div>
                <label htmlFor="heroTag" className={labelClass}>
                  Badge / Tagline *
                </label>
                <input
                  id="heroTag"
                  type="text"
                  value={hero.tag}
                  onChange={(e) => setHero({ ...hero, tag: e.target.value })}
                  required
                  placeholder="#1 Rental Mobil Terpercaya di Kendari"
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="heroTitle" className={labelClass}>
                  Judul Utama (Headline H1) *
                </label>
                <input
                  id="heroTitle"
                  type="text"
                  value={hero.title}
                  onChange={(e) => setHero({ ...hero, title: e.target.value })}
                  required
                  placeholder="Sewa Mobil Mudah & Terpercaya di Kendari"
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="heroDescription" className={labelClass}>
                  Sub-judul / Deskripsi Singkat *
                </label>
                <textarea
                  id="heroDescription"
                  rows={3}
                  value={hero.description}
                  onChange={(e) => setHero({ ...hero, description: e.target.value })}
                  required
                  placeholder="Layanan sewa mobil lepas kunci atau dengan driver..."
                  className={inputClass}
                />
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-base font-semibold text-[#223A50]">
              Poin Keunggulan / Fitur Hero
            </h3>

            <div className="space-y-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={featureInput}
                  onChange={(e) => setFeatureInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addHeroFeature();
                    }
                  }}
                  placeholder="Contoh: Antar-jemput Bandara Haluoleo"
                  className={inputClass}
                />
                <button
                  type="button"
                  onClick={addHeroFeature}
                  className="shrink-0 rounded-lg bg-[#223A50] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#1a2e40]"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              <div className="flex flex-col gap-2">
                {hero.features.map((feature, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2 text-sm text-slate-700"
                  >
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-amber-500" />
                      <span>{feature}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeHeroFeature(idx)}
                      className="text-slate-400 hover:text-red-500"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-base font-semibold text-[#223A50]">
              Gambar Showcase & Badge Unit Terfavorit
            </h3>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="favoriteUnit" className={labelClass}>
                  Nama Unit Terfavorit *
                </label>
                <input
                  id="favoriteUnit"
                  type="text"
                  value={hero.favorite_unit}
                  onChange={(e) => setHero({ ...hero, favorite_unit: e.target.value })}
                  required
                  placeholder="Toyota Innova Reborn Premium"
                  className={inputClass}
                />
              </div>

              <div className="sm:col-span-2">
                <label className={labelClass}>Gambar Showcase Mobil Hero *</label>

                {availableCars.length > 0 && (
                  <div className="mb-3">
                    <label className="mb-1 block text-xs text-slate-500">
                      Pilih dari Katalog Mobil:
                    </label>
                    <select
                      onChange={(e) => {
                        if (e.target.value) {
                          setHero({ ...hero, image_url: e.target.value });
                        }
                      }}
                      className={inputClass}
                    >
                      <option value="">-- Pilih Mobil --</option>
                      {availableCars.map((car) => (
                        <option key={car.id} value={car.image_url}>
                          {car.name} ({car.image_url})
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Preview Image */}
                {hero.image_url && (
                  <div className="relative mb-3 w-full max-w-sm overflow-hidden rounded-lg border border-slate-200 bg-slate-50">
                    <div className="relative aspect-[16/10] w-full">
                      <Image
                        src={hero.image_url}
                        alt="Hero Preview"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                )}

                {/* Upload or Manual URL */}
                <div className="flex flex-col gap-3">
                  <label
                    htmlFor="hero-image-upload"
                    className={`flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed px-4 py-6 transition-colors ${
                      uploadingHeroImage
                        ? "border-amber-300 bg-amber-50/50"
                        : "border-slate-300 bg-slate-50 hover:border-amber-400 hover:bg-amber-50/30"
                    }`}
                  >
                    {uploadingHeroImage ? (
                      <p className="text-sm font-medium text-amber-600">Mengupload...</p>
                    ) : (
                      <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
                        <Upload className="h-4 w-4 text-slate-500" />
                        <span>Upload Gambar Baru</span>
                      </div>
                    )}
                    <input
                      id="hero-image-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleHeroImageUpload(file);
                      }}
                    />
                  </label>

                  <input
                    type="text"
                    value={hero.image_url}
                    onChange={(e) => setHero({ ...hero, image_url: e.target.value })}
                    placeholder="/cars/innova-reborn.jpg"
                    className={inputClass}
                  />
                </div>
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loadingHero}
              className="rounded-lg bg-amber-500 px-6 py-2.5 text-sm font-semibold text-[#223A50] shadow-sm transition-colors hover:bg-amber-400 disabled:opacity-50"
            >
              {loadingHero ? "Menyimpan..." : "Simpan Perubahan Hero"}
            </button>
          </div>
        </form>
      )}

      {/* Tab 2: Contact & Company Settings */}
      {activeTab === "contact" && (
        <form onSubmit={handleSaveContact} className="space-y-6">
          {contactMessage && (
            <div
              className={`rounded-lg border px-4 py-3 text-sm ${
                contactMessage.type === "success"
                  ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                  : "border-red-200 bg-red-50 text-red-700"
              }`}
            >
              {contactMessage.text}
            </div>
          )}

          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-base font-semibold text-[#223A50]">
              Kontak Utama & Jam Operasional
            </h3>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="waNumber" className={labelClass}>
                  Nomor WhatsApp *
                </label>
                <input
                  id="waNumber"
                  type="text"
                  value={contact.whatsapp_number}
                  onChange={(e) => setContact({ ...contact, whatsapp_number: e.target.value })}
                  required
                  placeholder="+62 823-4567-8901"
                  className={inputClass}
                />
                <p className="mt-1 text-xs text-slate-400">
                  Nomor WhatsApp ini digunakan secara otomatis di seluruh tombol & floating chat.
                </p>
              </div>

              <div>
                <label htmlFor="email" className={labelClass}>
                  Email Perusahaan
                </label>
                <input
                  id="email"
                  type="email"
                  value={contact.email}
                  onChange={(e) => setContact({ ...contact, email: e.target.value })}
                  placeholder="info@sewamobilkendari.com"
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="opHours" className={labelClass}>
                  Jam Operasional *
                </label>
                <input
                  id="opHours"
                  type="text"
                  value={contact.operational_hours}
                  onChange={(e) => setContact({ ...contact, operational_hours: e.target.value })}
                  required
                  placeholder="Senin - Minggu: 24 Jam Nonstop"
                  className={inputClass}
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="address" className={labelClass}>
                  Alamat Utama Garasi *
                </label>
                <textarea
                  id="address"
                  rows={3}
                  value={contact.address}
                  onChange={(e) => setContact({ ...contact, address: e.target.value })}
                  required
                  placeholder="Jl. Sultan Hasanuddin No. 12, Mandonga, Kota Kendari..."
                  className={inputClass}
                />
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-base font-semibold text-[#223A50]">
              Media Sosial & Peta Lokasi
            </h3>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="instaHandle" className={labelClass}>
                  Username Instagram
                </label>
                <input
                  id="instaHandle"
                  type="text"
                  value={contact.instagram_handle}
                  onChange={(e) => setContact({ ...contact, instagram_handle: e.target.value })}
                  placeholder="@sewamobilkendari_official"
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="instaUrl" className={labelClass}>
                  URL Instagram
                </label>
                <input
                  id="instaUrl"
                  type="text"
                  value={contact.instagram_url}
                  onChange={(e) => setContact({ ...contact, instagram_url: e.target.value })}
                  placeholder="https://instagram.com/sewamobilkendari_official"
                  className={inputClass}
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="mapsEmbed" className={labelClass}>
                  URL Embed Google Maps (src iframe)
                </label>
                <textarea
                  id="mapsEmbed"
                  rows={3}
                  value={contact.maps_embed_url}
                  onChange={(e) => setContact({ ...contact, maps_embed_url: e.target.value })}
                  placeholder="https://www.google.com/maps/embed?pb=..."
                  className={inputClass}
                />
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loadingContact}
              className="rounded-lg bg-amber-500 px-6 py-2.5 text-sm font-semibold text-[#223A50] shadow-sm transition-colors hover:bg-amber-400 disabled:opacity-50"
            >
              {loadingContact ? "Menyimpan..." : "Simpan Perubahan Kontak"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
