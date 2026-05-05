/**
 * Generates public icon set aligned with Afenda Node conventions:
 * `public/icons/afenda-icon-{512,192,180}-transparent.png`, `afenda-icon-512-maskable.png`,
 * `public/favicon.ico` (multi-resolution), from `afenda-icon-full-color.svg`.
 *
 * Preserves transparency. Run: `pnpm icons:generate`
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import pngToIco from "png-to-ico";
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

const iconsDir = path.join(root, "public/icons");
fs.mkdirSync(iconsDir, { recursive: true });

const pngOpts = { compressionLevel: 9 };

await pipeline
  .clone()
  .resize(512, 512, { fit: "contain", background: transparent })
  .png(pngOpts)
  .toFile(path.join(iconsDir, "afenda-icon-512-transparent.png"));

await pipeline
  .clone()
  .resize(192, 192, { fit: "contain", background: transparent })
  .png(pngOpts)
  .toFile(path.join(iconsDir, "afenda-icon-192-transparent.png"));

await pipeline
  .clone()
  .resize(180, 180, { fit: "contain", background: transparent })
  .png(pngOpts)
  .toFile(path.join(iconsDir, "afenda-icon-180-transparent.png"));

const maskInner = 410;
const maskFg = await pipeline
  .clone()
  .resize(maskInner, maskInner, {
    fit: "contain",
    background: transparent,
  })
  .png()
  .toBuffer();

await sharp({
  create: {
    width: 512,
    height: 512,
    channels: 4,
    background: transparent,
  },
})
  .composite([{ input: maskFg, gravity: "centre" }])
  .png(pngOpts)
  .toFile(path.join(iconsDir, "afenda-icon-512-maskable.png"));

const icoSizes = [16, 32, 48];
const icoLayers = await Promise.all(
  icoSizes.map((dim) =>
    pipeline
      .clone()
      .resize(dim, dim, { fit: "contain", background: transparent })
      .png()
      .toBuffer(),
  ),
);

const icoBuf = await pngToIco(icoLayers);
fs.writeFileSync(path.join(root, "public/favicon.ico"), icoBuf);

console.log(
  "Wrote public/icons/*.png (transparent + maskable), public/favicon.ico",
);
