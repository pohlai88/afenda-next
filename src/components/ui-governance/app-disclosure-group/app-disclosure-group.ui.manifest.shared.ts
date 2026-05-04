/**
 * @afenda-owner app-disclosure-group
 * @afenda-subject ui
 * @afenda-artifact manifest
 * @afenda-boundary shared
 * @afenda-description Shared manifest entry for AppDisclosureGroup ui governance
 */
import { defineApprovedComponentManifest } from "../governance.ui.manifest.shared";
import {
  appDisclosureGroupCompositionContract,
  appDisclosureGroupControlSourcePath,
  appDisclosureGroupOptionalPropNames,
  appDisclosureGroupReactAriaPrimitives,
  appDisclosureGroupRequiredPropNames,
  appDisclosureGroupSizeValues,
  appDisclosureGroupTokenContract,
} from "./app-disclosure-group.contract.primitive.shared";

export const appDisclosureGroupManifest = defineApprovedComponentManifest({
  id: "app-disclosure-group",
  owner: "components",
  exportName: "AppDisclosureGroup",
  status: "approved",

  category: "component",
  boundary: "client",

  sourcePath: appDisclosureGroupControlSourcePath,

  styleSources: [
    {
      type: "cva",
      sourcePath:
        "@/components/ui-governance/app-disclosure-group/app-disclosure-group.control.primitive.client",
      exportName: "appDisclosureGroupVariants",
    },
  ],
  reactAriaPrimitives: [...appDisclosureGroupReactAriaPrimitives],
  cva: {
    appDisclosureGroupVariants: {
      required: true,
      variants: {
        size: {
          values: [...appDisclosureGroupSizeValues],
          default: "md",
          required: false,
        },
      },
    },
  },

  props: {
    required: [...appDisclosureGroupRequiredPropNames],
    optional: [...appDisclosureGroupOptionalPropNames],
  },

  composition: {
    requiresChildren: appDisclosureGroupCompositionContract.requiresChildren,
    requiredElements: [...appDisclosureGroupCompositionContract.requiredElements],
    optionalElements: [...appDisclosureGroupCompositionContract.optionalElements],
    notes: [...appDisclosureGroupCompositionContract.notes],
  },

  a11y: {
    required: true,
    notes: [
      "AppDisclosureGroup preserves the disclosure-group semantics while keeping each grouped disclosure inside the governed App* boundary.",
      "Expanded keys map to the id prop of each AppDisclosure child.",
    ],
  },

  usage: {
    useWhen: [
      "Use AppDisclosureGroup when operators need a governed accordion or grouped set of collapsible sections.",
    ],
    avoidWhen: [
      "Do not use AppDisclosureGroup when the content is not actually a related set of disclosures.",
    ],
  },

  tokens: {
    semanticColors: [...appDisclosureGroupTokenContract.semanticColors],
    radii: [...appDisclosureGroupTokenContract.radii],
    typography: [...appDisclosureGroupTokenContract.typography],
  },

  constraints: [
    "AppDisclosureGroup requires direct AppDisclosure children so grouped accordions stay inside the approved App* boundary.",
    "Feature UI should consume this App* primitive instead of importing react-aria-components directly when the pattern is shared.",
  ],

  verdict: {
    cvaCoverage: "verified",
    a11yCoverage: "verified",
    usageCoverage: "verified",
    sourceCoverage: "verified",
  },
});
