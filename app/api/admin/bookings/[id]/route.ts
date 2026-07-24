import pool from "@/lib/db";
import { syncCarStatus } from "@/lib/car-status";
import { NextRequest } from "next/server";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const body = await request.json();
    const { status } = body;

    if (!["pending", "confirmed", "completed", "cancelled"].includes(status)) {
      return Response.json({ error: "Status tidak valid" }, { status: 400 });
    }

    // Get car_id before updating booking status
    const bookingRes = await pool.query("SELECT car_id FROM bookings WHERE id = $1", [id]);
    if (bookingRes.rows.length === 0) {
      return Response.json({ error: "Booking tidak ditemukan" }, { status: 404 });
    }
    const carId = bookingRes.rows[0].car_id;

    await pool.query("UPDATE bookings SET status = $1 WHERE id = $2", [
      status,
      id,
    ]);

    // Automatically sync car status
    await syncCarStatus(carId);

    return Response.json({ success: true });
  } catch (error) {
    console.error("Error updating booking:", error);
    return Response.json({ error: "Gagal mengupdate booking" }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const bookingRes = await pool.query("SELECT car_id FROM bookings WHERE id = $1", [id]);
    if (bookingRes.rows.length === 0) {
      return Response.json({ error: "Booking tidak ditemukan" }, { status: 404 });
    }
    const carId = bookingRes.rows[0].car_id;

    await pool.query("DELETE FROM bookings WHERE id = $1", [id]);

    // Automatically sync car status
    await syncCarStatus(carId);

    return Response.json({ success: true });
  } catch (error) {
    console.error("Error deleting booking:", error);
    return Response.json({ error: "Gagal menghapus booking" }, { status: 500 });
  }
}
