import "server-only";

import { and, eq, isNotNull } from "drizzle-orm";

import { account } from "@/server/db/db.database.schema.shared";
import { getDb } from "@/server/db/db.postgres.adapter.server";

export async function listSafeLinkedAccounts(userId: string) {
  const rows = await getDb().query.account.findMany({
    columns: {
      accountId: true,
      createdAt: true,
      id: true,
      providerId: true,
      updatedAt: true,
    },
    where: (fields, operators) => eq(fields.userId, userId),
  });

  return rows.map((row) => ({
    ...row,
    isCredentialAccount: row.providerId === "credential",
  }));
}

export async function hasCredentialAccount(userId: string) {
  const row = await getDb().query.account.findFirst({
    columns: { id: true },
    where: (fields, operators) =>
      and(eq(fields.userId, userId), isNotNull(fields.password)),
  });

  return Boolean(row);
}

export async function getServerOAuthTokens(input: {
  providerId: string;
  userId: string;
}) {
  return getDb().query.account.findFirst({
    columns: {
      accessToken: true,
      accessTokenExpiresAt: true,
      idToken: true,
      refreshToken: true,
      refreshTokenExpiresAt: true,
      scope: true,
    },
    where: (fields, operators) =>
      and(
        eq(fields.providerId, input.providerId),
        eq(fields.userId, input.userId),
      ),
  });
}
