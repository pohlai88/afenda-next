import "server-only";

import { drizzle, type PostgresJsDatabase } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { env } from "@/env";
import * as schema from "./db.schema.shared";

type Database = PostgresJsDatabase<typeof schema>;

/**
 * Lazily create the database connection so build-time imports do not open
 * Postgres connections. Cache it in development to survive HMR updates.
 */
const globalForDb = globalThis as unknown as {
  conn: postgres.Sql | undefined;
  db: Database | undefined;
};

let conn: postgres.Sql | undefined;
let db: Database | undefined;

function getConnection() {
  conn ??= globalForDb.conn ?? postgres(env.DATABASE_URL);
  if (env.NODE_ENV !== "production") globalForDb.conn = conn;

  return conn;
}

export function getDb() {
  db ??= globalForDb.db ?? drizzle(getConnection(), { schema });
  if (env.NODE_ENV !== "production") globalForDb.db = db;

  return db;
}

export type Db = Database;
