/**
 * @afenda-owner app-toast
 * @afenda-subject contract
 * @afenda-artifact primitive
 * @afenda-boundary shared
 * @afenda-description Shared explicit primitive contract for app-toast client and manifest shared boundary
 */

/** Payload passed to `appToastQueue.add()` for governed product toasts. */
export interface AppToastContentPayload {
  title: string;
  description?: string;
}

export const appToastControlSourcePath =
  "@/components/ui-governance/app-toast/app-toast.control.primitive.client";

export const appToastRequiredPropNames = [] as const;

export const appToastOptionalPropNames = [
  "className",
  "queue",
  "toastClassName",
] as const;

export const appToastReactAriaPrimitives = [
  "ToastRegion",
  "Toast",
  "ToastContent",
  "Text",
  "Button",
] as const;

export const appToastCompositionContract = {
  requiresChildren: false,
  requiredElements: [] as const,
  optionalElements: [
    "internal Toast per queued item",
    "internal ToastContent",
    "internal Text title and description slots",
    "internal AppButton slot=\"close\"",
  ],
  notes: [
    "React Aria still exports toast primitives under UNSTABLE_* names; AppToastRegion wraps them behind the governed boundary.",
    "Mount AppToastRegion once near the document root; call appToastQueue.add from client code for operator feedback.",
    "Prefer a minimum timeout of 5s when using auto-dismiss, and only for non-critical messages.",
  ],
} as const;

export const appToastTokenContract = {
  semanticColors: [
    "--color-accent",
    "--color-accent-foreground",
    "--color-border",
    "--color-foreground",
    "--color-foreground-muted",
    "--color-surface-raised",
  ] as const,
  radii: ["--radius-control", "--radius-lg"] as const,
  typography: ["--text-body-sm", "--text-label", "--text-meta"] as const,
} as const;
