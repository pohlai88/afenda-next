/**
 * @afenda-owner interface-lab
 * @afenda-subject component-detail
 * @afenda-boundary client
 * @afenda-description Canvas / Usage / Accessibility / Layers tabs for studio workspaces.
 */
"use client";

import type { ReactNode } from "react";

import {
  AppTab,
  AppTabList,
  AppTabPanel,
  AppTabPanels,
  AppTabs,
} from "@/components/ui-governance/app-tabs/app-tabs.control.primitive.client";

import type { InterfaceLabManifestExcerpt } from "../interface-lab.manifest-excerpt";

export type InterfaceLabComponentDetailWorkspaceProps = {
  previewLabel: string;
  previewDescription: string;
  previewSurface: ReactNode;
  manifestExcerpt: InterfaceLabManifestExcerpt | null;
  anatomy?: string[];
};

export function InterfaceLabComponentDetailWorkspace({
  previewLabel,
  previewDescription,
  previewSurface,
  manifestExcerpt,
  anatomy = [],
}: InterfaceLabComponentDetailWorkspaceProps) {
  const hasManifestExcerpt = manifestExcerpt !== null;
  const hasAnatomy = anatomy.length > 0;

  const previewIntro = (
    <div className="space-y-3 text-foreground">
      <div className="flex flex-wrap items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-foreground-muted">
        <span className="rounded-full border border-border bg-background px-2.5 py-1 text-foreground">
          Live artboard
        </span>
        {hasManifestExcerpt ? (
          <span className="rounded-full border border-border bg-background px-2.5 py-1">
            {manifestExcerpt.boundary} boundary
          </span>
        ) : null}
        {hasAnatomy ? (
          <span className="rounded-full border border-border bg-background px-2.5 py-1">
            {anatomy.length} layers
          </span>
        ) : null}
      </div>
      <h2 className="text-2xl font-semibold tracking-tight">{previewLabel}</h2>
      <p className="text-sm leading-6 text-foreground-muted">{previewDescription}</p>
    </div>
  );

  if (!hasManifestExcerpt && !hasAnatomy) {
    return (
      <div className="space-y-4 text-foreground-muted">
        {previewIntro}
        {previewSurface}
      </div>
    );
  }

  return (
    <AppTabs defaultSelectedKey="preview" className="w-full max-w-full">
      <AppTabList aria-label="Template workspace">
        <AppTab id="preview">Canvas</AppTab>
        {hasManifestExcerpt ? <AppTab id="usage">Usage</AppTab> : null}
        {hasManifestExcerpt ? <AppTab id="a11y">A11y</AppTab> : null}
        {hasAnatomy ? <AppTab id="anatomy">Layers</AppTab> : null}
      </AppTabList>
      <AppTabPanels>
        <AppTabPanel id="preview" className="pt-4">
          <div className="space-y-4">
            {previewIntro}
            {previewSurface}
          </div>
        </AppTabPanel>
        {hasManifestExcerpt ? (
          <AppTabPanel id="usage" className="pt-4">
            <UsagePanel excerpt={manifestExcerpt} />
          </AppTabPanel>
        ) : null}
        {hasManifestExcerpt ? (
          <AppTabPanel id="a11y" className="pt-4">
            <A11yPanel excerpt={manifestExcerpt} />
          </AppTabPanel>
        ) : null}
        {hasAnatomy ? (
          <AppTabPanel id="anatomy" className="pt-4">
            <AnatomyPanel anatomy={anatomy} />
          </AppTabPanel>
        ) : null}
      </AppTabPanels>
    </AppTabs>
  );
}

function UsagePanel({ excerpt }: { excerpt: InterfaceLabManifestExcerpt }) {
  return (
    <div className="space-y-6 text-sm text-foreground">
      <dl className="space-y-3">
        <div className="flex flex-col gap-1">
          <dt className="text-foreground-muted">Export</dt>
          <dd className="font-mono text-xs">{excerpt.exportName}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-foreground-muted">Registry status</dt>
          <dd className="capitalize">{excerpt.status}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-foreground-muted">Boundary</dt>
          <dd className="capitalize">{excerpt.boundary}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-foreground-muted">Category</dt>
          <dd className="capitalize">{excerpt.category}</dd>
        </div>
        <div className="flex flex-col gap-1">
          <dt className="text-foreground-muted">Source</dt>
          <dd className="break-all font-mono text-xs">{excerpt.sourcePath}</dd>
        </div>
      </dl>
      {excerpt.useWhen.length > 0 ? (
        <div>
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.16em] text-foreground-muted">
            Use when
          </p>
          <ul className="list-inside list-disc space-y-1 text-foreground-muted">
            {excerpt.useWhen.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>
      ) : null}
      {excerpt.avoidWhen.length > 0 ? (
        <div>
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.16em] text-foreground-muted">
            Avoid when
          </p>
          <ul className="list-inside list-disc space-y-1 text-foreground-muted">
            {excerpt.avoidWhen.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

function A11yPanel({ excerpt }: { excerpt: InterfaceLabManifestExcerpt }) {
  return (
    <div className="space-y-6 text-sm">
      <div>
        <p className="mb-2 text-xs font-medium uppercase tracking-[0.16em] text-foreground-muted">
          React Aria primitives
        </p>
        {excerpt.reactAriaPrimitives.length > 0 ? (
          <p className="text-foreground">{excerpt.reactAriaPrimitives.join(", ")}</p>
        ) : (
          <p className="text-foreground-muted">None listed.</p>
        )}
      </div>
      <div>
        <p className="mb-2 text-xs font-medium uppercase tracking-[0.16em] text-foreground-muted">
          Accessibility
        </p>
        <p className="text-foreground-muted">
          Required: <span className="text-foreground">{excerpt.a11yRequired ? "yes" : "no"}</span>
        </p>
        {excerpt.a11yNotes.length > 0 ? (
          <ul className="mt-2 list-inside list-disc space-y-1 text-foreground-muted">
            {excerpt.a11yNotes.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        ) : (
          <p className="mt-2 text-foreground-muted">No additional notes.</p>
        )}
      </div>
    </div>
  );
}

function AnatomyPanel({ anatomy }: { anatomy: string[] }) {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {anatomy.map((line) => (
        <div
          key={line}
          className="rounded-(--radius-control) border border-border bg-background/70 p-4 text-sm text-foreground"
        >
          {line}
        </div>
      ))}
    </div>
  );
}
