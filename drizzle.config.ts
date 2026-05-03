import { loadEnvConfig } from "@next/env";
import { type Config } from "drizzle-kit";

loadEnvConfig(process.cwd());

export default {
  schema: "./src/server/db/db.database.schema.shared.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env["DATABASE_URL"] ?? "",
  },
} satisfies Config;
