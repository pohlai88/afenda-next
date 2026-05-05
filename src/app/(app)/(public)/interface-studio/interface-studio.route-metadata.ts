import type { Metadata } from "next";

import {
  buildInterfaceStudioItemHref,
  type InterfaceStudioRouteSurface,
} from "./interface-studio.routes.shared";
import type { InterfaceStudioItem, InterfaceStudioSection } from "./interface-studio.types";

export function buildInterfaceStudioDetailMetadata(input: {
  sectionLabel: string;
  sectionPath: string;
  slug: string;
  item: InterfaceStudioItem | undefined;
  routeSurface?: InterfaceStudioRouteSurface;
}): Metadata {
  const { sectionLabel, sectionPath, slug, item, routeSurface } = input;
  const surface: InterfaceStudioRouteSurface = routeSurface ?? "studio";
  const baseRobots = { index: false, follow: false } as const;

  if (!item) {
    return {
      title: `${sectionLabel}: ${slug}`,
      description: `Unknown preview slug "${slug}" under ${sectionLabel}.`,
      robots: baseRobots,
    };
  }

  const pathname = buildInterfaceStudioItemHref(surface, sectionPath as InterfaceStudioSection, slug);

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
