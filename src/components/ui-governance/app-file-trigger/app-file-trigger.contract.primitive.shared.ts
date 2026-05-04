/**
 * @afenda-owner app-file-trigger
 * @afenda-subject contract
 * @afenda-artifact primitive
 * @afenda-boundary shared
 * @afenda-description Shared explicit primitive contract for app-file-trigger client and manifest shared boundary
 */

export const appFileTriggerControlSourcePath =
  "@/components/ui-governance/app-file-trigger/app-file-trigger.control.primitive.client";

export const appFileTriggerLayoutValues = ["inline", "block"] as const;
export type AppFileTriggerLayout = (typeof appFileTriggerLayoutValues)[number];

export const appFileTriggerRequiredPropNames = ["children"] as const;

export const appFileTriggerOptionalPropNames = [
  "acceptDirectory",
  "acceptedFileTypes",
  "allowsMultiple",
  "containerClassName",
  "defaultCamera",
  "layout",
  "onSelect",
  "render",
  "slot",
  "style",
] as const;

export const appFileTriggerReactAriaPrimitives = ["FileTrigger"] as const;

export const appFileTriggerCompositionContract = {
  requiresChildren: true,
  requiredElements: ["Exactly one pressable direct child"],
  optionalElements: ["AppButton", "Pressable", "custom pressable child that forwards props and ref"],
  notes: [
    "Keep the single trigger surface explicit so product flows can choose the right trigger label and action semantics locally.",
    "The direct child must be a pressable element or component that forwards React Aria props and ref to a DOM element.",
    "FileTrigger does not own a visual control; layout styling belongs to this primitive's explicit wrapper container.",
  ],
} as const;

export const appFileTriggerTokenContract = {
  semanticColors: [] as const,
  radii: [] as const,
  typography: [] as const,
} as const;
