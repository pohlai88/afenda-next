/**
 * @afenda-owner app-text-field
 * @afenda-subject ui
 * @afenda-artifact manifest
 * @afenda-boundary shared
 * @afenda-description Shared manifest entry for AppTextField ui governance
 */
import { defineApprovedComponentManifest } from "../governance.ui.manifest.shared";
import {
  appTextFieldCompositionContract,
  appTextFieldControlSourcePath,
  appTextFieldOptionalPropNames,
  appTextFieldReactAriaPrimitives,
  appTextFieldRequiredPropNames,
  appTextFieldSizeValues,
  appTextFieldTokenContract,
} from "./app-text-field.contract.primitive.shared";

export const appTextFieldManifest = defineApprovedComponentManifest({
  id: "app-text-field",
  owner: "components",
  exportName: "AppTextField",
  status: "approved",

  category: "component",
  boundary: "client",

  sourcePath: appTextFieldControlSourcePath,

  styleSources: [
    {
      exportName: "appTextFieldVariants",
      sourcePath: appTextFieldControlSourcePath,
      type: "cva",
    },
    {
      exportName: "appInputVariants",
      sourcePath: appTextFieldControlSourcePath,
      type: "cva",
    },
    {
      exportName: "appTextAreaVariants",
      sourcePath: appTextFieldControlSourcePath,
      type: "cva",
    },
  ],
  reactAriaPrimitives: [...appTextFieldReactAriaPrimitives],
  cva: {
    appTextFieldVariants: {
      required: true,
      variants: {
        invalid: {
          values: ["true", "false"],
          default: "false",
          required: false,
        },
      },
    },
    appInputVariants: {
      required: true,
      variants: {
        size: {
          values: [...appTextFieldSizeValues],
          default: "md",
          required: false,
        },
        focused: {
          values: ["true", "false"],
          default: "false",
          required: false,
        },
        invalid: {
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
    appTextAreaVariants: {
      required: true,
      variants: {
        size: {
          values: [...appTextFieldSizeValues],
          default: "md",
          required: false,
        },
        focused: {
          values: ["true", "false"],
          default: "false",
          required: false,
        },
        invalid: {
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
    required: [...appTextFieldRequiredPropNames],
    optional: [...appTextFieldOptionalPropNames],
  },

  composition: {
    requiresChildren: appTextFieldCompositionContract.requiresChildren,
    requiredElements: [...appTextFieldCompositionContract.requiredElements],
    optionalElements: [...appTextFieldCompositionContract.optionalElements],
    notes: [...appTextFieldCompositionContract.notes],
  },

  a11y: {
    required: true,
    notes: [
      "AppTextField requires label, aria-label, or aria-labelledby so the field is announced with a stable accessible name.",
      "Use AppInput or AppTextArea as the direct child so single-line and multi-line text entry remain explicit and keyboard behavior stays predictable.",
    ],
  },

  usage: {
    useWhen: [
      "Use AppTextField for governed plain-text entry, validated forms, search inputs, and operator workflows where field identity and error state must stay explicit.",
    ],
    avoidWhen: [
      "Do not use AppTextField for rich text, structured pickers, or display-only values where another primitive better communicates the interaction.",
    ],
  },

  tokens: {
    semanticColors: [...appTextFieldTokenContract.semanticColors],
    radii: [...appTextFieldTokenContract.radii],
    typography: [...appTextFieldTokenContract.typography],
  },

  constraints: [
    "AppTextField owns shared label, description, validation, and field-shell treatment so feature code should not rebuild common operator input chrome ad hoc.",
    "Feature UI should consume AppTextField, AppInput, and AppTextArea instead of importing raw React Aria text primitives directly when the pattern is shared.",
    "Keep the documented child composition explicit at the call site so the concrete input mode remains obvious to the next contributor.",
  ],

  verdict: {
    cvaCoverage: "verified",
    a11yCoverage: "verified",
    usageCoverage: "verified",
    sourceCoverage: "verified",
  },
});
