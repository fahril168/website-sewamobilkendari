import pool from "@/lib/db";
import FinancialReportView from "@/components/admin/FinancialReportView";

export default async function AdminReportsPage() {
  // 1. Bookings list
  const bookingsResult = await pool.query(`
    SELECT b.*, c.name as car_name
    FROM bookings b
    LEFT JOIN cars c ON b.car_id = c.id
    ORDER BY b.start_date DESC
  `);

  const bookings = bookingsResult.rows;

  // 2. Summary stats
  let totalRevenue = 0;
  let completedRevenue = 0;
  let potentialRevenue = 0;
  let completedCount = 0;
  let confirmedCount = 0;
  let pendingCount = 0;
  let cancelledCount = 0;

  bookings.forEach((b) => {
    const price = parseFloat(b.total_price) || 0;
    if (b.status === "completed") {
      completedRevenue += price;
      totalRevenue += price;
      completedCount++;
    } else if (b.status === "confirmed") {
      potentialRevenue += price;
      totalRevenue += price;
      confirmedCount++;
    } else if (b.status === "pending") {
      potentialRevenue += price;
      pendingCount++;
    } else if (b.status === "cancelled") {
      cancelledCount++;
    }
  });

  const totalBookingsCount = bookings.length;
  const avgOrderValue =
    completedCount > 0 ? Math.round(completedRevenue / completedCount) : 0;

  // 3. Car performance breakdown
  const carRevenueMap: Record<
    string,
    { car_id: string; car_name: string; total_revenue: number; booking_count: number }
  > = {};

  bookings.forEach((b) => {
    if (b.status !== "cancelled") {
      const carId = b.car_id || "unknown";
      const carName = b.car_name || "Armada Lainnya";
      const price = parseFloat(b.total_price) || 0;

      if (!carRevenueMap[carId]) {
        carRevenueMap[carId] = {
          car_id: carId,
          car_name: carName,
          total_revenue: 0,
          booking_count: 0,
        };
      }
      carRevenueMap[carId].total_revenue += price;
      carRevenueMap[carId].booking_count += 1;
    }
  });

  const carPerformance = Object.values(carRevenueMap).sort(
    (a, b) => b.total_revenue - a.total_revenue
  );

  // 4. Monthly trend
  const monthlyQuery = await pool.query(`
    SELECT 
      TO_CHAR(b.start_date, 'YYYY-MM') as month_key,
      TO_CHAR(b.start_date, 'Mon YYYY') as month_label,
      SUM(CASE WHEN b.status IN ('completed', 'confirmed') THEN b.total_price ELSE 0 END) as revenue,
      COUNT(b.id) as booking_count
    FROM bookings b
    GROUP BY month_key, month_label
    ORDER BY month_key ASC
  `);

  const initialData = {
    summary: {
      totalRevenue,
      completedRevenue,
      potentialRevenue,
      totalBookingsCount,
      completedCount,
      confirmedCount,
      pendingCount,
      cancelledCount,
      avgOrderValue,
    },
    carPerformance,
    monthlyTrend: monthlyQuery.rows,
    bookings,
  };

  return <FinancialReportView initialData={initialData} />;
}
