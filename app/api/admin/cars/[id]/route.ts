import pool from "@/lib/db";
import { NextRequest } from "next/server";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const carResult = await pool.query(
      `SELECT c.*, cat.name as category_name
       FROM cars c
       LEFT JOIN categories cat ON c.category_id = cat.id
       WHERE c.id = $1`,
      [id]
    );

    if (carResult.rows.length === 0) {
      return Response.json({ error: "Mobil tidak ditemukan" }, { status: 404 });
    }

    const featuresResult = await pool.query(
      "SELECT feature_name FROM car_features WHERE car_id = $1",
      [id]
    );

    const car = {
      ...carResult.rows[0],
      features: featuresResult.rows.map((r) => r.feature_name),
    };

    return Response.json(car);
  } catch (error) {
    console.error("Error fetching car:", error);
    return Response.json({ error: "Gagal mengambil data mobil" }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const body = await request.json();
    const {
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

    // Update car
    await pool.query(
      `UPDATE cars SET
        name = $1, slug = $2, category_id = $3, transmission = $4,
        fuel_type = $5, capacity = $6, price_per_day = $7, image_url = $8,
        status = $9, is_featured = $10
       WHERE id = $11`,
      [name, slug, category_id || null, transmission, fuel_type, capacity, price_per_day, image_url, status, is_featured, id]
    );

    // Replace features: delete old, insert new
    await pool.query("DELETE FROM car_features WHERE car_id = $1", [id]);
    if (features && features.length > 0) {
      const featureValues = features
        .map((_: string, i: number) => `($1, $${i + 2})`)
        .join(", ");
      await pool.query(
        `INSERT INTO car_features (car_id, feature_name) VALUES ${featureValues}`,
        [id, ...features]
      );
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error("Error updating car:", error);
    return Response.json({ error: "Gagal mengupdate mobil" }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    await pool.query("DELETE FROM car_features WHERE car_id = $1", [id]);
    await pool.query("DELETE FROM cars WHERE id = $1", [id]);

    return Response.json({ success: true });
  } catch (error) {
    console.error("Error deleting car:", error);
    return Response.json({ error: "Gagal menghapus mobil" }, { status: 500 });
  }
}
