"use client";

import { AppPanel, AppStatus } from "@/components/ui/app-controls";
import type { WorkbenchItem } from "@/erp-workbench/workbench-types";

function statusTone(status: WorkbenchItem["status"]) {
  switch (status) {
    case "approved":
      return "success";
    case "draft":
      return "warning";
    case "deprecated":
      return "danger";
  }
}

function categoryLabel(category: WorkbenchItem["category"]) {
  switch (category) {
    case "primitive":
      return "Primitive";
    case "pattern":
      return "Pattern";
    case "scene":
      return "Scene";
    case "contract":
      return "Contract";
  }
}

export function WorkbenchInspector({ item }: { item: WorkbenchItem }) {
  return (
    <AppPanel
      aria-label="Component Inspector"
      className="space-y-5"
      tone="contrast"
    >
      <div className="space-y-2">
        <p className="type-kicker text-accent-strong">Inspector</p>
        <h2 className="type-section-title text-foreground">
          Component Inspector
        </h2>
        <p className="type-body-sm text-foreground-muted">
          The active selection defines the approved Afenda UI contract for this
          surface.
        </p>
      </div>

      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <AppStatus tone={statusTone(item.status)}>{item.status}</AppStatus>
          <AppStatus tone="info">{categoryLabel(item.category)}</AppStatus>
        </div>
        <div className="space-y-1">
          <h3 className="type-panel-title text-foreground">{item.name}</h3>
          <p className="type-body-sm text-foreground-muted">
            {item.category === "scene"
              ? "Realistic ERP workflow slice."
              : item.category === "pattern"
                ? "Approved ERP composition."
                : item.category === "contract"
                  ? "Workbench coverage and approval surface."
                  : "Approved shared UI primitive."}
          </p>
        </div>
      </div>

      <InspectorBlock
        body="The selected item represents the current approved implementation target for this workflow shape."
        title="What is this?"
      />

      <InspectorList items={item.useWhen} title="Use when" />
      <InspectorList items={item.doNotUseWhen} title="Do not use when" />
      <InspectorList items={item.ariaPrimitives} title="React Aria" />
      <InspectorList items={item.states} title="Approved states" />
      <InspectorList items={item.tokens} title="Semantic tokens" />

      <InspectorBlock body={item.sourcePath} monospace title="Source" />
    </AppPanel>
  );
}

function InspectorBlock({
  body,
  monospace = false,
  title,
}: {
  body: string;
  monospace?: boolean;
  title: string;
}) {
  return (
    <div className="space-y-2">
      <p className="type-label text-foreground">{title}</p>
      <div className="border-border bg-surface rounded-[var(--radius-control)] border p-3">
        <p
          className={
            monospace
              ? "type-meta text-foreground font-mono break-all"
              : "type-body-sm text-foreground-muted"
          }
        >
          {body}
        </p>
      </div>
    </div>
  );
}

function InspectorList({ items, title }: { items: string[]; title: string }) {
  return (
    <div className="space-y-2">
      <p className="type-label text-foreground">{title}</p>
      <div className="border-border bg-surface rounded-[var(--radius-control)] border p-3">
        <ul className="space-y-2">
          {items.map((item) => (
            <li className="type-body-sm text-foreground-muted" key={item}>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
