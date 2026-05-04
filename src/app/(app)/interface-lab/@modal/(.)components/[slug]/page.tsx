/**
 * @afenda-owner interface-lab
 * @afenda-subject intercept-modal
 * @afenda-boundary server
 * @afenda-description Soft-navigation modal preview for component detail (parallel @modal slot).
 */
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { uiComponentRegistryById } from "@/components/ui-governance/governance.ui.registry.shared";

import { InterfaceLabComponentDetailContent } from "../../../_components/interface-lab-component-detail.content";
import { InterfaceLabComponentInterceptModal } from "../../../_components/interface-lab-component-intercept-modal.client";
import { assertInterfaceLabSection } from "../../../interface-lab.config";
import { getCachedInterfaceLabItem } from "../../../interface-lab.data";
import { getInterfaceLabComponentSlugParams } from "../../../interface-lab.components.static-params";
import { toInterfaceLabManifestExcerpt } from "../../../interface-lab.manifest-excerpt";
import { buildInterfaceLabDetailMetadata } from "../../../interface-lab.route-metadata";

type Props = {
  params: Promise<{ slug: string }>;
};

const sectionId = "components" as const;

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return getInterfaceLabComponentSlugParams();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const section = assertInterfaceLabSection(sectionId);
  const item = getCachedInterfaceLabItem(sectionId, slug);

  return buildInterfaceLabDetailMetadata({
    sectionLabel: section.title,
    sectionPath: sectionId,
    slug,
    item,
  });
}

export default async function InterfaceLabComponentInterceptedModalPage({
  params,
}: Props) {
  const { slug } = await params;
  const item = getCachedInterfaceLabItem(sectionId, slug);

  if (!item) {
    notFound();
  }

  const registryId = item.registryId;
  const manifest =
    registryId !== undefined ? uiComponentRegistryById[registryId] : undefined;
  const manifestExcerpt =
    manifest !== undefined ? toInterfaceLabManifestExcerpt(manifest) : null;

  const fullPageHref = `/interface-lab/components/${slug}`;

  return (
    <InterfaceLabComponentInterceptModal fullPageHref={fullPageHref}>
      <InterfaceLabComponentDetailContent
        item={item}
        registryId={registryId}
        manifestExcerpt={manifestExcerpt}
      />
    </InterfaceLabComponentInterceptModal>
  );
}
