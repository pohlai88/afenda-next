/**
 * @afenda-owner test-runtime
 * @afenda-subject render
 * @afenda-artifact helper
 * @afenda-boundary test
 * @afenda-description Test helper for rendering React components with providers
 */
import { render, type RenderOptions } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { I18nProvider } from "react-aria-components/I18nProvider";

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
      <I18nProvider locale={locale}>{children}</I18nProvider>
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
