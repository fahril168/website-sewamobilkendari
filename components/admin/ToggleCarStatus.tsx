"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

interface ToggleCarStatusProps {
  carId: string;
  currentStatus: string;
}

export default function ToggleCarStatus({
  carId,
  currentStatus,
}: ToggleCarStatusProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const isActive = currentStatus !== "maintenance";

  const handleToggle = async () => {
    setLoading(true);
    const newStatus = isActive ? "maintenance" : "available";

    try {
      const getRes = await fetch(`/api/admin/cars/${carId}`);
      if (!getRes.ok) throw new Error();
      const carData = await getRes.json();

      const res = await fetch(`/api/admin/cars/${carId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...carData,
          status: newStatus,
        }),
      });

      if (res.ok) {
        router.refresh();
      } else {
        alert("Gagal mengubah status mobil");
      }
    } catch {
      alert("Terjadi kesalahan saat mengubah status");
    } finally {
      setLoading(false);
    }
  };

  return (
    <label className="relative inline-flex cursor-pointer items-center">
      <input
        type="checkbox"
        checked={isActive}
        onChange={handleToggle}
        disabled={loading}
        className="peer sr-only"
      />
      <div className="peer h-5 w-9 rounded-full bg-slate-300 after:absolute after:left-[2px] after:top-[2px] after:h-4 after:w-4 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-emerald-500 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-disabled:opacity-50"></div>
      <span className="ml-2 text-xs font-medium text-slate-600">
        {isActive ? "Aktif" : "Nonaktif"}
      </span>
    </label>
  );
}
