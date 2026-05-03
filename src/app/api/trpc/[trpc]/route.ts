import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { type NextRequest } from "next/server";

import { env } from "@/env";
import { appRouter } from "@/server/api/server-api.root.router.server";
import { createTRPCContext } from "@/server/api/server-api.trpc.adapter.server";

/**
 * Creates the request-scoped tRPC context for the HTTP adapter surface.
 *
 * This route exists only for browser and external HTTP access to the reviewed
 * tRPC API. Server Components should continue to call server-owned procedures
 * directly through the RSC hydration helpers.
 */
const createRouteContext = async (req: NextRequest) => {
  return createTRPCContext({
    headers: req.headers,
  });
};

const handler = (req: NextRequest) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: () => createRouteContext(req),
    ...(env.NODE_ENV === "development"
      ? {
          onError: ({
            path,
            error,
          }: {
            path: string | undefined;
            error: Error;
          }) => {
            console.error(
              `❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`,
            );
          },
        }
      : {}),
  });

export { handler as GET, handler as POST };
