/**
 * @afenda-owner app-search-autocomplete
 * @afenda-subject contract
 * @afenda-artifact primitive
 * @afenda-boundary shared
 * @afenda-description Shared explicit primitive contract for app-search-autocomplete client and manifest shared boundary
 */

export const appSearchAutocompleteControlSourcePath =
  "@/components/ui-governance/app-search-autocomplete/app-search-autocomplete.control.primitive.client";

export const appSearchAutocompleteLayoutValues = ["stack", "inline"] as const;
export type AppSearchAutocompleteLayout =
  (typeof appSearchAutocompleteLayoutValues)[number];

export const appSearchAutocompleteDensityValues = [
  "default",
  "compact",
] as const;
export type AppSearchAutocompleteDensity =
  (typeof appSearchAutocompleteDensityValues)[number];

export const appSearchAutocompleteRequiredPropNames = ["children"] as const;

export const appSearchAutocompleteOptionalPropNames = [
  "containerClassName",
  "layout",
  "density",
  "filter",
  "inputValue",
  "defaultInputValue",
  "onInputChange",
  "disableAutoFocusFirst",
  "disableVirtualFocus",
] as const;

export const appSearchAutocompleteReactAriaPrimitives = [
  "Autocomplete",
  "SearchField",
  "TextField",
  "Menu",
  "ListBox",
  "GridList",
  "Table",
  "TagGroup",
] as const;

export const appSearchAutocompleteCompositionContract = {
  requiresChildren: true,
  requiredElements: [
    "SearchField|TextField as first direct child",
    "Menu|ListBox|TagGroup|GridList|Table as second direct child",
  ],
  optionalElements: ["Section", "Header", "Text"],
  notes: [
    "Compose exactly two direct children: one input child and one filterable collection child.",
    "Keep collection ownership in the caller so dense ERP lookup flows can control local or async filtering explicitly.",
    "Autocomplete does not render its own DOM container; layout styling belongs to this primitive's explicit wrapper container.",
  ],
} as const;

export const appSearchAutocompleteTokenContract = {
  semanticColors: [] as const,
  radii: [] as const,
  typography: ["--text-body", "--text-label"] as const,
} as const;
