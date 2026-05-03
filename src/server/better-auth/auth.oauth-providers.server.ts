import "server-only";

import type { OAuthProviderId } from "@/lib/auth.oauth.shared";
import { env } from "@/env";

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
