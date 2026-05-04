/**
 * @afenda-owner app-color-swatch-picker
 * @afenda-subject ui
 * @afenda-artifact manifest
 * @afenda-boundary shared
 * @afenda-description Shared manifest entry for AppColorSwatchPicker ui governance
 */
import { defineApprovedComponentManifest } from "../governance.ui.manifest.shared";
import {
  appColorSwatchPickerCompositionContract,
  appColorSwatchPickerControlSourcePath,
  appColorSwatchPickerItemSizeValues,
  appColorSwatchPickerLayoutValues,
  appColorSwatchPickerOptionalPropNames,
  appColorSwatchPickerReactAriaPrimitives,
  appColorSwatchPickerRequiredPropNames,
  appColorSwatchPickerTokenContract,
} from "./app-color-swatch-picker.contract.primitive.shared";

export const appColorSwatchPickerManifest = defineApprovedComponentManifest({
  id: "app-color-swatch-picker",
  owner: "components",
  exportName: "AppColorSwatchPicker",
  status: "approved",

  category: "component",
  boundary: "client",

  sourcePath: appColorSwatchPickerControlSourcePath,

  styleSources: [
    {
      exportName: "appColorSwatchPickerVariants",
      sourcePath: appColorSwatchPickerControlSourcePath,
      type: "cva",
    },
    {
      exportName: "appColorSwatchPickerItemVariants",
      sourcePath: appColorSwatchPickerControlSourcePath,
      type: "cva",
    },
    {
      exportName: "appColorSwatchPickerIndicatorVariants",
      sourcePath: appColorSwatchPickerControlSourcePath,
      type: "cva",
    },
  ],
  reactAriaPrimitives: [...appColorSwatchPickerReactAriaPrimitives],
  cva: {
    appColorSwatchPickerVariants: {
      required: true,
      variants: {
        layout: {
          values: [...appColorSwatchPickerLayoutValues],
          default: "grid",
          required: false,
        },
      },
    },
    appColorSwatchPickerItemVariants: {
      required: true,
      variants: {
        size: {
          values: [...appColorSwatchPickerItemSizeValues],
          default: "lg",
          required: false,
        },
        disabled: {
          values: ["true", "false"],
          default: "false",
          required: false,
        },
      },
    },
    appColorSwatchPickerIndicatorVariants: {
      required: true,
      variants: {
        selected: {
          values: ["true", "false"],
          default: "false",
          required: false,
        },
      },
    },
  },

  props: {
    required: [...appColorSwatchPickerRequiredPropNames],
    optional: [...appColorSwatchPickerOptionalPropNames],
  },

  composition: {
    requiresChildren: appColorSwatchPickerCompositionContract.requiresChildren,
    requiredElements: [
      ...appColorSwatchPickerCompositionContract.requiredElements,
    ],
    optionalElements: [
      ...appColorSwatchPickerCompositionContract.optionalElements,
    ],
    notes: [...appColorSwatchPickerCompositionContract.notes],
  },

  a11y: {
    required: true,
    notes: [
      "Provide aria-label or aria-labelledby on AppColorSwatchPicker so the selectable color set has an accessible name.",
      "Use AppColorSwatchPickerItem so selected-state styling and internal swatch rendering stay consistent across workflows.",
      "Keep swatch colors unique, including equivalent colors expressed in different color spaces, to preserve predictable selection behavior.",
    ],
  },

  usage: {
    useWhen: [
      "Use AppColorSwatchPicker when operators need a constrained preset color choice set rather than freeform color editing.",
    ],
    avoidWhen: [
      "Do not use AppColorSwatchPicker when the workflow needs arbitrary color entry or multi-axis color editing.",
    ],
  },

  tokens: {
    semanticColors: [...appColorSwatchPickerTokenContract.semanticColors],
    radii: [...appColorSwatchPickerTokenContract.radii],
    typography: [...appColorSwatchPickerTokenContract.typography],
  },

  constraints: [
    "AppColorSwatchPicker is the collection boundary and AppColorSwatchPickerItem is the only approved shared swatch option helper for this primitive.",
    "Do not import raw React Aria ColorSwatchPicker or ColorSwatchPickerItem into feature code when this governed pair is sufficient.",
    "Do not repeat equivalent colors in different color spaces within the same direct child set.",
  ],

  verdict: {
    cvaCoverage: "verified",
    a11yCoverage: "verified",
    usageCoverage: "verified",
    sourceCoverage: "verified",
  },
});
