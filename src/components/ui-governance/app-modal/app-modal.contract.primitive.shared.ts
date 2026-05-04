/**
 * @afenda-owner app-modal
 * @afenda-subject contract
 * @afenda-artifact primitive
 * @afenda-boundary shared
 * @afenda-description Shared explicit primitive contract for app-modal client and manifest shared boundary
 */

export const appModalControlSourcePath =
  "@/components/ui-governance/app-modal/app-modal.control.primitive.client";

export const appModalSizeValues = ["md", "lg"] as const;
export type AppModalSize = (typeof appModalSizeValues)[number];

export const appModalPlacementValues = ["center", "top"] as const;
export type AppModalPlacement = (typeof appModalPlacementValues)[number];

export const appModalRequiredPropNames = ["children"] as const;

export const appModalOptionalPropNames = [
  "className",
  "defaultOpen",
  "id",
  "isDismissable",
  "isKeyboardDismissDisabled",
  "isOpen",
  "onOpenChange",
  "overlayClassName",
  "placement",
  "render",
  "shouldCloseOnInteractOutside",
  "size",
  "slot",
  "style",
  "viewportClassName",
] as const;

export const appModalReactAriaPrimitives = [
  "DialogTrigger",
  "ModalOverlay",
  "Modal",
] as const;

export const appModalCompositionContract = {
  requiresChildren: true,
  requiredElements: ["Dialog or explicit blocking overlay content children"],
  optionalElements: ["AppDialogTrigger"],
  notes: [
    "AppModal owns the blocking overlay shell, viewport placement, and modal panel treatment for governed workflow interruptions.",
    "Use AppDialogTrigger when the modal is opened by a local pressable trigger; use controlled isOpen flows when an external workflow decides visibility.",
    "Modal children should supply dialog semantics and close actions explicitly so blocking interactions remain traceable and legible.",
  ],
} as const;

export const appModalTokenContract = {
  semanticColors: [
    "--color-border-strong",
    "--color-foreground",
    "--color-surface-raised",
  ] as const,
  radii: ["--radius-panel"] as const,
  typography: ["--text-body"] as const,
} as const;
