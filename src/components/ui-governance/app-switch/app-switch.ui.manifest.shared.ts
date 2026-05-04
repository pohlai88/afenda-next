/**
 * @afenda-owner app-switch
 * @afenda-subject ui
 * @afenda-artifact manifest
 * @afenda-boundary shared
 * @afenda-description Shared manifest entry for AppSwitch ui governance
 */
import { defineApprovedComponentManifest } from "../governance.ui.manifest.shared";
import {
  appSwitchCompositionContract,
  appSwitchControlSourcePath,
  appSwitchOptionalPropNames,
  appSwitchReactAriaPrimitives,
  appSwitchRequiredPropNames,
  appSwitchSizeValues,
  appSwitchTokenContract,
} from "./app-switch.contract.primitive.shared";

export const appSwitchManifest = defineApprovedComponentManifest({
  id: "app-switch",
  owner: "components",
  exportName: "AppSwitch",
  status: "approved",

  category: "component",
  boundary: "client",

  sourcePath: appSwitchControlSourcePath,

  styleSources: [
    {
      type: "cva",
      sourcePath: appSwitchControlSourcePath,
      exportName: "appSwitchVariants",
    },
    {
      type: "cva",
      sourcePath: appSwitchControlSourcePath,
      exportName: "appSwitchTrackVariants",
    },
    {
      type: "cva",
      sourcePath: appSwitchControlSourcePath,
      exportName: "appSwitchHandleVariants",
    },
  ],
  reactAriaPrimitives: [...appSwitchReactAriaPrimitives],
  cva: {
    appSwitchVariants: {
      required: true,
      variants: {
        size: {
          values: [...appSwitchSizeValues],
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
    appSwitchTrackVariants: {
      required: true,
      variants: {
        size: {
          values: [...appSwitchSizeValues],
          default: "md",
          required: false,
        },
        selected: {
          values: ["true", "false"],
          default: "false",
          required: false,
        },
        disabled: {
          values: ["true", "false"],
          default: "false",
          required: false,
        },
        pressed: {
          values: ["true", "false"],
          default: "false",
          required: false,
        },
        readOnly: {
          values: ["true", "false"],
          default: "false",
          required: false,
        },
      },
    },
    appSwitchHandleVariants: {
      required: true,
      variants: {
        size: {
          values: [...appSwitchSizeValues],
          default: "md",
          required: false,
        },
        selected: {
          values: ["true", "false"],
          default: "false",
          required: false,
        },
        disabled: {
          values: ["true", "false"],
          default: "false",
          required: false,
        },
        pressed: {
          values: ["true", "false"],
          default: "false",
          required: false,
        },
      },
    },
  },

  props: {
    required: [...appSwitchRequiredPropNames],
    optional: [...appSwitchOptionalPropNames],
  },

  composition: {
    requiresChildren: appSwitchCompositionContract.requiresChildren,
    requiredElements: [...appSwitchCompositionContract.requiredElements],
    optionalElements: [...appSwitchCompositionContract.optionalElements],
    notes: [...appSwitchCompositionContract.notes],
  },

  a11y: {
    required: true,
    notes: [
      "AppSwitch preserves React Aria switch semantics and keyboard interactions for binary settings.",
      "A switch should render visible label content unless aria-label or aria-labelledby is intentionally supplied by the owning surface.",
      "The track and handle are presentational only and remain outside the accessibility tree.",
    ],
  },

  usage: {
    useWhen: [
      "Use AppSwitch for governed on or off settings, preferences, or feature-state toggles in ERP workflows.",
    ],
    avoidWhen: [
      "Do not use AppSwitch for immediate actions; use AppButton instead.",
      "Do not use AppSwitch when the operator must choose among multiple exclusive options; use AppRadioGroup instead.",
    ],
  },

  tokens: {
    semanticColors: [...appSwitchTokenContract.semanticColors],
    radii: [...appSwitchTokenContract.radii],
    typography: [...appSwitchTokenContract.typography],
  },

  constraints: [
    "AppSwitch must keep its binary indicator chrome inside the primitive so state changes remain visually predictable across dense forms.",
    "Feature UI should consume AppSwitch instead of importing react-aria-components directly when the pattern is shared.",
  ],

  verdict: {
    cvaCoverage: "verified",
    a11yCoverage: "verified",
    usageCoverage: "verified",
    sourceCoverage: "verified",
  },
});
