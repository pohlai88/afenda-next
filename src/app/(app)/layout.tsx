import { ClientI18nProvider } from "@/client-runtime/client-runtime.i18n.provider.client";
import { TRPCReactProvider } from "@/trpc/trpc.react.provider.client";

const defaultLocale = "en-US";

export default function AppRouteGroupLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <TRPCReactProvider>
      <ClientI18nProvider lang={defaultLocale}>{children}</ClientI18nProvider>
    </TRPCReactProvider>
  );
}
