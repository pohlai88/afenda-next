/**
 * Validates each raster under `public/icons/` and `public/favicon.ico`.
 * Fails if dimensions, alpha, or directory contents drift from the governed set.
 *
 * Run: `pnpm icons:validate`
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const iconsDir = path.join(root, "public/icons");
const faviconPath = path.join(root, "public/favicon.ico");

/** @type {{ name: string; width: number; height: number; requireAlpha: boolean }[]} */
const pngExpectations = [
  {
    name: "afenda-icon-512-transparent.png",
    width: 512,
    height: 512,
    requireAlpha: true,
  },
  {
    name: "afenda-icon-192-transparent.png",
    width: 192,
    height: 192,
    requireAlpha: true,
  },
  {
    name: "afenda-icon-180-transparent.png",
    width: 180,
    height: 180,
    requireAlpha: true,
  },
  {
    name: "afenda-icon-512-maskable.png",
    width: 512,
    height: 512,
    requireAlpha: true,
  },
];

const allowedPngBasenames = new Set(pngExpectations.map((e) => e.name));

async function validatePng(expectation) {
  const full = path.join(iconsDir, expectation.name);
  if (!fs.existsSync(full)) {
    throw new Error(`Missing ${relPath}`);
  }

  const meta = await sharp(full).metadata();

  const issues = [];
  if (meta.width !== expectation.width || meta.height !== expectation.height) {
    issues.push(
      `expected ${expectation.width}×${expectation.height}, got ${meta.width}×${meta.height}`,
    );
  }
  if (expectation.requireAlpha && !meta.hasAlpha) {
    issues.push("expected alpha channel");
  }
  if (meta.channels !== undefined && expectation.requireAlpha && meta.channels < 4) {
    issues.push(`expected ≥4 channels (RGBA), got ${meta.channels}`);
  }

  const stat = fs.statSync(full);
  if (stat.size < 200) {
    issues.push(`suspiciously small file (${stat.size} bytes)`);
  }

  if (issues.length) {
    throw new Error(`${expectation.name}: ${issues.join("; ")}`);
  }

  return `✓ ${expectation.name} — ${expectation.width}×${expectation.height}, RGBA`;
}

function validateIco() {
  if (!fs.existsSync(faviconPath)) {
    throw new Error("Missing public/favicon.ico");
  }

  const buf = fs.readFileSync(faviconPath);
  if (buf.length < 22) {
    throw new Error("public/favicon.ico too small");
  }

  const reserved = buf.readUInt16LE(0);
  const type = buf.readUInt16LE(2);
  const count = buf.readUInt16LE(4);

  if (reserved !== 0) {
    throw new Error(`favicon.ico: reserved must be 0, got ${reserved}`);
  }
  if (type !== 1) {
    throw new Error(`favicon.ico: type must be 1 (ICO), got ${type}`);
  }
  if (count < 1 || count > 16) {
    throw new Error(`favicon.ico: implausible image count ${count}`);
  }

  return `✓ favicon.ico — ICO header ok, ${count} image(s), ${buf.length} bytes`;
}

function validateIconsDirectoryCleanup() {
  if (!fs.existsSync(iconsDir)) {
    throw new Error("Missing public/icons/");
  }

  const entries = fs.readdirSync(iconsDir).filter((n) => n.endsWith(".png"));
  const unknown = entries.filter((n) => !allowedPngBasenames.has(n));
  if (unknown.length) {
    throw new Error(
      `public/icons contains unknown PNG(s) (remove or add to governance): ${unknown.join(", ")}`,
    );
  }

  const missing = [...allowedPngBasenames].filter(
    (n) => !entries.includes(n),
  );
  if (missing.length) {
    throw new Error(`public/icons missing required PNG(s): ${missing.join(", ")}`);
  }

  return `✓ public/icons — exactly ${allowedPngBasenames.size} governed PNG files`;
}

const errors = [];
const lines = [];

try {
  lines.push(validateIconsDirectoryCleanup());

  for (const exp of pngExpectations) {
    lines.push(await validatePng(exp));
  }

  lines.push(validateIco());
} catch (e) {
  errors.push(e instanceof Error ? e.message : String(e));
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

for (const line of lines) {
  console.log(line);
}
console.log("All icon assets validated.");
