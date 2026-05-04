/**
 * `/interface-studio/screens` · Landing *section* catalog (domain `landing`); URL says "screens" to avoid confusion with site `/`
 */

import type { Metadata } from "next";

import { InterfaceLabSectionIndex } from "@/app/(app)/interface-lab/_components/interface-lab-section-index";
import { assertInterfaceLabSection } from "@/app/(app)/interface-lab/interface-lab.config";
import {
  filterInterfaceLabCatalogItems,
  normalizeCatalogQuery,
} from "@/app/(app)/interface-lab/interface-lab.catalog-filter.shared";
import { getInterfaceLabItems } from "@/app/(app)/interface-lab/interface-lab.preview";

import { INTERFACE_STUDIO_ROUTE_SURFACE } from "../interface-studio.route-surface";

const sectionId = "landing" as const;
const sectionConfig = assertInterfaceLabSection(sectionId);

export const metadata: Metadata = {
  title: `${sectionConfig.title} · Interface Studio`,
  description: sectionConfig.description,
};

type PageProps = {
  searchParams: Promise<{ q?: string }>;
};

export default async function InterfaceStudioScreensIndexPage({ searchParams }: PageProps) {
  const q = normalizeCatalogQuery((await searchParams).q);
  const allItems = getInterfaceLabItems(sectionId);
  const items = filterInterfaceLabCatalogItems(allItems, q);

  return (
    <InterfaceLabSectionIndex
      section={sectionId}
      eyebrow="INTERFACE STUDIO / SCREENS"
      title={sectionConfig.title}
      description="Narrative screens, product-story artboards, and export-ready first views."
      allItems={allItems}
      items={items}
      routeSurface={INTERFACE_STUDIO_ROUTE_SURFACE}
    />
  );
}
