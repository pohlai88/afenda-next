import "server-only";

/**
 * @afenda-owner server-api
 * @afenda-subject root
 * @afenda-artifact router
 * @afenda-boundary server
 * @afenda-description Server root router for the tRPC API
 */
import { postRouter } from "@/server/api/routers/server.api.post.router.server";
import {
  createCallerFactory,
  createTRPCRouter,
} from "@/server/api/server.api.trpc.server";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
