/**
 * @afenda-owner app-color-area
 * @afenda-subject ui
 * @afenda-artifact manifest
 * @afenda-boundary shared
 * @afenda-description Shared manifest entry for AppColorArea ui governance
 */
import { defineApprovedComponentManifest } from "../governance.ui.manifest.shared";
import {
  appColorAreaCompositionContract,
  appColorAreaControlSourcePath,
  appColorAreaOptionalPropNames,
  appColorAreaReactAriaPrimitives,
  appColorAreaRequiredPropNames,
  appColorAreaSizeValues,
  appColorAreaTokenContract,
} from "./app-color-area.contract.primitive.shared";

export const appColorAreaManifest = defineApprovedComponentManifest({
  id: "app-color-area",
  owner: "components",
  exportName: "AppColorArea",
  status: "approved",

  category: "component",
  boundary: "client",

  sourcePath: appColorAreaControlSourcePath,

  styleSources: [
    {
      type: "cva",
      sourcePath:
        "@/components/ui-governance/app-color-area/app-color-area.control.primitive.client",
      exportName: "appColorAreaVariants",
    },
    {
      type: "cva",
      sourcePath:
        "@/components/ui-governance/app-color-area/app-color-area.control.primitive.client",
      exportName: "appColorAreaThumbVariants",
    },
  ],
  reactAriaPrimitives: [...appColorAreaReactAriaPrimitives],
  cva: {
    appColorAreaVariants: {
      required: true,
      variants: {
        size: {
          values: [...appColorAreaSizeValues],
          default: "md",
          required: false,
        },
        disabled: {
          values: ["true", "false"],
          default: "false",
          required: false,
        },
      },
    },
    appColorAreaThumbVariants: {
      required: true,
      variants: {
        focusVisible: {
          values: ["true", "false"],
          default: "false",
          required: false,
        },
        dragging: {
          values: ["true", "false"],
          default: "false",
          required: false,
        },
        disabled: {
          values: ["true", "false"],
          default: "false",
          required: false,
        },
      },
    },
  },

  props: {
    required: [...appColorAreaRequiredPropNames],
    optional: [...appColorAreaOptionalPropNames],
  },

  composition: {
    requiresChildren: appColorAreaCompositionContract.requiresChildren,
    requiredElements: [...appColorAreaCompositionContract.requiredElements],
    optionalElements: [...appColorAreaCompositionContract.optionalElements],
    notes: [...appColorAreaCompositionContract.notes],
  },

  a11y: {
    required: true,
    notes: [
      "AppColorArea preserves React Aria keyboard and pointer interaction for two-axis color editing.",
      "The primitive requires an accessible name via aria-label or aria-labelledby.",
      "The internal ColorThumb remains presentational and is owned by the primitive, not by feature code.",
    ],
  },

  usage: {
    useWhen: [
      "Use AppColorArea when operators must adjust two explicit color channels on a governed color surface.",
    ],
    avoidWhen: [
      "Do not use AppColorArea when a simple color swatch or one-axis color control is sufficient.",
    ],
  },

  tokens: {
    semanticColors: [...appColorAreaTokenContract.semanticColors],
    radii: [...appColorAreaTokenContract.radii],
    typography: [...appColorAreaTokenContract.typography],
  },

  constraints: [
    "AppColorArea owns its internal ColorThumb so feature code does not recompose the widget inconsistently.",
    "Feature UI should consume this App* primitive instead of importing react-aria-components directly when the pattern is shared.",
  ],

  verdict: {
    cvaCoverage: "verified",
    a11yCoverage: "verified",
    usageCoverage: "verified",
    sourceCoverage: "verified",
  },
});
