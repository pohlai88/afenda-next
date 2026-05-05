import type { Metadata } from "next";

import { DeclarationShell } from "@/components/ui-blocks/declaration-shell/declaration-shell.surface.shared";

import {
  buildDeclarationMetadata,
  declarationDocuments,
  declarationFooterIdentity,
  declarationFooterLinks,
} from "../declaration-documents.data.shared";

const document = declarationDocuments.support;

export const metadata: Metadata = buildDeclarationMetadata(document);

export default function SupportDeclarationPage() {
  return (
    <DeclarationShell
      document={document}
      footerLinks={declarationFooterLinks}
      legalIdentity={declarationFooterIdentity}
    />
  );
}
