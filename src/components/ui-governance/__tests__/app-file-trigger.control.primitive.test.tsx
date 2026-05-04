/**
 * @afenda-owner app-file-trigger
 * @afenda-subject control
 * @afenda-artifact primitive
 * @afenda-boundary test
 * @afenda-description Test coverage for app-file-trigger explicit primitive boundary
 */
import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Button } from "react-aria-components";

import { AppFileTrigger } from "@/components/ui-governance/app-file-trigger/app-file-trigger.control.primitive.client";

describe("AppFileTrigger", () => {
  it("renders a governed file trigger with a single pressable child", () => {
    render(
      <AppFileTrigger>
        <Button>Select a file</Button>
      </AppFileTrigger>,
    );

    expect(screen.getByRole("button", { name: "Select a file" })).toBeVisible();
  });

  it("supports a full-width layout container for dense form rows", () => {
    const { container } = render(
      <AppFileTrigger layout="block">
        <Button>Select attachments</Button>
      </AppFileTrigger>,
    );

    expect(screen.getByRole("button", { name: "Select attachments" })).toBeVisible();
    expect(container.firstElementChild).toHaveClass("w-full");
  });

  it("rejects multiple direct children in development", () => {
    expect(() =>
      render(
        <AppFileTrigger>
          {[
            <Button key="one">Upload</Button>,
            <Button key="two">Another</Button>,
          ]}
        </AppFileTrigger>,
      ),
    ).toThrow("AppFileTrigger requires exactly one direct React element child.");
  });
});
