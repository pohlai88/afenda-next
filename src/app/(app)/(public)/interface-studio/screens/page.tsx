/**
 * `/interface-studio/screens` · Landing *section* catalog (domain `landing`); URL says "screens" to avoid confusion with site `/`
 */

import type { Metadata } from "next";

import { InterfaceStudioSectionIndex } from "@/app/(app)/(public)/interface-studio/_components/interface-studio-section-index";
import { assertInterfaceStudioSection } from "@/app/(app)/(public)/interface-studio/interface-studio.config";
import {
  filterInterfaceStudioCatalogItems,
  normalizeCatalogQuery,
} from "@/app/(app)/(public)/interface-studio/interface-studio.catalog-filter.shared";
import { getInterfaceStudioItems } from "@/app/(app)/(public)/interface-studio/interface-studio.preview";

import { INTERFACE_STUDIO_ROUTE_SURFACE } from "../interface-studio.route-surface";

const sectionId = "landing" as const;
const sectionConfig = assertInterfaceStudioSection(sectionId);

export const metadata: Metadata = {
  title: `${sectionConfig.title} · Interface Studio`,
  description: sectionConfig.description,
};

type PageProps = {
  searchParams: Promise<{ q?: string }>;
};

export default async function InterfaceStudioScreensIndexPage({ searchParams }: PageProps) {
  const q = normalizeCatalogQuery((await searchParams).q);
  const allItems = getInterfaceStudioItems(sectionId);
  const items = filterInterfaceStudioCatalogItems(allItems, q);

  return (
    <InterfaceStudioSectionIndex
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
