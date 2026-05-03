import "server-only";

/**
 * @afenda-owner server-api
 * @afenda-subject root
 * @afenda-artifact router
 * @afenda-boundary server
 * @afenda-description Server root tRPC router for reviewed API domains
 */
import { workspaceNoteRouter } from "@/server/api/routers/server-api.workspace-note.router.server";
import {
  createCallerFactory,
  createTRPCRouter,
} from "@/server/api/server-api.trpc.adapter.server";

/**
 * Root tRPC API surface.
 *
 * Routers are registered manually so the public API shape remains explicit
 * and reviewable across ERP-owned domains.
 */
export const appRouter = createTRPCRouter({
  workspaceNote: workspaceNoteRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 *
 * @example
 * const trpc = createCaller(createContext);
 * const latest = await trpc.workspaceNote.getLatest();
 */
export const createCaller = createCallerFactory(appRouter);
