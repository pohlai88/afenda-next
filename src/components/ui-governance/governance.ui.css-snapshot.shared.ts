/**
 * AUTO-GENERATED FILE.
 * Derived from src/styles/globals.css.
 * DO NOT EDIT MANUALLY.
 *
 * If this file is wrong, fix the CSS extractor (scripts/extract-ui-css-snapshot.mjs) or globals.css (and afenda.tokens.css when used).
 *
 * @afenda-owner governance
 * @afenda-subject ui
 * @afenda-artifact css-snapshot
 * @afenda-boundary shared
 * @afenda-description Shared derived snapshot of semantic CSS variables for governance guard evidence
 *
 * @see ./governance.ui.registry.shared.ts
 */

export const UI_CSS_GENERATION_SOURCE = "src/styles/globals.css" as const;

export const uiCssGenerated = {
  generationSource: UI_CSS_GENERATION_SOURCE,
  tokens: {
    semanticColors: [
      "--color-accent",
      "--color-accent-foreground",
      "--color-accent-ring",
      "--color-accent-soft",
      "--color-accent-strong",
      "--color-background",
      "--color-border",
      "--color-border-strong",
      "--color-brand-gradient-from",
      "--color-brand-gradient-to",
      "--color-card",
      "--color-card-foreground",
      "--color-chart-1",
      "--color-chart-2",
      "--color-chart-3",
      "--color-chart-4",
      "--color-chart-5",
      "--color-danger",
      "--color-danger-foreground",
      "--color-danger-ring",
      "--color-danger-soft",
      "--color-danger-strong",
      "--color-destructive",
      "--color-destructive-foreground",
      "--color-field",
      "--color-field-hover",
      "--color-field-strong",
      "--color-foreground",
      "--color-foreground-muted",
      "--color-foreground-subtle",
      "--color-info",
      "--color-info-foreground",
      "--color-info-soft",
      "--color-info-strong",
      "--color-input",
      "--color-muted",
      "--color-muted-foreground",
      "--color-overlay",
      "--color-popover",
      "--color-popover-foreground",
      "--color-primary",
      "--color-primary-foreground",
      "--color-ring",
      "--color-ring-offset",
      "--color-secondary",
      "--color-secondary-foreground",
      "--color-success",
      "--color-success-foreground",
      "--color-success-soft",
      "--color-success-strong",
      "--color-surface",
      "--color-surface-muted",
      "--color-surface-raised",
      "--color-verified",
      "--color-verified-foreground",
      "--color-verified-soft",
      "--color-verified-strong",
      "--color-warning",
      "--color-warning-foreground",
      "--color-warning-soft",
      "--color-warning-strong"
    ] as const,
    radii: [
      "--radius-control",
      "--radius-lg",
      "--radius-md",
      "--radius-panel",
      "--radius-sm",
      "--radius-xl"
    ] as const,
    typography: [
      "--text-body",
      "--text-body--line-height",
      "--text-body-sm",
      "--text-body-sm--line-height",
      "--text-caption",
      "--text-caption--line-height",
      "--text-display",
      "--text-display--line-height",
      "--text-label",
      "--text-label--line-height",
      "--text-meta",
      "--text-meta--line-height",
      "--text-panel-title",
      "--text-panel-title--line-height",
      "--text-section-title",
      "--text-section-title--line-height"
    ] as const,
  },
  utilities: [] as const,
  componentClasses: [] as const,
} as const;

export type UiCssGeneratedSnapshot = typeof uiCssGenerated;
export type UiSemanticColorToken =
  (typeof uiCssGenerated.tokens.semanticColors)[number];
export type UiRadiusToken = (typeof uiCssGenerated.tokens.radii)[number];
export type UiTypographyToken = (typeof uiCssGenerated.tokens.typography)[number];

const semanticColorSet = new Set(uiCssGenerated.tokens.semanticColors);
const radiusSet = new Set(uiCssGenerated.tokens.radii);
const typographySet = new Set(uiCssGenerated.tokens.typography);

export function isKnownUiSemanticColorToken(
  token: string,
): token is UiSemanticColorToken {
  return semanticColorSet.has(token as UiSemanticColorToken);
}

export function isKnownUiRadiusToken(token: string): token is UiRadiusToken {
  return radiusSet.has(token as UiRadiusToken);
}

export function isKnownUiTypographyToken(
  token: string,
): token is UiTypographyToken {
  return typographySet.has(token as UiTypographyToken);
}
