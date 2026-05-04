import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { InterfaceLabComponentDetailWorkspace } from "../../_components/interface-lab-component-detail-workspace.client";
import { InterfaceLabItemDetail } from "../../_components/interface-lab-item-detail";
import { InterfaceLabShell } from "../../_components/interface-lab-shell";
import { InterfaceLabStaticPreviewSurface } from "../../_components/interface-lab-static-preview-surface";
import { assertInterfaceLabSection } from "../../interface-lab.config";
import { getCachedInterfaceLabItem } from "../../interface-lab.data";
import { getInterfaceLabItems } from "../../interface-lab.preview";
import { buildInterfaceLabDetailMetadata } from "../../interface-lab.route-metadata";

type Props = {
  params: Promise<{ slug: string }>;
};

const sectionId = "dashboard" as const;

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
  });
}

export default async function InterfaceLabDashboardDetailPage({ params }: Props) {
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
              <dd className="text-sm font-medium text-foreground">Command Screens</dd>
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
              <dd className="text-sm font-medium text-foreground">Command artboard</dd>
            </div>
          </dl>
        }
      />
      <InterfaceLabItemDetail
        item={item}
        previewEyebrow="Canvas"
        previewBody={
          <InterfaceLabComponentDetailWorkspace
            previewLabel={item.preview?.label ?? item.title}
            previewDescription={
              item.preview?.description ??
              "Command screen artboard for dense console, exception, and state variants."
            }
            previewSurface={
              <InterfaceLabStaticPreviewSurface
                item={item}
                previewKindLabel="Command screen"
              />
            }
            manifestExcerpt={null}
            anatomy={item.studio?.anatomy ?? []}
          />
        }
      />
    </InterfaceLabShell>
  );
}
