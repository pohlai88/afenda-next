import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { InterfaceLabShell } from "../_components/interface-lab-shell";

describe("interface lab shell", () => {
  it("renders studio rail, canvas, and inspector compounds together", () => {
    render(
      <InterfaceLabShell>
        <InterfaceLabShell.Header
          title="Interface Studio"
          description="Creative studio"
        />
        <InterfaceLabShell.Workbench
          rail={
            <InterfaceLabShell.Rail activeSection="components">
              <p>rail body</p>
            </InterfaceLabShell.Rail>
          }
          canvas={
            <InterfaceLabShell.Canvas title="Canvas title">
              <p>canvas body</p>
            </InterfaceLabShell.Canvas>
          }
          inspector={
            <InterfaceLabShell.Inspector title="Inspector title">
              <p>inspector body</p>
            </InterfaceLabShell.Inspector>
          }
        />
      </InterfaceLabShell>,
    );

    expect(screen.getByRole("heading", { name: "Interface Studio" })).toBeInTheDocument();
    expect(screen.getByText("Canvas title")).toBeInTheDocument();
    expect(screen.getByText("Inspector title")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /components/i })).toHaveAttribute(
      "href",
      "/interface-lab/components",
    );
  });

  it("renders studio command, library, artboard, controls, and properties compounds", () => {
    render(
      <InterfaceLabShell>
        <InterfaceLabShell.CommandBar
          prompt="Create a dense approval console."
          chips={[{ label: "Approval console" }]}
        />
        <InterfaceLabShell.Workbench
          rail={
            <InterfaceLabShell.LibraryRail title="Library">
              <p>Screens</p>
            </InterfaceLabShell.LibraryRail>
          }
          canvas={
            <InterfaceLabShell.Artboard
              title="Canvas"
              toolbar={<InterfaceLabShell.FloatingCanvasControls activeControl="Desktop" />}
            >
              <p>artboard body</p>
            </InterfaceLabShell.Artboard>
          }
          inspector={
            <InterfaceLabShell.PropertiesPanel selectedLabel="Button">
              <p>properties body</p>
            </InterfaceLabShell.PropertiesPanel>
          }
        />
      </InterfaceLabShell>,
    );

    expect(screen.getByText("Create a dense approval console.")).toBeInTheDocument();
    expect(screen.getByText("Screens")).toBeInTheDocument();
    expect(screen.getByText("artboard body")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Desktop" })).toBeInTheDocument();
    expect(screen.getByText("properties body")).toBeInTheDocument();
  });
});
