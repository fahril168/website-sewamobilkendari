"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { X, Plus, Upload, ImageIcon } from "lucide-react";
import Image from "next/image";

interface CarFormData {
  id: string;
  name: string;
  slug: string;
  category_id: number | null;
  transmission: "Manual" | "Automatic";
  fuel_type: string;
  capacity: number;
  price_per_day: number;
  image_url: string;
  status: string;
  is_featured: boolean;
  features: string[];
}

interface CarFormProps {
  initialData?: CarFormData;
  categories: { id: number; name: string }[];
  isEdit?: boolean;
}

export default function CarForm({
  initialData,
  categories,
  isEdit = false,
}: CarFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [featureInput, setFeatureInput] = useState("");
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(
    initialData?.image_url || null
  );

  const handleImageUpload = async (file: File) => {
    setUploading(true);
    setError("");

    try {
      const formDataUpload = new FormData();
      formDataUpload.append("file", file);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formDataUpload,
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Gagal mengupload gambar");
        return;
      }

      setFormData({ ...formData, image_url: data.imageUrl });
      setImagePreview(data.imageUrl);
    } catch {
      setError("Gagal mengupload gambar. Silakan coba lagi.");
    } finally {
      setUploading(false);
    }
  };

  const [formData, setFormData] = useState<CarFormData>(
    initialData || {
      id: "",
      name: "",
      slug: "",
      category_id: null,
      transmission: "Manual",
      fuel_type: "Bensin",
      capacity: 5,
      price_per_day: 0,
      image_url: "",
      status: "available",
      is_featured: false,
      features: [],
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
      slug: generateSlug(name),
      id: isEdit ? formData.id : generateSlug(name),
    });
  };

  const addFeature = () => {
    const trimmed = featureInput.trim();
    if (trimmed && !formData.features.includes(trimmed)) {
      setFormData({ ...formData, features: [...formData.features, trimmed] });
      setFeatureInput("");
    }
  };

  const removeFeature = (feature: string) => {
    setFormData({
      ...formData,
      features: formData.features.filter((f) => f !== feature),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const url = isEdit
        ? `/api/admin/cars/${formData.id}`
        : "/api/admin/cars";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Terjadi kesalahan");
        return;
      }

      router.push("/admin/cars");
      router.refresh();
    } catch {
      setError("Terjadi kesalahan. Silakan coba lagi.");
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
          Informasi Dasar
        </h3>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label htmlFor="name" className={labelClass}>
              Nama Mobil *
            </label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => handleNameChange(e.target.value)}
              required
              placeholder="Contoh: Toyota Innova Reborn"
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="id" className={labelClass}>
              ID (Slug) *
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
              placeholder="innova-reborn"
              className={`${inputClass} ${isEdit ? "bg-slate-50 text-slate-400" : ""}`}
            />
          </div>

          <div>
            <label htmlFor="category" className={labelClass}>
              Kategori
            </label>
            <select
              id="category"
              value={formData.category_id ?? ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  category_id: e.target.value ? parseInt(e.target.value) : null,
                })
              }
              className={inputClass}
            >
              <option value="">Pilih Kategori</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="transmission" className={labelClass}>
              Transmisi *
            </label>
            <select
              id="transmission"
              value={formData.transmission}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  transmission: e.target.value as "Manual" | "Automatic",
                })
              }
              className={inputClass}
            >
              <option value="Manual">Manual</option>
              <option value="Automatic">Automatic</option>
            </select>
          </div>

          <div>
            <label className={labelClass}>
              Bahan Bakar *
            </label>
            <div className="flex flex-wrap gap-3 pt-1">
              {["Bensin", "Diesel", "Hybrid", "Listrik"].map((type) => (
                <label
                  key={type}
                  className={`flex cursor-pointer items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors ${
                    formData.fuel_type === type
                      ? "border-amber-500 bg-amber-50/50 text-amber-700 font-semibold"
                      : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  <input
                    type="radio"
                    name="fuel_type"
                    value={type}
                    checked={formData.fuel_type === type}
                    onChange={(e) =>
                      setFormData({ ...formData, fuel_type: e.target.value })
                    }
                    className="h-4 w-4 border-slate-300 text-amber-500 focus:ring-amber-500"
                  />
                  <span>{type}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="capacity" className={labelClass}>
              Kapasitas (Kursi) *
            </label>
            <input
              id="capacity"
              type="number"
              min="1"
              value={formData.capacity}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  capacity: parseInt(e.target.value) || 0,
                })
              }
              required
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="price" className={labelClass}>
              Harga Per Hari (Rp) *
            </label>
            <input
              id="price"
              type="number"
              min="0"
              value={formData.price_per_day}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  price_per_day: parseInt(e.target.value) || 0,
                })
              }
              required
              className={inputClass}
            />
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-base font-semibold text-[#223A50]">
          Gambar & Status
        </h3>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className={labelClass}>Upload Gambar *</label>

            {/* Image Preview */}
            {imagePreview && (
              <div className="mb-3 relative w-full max-w-xs overflow-hidden rounded-lg border border-slate-200 bg-slate-50">
                <div className="relative aspect-[16/9] w-full">
                  <Image
                    src={imagePreview}
                    alt="Preview"
                    fill
                    className="object-cover"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setImagePreview(null);
                    setFormData({ ...formData, image_url: "" });
                  }}
                  className="absolute right-2 top-2 rounded-full bg-red-500 p-1 text-white shadow-md transition-colors hover:bg-red-600"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            )}

            {/* Upload Area */}
            {!imagePreview && (
              <label
                htmlFor="image-upload"
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
                      Mengupload...
                    </p>
                  </>
                ) : (
                  <>
                    <div className="rounded-lg bg-slate-100 p-2.5">
                      <Upload className="h-6 w-6 text-slate-400" />
                    </div>
                    <p className="mt-2 text-sm font-medium text-slate-600">
                      Klik untuk upload atau drag & drop
                    </p>
                    <p className="mt-1 text-xs text-slate-400">
                      JPG, PNG, atau WebP (maks. 5MB)
                    </p>
                  </>
                )}
                <input
                  id="image-upload"
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

            {/* Hidden required field for validation */}
            <input
              type="hidden"
              value={formData.image_url}
              required
            />
            {!formData.image_url && (
              <p className="mt-1 flex items-center gap-1 text-xs text-slate-400">
                <ImageIcon className="h-3.5 w-3.5" />
                Belum ada gambar dipilih
              </p>
            )}
          </div>

          <div>
            <label htmlFor="status" className={labelClass}>
              Status
            </label>
            <select
              id="status"
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
              }
              className={inputClass}
            >
              <option value="available">Tersedia</option>
              <option value="rented">Disewa</option>
              <option value="maintenance">Maintenance</option>
            </select>
          </div>

          <div className="flex items-end">
            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="checkbox"
                checked={formData.is_featured}
                onChange={(e) =>
                  setFormData({ ...formData, is_featured: e.target.checked })
                }
                className="h-4 w-4 rounded border-slate-300 text-amber-500 focus:ring-amber-500"
              />
              <span className="text-sm text-slate-600">
                Tampilkan sebagai Featured
              </span>
            </label>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-base font-semibold text-[#223A50]">
          Fitur Mobil
        </h3>

        <div className="flex gap-2">
          <input
            type="text"
            value={featureInput}
            onChange={(e) => setFeatureInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addFeature();
              }
            }}
            placeholder="Contoh: AC Double Blower"
            className={inputClass}
          />
          <button
            type="button"
            onClick={addFeature}
            className="shrink-0 rounded-lg bg-[#223A50] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#1a2e40]"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>

        {formData.features.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {formData.features.map((feature) => (
              <span
                key={feature}
                className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs text-slate-600"
              >
                {feature}
                <button
                  type="button"
                  onClick={() => removeFeature(feature)}
                  className="text-slate-400 hover:text-red-500"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-amber-500 px-6 py-2.5 text-sm font-semibold text-[#223A50] shadow-sm transition-colors hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading
            ? "Menyimpan..."
            : isEdit
            ? "Update Mobil"
            : "Tambah Mobil"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/cars")}
          className="rounded-lg border border-slate-200 px-6 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50"
        >
          Batal
        </button>
      </div>
    </form>
  );
}
