import type { NextConfig } from "next";

/**
 * Load the repo env contract before Next.js reads configuration.
 *
 * `SKIP_ENV_VALIDATION` remains available for build pipelines that need a
 * deferred environment check, such as container image assembly.
 */
import "./src/env.js";

const nextConfig: NextConfig = {
  distDir: ".artifacts/next",
  poweredByHeader: false,
  typedRoutes: true,
};

export default nextConfig;
