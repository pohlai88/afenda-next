import "server-only";

/**
 * @afenda-owner trpc
 * @afenda-subject server
 * @afenda-artifact hydration
 * @afenda-boundary server
 * @afenda-description Server hydration helpers for tRPC React Server Components
 */
import { createHydrationHelpers } from "@trpc/react-query/rsc";
import { headers } from "next/headers";
import { cache } from "react";

import {
  createCaller,
  type AppRouter,
} from "@/server/api/server.api.root.server";
import { createTRPCContext } from "@/server/api/server.api.trpc.server";
import { createQueryClient } from "./trpc.query-client.shared";

/**
 * This wraps the `createTRPCContext` helper and provides the required context for the tRPC API when
 * handling a tRPC call from a React Server Component.
 */
const createContext = cache(async () => {
  const heads = new Headers(await headers());
  heads.set("x-trpc-source", "rsc");

  return createTRPCContext({
    headers: heads,
  });
});

const getQueryClient = cache(createQueryClient);
const caller = createCaller(createContext);

export const { trpc: api, HydrateClient } = createHydrationHelpers<AppRouter>(
  caller,
  getQueryClient,
);
