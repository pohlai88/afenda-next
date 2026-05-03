import "server-only";

/**
 * @afenda-owner server-api
 * @afenda-subject workspace-note
 * @afenda-artifact router
 * @afenda-boundary server
 * @afenda-description Server router for workspace note reads and writes on the home route
 */
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
} from "@/server/api/server-api.trpc.adapter.server";
import { workspaceNotes } from "@/server/db/db.database.schema.shared";

export const workspaceNoteRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        name: z.string().trim().min(1).max(120),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const [workspaceNote] = await ctx.db
        .insert(workspaceNotes)
        .values({
          name: input.name,
          createdById: ctx.session.user.id,
        })
        .returning({
          id: workspaceNotes.id,
          name: workspaceNotes.name,
        });

      return workspaceNote;
    }),

  getLatest: protectedProcedure.query(async ({ ctx }) => {
    const workspaceNote = await ctx.db.query.workspaceNotes.findFirst({
      columns: {
        id: true,
        name: true,
        createdAt: true,
        createdById: true,
      },
      orderBy: (workspaceNotes, { desc }) => [desc(workspaceNotes.createdAt)],
    });

    return workspaceNote ?? null;
  }),
});
