/**
 * @afenda-owner interface-lab
 * @afenda-subject routing
 * @afenda-boundary shared
 * @afenda-description URL builders for Interface Lab (`/interface-lab`) and public marketing studio (`/interface-studio`).
 */
import type { Route } from "next";

import type { InterfaceLabSection } from "./interface-lab.types";

export type InterfaceLabRouteSurface = "lab" | "studio";

export function getInterfaceLabRouteSurfaceBasePath(
  surface: InterfaceLabRouteSurface,
): "/interface-lab" | "/interface-studio" {
  return surface === "studio" ? "/interface-studio" : "/interface-lab";
}

/** URL path segment for list + detail routes (may differ from domain `InterfaceLabSection` on marketing). */
export function getInterfaceLabRouteSurfaceSectionSegment(
  surface: InterfaceLabRouteSurface,
  section: InterfaceLabSection,
): string {
  if (surface === "lab") {
    return section;
  }
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

export function buildInterfaceLabSectionIndexHref(
  surface: InterfaceLabRouteSurface,
  section: InterfaceLabSection,
): Route {
  const base = getInterfaceLabRouteSurfaceBasePath(surface);
  const segment = getInterfaceLabRouteSurfaceSectionSegment(surface, section);
  return `${base}/${segment}` as Route;
}

export function buildInterfaceLabItemHref(
  surface: InterfaceLabRouteSurface,
  section: InterfaceLabSection,
  slug: string,
): Route {
  const base = getInterfaceLabRouteSurfaceBasePath(surface);
  const segment = getInterfaceLabRouteSurfaceSectionSegment(surface, section);
  return `${base}/${segment}/${slug}` as Route;
}

export function buildInterfaceLabStudioHomeHref(surface: InterfaceLabRouteSurface): Route {
  if (surface === "studio") {
    return buildInterfaceLabSectionIndexHref("studio", "landing");
  }
  return getInterfaceLabRouteSurfaceBasePath(surface);
}

/**
 * Primary nav targets: marketing multiplexes lab sections under `/interface-studio/...` (e.g. `screens` for domain `landing`);
 * ERP patterns remain canonical under `/interface-lab/erp-patterns`.
 */
export function buildInterfaceLabSectionNavHref(
  surface: InterfaceLabRouteSurface,
  section: InterfaceLabSection,
): Route {
  if (surface === "lab") {
    return `/interface-lab/${section}` as Route;
  }
  if (section === "erp-patterns") {
    return `/interface-lab/${section}` as Route;
  }
  return buildInterfaceLabSectionIndexHref("studio", section);
}
