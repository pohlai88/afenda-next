import type { Metadata } from "next";

import type { DeclarationLegalIdentity } from "@/components/ui-blocks/declaration-shell/declaration-shell.types.shared";
import { TrustControlSurface } from "@/components/ui-blocks/trust-control-surface/trust-control-surface.surface.shared";
import {
  buildTrustMetadata,
  trustSurfaceDefinition,
} from "@/features/public-trust/public-trust.content.data.fixture";

import {
  declarationFooterIdentity,
  publicTrustFooterLinks,
} from "../footer";

export const dynamic = "force-static";

export const metadata: Metadata = buildTrustMetadata();

const legalIdentity =
  declarationFooterIdentity satisfies DeclarationLegalIdentity;

export default function TrustPage() {
  return (
    <TrustControlSurface
      definition={trustSurfaceDefinition}
      legalIdentity={legalIdentity}
      footerLinks={publicTrustFooterLinks}
    />
  );
}
