#!/usr/bin/env node
import { existsSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const repoRoot = process.cwd();
const source = resolve(repoRoot, ".env.config");
const target = ".env.local";
const oldTarget = ".env";

if (!existsSync(source)) {
  console.error("Missing .env.config at repository root. Run this from the project root.");
  process.exit(1);
}

const sourceContent = readFileSync(source, "utf8");
const targetContent = appendAliases(sourceContent);

writeFileSync(resolve(repoRoot, target), targetContent, "utf8");
console.log(`Synced: ${target}`);

if (existsSync(resolve(repoRoot, oldTarget))) {
  rmSync(resolve(repoRoot, oldTarget), { force: true });
  console.log(`Removed obsolete file: ${oldTarget}`);
}

function appendAliases(content) {
  const env = parseEnv(content);
  const aliases = [
    ["BETTER_AUTH_URL", env.AUTH_URL],
    ["BETTER_AUTH_SECRET", env.AUTH_SECRET],
    ["BETTER_AUTH_GITHUB_CLIENT_ID", env.GITHUB_INTEGRATION_CLIENT_ID],
    ["BETTER_AUTH_GITHUB_CLIENT_SECRET", env.GITHUB_INTEGRATION_CLIENT_SECRET],
    ["BETTER_AUTH_GOOGLE_CLIENT_ID", env.GOOGLE_CLIENT_ID],
    ["BETTER_AUTH_GOOGLE_CLIENT_SECRET", env.GOOGLE_CLIENT_SECRET],
    ["BETTER_AUTH_LINKEDIN_CLIENT_ID", env.LINKEDIN_CLIENT_ID],
    ["BETTER_AUTH_LINKEDIN_CLIENT_SECRET", env.LINKEDIN_CLIENT_SECRET],
  ].filter(([, value]) => value);

  if (aliases.length === 0) {
    return content;
  }

  const lines = aliases.map(([key, value]) => `${key}=${value}`);
  return `${trimTrailingNewlines(content)}\n\n# Synced aliases for current codebase runtime\n${lines.join("\n")}\n`;
}

function parseEnv(content) {
  const env = {};

  for (const rawLine of content.split(/\r?\n/u)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;

    const separatorIndex = line.indexOf("=");
    if (separatorIndex === -1) continue;

    const key = line.slice(0, separatorIndex).trim();
    const value = line.slice(separatorIndex + 1).trim();
    env[key] = value;
  }

  return env;
}

function trimTrailingNewlines(value) {
  return value.replace(/[\r\n]+$/u, "");
}
