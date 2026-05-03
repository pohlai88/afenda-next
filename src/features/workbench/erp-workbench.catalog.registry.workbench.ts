/**
 * @afenda-owner erp-workbench
 * @afenda-subject catalog
 * @afenda-artifact registry
 * @afenda-boundary workbench
 * @afenda-description Workbench registry for approved ERP UI contracts
 */
import { createElement } from "react";

import {
  AppButtonWorkbenchSurface,
  AppDialogWorkbenchSurface,
  AppFormWorkbenchSurface,
  AppSearchFieldWorkbenchSurface,
  AppSelectFieldWorkbenchSurface,
  AppSwitchFieldWorkbenchSurface,
  AppTableWorkbenchSurface,
  AppTextFieldWorkbenchSurface,
  ApprovalDialogPatternSurface,
  BulkApprovalToolbarPatternSurface,
  ErpAppShellPatternSurface,
  ProcurementApprovalSceneSurface,
  ReviewFilterBarPatternSurface,
  WorkbenchContractSummary,
} from "@/features/workbench/components/erp-workbench.surfaces.catalog.client";
import type {
  WorkbenchItem,
  WorkbenchItemCategory,
} from "@/features/workbench/types/erp-workbench.catalog.contract.shared";

export const WORKBENCH_ITEMS: WorkbenchItem[] = [
  {
    id: "app-button",
    name: "AppButton",
    category: "primitive",
    status: "approved",
    sourcePath: "src/components/ui/app.controls.primitive.client.tsx",
    ariaPrimitives: ["Button"],
    states: ["default", "disabled", "loading", "primary", "secondary"],
    tokens: [
      "--color-accent",
      "--color-accent-foreground",
      "--color-field",
      "--radius-control",
    ],
    useWhen: [
      "You need a primary or secondary action inside an ERP workflow.",
      "You want React Aria press behavior through the shared button API.",
    ],
    doNotUseWhen: [
      "The interaction is navigation and should be a link instead.",
      "A one-off screen is trying to invent its own button geometry.",
    ],
    render: () => createElement(AppButtonWorkbenchSurface),
  },
  {
    id: "app-text-field",
    name: "AppTextField",
    category: "primitive",
    status: "approved",
    sourcePath: "src/components/ui/app.controls.primitive.client.tsx",
    ariaPrimitives: ["TextField", "Label", "Input", "Text", "FieldError"],
    states: ["default", "disabled", "invalid", "required", "aria-label"],
    tokens: [
      "--color-field",
      "--color-border-strong",
      "--color-danger",
      "--color-foreground-muted",
    ],
    useWhen: [
      "You need short ERP text input with label, helper text, and error state.",
      "The server remains the authority and the field must preserve clear semantics.",
    ],
    doNotUseWhen: [
      "The input is actually a searchable selection.",
      "You need rich text, masked finance entry, or multi-line custom behavior.",
    ],
    render: () => createElement(AppTextFieldWorkbenchSurface),
  },
  {
    id: "app-search-field",
    name: "AppSearchField",
    category: "primitive",
    status: "approved",
    sourcePath: "src/components/ui/app.controls.primitive.client.tsx",
    ariaPrimitives: ["SearchField", "Label", "Input", "Button", "Text"],
    states: ["default", "disabled", "clear-action", "aria-label"],
    tokens: [
      "--color-field",
      "--color-border-strong",
      "--color-foreground-muted",
      "--radius-control",
    ],
    useWhen: [
      "You need queue or list search semantics without inventing a one-off text input.",
      "Operators must narrow records by identifier or supplier quickly.",
    ],
    doNotUseWhen: [
      "The flow needs a full query builder or saved-filter system.",
      "The input is actually free-form note capture rather than search intent.",
    ],
    render: () => createElement(AppSearchFieldWorkbenchSurface),
  },
  {
    id: "app-switch-field",
    name: "AppSwitchField",
    category: "primitive",
    status: "approved",
    sourcePath: "src/components/ui/app.controls.primitive.client.tsx",
    ariaPrimitives: ["Switch", "Text"],
    states: ["selected", "unselected", "disabled"],
    tokens: [
      "--color-accent",
      "--color-field-strong",
      "--color-surface",
      "--radius-control",
    ],
    useWhen: [
      "You need a clear on or off operational decision with immediate state visibility.",
      "The workflow benefits from a compact boolean toggle rather than a select.",
    ],
    doNotUseWhen: [
      "The user is choosing between more than two options.",
      "The action is destructive or requires confirmation rather than a toggle.",
    ],
    render: () => createElement(AppSwitchFieldWorkbenchSurface),
  },
  {
    id: "app-select-field",
    name: "AppSelectField",
    category: "primitive",
    status: "approved",
    sourcePath: "src/components/ui/app.controls.primitive.client.tsx",
    ariaPrimitives: [
      "Select",
      "Label",
      "Button",
      "SelectValue",
      "Popover",
      "ListBox",
      "ListBoxItem",
      "Text",
      "FieldError",
    ],
    states: [
      "default",
      "disabled",
      "invalid",
      "long-value",
      "keyboard-selection",
    ],
    tokens: [
      "--color-field",
      "--color-border-strong",
      "--color-surface-raised",
      "--radius-control",
    ],
    useWhen: [
      "You need a constrained ERP choice from a stable list.",
      "The option set is small enough to inspect in a popover list.",
    ],
    doNotUseWhen: [
      "The user needs free-text search across a large dataset.",
      "The business choice is binary and should be a switch instead.",
    ],
    render: () => createElement(AppSelectFieldWorkbenchSurface),
  },
  {
    id: "app-form",
    name: "AppForm",
    category: "primitive",
    status: "approved",
    sourcePath: "src/components/ui/app.controls.primitive.client.tsx",
    ariaPrimitives: ["Form"],
    states: ["semantic-submit", "validation", "field-composition"],
    tokens: ["--color-surface", "--color-border", "--radius-panel"],
    useWhen: [
      "You need the shared semantic wrapper for internal ERP form submission.",
      "Multiple approved field primitives should be grouped under one form contract.",
    ],
    doNotUseWhen: [
      "The screen is only visual display with no mutation path.",
      "A custom container is trying to bypass shared form semantics.",
    ],
    render: () => createElement(AppFormWorkbenchSurface),
  },
  {
    id: "app-dialog",
    name: "AppDialog",
    category: "primitive",
    status: "approved",
    sourcePath: "src/components/ui/app.controls.primitive.client.tsx",
    ariaPrimitives: ["DialogTrigger", "ModalOverlay", "Modal", "Dialog"],
    states: ["open", "dismissable", "escape-close", "action-footer"],
    tokens: [
      "--color-overlay",
      "--color-surface-raised",
      "--color-border-strong",
      "--radius-panel",
    ],
    useWhen: [
      "You need the approved overlay path for review or approval decisions.",
      "A screen must capture a short decision record without leaving queue context.",
    ],
    doNotUseWhen: [
      "The content needs to be a full page or long-lived workflow.",
      "A one-off screen is trying to import raw overlay primitives directly.",
    ],
    render: () => createElement(AppDialogWorkbenchSurface),
  },
  {
    id: "app-table",
    name: "AppTable",
    category: "primitive",
    status: "approved",
    sourcePath: "src/components/ui/app.controls.primitive.client.tsx",
    ariaPrimitives: [
      "Table",
      "TableHeader",
      "Column",
      "TableBody",
      "Row",
      "Cell",
    ],
    states: [
      "empty-state",
      "row-selection",
      "bulk-selection",
      "sortable-columns",
      "status-cells",
    ],
    tokens: [
      "--color-surface",
      "--color-surface-muted",
      "--color-border",
      "--radius-control",
    ],
    useWhen: [
      "You need a styled React Aria table composition for dense review workflows.",
      "Operators must scan rows, select records, and sort queue columns quickly.",
    ],
    doNotUseWhen: [
      "You are trying to build a general data-grid abstraction.",
      "The workflow needs spreadsheet editing, pinned columns, or virtualization.",
    ],
    render: () => createElement(AppTableWorkbenchSurface),
  },
  {
    id: "erp-app-shell",
    name: "ERP App Shell",
    category: "pattern",
    status: "approved",
    sourcePath:
      "src/features/workbench/components/erp-workbench.surfaces.catalog.client.tsx",
    ariaPrimitives: ["Button", "SearchField", "Select", "Table", "Dialog"],
    states: [
      "navigation-rail",
      "workspace-header",
      "content-region",
      "detail-region",
    ],
    tokens: [
      "--color-surface",
      "--color-surface-raised",
      "--color-border",
      "--radius-panel",
    ],
    useWhen: [
      "You need a stable review workspace with queue context, actions, and a decision rail.",
      "A contributor must understand where review workflows should live before building product code.",
    ],
    doNotUseWhen: [
      "You are trying to turn the workbench into a real authenticated product route.",
      "The workflow only needs a single primitive or small form pattern.",
    ],
    render: () => createElement(ErpAppShellPatternSurface),
  },
  {
    id: "review-filter-bar",
    name: "Review Filter Bar",
    category: "pattern",
    status: "approved",
    sourcePath:
      "src/features/workbench/components/erp-workbench.surfaces.catalog.client.tsx",
    ariaPrimitives: ["SearchField", "Select", "Button"],
    states: ["default", "filtered", "clear-filters"],
    tokens: [
      "--color-surface-raised",
      "--color-field",
      "--color-border-strong",
      "--radius-panel",
    ],
    useWhen: [
      "You need fast queue narrowing by request identity, status, or value band.",
      "Operators must stay in one review surface without opening a separate filter UI.",
    ],
    doNotUseWhen: [
      "The workflow requires saved views or advanced query composition.",
      "The screen has no list or queue to narrow.",
    ],
    render: () => createElement(ReviewFilterBarPatternSurface),
  },
  {
    id: "bulk-approval-toolbar",
    name: "Bulk Approval Toolbar",
    category: "pattern",
    status: "approved",
    sourcePath:
      "src/features/workbench/components/erp-workbench.surfaces.catalog.client.tsx",
    ariaPrimitives: ["Button", "DialogTrigger", "Dialog"],
    states: ["no-selection", "selected", "bulk-approve", "bulk-reject"],
    tokens: [
      "--color-surface-raised",
      "--color-warning",
      "--color-info",
      "--radius-panel",
    ],
    useWhen: [
      "You need selected-count visibility and safe bulk decisions in a review queue.",
      "A workflow must make disabled zero-selection states explicit.",
    ],
    doNotUseWhen: [
      "The screen only ever handles single-record actions.",
      "Selection state is hidden or ambiguous.",
    ],
    render: () => createElement(BulkApprovalToolbarPatternSurface),
  },
  {
    id: "approval-dialog-pattern",
    name: "Approval Dialog Pattern",
    category: "pattern",
    status: "approved",
    sourcePath:
      "src/features/workbench/components/erp-workbench.surfaces.catalog.client.tsx",
    ariaPrimitives: ["DialogTrigger", "Dialog", "TextField", "Button"],
    states: ["approve", "reject", "decision-note", "dismissable"],
    tokens: [
      "--color-overlay",
      "--color-surface-raised",
      "--color-border-strong",
      "--radius-panel",
    ],
    useWhen: [
      "You need a traceable approval or rejection confirmation inside a review workflow.",
      "The decision requires a short audit note before release.",
    ],
    doNotUseWhen: [
      "The user needs a full record page instead of a confirmation overlay.",
      "A screen is attempting to bypass the shared AppDialog path.",
    ],
    render: () => createElement(ApprovalDialogPatternSurface),
  },
  {
    id: "procurement-approval-scene",
    name: "Procurement Approval Scene",
    category: "scene",
    status: "approved",
    sourcePath:
      "src/features/workbench/components/erp-workbench.surfaces.catalog.client.tsx",
    ariaPrimitives: ["SearchField", "Select", "Table", "Dialog", "Button"],
    states: [
      "queue-filtering",
      "row-selection",
      "detail-review",
      "approve-request",
      "reject-with-reason",
    ],
    tokens: [
      "--color-surface",
      "--color-surface-raised",
      "--color-warning",
      "--color-danger",
    ],
    useWhen: [
      "You need to inspect the path from approved primitives to a real procurement review workflow.",
      "A contributor must see queue, detail, evidence, and decision behavior in one ERP scene.",
    ],
    doNotUseWhen: [
      "You only need to inspect a single primitive or pattern in isolation.",
      "The workflow is speculative and not tied to a real Afenda review case.",
    ],
    render: () => createElement(ProcurementApprovalSceneSurface),
  },
  {
    id: "contract-coverage",
    name: "Contract Coverage Table",
    category: "contract",
    status: "approved",
    sourcePath:
      "src/features/workbench/components/erp-workbench.surfaces.catalog.client.tsx",
    ariaPrimitives: ["Table", "Button"],
    states: ["approved-controls-only", "inspectable-rows"],
    tokens: ["--color-surface", "--color-border", "--color-success"],
    useWhen: [
      "You need the compact approval matrix for current shared controls.",
      "A contributor must verify where to extend the system before adding new UI.",
    ],
    doNotUseWhen: [
      "You need full design documentation or a broad governance portal.",
      "The workflow needs a product feature instead of a contract surface.",
    ],
    render: () => createElement(WorkbenchContractSummary),
  },
];

export const WORKBENCH_SECTION_ORDER: WorkbenchItemCategory[] = [
  "primitive",
  "pattern",
  "scene",
  "contract",
];

export function getWorkbenchItemsByCategory(category: WorkbenchItemCategory) {
  return WORKBENCH_ITEMS.filter((item) => item.category === category);
}

export const APPROVED_PRIMITIVE_ITEMS = WORKBENCH_ITEMS.filter(
  (item) => item.category === "primitive" && item.status === "approved",
);
