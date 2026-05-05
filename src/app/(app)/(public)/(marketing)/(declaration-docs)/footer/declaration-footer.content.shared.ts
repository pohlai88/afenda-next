/**
 * @afenda-owner declaration-docs-footer
 * @afenda-subject content
 * @afenda-artifact data
 * @afenda-boundary shared
 * @afenda-description Canonical declaration footer identity and route data for Afenda public surfaces.
 */
import type { DeclarationLegalIdentity } from "@/components/ui-blocks/declaration-shell/declaration-shell.types.shared";
import type { DeclarationRelatedLink } from "@/components/ui-blocks/declaration-shell/declaration-shell.types.shared";

export const declarationFooterIdentity = {
  legalEntityName: "[Legal Entity Name]",
  companyRegistrationNumber: "[Company Registration Number]",
  incorporationStatement: "Incorporated in Malaysia.",
  regionalStatement: "Serving businesses across Southeast Asia.",
  privacyInquiryLabel: "Privacy enquiries",
  privacyInquiryEmail: "privacy@[domain]",
} satisfies DeclarationLegalIdentity;

export const trustRouteLink = {
  href: "/trust",
  label: "Trust",
  description:
    "Canonical public assurance surface showing current posture, evidence, commitments, and boundaries.",
} satisfies DeclarationRelatedLink;

export const securityDisclosureLink = {
  href: "/security/disclosure",
  label: "Security Disclosure",
  description:
    "Formal vulnerability disclosure route with scope, safe harbor language, and reporting expectations.",
} satisfies DeclarationRelatedLink;

export const declarationFooterLinks = [
  {
    href: "/privacy",
    label: "Privacy Notice",
    description:
      "How Afenda handles personal data, disclosures, retention, transfers, and privacy rights.",
  },
  {
    href: "/terms",
    label: "Terms of Use",
    description:
      "The public service boundary, customer responsibilities, and commercial use posture.",
  },
  {
    href: "/security",
    label: "Security",
    description:
      "Security posture, infrastructure boundary, access controls, and trust reporting routes.",
  },
  {
    href: "/support",
    label: "Support",
    description:
      "Business support, escalation paths, declaration index, and operational contact model.",
  },
  trustRouteLink,
] satisfies readonly DeclarationRelatedLink[];

export const publicTrustFooterLinks = declarationFooterLinks satisfies readonly DeclarationRelatedLink[];
