/**
 * @afenda-owner marketing-landing
 * @afenda-subject surface
 * @afenda-artifact view
 * @afenda-boundary shared
 * @afenda-description Shared surface view for public marketing landing
 */
import Image from "next/image";
import Link from "next/link";

import {
  evidenceArtifacts,
  implementationProofs,
  landingNavItems,
  operatorScenarios,
  painPoints,
  proofLedgerFields,
  resolutionSteps,
  type OperatorScenario,
} from "./marketing-landing.content.data.fixture";
import {
  declarationFooterIdentity,
  declarationFooterLinks,
} from "../(declaration-docs)/footer";
import styles from "./marketing-landing.module.css";

type LandingStyleName =
  | "artifactEyebrow"
  | "artifactHeader"
  | "artifactPanel"
  | "brand"
  | "brandMark"
  | "chainItem"
  | "chainNumber"
  | "contactCta"
  | "evidenceGrid"
  | "evidenceItem"
  | "fieldGrid"
  | "fieldItem"
  | "footer"
  | "footerContact"
  | "footerDeclaration"
  | "footerIdentity"
  | "footerLegal"
  | "footerLegend"
  | "footerLinks"
  | "footerMeta"
  | "header"
  | "headerActions"
  | "headerInner"
  | "hero"
  | "heroActions"
  | "heroCopy"
  | "heroGrid"
  | "heroImage"
  | "heroKicker"
  | "heroMicrocopy"
  | "heroMonument"
  | "heroNarrative"
  | "heroProofLine"
  | "heroTitle"
  | "heroVisual"
  | "implementationGrid"
  | "implementationPanel"
  | "landingRoot"
  | "landingShell"
  | "layerAnchor"
  | "ledgerBody"
  | "ledgerHeader"
  | "ledgerPacket"
  | "ledgerSeal"
  | "metaGrid"
  | "modelGrid"
  | "nav"
  | "outlineButton"
  | "painGrid"
  | "painItem"
  | "proofRail"
  | "proofStrip"
  | "scenarioCard"
  | "scenarioDetail"
  | "scenarioGrid"
  | "scenarioHeader"
  | "section"
  | "sectionCopy"
  | "sectionHeader"
  | "sectionKicker"
  | "sectionTitle"
  | "solidButton"
  | "stateBlocked"
  | "stateReview"
  | "stateResolved"
  | "statusPill"
  | "stepArrow"
  | "textButton";

const c = styles as Record<LandingStyleName, string>;

function scenarioStateClass(state: OperatorScenario["state"]): string {
  switch (state) {
    case "blocked":
      return c.stateBlocked;
    case "review":
      return c.stateReview;
    case "resolved":
      return c.stateResolved;
  }
}

export function MarketingLandingSurface() {
  return (
    <main className={`${c.landingRoot} afenda-facade-surface`}>
      <header className={c.header}>
        <div className={`${c.landingShell} ${c.headerInner}`}>
          <Link href="#platform" className={c.brand} aria-label="Afenda home">
            <Image
              src="/afenda-brand/afenda-combined-lockup-full-color-transparent.svg"
              alt="Afenda"
              width={1800}
              height={488}
              sizes="(max-width: 640px) min(92vw, 196px), 196px"
              className={c.brandMark}
              priority
            />
          </Link>

          <nav className={c.nav} aria-label="Marketing sections">
            {landingNavItems.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>

          <div className={c.headerActions}>
            <Link href="/iam/sign-in" className={c.textButton}>
              Enter system
            </Link>
            <a href="#contact" className={c.solidButton}>
              Start assessment
            </a>
          </div>
        </div>
      </header>

      <section id="platform" className={`${c.landingShell} ${c.hero}`}>
        <div className={c.heroGrid}>
          <div className={c.heroNarrative}>
            <p className={c.heroKicker}>
              Afenda Palinter for enterprise operations
            </p>
            <h1 className={c.heroTitle}>
              Ship ERP decisions with clarity, speed, and proof.
            </h1>
            <p className={c.heroCopy}>
              Afenda unifies operator action, policy logic, and evidence lineage
              so every workflow executes from one accountable business meaning.
            </p>
            <div
              className={c.heroProofLine}
              aria-label="Afenda operating proof"
            >
              <span>
                <strong>Decision confidence</strong>
                <em>Policy + rationale in one view</em>
              </span>
              <span>
                <strong>Execution velocity</strong>
                <em>Less reconciliation drag</em>
              </span>
              <span>
                <strong>Audit readiness</strong>
                <em>Lineage by design</em>
              </span>
            </div>
            <div className={c.heroActions}>
              <a href="#contact" className={c.solidButton}>
                Start your workflow mapping
              </a>
              <a href="#model" className={c.outlineButton}>
                See how Afenda resolves work
              </a>
            </div>
            <p className={c.heroMicrocopy}>
              Built for high-volume operational teams handling real exceptions.
            </p>
          </div>

          <aside
            className={c.heroVisual}
            aria-label="Afenda layered operating model"
          >
            <figure className={c.heroMonument}>
              <Image
                src="/afenda-brand/afenda-palinter.png"
                alt="Afenda Palinter operational model showing workflow, policy, and enterprise execution layers"
                width={1400}
                height={1400}
                sizes="(max-width: 920px) min(92vw, 760px), min(58vw, 820px)"
                className={c.heroImage}
                priority
              />
              <figcaption className={c.heroMicrocopy}>
                One visual model for how teams decide, execute, and prove
                outcomes across ERP operations.
              </figcaption>
            </figure>
          </aside>
        </div>
      </section>

      <section id="handoffs" className={`${c.landingShell} ${c.section}`}>
        <div className={c.sectionHeader}>
          <p className={c.sectionKicker}>Why operations stall</p>
          <h2 className={c.sectionTitle}>
            Most ERP friction starts between systems, not inside them.
          </h2>
          <p className={c.sectionCopy}>
            Afenda is designed for the moments where teams need to decide
            quickly but context is fragmented. We keep signal, owner, policy,
            and evidence together before action is taken.
          </p>
        </div>

        <div className={c.painGrid}>
          {painPoints.map((point) => (
            <article key={point.title} className={c.painItem}>
              <h3>{point.title}</h3>
              <p>{point.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="model" className={`${c.landingShell} ${c.section}`}>
        <div className={c.sectionHeader}>
          <p className={c.sectionKicker}>Resolution engine</p>
          <h2 className={c.sectionTitle}>
            A five-step path from incoming signal to trusted execution.
          </h2>
          <p className={c.sectionCopy}>
            Every record follows the same discipline: capture, scope, resolve,
            bind, and prove. This is how teams stay fast without trading away
            governance.
          </p>
        </div>

        <div className={c.modelGrid} aria-label="Afenda resolution model">
          {resolutionSteps.map((step, index) => (
            <article key={step.label} className={c.chainItem}>
              <span className={c.chainNumber}>
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3>{step.label}</h3>
              <p>{step.detail}</p>
              {index < resolutionSteps.length - 1 ? (
                <span className={c.stepArrow} aria-hidden="true">
                  /
                </span>
              ) : null}
            </article>
          ))}
        </div>
      </section>

      <section id="workflows" className={`${c.landingShell} ${c.section}`}>
        <div className={c.sectionHeader}>
          <p className={c.sectionKicker}>Workflow coverage</p>
          <p className={c.layerAnchor}>Procurement · Inventory · Contracts</p>
          <h2 className={c.sectionTitle}>
            Designed for the workflows where exceptions actually happen.
          </h2>
          <p className={c.sectionCopy}>
            Afenda applies one operating model across operational domains, so
            teams can move quickly and keep decision quality consistent.
          </p>
        </div>

        <div className={c.scenarioGrid}>
          {operatorScenarios.map((scenario) => (
            <article key={scenario.record} className={c.scenarioCard}>
              <div className={c.scenarioHeader}>
                <div>
                  <p>{scenario.label}</p>
                  <h3>{scenario.record}</h3>
                </div>
                <span
                  className={`${c.statusPill} ${scenarioStateClass(
                    scenario.state,
                  )}`}
                >
                  {scenario.state}
                </span>
              </div>
              <dl className={c.scenarioDetail}>
                <div>
                  <dt>Signal</dt>
                  <dd>{scenario.signal}</dd>
                </div>
                <div>
                  <dt>Decision</dt>
                  <dd>{scenario.decision}</dd>
                </div>
                <div>
                  <dt>Proof</dt>
                  <dd>{scenario.proof}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </section>

      <section id="evidence" className={`${c.landingShell} ${c.section}`}>
        <div className={c.sectionHeader}>
          <p className={c.sectionKicker}>Trust architecture</p>
          <p className={c.layerAnchor}>Policy · Evidence · Audit</p>
          <h2 className={c.sectionTitle}>
            Trust is not an afterthought, it is built into execution.
          </h2>
          <p className={c.sectionCopy}>
            Afenda binds 7W1H context, policy outcomes, and human rationale into
            one packet that stays attached to the record across its lifecycle.
          </p>
        </div>

        <div className={c.evidenceGrid}>
          <section className={c.artifactPanel} aria-label="Evidence packet">
            <div className={c.artifactHeader}>
              <div>
                <p className={c.artifactEyebrow}>Bound evidence packet</p>
                <h3>PO-78221 / Carrier surcharge variance</h3>
              </div>
              <span className={c.ledgerSeal}>Verified</span>
            </div>
            <div className={c.fieldGrid}>
              {proofLedgerFields.map((field) => (
                <div key={field.label} className={c.fieldItem}>
                  <span>{field.label}</span>
                  <strong>{field.value}</strong>
                </div>
              ))}
            </div>
          </section>

          <aside className={c.proofRail} aria-label="Evidence artifacts">
            {evidenceArtifacts.map((artifact) => (
              <article key={artifact.label} className={c.evidenceItem}>
                <h3>{artifact.label}</h3>
                <p>{artifact.detail}</p>
              </article>
            ))}
          </aside>
        </div>
      </section>

      <section id="implementation" className={`${c.landingShell} ${c.section}`}>
        <div className={c.sectionHeader}>
          <p className={c.sectionKicker}>Implementation posture</p>
          <p className={c.layerAnchor}>Data · Logic · Action</p>
          <h2 className={c.sectionTitle}>
            Built for real ERP deployments, not demo surfaces.
          </h2>
          <p className={c.sectionCopy}>
            The same principles applied in product architecture appear here:
            clear boundaries, server-first rendering, and traceable decision
            narratives.
          </p>
        </div>

        <div className={c.implementationGrid}>
          {implementationProofs.map((proof) => (
            <article key={proof.label} className={c.implementationPanel}>
              <h3>{proof.label}</h3>
              <p>{proof.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="contact" className={`${c.landingShell} ${c.contactCta}`}>
        <p className={c.sectionKicker}>Start with one workflow</p>
        <h2>Map your highest-risk ERP handoff into Afenda.</h2>
        <p>
          Bring one live exception path. We map signal, ownership, policy, and
          evidence into a governed operating record your team can execute.
        </p>
        <div className={c.heroActions}>
          <a href="#model" className={c.outlineButton}>
            Review resolution flow
          </a>
          <a
            href="mailto:demo@afenda.test?subject=Afenda%20operating%20workflow"
            className={c.solidButton}
          >
            Book workflow session
          </a>
        </div>
      </section>

      <footer className={`${c.landingShell} ${c.footer}`}>
        <div className={c.footerIdentity}>
          <p className={c.footerLegend}>Public declarations</p>
          <p className={c.footerLegal}>
            Afenda {declarationFooterIdentity.legalEntityName} (Company No.{" "}
            {declarationFooterIdentity.companyRegistrationNumber}).{" "}
            {declarationFooterIdentity.incorporationStatement}
          </p>
          <p className={c.footerMeta}>
            {declarationFooterIdentity.regionalStatement}
          </p>
          <a
            href={`mailto:${declarationFooterIdentity.privacyInquiryEmail}`}
            className={c.footerContact}
          >
            {declarationFooterIdentity.privacyInquiryLabel}:{" "}
            {declarationFooterIdentity.privacyInquiryEmail}
          </a>
        </div>

        <div className={c.footerDeclaration}>
          <p className={c.footerLegend}>
            Privacy, terms, security, support, and trust
          </p>
          <nav className={c.footerLinks} aria-label="Footer links">
            {declarationFooterLinks.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </footer>
    </main>
  );
}
