import type { ReactNode } from "react";
import Link from "next/link";

import { assertInterfaceStudioSection } from "../interface-studio.config";
import type { InterfaceStudioRouteSurface } from "../interface-studio.routes.shared";
import { buildInterfaceStudioSectionIndexHref } from "../interface-studio.routes.shared";
import { getInterfaceStudioStatusBadgeClassName } from "../interface-studio.status.shared";
import { getInterfaceStudioItemTemplateKind } from "../interface-studio.studio.shared";
import type { InterfaceStudioItem } from "../interface-studio.types";
import { InterfaceStudioShell } from "./interface-studio-shell";

type InterfaceStudioItemDetailProps = {
  item: InterfaceStudioItem;
  previewEyebrow: string;
  previewBody: ReactNode;
  aside?: ReactNode;
  asideAppend?: ReactNode;
  articleClassName?: string;
  routeSurface?: InterfaceStudioRouteSurface;
};

function InspectorSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="space-y-3 rounded-(--radius-control) border border-border bg-background/70 p-4">
      <h3 className="text-xs font-medium uppercase tracking-[0.16em] text-foreground-muted">
        {title}
      </h3>
      {children}
    </section>
  );
}

function PropertyRow({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-border py-3 last:border-b-0">
      <dt className="text-sm text-foreground-muted">{label}</dt>
      <dd className="max-w-[12rem] text-right text-sm font-medium text-foreground">{value}</dd>
    </div>
  );
}

export function InterfaceStudioItemDetail({
  item,
  previewEyebrow,
  previewBody,
  aside,
  asideAppend,
  articleClassName,
  routeSurface = "studio",
}: InterfaceStudioItemDetailProps) {
  const section = assertInterfaceStudioSection(item.section);
  const sectionIndexHref = buildInterfaceStudioSectionIndexHref(routeSurface, item.section);
  const templateKind = getInterfaceStudioItemTemplateKind(item);
  const studioProperties = item.studio?.properties;

  const defaultAside = (
    <>
      <InspectorSection title="Selected item">
        <dl className="grid gap-0 rounded-(--radius-control) border border-border bg-surface px-4 text-sm">
          <PropertyRow
            label="Status"
            value={<span className={getInterfaceStudioStatusBadgeClassName(item.status)}>{item.status}</span>}
          />
          <PropertyRow label="Template" value={templateKind} />
          <PropertyRow label="Category" value={item.category} />
          <PropertyRow label="Slug" value={<span className="font-mono text-xs">{item.slug}</span>} />
        </dl>
      </InspectorSection>

      <InspectorSection title="Properties">
        <dl className="grid gap-0 rounded-(--radius-control) border border-border bg-surface px-4 text-sm">
          <PropertyRow label="Viewport" value={studioProperties?.viewport ?? "Responsive"} />
          <PropertyRow label="Density" value={studioProperties?.density ?? "Balanced"} />
          <PropertyRow label="Motion" value={studioProperties?.motion ?? "Static"} />
          <PropertyRow label="Data state" value={studioProperties?.dataState ?? "Sample"} />
          <PropertyRow label="Tokens" value={studioProperties?.tokenUsage ?? "Semantic tokens"} />
          <PropertyRow
            label="Export"
            value={studioProperties?.exportReadiness ?? "Prototype-ready"}
          />
        </dl>
      </InspectorSection>

      {item.tags && item.tags.length > 0 ? (
        <InspectorSection title="Tags">
          <div className="flex flex-wrap gap-2">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border bg-surface px-2.5 py-1 text-xs text-foreground-muted"
              >
                {tag}
              </span>
            ))}
          </div>
        </InspectorSection>
      ) : null}

      {item.studio?.remixPrompts && item.studio.remixPrompts.length > 0 ? (
        <InspectorSection title="Remix prompts">
          <ul className="space-y-2 text-sm text-foreground">
            {item.studio.remixPrompts.map((line) => (
              <li
                key={line}
                className="rounded-(--radius-control) border border-border bg-surface px-3 py-2"
              >
                {line}
              </li>
            ))}
          </ul>
        </InspectorSection>
      ) : null}

      {item.studio?.exportTargets && item.studio.exportTargets.length > 0 ? (
        <InspectorSection title="Export targets">
          <div className="flex flex-wrap gap-2">
            {item.studio.exportTargets.map((target) => (
              <span
                key={target}
                className="rounded-full border border-border bg-surface px-2.5 py-1 text-xs text-foreground-muted"
              >
                {target}
              </span>
            ))}
          </div>
        </InspectorSection>
      ) : null}

      {item.studio?.evidence && item.studio.evidence.length > 0 ? (
        <InspectorSection title="Source">
          <ul className="space-y-2 text-sm text-foreground-muted">
            {item.studio.evidence.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </InspectorSection>
      ) : null}

      {asideAppend ? <InspectorSection title="Registry source">{asideAppend}</InspectorSection> : null}
    </>
  );

  return (
    <article className={articleClassName}>
      <InterfaceStudioShell.Workbench
        rail={
          <InterfaceStudioShell.LibraryRail
            title="Layers"
            description="Selected template layers and source navigation."
          >
            <div className="space-y-4">
              <div className="rounded-(--radius-panel) border border-border bg-background/70 p-4">
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-foreground-muted">
                  Selected
                </p>
                <p className="mt-2 text-sm font-medium text-foreground">{item.title}</p>
                <p className="mt-2 text-sm leading-6 text-foreground-muted">
                  {item.studio?.canvasPreset ?? item.description}
                </p>
              </div>

              {item.studio?.anatomy && item.studio.anatomy.length > 0 ? (
                <section className="space-y-2">
                  <p className="text-xs font-medium uppercase tracking-[0.16em] text-foreground-muted">
                    Layer tree
                  </p>
                  {item.studio.anatomy.map((layer, index) => (
                    <div
                      key={layer}
                      className="flex items-center gap-3 rounded-(--radius-control) border border-border bg-background/70 px-3 py-2"
                    >
                      <span className="flex size-6 items-center justify-center rounded-full border border-border bg-surface text-xs text-foreground-muted">
                        {index + 1}
                      </span>
                      <span className="text-sm text-foreground">{layer}</span>
                    </div>
                  ))}
                </section>
              ) : null}

              <Link
                href={sectionIndexHref}
                className="block rounded-(--radius-control) border border-border bg-background/70 px-3 py-3 text-sm font-medium text-foreground transition hover:border-border-strong hover:bg-surface-muted"
              >
                Back to {section.title}
              </Link>
            </div>
          </InterfaceStudioShell.LibraryRail>
        }
        canvas={
          <InterfaceStudioShell.Artboard
            eyebrow={previewEyebrow}
            title={item.title}
            description={item.studio?.canvasPreset ?? item.description}
            className="min-h-full"
            toolbar={<InterfaceStudioShell.FloatingCanvasControls />}
            meta={
              <span className={getInterfaceStudioStatusBadgeClassName(item.status)}>
                {item.status}
              </span>
            }
          >
            {previewBody}
          </InterfaceStudioShell.Artboard>
        }
        inspector={
          <InterfaceStudioShell.PropertiesPanel
            selectedLabel={item.title}
            description="Properties, prompts, source, and export readiness for this template."
          >
            {aside ?? defaultAside}
          </InterfaceStudioShell.PropertiesPanel>
        }
      />
    </article>
  );
}
