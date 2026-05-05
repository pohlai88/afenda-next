/**
 * @afenda-generated interface-studio
 * @afenda-boundary client
 * @afenda-description Auto-generated registry preview for app-calendar — edit scripts/interface-studio.registry-preview-snippet.automation.ts then run pnpm interface-studio:codegen
 */
"use client";

import { CalendarCell, CalendarGrid, CalendarGridBody, CalendarGridHeader, CalendarHeaderCell } from "react-aria-components";
import { AppCalendar } from "@/components/ui-governance/app-calendar/app-calendar.control.primitive.client";

export default function InterfaceStudioRegistryPreview() {
  return (
    <div className="registry-preview-surface flex flex-wrap items-start gap-4 p-4">
      <AppCalendar aria-label="Preview calendar"><CalendarGrid weekdayStyle="short" className="border-separate border-spacing-1"><CalendarGridHeader>{(day) => <CalendarHeaderCell className="text-xs text-foreground-muted">{day}</CalendarHeaderCell>}</CalendarGridHeader><CalendarGridBody>{(date) => <CalendarCell date={date} className="text-xs" />}</CalendarGridBody></CalendarGrid></AppCalendar>
    </div>
  );
}
