/**
 * @afenda-owner db
 * @afenda-subject database
 * @afenda-artifact schema
 * @afenda-boundary shared
 * @afenda-description Shared Drizzle schema for database contracts
 */
import { relations } from "drizzle-orm";
import {
  boolean,
  integer,
  index,
  pgTable,
  pgTableCreator,
  primaryKey,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";

export const createTable = pgTableCreator((name) => `pg-drizzle_${name}`);

export const workspaceNotes = createTable(
  "workspace_note",
  (d) => ({
    id: d.integer().primaryKey().generatedByDefaultAsIdentity(),
    name: d.varchar({ length: 256 }),
    createdById: d
      .varchar({ length: 255 })
      .notNull()
      .references(() => user.id),
    tenantId: d.varchar({ length: 255 }).references(() => tenant.id),
    createdAt: d
      .timestamp({ withTimezone: true })
      .$defaultFn(() => new Date())
      .notNull(),
    updatedAt: d.timestamp({ withTimezone: true }).$onUpdate(() => new Date()),
  }),
  (t) => [
    index("created_by_idx").on(t.createdById),
    index("name_idx").on(t.name),
    index("tenant_idx").on(t.tenantId),
  ],
);

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  username: text("username").unique(),
  displayUsername: text("displayUsername"),
  emailVerified: boolean("email_verified")
    .$defaultFn(() => false)
    .notNull(),
  image: text("image"),
  role: text("role"),
  banned: boolean("banned"),
  banReason: text("ban_reason"),
  banExpires: timestamp("ban_expires"),
  twoFactorEnabled: boolean("two_factor_enabled"),
  createdAt: timestamp("created_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  updatedAt: timestamp("updated_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const session = pgTable(
  "session",
  {
    id: text("id").primaryKey(),
    expiresAt: timestamp("expires_at").notNull(),
    token: text("token").notNull().unique(),
    createdAt: timestamp("created_at")
      .$defaultFn(() => /* @__PURE__ */ new Date())
      .notNull(),
    updatedAt: timestamp("updated_at")
      .$defaultFn(() => /* @__PURE__ */ new Date())
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
    ipAddress: text("ip_address"),
    impersonatedBy: text("impersonated_by"),
    userAgent: text("user_agent"),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
  },
  (t) => [index("session_userId_idx").on(t.userId)],
);

export const account = pgTable(
  "account",
  {
    id: text("id").primaryKey(),
    accountId: text("account_id").notNull(),
    providerId: text("provider_id").notNull(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    idToken: text("id_token"),
    accessTokenExpiresAt: timestamp("access_token_expires_at"),
    refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
    scope: text("scope"),
    password: text("password"),
    createdAt: timestamp("created_at")
      .$defaultFn(() => /* @__PURE__ */ new Date())
      .notNull(),
    updatedAt: timestamp("updated_at")
      .$defaultFn(() => /* @__PURE__ */ new Date())
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (t) => [index("account_userId_idx").on(t.userId)],
);

export const verification = pgTable(
  "verification",
  {
    id: text("id").primaryKey(),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: timestamp("expires_at").notNull(),
    createdAt: timestamp("created_at")
      .$defaultFn(() => /* @__PURE__ */ new Date())
      .notNull(),
    updatedAt: timestamp("updated_at")
      .$defaultFn(() => /* @__PURE__ */ new Date())
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (t) => [index("verification_identifier_idx").on(t.identifier)],
);

export const twoFactor = pgTable(
  "twoFactor",
  {
    id: text("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    secret: text("secret").notNull(),
    backupCodes: text("backup_codes").notNull(),
    verified: boolean("verified").notNull(),
  },
  (t) => [index("two_factor_userId_idx").on(t.userId)],
);

export const passkey = pgTable(
  "passkey",
  {
    id: text("id").primaryKey(),
    name: text("name"),
    publicKey: text("public_key").notNull(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    credentialID: text("credential_id").notNull(),
    counter: integer("counter").notNull(),
    deviceType: text("device_type").notNull(),
    backedUp: boolean("backed_up").notNull(),
    transports: text("transports"),
    createdAt: timestamp("created_at").$defaultFn(
      () => /* @__PURE__ */ new Date(),
    ),
    aaguid: text("aaguid"),
  },
  (t) => [
    index("passkey_userId_idx").on(t.userId),
    index("passkey_credential_id_idx").on(t.credentialID),
  ],
);

export const operatorInvite = createTable(
  "operator_invite",
  {
    id: text("id").primaryKey(),
    email: text("email").notNull().unique(),
    tokenHash: text("token_hash").notNull().unique(),
    role: text("role").notNull(),
    invitedById: text("invited_by_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    expiresAt: timestamp("expires_at").notNull(),
    acceptedAt: timestamp("accepted_at"),
    createdAt: timestamp("created_at")
      .$defaultFn(() => /* @__PURE__ */ new Date())
      .notNull(),
    updatedAt: timestamp("updated_at")
      .$defaultFn(() => /* @__PURE__ */ new Date())
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (t) => [index("operator_invite_invited_by_idx").on(t.invitedById)],
);

export const tenant = createTable(
  "tenant",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    slug: text("slug").notNull(),
    name: text("name").notNull(),
    status: text("status")
      .$defaultFn(() => "active")
      .notNull(),
    settings: text("settings"),
    createdAt: timestamp("created_at")
      .$defaultFn(() => /* @__PURE__ */ new Date())
      .notNull(),
    updatedAt: timestamp("updated_at")
      .$defaultFn(() => /* @__PURE__ */ new Date())
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (t) => [uniqueIndex("tenant_slug_unique").on(t.slug)],
);

export const role = createTable(
  "role",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    tenantId: text("tenant_id")
      .notNull()
      .references(() => tenant.id, { onDelete: "cascade" }),
    slug: text("slug").notNull(),
    name: text("name").notNull(),
    description: text("description"),
    isSystem: boolean("is_system")
      .$defaultFn(() => true)
      .notNull(),
    createdAt: timestamp("created_at")
      .$defaultFn(() => /* @__PURE__ */ new Date())
      .notNull(),
    updatedAt: timestamp("updated_at")
      .$defaultFn(() => /* @__PURE__ */ new Date())
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (t) => [
    uniqueIndex("tenant_role_slug_unique").on(t.tenantId, t.slug),
    index("role_tenant_idx").on(t.tenantId),
  ],
);

export const permission = createTable(
  "permission",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    tenantId: text("tenant_id")
      .notNull()
      .references(() => tenant.id, { onDelete: "cascade" }),
    key: text("key").notNull(),
    name: text("name").notNull(),
    category: text("category"),
    createdAt: timestamp("created_at")
      .$defaultFn(() => /* @__PURE__ */ new Date())
      .notNull(),
    updatedAt: timestamp("updated_at")
      .$defaultFn(() => /* @__PURE__ */ new Date())
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (t) => [
    uniqueIndex("tenant_permission_key_unique").on(t.tenantId, t.key),
    index("permission_tenant_idx").on(t.tenantId),
  ],
);

export const tenantMembership = createTable(
  "tenant_membership",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    tenantId: text("tenant_id")
      .notNull()
      .references(() => tenant.id, { onDelete: "cascade" }),
    primaryRoleId: text("primary_role_id").references(() => role.id, {
      onDelete: "set null",
    }),
    createdAt: timestamp("created_at")
      .$defaultFn(() => /* @__PURE__ */ new Date())
      .notNull(),
    updatedAt: timestamp("updated_at")
      .$defaultFn(() => /* @__PURE__ */ new Date())
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (t) => [
    uniqueIndex("tenant_membership_user_tenant_unique").on(t.userId, t.tenantId),
    index("tenant_membership_tenant_idx").on(t.tenantId),
    index("tenant_membership_user_idx").on(t.userId),
  ],
);

export const rolePermission = createTable(
  "role_permission",
  {
    roleId: text("role_id")
      .notNull()
      .references(() => role.id, { onDelete: "cascade" }),
    permissionId: text("permission_id")
      .notNull()
      .references(() => permission.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at")
      .$defaultFn(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (t) => [
    primaryKey({ columns: [t.roleId, t.permissionId] }),
    index("role_permission_role_idx").on(t.roleId),
    index("role_permission_permission_idx").on(t.permissionId),
  ],
);

export const tenantMembershipRole = createTable(
  "tenant_membership_role",
  {
    membershipId: text("membership_id")
      .notNull()
      .references(() => tenantMembership.id, { onDelete: "cascade" }),
    roleId: text("role_id")
      .notNull()
      .references(() => role.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at")
      .$defaultFn(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (t) => [
    primaryKey({ columns: [t.membershipId, t.roleId] }),
    index("tenant_membership_role_membership_idx").on(t.membershipId),
    index("tenant_membership_role_role_idx").on(t.roleId),
  ],
);

export const authEvent = createTable(
  "auth_event",
  {
    id: text("id").primaryKey(),
    actorUserId: text("actor_user_id"),
    actorEmail: text("actor_email"),
    eventType: text("event_type").notNull(),
    metadata: text("metadata"),
    createdAt: timestamp("created_at")
      .$defaultFn(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (t) => [
    index("auth_event_actor_user_idx").on(t.actorUserId),
    index("auth_event_created_at_idx").on(t.createdAt),
  ],
);

export const userRelations = relations(user, ({ many }) => ({
  account: many(account),
  operatorInvite: many(operatorInvite),
  passkey: many(passkey),
  session: many(session),
  tenantMembership: many(tenantMembership),
  twoFactor: many(twoFactor),
}));

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, { fields: [account.userId], references: [user.id] }),
}));

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, { fields: [session.userId], references: [user.id] }),
}));

export const twoFactorRelations = relations(twoFactor, ({ one }) => ({
  user: one(user, { fields: [twoFactor.userId], references: [user.id] }),
}));

export const passkeyRelations = relations(passkey, ({ one }) => ({
  user: one(user, { fields: [passkey.userId], references: [user.id] }),
}));

export const operatorInviteRelations = relations(operatorInvite, ({ one }) => ({
  invitedBy: one(user, {
    fields: [operatorInvite.invitedById],
    references: [user.id],
  }),
}));

export const tenantRelations = relations(tenant, ({ many }) => ({
  memberships: many(tenantMembership),
  permissions: many(permission),
  roles: many(role),
  workspaceNotes: many(workspaceNotes),
}));

export const roleRelations = relations(role, ({ many, one }) => ({
  memberships: many(tenantMembership),
  membershipRoles: many(tenantMembershipRole),
  rolePermissions: many(rolePermission),
  tenant: one(tenant, {
    fields: [role.tenantId],
    references: [tenant.id],
  }),
}));

export const permissionRelations = relations(permission, ({ many, one }) => ({
  rolePermissions: many(rolePermission),
  tenant: one(tenant, {
    fields: [permission.tenantId],
    references: [tenant.id],
  }),
}));

export const tenantMembershipRelations = relations(
  tenantMembership,
  ({ many, one }) => ({
    membershipRoles: many(tenantMembershipRole),
    primaryRole: one(role, {
      fields: [tenantMembership.primaryRoleId],
      references: [role.id],
    }),
    tenant: one(tenant, {
      fields: [tenantMembership.tenantId],
      references: [tenant.id],
    }),
    user: one(user, {
      fields: [tenantMembership.userId],
      references: [user.id],
    }),
  }),
);

export const rolePermissionRelations = relations(rolePermission, ({ one }) => ({
  permission: one(permission, {
    fields: [rolePermission.permissionId],
    references: [permission.id],
  }),
  role: one(role, {
    fields: [rolePermission.roleId],
    references: [role.id],
  }),
}));

export const tenantMembershipRoleRelations = relations(
  tenantMembershipRole,
  ({ one }) => ({
    membership: one(tenantMembership, {
      fields: [tenantMembershipRole.membershipId],
      references: [tenantMembership.id],
    }),
    role: one(role, {
      fields: [tenantMembershipRole.roleId],
      references: [role.id],
    }),
  }),
);

export const workspaceNotesRelations = relations(workspaceNotes, ({ one }) => ({
  createdBy: one(user, {
    fields: [workspaceNotes.createdById],
    references: [user.id],
  }),
  tenant: one(tenant, {
    fields: [workspaceNotes.tenantId],
    references: [tenant.id],
  }),
}));
