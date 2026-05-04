/**
 * @afenda-owner app-toast
 * @afenda-subject control
 * @afenda-artifact primitive
 * @afenda-boundary test
 * @afenda-description Test coverage for app-toast explicit primitive boundary
 */
import "@testing-library/jest-dom/vitest";
import { act, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { UNSTABLE_ToastQueue as ToastQueue } from "react-aria-components";

import { AppToastRegion } from "@/components/ui-governance/app-toast/app-toast.control.primitive.client";
import type { AppToastContentPayload } from "@/components/ui-governance/app-toast/app-toast.contract.primitive.shared";

describe("AppToastRegion", () => {
  it("renders queued title and description with a dismiss control", async () => {
    const queue = new ToastQueue<AppToastContentPayload>({});

    render(<AppToastRegion queue={queue} />);

    await act(async () => {
      queue.add({
        title: "File saved",
        description: "Changes are on this workstation.",
      });
    });

    expect(await screen.findByText("File saved")).toBeVisible();
    expect(screen.getByText("Changes are on this workstation.")).toBeVisible();
    expect(screen.getByRole("button", { name: "Dismiss notification" })).toBeVisible();
  });

  it("omits description when only a title is provided", async () => {
    const queue = new ToastQueue<AppToastContentPayload>({});

    render(<AppToastRegion queue={queue} />);

    await act(async () => {
      queue.add({ title: "Copied" });
    });

    expect(await screen.findByText("Copied")).toBeVisible();
    expect(screen.queryByText("Changes are on this workstation.")).not.toBeInTheDocument();
  });
});
