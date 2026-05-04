import "server-only";

import { createHash, randomBytes, randomUUID } from "node:crypto";
import { desc, eq } from "drizzle-orm";

import { publicAppOrigin } from "@/lib/url.public-app-origin.shared";
import { getDb } from "@/server/db/db.postgres.adapter.server";
import { operatorInvite, user } from "@/server/db/db.database.schema.shared";

const operatorInviteTtlMs = 1000 * 60 * 60 * 24 * 7;

export type OperatorInviteRole = "admin" | "operator" | "user";
export type OperatorInviteRecord = typeof operatorInvite.$inferSelect;

export async function createOrRefreshOperatorInvite(input: {
  email: string;
  invitedById: string;
  role: OperatorInviteRole;
}) {
  const db = getDb();
  const email = normalizeOperatorInviteEmail(input.email);
  const role = normalizeOperatorInviteRole(input.role);

  const existingUser = await db.query.user.findFirst({
    columns: { id: true },
    where: (fields, { eq }) => eq(fields.email, email),
  });
  if (existingUser) {
    throw new Error("An operator account already exists for this email.");
  }

  const existingInvite = await db.query.operatorInvite.findFirst({
    columns: {
      acceptedAt: true,
      id: true,
    },
    where: (fields, { eq }) => eq(fields.email, email),
  });
  if (existingInvite?.acceptedAt) {
    throw new Error("This operator invitation has already been accepted.");
  }

  const token = createOperatorInviteToken();
  const tokenHash = hashOperatorInviteToken(token);
  const expiresAt = new Date(Date.now() + operatorInviteTtlMs);

  if (existingInvite) {
    const [invite] = await db
      .update(operatorInvite)
      .set({
        expiresAt,
        invitedById: input.invitedById,
        role,
        tokenHash,
        updatedAt: new Date(),
      })
      .where(eq(operatorInvite.id, existingInvite.id))
      .returning();

    return { invite, token };
  }

  const [invite] = await db
    .insert(operatorInvite)
    .values({
      email,
      expiresAt,
      id: randomUUID(),
      invitedById: input.invitedById,
      role,
      tokenHash,
    })
    .returning();

  return { invite, token };
}

export async function getOperatorInviteByToken(token: string) {
  if (token.trim().length === 0) return null;

  return getDb().query.operatorInvite.findFirst({
    where: (fields, { eq }) => eq(fields.tokenHash, hashOperatorInviteToken(token)),
  });
}

export function getOperatorInviteState(invite: Pick<OperatorInviteRecord, "acceptedAt" | "expiresAt">) {
  if (invite.acceptedAt) return "accepted" as const;
  if (invite.expiresAt.valueOf() <= Date.now()) return "expired" as const;
  return "pending" as const;
}

export async function getActiveOperatorInviteByToken(token: string) {
  const invite = await getOperatorInviteByToken(token);

  if (!invite || getOperatorInviteState(invite) !== "pending") {
    return null;
  }

  return invite;
}

export async function validateActiveOperatorInviteToken(input: {
  email: string;
  token: string;
}) {
  const invite = await getActiveOperatorInviteByToken(input.token);
  if (!invite) return null;

  return invite.email === normalizeOperatorInviteEmail(input.email) ? invite : null;
}

export async function markOperatorInviteAccepted(inviteId: string) {
  await getDb()
    .update(operatorInvite)
    .set({
      acceptedAt: new Date(),
      updatedAt: new Date(),
    })
    .where(eq(operatorInvite.id, inviteId));
}

export async function listOperatorInvites(limit = 10) {
  return getDb().query.operatorInvite.findMany({
    limit,
    orderBy: [desc(operatorInvite.updatedAt)],
  });
}

export function buildOperatorInviteUrl(token: string) {
  return `${publicAppOrigin()}/accept-invite?token=${encodeURIComponent(token)}`;
}

export function getVerificationCallbackUrl() {
  return `${publicAppOrigin()}/sign-in?verified=1`;
}

export function normalizeOperatorInviteEmail(email: string) {
  return email.trim().toLowerCase();
}

function createOperatorInviteToken() {
  return randomBytes(32).toString("base64url");
}

function hashOperatorInviteToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

function normalizeOperatorInviteRole(role: string): OperatorInviteRole {
  if (role === "admin") return "admin";
  if (role === "operator") return "operator";
  return "user";
}
