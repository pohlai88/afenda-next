CREATE TABLE "pg-drizzle_operator_invite" (
	"id" text PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"token_hash" text NOT NULL,
	"role" text NOT NULL,
	"invited_by_id" text NOT NULL,
	"expires_at" timestamp NOT NULL,
	"accepted_at" timestamp,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	CONSTRAINT "pg-drizzle_operator_invite_email_unique" UNIQUE("email"),
	CONSTRAINT "pg-drizzle_operator_invite_token_hash_unique" UNIQUE("token_hash")
);
--> statement-breakpoint
ALTER TABLE "pg-drizzle_operator_invite" ADD CONSTRAINT "pg-drizzle_operator_invite_invited_by_id_user_id_fk" FOREIGN KEY ("invited_by_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "operator_invite_invited_by_idx" ON "pg-drizzle_operator_invite" USING btree ("invited_by_id");