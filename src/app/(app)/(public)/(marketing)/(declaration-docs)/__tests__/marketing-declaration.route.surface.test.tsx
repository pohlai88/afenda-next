/**
 * @afenda-owner marketing-declarations
 * @afenda-subject route
 * @afenda-artifact surface
 * @afenda-boundary test
 * @afenda-description Route surface coverage for public declaration routes and metadata.
 */
import {
  createElement,
  type AnchorHTMLAttributes,
  type ImgHTMLAttributes,
  type ReactNode,
} from "react";
import { screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { renderWithProviders } from "@/test-runtime/test-runtime.render.helper.test";

vi.mock("next/image", () => ({
  default: ({
    priority: _priority,
    ...props
  }: ImgHTMLAttributes<HTMLImageElement> & { priority?: boolean }) =>
    createElement("img", props),
}));

vi.mock("next/link", () => ({
  default: ({
    href,
    children,
    ...props
  }: AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
    children: ReactNode;
  }) => createElement("a", { ...props, href }, children),
}));

import {
  declarationDocuments,
  declarationFooterIdentity,
  declarationFooterLinks,
} from "../declaration-documents.data.shared";
import PrivacyDeclarationPage, {
  metadata as privacyMetadata,
} from "../privacy/page";
import SecurityDisclosurePage, {
  metadata as securityDisclosureMetadata,
} from "../security/disclosure/page";
import SecurityDeclarationPage, {
  metadata as securityMetadata,
} from "../security/page";
import SupportDeclarationPage, {
  metadata as supportMetadata,
} from "../support/page";
import TermsDeclarationPage, { metadata as termsMetadata } from "../terms/page";

const declarationCases = [
  {
    key: "privacy",
    Page: PrivacyDeclarationPage,
    metadata: privacyMetadata,
    document: declarationDocuments.privacy,
  },
  {
    key: "terms",
    Page: TermsDeclarationPage,
    metadata: termsMetadata,
    document: declarationDocuments.terms,
  },
  {
    key: "security",
    Page: SecurityDeclarationPage,
    metadata: securityMetadata,
    document: declarationDocuments.security,
  },
  {
    key: "security-disclosure",
    Page: SecurityDisclosurePage,
    metadata: securityDisclosureMetadata,
    document: declarationDocuments["security/disclosure"],
  },
  {
    key: "support",
    Page: SupportDeclarationPage,
    metadata: supportMetadata,
    document: declarationDocuments.support,
  },
] as const;

describe("marketing declaration routes", () => {
  it.each(declarationCases)(
    "renders the $key declaration shell",
    ({ Page, document }) => {
      const { container } = renderWithProviders(<Page />);

      expect(
        screen.getByRole("heading", {
          level: 1,
          name: document.title,
        }),
      ).toBeInTheDocument();
      expect(screen.getByText(document.summary)).toBeInTheDocument();
      expect(screen.getByAltText("Afenda")).toBeInTheDocument();

      const sectionNav = screen.getByRole("navigation", {
        name: `${document.title} sections`,
      });
      document.sections.forEach((section) => {
        expect(
          within(sectionNav).getByRole("link", {
            name: new RegExp(section.title, "i"),
          }),
        ).toHaveAttribute("href", `#${section.id}`);
        expect(container.querySelector(`#${section.id}`)).not.toBeNull();
      });

      document.relatedLinks.forEach((link) => {
        expect(
          screen
            .getAllByRole("link")
            .some(
              (anchor) =>
                anchor.getAttribute("href") === link.href &&
                anchor.textContent?.includes(link.label),
            ),
        ).toBe(true);
      });

      declarationFooterLinks.forEach((link) => {
        expect(
          screen
            .getAllByRole("link", { name: link.label })
            .some((anchor) => anchor.getAttribute("href") === link.href),
        ).toBe(true);
      });

      expect(
        screen.getAllByText(declarationFooterIdentity.legalEntityName).length,
      ).toBeGreaterThan(0);
      expect(
        screen.getAllByText(declarationFooterIdentity.companyRegistrationNumber)
          .length,
      ).toBeGreaterThan(0);
      expect(
        screen.getAllByText(declarationFooterIdentity.regionalStatement).length,
      ).toBeGreaterThan(0);
      expect(
        screen.getByRole("link", {
          name: `${declarationFooterIdentity.privacyInquiryLabel}: ${declarationFooterIdentity.privacyInquiryEmail}`,
        }),
      ).toHaveAttribute(
        "href",
        `mailto:${declarationFooterIdentity.privacyInquiryEmail}`,
      );

      expect(container.querySelector("[style]")).toBeNull();
    },
  );

  it.each(declarationCases)(
    "sets metadata for the $key declaration route",
    ({ metadata, document }) => {
      expect(metadata.title).toBe(document.title);
      expect(metadata.description).toBe(document.description);
      expect(metadata.alternates?.canonical).toBe(`/${document.slug}`);
      expect(metadata.openGraph?.url).toBe(`/${document.slug}`);
      expect(metadata.robots).toEqual({
        index: true,
        follow: true,
      });
    },
  );
});
