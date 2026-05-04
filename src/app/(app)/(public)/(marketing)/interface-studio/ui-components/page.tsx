/**
 * `/interface-studio/ui-components` · Async RSC; `searchParams.q` drives catalog filtering
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

const sectionId = "components" as const;
const sectionConfig = assertInterfaceLabSection(sectionId);

export const metadata: Metadata = {
  title: `${sectionConfig.title} · Interface Studio`,
  description: sectionConfig.description,
};

type PageProps = {
  searchParams: Promise<{ q?: string }>;
};

export default async function InterfaceStudioComponentsPage({ searchParams }: PageProps) {
  const q = normalizeCatalogQuery((await searchParams).q);
  const allItems = getInterfaceLabItems(sectionId);
  const items = filterInterfaceLabCatalogItems(allItems, q);

  return (
    <InterfaceLabSectionIndex
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
