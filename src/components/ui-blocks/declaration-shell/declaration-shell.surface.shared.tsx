/**
 * @afenda-owner declaration-shell
 * @afenda-subject ui-blocks
 * @afenda-artifact surface
 * @afenda-boundary shared
 * @afenda-description Shared surface for static public declaration routes.
 */
import Image from "next/image";
import Link from "next/link";

import type {
  DeclarationContactChannel,
  DeclarationSection,
  DeclarationShellProps,
} from "./declaration-shell.types.shared";
import styles from "./declaration-shell.module.css";

type DeclarationShellStyleName =
  | "article"
  | "articleLead"
  | "aside"
  | "bodyText"
  | "brandLink"
  | "brandMark"
  | "bulletList"
  | "contactDetail"
  | "contactGrid"
  | "contactItem"
  | "contactLabel"
  | "contactValue"
  | "description"
  | "eyebrow"
  | "footer"
  | "footerContact"
  | "footerIdentity"
  | "footerLegal"
  | "footerLink"
  | "footerLinks"
  | "footerMeta"
  | "frame"
  | "header"
  | "headerActions"
  | "headerDeck"
  | "headerTop"
  | "identityGrid"
  | "identityItem"
  | "lastUpdated"
  | "pageLabel"
  | "railBlock"
  | "railHeading"
  | "railLink"
  | "railList"
  | "railListItem"
  | "returnLink"
  | "root"
  | "section"
  | "sectionBody"
  | "sectionHeader"
  | "sectionLink"
  | "sectionNumber"
  | "sectionTitle"
  | "shell"
  | "statusNote"
  | "statusPill"
  | "stickyRail"
  | "summary"
  | "title";

const c = styles as Record<DeclarationShellStyleName, string>;

function renderChannelValue(channel: DeclarationContactChannel) {
  if (!channel.href) {
    return <span className={c.contactValue}>{channel.value}</span>;
  }

  return (
    <a href={channel.href} className={c.contactValue}>
      {channel.value}
    </a>
  );
}

function renderSectionSummary(section: DeclarationSection): string {
  return section.body[0] ?? section.bullets?.[0] ?? section.title;
}

export function DeclarationShell({
  document,
  footerLinks,
  legalIdentity,
}: DeclarationShellProps) {
  const primaryContact = document.contactChannels[0];
  const footerIdentityLine = `Afenda ${legalIdentity.legalEntityName} (Company No. ${legalIdentity.companyRegistrationNumber}). ${legalIdentity.incorporationStatement}`;

  return (
    <main className={`${c.root} afenda-declaration-surface`}>
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
              <p className={c.pageLabel}>Public declaration</p>
              <Link href="/" className={c.returnLink}>
                Return to platform
              </Link>
            </div>
          </div>

          <div className={c.headerDeck}>
            <div>
              <p className={c.eyebrow}>{document.eyebrow}</p>
              <h1 className={c.title}>{document.title}</h1>
              <p className={c.summary}>{document.summary}</p>
            </div>

            <dl className={c.identityGrid}>
              <div className={c.identityItem}>
                <dt>Entity</dt>
                <dd>{legalIdentity.legalEntityName}</dd>
              </div>
              <div className={c.identityItem}>
                <dt>Company number</dt>
                <dd>{legalIdentity.companyRegistrationNumber}</dd>
              </div>
              <div className={c.identityItem}>
                <dt>Territory</dt>
                <dd>{legalIdentity.regionalStatement}</dd>
              </div>
              <div className={c.identityItem}>
                <dt>Primary route</dt>
                <dd>
                  {primaryContact?.value ?? legalIdentity.privacyInquiryEmail}
                </dd>
              </div>
            </dl>
          </div>
        </header>

        <div className={c.frame}>
          <aside className={c.aside}>
            <div className={c.stickyRail}>
              <section className={c.railBlock}>
                <h2 className={c.railHeading}>In this declaration</h2>
                <nav aria-label={`${document.title} sections`}>
                  <ol className={c.railList}>
                    {document.sections.map((section) => (
                      <li key={section.id} className={c.railListItem}>
                        <a href={`#${section.id}`} className={c.sectionLink}>
                          <strong>{section.title}</strong>
                          <span>{renderSectionSummary(section)}</span>
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>
              </section>

              <section className={c.railBlock}>
                <h2 className={c.railHeading}>Related routes</h2>
                <nav aria-label="Related public routes">
                  <ul className={c.railList}>
                    {document.relatedLinks.map((link) => (
                      <li key={link.href} className={c.railListItem}>
                        <a href={link.href} className={c.railLink}>
                          <strong>{link.label}</strong>
                          <span>{link.description}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </section>

              <section className={c.railBlock}>
                <h2 className={c.railHeading}>Contact routes</h2>
                <div className={c.contactGrid}>
                  {document.contactChannels.map((channel) => (
                    <div key={channel.label} className={c.contactItem}>
                      <span className={c.contactLabel}>{channel.label}</span>
                      {renderChannelValue(channel)}
                      <span className={c.contactDetail}>{channel.detail}</span>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </aside>

          <article className={c.article}>
            <div className={c.articleLead}>
              <span className={c.statusPill}>Static declaration</span>
              {document.statusNote ? (
                <span className={c.statusNote}>{document.statusNote}</span>
              ) : null}
              {document.lastUpdatedLabel ? (
                <span className={c.lastUpdated}>
                  {document.lastUpdatedLabel}
                </span>
              ) : null}
            </div>

            <p className={c.description}>{document.description}</p>

            {document.sections.map((section, index) => (
              <section key={section.id} id={section.id} className={c.section}>
                <div className={c.sectionHeader}>
                  <span className={c.sectionNumber}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h2 className={c.sectionTitle}>{section.title}</h2>
                    <div className={c.sectionBody}>
                      {section.body.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                      {section.bullets ? (
                        <ul className={c.bulletList}>
                          {section.bullets.map((bullet) => (
                            <li key={bullet}>{bullet}</li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                  </div>
                </div>
              </section>
            ))}
          </article>
        </div>

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

          <nav className={c.footerLinks} aria-label="Declaration footer links">
            {footerLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={c.footerLink}
                aria-current={
                  link.href === `/${document.slug}` ? "page" : undefined
                }
              >
                {link.label}
              </a>
            ))}
          </nav>
        </footer>
      </div>
    </main>
  );
}
