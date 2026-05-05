/**
 * @afenda-owner marketing-trust
 * @afenda-subject route
 * @afenda-artifact surface
 * @afenda-boundary test
 * @afenda-description Route surface test coverage for the public trust control surface
 */
import {
  createElement,
  type AnchorHTMLAttributes,
  type ImgHTMLAttributes,
  type ReactNode,
} from "react";
import { screen } from "@testing-library/react";
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
  publicTrustFooterLinks,
  securityTxtHref,
  trustSurfaceDefinition,
} from "@/features/public-trust/public-trust.content.data.fixture";

import TrustPage, { metadata } from "../(declaration-docs)/trust/page";

describe("marketing trust route", () => {
  it("renders the canonical trust control surface", () => {
    const { container } = renderWithProviders(<TrustPage />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: trustSurfaceDefinition.title,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(trustSurfaceDefinition.summary),
    ).toBeInTheDocument();
    expect(
      screen.getByText(trustSurfaceDefinition.doctrine),
    ).toBeInTheDocument();
    expect(
      screen.getByText(trustSurfaceDefinition.statusNote),
    ).toBeInTheDocument();
    expect(
      screen.getAllByText(trustSurfaceDefinition.lastUpdatedLabel).length,
    ).toBeGreaterThan(0);
    expect(screen.getByAltText("Afenda")).toBeInTheDocument();

    [
      "Current posture",
      "What is proven right now.",
      "Public trust surfaces and state.",
      "How Afenda handles trust-sensitive work.",
      "What Afenda does not claim.",
      "Trust surface activation rules.",
    ].forEach((heading) => {
      expect(
        screen.getByRole("heading", {
          level: 2,
          name: heading,
        }),
      ).toBeInTheDocument();
    });

    const sectionNav = screen.getByRole("navigation", {
      name: "Trust sections",
    });
    [
      "#posture",
      "#evidence",
      "#surfaces",
      "#commitments",
      "#boundaries",
      "#activation-rules",
    ].forEach((href) => {
      expect(container.querySelector(href)).not.toBeNull();
    });
    expect(sectionNav).toBeInTheDocument();

    trustSurfaceDefinition.currentPosture.forEach((signal) => {
      expect(screen.getAllByText(signal.label).length).toBeGreaterThan(0);
      expect(screen.getByText(signal.summary)).toBeInTheDocument();
      expect(screen.getAllByText(signal.ownerRoute).length).toBeGreaterThan(0);
      expect(screen.getAllByText(signal.proofSource).length).toBeGreaterThan(0);
    });

    trustSurfaceDefinition.evidence.forEach((item) => {
      expect(screen.getByText(item.title)).toBeInTheDocument();
      expect(screen.getByText(item.statement)).toBeInTheDocument();
      expect(
        screen
          .getAllByRole("link")
          .some((link) => link.getAttribute("href") === item.href),
      ).toBe(true);
    });

    trustSurfaceDefinition.surfaces.forEach((surface) => {
      expect(screen.getAllByText(surface.label).length).toBeGreaterThan(0);
      expect(screen.getByText(surface.summary)).toBeInTheDocument();
      expect(screen.getAllByText(surface.ownerRoute).length).toBeGreaterThan(0);
      expect(screen.getAllByText(surface.proofSource).length).toBeGreaterThan(
        0,
      );

      if (surface.isPublicLink) {
        expect(
          screen
            .getAllByRole("link")
            .some((link) => link.getAttribute("href") === surface.route),
        ).toBe(true);
      } else {
        expect(screen.getByText(surface.route)).toBeInTheDocument();
        expect(
          container.querySelector(`a[href="${surface.route}"]`),
        ).toBeNull();
      }
    });

    trustSurfaceDefinition.commitments.forEach((commitment) => {
      expect(screen.getByText(commitment.title)).toBeInTheDocument();
      expect(screen.getByText(commitment.summary)).toBeInTheDocument();
      expect(screen.getByText(commitment.expectation)).toBeInTheDocument();
    });

    trustSurfaceDefinition.boundaries.forEach((boundary) => {
      expect(screen.getByText(boundary.title)).toBeInTheDocument();
      expect(screen.getByText(boundary.detail)).toBeInTheDocument();
    });

    trustSurfaceDefinition.activationRules.forEach((rule) => {
      expect(screen.getAllByText(rule.id).length).toBeGreaterThan(0);
      expect(
        screen.getByText(
          new RegExp(`${rule.surfaceLabel} remains gated at ${rule.route}`),
        ),
      ).toBeInTheDocument();
      rule.requirements.forEach((requirement) => {
        expect(screen.getByText(requirement)).toBeInTheDocument();
      });
    });

    publicTrustFooterLinks.forEach((link) => {
      expect(
        screen
          .getAllByRole("link", { name: link.label })
          .some((anchor) => anchor.getAttribute("href") === link.href),
      ).toBe(true);
    });

    expect(
      screen
        .getAllByRole("link")
        .some((link) => link.getAttribute("href") === securityTxtHref),
    ).toBe(true);

    expect(container.querySelector("[style]")).toBeNull();
  });

  it("publishes indexable trust metadata", () => {
    expect(metadata.title).toBe("Trust");
    expect(metadata.description).toBe(
      "Canonical public assurance surface for Afenda, covering current posture, evidence, commitments, boundaries, and trust-route activation doctrine.",
    );
    expect(metadata.alternates?.canonical).toBe("/trust");
    expect(metadata.openGraph?.url).toBe("/trust");
    expect(metadata.robots).toEqual({
      index: true,
      follow: true,
    });
  });
});
