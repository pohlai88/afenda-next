"use client";

/**
 * @afenda-owner afenda-home
 * @afenda-subject runtime
 * @afenda-artifact provider
 * @afenda-boundary client
 * @afenda-description Client runtime provider for home route local composer/preferences state
 */
import { HomeStateProvider } from "./afenda-home.state.provider.client";

export function HomeRuntimeProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <HomeStateProvider>{children}</HomeStateProvider>;
}
