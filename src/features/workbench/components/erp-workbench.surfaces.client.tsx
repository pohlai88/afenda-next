"use client";

/**
 * @afenda-owner erp-workbench
 * @afenda-subject surfaces
 * @afenda-artifact catalog
 * @afenda-boundary client
 * @afenda-description Client catalog of ERP workbench visual surfaces
 */
import Link from "next/link";
import { useMemo, useState } from "react";
import type { Key } from "react-aria-components";

import {
  AppButton,
  AppCell,
  AppColumn,
  AppDialog,
  AppForm,
  AppPanel,
  AppRow,
  AppSearchField,
  AppSelectField,
  AppStatus,
  AppSwitchField,
  AppTable,
  AppTableBody,
  AppTableHeader,
  AppTextField,
  AppToolbar,
} from "@/components/ui/app.controls.client";
import {
  getProcurementApprovalStatusLabel,
  PROCUREMENT_APPROVAL_DEMO_ROWS,
} from "@/features/workbench/data/erp-workbench.procurement-approval.fixture";
import type { WorkbenchItem } from "@/features/workbench/types/erp-workbench.contract.shared";

/* -------------------------------------------------------------------------- */
/* Page shell                                                                 */
/* -------------------------------------------------------------------------- */

export function WorkbenchHeaderLink() {
  return (
    <Link
      className="type-label text-accent-strong hover:text-accent border-border-strong rounded-(--radius-control) border px-4 py-3 transition"
      href="/"
    >
      Back to Afenda
    </Link>
  );
}

type WorkbenchCategoryFilter =
  | "all"
  | "primitive"
  | "pattern"
  | "scene"
  | "contract";

export function WorkbenchSectionFilter({
  activeCategory,
  onChange,
}: {
  activeCategory: WorkbenchCategoryFilter;
  onChange: (next: WorkbenchCategoryFilter) => void;
}) {
  const options: Array<{ id: WorkbenchCategoryFilter; label: string }> = [
    { id: "all", label: "All" },
    { id: "primitive", label: "Primitives" },
    { id: "pattern", label: "Patterns" },
    { id: "scene", label: "Scenes" },
    { id: "contract", label: "Contract" },
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <AppButton
          key={opt.id}
          onPress={() => onChange(opt.id)}
          selected={activeCategory === opt.id}
          variant="secondary"
        >
          {opt.label}
        </AppButton>
      ))}
    </div>
  );
}

export function WorkbenchSection({
  children,
  description,
  id,
  title,
}: {
  children: React.ReactNode;
  description: string;
  id: string;
  title: string;
}) {
  return (
    <section
      aria-labelledby={`${id}-heading`}
      className="border-border space-y-4 border-b pb-8"
      id={id}
    >
      <div className="space-y-2">
        <h2 className="type-section-title text-foreground" id={`${id}-heading`}>
          {title}
        </h2>
        <p className="type-body-sm text-foreground-muted max-w-3xl">
          {description}
        </p>
      </div>
      {children}
    </section>
  );
}

export function WorkbenchItemCard({
  isSelected,
  item,
  onInspect,
}: {
  isSelected: boolean;
  item: WorkbenchItem;
  onInspect: (id: string) => void;
}) {
  return (
    <AppPanel
      className={isSelected ? "ring-accent-ring ring-2" : ""}
      density="compact"
      tone="default"
    >
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div className="space-y-1">
            <p className="type-label text-foreground">{item.name}</p>
            <p className="type-meta text-foreground-muted">{item.category}</p>
          </div>
          <AppStatus tone={item.status === "approved" ? "success" : "warning"}>
            {item.status}
          </AppStatus>
        </div>
        <div className="border-border bg-surface-muted max-h-48 overflow-auto rounded-(--radius-control) border p-3">
          {item.render()}
        </div>
        <AppButton
          onPress={() => onInspect(item.id)}
          variant={isSelected ? "primary" : "secondary"}
        >
          {`Inspect ${item.name}`}
        </AppButton>
      </div>
    </AppPanel>
  );
}

export function ContractCoverageTable({
  items,
  onInspect,
  selectedItemId,
}: {
  items: WorkbenchItem[];
  onInspect: (id: string) => void;
  selectedItemId: string;
}) {
  return (
    <AppPanel density="compact" tone="contrast">
      <p className="type-label text-foreground mb-3">
        Approved primitives matrix
      </p>
      <AppTable aria-label="Contract coverage">
        <AppTableHeader>
          <AppColumn isRowHeader>Name</AppColumn>
          <AppColumn>Source</AppColumn>
          <AppColumn>Inspect</AppColumn>
        </AppTableHeader>
        <AppTableBody>
          {items.map((row) => (
            <AppRow key={row.id} id={row.id}>
              <AppCell>{row.name}</AppCell>
              <AppCell>
                <span className="type-meta font-mono break-all">
                  {row.sourcePath}
                </span>
              </AppCell>
              <AppCell>
                <AppButton
                  onPress={() => onInspect(row.id)}
                  selected={row.id === selectedItemId}
                  variant="secondary"
                >
                  Focus
                </AppButton>
              </AppCell>
            </AppRow>
          ))}
        </AppTableBody>
      </AppTable>
    </AppPanel>
  );
}

export function WorkbenchContractSummary() {
  return (
    <AppPanel density="compact" tone="muted">
      <p className="type-body-sm text-foreground-muted">
        Contract coverage table is rendered in the section below for interactive
        inspection.
      </p>
    </AppPanel>
  );
}

/* -------------------------------------------------------------------------- */
/* Primitive workbench surfaces                                               */
/* -------------------------------------------------------------------------- */

export function AppButtonWorkbenchSurface() {
  return (
    <div className="flex flex-wrap gap-2">
      <AppButton variant="primary">Primary</AppButton>
      <AppButton variant="secondary">Secondary</AppButton>
      <AppButton isDisabled variant="secondary">
        Disabled
      </AppButton>
      <AppButton isLoading variant="primary">
        Loading
      </AppButton>
    </div>
  );
}

export function AppTextFieldWorkbenchSurface() {
  const [value, setValue] = useState("");
  return (
    <div className="space-y-3">
      <AppTextField
        description="Workbench sample for labeled text entry."
        {...(value.length > 0 && value.length < 3
          ? { errorMessage: "Too short." }
          : {})}
        isRequired
        label="Reference"
        name="ref"
        onChange={setValue}
        value={value}
      />
      <AppTextField
        ariaLabel="Workspace search"
        description="Escape hatch without visible label."
        name="ws"
        onChange={() => undefined}
        value=""
      />
    </div>
  );
}

export function AppSearchFieldWorkbenchSurface() {
  const [value, setValue] = useState("");
  return (
    <AppSearchField
      description="Queue search semantics."
      label="Search queue"
      onChange={setValue}
      placeholder="PR-, supplier, SKU…"
      value={value}
    />
  );
}

export function AppSwitchFieldWorkbenchSurface() {
  const [on, setOn] = useState(true);
  return (
    <AppSwitchField
      description="Operational toggle sample."
      isSelected={on}
      label="Requires approval"
      name="approval"
      onChange={setOn}
    />
  );
}

export function AppSelectFieldWorkbenchSurface() {
  const [key, setKey] = useState("ops");
  return (
    <AppSelectField
      description="Constrained ERP choice."
      items={[
        { id: "ops", label: "Operations" },
        { id: "finance", label: "Finance" },
        { id: "sales", label: "Sales" },
      ]}
      label="Owner"
      name="owner"
      onSelectionChange={setKey}
      selectedKey={key}
    />
  );
}

export function AppFormWorkbenchSurface() {
  const [ref, setRef] = useState("REQ-104");
  return (
    <AppForm aria-label="Sample ERP form" onSubmit={(e) => e.preventDefault()}>
      <AppTextField
        label="Request"
        name="request"
        onChange={setRef}
        value={ref}
      />
      <AppButton type="submit" variant="primary">
        Save draft
      </AppButton>
    </AppForm>
  );
}

export function AppDialogWorkbenchSurface() {
  return (
    <AppDialog
      actions={
        <>
          <AppButton variant="secondary">Cancel</AppButton>
          <AppButton variant="primary">Confirm</AppButton>
        </>
      }
      description="Overlay path for short decisions."
      title="Decision"
      trigger={<AppButton>Open dialog</AppButton>}
    >
      <p className="type-body-sm text-foreground-muted">
        Dialog content uses the shared AppDialog contract.
      </p>
    </AppDialog>
  );
}

export function AppTableWorkbenchSurface() {
  return (
    <AppTable aria-label="Sample queue">
      <AppTableHeader>
        <AppColumn isRowHeader>Request</AppColumn>
        <AppColumn>Supplier</AppColumn>
        <AppColumn>Amount</AppColumn>
        <AppColumn>Status</AppColumn>
      </AppTableHeader>
      <AppTableBody>
        {PROCUREMENT_APPROVAL_DEMO_ROWS.map((row) => (
          <AppRow key={row.id} id={row.id}>
            <AppCell>{row.requestId}</AppCell>
            <AppCell>{row.supplier}</AppCell>
            <AppCell>{row.amountLabel}</AppCell>
            <AppCell>{getProcurementApprovalStatusLabel(row.status)}</AppCell>
          </AppRow>
        ))}
      </AppTableBody>
    </AppTable>
  );
}

/* -------------------------------------------------------------------------- */
/* Pattern surfaces                                                           */
/* -------------------------------------------------------------------------- */

export function ErpAppShellPatternSurface() {
  return (
    <AppPanel tone="contrast">
      <div className="grid gap-4 lg:grid-cols-[12rem_minmax(0,1fr)_18rem]">
        <nav aria-label="ERP navigation rail" className="space-y-2">
          <p className="type-label text-foreground-muted">Navigation</p>
          <AppButton variant="secondary">Queues</AppButton>
          <AppButton variant="secondary">Vendors</AppButton>
          <AppButton variant="secondary">Settings</AppButton>
        </nav>
        <div className="space-y-3">
          <p className="type-label text-foreground-muted">Workspace</p>
          <AppToolbar>
            <AppSearchField
              ariaLabel="Search workspace"
              label="Search"
              onChange={() => undefined}
              value=""
            />
            <AppSelectField
              items={[
                { id: "all", label: "All queues" },
                { id: "proc", label: "Procurement" },
              ]}
              label="Queue"
              name="queue"
              onSelectionChange={() => undefined}
              selectedKey="proc"
            />
          </AppToolbar>
          <AppPanel density="compact">
            Primary content region placeholder.
          </AppPanel>
        </div>
        <aside aria-label="Detail rail" className="space-y-2">
          <p className="type-label text-foreground-muted">Detail</p>
          <AppPanel density="compact" tone="muted">
            Decision rail placeholder.
          </AppPanel>
        </aside>
      </div>
    </AppPanel>
  );
}

export function ReviewFilterBarPatternSurface() {
  const [query, setQuery] = useState("");
  const [band, setBand] = useState("any");
  return (
    <AppToolbar>
      <AppSearchField
        label="Filter requests"
        onChange={setQuery}
        placeholder="PR-, vendor…"
        value={query}
      />
      <AppSelectField
        items={[
          { id: "any", label: "Any amount" },
          { id: "low", label: "Under ฿50k" },
          { id: "high", label: "Over ฿150k" },
        ]}
        label="Value band"
        name="band"
        onSelectionChange={setBand}
        selectedKey={band}
      />
      <AppButton variant="secondary">Clear filters</AppButton>
    </AppToolbar>
  );
}

export function BulkApprovalToolbarPatternSurface() {
  return (
    <AppToolbar tone="contrast">
      <AppStatus tone="info">No selection</AppStatus>
      <div className="flex flex-wrap gap-2">
        <AppButton isDisabled variant="primary">
          Approve selected
        </AppButton>
        <AppButton isDisabled variant="secondary">
          Reject selected
        </AppButton>
      </div>
    </AppToolbar>
  );
}

export function ApprovalDialogPatternSurface() {
  return (
    <AppDialog
      actions={
        <>
          <AppButton variant="secondary">Cancel</AppButton>
          <AppButton variant="primary">Submit decision</AppButton>
        </>
      }
      description="Traceable approval with a short audit note."
      title="Approve or reject"
      trigger={<AppButton>Open approval dialog</AppButton>}
    >
      <AppTextField
        description="Visible to auditors on the request timeline."
        label="Decision note"
        name="note"
        onChange={() => undefined}
        value=""
      />
    </AppDialog>
  );
}

/* -------------------------------------------------------------------------- */
/* Procurement scene                                                          */
/* -------------------------------------------------------------------------- */

export function ProcurementApprovalSceneSurface() {
  const [selectedKeys, setSelectedKeys] = useState<Set<Key>>(
    () => new Set(["pr-24018"]),
  );
  const [filter, setFilter] = useState("");
  const [status, setStatus] = useState("pending-review");

  const visibleRows = useMemo(() => {
    const q = filter.trim().toLowerCase();
    return PROCUREMENT_APPROVAL_DEMO_ROWS.filter((row) => {
      if (status === "pending-review" && row.status !== "pending-review") {
        return false;
      }
      if (status === "policy-hold" && row.status !== "policy-hold") {
        return false;
      }
      if (!q) return true;
      return (
        row.requestId.toLowerCase().includes(q) ||
        row.supplier.toLowerCase().includes(q)
      );
    });
  }, [filter, status]);

  const selectedList = useMemo(
    () => PROCUREMENT_APPROVAL_DEMO_ROWS.filter((r) => selectedKeys.has(r.id)),
    [selectedKeys],
  );

  const primaryRow = selectedList[0];
  const detailSupplier =
    selectedList.find((r) => r.id === "pr-24023")?.supplier ??
    primaryRow?.supplier ??
    "";

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <p className="type-label text-foreground">Procurement Approval</p>
          <p className="type-meta text-foreground-muted">Approval Queue</p>
        </div>
        <AppStatus tone="warning">{`${selectedList.length} selected`}</AppStatus>
      </div>

      <ReviewFilterBarPatternSurface />

      <AppToolbar>
        <AppSelectField
          items={[
            { id: "pending-review", label: "Pending review only" },
            { id: "policy-hold", label: "Policy hold only" },
            { id: "all", label: "All statuses" },
          ]}
          label="Status filter"
          name="status"
          onSelectionChange={setStatus}
          selectedKey={status}
        />
        <AppSearchField
          ariaLabel="Filter procurement queue"
          label="Queue search"
          onChange={setFilter}
          value={filter}
        />
      </AppToolbar>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
        <AppPanel density="compact">
          <AppTable
            aria-label="Procurement approval queue"
            onSelectionChange={(keys) => {
              if (keys === "all") return;
              setSelectedKeys(keys);
            }}
            selectedKeys={selectedKeys}
            selectionMode="multiple"
          >
            <AppTableHeader>
              <AppColumn isRowHeader>Request</AppColumn>
              <AppColumn>Supplier</AppColumn>
              <AppColumn>Amount</AppColumn>
              <AppColumn>Status</AppColumn>
            </AppTableHeader>
            <AppTableBody>
              {visibleRows.map((row) => (
                <AppRow key={row.id} id={row.id}>
                  <AppCell>{row.requestId}</AppCell>
                  <AppCell>{row.supplier}</AppCell>
                  <AppCell>{row.amountLabel}</AppCell>
                  <AppCell>
                    {getProcurementApprovalStatusLabel(row.status)}
                  </AppCell>
                </AppRow>
              ))}
            </AppTableBody>
          </AppTable>
        </AppPanel>

        <AppPanel density="compact" tone="muted">
          <p className="type-label text-foreground mb-2">Detail</p>
          <p className="type-body-sm text-foreground-muted">
            {detailSupplier || "Select a row to review supplier context."}
          </p>
          <div className="mt-4 space-y-2">
            <AppDialog
              actions={
                <>
                  <AppButton variant="secondary">Cancel</AppButton>
                  <AppButton variant="primary">Confirm approval</AppButton>
                </>
              }
              description="Creates an auditable decision record."
              title="Approve Request"
              trigger={<AppButton variant="primary">Approve Request</AppButton>}
            >
              <p className="type-body-sm text-foreground-muted">
                Decision record
              </p>
              <AppTextField
                description="Stored with the approval event."
                label="Approver note"
                name="approverNote"
                onChange={() => undefined}
                value=""
              />
            </AppDialog>
          </div>
        </AppPanel>
      </div>
    </div>
  );
}
