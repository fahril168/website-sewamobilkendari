import pool from "@/lib/db";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const result = await pool.query(
      `SELECT id, name, description, image, recommended_car as "recommendedCar", created_at
       FROM destinations
       WHERE id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return Response.json({ error: "Wisata tidak ditemukan" }, { status: 404 });
    }

    return Response.json(result.rows[0]);
  } catch (error) {
    console.error("Error fetching destination detail:", error);
    return Response.json({ error: "Gagal mengambil data wisata" }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { name, description, image, recommendedCar } = body;

    if (!name || !description || !image) {
      return Response.json(
        { error: "Nama, deskripsi, dan gambar wajib diisi" },
        { status: 400 }
      );
    }

    const res = await pool.query(
      `UPDATE destinations
       SET name = $1, description = $2, image = $3, recommended_car = $4
       WHERE id = $5`,
      [name, description, image, recommendedCar || null, id]
    );

    if (res.rowCount === 0) {
      return Response.json({ error: "Wisata tidak ditemukan" }, { status: 404 });
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error("Error updating destination:", error);
    return Response.json({ error: "Gagal mengupdate data wisata" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const res = await pool.query("DELETE FROM destinations WHERE id = $1", [id]);

    if (res.rowCount === 0) {
      return Response.json({ error: "Wisata tidak ditemukan" }, { status: 404 });
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error("Error deleting destination:", error);
    return Response.json({ error: "Gagal menghapus wisata" }, { status: 500 });
  }
}
