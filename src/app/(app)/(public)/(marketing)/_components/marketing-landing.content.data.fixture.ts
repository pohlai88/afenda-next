/**
 * @afenda-owner marketing-landing
 * @afenda-subject content
 * @afenda-artifact data
 * @afenda-boundary fixture
 * @afenda-description Runtime neutral content data fixture for public marketing landing
 */

export type LandingNavItem = {
  readonly label: string;
  readonly href: string;
};

export type OntologyLayer = {
  readonly label: string;
  readonly summary: string;
  readonly signals: readonly string[];
};

export type TruthFlowNode = {
  readonly label: string;
  readonly example: string;
  readonly artifactTypes?: readonly string[];
};

export type ProcurementRow = {
  readonly id: string;
  readonly supplier: string;
  readonly owner: string;
  readonly state: string;
  readonly policyStatus: "cleared" | "exception" | "review";
  readonly amount: string;
  readonly actor: string;
  readonly updatedAt: string;
  readonly reason: string;
};

export type EvidenceArtifact = {
  readonly id: string;
  readonly type: string;
  readonly owner: string;
  readonly receivedAt: string;
  readonly state: string;
};

export type ApprovalRecord = {
  readonly approver: string;
  readonly time: string;
  readonly policyContext: string;
  readonly rationale: string;
  readonly attachments: readonly string[];
  readonly outcome: string;
};

export type ProcurementRecord = {
  readonly id: string;
  readonly title: string;
  readonly owner: string;
  readonly costCenter: string;
  readonly state: string;
  readonly actor: string;
  readonly reason: string;
  readonly policyStatus: string;
  readonly evidence: readonly EvidenceArtifact[];
  readonly approvals: readonly ApprovalRecord[];
};

export type LineageNode = {
  readonly label: string;
  readonly detail: string;
  readonly tone: "input" | "action" | "policy" | "object" | "output" | "evidence";
};

export type LandingMetric = {
  readonly label: string;
  readonly value: string;
  readonly scope: string;
  readonly trend: readonly number[];
};

export type ArchitecturePrinciple = {
  readonly title: string;
  readonly body: string;
  readonly proof: string;
};

export const landingNavItems = [
  { label: "Platform", href: "#platform" },
  { label: "Ontology", href: "#ontology" },
  { label: "Operations", href: "#operations" },
  { label: "Evidence", href: "#evidence" },
  { label: "Architecture", href: "#architecture" },
  { label: "Pricing", href: "#pricing" },
] satisfies readonly LandingNavItem[];

export const ontologyLayers = [
  {
    label: "Operations and agents",
    summary: "People, integrations, and AI agents propose work through one operating boundary.",
    signals: ["Planner", "Buyer", "Warehouse", "Agent"],
  },
  {
    label: "Decision model",
    summary: "Entities, events, and state transitions resolve each action into a canonical record.",
    signals: ["CanonicalRecord", "StateTransition", "PolicyCheck"],
  },
  {
    label: "Security and governance",
    summary: "Policy checks, approval rules, and actor identity stay bound to every change.",
    signals: ["Zero trust", "Role scope", "Exception path"],
  },
  {
    label: "Enterprise data",
    summary: "Documents, API payloads, contracts, inventory, and finance records converge into proof.",
    signals: ["Documents", "ERP data", "Payloads", "Evidence"],
  },
] satisfies readonly OntologyLayer[];

export const valueChainSteps = [
  "Estimate",
  "Source",
  "Approve",
  "Receive",
  "Invoice",
  "Reconcile",
  "Audit",
] as const;

export const truthQuestions = [
  "Who",
  "What",
  "When",
  "Where",
  "Why",
  "Which",
  "Whose",
  "How",
] as const;

export const truthFlowNodes = [
  {
    label: "Document",
    example: "Supplier quote Q-4471 with signed commercial terms",
  },
  {
    label: "Entity",
    example: "Canonical supplier, project, cost center, and purchase order objects",
  },
  {
    label: "Event",
    example: "PO-78234 submitted by procurement operations",
  },
  {
    label: "State transition",
    example: "Draft -> Submitted -> Policy cleared -> Ready to receive",
  },
  {
    label: "Evidence",
    example: "Bound proof used to justify action and later audit",
    artifactTypes: ["Signatures", "Sensor data", "API payloads", "Signed quotes"],
  },
  {
    label: "Audit trail",
    example: "Actor, policy, reason, evidence, and outcome retained together",
  },
] satisfies readonly TruthFlowNode[];

export const procurementRows = [
  {
    id: "PO-78234",
    supplier: "Northline Industrial",
    owner: "Procurement North",
    state: "Policy cleared",
    policyStatus: "cleared",
    amount: "USD 118,420",
    actor: "Ari Chen",
    updatedAt: "2026-05-05 09:42",
    reason: "Line 3 conveyor rebuild requires approved spare assemblies",
  },
  {
    id: "PO-78221",
    supplier: "Kato Logistics",
    owner: "Operations West",
    state: "Exception review",
    policyStatus: "exception",
    amount: "USD 42,875",
    actor: "Integration: WMS",
    updatedAt: "2026-05-05 08:16",
    reason: "Freight uplift exceeds lane tolerance by 6.4 percent",
  },
  {
    id: "PO-78188",
    supplier: "Mira Packaging",
    owner: "Packaging Cell",
    state: "Awaiting approval",
    policyStatus: "review",
    amount: "USD 27,640",
    actor: "Agent: reorder-guard",
    updatedAt: "2026-05-04 17:08",
    reason: "Inventory coverage projected below committed project demand",
  },
  {
    id: "PO-78172",
    supplier: "Orion Controls",
    owner: "Maintenance",
    state: "Ready to receive",
    policyStatus: "cleared",
    amount: "USD 9,860",
    actor: "Marta Silva",
    updatedAt: "2026-05-04 15:33",
    reason: "Approved replacement sensors match preventive maintenance plan",
  },
] satisfies readonly ProcurementRow[];

export const selectedProcurementRecord = {
  id: "PO-78234",
  title: "Line 3 conveyor rebuild spare assemblies",
  owner: "Procurement North",
  costCenter: "OPS-310 Conveyor Reliability",
  state: "Policy cleared",
  actor: "Ari Chen",
  reason: "Line 3 conveyor rebuild requires approved spare assemblies before shutdown window",
  policyStatus: "Cleared by spend, supplier, and project controls",
  evidence: [
    {
      id: "EV-1190",
      type: "Signed quote",
      owner: "Northline Industrial",
      receivedAt: "2026-05-05 09:17",
      state: "Verified hash",
    },
    {
      id: "EV-1191",
      type: "Inventory sensor extract",
      owner: "Warehouse A",
      receivedAt: "2026-05-05 09:20",
      state: "Bound to event",
    },
    {
      id: "EV-1192",
      type: "Budget policy payload",
      owner: "Finance controls",
      receivedAt: "2026-05-05 09:24",
      state: "Policy checked",
    },
  ],
  approvals: [
    {
      approver: "Dana Morris",
      time: "2026-05-05 09:38",
      policyContext: "Capital threshold under approved shutdown budget",
      rationale: "Supplier quote matches negotiated frame agreement and timing protects the planned outage",
      attachments: ["EV-1190", "EV-1192"],
      outcome: "Approved",
    },
    {
      approver: "System policy",
      time: "2026-05-05 09:40",
      policyContext: "Supplier risk, spend band, and cost center match",
      rationale: "No blocked sanctions, no duplicate PO, budget available",
      attachments: ["EV-1190", "EV-1191", "EV-1192"],
      outcome: "Cleared",
    },
  ],
} satisfies ProcurementRecord;

export const lineageNodes = [
  {
    label: "Project plan",
    detail: "Shutdown window approved for line 3 reliability work",
    tone: "input",
  },
  {
    label: "Buyer action",
    detail: "Ari Chen submits PO-78234 with reason and supplier terms",
    tone: "action",
  },
  {
    label: "Policy check",
    detail: "Spend, supplier, project, and duplicate-order checks pass",
    tone: "policy",
  },
  {
    label: "Canonical object",
    detail: "Purchase order, cost center, supplier, and inventory objects are linked",
    tone: "object",
  },
  {
    label: "Goods received",
    detail: "Receipt state inherits the approved order and bound evidence",
    tone: "output",
  },
  {
    label: "Audit evidence",
    detail: "Quote, sensor extract, policy payload, actor, rationale, and outcome retained",
    tone: "evidence",
  },
] satisfies readonly LineageNode[];

export const landingMetrics = [
  {
    label: "Procurement cycle time",
    value: "31% faster",
    scope: "Example metric from demo lineage data",
    trend: [48, 45, 42, 38, 35, 33],
  },
  {
    label: "Policy exceptions",
    value: "14 open",
    scope: "Demo exceptions with actor and evidence attached",
    trend: [20, 18, 16, 17, 15, 14],
  },
  {
    label: "Evidence coverage",
    value: "96%",
    scope: "Example coverage across purchase-order transitions",
    trend: [82, 86, 88, 91, 94, 96],
  },
] satisfies readonly LandingMetric[];

export const architecturePrinciples = [
  {
    title: "Canonical record",
    body: "Every commercial or physical reality resolves into one object surface operators can inspect.",
    proof: "Reduces reconciliation across scattered ERP tables",
  },
  {
    title: "Bound evidence",
    body: "Documents, payloads, signatures, and sensor readings stay attached to the action they justify.",
    proof: "Keeps approvals and audits traceable",
  },
  {
    title: "Operational autonomy",
    body: "Humans, integrations, and agents can move work forward inside centralized guardrails.",
    proof: "Preserves throughput without weakening control",
  },
  {
    title: "Audit visibility",
    body: "Actor, policy, reason, evidence, and state transition are captured as first-class facts.",
    proof: "Makes outcomes explainable without manual reconstruction",
  },
] satisfies readonly ArchitecturePrinciple[];
