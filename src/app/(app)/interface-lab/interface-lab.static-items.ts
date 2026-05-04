/**
 * @afenda-owner interface-lab
 * @afenda-subject static-catalog
 * @afenda-boundary shared
 * @afenda-description Curated Interface Lab entries outside the ui governance component registry.
 */
import type { InterfaceLabItem } from "./interface-lab.types";

export const interfaceLabStaticItems: InterfaceLabItem[] = [
  {
    slug: "approval-dialog",
    title: "Approval Dialog",
    description:
      "Decision dialog for approve, reject, hold, and request-change workflows.",
    section: "blocks",
    status: "approved",
    category: "Decision",
    tags: ["approval", "dialog", "workflow"],
    studio: {
      templateKind: "block",
      operatorValue:
        "Keeps high-risk decision paths explicit, reversible, and reason-bound for operators.",
      remixPrompts: [
        "Remix as a mobile decision sheet with compact rationale capture.",
        "Compare optimistic, blocked, and escalation states side by side.",
      ],
      canvasPreset: "Modal overlay / focused desktop",
      properties: {
        viewport: "Desktop overlay + mobile sheet",
        density: "Focused",
        motion: "Subtle entrance and confirmation transitions",
        dataState: "Decision-ready",
        tokenUsage: "Surface, border, text, and signal tokens",
        source: "Curated block template",
        exportReadiness: "Ready for React block, spec, and prototype export",
      },
      exportTargets: ["React block", "Prototype link", "Design spec"],
      anatomy: [
        "Decision summary and impacted record identity",
        "Reason capture for reject or request-change paths",
        "Explicit action row for approve, hold, and reject",
      ],
      evidence: [
        "Decision copy stays tied to workflow state",
        "Destructive choices require visible rationale capture",
      ],
    },
  },
  {
    slug: "procurement-approval-queue",
    title: "Approval Queue Console",
    description:
      "Approval queue template for reviewing requests, evidence, and state transitions.",
    section: "erp-patterns",
    status: "candidate",
    category: "Approval Flow",
    tags: ["approval", "queue", "evidence"],
    studio: {
      templateKind: "pattern",
      operatorValue:
        "Compresses approval throughput by keeping queue state, evidence, and next action in one surface.",
      remixPrompts: [
        "Remix as a split-view review console with sticky properties.",
        "Generate empty, overdue, and high-risk queue variants.",
      ],
      canvasPreset: "Split command workspace",
      properties: {
        viewport: "Desktop first, tablet review mode",
        density: "Dense",
        motion: "State transitions only",
        dataState: "Mixed queue with exceptions",
        tokenUsage: "Surface, muted surface, border, text, and warning signals",
        source: "Curated pattern template",
        exportReadiness: "Needs compare pass before export",
      },
      exportTargets: ["Prototype link", "State sheet", "Design spec"],
      anatomy: [
        "Queue table with status and amount risk cues",
        "Evidence lane for documents and exceptions",
        "Decision workspace for approve, reject, and follow-up",
      ],
      evidence: [
        "Traceable request-to-decision history",
        "Exception handling remains visible before approval commits",
      ],
    },
  },
  {
    slug: "truth-engine-hero",
    title: "Truth Engine Hero",
    description:
      "Editorial landing hero for explaining Afenda as an operational truth engine.",
    section: "landing",
    status: "candidate",
    category: "Hero",
    tags: ["landing", "editorial", "truth-engine"],
    studio: {
      templateKind: "screen",
      operatorValue:
        "Introduces Afenda's operating model quickly before deeper workflow navigation.",
      remixPrompts: [
        "Remix as an immersive first-viewport product story.",
        "Compare editorial, product-led, and command-led openings.",
      ],
      canvasPreset: "Responsive narrative screen",
      properties: {
        viewport: "Desktop + mobile",
        density: "Open",
        motion: "Ambient scroll reveal",
        dataState: "Static narrative",
        tokenUsage: "Background, surface, text, border, and accent signal tokens",
        source: "Curated screen template",
        exportReadiness: "Prototype-ready, content pass pending",
      },
      exportTargets: ["Prototype link", "Screen spec", "Copy deck"],
      anatomy: [
        "Identity headline anchored in product language",
        "Outcome summary with traceability emphasis",
        "Action lane into product and workflow surfaces",
      ],
      evidence: ["Message stays aligned with product truth and review safety"],
    },
  },
  {
    slug: "operations-command-dashboard",
    title: "Operations Command Dashboard",
    description:
      "Dense command dashboard for operational visibility and exception handling.",
    section: "dashboard",
    status: "experimental",
    category: "Operations",
    tags: ["dashboard", "command", "operations"],
    studio: {
      templateKind: "screen",
      operatorValue:
        "Reduces scanning cost by putting backlog health, alerts, and next interventions in a single command surface.",
      remixPrompts: [
        "Remix as a Figma Make-style command surface with floating canvas controls.",
        "Generate mobile, tablet, and desktop artboard variants.",
      ],
      canvasPreset: "Command dashboard artboard",
      properties: {
        viewport: "Desktop command center",
        density: "Dense",
        motion: "Live-state emphasis without decorative motion",
        dataState: "Alert-heavy sample data",
        tokenUsage: "Surface, muted surface, border, text, success, and warning signals",
        source: "Curated screen template",
        exportReadiness: "Prototype-only until compare pass completes",
      },
      exportTargets: ["Prototype link", "Design spec", "React screen"],
      anatomy: [
        "KPI strip for throughput, risk, and overdue work",
        "Exception lane for high-priority interventions",
        "Backlog table with drill-down affordances",
      ],
      evidence: [
        "Dashboard prioritizes mutable operational data over decorative reporting",
        "Alert state stays visible alongside next-action context",
      ],
    },
  },
];
