import "server-only";

/**
 * @afenda-owner auth
 * @afenda-subject oauth
 * @afenda-artifact providers
 * @afenda-boundary server
 * @afenda-description Server auth oauth providers query for enabled Better Auth providers
 */
import { env } from "@/env";

import type { OAuthProviderId } from "./auth.oauth.provider.shared";

export function getEnabledOAuthProviderIds(): OAuthProviderId[] {
  const ids: OAuthProviderId[] = [];

  if (
    env.BETTER_AUTH_GITHUB_CLIENT_ID &&
    env.BETTER_AUTH_GITHUB_CLIENT_SECRET
  ) {
    ids.push("github");
  }
  if (
    env.BETTER_AUTH_GOOGLE_CLIENT_ID &&
    env.BETTER_AUTH_GOOGLE_CLIENT_SECRET
  ) {
    ids.push("google");
  }
  if (
    env.BETTER_AUTH_LINKEDIN_CLIENT_ID &&
    env.BETTER_AUTH_LINKEDIN_CLIENT_SECRET
  ) {
    ids.push("linkedin");
  }

  return ids;
}
