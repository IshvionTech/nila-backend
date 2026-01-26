import { Pool } from "pg";
import { config } from "./env";

/**
 * TODO: Database Connection Setup
 *
 * This file sets up PostgreSQL connection pool using the 'pg' library.
 *
 * SETUP INSTRUCTIONS:
 *
 * 1. Ensure DATABASE_URL is set in .env file
 *    Format: postgresql://username:password@host:port/database
 *
 * 2. Connection pool configuration:
 *    - max: Maximum number of clients in the pool
 *    - idleTimeoutMillis: How long a client can be idle before closing
 *    - connectionTimeoutMillis: How long to wait for connection
 *
 * 3. Usage in repositories:
 *    import { pool } from '../../config/db';
 *    const result = await pool.query('SELECT * FROM users WHERE id = $1', [userId]);
 *
 * 4. Error handling:
 *    - Always use try-catch blocks
 *    - Log connection errors
 *    - Handle connection pool exhaustion
 */

export const pool = new Pool({
  connectionString: config.databaseUrl,
  max: 20, // Maximum number of clients in the pool
  idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
  connectionTimeoutMillis: 2000, // Return error after 2 seconds if connection not available
});

// Test database connection
pool.on("connect", () => {
  console.log("✅ Database connected successfully");
});

pool.on("error", (err: Error) => {
  console.error("❌ Unexpected database error:", err);
  process.exit(-1);
});

/**
 * QUERY HELPER FUNCTION
 *
 * Use this helper for all database queries:
 *
 * Example:
 * const users = await query('SELECT * FROM users WHERE phone = $1', [phone]);
 */
export const query = async (text: string, params?: any[]) => {
  const start = Date.now();
  try {
    const result = await pool.query(text, params);
    const duration = Date.now() - start;
    console.log("Executed query", { text, duration, rows: result.rowCount });
    return result;
  } catch (error) {
    console.error("Database query error:", { text, error });
    throw error;
  }
};

/**
 * TRANSACTION HELPER
 *
 * Use for operations that need to be atomic:
 *
 * Example:
 * await transaction(async (client) => {
 *   await client.query('INSERT INTO users ...');
 *   await client.query('INSERT INTO appointments ...');
 * });
 */
export const transaction = async (callback: (client: any) => Promise<void>) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    await callback(client);
    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};

export default pool;
