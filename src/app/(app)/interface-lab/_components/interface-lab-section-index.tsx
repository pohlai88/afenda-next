import { Suspense } from "react";
import Link from "next/link";

import { InterfaceLabCatalogGrid } from "./interface-lab-catalog-grid";
import { InterfaceLabCatalogToolbar } from "./interface-lab-catalog-toolbar.client";
import { InterfaceLabShell } from "./interface-lab-shell";
import type { InterfaceLabRouteSurface } from "../interface-lab.routes.shared";
import {
  buildInterfaceLabItemHref,
  buildInterfaceLabStudioHomeHref,
} from "../interface-lab.routes.shared";
import {
  getInterfaceLabFocusItems,
  getInterfaceLabStudioItemCounts,
  getInterfaceLabTemplateGroups,
} from "../interface-lab.studio.shared";
import type { InterfaceLabItem, InterfaceLabSection } from "../interface-lab.types";
import { getInterfaceLabStatusBadgeClassName } from "../interface-lab.status.shared";

type InterfaceLabSectionIndexProps = {
  section: InterfaceLabSection;
  eyebrow: string;
  title: string;
  description: string;
  allItems: InterfaceLabItem[];
  items: InterfaceLabItem[];
  enableCatalogQuery?: boolean;
  routeSurface?: InterfaceLabRouteSurface;
};

function PropertyRow({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-border py-3 last:border-b-0">
      <dt className="text-sm text-foreground-muted">{label}</dt>
      <dd className="text-sm font-medium text-foreground">{value}</dd>
    </div>
  );
}

export function InterfaceLabSectionIndex({
  section,
  eyebrow,
  title,
  description,
  allItems,
  items,
  enableCatalogQuery = true,
  routeSurface = "lab",
}: InterfaceLabSectionIndexProps) {
  const counts = getInterfaceLabStudioItemCounts(allItems);
  const focusItems = getInterfaceLabFocusItems(allItems, 4);
  const templateGroups = getInterfaceLabTemplateGroups(items);

  return (
    <InterfaceLabShell>
      <InterfaceLabShell.Header
        eyebrow={eyebrow}
        title={title}
        description={description}
        meta={
          <dl className="grid gap-3 sm:grid-cols-3">
            <div className="space-y-1">
              <dt className="text-xs font-medium uppercase tracking-[0.16em] text-foreground-muted">
                Visible
              </dt>
              <dd className="text-sm font-medium text-foreground">{items.length} templates</dd>
            </div>
            <div className="space-y-1">
              <dt className="text-xs font-medium uppercase tracking-[0.16em] text-foreground-muted">
                Kinds
              </dt>
              <dd className="text-sm font-medium text-foreground">
                {templateGroups.length} groups
              </dd>
            </div>
            <div className="space-y-1">
              <dt className="text-xs font-medium uppercase tracking-[0.16em] text-foreground-muted">
                Remix
              </dt>
              <dd className="text-sm font-medium text-foreground">
                {focusItems.length} active variants
              </dd>
            </div>
          </dl>
        }
        actions={
          <Link
            href={buildInterfaceLabStudioHomeHref(routeSurface)}
            className="rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground-muted transition hover:border-border-strong hover:text-foreground"
          >
            Studio
          </Link>
        }
      />

      <InterfaceLabShell.Workbench
        rail={
          <InterfaceLabShell.LibraryRail
            title="Layers"
            description="Template search, source shortcuts, and active layer counts."
          >
            <div className="space-y-5">
              {enableCatalogQuery === true ? (
                <div className="space-y-2">
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-foreground-muted">
                    Search
                  </p>
                  <Suspense
                    fallback={
                      <div className="h-10 animate-pulse rounded-full bg-surface-muted" aria-hidden />
                    }
                  >
                    <InterfaceLabCatalogToolbar aria-label={`Filter ${title} templates`} />
                  </Suspense>
                </div>
              ) : null}

              <div className="space-y-2">
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-foreground-muted">
                  Sources
                </p>
                <InterfaceLabShell.SectionNav activeSection={section} routeSurface={routeSurface} />
              </div>

              <dl className="grid gap-0 rounded-(--radius-panel) border border-border bg-background/70 px-4 text-sm">
                <PropertyRow label="Templates" value={counts.total} />
                <PropertyRow label="Ready" value={counts.approved} />
                <PropertyRow label="Variants" value={counts.candidate + counts.experimental} />
              </dl>
            </div>
          </InterfaceLabShell.LibraryRail>
        }
        canvas={
          <InterfaceLabShell.Artboard
            eyebrow="Templates"
            title={`${title} library`}
            description={`${items.length} of ${allItems.length} templates are visible, grouped by kind with prompts and export properties.`}
            toolbar={<InterfaceLabShell.FloatingCanvasControls activeControl="Grid" />}
          >
            <div className="space-y-7">
              {templateGroups.length > 0 ? (
                templateGroups.map((group) => (
                  <section key={group.kind} className="space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <p className="text-xs font-medium uppercase tracking-[0.18em] text-foreground-muted">
                          {group.kind}
                        </p>
                        <h2 className="mt-1 text-xl font-semibold tracking-tight text-foreground">
                          {group.label}
                        </h2>
                      </div>
                      <span className="rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-medium text-foreground-muted">
                        {group.count} templates
                      </span>
                    </div>
                    <InterfaceLabCatalogGrid
                      section={section}
                      items={group.items}
                      routeSurface={routeSurface}
                    />
                  </section>
                ))
              ) : (
                <div className="rounded-(--radius-panel) border border-dashed border-border bg-surface p-6 text-sm text-foreground-muted">
                  No templates match this search.
                </div>
              )}
            </div>
          </InterfaceLabShell.Artboard>
        }
        inspector={
          <InterfaceLabShell.PropertiesPanel
            selectedLabel={`${title} library`}
            description="Properties for the visible template source."
          >
            <dl className="grid gap-0 rounded-(--radius-panel) border border-border bg-background/70 px-4">
              <PropertyRow label="Visible" value={items.length} />
              <PropertyRow label="Approved" value={counts.approved} />
              <PropertyRow label="Candidate" value={counts.candidate} />
              <PropertyRow label="Experimental" value={counts.experimental} />
              <PropertyRow label="Deprecated" value={counts.deprecated} />
            </dl>

            <section className="space-y-3">
              <h2 className="text-xs font-medium uppercase tracking-[0.16em] text-foreground-muted">
                Remix queue
              </h2>
              {focusItems.length > 0 ? (
                <div className="space-y-3">
                  {focusItems.map((item) => (
                    <Link
                      key={item.slug}
                      href={buildInterfaceLabItemHref(routeSurface, section, item.slug)}
                      className="block rounded-(--radius-control) border border-border bg-background/70 p-3 transition hover:border-border-strong hover:bg-surface-muted"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-sm font-medium text-foreground">{item.title}</p>
                          <p className="mt-1 text-sm leading-6 text-foreground-muted">
                            {item.studio?.remixPrompts?.[0] ?? item.description}
                          </p>
                        </div>
                        <span className={getInterfaceLabStatusBadgeClassName(item.status)}>
                          {item.status}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-sm leading-6 text-foreground-muted">
                  No candidate or experimental templates in this source.
                </p>
              )}
            </section>
          </InterfaceLabShell.PropertiesPanel>
        }
      />
    </InterfaceLabShell>
  );
}
