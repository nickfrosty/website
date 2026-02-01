import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";

import * as schema from "./schema";

export const db = drizzle({
  schema,
  connection: {
    connectionString: process.env.DATABASE_URL,
  },
});

export type Database = typeof db;
