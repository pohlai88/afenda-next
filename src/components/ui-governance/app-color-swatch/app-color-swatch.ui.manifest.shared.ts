/**
 * @afenda-owner app-color-swatch
 * @afenda-subject ui
 * @afenda-artifact manifest
 * @afenda-boundary shared
 * @afenda-description Shared manifest entry for AppColorSwatch ui governance
 */
import { defineApprovedComponentManifest } from "../governance.ui.manifest.shared";
import {
  appColorSwatchCompositionContract,
  appColorSwatchControlSourcePath,
  appColorSwatchOptionalPropNames,
  appColorSwatchReactAriaPrimitives,
  appColorSwatchRequiredPropNames,
  appColorSwatchTokenContract,
} from "./app-color-swatch.contract.primitive.shared";

export const appColorSwatchManifest = defineApprovedComponentManifest({
  id: "app-color-swatch",
  owner: "components",
  exportName: "AppColorSwatch",
  status: "approved",

  category: "component",
  boundary: "client",

  sourcePath: appColorSwatchControlSourcePath,

  styleSources: [
    {
      exportName: "appColorSwatchVariants",
      sourcePath: appColorSwatchControlSourcePath,
      type: "cva",
    },
  ],
  reactAriaPrimitives: [...appColorSwatchReactAriaPrimitives],
  cva: {
    appColorSwatchVariants: {
      required: true,
      variants: {
        size: {
          values: ["sm", "md", "lg"],
          default: "md",
          required: false,
        },
      },
    },
  },

  props: {
    required: [...appColorSwatchRequiredPropNames],
    optional: [...appColorSwatchOptionalPropNames],
  },

  composition: {
    requiresChildren: appColorSwatchCompositionContract.requiresChildren,
    requiredElements: [...appColorSwatchCompositionContract.requiredElements],
    optionalElements: [...appColorSwatchCompositionContract.optionalElements],
    notes: [...appColorSwatchCompositionContract.notes],
  },

  a11y: {
    required: true,
    notes: [
      "React Aria supplies a localized color description by default, and colorName plus aria-label can refine that announcement for ERP workflows.",
      "Use aria-label when the swatch needs explicit business context such as fill color, status color, or brand color.",
    ],
  },

  usage: {
    useWhen: [
      "Use AppColorSwatch for governed color previews in pickers, color review rows, and other shared color-selection surfaces.",
    ],
    avoidWhen: [
      "Do not use AppColorSwatch as a generic decorative badge when no color workflow meaning is present.",
    ],
  },

  tokens: {
    semanticColors: [...appColorSwatchTokenContract.semanticColors],
    radii: [...appColorSwatchTokenContract.radii],
    typography: [...appColorSwatchTokenContract.typography],
  },

  constraints: [
    "This primitive owns the checkerboard-backed preview treatment instead of leaving color-preview rendering to feature code.",
    "Feature UI should consume AppColorSwatch instead of importing react-aria-components ColorSwatch directly when the pattern is shared.",
  ],

  verdict: {
    cvaCoverage: "verified",
    a11yCoverage: "verified",
    usageCoverage: "verified",
    sourceCoverage: "verified",
  },
});
