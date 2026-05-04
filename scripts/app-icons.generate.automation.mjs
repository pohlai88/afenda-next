/**
 * Generates Next.js App Router favicon + apple-touch assets from the approved
 * full-color mark embedded in `afenda-icon-full-color.svg`.
 *
 * Preserves transparency (no background fill). Trims uniform edge padding, then
 * scales into large square PNGs with transparent letterboxing.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const sourceSvgPath = path.join(
  root,
  "public/afenda-brand/afenda-icon-full-color.svg",
);

const svgText = fs.readFileSync(sourceSvgPath, "utf8");
const m = svgText.match(/href="data:image\/png;base64,([^"]+)"/);
if (!m) {
  throw new Error("Expected embedded PNG in source SVG");
}

const embedded = Buffer.from(m[1], "base64");
const transparent = { r: 0, g: 0, b: 0, alpha: 0 };

let pipeline = sharp(embedded).ensureAlpha();

try {
  pipeline = pipeline.trim({ threshold: 12 });
} catch {
  // No uniform edge to trim.
}

await pipeline
  .clone()
  .resize(512, 512, {
    fit: "contain",
    background: transparent,
  })
  .png({ compressionLevel: 9 })
  .toFile(path.join(root, "src/app/icon.png"));

await pipeline
  .clone()
  .resize(180, 180, {
    fit: "contain",
    background: transparent,
  })
  .png({ compressionLevel: 9 })
  .toFile(path.join(root, "src/app/apple-icon.png"));

console.log("Wrote src/app/icon.png (512) and src/app/apple-icon.png (180)");
