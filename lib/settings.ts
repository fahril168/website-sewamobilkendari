import pool from "./db";
import {
  HeroSettings,
  ContactSettings,
  defaultHeroSettings,
  defaultContactSettings,
} from "./settings-defaults";

export async function getHeroSettings(): Promise<HeroSettings> {
  try {
    const res = await pool.query(
      "SELECT value FROM site_settings WHERE key = $1",
      ["hero"]
    );
    if (res.rows.length > 0 && res.rows[0].value) {
      return { ...defaultHeroSettings, ...res.rows[0].value };
    }
  } catch (error) {
    console.error("Error loading hero settings:", error);
  }
  return defaultHeroSettings;
}

export async function getContactSettings(): Promise<ContactSettings> {
  try {
    const res = await pool.query(
      "SELECT value FROM site_settings WHERE key = $1",
      ["contact"]
    );
    if (res.rows.length > 0 && res.rows[0].value) {
      return { ...defaultContactSettings, ...res.rows[0].value };
    }
  } catch (error) {
    console.error("Error loading contact settings:", error);
  }
  return defaultContactSettings;
}

export async function setSiteSetting(
  key: string,
  value: Record<string, unknown>
): Promise<boolean> {
  try {
    await pool.query(
      `INSERT INTO site_settings (key, value, updated_at)
       VALUES ($1, $2, CURRENT_TIMESTAMP)
       ON CONFLICT (key)
       DO UPDATE SET value = EXCLUDED.value, updated_at = CURRENT_TIMESTAMP`,
      [key, JSON.stringify(value)]
    );
    return true;
  } catch (error) {
    console.error(`Error saving site setting ${key}:`, error);
    return false;
  }
}
