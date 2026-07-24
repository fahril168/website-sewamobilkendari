import pool from "@/lib/db";
import { NextRequest } from "next/server";

export async function GET() {
  try {
    const result = await pool.query(`
      SELECT c.*, cat.name as category_name,
        COALESCE(
          json_agg(cf.feature_name) FILTER (WHERE cf.feature_name IS NOT NULL),
          '[]'
        ) as features
      FROM cars c
      LEFT JOIN categories cat ON c.category_id = cat.id
      LEFT JOIN car_features cf ON c.id = cf.car_id
      GROUP BY c.id, cat.name
      ORDER BY c.created_at DESC
    `);

    return Response.json(result.rows);
  } catch (error) {
    console.error("Error fetching cars:", error);
    return Response.json({ error: "Gagal mengambil data mobil" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      id,
      name,
      slug,
      category_id,
      transmission,
      fuel_type,
      capacity,
      price_per_day,
      image_url,
      status,
      is_featured,
      features,
    } = body;

    // Validate required fields
    if (!id || !name || !slug || !transmission || !fuel_type || !capacity || !price_per_day || !image_url) {
      return Response.json(
        { error: "Semua field wajib diisi" },
        { status: 400 }
      );
    }

    // Insert car
    await pool.query(
      `INSERT INTO cars (id, name, slug, category_id, transmission, fuel_type, capacity, price_per_day, image_url, status, is_featured)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
      [id, name, slug, category_id || null, transmission, fuel_type, capacity, price_per_day, image_url, status || "available", is_featured || false]
    );

    // Insert features
    if (features && features.length > 0) {
      const featureValues = features
        .map((_: string, i: number) => `($1, $${i + 2})`)
        .join(", ");
      await pool.query(
        `INSERT INTO car_features (car_id, feature_name) VALUES ${featureValues}`,
        [id, ...features]
      );
    }

    return Response.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("Error creating car:", error);
    return Response.json({ error: "Gagal menambahkan mobil" }, { status: 500 });
  }
}
