type Status =
  | "available"
  | "rented"
  | "maintenance"
  | "pending"
  | "confirmed"
  | "completed"
  | "cancelled";

interface StatusBadgeProps {
  status: Status;
}

const statusStyles: Record<Status, string> = {
  available:
    "bg-emerald-50 text-emerald-700 border-emerald-200",
  rented:
    "bg-amber-50 text-amber-700 border-amber-200",
  maintenance:
    "bg-red-50 text-red-700 border-red-200",
  pending:
    "bg-yellow-50 text-yellow-700 border-yellow-200",
  confirmed:
    "bg-blue-50 text-blue-700 border-blue-200",
  completed:
    "bg-emerald-50 text-emerald-700 border-emerald-200",
  cancelled:
    "bg-slate-100 text-slate-500 border-slate-200",
};

const statusLabels: Record<Status, string> = {
  available: "Tersedia",
  rented: "Disewa",
  maintenance: "Maintenance",
  pending: "Pending",
  confirmed: "Dikonfirmasi",
  completed: "Selesai",
  cancelled: "Dibatalkan",
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium ${statusStyles[status]}`}
    >
      {statusLabels[status]}
    </span>
  );
}
