/**
 * @afenda-owner app-virtualizer
 * @afenda-subject contract
 * @afenda-artifact primitive
 * @afenda-boundary shared
 * @afenda-description Shared explicit primitive contract for app-virtualizer client and manifest shared boundary
 */

export const appVirtualizerControlSourcePath =
  "@/components/ui-governance/app-virtualizer/app-virtualizer.control.primitive.client";

export const appVirtualizerApprovedLayoutNames = [
  "ListLayout",
  "GridLayout",
  "WaterfallLayout",
  "TableLayout",
] as const;

export const appVirtualizerLayoutKindValues = [
  "list",
  "grid",
  "waterfall",
  "table",
  "custom",
] as const;

export const appVirtualizerRequiredPropNames = ["children", "layout"] as const;

export const appVirtualizerOptionalPropNames = ["layoutOptions"] as const;

export const appVirtualizerReactAriaPrimitives = [
  "Virtualizer",
  "ListLayout",
  "GridLayout",
  "WaterfallLayout",
  "TableLayout",
] as const;

export const appVirtualizerCompositionContract = {
  requiresChildren: true,
  requiredElements: [
    "Exactly one direct child: AppListBox, AppGridList, or AppTable",
  ],
  optionalElements: [],
  notes: [
    "AppVirtualizer makes windowed rendering explicit for dense operator collections where DOM cost matters.",
    "The child collection owns accessible naming, selection semantics, and interaction behavior; AppVirtualizer only governs layout virtualization.",
    "Pair ListLayout with AppListBox, GridLayout or WaterfallLayout with AppGridList, and TableLayout with AppTable.",
    "Keep the virtualized collection child block-styled with explicit dimensions so scrolling and measurement remain predictable.",
  ],
} as const;

export const appVirtualizerTokenContract = {
  semanticColors: [] as const,
  radii: [] as const,
  typography: [] as const,
} as const;
