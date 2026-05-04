ALTER TABLE "user" ADD COLUMN "username" text;
ALTER TABLE "user" ADD COLUMN "displayUsername" text;
ALTER TABLE "session" ADD COLUMN "activeOrganizationId" text;

CREATE UNIQUE INDEX "user_username_unique" ON "user" ("username");

CREATE TABLE "organization" (
  "id" text PRIMARY KEY NOT NULL,
  "name" text NOT NULL,
  "slug" text NOT NULL,
  "logo" text,
  "metadata" text,
  "createdAt" timestamp NOT NULL
);

CREATE UNIQUE INDEX "organization_slug_unique" ON "organization" ("slug");
CREATE INDEX "organization_slug_idx" ON "organization" ("slug");

CREATE TABLE "member" (
  "id" text PRIMARY KEY NOT NULL,
  "organizationId" text NOT NULL REFERENCES "organization"("id") ON DELETE cascade,
  "userId" text NOT NULL REFERENCES "user"("id") ON DELETE cascade,
  "role" text NOT NULL,
  "createdAt" timestamp NOT NULL
);

CREATE INDEX "member_org_idx" ON "member" ("organizationId");
CREATE INDEX "member_user_idx" ON "member" ("userId");

CREATE TABLE "invitation" (
  "id" text PRIMARY KEY NOT NULL,
  "organizationId" text NOT NULL REFERENCES "organization"("id") ON DELETE cascade,
  "email" text NOT NULL,
  "role" text,
  "status" text NOT NULL,
  "expiresAt" timestamp NOT NULL,
  "createdAt" timestamp NOT NULL,
  "inviterId" text NOT NULL REFERENCES "user"("id") ON DELETE cascade
);

CREATE INDEX "invitation_org_idx" ON "invitation" ("organizationId");
CREATE INDEX "invitation_email_idx" ON "invitation" ("email");

CREATE TABLE "pg-drizzle_auth_event" (
  "id" text PRIMARY KEY NOT NULL,
  "actor_user_id" text,
  "actor_email" text,
  "event_type" text NOT NULL,
  "metadata" text,
  "created_at" timestamp NOT NULL
);

CREATE INDEX "auth_event_actor_user_idx" ON "pg-drizzle_auth_event" ("actor_user_id");
CREATE INDEX "auth_event_created_at_idx" ON "pg-drizzle_auth_event" ("created_at");
