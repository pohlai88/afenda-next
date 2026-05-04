import type { Metadata } from "next";

import { InterfaceLabSectionIndex } from "../_components/interface-lab-section-index";
import { assertInterfaceLabSection } from "../interface-lab.config";
import {
  filterInterfaceLabCatalogItems,
  normalizeCatalogQuery,
} from "../interface-lab.catalog-filter.shared";
import { getInterfaceLabItems } from "../interface-lab.preview";

const sectionId = "landing" as const;
const sectionConfig = assertInterfaceLabSection(sectionId);

export const metadata: Metadata = {
  title: `${sectionConfig.title} · Interface Studio`,
  description: sectionConfig.description,
};

type PageProps = {
  searchParams: Promise<{ q?: string }>;
};

export default async function InterfaceLabLandingIndexPage({
  searchParams,
}: PageProps) {
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
    />
  );
}
