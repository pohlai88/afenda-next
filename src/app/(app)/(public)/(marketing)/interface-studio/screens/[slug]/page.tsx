/**
 * `/interface-studio/screens/[slug]` · detail for Interface Lab `landing` section (marketing path only)
 */

import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { InterfaceLabComponentDetailWorkspace } from "@/app/(app)/interface-lab/_components/interface-lab-component-detail-workspace.client";
import { InterfaceLabItemDetail } from "@/app/(app)/interface-lab/_components/interface-lab-item-detail";
import { InterfaceLabShell } from "@/app/(app)/interface-lab/_components/interface-lab-shell";
import { InterfaceLabStaticPreviewSurface } from "@/app/(app)/interface-lab/_components/interface-lab-static-preview-surface";
import { assertInterfaceLabSection } from "@/app/(app)/interface-lab/interface-lab.config";
import { getCachedInterfaceLabItem } from "@/app/(app)/interface-lab/interface-lab.data";
import { getInterfaceLabItems } from "@/app/(app)/interface-lab/interface-lab.preview";
import { buildInterfaceLabDetailMetadata } from "@/app/(app)/interface-lab/interface-lab.route-metadata";

import { INTERFACE_STUDIO_ROUTE_SURFACE } from "../../interface-studio.route-surface";

type Props = {
  params: Promise<{ slug: string }>;
};

const sectionId = "landing" as const;

export const dynamic = "force-static";
export const dynamicParams = false;

export async function generateStaticParams() {
  return getInterfaceLabItems(sectionId).map((item) => ({ slug: item.slug }));
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
    routeSurface: INTERFACE_STUDIO_ROUTE_SURFACE,
  });
}

export default async function InterfaceStudioScreensDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = getCachedInterfaceLabItem(sectionId, slug);

  if (!item) {
    notFound();
  }

  return (
    <InterfaceLabShell>
      <InterfaceLabShell.Header
        eyebrow="INTERFACE STUDIO / SCREEN"
        title={item.title}
        description={item.description}
        meta={
          <dl className="grid gap-3 sm:grid-cols-3">
            <div className="space-y-1">
              <dt className="text-xs font-medium uppercase tracking-[0.16em] text-foreground-muted">
                Section
              </dt>
              <dd className="text-sm font-medium text-foreground">Landing Screens</dd>
            </div>
            <div className="space-y-1">
              <dt className="text-xs font-medium uppercase tracking-[0.16em] text-foreground-muted">
                Category
              </dt>
              <dd className="text-sm font-medium text-foreground">{item.category}</dd>
            </div>
            <div className="space-y-1">
              <dt className="text-xs font-medium uppercase tracking-[0.16em] text-foreground-muted">
                Surface
              </dt>
              <dd className="text-sm font-medium text-foreground">Orientation entry</dd>
            </div>
          </dl>
        }
      />
      <InterfaceLabItemDetail
        item={item}
        routeSurface={INTERFACE_STUDIO_ROUTE_SURFACE}
        previewEyebrow="Canvas"
        previewBody={
          <InterfaceLabComponentDetailWorkspace
            previewLabel={item.preview?.label ?? item.title}
            previewDescription={
              item.preview?.description ?? "Narrative screen artboard for first-viewport exploration."
            }
            previewSurface={
              <InterfaceLabStaticPreviewSurface item={item} previewKindLabel="Narrative surface" />
            }
            manifestExcerpt={null}
            anatomy={item.studio?.anatomy ?? []}
          />
        }
      />
    </InterfaceLabShell>
  );
}
