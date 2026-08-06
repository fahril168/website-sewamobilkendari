import { Pool } from "pg";

async function testAllRegions() {
  const password = "fahrilmuhhammad";
  const projectRef = "isdconarqrripnektjqk";

  const regions = [
    "ap-southeast-1",
    "ap-southeast-2",
    "ap-northeast-1",
    "ap-northeast-2",
    "ap-south-1",
    "us-east-1",
    "us-west-1",
    "eu-central-1",
    "eu-west-1",
    "eu-west-2",
    "sa-east-1",
  ];

  for (const reg of regions) {
    const poolerHost = `aws-0-${reg}.pooler.supabase.com`;
    const url = `postgresql://postgres.${projectRef}:${password}@${poolerHost}:6543/postgres`;

    console.log(`Testing region ${reg}:`, url.replace(password, "*****"));
    const pool = new Pool({
      connectionString: url,
      ssl: { rejectUnauthorized: false },
      connectionTimeoutMillis: 3000,
    });

    try {
      const res = await pool.query("SELECT current_database(), current_user");
      console.log(" SUCCESS ON REGION:", reg);
      console.log("EXACT POOLER URL:", url);
      await pool.end();
      process.exit(0);
    } catch (err: any) {
      console.log(` Region ${reg} failed:`, err.message);
      await pool.end();
    }
  }

  console.log("All regions failed.");
  process.exit(1);
}

testAllRegions();
