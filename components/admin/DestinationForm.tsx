"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { X, Upload, ImageIcon } from "lucide-react";
import Image from "next/image";

export interface DestinationFormData {
  id: string;
  name: string;
  description: string;
  image: string;
  recommendedCar: string;
}

interface DestinationFormProps {
  initialData?: DestinationFormData;
  cars?: { id: string; name: string }[];
  isEdit?: boolean;
}

export default function DestinationForm({
  initialData,
  cars = [],
  isEdit = false,
}: DestinationFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(
    initialData?.image || null
  );

  const [formData, setFormData] = useState<DestinationFormData>(
    initialData || {
      id: "",
      name: "",
      description: "",
      image: "",
      recommendedCar: "",
    }
  );

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  };

  const handleNameChange = (name: string) => {
    setFormData({
      ...formData,
      name,
      id: isEdit ? formData.id : generateSlug(name),
    });
  };

  const handleImageUpload = async (file: File) => {
    setUploading(true);
    setError("");

    try {
      const formDataUpload = new FormData();
      formDataUpload.append("file", file);
      formDataUpload.append("folder", "destinations");

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formDataUpload,
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Gagal mengupload gambar");
        return;
      }

      setFormData((prev) => ({ ...prev, image: data.imageUrl }));
      setImagePreview(data.imageUrl);
    } catch {
      setError("Gagal mengupload gambar. Silakan coba lagi.");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.image) {
      setError("Gambar wisata wajib diisi/ditingkatkan upload!");
      return;
    }

    setLoading(true);

    try {
      const url = isEdit
        ? `/api/admin/destinations/${formData.id}`
        : "/api/admin/destinations";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Terjadi kesalahan saat menyimpan data");
        return;
      }

      router.push("/admin/destinations");
      router.refresh();
    } catch {
      setError("Terjadi kesalahan koneksi. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500/50 transition-colors";
  const labelClass = "mb-1.5 block text-sm font-medium text-slate-600";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-base font-semibold text-[#223A50]">
          Informasi Destinasi Wisata
        </h3>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label htmlFor="name" className={labelClass}>
              Nama Destinasi Wisata *
            </label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => handleNameChange(e.target.value)}
              required
              placeholder="Contoh: Pulau Labengki"
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="id" className={labelClass}>
              ID / Slug *
            </label>
            <input
              id="id"
              type="text"
              value={formData.id}
              onChange={(e) =>
                setFormData({ ...formData, id: e.target.value })
              }
              required
              disabled={isEdit}
              placeholder="pulau-labengki"
              className={`${inputClass} ${isEdit ? "bg-slate-50 text-slate-400" : ""}`}
            />
          </div>

          <div>
            <label htmlFor="recommendedCar" className={labelClass}>
              Rekomendasi Mobil
            </label>
            <div className="space-y-2">
              {cars.length > 0 && (
                <select
                  id="recommendedCarSelect"
                  value={
                    cars.some((c) => c.name === formData.recommendedCar)
                      ? formData.recommendedCar
                      : ""
                  }
                  onChange={(e) => {
                    if (e.target.value) {
                      setFormData({ ...formData, recommendedCar: e.target.value });
                    }
                  }}
                  className={inputClass}
                >
                  <option value="">-- Pilih dari Armada Mobil --</option>
                  {cars.map((car) => (
                    <option key={car.id} value={car.name}>
                      {car.name}
                    </option>
                  ))}
                </select>
              )}
              <input
                id="recommendedCar"
                type="text"
                value={formData.recommendedCar}
                onChange={(e) =>
                  setFormData({ ...formData, recommendedCar: e.target.value })
                }
                placeholder="Atau ketik manual (Contoh: Toyota Fortuner VRZ)"
                className={inputClass}
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="description" className={labelClass}>
              Deskripsi Wisata *
            </label>
            <textarea
              id="description"
              rows={4}
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              required
              placeholder="Tuliskan daya tarik, keindahan, atau informasi rute wisata..."
              className={inputClass}
            />
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-base font-semibold text-[#223A50]">
          Gambar Wisata
        </h3>

        <div className="space-y-4">
          <label className={labelClass}>Upload atau Preview Gambar *</label>

          {/* Image Preview */}
          {imagePreview && (
            <div className="relative w-full max-w-md overflow-hidden rounded-lg border border-slate-200 bg-slate-50">
              <div className="relative aspect-[16/10] w-full">
                <Image
                  src={imagePreview}
                  alt="Preview Wisata"
                  fill
                  className="object-cover"
                />
              </div>
              <button
                type="button"
                onClick={() => {
                  setImagePreview(null);
                  setFormData({ ...formData, image: "" });
                }}
                className="absolute right-2 top-2 rounded-full bg-red-500 p-1 text-white shadow-md transition-colors hover:bg-red-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}

          {/* Upload Area */}
          {!imagePreview && (
            <label
              htmlFor="dest-image-upload"
              className={`flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed px-6 py-8 transition-colors ${
                uploading
                  ? "border-amber-300 bg-amber-50/50"
                  : "border-slate-300 bg-slate-50 hover:border-amber-400 hover:bg-amber-50/30"
              }`}
              onDragOver={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              onDrop={(e) => {
                e.preventDefault();
                e.stopPropagation();
                const file = e.dataTransfer.files[0];
                if (file) handleImageUpload(file);
              }}
            >
              {uploading ? (
                <>
                  <div className="h-8 w-8 animate-spin rounded-full border-2 border-amber-500 border-t-transparent" />
                  <p className="mt-2 text-sm font-medium text-amber-600">
                    Mengupload gambar wisata...
                  </p>
                </>
              ) : (
                <>
                  <div className="rounded-lg bg-slate-100 p-2.5">
                    <Upload className="h-6 w-6 text-slate-400" />
                  </div>
                  <p className="mt-2 text-sm font-medium text-slate-600">
                    Klik untuk upload gambar atau drag & drop
                  </p>
                  <p className="mt-1 text-xs text-slate-400">
                    JPG, PNG, atau WebP (maks. 5MB)
                  </p>
                </>
              )}
              <input
                id="dest-image-upload"
                type="file"
                accept="image/jpeg,image/png,image/webp,image/avif"
                className="hidden"
                disabled={uploading}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleImageUpload(file);
                }}
              />
            </label>
          )}

          {/* Manual URL option */}
          <div className="pt-2">
            <label htmlFor="imageUrlInput" className="mb-1 block text-xs font-medium text-slate-500">
              Atau gunakan URL Gambar langsung:
            </label>
            <input
              id="imageUrlInput"
              type="text"
              value={formData.image}
              onChange={(e) => {
                setFormData({ ...formData, image: e.target.value });
                setImagePreview(e.target.value || null);
              }}
              placeholder="/destinations/nama-gambar.jpg atau https://..."
              className={inputClass}
            />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={loading || uploading}
          className="rounded-lg bg-amber-500 px-6 py-2.5 text-sm font-semibold text-[#223A50] shadow-sm transition-colors hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading
            ? "Menyimpan..."
            : isEdit
            ? "Update Destinasi Wisata"
            : "Tambah Destinasi Wisata"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/destinations")}
          className="rounded-lg border border-slate-200 px-6 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50"
        >
          Batal
        </button>
      </div>
    </form>
  );
}
