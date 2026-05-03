"use client";

/**
 * @afenda-owner erp-workbench
 * @afenda-subject runtime
 * @afenda-artifact scenes
 * @afenda-boundary client
 * @afenda-description Client scene renderers for the ERP Runtime Workbench route
 */
import {
  AppButton,
  AppCell,
  AppColumn,
  AppDialog,
  AppPanel,
  AppSearchField,
  AppSelectField,
  AppStatus,
  AppTable,
  AppTableBody,
  AppTableHeader,
  AppRow,
  AppToolbar,
} from "@/components/ui/app.controls.primitive.client";
import type {
  WorkbenchContractProofItem,
  ProcurementStatusFilter,
  WorkbenchModeId,
  WorkbenchOverviewCard,
  WorkbenchPreviewItem,
  WorkbenchProcurementRow,
} from "./erp-workbench.runtime.contract.shared";

function toneForProcurementStatus(
  status: WorkbenchProcurementRow["status"],
): "warning" | "danger" | "success" | "neutral" {
  switch (status) {
    case "pending-review":
      return "warning";
    case "policy-hold":
      return "danger";
    case "approved":
      return "success";
    case "rejected":
      return "neutral";
  }
}

function procurementStatusLabel(status: WorkbenchProcurementRow["status"]) {
  switch (status) {
    case "pending-review":
      return "Pending review";
    case "policy-hold":
      return "Policy hold";
    case "approved":
      return "Approved";
    case "rejected":
      return "Rejected";
  }
}

export function WorkbenchOverviewScene({
  cards,
  selectedItem,
}: {
  cards: WorkbenchOverviewCard[];
  selectedItem: WorkbenchPreviewItem;
}) {
  return (
    <div className="space-y-4">
      <AppPanel className="space-y-3" tone="contrast">
        <div className="space-y-1">
          <p className="type-kicker text-accent-strong">Overview / Dashboard</p>
          <h2 className="type-section-title text-foreground">
            Runtime overview
          </h2>
          <p className="type-body-sm text-foreground-muted">
            {selectedItem.summary}
          </p>
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          {cards.map((card) => (
            <AppPanel density="compact" key={card.id} tone="muted">
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-3">
                  <p className="type-label text-foreground">{card.label}</p>
                  <AppStatus tone={card.tone}>{card.value}</AppStatus>
                </div>
                <p className="type-body-sm text-foreground-muted">
                  {card.detail}
                </p>
              </div>
            </AppPanel>
          ))}
        </div>
      </AppPanel>
      <AppPanel className="space-y-3" density="compact">
        <p className="type-label text-foreground">Selected focus area</p>
        <p className="type-body-sm text-foreground-muted">
          {selectedItem.evidencePoints[0]}
        </p>
      </AppPanel>
    </div>
  );
}

export function WorkbenchContractsScene({
  selectedItem,
  selectedContractProofItem,
}: {
  selectedItem: WorkbenchPreviewItem;
  selectedContractProofItem: WorkbenchContractProofItem;
}) {
  return (
    <div className="space-y-4">
      <AppPanel className="space-y-3" tone="contrast">
        <div className="space-y-1">
          <p className="type-kicker text-accent-strong">Contracts</p>
          <h2 className="type-section-title text-foreground">
            Shared UI approval ledger
          </h2>
          <p className="type-body-sm text-foreground-muted">
            {selectedItem.summary}
          </p>
        </div>
        <AppTable aria-label="Approval ledger details">
          <AppTableHeader>
            <AppColumn isRowHeader>Signal</AppColumn>
            <AppColumn>Value</AppColumn>
          </AppTableHeader>
          <AppTableBody>
            <AppRow id="contract-export">
              <AppCell>Export</AppCell>
              <AppCell>{selectedContractProofItem.exportName}</AppCell>
            </AppRow>
            <AppRow id="contract-status">
              <AppCell>Status</AppCell>
              <AppCell>
                <AppStatus
                  tone={toneForLedgerStatus(selectedContractProofItem.status)}
                >
                  {selectedContractProofItem.status}
                </AppStatus>
              </AppCell>
            </AppRow>
            <AppRow id="contract-category">
              <AppCell>Category</AppCell>
              <AppCell>{selectedContractProofItem.category}</AppCell>
            </AppRow>
            <AppRow id="contract-source">
              <AppCell>Source path</AppCell>
              <AppCell>{selectedContractProofItem.sourcePath}</AppCell>
            </AppRow>
            <AppRow id="contract-demo-state">
              <AppCell>Demo state</AppCell>
              <AppCell>
                {selectedContractProofItem.demoState} -{" "}
                {selectedContractProofItem.demoLabel}
              </AppCell>
            </AppRow>
          </AppTableBody>
        </AppTable>
      </AppPanel>
      <div className="grid gap-4 xl:grid-cols-2">
        <ContractList
          emptyState="No named variants recorded."
          items={selectedContractProofItem.variants}
          title="Variants"
        />
        <ContractList
          emptyState="No React Aria primitives recorded."
          items={selectedContractProofItem.reactAriaPrimitives}
          title="React Aria primitives"
        />
        <ContractList
          emptyState="No constraints recorded."
          items={selectedContractProofItem.constraints}
          title="Constraints"
        />
        <ContractList
          emptyState="No accessibility notes recorded."
          items={selectedContractProofItem.a11yNotes}
          title="Accessibility notes"
        />
        <ContractList
          emptyState="No preferred usage guidance recorded."
          items={selectedContractProofItem.usage?.useWhen ?? []}
          title="Use when"
        />
        <ContractList
          emptyState="No avoidance guidance recorded."
          items={selectedContractProofItem.usage?.avoidWhen ?? []}
          title="Avoid when"
        />
      </div>
    </div>
  );
}

export function WorkbenchMethodsScene({
  selectedItem,
}: {
  selectedItem: WorkbenchPreviewItem;
}) {
  return (
    <div className="space-y-4">
      <AppPanel className="space-y-4" tone="contrast">
        <div className="space-y-1">
          <p className="type-kicker text-accent-strong">Methods</p>
          <h2 className="type-section-title text-foreground">
            Operator method preview
          </h2>
          <p className="type-body-sm text-foreground-muted">
            {selectedItem.summary}
          </p>
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          <AppPanel density="compact" tone="muted">
            <p className="type-label text-foreground">1. Select</p>
            <p className="type-body-sm text-foreground-muted">
              Narrow the active workload without losing the overall route
              context.
            </p>
          </AppPanel>
          <AppPanel density="compact" tone="muted">
            <p className="type-label text-foreground">2. Inspect</p>
            <p className="type-body-sm text-foreground-muted">
              Keep evidence and status visible before any decision control is
              used.
            </p>
          </AppPanel>
          <AppPanel density="compact" tone="muted">
            <p className="type-label text-foreground">3. Decide</p>
            <p className="type-body-sm text-foreground-muted">
              Use a short confirmation dialog only after the record context is
              already visible.
            </p>
          </AppPanel>
        </div>
      </AppPanel>
      <AppPanel density="compact">
        <p className="type-body-sm text-foreground-muted">
          {selectedItem.evidencePoints[0]}
        </p>
      </AppPanel>
    </div>
  );
}

export function WorkbenchProcurementScene({
  query,
  rows,
  selectedRowId,
  selectedStatus,
  onQueryChange,
  onRowSelectionChange,
  onStatusChange,
}: {
  query: string;
  rows: WorkbenchProcurementRow[];
  selectedRowId: string;
  selectedStatus: ProcurementStatusFilter;
  onQueryChange: (value: string) => void;
  onRowSelectionChange: (id: string) => void;
  onStatusChange: (value: ProcurementStatusFilter) => void;
}) {
  return (
    <div className="space-y-4">
      <AppToolbar ariaLabel="Procurement queue filters">
        <AppSelectField
          ariaLabel="Status filter"
          items={[
            { id: "all", label: "All statuses" },
            { id: "pending-review", label: "Pending review only" },
            { id: "policy-hold", label: "Policy hold only" },
          ]}
          label="Status"
          onSelectionChange={(key) =>
            onStatusChange(key as ProcurementStatusFilter)
          }
          selectedKey={selectedStatus}
        />
        <AppSearchField
          ariaLabel="Search procurement queue"
          label="Queue search"
          onChange={onQueryChange}
          placeholder="PR-, supplier..."
          value={query}
        />
      </AppToolbar>

      <AppPanel className="space-y-3" tone="contrast">
        <div className="space-y-1">
          <p className="type-kicker text-accent-strong">Procurement</p>
          <h2 className="type-section-title text-foreground">
            Procurement preview
          </h2>
          <p className="type-body-sm text-foreground-muted">
            Fixture queue only. No backend workflow or approval state is being
            mutated.
          </p>
        </div>

        <AppTable
          aria-label="Procurement approval queue"
          onSelectionChange={(keys) => {
            if (keys === "all") {
              return;
            }

            const firstKey = [...keys][0];
            if (firstKey !== undefined) {
              onRowSelectionChange(String(firstKey));
            }
          }}
          selectedKeys={new Set([selectedRowId])}
          selectionBehavior="replace"
          selectionMode="single"
        >
          <AppTableHeader>
            <AppColumn isRowHeader>Request</AppColumn>
            <AppColumn>Supplier</AppColumn>
            <AppColumn>Due date</AppColumn>
            <AppColumn>Amount</AppColumn>
            <AppColumn>Status</AppColumn>
          </AppTableHeader>
          <AppTableBody
            renderEmptyState={() => (
              <div className="px-4 py-6 text-center">
                No fixture rows match the active filter.
              </div>
            )}
          >
            {rows.map((row) => (
              <AppRow id={row.id} key={row.id}>
                <AppCell>{row.requestId}</AppCell>
                <AppCell>{row.supplier}</AppCell>
                <AppCell>{row.dueDateLabel}</AppCell>
                <AppCell>{row.amountLabel}</AppCell>
                <AppCell>
                  <AppStatus tone={toneForProcurementStatus(row.status)}>
                    {procurementStatusLabel(row.status)}
                  </AppStatus>
                </AppCell>
              </AppRow>
            ))}
          </AppTableBody>
        </AppTable>
      </AppPanel>
    </div>
  );
}

export function WorkbenchInspectorRail({
  modeId,
  selectedItem,
  selectedContractProofItem,
  selectedRow,
}: {
  modeId: WorkbenchModeId;
  selectedItem: WorkbenchPreviewItem;
  selectedContractProofItem?: WorkbenchContractProofItem;
  selectedRow?: WorkbenchProcurementRow;
}) {
  const isContractsMode =
    modeId === "contracts" && selectedContractProofItem !== undefined;

  return (
    <div className="space-y-4">
      <AppPanel
        aria-label="Workbench inspector"
        className="space-y-4"
        tone="contrast"
      >
        <div className="space-y-1">
          <p className="type-kicker text-accent-strong">Inspector</p>
          <h2 className="type-section-title text-foreground">
            Current context
          </h2>
          <h3 className="type-panel-title text-foreground">
            {selectedItem.name}
          </h3>
          <p className="type-body-sm text-foreground-muted">
            {selectedItem.subtitle}
          </p>
          <p className="type-body-sm text-foreground-muted">
            {selectedItem.summary}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <AppStatus tone={selectedItem.badgeTone}>
            {selectedItem.badgeLabel}
          </AppStatus>
          <AppStatus tone="info">{modeId}</AppStatus>
          {isContractsMode ? (
            <AppStatus
              tone={toneForLedgerStatus(selectedContractProofItem.status)}
            >
              {selectedContractProofItem.category}
            </AppStatus>
          ) : null}
        </div>
        {isContractsMode ? (
          <>
            <InspectorBlock
              body={`${selectedContractProofItem.demoState} - ${selectedContractProofItem.demoLabel}`}
              title="Demo state"
            />
            <InspectorList
              items={selectedContractProofItem.reactAriaPrimitives}
              title="React Aria"
            />
            <InspectorList
              items={selectedContractProofItem.variants}
              title="Variants"
            />
            <InspectorList
              items={selectedContractProofItem.constraints}
              title="Constraints"
            />
            <InspectorList
              items={selectedContractProofItem.a11yNotes}
              title="Accessibility notes"
            />
            <InspectorList
              items={selectedContractProofItem.usage?.useWhen ?? []}
              title="Use when"
            />
            <InspectorList
              items={selectedContractProofItem.usage?.avoidWhen ?? []}
              title="Avoid when"
            />
            <InspectorBlock
              body={selectedContractProofItem.sourcePath}
              monospace
              title="Source path"
            />
          </>
        ) : (
          <>
            <InspectorList
              items={selectedItem.ariaPrimitives}
              title="React Aria"
            />
            <InspectorList
              items={selectedItem.states}
              title="Approved states"
            />
            <InspectorList
              items={selectedItem.decisionHints}
              title="Decision hints"
            />
            {selectedItem.sourcePath ? (
              <InspectorBlock
                body={selectedItem.sourcePath}
                monospace
                title="Source path"
              />
            ) : null}
          </>
        )}
      </AppPanel>

      {selectedRow ? (
        <AppPanel className="space-y-4" tone="muted">
          <div className="space-y-1">
            <p className="type-label text-foreground">Selected request</p>
            <h3 className="type-panel-title text-foreground">
              {selectedRow.requestId}
            </h3>
            <p className="type-body-sm text-foreground-muted">
              {selectedRow.summary}
            </p>
          </div>
          <InspectorList
            items={selectedRow.evidenceFields.map(
              (field) => `${field.label}: ${field.value}`,
            )}
            title="Evidence"
          />
          <InspectorBlock
            body={selectedRow.decisionNote}
            title="Decision note"
          />
          <div className="flex flex-wrap gap-2">
            <AppDialog
              description={`Fixture-only approval preview for ${selectedRow.requestId}.`}
              title="Approve Request"
              trigger={<AppButton variant="primary">Approve Request</AppButton>}
            >
              <p className="type-body-sm text-foreground-muted">
                {selectedRow.requestId} for {selectedRow.supplier} would move
                forward in a real module.
              </p>
            </AppDialog>
            <AppDialog
              description={`Fixture-only rejection preview for ${selectedRow.requestId}.`}
              title="Reject Request"
              trigger={
                <AppButton variant="secondary">Reject Request</AppButton>
              }
            >
              <p className="type-body-sm text-foreground-muted">
                {selectedRow.requestId} remains a preview-only rejection path in
                this workbench.
              </p>
            </AppDialog>
          </div>
        </AppPanel>
      ) : null}
    </div>
  );
}

function toneForLedgerStatus(
  status: WorkbenchContractProofItem["status"],
): "warning" | "success" | "danger" {
  switch (status) {
    case "approved":
      return "success";
    case "deprecated":
      return "danger";
    case "draft":
      return "warning";
  }
}

function ContractList({
  emptyState,
  items,
  title,
}: {
  emptyState: string;
  items: string[];
  title: string;
}) {
  return (
    <AppPanel className="space-y-2" density="compact">
      <p className="type-label text-foreground">{title}</p>
      {items.length > 0 ? (
        <ul className="space-y-2">
          {items.map((item) => (
            <li className="type-body-sm text-foreground-muted" key={item}>
              {item}
            </li>
          ))}
        </ul>
      ) : (
        <p className="type-body-sm text-foreground-muted">{emptyState}</p>
      )}
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
      <div className="border-border bg-surface rounded-(--radius-control) border p-3">
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
      <div className="border-border bg-surface rounded-(--radius-control) border p-3">
        {items.length > 0 ? (
          <ul className="space-y-2">
            {items.map((item) => (
              <li className="type-body-sm text-foreground-muted" key={item}>
                {item}
              </li>
            ))}
          </ul>
        ) : (
          <p className="type-body-sm text-foreground-muted">
            No recorded items.
          </p>
        )}
      </div>
    </div>
  );
}
