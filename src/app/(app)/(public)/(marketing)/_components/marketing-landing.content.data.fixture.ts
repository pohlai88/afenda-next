/**
 * @afenda-owner marketing-landing
 * @afenda-subject content
 * @afenda-artifact data
 * @afenda-boundary fixture
 * @afenda-description Static content data for public marketing landing
 */

export type LandingNavItem = {
  readonly label: string;
  readonly href: string;
};

export type ProofField = {
  readonly label: string;
  readonly value: string;
};

export type PainPoint = {
  readonly title: string;
  readonly body: string;
};

export type ResolutionStep = {
  readonly label: string;
  readonly detail: string;
};

export type OperatorScenario = {
  readonly label: string;
  readonly record: string;
  readonly state: "review" | "resolved" | "blocked";
  readonly signal: string;
  readonly decision: string;
  readonly proof: string;
};

export type EvidenceArtifact = {
  readonly label: string;
  readonly detail: string;
};

export type ImplementationProof = {
  readonly label: string;
  readonly detail: string;
};

export type TruthStackLayer = {
  readonly label: string;
  readonly title: string;
  readonly detail: string;
  readonly edge: string;
  readonly tone: "accent" | "verified" | "foundation";
  readonly nodes: readonly string[];
};

export const landingNavItems = [
  { label: "Platform", href: "#platform" },
  { label: "Workflows", href: "#workflows" },
  { label: "Trust", href: "#evidence" },
  { label: "Execution", href: "#implementation" },
] satisfies readonly LandingNavItem[];

export const truthDomains = [
  "Procurement",
  "Inventory",
  "Contracts",
  "Projects",
  "Finance",
  "Audit",
] as const;

export const proofLedgerFields = [
  { label: "Who", value: "Nadia Harun, Regional Procurement Lead" },
  { label: "What", value: "Freight surcharge outside approved corridor" },
  { label: "When", value: "2026-05-05 09:42 GMT+8" },
  { label: "Where", value: "Shah Alam consolidation hub" },
  { label: "Why", value: "Carrier uplift exceeded contract threshold" },
  { label: "Which", value: "PO-78221 / Contract C-4418 / Lane MY-SG" },
  { label: "Whose", value: "SEA operations cost center" },
  { label: "How", value: "Policy-scored route with bound rationale" },
] satisfies readonly ProofField[];

export const heroLedgerSummary = [
  { label: "Record", value: "RES-2026-051" },
  { label: "State", value: "Resolved" },
  { label: "Owner", value: "Operations West" },
  { label: "Source", value: "ERP + WMS + contract" },
] satisfies readonly ProofField[];

export const painPoints = [
  {
    title: "Teams move fast, context moves slow",
    body: "Procurement, warehouse, and finance resolve exceptions under time pressure while context stays fragmented across systems.",
  },
  {
    title: "Approval confidence decays",
    body: "By the time an approver reviews a case, source payloads, policy scope, and human rationale are already disconnected.",
  },
  {
    title: "Audit becomes reconstruction",
    body: "Teams spend cycles rebuilding lineage after decisions, instead of carrying proof with work from the first mutation.",
  },
] satisfies readonly PainPoint[];

export const resolutionSteps = [
  {
    label: "Capture signal",
    detail:
      "A handoff, exception, posting, or external payload enters one governed operating boundary.",
  },
  {
    label: "Scope context",
    detail:
      "Actor identity, role scope, source system, and policy intent are attached before action begins.",
  },
  {
    label: "Resolve with ontology",
    detail:
      "Palinter aligns entities and relationships so teams evaluate the same business meaning across workflows.",
  },
  {
    label: "Bind record",
    detail:
      "Decision, rationale, and evidence become one canonical operating record instead of scattered artifacts.",
  },
  {
    label: "Prove outcome",
    detail:
      "Audit can read who changed what, why it was approved, and which proof justified execution.",
  },
] satisfies readonly ResolutionStep[];

export const truthStackLayers = [
  {
    label: "Layer 01",
    title: "Operator Work",
    detail:
      "Exceptions, approvals, movements, postings, and handoffs arrive from real operating workflows.",
    edge: "Business workflows",
    tone: "accent",
    nodes: ["Procurement exception", "Inventory movement", "Finance handoff"],
  },
  {
    label: "Layer 02",
    title: "Resolution Core",
    detail:
      "Afenda binds actor, record, rule, reason, source, and evidence before action moves.",
    edge: "Decision boundary",
    tone: "accent",
    nodes: ["Source", "Owner", "Policy", "Reason"],
  },
  {
    label: "Layer 03",
    title: "Evidence + Policy",
    detail:
      "Proof stays attached to the work so approvals remain traceable at the moment of decision.",
    edge: "Proof packet",
    tone: "verified",
    nodes: ["7W1H", "Contract", "Threshold", "Approval note"],
  },
  {
    label: "Layer 04",
    title: "Ontology Model",
    detail:
      "Shared business meaning keeps procurement, finance, inventory, and audit aligned.",
    edge: "Business meaning",
    tone: "foundation",
    nodes: ["Actor", "Record", "Method", "Asset"],
  },
  {
    label: "Layer 05",
    title: "ERP Data / Logic / Action",
    detail:
      "Core systems remain the base: ERP transactions, events, rules, and downstream action.",
    edge: "System substrate",
    tone: "foundation",
    nodes: ["ERP", "WMS", "Finance", "Audit"],
  },
] satisfies readonly TruthStackLayer[];

export const operatorScenarios = [
  {
    label: "Procurement variance",
    record: "PO-78221",
    state: "review",
    signal: "Carrier applies non-contracted surcharge 38 minutes before dispatch.",
    decision: "Hold release until policy score, lane terms, and budget owner acceptance align.",
    proof: "Rate card delta, contract clause, planner note, and owner approval trail.",
  },
  {
    label: "Inventory critical move",
    record: "INV-4410",
    state: "resolved",
    signal: "Critical spare is requested for emergency shift on Line 3.",
    decision:
      "Post movement only when destination, maintenance order, and receiving authority are verified.",
    proof: "Scanner trail, work-order link, bin transfer event, supervisor attestation.",
  },
  {
    label: "Finance invoice mismatch",
    record: "INV-90872",
    state: "blocked",
    signal:
      "Invoice tax and quantity differ from PO after goods receipt confirmation.",
    decision: "Block payment until procurement, receiving, and tax rule checks converge.",
    proof: "Invoice image, PO ledger line, receiving event, policy checkpoint verdict.",
  },
  {
    label: "Method governance",
    record: "MTH-118",
    state: "resolved",
    signal: "Project site requests temporary deviation from approved operating method.",
    decision:
      "Approve only after method version, risk category, and accountable approver are bound in one packet.",
    proof: "Method revision, job context, exception rationale, signed decision lineage.",
  },
] satisfies readonly OperatorScenario[];

export const evidenceArtifacts = [
  {
    label: "Source integrity",
    detail: "ERP object, WMS event, finance ledger, and signed documents are retained as first-class evidence.",
  },
  {
    label: "Policy intelligence",
    detail: "Pass, review, or block outcomes remain linked to the rule version and threshold context.",
  },
  {
    label: "Human accountability",
    detail: "Operator and approver rationale are bound to the same record as machine-validated outcomes.",
  },
  {
    label: "Audit continuity",
    detail:
      "Timestamp, actor, source lineage, and linked records stay queryable without post-facto reconstruction.",
  },
] satisfies readonly EvidenceArtifact[];

export const implementationProofs = [
  {
    label: "Server-first and indexable",
    detail:
      "Landing route remains static App Router output with segment-owned metadata and crawl-friendly delivery.",
  },
  {
    label: "Brand-system aligned",
    detail:
      "Visual language consumes Afenda runtime tokens to stay coherent with product surfaces, not a disconnected marketing skin.",
  },
  {
    label: "Workflow-native storytelling",
    detail:
      "Narrative structure reflects real ERP operator workflows: exception, decision, proof, and execution.",
  },
  {
    label: "No template lock-in",
    detail:
      "Reference quality informs craft while implementation stays native: no external template runtime, no extra UI dependency sprawl.",
  },
] satisfies readonly ImplementationProof[];
