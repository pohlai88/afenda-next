/**
 * @afenda-owner public-trust
 * @afenda-subject content
 * @afenda-artifact data
 * @afenda-boundary fixture
 * @afenda-description Static trust-surface data and canonical route constants for public assurance pages.
 */
import type { Metadata } from "next";

import type {
  TrustActivationRule,
  TrustBoundaryStatement,
  TrustCommitment,
  TrustEvidenceItem,
  TrustPostureSignal,
  TrustSurfaceDefinition,
  TrustSurfaceItem,
} from "@/components/ui-blocks/trust-control-surface/trust-control-surface.types.shared";
export const trustSurfaceLastUpdatedLabel = "Updated May 5, 2026";
export const securityTxtHref = "/.well-known/security.txt" as const;
export const securityTxtExpiresAt = "2027-05-05T00:00:00.000Z";

export const publicTrustOwnerRoutes = {
  privacy: {
    label: "Privacy route",
    value: "privacy@[domain]",
    href: "mailto:privacy@[domain]",
    detail:
      "Use for privacy notices, rights requests, data handling questions, and transfer enquiries.",
  },
  security: {
    label: "Security route",
    value: "security@[domain]",
    href: "mailto:security@[domain]",
    detail:
      "Use for vulnerability disclosure, trust reviews, and security-sensitive operational issues.",
  },
  support: {
    label: "Support route",
    value: "support@[domain]",
    href: "mailto:support@[domain]",
    detail:
      "Use for public product questions, operational routing, and declaration follow-up.",
  },
} as const;

export {
  publicTrustFooterLinks,
  securityDisclosureLink,
  trustRouteLink,
} from "@/app/(app)/(public)/(marketing)/(declaration-docs)/footer";

export const publicTrustIndexableRoutes = [
  "/privacy",
  "/terms",
  "/security",
  "/security/disclosure",
  "/support",
  "/trust",
] as const;

const trustPostureSignals = [
  {
    id: "security-posture",
    label: "Security posture",
    state: "live",
    summary:
      "Security posture is public because Afenda already exposes a security route, a disclosure route, and a machine-readable intake entry.",
    ownerRoute: publicTrustOwnerRoutes.security.value,
    proofSource: "Security posture and disclosure routes are live.",
    lastUpdatedLabel: trustSurfaceLastUpdatedLabel,
    href: "/security",
  },
  {
    id: "operations-posture",
    label: "Operational status posture",
    state: "withheld",
    summary:
      "Afenda does not publish uptime or incident posture until live monitoring, incident history, and maintenance publication exist.",
    ownerRoute: publicTrustOwnerRoutes.support.value,
    proofSource: "Status remains gated by TRUST-STATUS-001.",
    lastUpdatedLabel: trustSurfaceLastUpdatedLabel,
  },
  {
    id: "data-handling-posture",
    label: "Data handling posture",
    state: "live",
    summary:
      "Privacy, terms, and support ownership are public, indexable, and backed by named routes rather than inferred marketing language.",
    ownerRoute: publicTrustOwnerRoutes.privacy.value,
    proofSource: "Privacy, terms, and support routes are live.",
    lastUpdatedLabel: trustSurfaceLastUpdatedLabel,
    href: "/privacy",
  },
] satisfies readonly TrustPostureSignal[];

const trustEvidenceItems = [
  {
    id: "evidence-privacy",
    title: "Data handling route is public",
    statement:
      "Afenda has a live privacy notice, commercial boundary, and support route. These are public declarations, not hidden procurement documents.",
    href: "/privacy",
    proofSource: "Backed by /privacy, /terms, and /support.",
    lastUpdatedLabel: trustSurfaceLastUpdatedLabel,
  },
  {
    id: "evidence-disclosure",
    title: "Security reporting path exists",
    statement:
      "Security intake is publicly named, documented, and mirrored in a machine-readable security.txt route so reporters do not need to guess where to go.",
    href: "/security/disclosure",
    proofSource:
      "Backed by /security/disclosure and /.well-known/security.txt.",
    lastUpdatedLabel: trustSurfaceLastUpdatedLabel,
  },
  {
    id: "evidence-boundaries",
    title: "Unsupported claims are withheld",
    statement:
      "Afenda publicly states which trust claims it does not make yet, including certifications, uptime guarantees, and unverified vendor disclosures.",
    href: "/trust",
    proofSource: "Backed by the boundaries section on /trust.",
    lastUpdatedLabel: trustSurfaceLastUpdatedLabel,
  },
  {
    id: "evidence-ownership",
    title: "Owner routes are explicit",
    statement:
      "Privacy, security, and support ownership are routed to named public mailboxes instead of ambiguous contact paths.",
    href: "/support",
    proofSource: "Backed by /support and the owner-route fields on /trust.",
    lastUpdatedLabel: trustSurfaceLastUpdatedLabel,
  },
] satisfies readonly TrustEvidenceItem[];

const trustSurfaceItems = [
  {
    id: "surface-trust",
    label: "Trust control surface",
    route: "/trust",
    state: "live",
    summary:
      "Canonical public assurance surface showing what is live, what is proven, and what remains withheld.",
    ownerRoute: publicTrustOwnerRoutes.support.value,
    proofSource: "This route is itself the public assurance control surface.",
    lastUpdatedLabel: trustSurfaceLastUpdatedLabel,
    isPublicLink: true,
  },
  {
    id: "surface-privacy",
    label: "Privacy notice",
    route: "/privacy",
    state: "live",
    summary:
      "Public privacy route covering data collection, use, disclosures, transfers, and contact paths.",
    ownerRoute: publicTrustOwnerRoutes.privacy.value,
    proofSource: "Privacy declaration is live and indexable.",
    lastUpdatedLabel: trustSurfaceLastUpdatedLabel,
    isPublicLink: true,
  },
  {
    id: "surface-terms",
    label: "Terms of use",
    route: "/terms",
    state: "live",
    summary:
      "Public commercial boundary describing service scope, responsibilities, and route usage posture.",
    ownerRoute: publicTrustOwnerRoutes.support.value,
    proofSource: "Terms declaration is live and indexable.",
    lastUpdatedLabel: trustSurfaceLastUpdatedLabel,
    isPublicLink: true,
  },
  {
    id: "surface-security",
    label: "Security posture",
    route: "/security",
    state: "live",
    summary:
      "High-level security posture covering infrastructure boundaries, access control, and trust routing.",
    ownerRoute: publicTrustOwnerRoutes.security.value,
    proofSource: "Security declaration is live and indexable.",
    lastUpdatedLabel: trustSurfaceLastUpdatedLabel,
    isPublicLink: true,
  },
  {
    id: "surface-disclosure",
    label: "Security disclosure",
    route: "/security/disclosure",
    state: "live",
    summary:
      "Formal vulnerability intake with scope, safe harbor, and report expectations.",
    ownerRoute: publicTrustOwnerRoutes.security.value,
    proofSource: "Disclosure route is live and linked from security posture.",
    lastUpdatedLabel: trustSurfaceLastUpdatedLabel,
    isPublicLink: true,
  },
  {
    id: "surface-security-txt",
    label: "security.txt",
    route: securityTxtHref,
    state: "live",
    summary:
      "Machine-readable disclosure entry so external reporters and tooling can reach the right route without guesswork.",
    ownerRoute: publicTrustOwnerRoutes.security.value,
    proofSource:
      "Generated from the same canonical route constants as the disclosure page.",
    lastUpdatedLabel: trustSurfaceLastUpdatedLabel,
    isPublicLink: true,
  },
  {
    id: "surface-support",
    label: "Support",
    route: "/support",
    state: "live",
    summary:
      "Public support and escalation route for operational follow-up and declaration ownership.",
    ownerRoute: publicTrustOwnerRoutes.support.value,
    proofSource: "Support route is live and indexable.",
    lastUpdatedLabel: trustSurfaceLastUpdatedLabel,
    isPublicLink: true,
  },
  {
    id: "surface-status",
    label: "Status",
    route: "/status",
    state: "planned",
    summary:
      "Will remain withheld until live monitoring, incident history, and maintenance publication are real.",
    ownerRoute: publicTrustOwnerRoutes.support.value,
    proofSource: "Planned with OpenStatus as the default backing system.",
    lastUpdatedLabel: trustSurfaceLastUpdatedLabel,
    isPublicLink: false,
    activationRuleId: "TRUST-STATUS-001",
  },
  {
    id: "surface-subprocessors",
    label: "Subprocessors",
    route: "/subprocessors",
    state: "withheld",
    summary:
      "Vendor transparency will remain withheld until service purpose, jurisdiction, and inventory are verified.",
    ownerRoute: publicTrustOwnerRoutes.privacy.value,
    proofSource: "Gated by TRUST-SUBPROC-001.",
    lastUpdatedLabel: trustSurfaceLastUpdatedLabel,
    isPublicLink: false,
    activationRuleId: "TRUST-SUBPROC-001",
  },
  {
    id: "surface-dpa",
    label: "Data processing addendum",
    route: "/data-processing-addendum",
    state: "withheld",
    summary:
      "DPA entry remains withheld until request handling and ownership are operationally real.",
    ownerRoute: publicTrustOwnerRoutes.privacy.value,
    proofSource: "Gated by TRUST-DPA-001.",
    lastUpdatedLabel: trustSurfaceLastUpdatedLabel,
    isPublicLink: false,
    activationRuleId: "TRUST-DPA-001",
  },
  {
    id: "surface-cookies",
    label: "Cookie notice",
    route: "/cookies",
    state: "withheld",
    summary:
      "Cookie notice remains withheld until non-essential cookies or tracking categories are confirmed.",
    ownerRoute: publicTrustOwnerRoutes.privacy.value,
    proofSource: "Gated by TRUST-COOKIE-001.",
    lastUpdatedLabel: trustSurfaceLastUpdatedLabel,
    isPublicLink: false,
    activationRuleId: "TRUST-COOKIE-001",
  },
] satisfies readonly TrustSurfaceItem[];

const trustCommitments = [
  {
    id: "commitment-disclosure",
    title: "Disclosure reports go to a named route",
    summary:
      "Security-sensitive reports do not depend on a generic contact form. They route directly to the public security mailbox and the disclosure route.",
    expectation:
      "Reporters should send enough context to reproduce the issue, understand the boundary, and assign the correct owner.",
    ownerRoute: publicTrustOwnerRoutes.security.value,
    href: "/security/disclosure",
  },
  {
    id: "commitment-ownership",
    title: "Owner routes stay explicit",
    summary:
      "Privacy, security, and support remain separate public routes so requests can be routed without losing business context.",
    expectation:
      "Afenda should route a request to the right mailbox rather than collapsing every issue into one generic queue.",
    ownerRoute: publicTrustOwnerRoutes.support.value,
    href: "/support",
  },
  {
    id: "commitment-negative-space",
    title: "Unsupported claims stay absent",
    summary:
      "Afenda would rather name a missing claim than imply one. Trust expands only where the operational backing already exists.",
    expectation:
      "No certification, SLA, or vendor claim should appear until the underlying source of truth exists.",
    ownerRoute: publicTrustOwnerRoutes.support.value,
    href: "/trust",
  },
  {
    id: "commitment-temporal",
    title: "Public trust is time-bound",
    summary:
      "Each live trust surface carries a freshness label so readers can tell when the public posture was last reviewed.",
    expectation:
      "Trust content should be updated deliberately and stale surfaces should be withheld rather than guessed.",
    ownerRoute: publicTrustOwnerRoutes.privacy.value,
    href: "/privacy",
  },
] satisfies readonly TrustCommitment[];

const trustBoundaryStatements = [
  {
    id: "boundary-soc2",
    title: "No SOC 2 certification claimed",
    detail:
      "Afenda does not currently claim external certification until that evidence exists and can be defended.",
  },
  {
    id: "boundary-sla",
    title: "No uptime SLA claimed",
    detail:
      "Afenda does not publish uptime promises or availability percentages before live status evidence and maintenance publication are in place.",
  },
  {
    id: "boundary-subprocessors",
    title: "No public subprocessor list until verified",
    detail:
      "Vendor transparency remains withheld until vendor purpose, region, and operating responsibility are confirmed.",
  },
  {
    id: "boundary-dpa",
    title: "No DPA self-service workflow until request handling exists",
    detail:
      "Afenda will not publish a contract-entry route that implies an operational path which does not yet exist.",
  },
] satisfies readonly TrustBoundaryStatement[];

const trustActivationRules = [
  {
    id: "TRUST-STATUS-001",
    surfaceLabel: "Status",
    route: "/status",
    requirements: [
      "A live monitoring source exists.",
      "Incident history is persisted.",
      "Maintenance events can be published.",
      "No hardcoded uptime percentages or fake availability claims exist.",
    ],
  },
  {
    id: "TRUST-SUBPROC-001",
    surfaceLabel: "Subprocessors",
    route: "/subprocessors",
    requirements: [
      "Vendor inventory is verified.",
      "Service purpose is defined.",
      "Region or jurisdiction is defined.",
    ],
  },
  {
    id: "TRUST-DPA-001",
    surfaceLabel: "Data processing addendum",
    route: "/data-processing-addendum",
    requirements: [
      "A request intake path exists.",
      "An owner route exists.",
      "A response handling path is defined.",
    ],
  },
  {
    id: "TRUST-COOKIE-001",
    surfaceLabel: "Cookie notice",
    route: "/cookies",
    requirements: [
      "Non-essential cookies or tracking actually exist.",
      "Categories and purpose are known.",
    ],
  },
  {
    id: "TRUST-CLAIM-001",
    surfaceLabel: "All trust surfaces",
    route: "/trust",
    requirements: [
      "No certification, SLA, compliance posture, or vendor fact is claimed without a real source of truth.",
      "Unsupported claims are withheld instead of implied.",
    ],
  },
] satisfies readonly TrustActivationRule[];

export const trustSurfaceDefinition = {
  eyebrow: "Canonical public assurance surface",
  title: "Trust",
  summary:
    "Afenda exposes public trust as bound operational truth: named routes, named owner paths, explicit evidence, and explicit boundaries.",
  description:
    "This surface shows what is publicly live, what is proven, what remains withheld, and which activation rules govern future trust pages.",
  doctrine:
    "Afenda does not present trust as claims. It exposes trust as verifiable, time-bound operational truth.",
  statusNote:
    "Only routes with real public backing are active. Planned and withheld routes are named here so their absence is explicit rather than implied away.",
  lastUpdatedLabel: trustSurfaceLastUpdatedLabel,
  currentPosture: trustPostureSignals,
  evidence: trustEvidenceItems,
  surfaces: trustSurfaceItems,
  commitments: trustCommitments,
  boundaries: trustBoundaryStatements,
  activationRules: trustActivationRules,
} satisfies TrustSurfaceDefinition;

export function buildTrustMetadata(): Metadata {
  return {
    title: "Trust",
    description:
      "Canonical public assurance surface for Afenda, covering current posture, evidence, commitments, boundaries, and trust-route activation doctrine.",
    alternates: {
      canonical: "/trust",
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: "Trust",
      description:
        "Canonical public assurance surface for Afenda, covering current posture, evidence, commitments, boundaries, and trust-route activation doctrine.",
      type: "website",
      url: "/trust",
    },
  };
}

