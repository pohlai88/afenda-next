/**
 * @afenda-owner app-tooltip
 * @afenda-subject contract
 * @afenda-artifact primitive
 * @afenda-boundary shared
 * @afenda-description Shared explicit primitive contract for app-tooltip client and manifest shared boundary
 */

export const appTooltipControlSourcePath =
  "@/components/ui-governance/app-tooltip/app-tooltip.control.primitive.client";

export const appTooltipSizeValues = ["sm", "md"] as const;
export type AppTooltipSize = (typeof appTooltipSizeValues)[number];

export const appTooltipRequiredPropNames = ["children"] as const;

export const appTooltipOptionalPropNames = [
  "UNSTABLE_portalContainer",
  "arrowBoundaryOffset",
  "className",
  "containerPadding",
  "crossOffset",
  "defaultOpen",
  "isEntering",
  "isExiting",
  "isOpen",
  "offset",
  "onOpenChange",
  "placement",
  "render",
  "shouldFlip",
  "size",
  "slot",
  "style",
  "triggerRef",
] as const;

export const appTooltipReactAriaPrimitives = [
  "Tooltip",
  "OverlayArrow",
  "TooltipTrigger",
] as const;

export const appTooltipCompositionContract = {
  requiresChildren: true,
  requiredElements: ["Tooltip body text or elements inside AppTooltip"],
  optionalElements: ["internal OverlayArrow with SVG"],
  notes: [
    "Use AppTooltipTrigger to pair a focusable trigger with AppTooltip; keep critical UX usable without hover (touch does not show tooltips).",
    "AppTooltip includes an arrow and default offset so overlays match React Aria tooltip guidance without importing RAC Tooltip directly.",
  ],
} as const;

export const appTooltipTokenContract = {
  semanticColors: [
    "--color-border-strong",
    "--color-foreground",
    "--color-surface-raised",
  ] as const,
  radii: ["--radius-control"] as const,
  typography: ["--text-meta"] as const,
} as const;
