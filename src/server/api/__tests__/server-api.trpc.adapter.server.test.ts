/**
 * @afenda-owner server-api
 * @afenda-subject trpc
 * @afenda-artifact test
 * @afenda-boundary test
 * @afenda-description Test coverage for privileged tRPC base procedures
 */
import { describe, expect, it, vi } from "vitest";

const { getAuthMock, getDbMock } = vi.hoisted(() => ({
  getAuthMock: vi.fn(),
  getDbMock: vi.fn(),
}));

vi.mock("@/env", () => ({
  env: {
    BETTER_AUTH_ADMIN_USER_IDS: "bootstrap-admin",
  },
}));

vi.mock("server-only", () => ({}));

vi.mock("@/server/better-auth/auth.config.adapter.server", () => ({
  getAuth: getAuthMock,
}));

vi.mock("@/server/db/db.postgres.adapter.server", () => ({
  getDb: getDbMock,
}));

import {
  adminProcedure,
  authenticatedProcedure,
  createCallerFactory,
  createTRPCRouter,
  verifiedEmailProcedure,
  verifiedOperatorProcedure,
} from "@/server/api/server-api.trpc.adapter.server";

describe("authenticatedProcedure", () => {
  it("allows signed-in public users", async () => {
    const router = createTRPCRouter({
      secret: authenticatedProcedure.query(({ ctx }) => ctx.session.user.id),
    });
    const caller = createCallerFactory(router)({
      db: {} as never,
      headers: new Headers(),
      session: {
        session: { id: "session-1" },
        user: { emailVerified: false, id: "user-1", role: "user" },
      } as never,
    });

    await expect(caller.secret()).resolves.toBe("user-1");
  });
});

describe("verifiedEmailProcedure", () => {
  it("rejects unverified users", async () => {
    const router = createTRPCRouter({
      secret: verifiedEmailProcedure.query(() => "ok"),
    });
    const caller = createCallerFactory(router)({
      db: {} as never,
      headers: new Headers(),
      session: {
        session: { id: "session-1" },
        user: { emailVerified: false, id: "user-1", role: "user" },
      } as never,
    });

    await expect(caller.secret()).rejects.toMatchObject({
      code: "FORBIDDEN",
    });
  });

  it("allows verified public users", async () => {
    const router = createTRPCRouter({
      secret: verifiedEmailProcedure.query(({ ctx }) => ctx.session.user.id),
    });
    const caller = createCallerFactory(router)({
      db: {} as never,
      headers: new Headers(),
      session: {
        session: { id: "session-1" },
        user: { emailVerified: true, id: "user-1", role: "user" },
      } as never,
    });

    await expect(caller.secret()).resolves.toBe("user-1");
  });
});

describe("verifiedOperatorProcedure", () => {
  it("rejects verified public users without an operator role", async () => {
    const router = createTRPCRouter({
      secret: verifiedOperatorProcedure.query(() => "ok"),
    });
    const caller = createCallerFactory(router)({
      db: {} as never,
      headers: new Headers(),
      session: {
        session: { id: "session-1" },
        user: { emailVerified: true, id: "user-1", role: "user" },
      } as never,
    });

    await expect(caller.secret()).rejects.toMatchObject({
      code: "FORBIDDEN",
    });
  });

  it("allows verified operators and bootstrap admins", async () => {
    const router = createTRPCRouter({
      secret: verifiedOperatorProcedure.query(({ ctx }) => ctx.session.user.id),
    });

    const operatorCaller = createCallerFactory(router)({
      db: {} as never,
      headers: new Headers(),
      session: {
        session: { id: "session-1" },
        user: { emailVerified: true, id: "operator-1", role: "operator" },
      } as never,
    });
    const bootstrapAdminCaller = createCallerFactory(router)({
      db: {} as never,
      headers: new Headers(),
      session: {
        session: { id: "session-2" },
        user: { emailVerified: false, id: "bootstrap-admin", role: "user" },
      } as never,
    });

    await expect(operatorCaller.secret()).resolves.toBe("operator-1");
    await expect(bootstrapAdminCaller.secret()).resolves.toBe(
      "bootstrap-admin",
    );
  });
});

describe("adminProcedure", () => {
  it("rejects signed-in non-admin operators", async () => {
    const router = createTRPCRouter({
      secret: adminProcedure.query(() => "ok"),
    });
    const caller = createCallerFactory(router)({
      db: {} as never,
      headers: new Headers(),
      session: {
        session: { id: "session-1" },
        user: { emailVerified: true, id: "operator-1", role: "operator" },
      } as never,
    });

    await expect(caller.secret()).rejects.toMatchObject({
      code: "FORBIDDEN",
    });
  });

  it("allows access for stored admin roles and bootstrap admin ids", async () => {
    const router = createTRPCRouter({
      secret: adminProcedure.query(({ ctx }) => ctx.session.user.id),
    });

    const roleAdminCaller = createCallerFactory(router)({
      db: {} as never,
      headers: new Headers(),
      session: {
        session: { id: "session-1" },
        user: { emailVerified: true, id: "admin-1", role: "admin" },
      } as never,
    });
    const bootstrapAdminCaller = createCallerFactory(router)({
      db: {} as never,
      headers: new Headers(),
      session: {
        session: { id: "session-2" },
        user: { emailVerified: false, id: "bootstrap-admin", role: "user" },
      } as never,
    });

    await expect(roleAdminCaller.secret()).resolves.toBe("admin-1");
    await expect(bootstrapAdminCaller.secret()).resolves.toBe(
      "bootstrap-admin",
    );
  });
});
