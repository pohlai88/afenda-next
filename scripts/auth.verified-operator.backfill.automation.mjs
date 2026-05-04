import { loadEnvConfig } from "@next/env";
import postgres from "postgres";

loadEnvConfig(process.cwd());

const rawEmails = process.argv[2] ?? "";
const emails = rawEmails
  .split(",")
  .map((email) => email.trim().toLowerCase())
  .filter(Boolean);

if (emails.length === 0) {
  throw new Error(
    "Pass a comma-separated email list, e.g. `pnpm auth:backfill-verified-operators -- operator@afenda.test`.",
  );
}

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is required.");
}

const sql = postgres(process.env.DATABASE_URL);

try {
  const updatedUsers = await sql`
    update "user"
    set "email_verified" = true,
        "updated_at" = now()
    where lower("email") in ${sql(emails)}
    returning "id", "email"
  `;

  console.log(
    JSON.stringify(
      {
        requested: emails,
        updated: updatedUsers,
      },
      null,
      2,
    ),
  );
} finally {
  await sql.end();
}
