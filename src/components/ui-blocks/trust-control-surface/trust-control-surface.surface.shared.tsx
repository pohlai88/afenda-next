/**
 * @afenda-owner trust-control-surface
 * @afenda-subject ui-blocks
 * @afenda-artifact surface
 * @afenda-boundary shared
 * @afenda-description Shared surface for the canonical public trust control route.
 */
import Image from "next/image";
import Link from "next/link";

import type {
  TrustControlSurfaceProps,
  TrustSurfaceItem,
  TrustSurfaceState,
} from "./trust-control-surface.types.shared";
import styles from "./trust-control-surface.module.css";

type TrustControlSurfaceStyleName =
  | "aside"
  | "boundaryDetail"
  | "boundaryItem"
  | "boundaryList"
  | "boundaryTitle"
  | "brandLink"
  | "brandMark"
  | "cardGrid"
  | "content"
  | "description"
  | "doctrine"
  | "doctrineLabel"
  | "doctrinePanel"
  | "eyebrow"
  | "footer"
  | "footerContact"
  | "footerIdentity"
  | "footerLegal"
  | "footerLink"
  | "footerLinks"
  | "footerMeta"
  | "header"
  | "headerActions"
  | "headerTop"
  | "hero"
  | "lastUpdated"
  | "mainGrid"
  | "metaLabel"
  | "metaLine"
  | "metaValue"
  | "ownerLink"
  | "pageLabel"
  | "panel"
  | "panelBody"
  | "panelHeader"
  | "panelMeta"
  | "panelTitle"
  | "railBlock"
  | "railHeading"
  | "railLink"
  | "railList"
  | "root"
  | "routeLink"
  | "routeText"
  | "returnLink"
  | "ruleCode"
  | "ruleHeader"
  | "ruleList"
  | "ruleSummary"
  | "section"
  | "sectionCopy"
  | "sectionKicker"
  | "sectionTitle"
  | "shell"
  | "singleColumnGrid"
  | "stateLive"
  | "statePill"
  | "statePlanned"
  | "stateWithheld"
  | "statusNote"
  | "stickyRail"
  | "summary"
  | "title"
  | "twoColumnGrid";

const c = styles as Record<TrustControlSurfaceStyleName, string>;

function stateClassName(state: TrustSurfaceState): string {
  switch (state) {
    case "live":
      return c.stateLive;
    case "planned":
      return c.statePlanned;
    case "withheld":
      return c.stateWithheld;
  }
}

function renderOwnerRoute(ownerRoute: string) {
  return (
    <a href={`mailto:${ownerRoute}`} className={c.ownerLink}>
      {ownerRoute}
    </a>
  );
}

function renderSurfaceRoute(surface: TrustSurfaceItem) {
  if (surface.isPublicLink) {
    return (
      <a href={surface.route} className={c.routeLink}>
        {surface.route}
      </a>
    );
  }

  return <span className={c.routeText}>{surface.route}</span>;
}

export function TrustControlSurface({
  definition,
  legalIdentity,
  footerLinks,
}: TrustControlSurfaceProps) {
  const footerIdentityLine = `Afenda ${legalIdentity.legalEntityName} (Company No. ${legalIdentity.companyRegistrationNumber}). ${legalIdentity.incorporationStatement}`;

  return (
    <main className={`${c.root} afenda-trust-surface`}>
      <div className={c.shell}>
        <header className={c.header}>
          <div className={c.headerTop}>
            <Link
              href="/"
              className={c.brandLink}
              aria-label="Afenda public landing"
            >
              <Image
                src="/afenda-brand/afenda-combined-lockup-full-color-transparent.svg"
                alt="Afenda"
                width={1800}
                height={488}
                sizes="(max-width: 680px) min(58vw, 192px), 214px"
                className={c.brandMark}
                priority
              />
            </Link>

            <div className={c.headerActions}>
              <p className={c.pageLabel}>Canonical public assurance surface</p>
              <Link href="/" className={c.returnLink}>
                Return to platform
              </Link>
            </div>
          </div>

          <div className={c.hero}>
            <div>
              <p className={c.eyebrow}>{definition.eyebrow}</p>
              <h1 className={c.title}>{definition.title}</h1>
              <p className={c.summary}>{definition.summary}</p>
              <p className={c.description}>{definition.description}</p>
            </div>

            <section className={c.doctrinePanel} aria-label="Trust doctrine">
              <p className={c.doctrineLabel}>Doctrine</p>
              <p className={c.doctrine}>{definition.doctrine}</p>
              <div className={c.metaLine}>
                <span className={c.statusNote}>{definition.statusNote}</span>
                <span className={c.lastUpdated}>{definition.lastUpdatedLabel}</span>
              </div>
            </section>
          </div>
        </header>

        <div className={c.mainGrid}>
          <aside className={c.aside}>
            <nav className={c.stickyRail} aria-label="Trust sections">
              <section className={c.railBlock}>
                <h2 className={c.railHeading}>Control surface</h2>
                <ul className={c.railList}>
                  <li>
                    <a href="#posture" className={c.railLink}>
                      <strong>Current posture</strong>
                      <span>What is publicly declared right now.</span>
                    </a>
                  </li>
                  <li>
                    <a href="#evidence" className={c.railLink}>
                      <strong>Evidence</strong>
                      <span>What is proven and when it was last updated.</span>
                    </a>
                  </li>
                  <li>
                    <a href="#surfaces" className={c.railLink}>
                      <strong>Surfaces</strong>
                      <span>Live, planned, and withheld trust routes.</span>
                    </a>
                  </li>
                  <li>
                    <a href="#commitments" className={c.railLink}>
                      <strong>Commitments</strong>
                      <span>How Afenda routes trust-sensitive work.</span>
                    </a>
                  </li>
                  <li>
                    <a href="#boundaries" className={c.railLink}>
                      <strong>Boundaries</strong>
                      <span>What Afenda explicitly does not claim.</span>
                    </a>
                  </li>
                  <li>
                    <a href="#activation-rules" className={c.railLink}>
                      <strong>Activation rules</strong>
                      <span>What must exist before new trust routes ship.</span>
                    </a>
                  </li>
                </ul>
              </section>
            </nav>
          </aside>

          <div className={c.content}>
            <section id="posture" className={c.section}>
              <p className={c.sectionKicker}>Current posture</p>
              <h2 className={c.sectionTitle}>Current posture</h2>
              <p className={c.sectionCopy}>
                These posture signals are public because they already have a
                real route, a real owner path, and a real evidence source.
              </p>
              <div className={c.cardGrid}>
                {definition.currentPosture.map((signal) => (
                  <article key={signal.id} className={c.panel}>
                    <div className={c.panelHeader}>
                      <h3 className={c.panelTitle}>{signal.label}</h3>
                      <span
                        className={`${c.statePill} ${stateClassName(signal.state)}`}
                      >
                        {signal.state}
                      </span>
                    </div>
                    <p className={c.panelBody}>{signal.summary}</p>
                    <div className={c.panelMeta}>
                      <span className={c.metaLabel}>Owner route</span>
                      <span className={c.metaValue}>
                        {renderOwnerRoute(signal.ownerRoute)}
                      </span>
                    </div>
                    <div className={c.panelMeta}>
                      <span className={c.metaLabel}>Proof source</span>
                      <span className={c.metaValue}>
                        {signal.href ? (
                          <a href={signal.href} className={c.routeLink}>
                            {signal.proofSource}
                          </a>
                        ) : (
                          signal.proofSource
                        )}
                      </span>
                    </div>
                    <div className={c.panelMeta}>
                      <span className={c.metaLabel}>Last updated</span>
                      <span className={c.metaValue}>{signal.lastUpdatedLabel}</span>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section id="evidence" className={c.section}>
              <p className={c.sectionKicker}>Evidence</p>
              <h2 className={c.sectionTitle}>What is proven right now.</h2>
              <p className={c.sectionCopy}>
                Afenda replaces absent certification theater with public proof
                that can be inspected route by route.
              </p>
              <div className={c.twoColumnGrid}>
                {definition.evidence.map((item) => (
                  <article key={item.id} className={c.panel}>
                    <div className={c.panelHeader}>
                      <h3 className={c.panelTitle}>{item.title}</h3>
                      <a href={item.href} className={c.routeLink}>
                        {item.href}
                      </a>
                    </div>
                    <p className={c.panelBody}>{item.statement}</p>
                    <div className={c.panelMeta}>
                      <span className={c.metaLabel}>Proof source</span>
                      <span className={c.metaValue}>{item.proofSource}</span>
                    </div>
                    <div className={c.panelMeta}>
                      <span className={c.metaLabel}>Last updated</span>
                      <span className={c.metaValue}>{item.lastUpdatedLabel}</span>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section id="surfaces" className={c.section}>
              <p className={c.sectionKicker}>Surfaces</p>
              <h2 className={c.sectionTitle}>Public trust surfaces and state.</h2>
              <p className={c.sectionCopy}>
                Live surfaces have public links. Planned and withheld surfaces
                are named here, but they remain inactive until their activation
                rule is satisfied.
              </p>
              <div className={c.cardGrid}>
                {definition.surfaces.map((surface) => (
                  <article key={surface.id} className={c.panel}>
                    <div className={c.panelHeader}>
                      <h3 className={c.panelTitle}>{surface.label}</h3>
                      <span
                        className={`${c.statePill} ${stateClassName(surface.state)}`}
                      >
                        {surface.state}
                      </span>
                    </div>
                    <p className={c.panelBody}>{surface.summary}</p>
                    <div className={c.panelMeta}>
                      <span className={c.metaLabel}>Route</span>
                      <span className={c.metaValue}>
                        {renderSurfaceRoute(surface)}
                      </span>
                    </div>
                    <div className={c.panelMeta}>
                      <span className={c.metaLabel}>Owner route</span>
                      <span className={c.metaValue}>
                        {renderOwnerRoute(surface.ownerRoute)}
                      </span>
                    </div>
                    <div className={c.panelMeta}>
                      <span className={c.metaLabel}>Proof source</span>
                      <span className={c.metaValue}>{surface.proofSource}</span>
                    </div>
                    <div className={c.panelMeta}>
                      <span className={c.metaLabel}>Last updated</span>
                      <span className={c.metaValue}>{surface.lastUpdatedLabel}</span>
                    </div>
                    {surface.activationRuleId ? (
                      <div className={c.panelMeta}>
                        <span className={c.metaLabel}>Activation rule</span>
                        <span className={c.metaValue}>{surface.activationRuleId}</span>
                      </div>
                    ) : null}
                  </article>
                ))}
              </div>
            </section>

            <section id="commitments" className={c.section}>
              <p className={c.sectionKicker}>Commitments</p>
              <h2 className={c.sectionTitle}>How Afenda handles trust-sensitive work.</h2>
              <p className={c.sectionCopy}>
                These are route and response commitments, not marketing claims.
              </p>
              <div className={c.twoColumnGrid}>
                {definition.commitments.map((commitment) => (
                  <article key={commitment.id} className={c.panel}>
                    <div className={c.panelHeader}>
                      <h3 className={c.panelTitle}>{commitment.title}</h3>
                      {commitment.href ? (
                        <a href={commitment.href} className={c.routeLink}>
                          {commitment.href}
                        </a>
                      ) : null}
                    </div>
                    <p className={c.panelBody}>{commitment.summary}</p>
                    <div className={c.panelMeta}>
                      <span className={c.metaLabel}>Expectation</span>
                      <span className={c.metaValue}>{commitment.expectation}</span>
                    </div>
                    <div className={c.panelMeta}>
                      <span className={c.metaLabel}>Owner route</span>
                      <span className={c.metaValue}>
                        {renderOwnerRoute(commitment.ownerRoute)}
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section id="boundaries" className={c.section}>
              <p className={c.sectionKicker}>Boundaries</p>
              <h2 className={c.sectionTitle}>What Afenda does not claim.</h2>
              <p className={c.sectionCopy}>
                Negative-space trust matters. Afenda names the claims it is not
                prepared to make yet.
              </p>
              <div className={c.boundaryList}>
                {definition.boundaries.map((boundary) => (
                  <article key={boundary.id} className={c.boundaryItem}>
                    <h3 className={c.boundaryTitle}>{boundary.title}</h3>
                    <p className={c.boundaryDetail}>{boundary.detail}</p>
                  </article>
                ))}
              </div>
            </section>

            <section id="activation-rules" className={c.section}>
              <p className={c.sectionKicker}>Activation rules</p>
              <h2 className={c.sectionTitle}>Trust surface activation rules.</h2>
              <p className={c.sectionCopy}>
                New trust routes do not ship because they sound useful. They
                ship only when the underlying operational truth exists.
              </p>
              <div className={c.singleColumnGrid}>
                {definition.activationRules.map((rule) => (
                  <article key={rule.id} className={c.panel}>
                    <div className={c.ruleHeader}>
                      <span className={c.ruleCode}>{rule.id}</span>
                      <p className={c.ruleSummary}>
                        {rule.surfaceLabel} remains gated at {rule.route} until
                        the following conditions are met.
                      </p>
                    </div>
                    <ul className={c.ruleList}>
                      {rule.requirements.map((requirement) => (
                        <li key={requirement}>{requirement}</li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </section>

            <footer className={c.footer}>
              <div className={c.footerIdentity}>
                <p className={c.footerLegal}>{footerIdentityLine}</p>
                <p className={c.footerMeta}>{legalIdentity.regionalStatement}</p>
                <a
                  href={`mailto:${legalIdentity.privacyInquiryEmail}`}
                  className={c.footerContact}
                >
                  {legalIdentity.privacyInquiryLabel}:{" "}
                  {legalIdentity.privacyInquiryEmail}
                </a>
              </div>

              <nav className={c.footerLinks} aria-label="Trust footer links">
                {footerLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className={c.footerLink}
                    aria-current={link.href === "/trust" ? "page" : undefined}
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </footer>
          </div>
        </div>
      </div>
    </main>
  );
}
