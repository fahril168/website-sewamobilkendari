import { getSession } from "@/lib/auth";
import { User } from "lucide-react";

export default async function AdminTopbar() {
  const session = await getSession();

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6 shadow-sm">
      <div>
        <h2 className="text-lg font-semibold text-[#223A50]">
          Admin Dashboard
        </h2>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#223A50] text-white">
            <User className="h-4 w-4" />
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-medium text-slate-700">
              {session?.name || "Admin"}
            </p>
            <p className="text-xs text-slate-400">{session?.role || "admin"}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
