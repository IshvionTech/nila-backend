import { Pool } from "pg";
import * as fs from "fs";
import * as path from "path";
import * as dotenv from "dotenv";

// Load environment variables
dotenv.config();

/**
 * TODO: Database Migration Runner
 *
 * This script runs all SQL migration files in order.
 *
 * IMPLEMENTATION STEPS:
 *
 * 1. Create a migrations tracking table:
 *    CREATE TABLE IF NOT EXISTS migrations (
 *      id SERIAL PRIMARY KEY,
 *      filename VARCHAR(255) UNIQUE NOT NULL,
 *      executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
 *    );
 *
 * 2. Read all .sql files from db/migrations/ directory
 * 3. Sort files by name (001, 002, 003, etc.)
 * 4. For each file:
 *    - Check if already executed (query migrations table)
 *    - If not executed:
 *      - Read file content
 *      - Execute SQL
 *      - Record in migrations table
 *
 * 5. Handle errors and rollback if needed
 *
 * USAGE:
 * npm run migrate
 */

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function runMigrations() {
  console.log("🚀 Starting database migrations...\n");

  try {
    // TODO: Create migrations tracking table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS migrations (
        id SERIAL PRIMARY KEY,
        filename VARCHAR(255) UNIQUE NOT NULL,
        executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // TODO: Read migration files from db/migrations/
    const migrationsDir = path.join(__dirname, "../db/migrations");
    const files = fs
      .readdirSync(migrationsDir)
      .filter((file) => file.endsWith(".sql"))
      .sort(); // Sort to ensure order (001, 002, 003, etc.)

    console.log(`Found ${files.length} migration files\n`);

    // TODO: Execute each migration
    for (const file of files) {
      // Check if already executed
      const result = await pool.query(
        "SELECT * FROM migrations WHERE filename = $1",
        [file],
      );

      if (result.rows.length > 0) {
        console.log(`⏭️  Skipping ${file} (already executed)`);
        continue;
      }

      // Read and execute migration
      console.log(`▶️  Running ${file}...`);
      const filePath = path.join(migrationsDir, file);
      const sql = fs.readFileSync(filePath, "utf-8");

      // Execute migration
      await pool.query(sql);

      // Record migration
      await pool.query("INSERT INTO migrations (filename) VALUES ($1)", [file]);

      console.log(`✅ Completed ${file}\n`);
    }

    console.log("🎉 All migrations completed successfully!");
  } catch (error) {
    console.error("❌ Migration failed:", error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

// Run migrations
runMigrations();
