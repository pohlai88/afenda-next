/**
 * @afenda-owner app-calendar
 * @afenda-subject ui
 * @afenda-artifact manifest
 * @afenda-boundary shared
 * @afenda-description Shared manifest entry for AppCalendar ui governance
 */
import { defineApprovedComponentManifest } from "../governance.ui.manifest.shared";
import {
  appCalendarCompositionContract,
  appCalendarControlSourcePath,
  appCalendarOptionalPropNames,
  appCalendarReactAriaPrimitives,
  appCalendarRequiredPropNames,
  appCalendarTokenContract,
} from "./app-calendar.contract.primitive.shared";

export const appCalendarManifest = defineApprovedComponentManifest({
  id: "app-calendar",
  owner: "components",
  exportName: "AppCalendar",
  status: "review",

  category: "component",
  boundary: "client",

  sourcePath: appCalendarControlSourcePath,

  styleSources: [],
  reactAriaPrimitives: [...appCalendarReactAriaPrimitives],
  cva: {},

  props: {
    required: [...appCalendarRequiredPropNames],
    optional: [...appCalendarOptionalPropNames],
  },

  composition: {
    requiresChildren: appCalendarCompositionContract.requiresChildren,
    requiredElements: [...appCalendarCompositionContract.requiredElements],
    optionalElements: [...appCalendarCompositionContract.optionalElements],
    notes: [...appCalendarCompositionContract.notes],
  },

  a11y: {
    required: true,
    notes: ["Expose the navigable date grid explicitly at the canonical boundary."],
  },

  usage: {
    useWhen: ["Use AppCalendar for governed field entry and validation flows."],
    avoidWhen: ["Do not use AppCalendar when a display-only or non-form primitive is clearer."],
  },

  tokens: {
    semanticColors: [...appCalendarTokenContract.semanticColors],
    radii: [...appCalendarTokenContract.radii],
    typography: [...appCalendarTokenContract.typography],
  },

  constraints: ["This component is a thin canonical React Aria wrapper, not a second design system.", "Feature UI should consume this App* primitive instead of importing react-aria-components directly when the pattern is shared.", "Keep the documented child composition explicit at the call site."],

  verdict: {
    cvaCoverage: "not-applicable",
    a11yCoverage: "verified",
    usageCoverage: "verified",
    sourceCoverage: "verified",
  },
});
