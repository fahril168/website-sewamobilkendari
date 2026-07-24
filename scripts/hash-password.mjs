// Script to generate bcrypt hash for admin password
// Run: node scripts/hash-password.mjs <password>

import bcrypt from "bcryptjs";

const password = process.argv[2] || "admin123";
const hash = bcrypt.hashSync(password, 12);

console.log(`Password: ${password}`);
console.log(`Hash: ${hash}`);
console.log("");
console.log("Run this SQL to update the admin user:");
console.log(
  `UPDATE users SET password_hash = '${hash}' WHERE email = 'admin@sewamobilkendari.com';`
);
