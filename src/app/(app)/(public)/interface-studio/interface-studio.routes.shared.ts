/**
 * @afenda-owner interface-studio
 * @afenda-subject routing
 * @afenda-boundary shared
 * @afenda-description URL builders for Interface Studio routes under `/interface-studio`.
 */
import type { Route } from "next";

import type { InterfaceStudioSection } from "./interface-studio.types";

export type InterfaceStudioRouteSurface = "studio";

export function getInterfaceStudioRouteSurfaceBasePath(
  _surface: InterfaceStudioRouteSurface,
): "/interface-studio" {
  return "/interface-studio";
}

/** URL path segment for list + detail routes (may differ from domain `InterfaceStudioSection` on marketing). */
export function getInterfaceStudioRouteSurfaceSectionSegment(
  surface: InterfaceStudioRouteSurface,
  section: InterfaceStudioSection,
): string {
  switch (section) {
    case "components":
      return "ui-components";
    case "blocks":
      return "ui-blocks";
    case "dashboard":
      return "ui-dashboard";
    case "landing":
      return "screens";
    default:
      return section;
  }
}

export function buildInterfaceStudioSectionIndexHref(
  surface: InterfaceStudioRouteSurface,
  section: InterfaceStudioSection,
): Route {
  const base = getInterfaceStudioRouteSurfaceBasePath(surface);
  const segment = getInterfaceStudioRouteSurfaceSectionSegment(surface, section);
  return `${base}/${segment}` as Route;
}

export function buildInterfaceStudioItemHref(
  surface: InterfaceStudioRouteSurface,
  section: InterfaceStudioSection,
  slug: string,
): Route {
  const base = getInterfaceStudioRouteSurfaceBasePath(surface);
  const segment = getInterfaceStudioRouteSurfaceSectionSegment(surface, section);
  return `${base}/${segment}/${slug}` as Route;
}

export function buildInterfaceStudioStudioHomeHref(
  _surface: InterfaceStudioRouteSurface,
): Route {
  return buildInterfaceStudioSectionIndexHref("studio", "landing");
}

/**
 * Primary nav targets multiplex section domains under `/interface-studio/...`
 * (e.g. `screens` for domain `landing`).
 */
export function buildInterfaceStudioSectionNavHref(
  surface: InterfaceStudioRouteSurface,
  section: InterfaceStudioSection,
): Route {
  return buildInterfaceStudioSectionIndexHref("studio", section);
}
