/**
 * @afenda-owner app-drop-zone
 * @afenda-subject ui
 * @afenda-artifact manifest
 * @afenda-boundary shared
 * @afenda-description Shared manifest entry for AppDropZone ui governance
 */
import { defineApprovedComponentManifest } from "../governance.ui.manifest.shared";
import {
  appDropZoneCompositionContract,
  appDropZoneControlSourcePath,
  appDropZoneOptionalPropNames,
  appDropZoneReactAriaPrimitives,
  appDropZoneRequiredPropNames,
  appDropZoneTokenContract,
} from "./app-drop-zone.contract.primitive.shared";

export const appDropZoneManifest = defineApprovedComponentManifest({
  id: "app-drop-zone",
  owner: "components",
  exportName: "AppDropZone",
  status: "approved",

  category: "component",
  boundary: "client",

  sourcePath: appDropZoneControlSourcePath,

  styleSources: [
    {
      exportName: "appDropZoneVariants",
      sourcePath: appDropZoneControlSourcePath,
      type: "cva",
    },
    {
      exportName: "appDropZoneContentVariants",
      sourcePath: appDropZoneControlSourcePath,
      type: "cva",
    },
    {
      exportName: "appDropZoneLabelVariants",
      sourcePath: appDropZoneControlSourcePath,
      type: "cva",
    },
    {
      exportName: "appDropZoneDescriptionVariants",
      sourcePath: appDropZoneControlSourcePath,
      type: "cva",
    },
  ],
  reactAriaPrimitives: [...appDropZoneReactAriaPrimitives],
  cva: {
    appDropZoneVariants: {
      required: true,
      variants: {
        size: {
          values: ["md", "sm"],
          default: "md",
        },
        disabled: {
          values: ["true", "false"],
          default: "false",
        },
        dropTarget: {
          values: ["true", "false"],
          default: "false",
        },
      },
    },
    appDropZoneContentVariants: {
      required: true,
      variants: {
        size: {
          values: ["md", "sm"],
          default: "md",
        },
      },
    },
    appDropZoneLabelVariants: {
      required: true,
      variants: {
        size: {
          values: ["md", "sm"],
          default: "md",
        },
      },
    },
    appDropZoneDescriptionVariants: {
      required: true,
      variants: {
        size: {
          values: ["md", "sm"],
          default: "md",
        },
      },
    },
  },

  props: {
    required: [...appDropZoneRequiredPropNames],
    optional: [...appDropZoneOptionalPropNames],
  },

  composition: {
    requiresChildren: appDropZoneCompositionContract.requiresChildren,
    requiredElements: [...appDropZoneCompositionContract.requiredElements],
    optionalElements: [...appDropZoneCompositionContract.optionalElements],
    notes: [...appDropZoneCompositionContract.notes],
  },

  a11y: {
    required: true,
    notes: [
      "Provide label, aria-label, or aria-labelledby so the drop target has an explicit accessible name.",
      "Keep visible drop instructions or preview content inside the owned surface so operators can confirm what the zone accepts before dragging files or text.",
    ],
  },

  usage: {
    useWhen: [
      "Use AppDropZone for governed drag-and-drop intake surfaces such as attachments, imports, and other operator upload workflows.",
    ],
    avoidWhen: [
      "Do not use AppDropZone when a simple press action or hidden file input trigger is sufficient.",
      "Do not compose raw React Aria Text slot='label' content at the feature boundary for shared drop surfaces.",
    ],
  },

  tokens: {
    semanticColors: [...appDropZoneTokenContract.semanticColors],
    radii: [...appDropZoneTokenContract.radii],
    typography: [...appDropZoneTokenContract.typography],
  },

  constraints: [
    "AppDropZone owns the shared labeled drop surface rather than exposing raw slot composition in product code.",
    "Feature UI should use AppDropZone for shared intake patterns instead of importing react-aria-components DropZone directly.",
  ],

  verdict: {
    cvaCoverage: "verified",
    a11yCoverage: "verified",
    usageCoverage: "verified",
    sourceCoverage: "verified",
  },
});
