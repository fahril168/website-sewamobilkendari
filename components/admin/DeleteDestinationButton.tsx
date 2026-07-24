"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

interface DeleteDestinationButtonProps {
  destinationId: string;
  destinationName: string;
}

export default function DeleteDestinationButton({
  destinationId,
  destinationName,
}: DeleteDestinationButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/destinations/${destinationId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const data = await res.json();
        alert(data.error || "Gagal menghapus wisata");
        setLoading(false);
        return;
      }

      setShowConfirm(false);
      router.refresh();
    } catch {
      alert("Terjadi kesalahan saat menghapus data");
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setShowConfirm(true)}
        className="rounded-md border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-medium text-red-600 transition-colors hover:bg-red-100 hover:text-red-700"
      >
        Hapus
      </button>

      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow-xl">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600">
              <Trash2 className="h-6 w-6" />
            </div>

            <div className="mt-4 text-center">
              <h3 className="text-base font-semibold text-slate-800">
                Hapus Destinasi Wisata?
              </h3>
              <p className="mt-2 text-xs text-slate-500">
                Apakah Anda yakin ingin menghapus &quot;<span className="font-semibold text-slate-700">{destinationName}</span>&quot;? Tindakan ini tidak dapat dibatalkan.
              </p>
            </div>

            <div className="mt-6 flex items-center gap-3">
              <button
                type="button"
                onClick={() => setShowConfirm(false)}
                disabled={loading}
                className="w-full rounded-lg border border-slate-200 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={loading}
                className="w-full rounded-lg bg-red-600 py-2 text-xs font-semibold text-white shadow-sm hover:bg-red-500 disabled:opacity-50"
              >
                {loading ? "Menghapus..." : "Ya, Hapus"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
