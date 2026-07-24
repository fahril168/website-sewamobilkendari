import pool from "../lib/db";
import { defaultHeroSettings, defaultContactSettings } from "../lib/settings-defaults";

async function initSettings() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS site_settings (
        key VARCHAR(255) PRIMARY KEY,
        value JSONB NOT NULL,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await pool.query(
      `INSERT INTO site_settings (key, value)
       VALUES ($1, $2)
       ON CONFLICT (key) DO NOTHING`,
      ["hero", JSON.stringify(defaultHeroSettings)]
    );

    await pool.query(
      `INSERT INTO site_settings (key, value)
       VALUES ($1, $2)
       ON CONFLICT (key) DO NOTHING`,
      ["contact", JSON.stringify(defaultContactSettings)]
    );

    console.log("Site settings table initialized successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Failed to initialize site settings table:", error);
    process.exit(1);
  }
}

initSettings();
