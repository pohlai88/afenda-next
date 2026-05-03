import { toNextJsHandler } from "better-auth/next-js";

import { auth } from "@/server/better-auth/auth.config.adapter.server";

/**
 * Better Auth HTTP adapter surface for sign-in, callback, and session flows.
 *
 * Route ownership stays transport-only here; auth policy and configuration
 * remain in server-owned Better Auth modules.
 */
export const { GET, POST } = toNextJsHandler(auth);
