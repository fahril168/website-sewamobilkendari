import { getHeroSettings, getContactSettings, setSiteSetting } from "@/lib/settings";
import { NextRequest } from "next/server";

export async function GET() {
  try {
    const [hero, contact] = await Promise.all([
      getHeroSettings(),
      getContactSettings(),
    ]);

    return Response.json({ hero, contact });
  } catch (error) {
    console.error("Error fetching site settings:", error);
    return Response.json(
      { error: "Gagal mengambil pengaturan website" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { key, value } = body;

    if (!key || !["hero", "contact"].includes(key) || !value) {
      return Response.json(
        { error: "Parameter 'key' (hero/contact) dan 'value' wajib diisi" },
        { status: 400 }
      );
    }

    const success = await setSiteSetting(key, value);

    if (!success) {
      return Response.json(
        { error: "Gagal menyimpan pengaturan" },
        { status: 500 }
      );
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error("Error saving site settings:", error);
    return Response.json(
      { error: "Gagal menyimpan pengaturan website" },
      { status: 500 }
    );
  }
}
