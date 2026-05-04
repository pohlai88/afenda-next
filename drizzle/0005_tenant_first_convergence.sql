ALTER TABLE "pg-drizzle_workspace_note" ADD COLUMN "tenant_id" text;

CREATE TABLE "pg-drizzle_tenant" (
  "id" text PRIMARY KEY NOT NULL,
  "slug" text NOT NULL,
  "name" text NOT NULL,
  "status" text NOT NULL,
  "settings" text,
  "created_at" timestamp with time zone NOT NULL,
  "updated_at" timestamp with time zone NOT NULL
);

CREATE TABLE "pg-drizzle_role" (
  "id" text PRIMARY KEY NOT NULL,
  "tenant_id" text NOT NULL,
  "slug" text NOT NULL,
  "name" text NOT NULL,
  "description" text,
  "is_system" boolean NOT NULL,
  "created_at" timestamp with time zone NOT NULL,
  "updated_at" timestamp with time zone NOT NULL
);

CREATE TABLE "pg-drizzle_permission" (
  "id" text PRIMARY KEY NOT NULL,
  "tenant_id" text NOT NULL,
  "key" text NOT NULL,
  "name" text NOT NULL,
  "category" text,
  "created_at" timestamp with time zone NOT NULL,
  "updated_at" timestamp with time zone NOT NULL
);

CREATE TABLE "pg-drizzle_tenant_membership" (
  "id" text PRIMARY KEY NOT NULL,
  "user_id" text NOT NULL,
  "tenant_id" text NOT NULL,
  "primary_role_id" text,
  "created_at" timestamp with time zone NOT NULL,
  "updated_at" timestamp with time zone NOT NULL
);

CREATE TABLE "pg-drizzle_role_permission" (
  "role_id" text NOT NULL,
  "permission_id" text NOT NULL,
  "created_at" timestamp with time zone NOT NULL,
  CONSTRAINT "pg-drizzle_role_permission_role_id_permission_id_pk" PRIMARY KEY("role_id","permission_id")
);

CREATE TABLE "pg-drizzle_tenant_membership_role" (
  "membership_id" text NOT NULL,
  "role_id" text NOT NULL,
  "created_at" timestamp with time zone NOT NULL,
  CONSTRAINT "pg-drizzle_tenant_membership_role_membership_id_role_id_pk" PRIMARY KEY("membership_id","role_id")
);

ALTER TABLE "pg-drizzle_workspace_note"
  ADD CONSTRAINT "pg-drizzle_workspace_note_tenant_id_fk"
  FOREIGN KEY ("tenant_id") REFERENCES "pg-drizzle_tenant"("id") ON DELETE no action ON UPDATE no action;
ALTER TABLE "pg-drizzle_role"
  ADD CONSTRAINT "pg-drizzle_role_tenant_id_fk"
  FOREIGN KEY ("tenant_id") REFERENCES "pg-drizzle_tenant"("id") ON DELETE cascade ON UPDATE no action;
ALTER TABLE "pg-drizzle_permission"
  ADD CONSTRAINT "pg-drizzle_permission_tenant_id_fk"
  FOREIGN KEY ("tenant_id") REFERENCES "pg-drizzle_tenant"("id") ON DELETE cascade ON UPDATE no action;
ALTER TABLE "pg-drizzle_tenant_membership"
  ADD CONSTRAINT "pg-drizzle_tenant_membership_user_id_fk"
  FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
ALTER TABLE "pg-drizzle_tenant_membership"
  ADD CONSTRAINT "pg-drizzle_tenant_membership_tenant_id_fk"
  FOREIGN KEY ("tenant_id") REFERENCES "pg-drizzle_tenant"("id") ON DELETE cascade ON UPDATE no action;
ALTER TABLE "pg-drizzle_tenant_membership"
  ADD CONSTRAINT "pg-drizzle_tenant_membership_primary_role_id_fk"
  FOREIGN KEY ("primary_role_id") REFERENCES "pg-drizzle_role"("id") ON DELETE set null ON UPDATE no action;
ALTER TABLE "pg-drizzle_role_permission"
  ADD CONSTRAINT "pg-drizzle_role_permission_role_id_fk"
  FOREIGN KEY ("role_id") REFERENCES "pg-drizzle_role"("id") ON DELETE cascade ON UPDATE no action;
ALTER TABLE "pg-drizzle_role_permission"
  ADD CONSTRAINT "pg-drizzle_role_permission_permission_id_fk"
  FOREIGN KEY ("permission_id") REFERENCES "pg-drizzle_permission"("id") ON DELETE cascade ON UPDATE no action;
ALTER TABLE "pg-drizzle_tenant_membership_role"
  ADD CONSTRAINT "pg-drizzle_tenant_membership_role_membership_id_fk"
  FOREIGN KEY ("membership_id") REFERENCES "pg-drizzle_tenant_membership"("id") ON DELETE cascade ON UPDATE no action;
ALTER TABLE "pg-drizzle_tenant_membership_role"
  ADD CONSTRAINT "pg-drizzle_tenant_membership_role_role_id_fk"
  FOREIGN KEY ("role_id") REFERENCES "pg-drizzle_role"("id") ON DELETE cascade ON UPDATE no action;

CREATE UNIQUE INDEX "tenant_slug_unique" ON "pg-drizzle_tenant" USING btree ("slug");
CREATE UNIQUE INDEX "tenant_role_slug_unique" ON "pg-drizzle_role" USING btree ("tenant_id","slug");
CREATE INDEX "role_tenant_idx" ON "pg-drizzle_role" USING btree ("tenant_id");
CREATE UNIQUE INDEX "tenant_permission_key_unique" ON "pg-drizzle_permission" USING btree ("tenant_id","key");
CREATE INDEX "permission_tenant_idx" ON "pg-drizzle_permission" USING btree ("tenant_id");
CREATE UNIQUE INDEX "tenant_membership_user_tenant_unique" ON "pg-drizzle_tenant_membership" USING btree ("user_id","tenant_id");
CREATE INDEX "tenant_membership_tenant_idx" ON "pg-drizzle_tenant_membership" USING btree ("tenant_id");
CREATE INDEX "tenant_membership_user_idx" ON "pg-drizzle_tenant_membership" USING btree ("user_id");
CREATE INDEX "role_permission_role_idx" ON "pg-drizzle_role_permission" USING btree ("role_id");
CREATE INDEX "role_permission_permission_idx" ON "pg-drizzle_role_permission" USING btree ("permission_id");
CREATE INDEX "tenant_membership_role_membership_idx" ON "pg-drizzle_tenant_membership_role" USING btree ("membership_id");
CREATE INDEX "tenant_membership_role_role_idx" ON "pg-drizzle_tenant_membership_role" USING btree ("role_id");
CREATE INDEX "tenant_idx" ON "pg-drizzle_workspace_note" USING btree ("tenant_id");
