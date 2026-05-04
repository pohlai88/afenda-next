/**
 * @afenda-owner app-popover
 * @afenda-subject contract
 * @afenda-artifact primitive
 * @afenda-boundary shared
 * @afenda-description Shared explicit primitive contract for app-popover client and manifest shared boundary
 */

export const appPopoverControlSourcePath =
  "@/components/ui-governance/app-popover/app-popover.control.primitive.client";

export const appPopoverRequiredPropNames = ["children"] as const;

export const appPopoverOptionalPropNames = [
  "UNSTABLE_portalContainer",
  "aria-describedby",
  "aria-details",
  "aria-label",
  "aria-labelledby",
  "arrowBoundaryOffset",
  "arrowClassName",
  "arrowRef",
  "boundaryElement",
  "className",
  "containerPadding",
  "crossOffset",
  "defaultOpen",
  "id",
  "isKeyboardDismissDisabled",
  "isNonModal",
  "isOpen",
  "maxHeight",
  "offset",
  "onOpenChange",
  "placement",
  "render",
  "scrollRef",
  "shouldCloseOnInteractOutside",
  "shouldFlip",
  "shouldUpdatePosition",
  "showArrow",
  "slot",
  "style",
  "trigger",
  "triggerRef",
] as const;

export const appPopoverReactAriaPrimitives = [
  "DialogTrigger",
  "Popover",
  "OverlayArrow",
] as const;

export const appPopoverCompositionContract = {
  requiresChildren: true,
  requiredElements: ["Overlay content children"],
  optionalElements: ["AppPopoverTrigger", "OverlayArrow"],
  notes: [
    "AppPopover owns the anchored overlay shell, optional arrow, and trigger-aware padding treatment for contextual overlay content.",
    "Use AppPopoverTrigger when the popover is opened by a local pressable trigger; use triggerRef and controlled isOpen when anchoring to another element.",
    "Prefer AppPopover for lightweight contextual controls and supporting information, and keep blocking flows on AppModal instead.",
  ],
} as const;

export const appPopoverTokenContract = {
  semanticColors: [
    "--color-border",
    "--color-foreground",
    "--color-surface-raised",
  ] as const,
  radii: ["--radius-panel"] as const,
  typography: ["--text-body"] as const,
} as const;
