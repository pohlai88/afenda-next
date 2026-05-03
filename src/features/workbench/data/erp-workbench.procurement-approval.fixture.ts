/**
 * @afenda-owner erp-workbench
 * @afenda-subject procurement-approval
 * @afenda-artifact fixture
 * @afenda-boundary fixture
 * @afenda-description Fixture rows for the procurement approval workbench scene
 */
export type ProcurementApprovalDemoRow = {
  id: string;
  requestId: string;
  supplier: string;
  dueDateLabel: string;
  amountLabel: string;
  status: "pending-review" | "policy-hold" | "approved" | "rejected";
  owner: string;
};

export const PROCUREMENT_APPROVAL_DEMO_ROWS: ProcurementApprovalDemoRow[] = [
  {
    id: "pr-24018",
    requestId: "PR-24018",
    supplier: "Seoul Logistics Partners",
    dueDateLabel: "2026-05-14",
    amountLabel: "USD 18,420.00",
    status: "pending-review",
    owner: "Procurement Ops",
  },
  {
    id: "pr-24023",
    requestId: "PR-24023",
    supplier: "Bangkok Process Controls",
    dueDateLabel: "2026-05-16",
    amountLabel: "USD 9,420.00",
    status: "pending-review",
    owner: "Procurement Ops",
  },
  {
    id: "pr-24031",
    requestId: "PR-24031",
    supplier: "Jakarta Components",
    dueDateLabel: "2026-05-20",
    amountLabel: "USD 4,190.00",
    status: "policy-hold",
    owner: "Finance Review",
  },
];

export function getProcurementApprovalStatusLabel(
  status: ProcurementApprovalDemoRow["status"],
) {
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
