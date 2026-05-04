/**
 * @afenda-owner app-disclosure
 * @afenda-subject ui
 * @afenda-artifact manifest
 * @afenda-boundary shared
 * @afenda-description Shared manifest entry for AppDisclosure ui governance
 */
import { defineApprovedComponentManifest } from "../governance.ui.manifest.shared";
import {
  appDisclosureCompositionContract,
  appDisclosureControlSourcePath,
  appDisclosureOptionalPropNames,
  appDisclosureReactAriaPrimitives,
  appDisclosureRequiredPropNames,
  appDisclosureSizeValues,
  appDisclosureTokenContract,
} from "./app-disclosure.contract.primitive.shared";

export const appDisclosureManifest = defineApprovedComponentManifest({
  id: "app-disclosure",
  owner: "components",
  exportName: "AppDisclosure",
  status: "approved",

  category: "component",
  boundary: "client",

  sourcePath: appDisclosureControlSourcePath,

  styleSources: [
    {
      type: "cva",
      sourcePath:
        "@/components/ui-governance/app-disclosure/app-disclosure.control.primitive.client",
      exportName: "appDisclosureVariants",
    },
    {
      type: "cva",
      sourcePath:
        "@/components/ui-governance/app-disclosure/app-disclosure.control.primitive.client",
      exportName: "appDisclosureTriggerVariants",
    },
    {
      type: "cva",
      sourcePath:
        "@/components/ui-governance/app-disclosure/app-disclosure.control.primitive.client",
      exportName: "appDisclosureChevronVariants",
    },
    {
      type: "cva",
      sourcePath:
        "@/components/ui-governance/app-disclosure/app-disclosure.control.primitive.client",
      exportName: "appDisclosurePanelVariants",
    },
    {
      type: "cva",
      sourcePath:
        "@/components/ui-governance/app-disclosure/app-disclosure.control.primitive.client",
      exportName: "appDisclosurePanelContentVariants",
    },
  ],
  reactAriaPrimitives: [...appDisclosureReactAriaPrimitives],
  cva: {
    appDisclosureVariants: {
      required: true,
      variants: {
        size: {
          values: [...appDisclosureSizeValues],
          default: "md",
          required: false,
        },
      },
    },
    appDisclosureTriggerVariants: {
      required: true,
      variants: {
        size: {
          values: [...appDisclosureSizeValues],
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
    appDisclosureChevronVariants: {
      required: true,
      variants: {
        expanded: {
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
    appDisclosurePanelVariants: {
      required: true,
      variants: {
        size: {
          values: [...appDisclosureSizeValues],
          default: "md",
          required: false,
        },
      },
    },
    appDisclosurePanelContentVariants: {
      required: true,
      variants: {
        size: {
          values: [...appDisclosureSizeValues],
          default: "md",
          required: false,
        },
      },
    },
  },

  props: {
    required: [...appDisclosureRequiredPropNames],
    optional: [...appDisclosureOptionalPropNames],
  },

  composition: {
    requiresChildren: appDisclosureCompositionContract.requiresChildren,
    requiredElements: [...appDisclosureCompositionContract.requiredElements],
    optionalElements: [...appDisclosureCompositionContract.optionalElements],
    notes: [...appDisclosureCompositionContract.notes],
  },

  a11y: {
    required: true,
    notes: [
      "AppDisclosure owns the heading, trigger button, and panel structure so collapsible sections keep correct semantics and keyboard behavior.",
      "The title prop provides the trigger text and accessible disclosure label by default.",
      "Adjacent actions belong in headerAccessory so Heading and trigger Button never receive nested interactive children.",
    ],
  },

  usage: {
    useWhen: [
      "Use AppDisclosure for governed collapsible sections where operators reveal supporting details without leaving the current workflow.",
    ],
    avoidWhen: [
      "Do not use AppDisclosure as a generic layout container when content is not actually collapsible.",
    ],
  },

  tokens: {
    semanticColors: [...appDisclosureTokenContract.semanticColors],
    radii: [...appDisclosureTokenContract.radii],
    typography: [...appDisclosureTokenContract.typography],
  },

  constraints: [
    "AppDisclosure owns its internal Heading, trigger Button, and DisclosurePanel so feature code does not rebuild disclosure structure inconsistently.",
    "Feature UI should consume this App* primitive instead of importing react-aria-components directly when the pattern is shared.",
  ],

  verdict: {
    cvaCoverage: "verified",
    a11yCoverage: "verified",
    usageCoverage: "verified",
    sourceCoverage: "verified",
  },
});
