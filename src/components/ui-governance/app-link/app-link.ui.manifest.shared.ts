/**
 * @afenda-owner app-link
 * @afenda-subject ui
 * @afenda-artifact manifest
 * @afenda-boundary shared
 * @afenda-description Shared manifest entry for AppLink ui governance
 */
import { defineApprovedComponentManifest } from "../governance.ui.manifest.shared";
import {
  appLinkCompositionContract,
  appLinkControlSourcePath,
  appLinkOptionalPropNames,
  appLinkReactAriaPrimitives,
  appLinkRequiredPropNames,
  appLinkSizeValues,
  appLinkTokenContract,
  appLinkToneValues,
} from "./app-link.contract.primitive.shared";

export const appLinkManifest = defineApprovedComponentManifest({
  id: "app-link",
  owner: "components",
  exportName: "AppLink",
  status: "approved",

  category: "component",
  boundary: "client",

  sourcePath: appLinkControlSourcePath,

  styleSources: [
    {
      exportName: "appLinkVariants",
      sourcePath: appLinkControlSourcePath,
      type: "cva",
    },
  ],
  reactAriaPrimitives: [...appLinkReactAriaPrimitives],
  cva: {
    appLinkVariants: {
      required: true,
      variants: {
        tone: {
          values: [...appLinkToneValues],
          default: "accent",
        },
        size: {
          values: [...appLinkSizeValues],
          default: "default",
        },
      },
    },
  },

  props: {
    required: [...appLinkRequiredPropNames],
    optional: [...appLinkOptionalPropNames],
  },

  composition: {
    requiresChildren: appLinkCompositionContract.requiresChildren,
    requiredElements: [...appLinkCompositionContract.requiredElements],
    optionalElements: [...appLinkCompositionContract.optionalElements],
    notes: [...appLinkCompositionContract.notes],
  },

  a11y: {
    required: true,
    notes: [
      "Keep link semantics on AppLink rather than styling buttons or spans to look navigational.",
      "Icon-only links must provide aria-label or aria-labelledby so navigation intent stays accessible.",
    ],
  },

  usage: {
    useWhen: [
      "Use AppLink for governed navigation, supporting resource links, and inline route transitions within ERP workflows.",
    ],
    avoidWhen: [
      "Do not use AppLink for in-place actions or mutations that should remain semantic buttons.",
    ],
  },

  tokens: {
    semanticColors: [...appLinkTokenContract.semanticColors],
    radii: [...appLinkTokenContract.radii],
    typography: [...appLinkTokenContract.typography],
  },

  constraints: [
    "AppLink owns shared inline link styling but should remain a narrow navigation primitive rather than a generic text-action system.",
    "Feature UI should consume this App* primitive instead of importing react-aria-components Link directly when the link pattern is shared.",
  ],

  verdict: {
    cvaCoverage: "verified",
    a11yCoverage: "verified",
    usageCoverage: "verified",
    sourceCoverage: "verified",
  },
});
