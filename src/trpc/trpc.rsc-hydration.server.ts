import "server-only";

/**
 * @afenda-owner trpc
 * @afenda-subject rsc
 * @afenda-artifact hydration
 * @afenda-boundary server
 * @afenda-description Server tRPC RSC hydration helpers for caller execution and query hydration
 */
import { createHydrationHelpers } from "@trpc/react-query/rsc";
import { headers } from "next/headers";
import { cache } from "react";

import { type AppRouter } from "@/trpc/trpc.router.types.shared";

import { createCaller } from "@/server/api/server-api.root.router.server";
import { createTRPCContext } from "@/server/api/server-api.trpc.adapter.server";
import { createQueryClient } from "./trpc.query-client.factory.shared";

/**
 * Creates the request-scoped tRPC context used by React Server Components.
 */
const createContext = cache(async () => {
  const requestHeaders = new Headers(await headers());
  requestHeaders.set("x-trpc-source", "rsc");

  return createTRPCContext({
    headers: requestHeaders,
  });
});

const getQueryClient = cache(createQueryClient);
const caller = createCaller(createContext);

export const { trpc: api, HydrateClient } = createHydrationHelpers<AppRouter>(
  caller,
  getQueryClient,
);
