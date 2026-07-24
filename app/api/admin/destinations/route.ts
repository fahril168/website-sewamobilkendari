import pool from "@/lib/db";
import { NextRequest } from "next/server";

export async function GET() {
  try {
    const result = await pool.query(
      `SELECT id, name, description, image, recommended_car as "recommendedCar", created_at
       FROM destinations
       ORDER BY created_at DESC`
    );
    return Response.json(result.rows);
  } catch (error) {
    console.error("Error fetching destinations:", error);
    return Response.json({ error: "Gagal mengambil data wisata" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, name, description, image, recommendedCar } = body;

    if (!name || !description || !image) {
      return Response.json(
        { error: "Nama, deskripsi, dan gambar wajib diisi" },
        { status: 400 }
      );
    }

    const destinationId =
      id && id.trim()
        ? id.trim()
        : name
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, "")
            .replace(/\s+/g, "-")
            .replace(/-+/g, "-")
            .trim();

    await pool.query(
      `INSERT INTO destinations (id, name, description, image, recommended_car)
       VALUES ($1, $2, $3, $4, $5)`,
      [destinationId, name, description, image, recommendedCar || null]
    );

    return Response.json({ success: true, id: destinationId }, { status: 201 });
  } catch (error: unknown) {
    console.error("Error creating destination:", error);
    const err = error as { code?: string };
    if (err.code === "23505") {
      return Response.json({ error: "ID / Slug wisata sudah digunakan" }, { status: 400 });
    }
    return Response.json({ error: "Gagal menambahkan wisata" }, { status: 500 });
  }
}
