"use client";

import { useRouter } from "next/navigation";

interface DeleteCarButtonProps {
  carId: string;
  carName: string;
}

export default function DeleteCarButton({ carId, carName }: DeleteCarButtonProps) {
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm(`Yakin ingin menghapus "${carName}"?`)) return;

    try {
      const res = await fetch(`/api/admin/cars/${carId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        router.refresh();
      } else {
        alert("Gagal menghapus mobil");
      }
    } catch {
      alert("Terjadi kesalahan");
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="rounded-md border border-red-200 bg-white px-3 py-1.5 text-xs font-medium text-red-600 transition-colors hover:bg-red-50"
    >
      Hapus
    </button>
  );
}
