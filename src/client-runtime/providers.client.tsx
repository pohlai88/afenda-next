"use client";

import { I18nProvider } from "react-aria-components/I18nProvider";

import { AppStateProvider } from "@/client-runtime/state/app-state.client";
import { TRPCReactProvider } from "@/trpc/trpc.react.client";

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
