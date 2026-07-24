"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

interface UpdateBookingStatusProps {
  bookingId: string;
  currentStatus: string;
}

const statusOptions = [
  { value: "pending", label: "Pending" },
  { value: "confirmed", label: "Dikonfirmasi" },
  { value: "completed", label: "Selesai" },
  { value: "cancelled", label: "Dibatalkan" },
];

export default function UpdateBookingStatus({
  bookingId,
  currentStatus,
}: UpdateBookingStatusProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleChange = async (newStatus: string) => {
    if (newStatus === currentStatus) return;
    setLoading(true);

    try {
      const res = await fetch(`/api/admin/bookings/${bookingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        router.refresh();
      } else {
        alert("Gagal mengubah status");
      }
    } catch {
      alert("Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <select
      value={currentStatus}
      onChange={(e) => handleChange(e.target.value)}
      disabled={loading}
      className="rounded-md border border-slate-200 bg-white px-2 py-1 text-xs font-medium text-slate-600 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500/50 disabled:opacity-50"
    >
      {statusOptions.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
