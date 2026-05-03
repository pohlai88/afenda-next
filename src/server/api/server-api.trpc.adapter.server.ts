import "server-only";

/**
 * @afenda-owner server-api
 * @afenda-subject trpc
 * @afenda-artifact adapter
 * @afenda-boundary server
 * @afenda-description Server tRPC adapter for context auth and routers
 */
import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import { ZodError } from "zod";

import { getAuth } from "@/server/better-auth/auth.server.facade.server";
import { getDb } from "@/server/db/db.postgres.adapter.server";

/**
 * Server-only request context for tRPC execution.
 *
 * It binds Better Auth session and database access to each request while preserving
 * the request headers for downstream adapters.
 *
 * @see https://trpc.io/docs/server/context
 */
export const createTRPCContext = async (opts: { headers: Headers }) => {
  const session = await getAuth().api.getSession({
    headers: opts.headers,
  });
  return {
    db: getDb(),
    session,
    headers: opts.headers,
  };
};

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

export const createCallerFactory = t.createCallerFactory;

export const createTRPCRouter = t.router;

/**
 * Base procedure for unauthenticated or optionally-authenticated reads.
 *
 * Public procedures must never expose tenant-private records, privileged state,
 * or mutations unless the domain router adds explicit checks.
 */
export const publicProcedure = t.procedure;

/**
 * Base authenticated procedure.
 *
 * This validates request identity only (`ctx.session.user` exists). It does not
 * perform tenant, role, ownership, or record-level authorization.
 * Domain routers must enforce those policies explicitly where required.
 */
export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.session?.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({
    ctx: {
      // infers the `session` as non-nullable
      session: { ...ctx.session, user: ctx.session.user },
    },
  });
});
