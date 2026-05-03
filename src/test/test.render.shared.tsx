import { render, type RenderOptions } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { I18nProvider } from "react-aria-components/I18nProvider";

import { AppStateProvider } from "@/client-runtime/state/app-state.client";

export function renderWithProviders(
  ui: React.ReactElement,
  {
    locale = "en-US",
    ...options
  }: RenderOptions & {
    locale?: string;
  } = {},
) {
  return render(ui, {
    wrapper: ({ children }) => (
      <I18nProvider locale={locale}>
        <AppStateProvider>{children}</AppStateProvider>
      </I18nProvider>
    ),
    ...options,
  });
}

export function setupUser() {
  return userEvent.setup({
    advanceTimers: vi.advanceTimersByTime,
    skipHover: true,
  });
}
