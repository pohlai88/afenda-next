/**
 * @afenda-owner marketing-landing
 * @afenda-subject route
 * @afenda-artifact surface
 * @afenda-boundary test
 * @afenda-description Route surface test coverage for public marketing landing
 */
import {
  createElement,
  type AnchorHTMLAttributes,
  type ImgHTMLAttributes,
  type ReactNode,
} from "react";
import { screen } from "@testing-library/react";
import { beforeAll, describe, expect, it, vi } from "vitest";

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
  landingNavItems,
  operatorScenarios,
  proofLedgerFields,
} from "../_components/marketing-landing.content.data.fixture";
import {
  declarationFooterIdentity,
  declarationFooterLinks,
} from "../(declaration-docs)/declaration-documents.data.shared";
import MarketingLandingPage, { metadata } from "../page";

beforeAll(() => {
  if (!Element.prototype.getAnimations) {
    Element.prototype.getAnimations = () => [];
  }
});

describe("marketing landing route", () => {
  it("renders the editorial operating surface", () => {
    const { container } = renderWithProviders(<MarketingLandingPage />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Ship ERP decisions with clarity, speed, and proof.",
      }),
    ).toBeInTheDocument();

    expect(screen.getByAltText("Afenda")).toBeInTheDocument();
    expect(
      screen.getByLabelText("Afenda layered operating model"),
    ).toBeInTheDocument();
    expect(
      screen.getByAltText(
        "Afenda Palinter operational model showing workflow, policy, and enterprise execution layers",
      ),
    ).toBeInTheDocument();
    expect(screen.getAllByText(/workflow/i).length).toBeGreaterThan(
      0,
    );

    [
      "Most ERP friction starts between systems, not inside them.",
      "A five-step path from incoming signal to trusted execution.",
      "Designed for the workflows where exceptions actually happen.",
      "Trust is not an afterthought, it is built into execution.",
      "Built for real ERP deployments, not demo surfaces.",
      "Map your highest-risk ERP handoff into Afenda.",
    ].forEach((heading) => {
      expect(screen.getByText(heading)).toBeInTheDocument();
    });

    [
      "Procurement · Inventory · Contracts",
      "Policy · Evidence · Audit",
      "Data · Logic · Action",
    ].forEach((label) => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });

    landingNavItems.forEach((item) => {
      const links = screen.getAllByRole("link", { name: item.label });
      expect(
        links.some((link) => link.getAttribute("href") === item.href),
      ).toBe(true);
      expect(container.querySelector(item.href)).not.toBeNull();
    });

    expect(
      screen.getByRole("link", { name: "See how Afenda resolves work" }),
    ).toHaveAttribute("href", "#model");
    expect(
      screen
        .getAllByRole("link", { name: "Book workflow session" })
        .some(
          (link) =>
            link.getAttribute("href") ===
            "mailto:demo@afenda.test?subject=Afenda%20operating%20workflow",
        ),
    ).toBe(true);

    proofLedgerFields.forEach((field) => {
      expect(screen.getAllByText(field.label).length).toBeGreaterThan(0);
      expect(screen.getAllByText(field.value).length).toBeGreaterThan(0);
    });

    operatorScenarios.forEach((scenario) => {
      expect(screen.getAllByText(scenario.label).length).toBeGreaterThan(0);
      expect(screen.getAllByText(scenario.record).length).toBeGreaterThan(0);
    });

    expect(
      screen.getByText(/\[Legal Entity Name\]/),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/\[Company Registration Number\]/),
    ).toBeInTheDocument();
    expect(
      screen.getByText(declarationFooterIdentity.regionalStatement),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", {
        name: `${declarationFooterIdentity.privacyInquiryLabel}: ${declarationFooterIdentity.privacyInquiryEmail}`,
      }),
    ).toHaveAttribute(
      "href",
      `mailto:${declarationFooterIdentity.privacyInquiryEmail}`,
    );

    declarationFooterLinks.forEach((link) => {
      expect(
        screen
          .getAllByRole("link", { name: link.label })
          .some((anchor) => anchor.getAttribute("href") === link.href),
      ).toBe(true);
    });

    expect(container.querySelector("[style]")).toBeNull();
  });

  it("removes stale dark command-center story labels", () => {
    renderWithProviders(<MarketingLandingPage />);

    expect(
      screen.queryByText("One truth surface, not scattered records."),
    ).toBe(null);
    expect(screen.queryByText("Procurement queue")).toBe(null);
    expect(screen.queryByText("Real-time insight. Operational impact.")).toBe(
      null,
    );
    expect(screen.queryByText("Demo data only")).toBe(null);
    expect(screen.queryByText("Afenda Truth Stack")).toBe(null);
    expect(
      screen.queryByText("Work, evidence, and record in one bounded stack."),
    ).toBe(null);
  });

  it("sets indexable landing metadata for the repositioning", () => {
    expect(metadata.title).toBe("Afenda Palinter | ERP Decisions With Proof");
    expect(metadata.alternates?.canonical).toBe("/");
    expect(metadata.description).toBe(
      "Afenda unifies workflow signal, policy logic, and evidence lineage so ERP teams execute faster with accountable outcomes.",
    );
    expect(metadata.openGraph?.title).toBe(
      "Afenda Palinter | ERP Decisions With Proof",
    );
  });
});
