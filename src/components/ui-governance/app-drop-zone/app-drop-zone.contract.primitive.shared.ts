/**
 * @afenda-owner app-drop-zone
 * @afenda-subject contract
 * @afenda-artifact primitive
 * @afenda-boundary shared
 * @afenda-description Shared explicit primitive contract for app-drop-zone client and manifest shared boundary
 */

export const appDropZoneControlSourcePath =
  "@/components/ui-governance/app-drop-zone/app-drop-zone.control.primitive.client";

export const appDropZoneSizeValues = ["md", "sm"] as const;

export type AppDropZoneSize = (typeof appDropZoneSizeValues)[number];

export const appDropZoneRequiredPropNames = [] as const;

export const appDropZoneOptionalPropNames = [
  "aria-describedby",
  "aria-details",
  "aria-label",
  "aria-labelledby",
  "children",
  "className",
  "contentClassName",
  "description",
  "descriptionClassName",
  "getDropOperation",
  "isDisabled",
  "label",
  "labelClassName",
  "onDrop",
  "onDropActivate",
  "onDropEnter",
  "onDropExit",
  "onDropMove",
  "onHoverChange",
  "onHoverEnd",
  "onHoverStart",
  "size",
  "slot",
] as const;

export const appDropZoneReactAriaPrimitives = ["DropZone", "Text"] as const;

export const appDropZoneCompositionContract = {
  requiresChildren: false,
  requiredElements: [],
  optionalElements: ["internal Text slot='label'", "optional custom preview content"],
  notes: [
    "AppDropZone owns the governed drop surface and visible label structure so drag-and-drop affordances stay consistent across ERP upload and intake workflows.",
    "Provide label, aria-label, or aria-labelledby so the drop target has an explicit accessible name.",
    "Use children for custom preview or drop-state content rather than composing raw React Aria Text at the feature boundary.",
  ],
} as const;

export const appDropZoneTokenContract = {
  semanticColors: [
    "--color-accent",
    "--color-border",
    "--color-border-strong",
    "--color-field",
    "--color-field-hover",
    "--color-foreground",
    "--color-foreground-muted",
    "--color-surface-raised",
  ] as const,
  radii: ["--radius-control"] as const,
  typography: ["--text-body-sm", "--text-label", "--text-meta"] as const,
} as const;
