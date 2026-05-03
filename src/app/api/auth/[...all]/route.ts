import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

/**
 * Better Auth HTTP adapter surface for sign-in, callback, and session flows.
 *
 * Route ownership stays transport-only here; auth policy and configuration
 * remain in server-owned Better Auth modules.
 */
export const { GET, POST } = toNextJsHandler(auth);
