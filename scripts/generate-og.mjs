/**
 * Regenerates public/og.png — the 1200x630 card that X, LinkedIn, Slack and
 * iMessage show when the site is shared.
 *
 * Run it after changing the name, tagline or palette:
 *
 *   node scripts/generate-og.mjs
 *
 * The output is committed, so a build never depends on this script or on the
 * network.
 */

import { Resvg } from "@resvg/resvg-js";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { parse } from "yaml";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const fontCache = resolve(root, "node_modules/.cache/og-fonts");

// Matches src/index.css.
const COLORS = {
  bg: "#faf8f4",
  text: "#1a1918",
  muted: "#6b6862",
  accent: "#9b7a2f",
  dot: "rgba(26, 25, 24, 0.10)",
  border: "#ddd9d1",
};

/**
 * Google's CSS API picks a format from the user agent. This one is old enough
 * to be served plain TTF, which is what resvg can read — a modern UA gets
 * WOFF2 and MSIE-era strings get EOT, neither of which it can parse.
 */
const TTF_USER_AGENT =
  "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_5; en-US) AppleWebKit/533.19.4 (KHTML, like Gecko) Version/5.0.3 Safari/533.19.4";

async function jetBrainsMono(weight) {
  await mkdir(fontCache, { recursive: true });
  const cached = resolve(fontCache, `jetbrains-mono-${weight}.ttf`);
  if (existsSync(cached)) return cached;

  const cssUrl = `https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@${weight}`;
  const css = await fetch(cssUrl, {
    headers: { "User-Agent": TTF_USER_AGENT },
  }).then((r) => r.text());

  const url = css.match(/url\((https:[^)]+)\)/)?.[1];
  if (!url) throw new Error(`No font URL in the Google Fonts response for weight ${weight}`);

  await writeFile(cached, Buffer.from(await fetch(url).then((r) => r.arrayBuffer())));
  return cached;
}

function escapeXml(value) {
  return value.replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" })[c]);
}

/** Breaks a line at word boundaries, at roughly `max` characters. */
function wrap(text, max) {
  const lines = [];
  let line = "";
  for (const word of text.split(" ")) {
    if (line && (line + " " + word).length > max) {
      lines.push(line);
      line = word;
    } else {
      line = line ? `${line} ${word}` : word;
    }
  }
  if (line) lines.push(line);
  return lines;
}

const profile = parse(await readFile(resolve(root, "src/data/profile.yaml"), "utf8"));

// Read rather than import, so the canonical origin lives in exactly one place
// even though this script can't load TypeScript.
const seoSource = await readFile(resolve(root, "src/lib/seo.ts"), "utf8");
const site = seoSource.match(/url:\s*"(https:[^"]+)"/)?.[1];
if (!site) throw new Error("Could not find SITE.url in src/lib/seo.ts");

const tagline = wrap(profile.tagline, 42);

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <pattern id="dots" width="26" height="26" patternUnits="userSpaceOnUse">
      <circle cx="1" cy="1" r="1" fill="${COLORS.dot}" />
    </pattern>
  </defs>

  <rect width="1200" height="630" fill="${COLORS.bg}" />
  <rect width="1200" height="630" fill="url(#dots)" />
  <rect x="0" y="0" width="1200" height="6" fill="${COLORS.accent}" />

  <text x="96" y="216" font-family="JetBrains Mono" font-size="76" font-weight="700"
        letter-spacing="-2" fill="${COLORS.text}">${escapeXml(profile.name)}</text>

  <text x="96" y="272" font-family="JetBrains Mono" font-size="26" font-weight="400"
        letter-spacing="6" fill="${COLORS.accent}">${escapeXml(profile.title.toUpperCase())}</text>

  ${tagline
    .map(
      (line, i) =>
        `<text x="96" y="${368 + i * 48}" font-family="JetBrains Mono" font-size="30" font-weight="400" fill="${COLORS.muted}">${escapeXml(line)}</text>`
    )
    .join("\n  ")}

  <line x1="96" y1="500" x2="1104" y2="500" stroke="${COLORS.border}" stroke-width="2" />

  <text x="96" y="552" font-family="JetBrains Mono" font-size="26" font-weight="500"
        fill="${COLORS.text}">${escapeXml(new URL(site).host)}</text>
</svg>`;

const resvg = new Resvg(svg, {
  fitTo: { mode: "width", value: 1200 },
  font: {
    fontFiles: [await jetBrainsMono(400), await jetBrainsMono(500), await jetBrainsMono(700)],
    defaultFontFamily: "JetBrains Mono",
    loadSystemFonts: false,
  },
});

const out = resolve(root, "public/og.png");
await writeFile(out, resvg.render().asPng());
console.log(`Wrote ${out}`);
