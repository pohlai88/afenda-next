/**
 * @afenda-owner repo
 * @afenda-subject ui-css-snapshot
 * @afenda-artifact automation
 * @afenda-boundary automation
 * @afenda-description Derives governance CSS snapshot from globals.css (no hand-maintained token lists)
 *
 * Rule:
 * - globals.css = required human source
 * - afenda.tokens.css = optional second source (@theme extensions, etc.) when present
 * - this script = generator
 * - governance.ui.css-snapshot.shared.ts = generated evidence
 * - governance.ui.guard.shared.ts = checks evidence exists (presence only today)
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const sourcePath = path.join(repoRoot, "src", "styles", "globals.css");
const tokensPath = path.join(repoRoot, "src", "styles", "afenda.tokens.css");
const outputPath = path.join(
  repoRoot,
  "src",
  "components",
  "ui-governance",
  "governance.ui.css-snapshot.shared.ts",
);

const cssParts = [readFileSync(sourcePath, "utf8")];
if (existsSync(tokensPath)) {
  cssParts.push(readFileSync(tokensPath, "utf8"));
}
const css = cssParts.join("\n");

function extractCssVars(prefix) {
  const pattern = new RegExp(`(${prefix}[a-zA-Z0-9-_]+)\\s*:`, "g");
  return [...new Set([...css.matchAll(pattern)].map((m) => m[1]))].sort();
}

const semanticColors = extractCssVars("--color-");
const radii = extractCssVars("--radius-");
const typography = extractCssVars("--text-");

function formatConstArray(values, indent) {
  if (values.length === 0) {
    return "[]";
  }
  const lineIndent = " ".repeat(indent);
  const closingIndent = " ".repeat(indent - 2);
  return `[\n${values.map((value) => `${lineIndent}"${value}"`).join(",\n")}\n${closingIndent}]`;
}

const relSource = path.relative(repoRoot, sourcePath).replaceAll("\\", "/");
const relTokens = path.relative(repoRoot, tokensPath).replaceAll("\\", "/");
const relOutput = path.relative(repoRoot, outputPath).replaceAll("\\", "/");
const derivedFrom = existsSync(tokensPath)
  ? `${relSource} + ${relTokens}`
  : relSource;

const output = `/**
 * AUTO-GENERATED FILE.
 * Derived from ${derivedFrom}.
 * DO NOT EDIT MANUALLY.
 *
 * If this file is wrong, fix the CSS extractor (${path.relative(repoRoot, fileURLToPath(import.meta.url)).replaceAll("\\", "/")}) or globals.css (and afenda.tokens.css when used).
 *
 * @afenda-owner governance
 * @afenda-subject ui
 * @afenda-artifact css-snapshot
 * @afenda-boundary shared
 * @afenda-description Shared derived snapshot of semantic CSS variables for governance guard evidence
 *
 * @see ./governance.ui.registry.shared.ts
 */

export const UI_CSS_GENERATION_SOURCE = "${relSource}" as const;

export const uiCssGenerated = {
  generationSource: UI_CSS_GENERATION_SOURCE,
  tokens: {
    semanticColors: ${formatConstArray(semanticColors, 6)} as const,
    radii: ${formatConstArray(radii, 6)} as const,
    typography: ${formatConstArray(typography, 6)} as const,
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
`;

writeFileSync(outputPath, output);
console.log(`Generated ${relOutput} (${semanticColors.length} colors, ${radii.length} radii, ${typography.length} typography tokens)`);
