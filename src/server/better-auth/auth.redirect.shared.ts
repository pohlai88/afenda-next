/**
 * @afenda-owner auth
 * @afenda-subject redirect
 * @afenda-artifact shared
 * @afenda-boundary shared
 * @afenda-description Shared auth redirect helpers for callback-safe internal navigation
 */
export function safeInternalPath(raw: string | undefined, fallback: string) {
  if (raw === undefined || raw === "") return fallback;

  let decoded: string;
  try {
    decoded = decodeURIComponent(raw);
  } catch {
    return fallback;
  }

  if (!decoded.startsWith("/") || decoded.startsWith("//")) return fallback;
  if (decoded.includes("://")) return fallback;
  return decoded;
}

export function getPostLoginHref() {
  return "/auth/post-login" as const;
}

export function getSignInHref(callbackUrl: string) {
  const safeCallbackUrl = safeInternalPath(callbackUrl, getPostLoginHref());
  return `/sign-in?${new URLSearchParams({ callbackUrl: safeCallbackUrl }).toString()}`;
}

export function getStepUpHref(callbackUrl: string) {
  const safeCallbackUrl = safeInternalPath(callbackUrl, getPostLoginHref());
  return `/account/step-up?${new URLSearchParams({ callbackUrl: safeCallbackUrl }).toString()}`;
}

export function getTwoFactorHref(
  callbackUrl: string,
  methods: readonly string[] = [],
) {
  return buildTwoFactorHref("/sign-in/two-factor", callbackUrl, methods);
}

export function getStepUpTwoFactorHref(
  callbackUrl: string,
  methods: readonly string[] = [],
) {
  return buildTwoFactorHref("/account/step-up/two-factor", callbackUrl, methods);
}

function buildTwoFactorHref(
  basePath: string,
  callbackUrl: string,
  methods: readonly string[] = [],
) {
  const params = new URLSearchParams({
    callbackUrl: safeInternalPath(callbackUrl, getPostLoginHref()),
  });

  if (methods.length > 0) {
    params.set("methods", methods.join(","));
  }

  return `${basePath}?${params.toString()}`;
}

export function getTwoFactorMethods(raw: string | undefined) {
  if (raw === undefined || raw === "") return [] as string[];

  return raw
    .split(",")
    .map((method) => method.trim())
    .filter(Boolean);
}
