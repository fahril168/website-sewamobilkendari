import pool from "../lib/db";

async function seedBookings() {
  try {

    const sampleBookings = [
      {
        code: "BK-260710-1001",
        car: "innova-reborn",
        customer: "Budi Santoso",
        phone: "081234567890",
        email: "budi@gmail.com",
        start: "2026-07-01",
        end: "2026-07-04",
        total: 1800000,
        status: "completed",
        created_at: "2026-07-01 09:00:00",
      },
      {
        code: "BK-260712-1002",
        car: "fortuner-vrz",
        customer: "PT Haluoleo Energy",
        phone: "081198765432",
        email: "finance@haluoleoenergy.co.id",
        start: "2026-07-05",
        end: "2026-07-10",
        total: 6000000,
        status: "completed",
        created_at: "2026-07-04 14:20:00",
      },
      {
        code: "BK-260715-1003",
        car: "avanza-facelift",
        customer: "Rina Wijaya",
        phone: "085244332211",
        email: "rina.w@yahoo.com",
        start: "2026-07-12",
        end: "2026-07-14",
        total: 900000,
        status: "completed",
        created_at: "2026-07-11 11:15:00",
      },
      {
        code: "BK-260718-1004",
        car: "pajero-sport",
        customer: "Ir. Hendra Gunawan",
        phone: "081377889900",
        email: "hendra@dinas-pu.go.id",
        start: "2026-07-16",
        end: "2026-07-20",
        total: 6000000,
        status: "completed",
        created_at: "2026-07-15 16:45:00",
      },
      {
        code: "BK-260720-1005",
        car: "honda-brio",
        customer: "Dewi Lestari",
        phone: "082199887766",
        email: "dewi.l@gmail.com",
        start: "2026-07-19",
        end: "2026-07-21",
        total: 700000,
        status: "completed",
        created_at: "2026-07-18 10:30:00",
      },
      {
        code: "BK-260722-1006",
        car: "fortuner-vrz",
        customer: "Dinas Pariwisata Sultra",
        phone: "081299001122",
        email: "protocol@sultra.go.id",
        start: "2026-07-22",
        end: "2026-07-25",
        total: 7500000,
        status: "confirmed",
        created_at: "2026-07-21 08:00:00",
      },
      {
        code: "BK-260724-1007",
        car: "hiace-commuter",
        customer: "Rombongan Wisata Makassar",
        phone: "085311223344",
        email: "tour@makassartravel.com",
        start: "2026-07-26",
        end: "2026-07-29",
        total: 4800000,
        status: "pending",
        created_at: "2026-07-24 13:00:00",
      },
      {
        code: "BK-260605-0901",
        car: "innova-reborn",
        customer: "Ahmad Subagyo",
        phone: "082344556677",
        email: "ahmad@gmail.com",
        start: "2026-06-05",
        end: "2026-06-08",
        total: 1800000,
        status: "completed",
        created_at: "2026-06-04 10:00:00",
      },
      {
        code: "BK-260612-0902",
        car: "fortuner-vrz",
        customer: "Kementerian UMK Kendari",
        phone: "081122334455",
        email: "umk@kendari.go.id",
        start: "2026-06-12",
        end: "2026-06-16",
        total: 4800000,
        status: "completed",
        created_at: "2026-06-10 15:30:00",
      },
    ];

    for (const b of sampleBookings) {
      await pool.query(
        `INSERT INTO bookings (booking_code, car_id, customer_name, customer_phone, customer_email, start_date, end_date, total_price, status, created_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
         ON CONFLICT (booking_code) DO NOTHING`,
        [
          b.code,
          b.car,
          b.customer,
          b.phone,
          b.email,
          b.start,
          b.end,
          b.total,
          b.status,
          b.created_at,
        ]
      );
    }

    console.log("Sample financial bookings seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding bookings:", error);
    process.exit(1);
  }
}

seedBookings();
