import "server-only";

/**
 * @afenda-owner server-api
 * @afenda-subject workspace-note
 * @afenda-artifact router
 * @afenda-boundary server
 * @afenda-description Server router for tenant-scoped workspace note reads and writes
 */
import { z } from "zod";

import {
  createTRPCRouter,
  tenantPermissionProcedure,
} from "@/server/api/server-api.trpc.adapter.server";
import { workspaceNotes } from "@/server/db/db.database.schema.shared";

export const workspaceNoteRouter = createTRPCRouter({
  create: tenantPermissionProcedure("workspace_note:create")
    .input(
      z.object({
        name: z.string().trim().min(1).max(120),
        tenantSlug: z.string().trim().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const [workspaceNote] = await ctx.db
        .insert(workspaceNotes)
        .values({
          createdById: ctx.session.user.id,
          name: input.name,
          tenantId: ctx.tenant.id,
        })
        .returning({
          id: workspaceNotes.id,
          name: workspaceNotes.name,
        });

      return workspaceNote;
    }),

  getLatest: tenantPermissionProcedure("workspace_note:read")
    .input(
      z.object({
        tenantSlug: z.string().trim().min(1),
      }),
    )
    .query(async ({ ctx }) => {
      const workspaceNote = await ctx.db.query.workspaceNotes.findFirst({
        columns: {
          createdAt: true,
          createdById: true,
          id: true,
          name: true,
        },
        orderBy: (fields, { desc }) => [desc(fields.createdAt)],
        where: (fields, { eq }) => eq(fields.tenantId, ctx.tenant.id),
      });

      return workspaceNote ?? null;
    }),
});
