import type { NextConfig } from "next";

/**
 * Load the repo env contract before Next.js reads configuration.
 *
 * `SKIP_ENV_VALIDATION` remains available for build pipelines that need a
 * deferred environment check, such as container image assembly.
 */
import "./src/env.js";

const isDev = process.env.NODE_ENV === "development";
const serverActionAllowedOrigins = parseServerActionAllowedOrigins(
  process.env["BETTER_AUTH_TRUSTED_ORIGINS"],
);
const securityHeaders = buildSecurityHeaders(isDev);

const nextConfig: NextConfig = {
  distDir: ".artifacts/next",
  poweredByHeader: false,
  typedRoutes: true,
  experimental: {
    serverActions: {
      bodySizeLimit: "1mb",
      ...(serverActionAllowedOrigins.length > 0
        ? { allowedOrigins: serverActionAllowedOrigins }
        : {}),
    },
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;

function parseServerActionAllowedOrigins(raw: string | undefined) {
  if (!raw) return [];

  return [...new Set(
    raw
      .split(",")
      .map((value) => value.trim())
      .filter(Boolean)
      .map((value) => {
        try {
          return new URL(value).host;
        } catch {
          return value.replace(/^https?:\/\//, "").replace(/\/+$/, "");
        }
      })
      .filter(Boolean),
  )];
}

function buildSecurityHeaders(dev: boolean) {
  const csp = [
    "default-src 'self'",
    `script-src 'self' 'unsafe-inline'${dev ? " 'unsafe-eval'" : ""}`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' blob: data: https:",
    "font-src 'self' data:",
    "connect-src 'self'",
    "frame-src 'none'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    ...(dev ? [] : ["upgrade-insecure-requests"]),
  ].join("; ");

  return [
    {
      key: "Content-Security-Policy",
      value: csp,
    },
    {
      key: "Referrer-Policy",
      value: "strict-origin-when-cross-origin",
    },
    {
      key: "X-Content-Type-Options",
      value: "nosniff",
    },
    {
      key: "X-Frame-Options",
      value: "DENY",
    },
    {
      key: "Permissions-Policy",
      value: "camera=(), microphone=(), geolocation=(), payment=(), browsing-topics=()",
    },
    {
      key: "Strict-Transport-Security",
      value: "max-age=63072000; includeSubDomains; preload",
    },
  ];
}
