/**
 * `/interface-studio/ui-components` · Async RSC; `searchParams.q` drives catalog filtering
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

const sectionId = "components" as const;
const sectionConfig = assertInterfaceStudioSection(sectionId);

export const metadata: Metadata = {
  title: `${sectionConfig.title} · Interface Studio`,
  description: sectionConfig.description,
};

type PageProps = {
  searchParams: Promise<{ q?: string }>;
};

export default async function InterfaceStudioComponentsPage({ searchParams }: PageProps) {
  const q = normalizeCatalogQuery((await searchParams).q);
  const allItems = getInterfaceStudioItems(sectionId);
  const items = filterInterfaceStudioCatalogItems(allItems, q);

  return (
    <InterfaceStudioSectionIndex
      section={sectionId}
      eyebrow="INTERFACE STUDIO / COMPONENTS"
      title={sectionConfig.title}
      description={sectionConfig.description}
      allItems={allItems}
      items={items}
      routeSurface={INTERFACE_STUDIO_ROUTE_SURFACE}
    />
  );
}
