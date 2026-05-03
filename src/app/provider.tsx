"use client";

import { I18nProvider } from "react-aria-components/I18nProvider";

import { AppStateProvider } from "@/state/app-state";
import { TRPCReactProvider } from "@/trpc/react";

export function ClientProviders({
  children,
  lang,
}: Readonly<{
  children: React.ReactNode;
  lang: string;
}>) {
  return (
    <I18nProvider locale={lang}>
      <TRPCReactProvider>
        <AppStateProvider>{children}</AppStateProvider>
      </TRPCReactProvider>
    </I18nProvider>
  );
}
