# ADR 0011: Afenda Marketing Landing — Business Truth Engine

- **Date:** 2026-05-05
- **Status:** Accepted
- **Owner:** afenda-next architecture
- **Subject:** marketing-landing-business-truth
- **Artifact:** ADR
- **Boundary:** doc

## Context

Afenda must not present as generic ERP UI polish or ornamental SaaS. The **public marketing landing** needs a coherent story: ERP work is unified into **operational truth**—documents, entities, events, state transitions, evidence, and audit lineage on **one canonical operating surface**.

Stakeholders drew system-thinking references (Palantir-style ontology lineage, Linear-style dense calm chrome) **as principles**, not visual plagiarism. Domain remains ERP: procurement, inventory, contracts, projects, approvals, finance/ops state, and evidence-bound audit.

The landing must **preview** real application semantics (modules, ontology objects, relationships, canonical/evidence shapes) so marketing does not detach from product reality.

Detailed copy decks, KPI examples, fixture rows, and pixel-level visual tokens may evolve in design briefs; this ADR records **decisions** and **acceptance rules** governance must enforce.

## Decision

### 1. Product thesis on the landing

- Primary headline framing: **“ERP, resolved to operational truth.”**
- Supporting claim: scattered documents and records converge into **one truth surface** with **Who / What / When / Where / Why / Which / Whose / How** answerable against system objects—not slogans disconnected from modeled reality.

### 2. Mandatory narrative spine (single-page)

The landing reads as **one continuous argument**, alternating typography, diagrams, plausible product panels, restrained data visuals, and small annotations—not a decorative dashboard wall nor pure prose.

Sections, in order:

1. Header — enterprise platform framing; minimal nav (**Platform, Ontology, Operations, Evidence, Architecture, Pricing**); CTAs (**Book demo**, **Enter system**); dark, infrastructural chrome; **no decorative nav icons**.
2. Hero — thesis + ontology stack (**Operations & agents → Decision model → Security & governance → Enterprise data/logic/action**) and **business value-chain ribbon** (e.g. estimating through back office).
3. Truth engine — horizontal flow **Document → Entity → Event → State transition → Evidence → Audit trail**, with credible domain examples per node plus **evidence protocol** (**eight questions, one standard**).
4. Operational visibility — plausible **dense procurement workspace**: module rail, PO table with ERP-realistic statuses, detail rail (**Details / Evidence / Approvals**). No fake AI hype; vanity metrics discouraged.
5. Workflow lineage — technical, inspectable graph: **Inputs → Actions → Policies → Objects → Outputs → Evidence** with a concrete PO example trail.
6. Operational performance — charts and KPI strip tied to **lineage-derived** notions; numbers labeled or scoped as **example/demo** unless backed by real data.
7. Architecture principles — four columns (**Canonical record, Bound evidence, Operational autonomy, Audit visibility**) with operational business value, not fluff.
8. Final CTA + footer — unify/prove/confidence; legal/support links.

### 3. Application architecture alignment

The landing **previews**, not replaces, ERP architecture:

- **Modules** surfaced in copy and UI mocks: Command center, Procurement, Contracts, Inventory, Projects, Approvals, Methods, Queues, Evidence, Audit—with objects, states, and relationships consistent with ontology direction.
- Canonical shapes (**CanonicalRecord**, **EvidenceArtifact**, **StateTransition**, **AuditEvent**) are **reference contracts** for product and for landing fixtures; evolve in domain code independently but **claims on the landing must map** to objects, events, transitions, policies, or evidence—not ungrounded hype.

### 4. Implementation shape (Next.js App Router)

- Prefer **mostly Server Components**; **narrow client islands** only for diagrams with motion, tabbed previews, hover reveals, chart draw-in—with **`prefers-reduced-motion`** respect.
- **Typed content fixtures** (`landing-content`, procurement/lineage/metrics fixtures) feeding section components—not a governed `App*` registry build-out for marketing.
- **KISS**: extract **only** repeating primitives when reuse is real (**section header**, **metric card**, **principle card**, **diagram node**, **panel frame**, **CTA group**).
- Concrete route segments may evolve (e.g. locale prefix later); landing code lives under an explicit **marketing** route group aligned with repo conventions and architecture checks **when implemented**.

### 5. Visual and motion doctrine

- **Dark, restrained, engineering-grade** aesthetic: graphite panels, subtle borders, signal colors for meaning—not spectacle.
- **Motion** is **system signal** (slow parallax, subtle scan/step, small packet movement, light chart draw-in). **Excluded**: heavy bloom, starfields, game-like particles, flashy 3D.
- Prefer **semantic tokens** (`globals.css` / approved aliases). Where marketing-only tokens are needed temporarily, scope them narrowly (e.g. route-local stylesheet) and avoid introducing competing product-wide vocabularies (per existing visual doctrine).

### 6. Business truth rules (marketing integrity)

Landing content must obey:

1. Dashboard-style numbers imply **explainable provenance** (objects, events, dates) even when using demo data.
2. Approvals in mocks show **approver, time, policy context, rationale, attachments, outcome**.
3. State changes always imply an **identifiable actor** (human, system, integration, agent).
4. Automation or autonomy references stay **inside policy boundaries** with exception/rollback/evidence cues.
5. Objects show **ownership** (owner, org, project, cost center where relevant).

### 7. Delivery phases (planning baseline)

Implementation is intentionally phased:

| Phase | Focus |
| --- | --- |
| 1 | Static sections, diagrams, plausible fixtures, footer |
| 2 | Motion/interaction where needed + reduced-motion |
| 3 | Optional product-connected data (demo tenant, real evidence lineage) |
| 4 | A11y, SEO, perf budget, responsive polish, regression/governance |

This ADR does not mandate schedule; it mandates **ordering discipline** so the page ships as a truthful shell before brittle animation or live data coupling.

### 8. Acceptance (design pass / PR bar)

Treat as **accepted** toward product goals when:

- **ERP operational truth** is obvious above the fold and reinforced through evidence/audit, not bolted on once.
- Ontology/stack and lineage read as **operational**, not infographic decoration.
- Product panels feel **execution-plausible** for procurement/approval workflows.
- Visual tone is **premium, dark, technical, restrained**.
- Narrative aligns with Afenda domain (ERP truth), **not** PM-tool or generic ontology-demo positioning.
- Business claims tie to **modelable** objects/events/evidence/policy (even if mocks use fixtures).

## Alternatives Considered

1. **Conventional SaaS ERP landing (“nicer dashboards”)** — Rejected for Afenda positioning: it reinforces screen quantity over **canonical truth**, evidence, and lineage, which are the differentiated story.

2. **Pure brand/marketing microsite divorced from ontology and module architecture** — Rejected: the landing must **preview** real application semantics so claims stay accountable to modeled objects.

3. **Workbench-style extension of Interface Studio/registry for every marketing molecule** — Rejected **for Phase 1**: violates KISS; governed `App*` registration is unnecessary until a primitive is intentionally promoted for product reuse.

## Consequences

- Marketing landing work is judged against **truth-engine positioning** and **fixture plausibility**, not generic SaaS completeness.
- New landing components should **default server-first**; client boundaries require justification per section.
- **No requirement** to register marketing-only widgets in shared UI manifests unless a primitive is promoted for product reuse.
- When locales or routing groups change, **update the concrete path** in source but keep this ADR’s **semantic layout and rules** authoritative unless superseded by a newer ADR.
- Full copy decks, KPI tables, and exact token spreadsheets remain **maintainable outside** this file; significant thesis or acceptance changes should **supersede** this ADR with a follow-on record rather than silent drift.
