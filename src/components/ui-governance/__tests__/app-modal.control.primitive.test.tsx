/**
 * @afenda-owner app-modal
 * @afenda-subject control
 * @afenda-artifact primitive
 * @afenda-boundary test
 * @afenda-description Test coverage for app-modal explicit primitive boundary
 */
import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Button, Dialog, Heading } from "react-aria-components";

import {
  AppDialogTrigger,
  AppModal,
} from "@/components/ui-governance/app-modal/app-modal.control.primitive.client";

describe("AppModal", () => {
  it("renders a governed blocking overlay with owned panel chrome", () => {
    render(
      <AppModal isOpen size="lg">
        <Dialog aria-label="Edit order">
          <Heading slot="title">Edit order</Heading>
          <p>Update quantity and due date.</p>
        </Dialog>
      </AppModal>,
    );

    expect(screen.getByRole("dialog", { name: "Edit order" })).toBeVisible();
    expect(document.querySelector("[data-app-modal-panel]")).toHaveClass(
      "surface-raised",
    );
    expect(document.querySelector("[data-app-modal-panel]")).toHaveClass(
      "max-w-2xl",
    );
    expect(document.querySelector("[data-app-modal-viewport]")).toHaveClass(
      "items-center",
    );
  });

  it("supports governed dialog trigger composition", () => {
    render(
      <AppDialogTrigger defaultOpen>
        <Button>Open audit</Button>
        <AppModal placement="top">
          <Dialog aria-label="Audit history">
            <Heading slot="title">Audit history</Heading>
            <p>Review the last change set.</p>
          </Dialog>
        </AppModal>
      </AppDialogTrigger>,
    );

    expect(
      screen.getByRole("button", { name: "Open audit", hidden: true }),
    ).toBeInTheDocument();
    expect(screen.getByRole("dialog", { name: "Audit history" })).toBeVisible();
    expect(document.querySelector("[data-app-modal-viewport]")).toHaveClass(
      "items-start",
    );
  });

  it("rejects missing children in development", () => {
    expect(() => render(<AppModal isOpen>{null}</AppModal>)).toThrow(
      "AppModal requires children.",
    );
  });

  it("rejects invalid trigger composition in development", () => {
    expect(() =>
      render(
        <AppDialogTrigger>
          <Button>Open audit</Button>
        </AppDialogTrigger>,
      ),
    ).toThrow(
      "AppDialogTrigger requires exactly two direct React element children.",
    );
  });
});
