"use client";

/**
 * @afenda-owner client-runtime
 * @afenda-subject i18n
 * @afenda-artifact provider
 * @afenda-boundary client
 * @afenda-description Shared client i18n provider for app-wide locale runtime wiring
 */
import { I18nProvider } from "react-aria-components/I18nProvider";

export function ClientI18nProvider({
  children,
  lang,
}: Readonly<{
  children: React.ReactNode;
  lang: string;
}>) {
  return <I18nProvider locale={lang}>{children}</I18nProvider>;
}
