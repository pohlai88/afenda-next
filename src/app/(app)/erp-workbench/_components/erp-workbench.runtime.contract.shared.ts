/**
 * @afenda-owner erp-workbench
 * @afenda-subject runtime
 * @afenda-artifact contract
 * @afenda-boundary shared
 * @afenda-description Shared serializable contract types for the ERP Runtime Workbench route
 */
import type {
  ApprovedComponentCategory,
  ApprovedComponentStatus,
} from "@/components/ui/app.approval-ledger.schema.shared";

export type WorkbenchStatusTone =
  | "neutral"
  | "info"
  | "success"
  | "warning"
  | "danger";

export type WorkbenchModeId =
  | "overview"
  | "contracts"
  | "methods"
  | "procurement";

export type ProcurementStatusFilter = "all" | "pending-review" | "policy-hold";

export type WorkbenchMode = {
  id: WorkbenchModeId;
  label: string;
  description: string;
  selectorLabel: string;
  defaultItemId: string;
};

export type WorkbenchStatusItem = {
  id: string;
  label: string;
  value: string;
  tone: WorkbenchStatusTone;
};

export type WorkbenchOverviewCard = {
  id: string;
  label: string;
  value: string;
  detail: string;
  tone: WorkbenchStatusTone;
};

export type WorkbenchPreviewItem = {
  id: string;
  modeId: WorkbenchModeId;
  name: string;
  subtitle: string;
  summary: string;
  badgeLabel: string;
  badgeTone: WorkbenchStatusTone;
  sourcePath?: string;
  ariaPrimitives: string[];
  states: string[];
  evidencePoints: string[];
  decisionHints: string[];
  defaultProcurementStatus?: ProcurementStatusFilter;
};

export type WorkbenchEvidenceField = {
  label: string;
  value: string;
};

export type WorkbenchContractProofItem = {
  id: string;
  exportName: string;
  status: ApprovedComponentStatus;
  category: ApprovedComponentCategory;
  sourcePath: string;
  reactAriaPrimitives: string[];
  variants: string[];
  constraints: string[];
  a11yNotes: string[];
  usage?: {
    useWhen: string[];
    avoidWhen: string[];
  };
  demoState: "available" | "planned";
  demoLabel: string;
};

export type WorkbenchProcurementRow = {
  id: string;
  requestId: string;
  supplier: string;
  dueDateIso: string;
  dueDateLabel: string;
  amountLabel: string;
  status: "pending-review" | "policy-hold" | "approved" | "rejected";
  owner: string;
  summary: string;
  evidenceFields: WorkbenchEvidenceField[];
  decisionNote: string;
};

export type ErpRuntimeWorkbenchData = {
  title: string;
  description: string;
  purpose: string;
  modes: WorkbenchMode[];
  statusStrip: WorkbenchStatusItem[];
  overviewCards: WorkbenchOverviewCard[];
  previewItems: WorkbenchPreviewItem[];
  contractProofItems: WorkbenchContractProofItem[];
  procurementRows: WorkbenchProcurementRow[];
};
