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

import { env } from "@/env";
import {
  hasAdminAccess,
  hasVerifiedEmailAccess,
  hasVerifiedOperatorAccess,
  parseAdminUserIds,
} from "@/server/better-auth/auth.admin.shared";
import { getAuth } from "@/server/better-auth/auth.config.adapter.server";
import { getDb } from "@/server/db/db.postgres.adapter.server";
import { getActiveTenantContext } from "@/server/tenant/tenant.context.server";

export const createTRPCContext = async (opts: { headers: Headers }) => {
  const session = await getAuth().api.getSession({
    headers: opts.headers,
    query: {
      disableCookieCache: true,
    },
  });

  return {
    db: getDb(),
    headers: opts.headers,
    session,
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
export const publicProcedure = t.procedure;

export const authenticatedProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.session?.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  return next({
    ctx: {
      session: { ...ctx.session, user: ctx.session.user },
    },
  });
});

export const verifiedEmailProcedure = authenticatedProcedure.use(({ ctx, next }) => {
  if (
    !hasVerifiedEmailAccess(
      ctx.session.user,
      parseAdminUserIds(env.BETTER_AUTH_ADMIN_USER_IDS),
    )
  ) {
    throw new TRPCError({ code: "FORBIDDEN" });
  }

  return next({
    ctx: {
      session: { ...ctx.session, user: ctx.session.user },
    },
  });
});

export const verifiedOperatorProcedure = authenticatedProcedure.use(
  ({ ctx, next }) => {
    if (
      !hasVerifiedOperatorAccess(
        ctx.session.user,
        parseAdminUserIds(env.BETTER_AUTH_ADMIN_USER_IDS),
      )
    ) {
      throw new TRPCError({ code: "FORBIDDEN" });
    }

    return next({
      ctx: {
        session: { ...ctx.session, user: ctx.session.user },
      },
    });
  },
);

export const adminProcedure = verifiedOperatorProcedure.use(({ ctx, next }) => {
  if (
    !hasAdminAccess(
      ctx.session.user,
      parseAdminUserIds(env.BETTER_AUTH_ADMIN_USER_IDS),
    )
  ) {
    throw new TRPCError({ code: "FORBIDDEN" });
  }

  return next({
    ctx: {
      session: { ...ctx.session, user: ctx.session.user },
    },
  });
});

export const tenantProcedure = authenticatedProcedure.use(
  async ({ ctx, next, getRawInput }) => {
    const tenantSlug = readTenantSlug(await getRawInput());

    if (!tenantSlug) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "tenantSlug is required",
      });
    }

    const tenantContext = await getActiveTenantContext(
      ctx.session.user.id,
      tenantSlug,
    );

    if (!tenantContext) {
      throw new TRPCError({ code: "FORBIDDEN" });
    }

    return next({
      ctx: {
        ...ctx,
        tenant: tenantContext.tenant,
        tenantMembership: tenantContext.membership,
        tenantPermissionKeys: tenantContext.permissionKeys,
        tenantRoleSlugs: tenantContext.roleSlugs,
      },
    });
  },
);

export const tenantPermissionProcedure = (permissionKey: string) =>
  tenantProcedure.use(({ ctx, next }) => {
    if (!ctx.tenantPermissionKeys.includes(permissionKey)) {
      throw new TRPCError({ code: "FORBIDDEN" });
    }

    return next({
      ctx: {
        ...ctx,
      },
    });
  });

function readTenantSlug(rawInput: unknown) {
  if (!rawInput || typeof rawInput !== "object") {
    return null;
  }

  const tenantSlug = (rawInput as Record<string, unknown>)["tenantSlug"];
  if (typeof tenantSlug !== "string") {
    return null;
  }

  const normalized = tenantSlug.trim();
  return normalized.length > 0 ? normalized : null;
}
