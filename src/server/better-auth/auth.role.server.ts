import "server-only";

/**
 * @afenda-owner auth
 * @afenda-subject role
 * @afenda-artifact server
 * @afenda-boundary server
 * @afenda-description Shared persisted-role writes for Afenda auth authorization state
 */
import { eq } from "drizzle-orm";

import { user } from "@/server/db/db.database.schema.shared";
import { getDb } from "@/server/db/db.postgres.adapter.server";

export type StoredUserRole = "admin" | "operator" | "user";

export async function setStoredUserRole(userId: string, role: StoredUserRole) {
  await getDb()
    .update(user)
    .set({ role, updatedAt: new Date() })
    .where(eq(user.id, userId));
}
