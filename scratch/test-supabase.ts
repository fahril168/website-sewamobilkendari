import { Pool } from "pg";

async function testConnection() {
  const password = "fahrilmuhhammad";
  const projectRef = "isdconarqrripnektjqk";

  const candidates = [
    // Direct
    `postgresql://postgres:${password}@db.${projectRef}.supabase.co:5432/postgres`,
    // Session Pooler
    `postgresql://postgres.${projectRef}:${password}@aws-0-ap-northeast-2.pooler.supabase.com:5432/postgres`,
    // Transaction Pooler
    `postgresql://postgres.${projectRef}:${password}@aws-0-ap-northeast-2.pooler.supabase.com:6543/postgres`,
    // Shared IPv4 / Supavisor
    `postgresql://postgres:${password}@aws-0-ap-northeast-2.pooler.supabase.com:6543/postgres`,
    `postgresql://postgres:${password}@aws-0-ap-northeast-2.pooler.supabase.com:5432/postgres`,
    // Region ap-southeast-1
    `postgresql://postgres.${projectRef}:${password}@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres`,
    `postgresql://postgres.${projectRef}:${password}@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres`,
    // Region us-east-1
    `postgresql://postgres.${projectRef}:${password}@aws-0-us-east-1.pooler.supabase.com:6543/postgres`,
  ];

  for (const url of candidates) {
    console.log("Testing URL:", url.replace(password, "*****"));
    const pool = new Pool({
      connectionString: url,
      ssl: { rejectUnauthorized: false },
      connectionTimeoutMillis: 4000,
    });

    try {
      const res = await pool.query("SELECT current_database(), current_user");
      console.log(" SUCCESS!", res.rows);
      console.log("EXACT WORKING URL:", url);
      await pool.end();
      process.exit(0);
    } catch (err: any) {
      console.log(" FAILED:", err.message);
      await pool.end();
    }
  }

  console.log("All connection attempts failed.");
  process.exit(1);
}

testConnection();
