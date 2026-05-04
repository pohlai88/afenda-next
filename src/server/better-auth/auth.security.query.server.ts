import "server-only";

/**
 * @afenda-owner auth
 * @afenda-subject security
 * @afenda-artifact query
 * @afenda-boundary server
 * @afenda-description Server queries for security-center auth data
 */
import { headers } from "next/headers";
import { cache } from "react";

import { getAuth } from "./auth.config.adapter.server";
import { requireFreshVerifiedEmailSession } from "./auth.policy.server";

const securityCallbackUrl = "/account/security";

export const listSessions = cache(async () => {
  await requireFreshVerifiedEmailSession(securityCallbackUrl);

  return getAuth().api.listSessions({
    headers: await headers(),
  });
});

export const listPasskeys = cache(async () => {
  await requireFreshVerifiedEmailSession(securityCallbackUrl);

  return getAuth().api.listPasskeys({
    headers: await headers(),
  });
});
