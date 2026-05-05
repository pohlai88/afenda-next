# AFENDA ERP Landing Page + Application Architecture

> **Draft** — Working specification file. Accepted product commitments for this landing are captured in **[ADR 0011: Afenda Marketing Landing — Business Truth Engine](../adr/0011-afenda-marketing-landing-business-truth.md)**.

## 0. Purpose

This document defines the design architecture for a one-page AFENDA landing page and the application system it represents.

AFENDA should not be positioned as a normal ERP with nicer screens. The page must express a stronger idea:

> **AFENDA is the Business Truth Engine for ERP operations.**
> It turns documents, entities, events, state transitions, evidence, and audit lineage into one canonical operating surface.

The landing page should sell the system by showing how operational truth is created, governed, executed, measured, and proven.

---

## 1. Reference Direction: Palantir + Linear, But AFENDA-Owned

### 1.1 What to take from Palantir-style ontology systems

Use these principles, not the visual identity:

- Object-centric operating model.
- Ontology as the shared language between data, workflow, humans, and agents.
- Workflow lineage as a way to understand how outcomes were produced.
- Resource/object discovery as an operational landing experience.
- Provenance, permissions, and operational context as first-class product surfaces.

### 1.2 What to take from Linear-style product systems

Use these principles, not the visual identity:

- Reduced visual noise.
- Dense but calm interface chrome.
- Strong alignment and hierarchy.
- Fast reading patterns: sidebar, table, detail panel, activity/evidence trail.
- Work objects that feel actionable, not decorative.
- A system where humans and agents can operate from shared context.

### 1.3 What must remain AFENDA

AFENDA is not a product-management tool and not a generic ontology demo.

AFENDA’s domain is ERP truth:

- Procurement truth.
- Inventory truth.
- Contract truth.
- Project truth.
- Approval truth.
- Financial/operational state truth.
- Evidence-bound audit truth.

The page should look like a serious operating system for business execution.

---

## 2. Product Thesis

### 2.1 Core headline

**ERP, resolved to operational truth.**

### 2.2 Supporting statement

AFENDA turns documents, entities, events, and state transitions into one canonical operating surface.

### 2.3 Plain-language product promise

Every operational action should answer:

- What changed?
- Who changed it?
- When did it happen?
- Which object did it affect?
- Why was it allowed?
- Whose responsibility was it?
- Where did it happen?
- How is it proven?

This is the AFENDA truth protocol: **Who, What, When, Where, Why, Which, Whose, How**.

### 2.4 What the page must make obvious

The page must show that AFENDA is:

1. **Operational** — people can run real ERP work.
2. **Ontological** — the system models business reality, not just tables.
3. **Evidence-bound** — actions are attached to proof.
4. **Auditable** — every outcome has lineage.
5. **Governed** — autonomy exists inside policy.
6. **Measurable** — dashboards reflect trusted operational state.

---

## 3. One-Page Landing Architecture

The page should read as one continuous argument:

1. **Hero** — the business truth system.
2. **Ontology stack** — how operations, ontology, governance, and data fit together.
3. **Truth engine** — how documents become canonical records.
4. **Operational workspace** — how users actually work.
5. **Workflow lineage** — how outcomes are traced to origin.
6. **Performance dashboard** — how truth becomes operational visibility.
7. **Architecture principles** — why the system is trustworthy.
8. **Final CTA** — unify ERP, prove every move, operate with confidence.

The page should alternate between:

- Large typographic moments.
- System diagrams.
- Product UI panels.
- Data visualizations.
- Small architectural annotations.

This prevents the page from becoming either pure marketing copy or an unreadable dashboard wall.

---

## 4. Section-by-Section Design Specification

## 4.1 Header

### Purpose

Establish AFENDA as a serious enterprise platform.

### Layout

- Left: `AFENDA` wordmark.
- Center nav:
  - Platform
  - Ontology
  - Operations
  - Evidence
  - Architecture
  - Pricing

- Right CTAs:
  - `Book demo`
  - `Enter system`

### Design notes

- Dark header.
- Minimal border bottom.
- No excessive logo treatment.
- No icons in nav.
- Nav should feel like infrastructure, not marketing decoration.

---

## 4.2 Hero: ERP Resolved to Operational Truth

### Purpose

Immediately position AFENDA as the system that resolves scattered ERP work into operational truth.

### Left content

Headline:

> ERP, resolved to operational truth.

Supporting copy:

> AFENDA turns documents, entities, events, and state transitions into one canonical operating surface.

Primary CTA:

> Book a demo

Secondary CTA:

> Explore the platform

Proof points:

1. **Evidence first**
   Every action bound to verifiable evidence.

2. **Ontology powered**
   One model connects people, things, and transactions.

3. **Audit ready**
   End-to-end lineage from intent to impact.

### Right visual

A stacked system diagram with four layers:

1. **Operations & Agents**
   People, systems, and agents execute work across the enterprise.

2. **Ontology / Decision Model**
   Canonical model of entities, events, rules, and state transitions.

3. **Security & Governance**
   Policy, roles, compliance, and guardrails applied consistently.

4. **Enterprise Data / Logic / Action**
   Trusted data, business logic, and integrations drive outcomes.

Above the stack:

> Autonomy across the business value chain

Value chain stages:

- Estimating
- Procurement
- Labor
- Equipment
- Subcontractors
- Projects
- Production
- Back Office

### Visual behavior

- No sci-fi bloom.
- No decorative shields.
- No excessive particles.
- Subtle signal movement only.
- The system should feel engineered, staged, and inspectable.

---

## 4.3 Truth Engine Section

### Purpose

Explain what makes AFENDA different from conventional ERP screens.

### Section heading

> One truth surface, not scattered records.

### Supporting copy

AFENDA’s ontology unifies the language of the enterprise. Every record is connected to entities, events, and state transitions — bound by evidence and policy.

### Core diagram

A horizontal flow:

```text
Document → Entity → Event → State Transition → Evidence → Audit Trail
```

### Node details

#### Document

Examples:

- Contracts
- Purchase orders
- RFIs
- Reports
- Specifications
- Drawings
- Invoices
- Delivery notes

Purpose:

Documents are not just files. They are source evidence.

#### Entity

Examples:

- People
- Organizations
- Items
- Assets
- Suppliers
- Sites
- Projects
- Contracts

Purpose:

Entities represent the business objects that operations act upon.

#### Event

Examples:

- Created
- Changed
- Approved
- Shipped
- Received
- Closed
- Rejected
- Reopened

Purpose:

Events record that something happened.

#### State Transition

Examples:

- Draft → Submitted
- Submitted → Approved
- Approved → Ordered
- Ordered → Received
- Received → Matched
- Matched → Closed

Purpose:

State transitions record business movement under rules.

#### Evidence

Examples:

- Files
- Signatures
- Confirmations
- Sensor data
- Emails
- Timestamps
- API payloads
- Approval notes

Purpose:

Evidence proves why the system believes the record.

#### Audit Trail

Examples:

- Immutable event history
- Actor history
- Policy checks
- Approval lineage
- Source provenance

Purpose:

Audit trail proves the operational truth over time.

### Evidence protocol panel

```text
Who · What · When · Where
Why · Which · Whose · How
```

Caption:

> Eight questions. One standard for truth.

---

## 4.4 Operational Visibility Section

### Purpose

Show that AFENDA is not only a conceptual truth engine. It is a working ERP command surface.

### Section heading

> See the work. Trust the record. Move with confidence.

### Left navigation modules

- Contracts
- Procurement
- Inventory
- Projects
- Approvals
- Methods
- Queues
- Audit

### Main interface preview

A dense operational table for procurement.

Recommended table fields:

- PO ID
- Title
- Supplier
- Status
- Owner
- Need by
- Amount

Example statuses:

- Draft
- In Review
- Awaiting
- Approved
- Rejected
- Received
- Matched
- Closed

### Detail side rail

When a row is selected, show:

- Header: `PO-78234`
- Status: `Approved`
- Object title: `Steel Beam Package`
- Tabs:
  - Details
  - Evidence
  - Approvals

Details should include:

- Supplier
- Owner
- Need by
- Amount
- Project
- Cost code
- Linked contract

Evidence list should include:

- Signed PO
- Supplier quote
- Approval record
- Pricing approval
- Goods received note

### Accuracy rule

Every UI item in this section must feel operationally plausible. Avoid fake AI claims. Avoid vanity metrics. The interface should reflect a real ERP user trying to decide what to do next.

---

## 4.5 Workflow Lineage Section

### Purpose

Show that every operational outcome can be traced back to its origin.

### Section heading

> Every outcome is traceable to its origin.

### Diagram structure

```text
Inputs → Actions → Policies → Objects → Outputs → Evidence
```

### Example object

`PO-78234 · Steel Beam Package`

### Inputs

- Project plan
- Specification
- Supplier quote

### Actions

- Create PO
- Review & edit
- Approval
- Send to supplier

### Policies

- Spend limit policy
- Supplier approval status
- Tax and compliance region

### Objects

- Purchase Order
- Supplier
- Project
- Cost Code
- Contract

### Outputs

- PO acknowledged
- Delivery scheduled
- Goods received
- Invoice matched

### Evidence

- Signed PO
- Approval record
- Supplier acknowledgement email
- Goods received note

### Design rule

The lineage graph should look technical and inspectable, not decorative. Use small connected cards, clear labels, and directional lines.

---

## 4.6 Operational Performance Section

### Purpose

Show that AFENDA dashboards are trusted because they are built from lineage-bound operational data.

### Section heading

> Real-time insight. Operational impact.

### KPI strip

Recommended KPIs:

- On-time fulfillment
- Cycle time
- Policy exceptions
- Open approvals
- Inventory value

### Visualizations

Use a balanced mix:

1. **Line graph**
   Throughput over time.

2. **Bar chart**
   Spend by category.

3. **Map / regional view**
   Operations by region.

4. **KPI cards**
   High-level operational indicators.

### Accuracy rule

Do not imply these numbers are customer results unless they are real. Use example values as demo data only.

---

## 4.7 Architecture Principles Section

### Purpose

Close with the principles that make the product trustworthy.

### Heading

> Architecture principles you can stake your business on.

### Columns

#### Canonical Record

One authoritative model for entities, events, and state.

Business value:

- Reduces duplicate records.
- Reduces reconciliation friction.
- Creates shared operational language.

#### Bound Evidence

Every action is bound to verifiable evidence.

Business value:

- Proof is attached at the moment of work.
- Audit preparation becomes continuous.
- Teams stop relying on scattered documents and memory.

#### Operational Autonomy

Decentralized execution with centralized guardrails.

Business value:

- Teams can move without waiting on central bottlenecks.
- Policies still govern what is allowed.
- Human and agent actions stay inside accountable boundaries.

#### Audit Visibility

End-to-end lineage and policy enforcement.

Business value:

- Leaders can inspect how outcomes happened.
- Finance, operations, and governance can trace the same record.
- The organization can prove what happened when needed.

---

## 4.8 Final CTA

### Copy

> Unify your ERP. Prove every move. Operate with confidence.

### CTAs

- Book a demo
- Enter the system

### Footer

Recommended links:

- Security
- Privacy
- Terms
- Support

---

## 5. Application Architecture

The landing page should preview the real ERP application architecture. It must not be a disconnected marketing picture.

### 5.1 Core application modules

#### 1. Command Center

Purpose:

A cross-module operational cockpit.

Main surfaces:

- Work queues
- Exceptions
- Approvals
- KPI summaries
- Recent evidence
- Policy alerts

#### 2. Procurement

Purpose:

Manage purchasing from request to receipt and invoice match.

Objects:

- Purchase Requisition
- Purchase Order
- Supplier
- Quote
- Goods Receipt
- Invoice
- Approval
- Evidence Artifact

Key states:

```text
Draft → Submitted → Approved → Ordered → Acknowledged → Received → Matched → Closed
```

#### 3. Contracts

Purpose:

Bind commercial obligations to operational execution.

Objects:

- Contract
- Clause
- Counterparty
- Obligation
- Change Order
- Renewal
- Evidence Artifact

Key states:

```text
Draft → Review → Approved → Active → Amended → Completed → Archived
```

#### 4. Inventory

Purpose:

Represent stock, movements, reservations, and valuation.

Objects:

- Item
- SKU
- Warehouse
- Bin
- Stock Position
- Reservation
- Transfer
- Adjustment

Key states:

```text
Available → Reserved → Picked → Issued → Consumed
```

#### 5. Projects

Purpose:

Connect operational work to project cost, schedule, and delivery outcomes.

Objects:

- Project
- Work Package
- Cost Code
- Milestone
- Site
- Constraint
- Risk
- Evidence Artifact

#### 6. Approvals

Purpose:

Centralize governed decisions.

Objects:

- Approval Request
- Approval Step
- Policy Check
- Delegation
- Exception
- Decision

Key states:

```text
Requested → Assigned → Reviewed → Approved / Rejected → Recorded
```

#### 7. Methods

Purpose:

Define how business work is supposed to happen.

Objects:

- Method
- Standard Operating Procedure
- Rule
- Control
- Template
- Checklist

#### 8. Queues

Purpose:

Route operational work to the right actor.

Objects:

- Queue Item
- Assignment
- Priority
- SLA
- Escalation
- Blocker

#### 9. Evidence

Purpose:

Store and connect proof to every object, action, and decision.

Objects:

- Evidence Artifact
- Source Document
- Signature
- Attachment
- API Event
- Confirmation
- Snapshot

#### 10. Audit

Purpose:

Provide immutable inspection surfaces.

Objects:

- Audit Event
- Actor
- Policy Result
- State Transition
- Evidence Link
- Provenance Trail

---

### 5.2 Core ontology objects

These are the foundational objects AFENDA should model.

```text
Tenant
User
Role
Permission
Policy
PolicyCheck
BusinessUnit
Location
Project
Contract
Supplier
Customer
Item
Asset
Document
Entity
Event
StateTransition
Approval
Workflow
QueueItem
EvidenceArtifact
AuditTrail
Metric
Exception
```

### 5.3 Core relationships

```text
Document        -> references       -> Entity
Document        -> produces         -> EvidenceArtifact
Entity          -> participates_in  -> Event
Event           -> causes           -> StateTransition
StateTransition -> governed_by      -> PolicyCheck
PolicyCheck     -> evaluated_by     -> Policy
Action          -> produces         -> Event
Action          -> requires         -> Approval
Approval        -> decided_by       -> User
Approval        -> evidenced_by     -> EvidenceArtifact
QueueItem       -> assigned_to      -> User / Role
Workflow        -> contains         -> Action
Metric          -> derived_from     -> Event / StateTransition
AuditTrail      -> records          -> Event / StateTransition / PolicyCheck
```

### 5.4 Canonical record shape

Every important business object should resolve into a canonical record.

Recommended canonical fields:

```ts
type CanonicalRecord = {
  id: string;
  tenantId: string;
  objectType: string;
  objectKey: string;
  currentState: string;
  title: string;
  ownerId?: string;
  businessUnitId?: string;
  projectId?: string;
  sourceDocumentIds: string[];
  evidenceArtifactIds: string[];
  latestEventId: string;
  latestStateTransitionId?: string;
  policyStatus: "passed" | "warning" | "blocked" | "not_checked";
  auditTrailId: string;
  createdAt: string;
  updatedAt: string;
};
```

### 5.5 Evidence artifact shape

```ts
type EvidenceArtifact = {
  id: string;
  tenantId: string;
  artifactType:
    | "document"
    | "signature"
    | "email"
    | "api_event"
    | "approval_note"
    | "sensor_event"
    | "snapshot";
  title: string;
  sourceUri?: string;
  checksum?: string;
  capturedAt: string;
  capturedBy?: string;
  linkedObjectType: string;
  linkedObjectId: string;
  linkedEventId?: string;
  immutable: boolean;
};
```

### 5.6 State transition shape

```ts
type StateTransition = {
  id: string;
  tenantId: string;
  objectType: string;
  objectId: string;
  fromState: string;
  toState: string;
  actionType: string;
  actorId: string;
  reason?: string;
  policyCheckIds: string[];
  evidenceArtifactIds: string[];
  occurredAt: string;
};
```

### 5.7 Audit event shape

```ts
type AuditEvent = {
  id: string;
  tenantId: string;
  eventType: string;
  actorId: string;
  objectType: string;
  objectId: string;
  before?: unknown;
  after?: unknown;
  source: "user" | "system" | "integration" | "agent";
  evidenceArtifactIds: string[];
  policyCheckIds: string[];
  occurredAt: string;
};
```

---

## 6. Recommended Page Component Architecture

### 6.1 Next.js route structure

```text
src/app/[locale]/(marketing)/page.tsx
src/app/[locale]/(marketing)/_components/
  landing-header.tsx
  landing-hero.tsx
  ontology-stack-diagram.tsx
  truth-engine-section.tsx
  truth-flow-diagram.tsx
  operations-workspace-preview.tsx
  workflow-lineage-section.tsx
  workflow-lineage-graph.tsx
  performance-dashboard-section.tsx
  architecture-principles-section.tsx
  landing-cta.tsx
  landing-footer.tsx
src/app/[locale]/(marketing)/_lib/
  landing-content.ts
  landing-metrics.fixture.ts
  landing-lineage.fixture.ts
  landing-procurement.fixture.ts
src/app/[locale]/(marketing)/landing.css
```

### 6.2 KISS principle

Keep the landing page mostly server-rendered.

Use client components only where needed:

- animated canvas / diagram
- tabs in product preview
- hover interactions
- chart animation

Do not create a full design registry for the landing page. Use typed content fixtures and simple components.

### 6.3 DRY principle

Extract only stable repeated patterns:

- Section header
- Metric card
- Principle card
- Diagram node
- Product panel frame
- CTA button group

Do not abstract every card prematurely.

---

## 7. Visual Design System

### 7.1 Color direction

### Background

- Near black graphite.
- Slight blue cast.
- Avoid pure black where large panels sit.

Suggested tokens:

```css
--af-bg: #05070b;
--af-surface: #0a0f16;
--af-panel: #111720;
--af-panel-raised: #161d28;
--af-border: rgba(226, 232, 240, 0.1);
--af-border-strong: rgba(226, 232, 240, 0.18);
--af-text: rgba(255, 255, 255, 0.92);
--af-text-muted: rgba(255, 255, 255, 0.58);
--af-text-faint: rgba(255, 255, 255, 0.36);
--af-blue: #67a8ff;
--af-violet: #8f7cff;
--af-green: #5fd18a;
--af-amber: #f4bf63;
--af-red: #ef767a;
```

### 7.2 Typography

Recommended hierarchy:

- Hero headline: 64–80px desktop.
- Section heading: 34–48px.
- Body: 15–17px.
- UI labels: 11–13px.
- Diagram labels: 10–12px uppercase.

Tone:

- Precise.
- Editorial.
- Operational.
- No hype words unless the system can prove them.

### 7.3 Motion language

Use motion as system signal, not spectacle.

Allowed:

- Slow parallax.
- Subtle scan lines.
- Small packet movement.
- Hover reveal on diagrams.
- Tiny chart draw-in.

Avoid:

- Heavy bloom.
- Starfield backgrounds.
- Spinning shield objects.
- Game-like particle bursts.
- Overactive 3D rotation.

### 7.4 Diagram style

- Matte isometric slabs.
- Thin edge glow only.
- Small node labels.
- Business value chain ribbon.
- Engineering-style annotation callouts.
- Layer labels on slab edges.

---

## 8. Business Truth Rules

These are the rules that protect the product story from becoming fake SaaS marketing.

### 8.1 Every dashboard number needs provenance

A dashboard metric should be explainable.

Example:

```text
On-time fulfillment = count of fulfilled orders before required date / total fulfilled orders
```

It should link back to:

- order object
- required date
- fulfillment event
- receiving event
- exception events

### 8.2 Every approval needs evidence

An approval is not just a status.

It needs:

- approver
- timestamp
- policy context
- decision reason
- evidence attachments
- state transition result

### 8.3 Every state change needs an actor

Actor can be:

- human user
- system integration
- automation
- agent

But it must always be identifiable.

### 8.4 Every automation needs a policy boundary

Autonomy is acceptable only if it is bounded.

Required fields:

- allowed action
- policy check
- scope
- rollback or exception path
- evidence output

### 8.5 Every object must have ownership

Objects need responsibility.

Examples:

- owner
- approver
- watcher
- business unit
- cost center
- project

---

## 9. Suggested Copy Deck

### Hero

**ERP, resolved to operational truth.**

AFENDA turns documents, entities, events, and state transitions into one canonical operating surface.

### Truth engine

**One truth surface, not scattered records.**

Every record is connected to the business objects it affects, the events that changed it, the policies that governed it, and the evidence that proves it.

### Operations

**See the work. Trust the record. Move with confidence.**

Run procurement, contracts, inventory, projects, and approvals from a single workspace where every decision is bound to lineage.

### Lineage

**Every outcome is traceable to its origin.**

Follow a purchase order from project plan to supplier quote, approval policy, issued order, received goods, invoice match, and audit record.

### Performance

**Real-time insight. Operational impact.**

Dashboards built from trusted operational state, not manually reconciled reporting layers.

### Trust

**Architecture principles you can stake your business on.**

Canonical records. Bound evidence. Operational autonomy. Audit visibility.

### Final CTA

**Unify your ERP. Prove every move. Operate with confidence.**

---

## 10. Acceptance Criteria

The design passes if:

- The page immediately communicates ERP operational truth.
- The ontology stack is visible and understandable.
- The page does not feel like generic SaaS.
- The product UI feels plausible for ERP operations.
- Evidence and audit are present throughout, not only in one section.
- Charts feel tied to business operations, not decorative analytics.
- The visual language is premium, dark, technical, and restrained.
- The page references Palantir/Linear-level system thinking without copying either brand.
- Every business claim can be tied to a system object, event, state transition, policy, or evidence artifact.

---

## 11. Implementation Priority

### Phase 1 — Static landing page

- Header
- Hero copy
- Ontology stack visual
- Truth engine diagram
- Product UI preview
- Lineage graph
- KPI dashboard preview
- Trust principles
- CTA/footer

### Phase 2 — Motion and interaction

- Canvas-based stacked diagram motion.
- Hover states for lineage nodes.
- Animated signal packets.
- Subtle chart draw-in.
- Reduced-motion support.

### Phase 3 — Product-connected preview

- Replace fixture data with real demo tenant data.
- Connect procurement table to actual objects.
- Connect evidence rail to stored evidence artifacts.
- Generate lineage graph from real state transition and audit records.

### Phase 4 — Production hardening

- Accessibility review.
- SEO metadata.
- Performance budget.
- Responsive tuning.
- Visual regression tests.
- Content governance review.

---

## 12. Final Design Principle

AFENDA should not look like a dashboard vendor.

It should look like the operating surface for business truth.

The landing page must make one thing unavoidable:

> The business does not need more scattered ERP screens.
> It needs one machine that resolves work into truth.

---

## 13. Implementation Parity Checklist

Use this checklist to keep implementation in lockstep with this draft and ADR 0011.

- Header: single-mark brand, required nav order, dual CTAs (`Book demo`, `Enter system`).
- Hero: approved thesis copy + three proof points + ontology stack + value-chain ribbon.
- Truth engine: six-node flow + eight-question protocol strip.
- Operations workspace: draft table columns (`PO ID`, `Title`, `Supplier`, `Status`, `Owner`, `Need by`, `Amount`) + required module rail.
- Lineage: explicit sequence (`Inputs -> Actions -> Policies -> Objects -> Outputs -> Evidence`) with concrete PO example.
- Performance: line trend + bar chart + regional/map view + KPI cards with demo-data scope note.
- Principles: four required cards (`Canonical Record`, `Bound Evidence`, `Operational Autonomy`, `Audit Visibility`).
- Footer: required links (`Security`, `Privacy`, `Terms`, `Support`).
- Metadata: landing title/description/OG aligned to the business-truth thesis.
- Verification: lint + typecheck clean for touched landing files.

## 14. Intentional Deviations

- Header identity intentionally uses the single-mark asset (`/afenda-brand/afenda-icon-light-bg-color.svg`) per current product direction, even though early draft wording references a left-side AFENDA wordmark.
