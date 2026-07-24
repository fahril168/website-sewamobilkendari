import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  trend?: string;
  color?: "blue" | "amber" | "green" | "red" | "purple";
}

const colorMap = {
  blue: {
    bg: "bg-blue-50",
    icon: "text-blue-600",
    border: "border-blue-100",
  },
  amber: {
    bg: "bg-amber-50",
    icon: "text-amber-600",
    border: "border-amber-100",
  },
  green: {
    bg: "bg-emerald-50",
    icon: "text-emerald-600",
    border: "border-emerald-100",
  },
  red: {
    bg: "bg-red-50",
    icon: "text-red-600",
    border: "border-red-100",
  },
  purple: {
    bg: "bg-purple-50",
    icon: "text-purple-600",
    border: "border-purple-100",
  },
};

export default function StatCard({
  icon: Icon,
  label,
  value,
  trend,
  color = "blue",
}: StatCardProps) {
  const c = colorMap[color];

  return (
    <div className={`rounded-xl border ${c.border} bg-white p-5 shadow-sm transition-shadow hover:shadow-md`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{label}</p>
          <p className="mt-1 text-2xl font-bold text-[#223A50]">{value}</p>
          {trend && (
            <p className="mt-1 text-xs text-slate-400">{trend}</p>
          )}
        </div>
        <div className={`rounded-lg ${c.bg} p-2.5`}>
          <Icon className={`h-5 w-5 ${c.icon}`} />
        </div>
      </div>
    </div>
  );
}
