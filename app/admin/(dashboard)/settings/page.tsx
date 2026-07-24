import pool from "@/lib/db";
import { getHeroSettings, getContactSettings } from "@/lib/settings";
import SiteSettingsForm from "@/components/admin/SiteSettingsForm";

export default async function AdminSettingsPage() {
  const [hero, contact, carsResult] = await Promise.all([
    getHeroSettings(),
    getContactSettings(),
    pool.query("SELECT id, name, image_url FROM cars ORDER BY name ASC"),
  ]);

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#223A50]">Pengaturan Website</h1>
        <p className="mt-1 text-sm text-slate-500">
          Kelola konten tampilan utama website (Hero section, informasi kontak, alamat garasi, dll.)
        </p>
      </div>

      <SiteSettingsForm
        initialHero={hero}
        initialContact={contact}
        availableCars={carsResult.rows}
      />
    </div>
  );
}
