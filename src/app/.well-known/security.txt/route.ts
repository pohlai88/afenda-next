import {
  publicTrustOwnerRoutes,
  securityTxtExpiresAt,
  securityTxtHref,
} from "@/features/public-trust/public-trust.content.data.fixture";
import { securityDisclosureLink } from "@/app/(app)/(public)/(marketing)/(declaration-docs)/footer";
import { publicAppOrigin } from "@/lib/url.public-app-origin.shared";

export const dynamic = "force-static";

function buildSecurityTxt(): string {
  const origin = publicAppOrigin();

  return [
    `Contact: mailto:${publicTrustOwnerRoutes.security.value}`,
    `Expires: ${securityTxtExpiresAt}`,
    `Canonical: ${origin}${securityTxtHref}`,
    `Policy: ${origin}${securityDisclosureLink.href}`,
    "Preferred-Languages: en",
  ].join("\n");
}

export function GET() {
  return new Response(buildSecurityTxt(), {
    headers: {
      "cache-control": "public, max-age=3600, s-maxage=3600",
      "content-type": "text/plain; charset=utf-8",
    },
  });
}
