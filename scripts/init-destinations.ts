import pool from "../lib/db";
import { destinations } from "../data/destinations";

async function init() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS destinations (
        id VARCHAR(255) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        image VARCHAR(255) NOT NULL,
        recommended_car VARCHAR(255),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `);

    for (const d of destinations) {
      await pool.query(
        `INSERT INTO destinations (id, name, description, image, recommended_car)
         VALUES ($1, $2, $3, $4, $5)
         ON CONFLICT (id) DO NOTHING`,
        [d.id, d.name, d.description, d.image, d.recommendedCar]
      );
    }
    console.log("Destinations table initialized successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Failed to initialize destinations table:", error);
    process.exit(1);
  }
}

init();
