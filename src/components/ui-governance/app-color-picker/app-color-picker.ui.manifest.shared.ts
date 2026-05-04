/**
 * @afenda-owner app-color-picker
 * @afenda-subject ui
 * @afenda-artifact manifest
 * @afenda-boundary shared
 * @afenda-description Shared manifest entry for AppColorPicker ui governance
 */
import { defineApprovedComponentManifest } from "../governance.ui.manifest.shared";
import {
  appColorPickerCompositionContract,
  appColorPickerControlSourcePath,
  appColorPickerOptionalPropNames,
  appColorPickerReactAriaPrimitives,
  appColorPickerRequiredPropNames,
  appColorPickerSizeValues,
  appColorPickerTokenContract,
} from "./app-color-picker.contract.primitive.shared";

export const appColorPickerManifest = defineApprovedComponentManifest({
  id: "app-color-picker",
  owner: "components",
  exportName: "AppColorPicker",
  status: "approved",

  category: "component",
  boundary: "client",

  sourcePath: appColorPickerControlSourcePath,

  styleSources: [
    {
      type: "cva",
      sourcePath:
        "@/components/ui-governance/app-color-picker/app-color-picker.control.primitive.client",
      exportName: "appColorPickerTriggerVariants",
    },
    {
      type: "cva",
      sourcePath:
        "@/components/ui-governance/app-color-picker/app-color-picker.control.primitive.client",
      exportName: "appColorPickerPanelVariants",
    },
  ],
  reactAriaPrimitives: [...appColorPickerReactAriaPrimitives],
  cva: {
    appColorPickerTriggerVariants: {
      required: true,
      variants: {
        size: {
          values: [...appColorPickerSizeValues],
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
    appColorPickerPanelVariants: {
      required: true,
      variants: {
        root: {
          values: ["default"],
          default: "default",
          required: false,
        },
      },
    },
  },

  props: {
    required: [...appColorPickerRequiredPropNames],
    optional: [...appColorPickerOptionalPropNames],
  },

  composition: {
    requiresChildren: appColorPickerCompositionContract.requiresChildren,
    requiredElements: [...appColorPickerCompositionContract.requiredElements],
    optionalElements: [...appColorPickerCompositionContract.optionalElements],
    notes: [...appColorPickerCompositionContract.notes],
  },

  a11y: {
    required: true,
    notes: [
      "AppColorPicker owns the trigger button and popover shell so swatch preview and disclosure behavior stay consistent.",
      "Provide label or triggerAriaLabel so the trigger control always has an accessible name.",
      "The default panel keeps a two-axis area, hue slider, and hex field available without requiring feature code to recompose the picker.",
    ],
  },

  usage: {
    useWhen: [
      "Use AppColorPicker when operators need a synchronized color-editing surface that combines preview, disclosure, and color controls.",
    ],
    avoidWhen: [
      "Do not use AppColorPicker when a single field, swatch, or area control is sufficient and the disclosure shell would add unnecessary workflow weight.",
    ],
  },

  tokens: {
    semanticColors: [...appColorPickerTokenContract.semanticColors],
    radii: [...appColorPickerTokenContract.radii],
    typography: [...appColorPickerTokenContract.typography],
  },

  constraints: [
    "AppColorPicker owns the trigger and default disclosure composition so feature code does not rebuild the picker shell inconsistently.",
    "Feature UI should consume this App* primitive instead of importing react-aria-components directly when the pattern is shared.",
  ],

  verdict: {
    cvaCoverage: "verified",
    a11yCoverage: "verified",
    usageCoverage: "verified",
    sourceCoverage: "verified",
  },
});
