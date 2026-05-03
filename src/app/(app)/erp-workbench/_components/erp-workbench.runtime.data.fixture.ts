/**
 * @afenda-owner erp-workbench
 * @afenda-subject runtime
 * @afenda-artifact data
 * @afenda-boundary fixture
 * @afenda-description Fixture-only runtime data for the ERP Runtime Workbench route
 */
import type {
  ErpRuntimeWorkbenchData,
  WorkbenchMode,
  WorkbenchOverviewCard,
  WorkbenchPreviewItem,
  WorkbenchProcurementRow,
  WorkbenchStatusItem,
} from "./erp-workbench.runtime.contract.shared";

const modes: WorkbenchMode[] = [
  {
    id: "overview",
    label: "Overview",
    description:
      "Preview the runtime operating model before real modules land.",
    selectorLabel: "Overview focus areas",
    defaultItemId: "runtime-density",
  },
  {
    id: "contracts",
    label: "Contracts",
    description: "Inspect the shared UI contracts and approved states.",
    selectorLabel: "Contract items",
    defaultItemId: "app-tabs-contract",
  },
  {
    id: "methods",
    label: "Methods",
    description:
      "Review the operator methods that future ERP modules should reuse.",
    selectorLabel: "Interaction methods",
    defaultItemId: "queue-review-method",
  },
  {
    id: "procurement",
    label: "Procurement",
    description:
      "Walk through a fixture-only approval queue with evidence and decision previews.",
    selectorLabel: "Procurement lanes",
    defaultItemId: "pending-review-lane",
  },
];

const statusStrip: WorkbenchStatusItem[] = [
  {
    id: "fixture",
    label: "Fixture state",
    value: "Fixture data only",
    tone: "info",
  },
  {
    id: "decisions",
    label: "Decision previews",
    value: "Approve and reject dialogs wired",
    tone: "success",
  },
  {
    id: "boundary",
    label: "Execution boundary",
    value: "No backend side effects",
    tone: "warning",
  },
];

const overviewCards: WorkbenchOverviewCard[] = [
  {
    id: "active-lanes",
    label: "Active lanes",
    value: "4 preview modes",
    detail:
      "Overview, contracts, methods, and procurement stay visible in one runtime surface.",
    tone: "info",
  },
  {
    id: "shared-controls",
    label: "Shared controls",
    value: "Tabs, GridList, Toolbar, Table",
    detail:
      "The workbench proves navigation, selection, filtering, and queue density with one control vocabulary.",
    tone: "success",
  },
  {
    id: "queue-state",
    label: "Queue state",
    value: "3 fixture requests",
    detail:
      "Selection, evidence, and decision previews stay local to the route.",
    tone: "warning",
  },
];

const previewItems: WorkbenchPreviewItem[] = [
  {
    id: "runtime-density",
    modeId: "overview",
    name: "Runtime density",
    subtitle: "Operator throughput",
    summary:
      "Dense, predictable layout keeps the next action and selected context visible without turning the route into a marketing shell.",
    badgeLabel: "Ready",
    badgeTone: "success",
    ariaPrimitives: ["Tabs", "GridList", "Toolbar", "Table"],
    states: ["selected context", "visible next action", "fixture-only"],
    evidencePoints: [
      "The header and status strip explain the route's preview purpose.",
      "Left, center, and right rails stay visible on desktop without hiding key context.",
    ],
    decisionHints: [
      "Preserve route density when real modules arrive.",
      "Keep preview cues obvious so no one mistakes the route for a live workflow.",
    ],
  },
  {
    id: "operator-safety",
    modeId: "overview",
    name: "Operator safety",
    subtitle: "Low-friction review",
    summary:
      "Filtering, evidence, and decisions must be compact, reversible, and hard to misuse during repeated queue work.",
    badgeLabel: "Tracked",
    badgeTone: "info",
    ariaPrimitives: ["SearchField", "Select", "Dialog"],
    states: ["clear action labels", "decision note", "inspectable evidence"],
    evidencePoints: [
      "Approval dialogs require short decision framing.",
      "Inspector rails expose rationale before the action path is taken.",
    ],
    decisionHints: [
      "Keep destructive-looking actions secondary until evidence is visible.",
      "Do not bury exception context inside hidden drawers.",
    ],
  },
  {
    id: "decision-trace",
    modeId: "overview",
    name: "Decision trace",
    subtitle: "Evidence before action",
    summary:
      "Every preview scene should make record identity, current state, and the next decision method obvious before a dialog opens.",
    badgeLabel: "Preview",
    badgeTone: "warning",
    ariaPrimitives: ["AppStatus", "AppDialog", "Table"],
    states: ["identity visible", "status visible", "evidence visible"],
    evidencePoints: [
      "Selected requests expose due date, owner, and supporting evidence in the right rail.",
      "Mode tabs isolate preview concerns without fragmenting route context.",
    ],
    decisionHints: [
      "Treat dialogs as confirmation layers, not primary detail surfaces.",
      "Carry selected record context into the decision copy.",
    ],
  },
  {
    id: "app-tabs-contract",
    modeId: "contracts",
    name: "AppTabs",
    subtitle: "Mode navigation contract",
    summary:
      "Mode switching should remain keyboard-accessible and visually compact so workbench views behave like a real operator surface.",
    badgeLabel: "Approved",
    badgeTone: "success",
    sourcePath: "src/components/ui/app.controls.primitive.client.tsx",
    ariaPrimitives: ["Tabs", "TabList", "Tab", "TabPanel"],
    states: ["selected", "unselected", "focus visible"],
    evidencePoints: [
      "Mode labels describe product semantics rather than implementation jargon.",
      "Tabs remain part of the shared primitive layer, not route-local one-offs.",
    ],
    decisionHints: [
      "Use tabs for mode changes, not for hidden state mutation.",
      "Keep tab counts small while the route is still fixture-only.",
    ],
  },
  {
    id: "app-grid-list-contract",
    modeId: "contracts",
    name: "AppGridList",
    subtitle: "Selector rail contract",
    summary:
      "Selector rails should use a shared selection primitive so contract items, methods, and lanes behave consistently.",
    badgeLabel: "Approved",
    badgeTone: "success",
    sourcePath: "src/components/ui/app.controls.primitive.client.tsx",
    ariaPrimitives: ["GridList", "GridListItem"],
    states: ["single selection", "focus ring", "selected card"],
    evidencePoints: [
      "Selector items keep summary and badge state visible in a compact rail.",
      "Selection remains local UI state and does not cross the route boundary.",
    ],
    decisionHints: [
      "Use selector rails for context switching, not navigation to other routes.",
      "Keep selector content concise enough for repeated scanning.",
    ],
  },
  {
    id: "app-toolbar-contract",
    modeId: "contracts",
    name: "AppToolbar",
    subtitle: "Filter and action contract",
    summary:
      "Filter bars and action clusters should share keyboard-aware toolbar semantics instead of ad hoc flex rows.",
    badgeLabel: "Approved",
    badgeTone: "success",
    sourcePath: "src/components/ui/app.controls.primitive.client.tsx",
    ariaPrimitives: ["Toolbar", "SearchField", "Select", "Button"],
    states: ["named toolbar", "filter cluster", "action cluster"],
    evidencePoints: [
      "Toolbar children stay aligned across compact ERP surfaces.",
      "Action groups remain explicit instead of collapsing into generic cards.",
    ],
    decisionHints: [
      "Keep filter density high but labels explicit.",
      "Do not use toolbar for content containers that are not actions or controls.",
    ],
  },
  {
    id: "app-table-contract",
    modeId: "contracts",
    name: "AppTable",
    subtitle: "Queue table contract",
    summary:
      "Dense review queues must support keyboard navigation, row selection, and stable headers without escalating to a grid framework.",
    badgeLabel: "Approved",
    badgeTone: "success",
    sourcePath: "src/components/ui/app.controls.primitive.client.tsx",
    ariaPrimitives: ["Table", "TableHeader", "Row", "Cell"],
    states: ["row selection", "sortable headers", "empty state"],
    evidencePoints: [
      "Queue tables expose identity and status in one scan line.",
      "Selection state drives the evidence and decision rail.",
    ],
    decisionHints: [
      "Avoid spreadsheet ambitions in this primitive layer.",
      "Keep selection and sorting behavior visible, not implicit.",
    ],
  },
  {
    id: "queue-review-method",
    modeId: "methods",
    name: "Queue review method",
    subtitle: "Primary review loop",
    summary:
      "Operators should narrow the queue, select a record, inspect evidence, and open a decision dialog without leaving the route.",
    badgeLabel: "Method",
    badgeTone: "info",
    sourcePath:
      "src/app/(app)/erp-workbench/_lib/erp-workbench.client-scenes.tsx",
    ariaPrimitives: ["Toolbar", "Table", "Dialog"],
    states: ["queue filtered", "record selected", "dialog opened"],
    evidencePoints: [
      "Filter controls stay above the queue.",
      "Selection updates the right rail immediately.",
    ],
    decisionHints: [
      "Keep queue review linear and predictable.",
      "Do not scatter decision context across multiple panels.",
    ],
  },
  {
    id: "inspector-method",
    modeId: "methods",
    name: "Inspector method",
    subtitle: "Context retention",
    summary:
      "The inspector rail holds the meaning of the current selection so preview scenes always show what the operator is acting on.",
    badgeLabel: "Method",
    badgeTone: "info",
    sourcePath:
      "src/app/(app)/erp-workbench/_components/erp-runtime-workbench.client.tsx",
    ariaPrimitives: ["AppPanel", "AppStatus"],
    states: ["selected item", "selected record", "source path"],
    evidencePoints: [
      "Inspector content changes by mode without changing the route shell.",
      "Source paths and approved states remain visible for contract review.",
    ],
    decisionHints: [
      "Keep inspector content short enough to scan beside a queue.",
      "Reserve deep documentation for generated READMEs and docs, not this rail.",
    ],
  },
  {
    id: "evidence-method",
    modeId: "methods",
    name: "Evidence method",
    subtitle: "Review before decision",
    summary:
      "Evidence belongs beside the selected record so approval previews always show the why before the action buttons appear.",
    badgeLabel: "Method",
    badgeTone: "info",
    sourcePath:
      "src/app/(app)/erp-workbench/_lib/erp-workbench.client-scenes.tsx",
    ariaPrimitives: ["AppPanel", "AppStatus", "Dialog"],
    states: ["evidence fields", "decision note", "owner visible"],
    evidencePoints: [
      "Due date, owner, and policy signals stay visible in the right rail.",
      "Evidence is fixture-only but shaped like future ERP review context.",
    ],
    decisionHints: [
      "Do not open a dialog from an empty selection.",
      "Keep evidence labels explicit rather than symbolic.",
    ],
  },
  {
    id: "decision-method",
    modeId: "methods",
    name: "Decision method",
    subtitle: "Controlled confirmation",
    summary:
      "Decision dialogs confirm an already visible context. They do not replace the queue or the inspector as the primary review surface.",
    badgeLabel: "Method",
    badgeTone: "info",
    sourcePath:
      "src/app/(app)/erp-workbench/_lib/erp-workbench.client-scenes.tsx",
    ariaPrimitives: ["DialogTrigger", "Dialog", "Button"],
    states: ["approve", "reject", "dismiss"],
    evidencePoints: [
      "Dialog copy inherits the selected request identity.",
      "Actions stay local to the route and do not mutate backend state.",
    ],
    decisionHints: [
      "Use concise decision copy and maintain a visible close path.",
      "Keep final business logic out of this preview slice.",
    ],
  },
  {
    id: "pending-review-lane",
    modeId: "procurement",
    name: "Pending review lane",
    subtitle: "Default workload",
    summary:
      "The primary lane shows records ready for immediate operator review with evidence visible before approval.",
    badgeLabel: "Queue",
    badgeTone: "warning",
    ariaPrimitives: ["Toolbar", "Table", "Dialog"],
    states: ["pending review", "selected request", "decision preview"],
    evidencePoints: [
      "This lane defaults the status filter to pending review.",
      "Selected rows should keep the due date and owner visible in the inspector rail.",
    ],
    decisionHints: [
      "Bias the queue toward fast positive action while evidence remains visible.",
      "Keep exception handling secondary in this lane.",
    ],
    defaultProcurementStatus: "pending-review",
  },
  {
    id: "policy-hold-lane",
    modeId: "procurement",
    name: "Policy hold lane",
    subtitle: "Exception handling",
    summary:
      "Exception lanes prove that the route can hold and explain a blocked request without inventing backend workflow state.",
    badgeLabel: "Exception",
    badgeTone: "danger",
    ariaPrimitives: ["Toolbar", "Table", "Dialog"],
    states: ["policy hold", "evidence visible", "reject path"],
    evidencePoints: [
      "Policy hold rows expose the blocking rationale in the evidence rail.",
      "Operators can preview rejection without clearing the selected record context.",
    ],
    decisionHints: [
      "Do not blur holds into the main lane by default.",
      "Keep exception copy explicit and audit-friendly.",
    ],
    defaultProcurementStatus: "policy-hold",
  },
  {
    id: "full-queue-lane",
    modeId: "procurement",
    name: "Full queue lane",
    subtitle: "Cross-lane scan",
    summary:
      "A full queue scan validates that filters, row selection, and evidence rails stay coherent across mixed statuses.",
    badgeLabel: "All",
    badgeTone: "info",
    ariaPrimitives: ["Toolbar", "Table"],
    states: ["all statuses", "search narrowed", "selected request"],
    evidencePoints: [
      "The queue can mix pending review and policy hold rows without changing layout.",
      "Search stays additive to the lane filter rather than replacing it.",
    ],
    decisionHints: [
      "Use the full lane for oversight, not as the default review path.",
      "Keep row identity readable even when filters widen the queue.",
    ],
    defaultProcurementStatus: "all",
  },
];

const procurementRows: WorkbenchProcurementRow[] = [
  {
    id: "pr-24018",
    requestId: "PR-24018",
    supplier: "Seoul Logistics Partners",
    dueDateIso: "2026-05-14",
    dueDateLabel: "2026-05-14",
    amountLabel: "USD 18,420.00",
    status: "pending-review",
    owner: "Procurement Ops",
    summary: "Routine lane request with shipping lead-time evidence attached.",
    decisionNote: "Approve to release bonded freight before inbound cutoff.",
    evidenceFields: [
      { label: "Owner", value: "Procurement Ops" },
      { label: "Due date", value: "2026-05-14" },
      { label: "Policy signal", value: "Lead-time exception cleared" },
    ],
  },
  {
    id: "pr-24023",
    requestId: "PR-24023",
    supplier: "Bangkok Process Controls",
    dueDateIso: "2026-05-16",
    dueDateLabel: "2026-05-16",
    amountLabel: "USD 9,420.00",
    status: "pending-review",
    owner: "Procurement Ops",
    summary:
      "Local supplier request with matched quote and short aging window.",
    decisionNote: "Approve to keep the maintenance slot on schedule.",
    evidenceFields: [
      { label: "Owner", value: "Procurement Ops" },
      { label: "Due date", value: "2026-05-16" },
      { label: "Policy signal", value: "Matched quote attached" },
    ],
  },
  {
    id: "pr-24031",
    requestId: "PR-24031",
    supplier: "Jakarta Components",
    dueDateIso: "2026-05-20",
    dueDateLabel: "2026-05-20",
    amountLabel: "USD 4,190.00",
    status: "policy-hold",
    owner: "Finance Review",
    summary: "Low-value request held for vendor tax form mismatch.",
    decisionNote:
      "Reject or hold until vendor compliance evidence is corrected.",
    evidenceFields: [
      { label: "Owner", value: "Finance Review" },
      { label: "Due date", value: "2026-05-20" },
      { label: "Policy signal", value: "Vendor tax form mismatch" },
    ],
  },
];

export function getErpRuntimeWorkbenchData(): ErpRuntimeWorkbenchData {
  return {
    title: "ERP Runtime Workbench",
    description:
      "Preview environment for validating Afenda's ERP UI and interaction contract before live modules exist.",
    purpose:
      "The ERP Runtime Workbench previews navigation, selection, filtering, queues, inspectors, evidence, and decision methods with fixture data only. It does not implement real procurement, contracts, approvals, backend workflows, schema, or business logic.",
    modes,
    statusStrip,
    overviewCards,
    previewItems,
    procurementRows,
  };
}
