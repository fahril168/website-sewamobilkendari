import pool from "@/lib/db";
import { syncCarStatus } from "@/lib/car-status";
import { NextRequest } from "next/server";

export async function GET() {
  try {
    const result = await pool.query(`
      SELECT b.*, c.name as car_name
      FROM bookings b
      LEFT JOIN cars c ON b.car_id = c.id
      ORDER BY b.created_at DESC
    `);

    return Response.json(result.rows);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return Response.json({ error: "Gagal mengambil data booking" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      booking_code,
      car_id,
      customer_name,
      customer_phone,
      customer_email,
      start_date,
      end_date,
      total_price,
      notes,
    } = body;

    await pool.query(
      `INSERT INTO bookings (booking_code, car_id, customer_name, customer_phone, customer_email, start_date, end_date, total_price, notes)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
      [booking_code, car_id, customer_name, customer_phone, customer_email || null, start_date, end_date, total_price, notes || null]
    );

    // Automatically sync car status
    await syncCarStatus(car_id);

    return Response.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("Error creating booking:", error);
    return Response.json({ error: "Gagal membuat booking" }, { status: 500 });
  }
}
