/**
 * @afenda-owner app-autocomplete
 * @afenda-subject contract
 * @afenda-artifact primitive
 * @afenda-boundary shared
 * @afenda-description Shared explicit primitive contract for app-autocomplete client and manifest shared boundary
 */

export const appAutocompleteControlSourcePath =
  "@/components/ui-governance/app-autocomplete/app-autocomplete.control.primitive.client";

export const appAutocompleteRequiredPropNames = ["children"] as const;

export const appAutocompleteOptionalPropNames = ["className", "defaultInputValue", "disableAutoFocusFirst", "disableVirtualFocus", "filter", "inputValue", "onInputChange", "render", "slot", "style"] as const;

export const appAutocompleteReactAriaPrimitives = ["Autocomplete", "SearchField", "TextField", "Menu", "ListBox", "TagGroup", "GridList", "Table"] as const;

export const appAutocompleteCompositionContract = {
  requiresChildren: true,
  requiredElements: ["SearchField|TextField as a direct child", "Menu|ListBox|TagGroup|GridList|Table as a direct child"],
  optionalElements: ["Section", "Header", "Text"],
  notes: ["Keep the input primitive and filterable collection explicit at the canonical boundary.", "Prefer AppSearchAutocomplete when the ERP-specific search wrapper is the better fit."],
} as const;

export const appAutocompleteTokenContract = {
  semanticColors: [] as const,
  radii: [] as const,
  typography: [] as const,
} as const;
