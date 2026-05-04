/**
 * @afenda-owner app-calendar
 * @afenda-subject contract
 * @afenda-artifact primitive
 * @afenda-boundary shared
 * @afenda-description Shared explicit primitive contract for app-calendar client and manifest shared boundary
 */

export const appCalendarControlSourcePath =
  "@/components/ui-governance/app-calendar/app-calendar.control.primitive.client";

export const appCalendarRequiredPropNames = ["children"] as const;

export const appCalendarOptionalPropNames = ["className", "createCalendar", "defaultValue", "firstDayOfWeek", "isDisabled", "isReadOnly", "maxValue", "minValue", "onChange", "render", "slot", "style", "value", "visibleDuration"] as const;

export const appCalendarReactAriaPrimitives = ["Calendar", "CalendarGrid"] as const;

export const appCalendarCompositionContract = {
  requiresChildren: true,
  requiredElements: ["CalendarGrid as a direct child"],
  optionalElements: ["Button slot=\"previous\"", "Button slot=\"next\"", "Heading"],
  notes: ["Expose the navigable date grid explicitly at the canonical boundary."],
} as const;

export const appCalendarTokenContract = {
  semanticColors: [] as const,
  radii: [] as const,
  typography: [] as const,
} as const;
