import type { Metadata } from "next";

import { InterfaceLabSectionIndex } from "../_components/interface-lab-section-index";
import { assertInterfaceLabSection } from "../interface-lab.config";
import {
  filterInterfaceLabCatalogItems,
  normalizeCatalogQuery,
} from "../interface-lab.catalog-filter.shared";
import { getInterfaceLabItems } from "../interface-lab.preview";

const sectionId = "components" as const;
const sectionConfig = assertInterfaceLabSection(sectionId);

export const metadata: Metadata = {
  title: `${sectionConfig.title} · Interface Studio`,
  description: sectionConfig.description,
};

type PageProps = {
  searchParams: Promise<{ q?: string }>;
};

export default async function InterfaceLabComponentsPage({
  searchParams,
}: PageProps) {
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
    />
  );
}
