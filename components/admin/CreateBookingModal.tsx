"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, X } from "lucide-react";

interface CarOption {
  id: string;
  name: string;
  price_per_day: number;
}

interface CreateBookingModalProps {
  cars: CarOption[];
}

export default function CreateBookingModal({ cars }: CreateBookingModalProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    car_id: cars[0]?.id || "",
    customer_name: "",
    customer_phone: "",
    customer_email: "",
    start_date: new Date().toISOString().split("T")[0],
    end_date: new Date(Date.now() + 86400000).toISOString().split("T")[0],
    notes: "",
  });

  // Generate Booking Code: BK-YYMMDD-XXXX
  const generateBookingCode = () => {
    const today = new Date();
    const dateStr = today.toISOString().slice(2, 10).replace(/-/g, "");
    const randomStr = Math.floor(1000 + Math.random() * 9000);
    return `BK-${dateStr}-${randomStr}`;
  };

  // Calculate Total Price
  const selectedCar = cars.find((c) => c.id === formData.car_id);
  const pricePerDay = selectedCar ? Number(selectedCar.price_per_day) : 0;

  const startDate = new Date(formData.start_date);
  const endDate = new Date(formData.end_date);
  const timeDiff = endDate.getTime() - startDate.getTime();
  const daysDiff = Math.max(1, Math.ceil(timeDiff / (1000 * 3600 * 24)));
  const totalPrice = daysDiff * pricePerDay;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const payload = {
        booking_code: generateBookingCode(),
        car_id: formData.car_id,
        customer_name: formData.customer_name,
        customer_phone: formData.customer_phone,
        customer_email: formData.customer_email || null,
        start_date: formData.start_date,
        end_date: formData.end_date,
        total_price: totalPrice,
        notes: formData.notes || null,
      };

      const res = await fetch("/api/admin/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Gagal mencatat pemesanan.");
        return;
      }

      setOpen(false);
      setFormData({
        car_id: cars[0]?.id || "",
        customer_name: "",
        customer_phone: "",
        customer_email: "",
        start_date: new Date().toISOString().split("T")[0],
        end_date: new Date(Date.now() + 86400000).toISOString().split("T")[0],
        notes: "",
      });
      router.refresh();
    } catch {
      setError("Terjadi kesalahan sistem.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-700 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500/50";
  const labelClass = "mb-1 block text-xs font-medium text-slate-600";

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 rounded-lg bg-amber-500 px-4 py-2.5 text-sm font-semibold text-[#223A50] shadow-sm transition-colors hover:bg-amber-400"
      >
        <Plus className="h-4 w-4" />
        Tambah Pemesanan Baru
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-lg rounded-xl border border-slate-200 bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-lg font-bold text-[#223A50]">
                Catat Pemesanan Baru
              </h3>
              <button
                onClick={() => setOpen(false)}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              {error && (
                <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-xs text-red-600">
                  {error}
                </div>
              )}

              <div>
                <label className={labelClass}>Pilih Mobil *</label>
                <select
                  value={formData.car_id}
                  onChange={(e) =>
                    setFormData({ ...formData, car_id: e.target.value })
                  }
                  required
                  className={inputClass}
                >
                  {cars.map((car) => (
                    <option key={car.id} value={car.id}>
                      {car.name} — Rp {Number(car.price_per_day).toLocaleString("id-ID")}/hari
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className={labelClass}>Nama Pelanggan *</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Budi Santoso"
                    value={formData.customer_name}
                    onChange={(e) =>
                      setFormData({ ...formData, customer_name: e.target.value })
                    }
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>Nomor WhatsApp/HP *</label>
                  <input
                    type="text"
                    required
                    placeholder="081234567890"
                    value={formData.customer_phone}
                    onChange={(e) =>
                      setFormData({ ...formData, customer_phone: e.target.value })
                    }
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label className={labelClass}>Email (Opsional)</label>
                <input
                  type="email"
                  placeholder="pelanggan@email.com"
                  value={formData.customer_email}
                  onChange={(e) =>
                    setFormData({ ...formData, customer_email: e.target.value })
                  }
                  className={inputClass}
                />
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className={labelClass}>Tanggal Mulai *</label>
                  <input
                    type="date"
                    required
                    value={formData.start_date}
                    onChange={(e) =>
                      setFormData({ ...formData, start_date: e.target.value })
                    }
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>Tanggal Selesai *</label>
                  <input
                    type="date"
                    required
                    min={formData.start_date}
                    value={formData.end_date}
                    onChange={(e) =>
                      setFormData({ ...formData, end_date: e.target.value })
                    }
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Summary calculation */}
              <div className="rounded-lg bg-slate-50 p-3 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Durasi Sewa:</span>
                  <span className="font-semibold text-slate-800">{daysDiff} Hari</span>
                </div>
                <div className="mt-1 flex justify-between">
                  <span>Total Estimasi Biaya:</span>
                  <span className="font-bold text-amber-600">
                    Rp {totalPrice.toLocaleString("id-ID")}
                  </span>
                </div>
              </div>

              <div>
                <label className={labelClass}>Catatan Tambahan (Opsional)</label>
                <textarea
                  rows={2}
                  placeholder="Contoh: Antar di Bandara Haluoleo jam 09.00 WITA"
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData({ ...formData, notes: e.target.value })
                  }
                  className={inputClass}
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-lg border border-slate-200 px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="rounded-lg bg-amber-500 px-4 py-2 text-xs font-semibold text-[#223A50] hover:bg-amber-400 disabled:opacity-50"
                >
                  {loading ? "Menyimpan..." : "Simpan Pemesanan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
