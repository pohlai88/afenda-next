/**
 * @afenda-owner app-button
 * @afenda-subject ui
 * @afenda-artifact manifest
 * @afenda-boundary shared
 * @afenda-description Shared manifest entry for AppButton ui governance
 */
import { defineApprovedComponentManifest } from "../governance.ui.manifest.shared";
import {
  appButtonCompositionContract,
  appButtonControlSourcePath,
  appButtonOptionalPropNames,
  appButtonReactAriaPrimitives,
  appButtonRequiredPropNames,
  appButtonSizeValues,
  appButtonTokenContract,
  appButtonVariantValues,
} from "./app-button.contract.primitive.shared";

export const appButtonManifest = defineApprovedComponentManifest({
  id: "app-button",
  owner: "components",
  exportName: "AppButton",
  status: "approved",

  category: "component",
  boundary: "client",

  sourcePath: appButtonControlSourcePath,

  styleSources: [
    {
      exportName: "appButtonVariants",
      sourcePath: appButtonControlSourcePath,
      type: "cva",
    },
  ],
  reactAriaPrimitives: [...appButtonReactAriaPrimitives],
  cva: {
    appButtonVariants: {
      required: true,
      variants: {
        variant: {
          values: [...appButtonVariantValues],
          default: "primary",
        },
        size: {
          values: [...appButtonSizeValues],
          default: "md",
        },
        pending: {
          values: ["true", "false"],
          default: "false",
        },
        disabled: {
          values: ["true", "false"],
          default: "false",
        },
      },
    },
  },

  props: {
    required: [...appButtonRequiredPropNames],
    optional: [...appButtonOptionalPropNames],
  },

  composition: {
    requiresChildren: appButtonCompositionContract.requiresChildren,
    requiredElements: [...appButtonCompositionContract.requiredElements],
    optionalElements: [...appButtonCompositionContract.optionalElements],
    notes: [...appButtonCompositionContract.notes],
  },

  a11y: {
    required: true,
    notes: [
      "Use onPress rather than onClick for normalized input interactions.",
      "Pending buttons remain focusable while press and hover interactions are suppressed by React Aria.",
      "Keep the button label or icon content present while pending so the accessible name remains stable.",
      "Render an accessible indeterminate progress indicator while pending; do not hide it from the accessibility tree.",
    ],
  },

  usage: {
    useWhen: [
      "Use for governed operator actions such as save, confirm, retry, add, and dialog commands.",
    ],
    avoidWhen: [
      "Do not use for route navigation, tab navigation, or persistent toggle state.",
    ],
  },

  tokens: {
    semanticColors: [...appButtonTokenContract.semanticColors],
    radii: [...appButtonTokenContract.radii],
    typography: [...appButtonTokenContract.typography],
  },

  constraints: [
    "AppButton is the approved shared action primitive; feature code should not restyle raw React Aria Button directly when this contract is sufficient.",
    "Link-looking actions should use AppLink rather than overloading AppButton semantics.",
    "Keep variant usage deliberate: primary for the main action, secondary for standard actions, destructive for irreversible actions, and quiet for low-emphasis inline actions.",
    "If the pending announcement needs domain-specific wording, pass pendingLabel explicitly.",
  ],

  verdict: {
    cvaCoverage: "verified",
    a11yCoverage: "verified",
    usageCoverage: "verified",
    sourceCoverage: "verified",
  },
});
