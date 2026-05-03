import "server-only";

/**
 * @afenda-owner auth
 * @afenda-subject session
 * @afenda-artifact query
 * @afenda-boundary server
 * @afenda-description Server query for resolving the current auth session
 */
import { headers } from "next/headers";
import { cache } from "react";

import { getAuth } from "./auth.server.facade.server";

export const getSession = cache(async () =>
  getAuth().api.getSession({ headers: await headers() }),
);
