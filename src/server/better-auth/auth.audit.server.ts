import "server-only";

import { randomUUID } from "node:crypto";
import { desc, eq } from "drizzle-orm";

import { authEvent } from "@/server/db/db.database.schema.shared";
import { getDb } from "@/server/db/db.postgres.adapter.server";

type AuthEventType =
  | "account_deleted"
  | "account_delete_requested"
  | "email_change_requested"
  | "email_verified"
  | "linked_account_added"
  | "linked_account_removed"
  | "password_changed"
  | "password_reset"
  | "password_set"
  | "profile_updated"
  | "tenant_bootstrapped"
  | "tenant_created";

export async function recordAuthEvent(input: {
  actorEmail?: string | null | undefined;
  actorUserId?: string | null | undefined;
  eventType: AuthEventType;
  metadata?: Record<string, unknown> | null | undefined;
}) {
  await getDb().insert(authEvent).values({
    actorEmail: input.actorEmail ?? null,
    actorUserId: input.actorUserId ?? null,
    eventType: input.eventType,
    id: randomUUID(),
    metadata: input.metadata ? JSON.stringify(input.metadata) : null,
  });
}

export async function listRecentAuthEvents(actorUserId: string, limit = 8) {
  const rows = await getDb().query.authEvent.findMany({
    limit,
    orderBy: (fields) => desc(fields.createdAt),
    where: (fields) => eq(fields.actorUserId, actorUserId),
  });

  return rows.map((row) => ({
    ...row,
    parsedMetadata: parseMetadata(row.metadata),
  }));
}

function parseMetadata(value: string | null) {
  if (!value) return null;

  try {
    return JSON.parse(value) as Record<string, unknown>;
  } catch {
    return null;
  }
}
