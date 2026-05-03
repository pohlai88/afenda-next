"use client";

/**
 * @afenda-owner erp-runtime-workbench
 * @afenda-subject route
 * @afenda-artifact surface
 * @afenda-boundary client
 * @afenda-description Client island for the ERP Runtime Workbench route
 */
import { useState } from "react";

import {
  AppGridList,
  AppGridListItem,
  AppPanel,
  AppStatus,
  AppTab,
  AppTabList,
  AppTabPanel,
  AppTabPanels,
  AppTabs,
} from "@/components/ui/app.controls.primitive.client";
import {
  WorkbenchContractsScene,
  WorkbenchInspectorRail,
  WorkbenchMethodsScene,
  WorkbenchOverviewScene,
  WorkbenchProcurementScene,
} from "./erp-workbench.runtime.scenes.client";
import type {
  ErpRuntimeWorkbenchData,
  ProcurementStatusFilter,
  WorkbenchModeId,
} from "./erp-workbench.runtime.contract.shared";

function firstSelectionKey(keys: Iterable<React.Key>) {
  const [key] = [...keys];
  return key === undefined ? null : String(key);
}

export function ErpRuntimeWorkbench({
  workbench,
}: {
  workbench: ErpRuntimeWorkbenchData;
}) {
  const initialMode = workbench.modes[0];
  if (!initialMode) {
    throw new Error("ERP Runtime Workbench requires at least one mode.");
  }

  const [selectedModeId, setSelectedModeId] = useState<WorkbenchModeId>(
    initialMode.id,
  );
  const [selectedItemByMode, setSelectedItemByMode] = useState<
    Record<WorkbenchModeId, string>
  >(() => ({
    overview:
      workbench.modes.find((mode) => mode.id === "overview")?.defaultItemId ??
      "",
    contracts:
      workbench.modes.find((mode) => mode.id === "contracts")?.defaultItemId ??
      "",
    methods:
      workbench.modes.find((mode) => mode.id === "methods")?.defaultItemId ??
      "",
    procurement:
      workbench.modes.find((mode) => mode.id === "procurement")
        ?.defaultItemId ?? "",
  }));
  const [procurementQuery, setProcurementQuery] = useState("");
  const [procurementStatus, setProcurementStatus] =
    useState<ProcurementStatusFilter>("pending-review");
  const [selectedProcurementRowId, setSelectedProcurementRowId] = useState(
    workbench.procurementRows[0]?.id ?? "",
  );

  const selectedMode =
    workbench.modes.find((mode) => mode.id === selectedModeId) ?? initialMode;
  const modeItems = workbench.previewItems.filter(
    (item) => item.modeId === selectedMode.id,
  );
  const selectedItemId =
    selectedItemByMode[selectedMode.id] || selectedMode.defaultItemId;
  const selectedItem =
    modeItems.find((item) => item.id === selectedItemId) ?? modeItems[0];

  if (!selectedItem) {
    throw new Error(
      `ERP Runtime Workbench mode "${selectedMode.id}" has no items.`,
    );
  }

  const visibleProcurementRows = workbench.procurementRows.filter((row) => {
    if (procurementStatus !== "all" && row.status !== procurementStatus) {
      return false;
    }

    if (procurementQuery.length === 0) {
      return true;
    }

    const normalizedQuery = procurementQuery.toLowerCase();
    return (
      row.requestId.toLowerCase().includes(normalizedQuery) ||
      row.supplier.toLowerCase().includes(normalizedQuery)
    );
  });

  const effectiveSelectedProcurementRowId = visibleProcurementRows.some(
    (row) => row.id === selectedProcurementRowId,
  )
    ? selectedProcurementRowId
    : (visibleProcurementRows[0]?.id ?? "");

  const selectedProcurementRow = visibleProcurementRows.find(
    (row) => row.id === effectiveSelectedProcurementRowId,
  );

  return (
    <main className="bg-background text-foreground min-h-screen">
      <div className="mx-auto flex w-full max-w-[96rem] flex-col gap-6 px-6 py-8">
        <AppPanel className="space-y-4" tone="contrast">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
            <div className="space-y-2">
              <p className="type-kicker text-accent-strong">
                Afenda preview environment
              </p>
              <h1 className="type-page-title">{workbench.title}</h1>
              <p className="type-body-sm text-foreground-muted max-w-4xl">
                {workbench.description}
              </p>
            </div>
            <p className="type-body-sm text-foreground-muted max-w-2xl xl:text-right">
              {workbench.purpose}
            </p>
          </div>

          <div className="grid gap-3 md:grid-cols-3">
            {workbench.statusStrip.map((item) => (
              <AppPanel density="compact" key={item.id} tone="muted">
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <p className="type-label text-foreground">{item.label}</p>
                    <p className="type-body-sm text-foreground-muted">
                      {item.value}
                    </p>
                  </div>
                  <AppStatus tone={item.tone}>{item.label}</AppStatus>
                </div>
              </AppPanel>
            ))}
          </div>
        </AppPanel>

        <AppTabs
          aria-label="ERP Runtime Workbench modes"
          onSelectionChange={(key) =>
            setSelectedModeId(String(key) as WorkbenchModeId)
          }
          selectedKey={selectedModeId}
        >
          <AppTabList aria-label="Workbench modes">
            {workbench.modes.map((mode) => (
              <AppTab id={mode.id} key={mode.id}>
                {mode.label}
              </AppTab>
            ))}
          </AppTabList>

          <AppTabPanels>
            {workbench.modes.map((mode) => {
              const panelItems = workbench.previewItems.filter(
                (item) => item.modeId === mode.id,
              );
              const panelSelectedItemId =
                selectedItemByMode[mode.id] || mode.defaultItemId;
              const panelSelectedItem =
                panelItems.find((item) => item.id === panelSelectedItemId) ??
                panelItems[0];

              if (!panelSelectedItem) {
                return null;
              }

              return (
                <AppTabPanel id={mode.id} key={mode.id}>
                  <div className="grid gap-4 xl:grid-cols-[18rem_minmax(0,1fr)_22rem]">
                    <aside className="space-y-3">
                      <AppPanel className="space-y-3" density="compact">
                        <div className="space-y-1">
                          <p className="type-label text-foreground">
                            {mode.label}
                          </p>
                          <p className="type-body-sm text-foreground-muted">
                            {mode.description}
                          </p>
                        </div>
                        <AppGridList
                          aria-label={mode.selectorLabel}
                          onSelectionChange={(keys) => {
                            if (keys === "all") {
                              return;
                            }

                            const nextKey = firstSelectionKey(keys);
                            if (!nextKey) {
                              return;
                            }

                            const nextItem = panelItems.find(
                              (item) => item.id === nextKey,
                            );

                            setSelectedItemByMode((current) => ({
                              ...current,
                              [mode.id]: nextKey,
                            }));

                            if (
                              mode.id === "procurement" &&
                              nextItem?.defaultProcurementStatus !== undefined
                            ) {
                              setProcurementStatus(
                                nextItem.defaultProcurementStatus,
                              );
                            }
                          }}
                          selectedKeys={new Set([panelSelectedItem.id])}
                          selectionBehavior="replace"
                          selectionMode="single"
                        >
                          {panelItems.map((item) => (
                            <AppGridListItem
                              id={item.id}
                              key={item.id}
                              textValue={item.name}
                            >
                              <div className="space-y-2">
                                <div className="flex items-start justify-between gap-3">
                                  <div className="space-y-1">
                                    <p className="type-label text-foreground">
                                      {item.name}
                                    </p>
                                    <p className="type-body-sm text-foreground-muted">
                                      {item.subtitle}
                                    </p>
                                  </div>
                                  <AppStatus tone={item.badgeTone}>
                                    {item.badgeLabel}
                                  </AppStatus>
                                </div>
                                <p className="type-body-sm text-foreground-muted">
                                  {item.summary}
                                </p>
                              </div>
                            </AppGridListItem>
                          ))}
                        </AppGridList>
                      </AppPanel>
                    </aside>

                    <section className="min-w-0">
                      {mode.id === "overview" ? (
                        <WorkbenchOverviewScene
                          cards={workbench.overviewCards}
                          selectedItem={panelSelectedItem}
                        />
                      ) : null}
                      {mode.id === "contracts" ? (
                        <WorkbenchContractsScene
                          selectedItem={panelSelectedItem}
                        />
                      ) : null}
                      {mode.id === "methods" ? (
                        <WorkbenchMethodsScene
                          selectedItem={panelSelectedItem}
                        />
                      ) : null}
                      {mode.id === "procurement" ? (
                        <WorkbenchProcurementScene
                          onQueryChange={setProcurementQuery}
                          onRowSelectionChange={setSelectedProcurementRowId}
                          onStatusChange={setProcurementStatus}
                          query={procurementQuery}
                          rows={visibleProcurementRows}
                          selectedRowId={effectiveSelectedProcurementRowId}
                          selectedStatus={procurementStatus}
                        />
                      ) : null}
                    </section>

                    <aside className="xl:sticky xl:top-6 xl:self-start">
                      <WorkbenchInspectorRail
                        modeId={mode.id}
                        selectedItem={panelSelectedItem}
                        {...(mode.id === "procurement" &&
                        selectedProcurementRow !== undefined
                          ? { selectedRow: selectedProcurementRow }
                          : {})}
                      />
                    </aside>
                  </div>
                </AppTabPanel>
              );
            })}
          </AppTabPanels>
        </AppTabs>
      </div>
    </main>
  );
}
