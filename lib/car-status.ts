import pool from "@/lib/db";

/**
 * Synchronizes a car's status based on active/confirmed bookings.
 * - If the car has any active booking ('pending' or 'confirmed'), car status becomes 'rented'.
 * - If there are no active bookings, car status becomes 'available'.
 * Note: If car status is manually set to 'maintenance', it will not be changed.
 */
export async function syncCarStatus(carId: string) {
  if (!carId) return;

  try {
    const res = await pool.query(
      `SELECT COUNT(*)::int as active_count
       FROM bookings
       WHERE car_id = $1 AND status IN ('pending', 'confirmed')`,
      [carId]
    );

    const activeCount = res.rows[0]?.active_count || 0;

    if (activeCount > 0) {
      await pool.query(
        `UPDATE cars SET status = 'rented'::car_status WHERE id = $1 AND status != 'maintenance'::car_status`,
        [carId]
      );
    } else {
      await pool.query(
        `UPDATE cars SET status = 'available'::car_status WHERE id = $1 AND status != 'maintenance'::car_status`,
        [carId]
      );
    }
  } catch (error) {
    console.error("Error syncing car status:", error);
  }
}
