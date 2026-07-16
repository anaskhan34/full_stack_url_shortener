import { drizzle } from "drizzle-orm/mysql2";
import { createPool } from "mysql2";

const pool = createPool(process.env.DATABASE_URL);

export const db = drizzle({ client: pool });
