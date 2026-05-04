import type { Metadata } from "next";

import {
  buildInterfaceLabItemHref,
  type InterfaceLabRouteSurface,
} from "./interface-lab.routes.shared";
import type { InterfaceLabItem, InterfaceLabSection } from "./interface-lab.types";

export function buildInterfaceLabDetailMetadata(input: {
  sectionLabel: string;
  sectionPath: string;
  slug: string;
  item: InterfaceLabItem | undefined;
  routeSurface?: InterfaceLabRouteSurface;
}): Metadata {
  const { sectionLabel, sectionPath, slug, item, routeSurface } = input;
  const surface: InterfaceLabRouteSurface = routeSurface ?? "lab";
  const baseRobots = { index: false, follow: false } as const;

  if (!item) {
    return {
      title: `${sectionLabel}: ${slug}`,
      description: `Unknown preview slug "${slug}" under ${sectionLabel}.`,
      robots: baseRobots,
    };
  }

  const pathname = buildInterfaceLabItemHref(surface, sectionPath as InterfaceLabSection, slug);

  return {
    title: item.title,
    description: item.description,
    alternates: {
      canonical: pathname,
    },
    openGraph: {
      title: `${item.title} · ${sectionLabel}`,
      description: item.description,
      type: "article",
    },
    robots: baseRobots,
  };
}
