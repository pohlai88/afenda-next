import type { MockProcurementApproval } from "../mock.types.shared";

/** Small queue for Interface Lab / storybook-style previews and e2e labels. */
export const MOCK_PROCUREMENT_APPROVALS: readonly MockProcurementApproval[] = [
  {
    id: "po-mock-1001",
    title: "Vendor frame agreement — Q2 office supplies",
    lane: "pending",
    amount: "USD 12,450.00",
    owner: "Procurement · North",
  },
  {
    id: "po-mock-1002",
    title: "Emergency spare parts — line 3 conveyor",
    lane: "pending",
    amount: "USD 3,200.50",
    owner: "Maintenance",
  },
  {
    id: "po-mock-0990",
    title: "Annual support renewal — ERP connector",
    lane: "approved",
    amount: "USD 48,000.00",
    owner: "IT Operations",
  },
];
