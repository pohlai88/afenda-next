/**
 * @afenda-owner app-form
 * @afenda-subject control
 * @afenda-artifact primitive
 * @afenda-boundary test
 * @afenda-description Test coverage for app-form explicit primitive boundary
 */
import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Button, Input, Label, TextField } from "react-aria-components";

import { AppForm } from "@/components/ui-governance/app-form/app-form.control.primitive.client";

describe("AppForm", () => {
  it("renders a governed submission boundary with form children", () => {
    const { container } = render(
      <AppForm>
        <TextField name="name">
          <Label>Name</Label>
          <Input />
        </TextField>
        <Button type="submit">Submit</Button>
      </AppForm>,
    );

    expect(screen.getByRole("textbox", { name: "Name" })).toBeVisible();
    expect(screen.getByRole("button", { name: "Submit" })).toBeVisible();
    expect(container.firstElementChild?.tagName).toBe("FORM");
    expect(container.firstElementChild).toHaveClass("gap-6");
  });

  it("supports compact density for tighter operator entry layouts", () => {
    const { container } = render(
      <AppForm density="compact">
        <Button type="submit">Save</Button>
      </AppForm>,
    );

    expect(screen.getByRole("button", { name: "Save" })).toBeVisible();
    expect(container.firstElementChild).toHaveClass("gap-4");
  });

  it("rejects missing children in development", () => {
    expect(() => render(<AppForm>{null}</AppForm>)).toThrow(
      "AppForm requires children.",
    );
  });
});
