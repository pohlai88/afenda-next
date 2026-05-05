import type { Metadata } from "next";

import { DeclarationShell } from "@/components/ui-blocks/declaration-shell/declaration-shell.surface.shared";

import {
  buildDeclarationMetadata,
  declarationDocuments,
  declarationFooterIdentity,
  declarationFooterLinks,
} from "../../declaration-documents.data.shared";

const document = declarationDocuments["security/disclosure"];

export const metadata: Metadata = buildDeclarationMetadata(document);

export default function SecurityDisclosurePage() {
  return (
    <DeclarationShell
      document={document}
      footerLinks={declarationFooterLinks}
      legalIdentity={declarationFooterIdentity}
    />
  );
}
