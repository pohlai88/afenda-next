/**
 * @afenda-owner app-toggle-button
 * @afenda-subject contract
 * @afenda-artifact primitive
 * @afenda-boundary shared
 * @afenda-description Shared explicit primitive contract for app-toggle-button client and manifest shared boundary
 */

export const appToggleButtonControlSourcePath =
  "@/components/ui-governance/app-toggle-button/app-toggle-button.control.primitive.client";

export const appToggleButtonRequiredPropNames = [] as const;

export const appToggleButtonOptionalPropNames = ["children", "className", "defaultSelected", "id", "isDisabled", "isSelected", "onChange", "render", "slot", "style"] as const;

export const appToggleButtonReactAriaPrimitives = ["ToggleButton"] as const;

export const appToggleButtonCompositionContract = {
  requiresChildren: false,
  requiredElements: [],
  optionalElements: [],
  notes: ["Thin canonical wrapper over React Aria. Prefer this App* boundary over shared direct imports of react-aria-components."],
} as const;

export const appToggleButtonTokenContract = {
  semanticColors: [] as const,
  radii: [] as const,
  typography: [] as const,
} as const;
