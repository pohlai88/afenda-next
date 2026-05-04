/**
 * @afenda-owner app-drop-zone
 * @afenda-subject control
 * @afenda-artifact primitive
 * @afenda-boundary test
 * @afenda-description Test coverage for app-drop-zone explicit primitive boundary
 */
import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { AppDropZone } from "@/components/ui-governance/app-drop-zone/app-drop-zone.control.primitive.client";

describe("AppDropZone", () => {
  it("renders a governed drop surface with owned label and supporting content", () => {
    const { container } = render(
      <AppDropZone
        label="Drop supporting documents"
        description="Accepted: PDF, CSV, or PNG."
      >
        <span>Invoice-1024.pdf</span>
      </AppDropZone>,
    );

    expect(screen.getByText("Drop supporting documents")).toBeVisible();
    expect(screen.getByText("Accepted: PDF, CSV, or PNG.")).toBeVisible();
    expect(screen.getByText("Invoice-1024.pdf")).toBeVisible();
    expect(container.firstElementChild).toHaveClass("min-h-28");
  });

  it("supports compact sizing with aria-label and custom child content", () => {
    const { container } = render(
      <AppDropZone aria-label="Compact intake drop zone" size="sm">
        <span>Drop files here</span>
      </AppDropZone>,
    );

    expect(screen.getByLabelText("Compact intake drop zone")).toBeVisible();
    expect(screen.getByText("Drop files here")).toBeVisible();
    expect(container.firstElementChild).toHaveClass("min-h-24");
  });

  it("rejects missing accessible naming in development", () => {
    expect(() =>
      render(
        <AppDropZone>
          <span>Drop files</span>
        </AppDropZone>,
      ),
    ).toThrow("AppDropZone requires label, aria-label, or aria-labelledby.");
  });

  it("rejects an empty owned surface in development", () => {
    expect(() =>
      render(<AppDropZone aria-label="Empty drop zone" />),
    ).toThrow("AppDropZone requires visible label content or children.");
  });
});
