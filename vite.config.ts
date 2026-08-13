import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";
import { vitePrerenderPlugin } from "vite-prerender-plugin";
import { PAGES, absolute } from "./src/lib/seo";

/**
 * Emits sitemap.xml from the same page list the app renders its head tags
 * from, so a new route can't be added without showing up for crawlers.
 */
function sitemap(): Plugin {
  let isSsrBuild = false;

  return {
    name: "portfolio:sitemap",
    apply: "build",
    configResolved(config) {
      isSsrBuild = !!config.build.ssr;
    },
    generateBundle() {
      if (isSsrBuild) return;

      const lastmod = new Date().toISOString().slice(0, 10);
      const urls = PAGES.map(
        (page) => `  <url>
    <loc>${absolute(page.path)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority.toFixed(1)}</priority>
  </url>`
      ).join("\n");

      this.emitFile({
        type: "asset",
        fileName: "sitemap.xml",
        source: `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`,
      });

      this.emitFile({
        type: "asset",
        fileName: "robots.txt",
        source: `User-agent: *
Allow: /

Sitemap: ${absolute("/sitemap.xml")}
`,
      });
    },
  };
}

/**
 * Loading the prerender bundle into this process leaves handles open, so the
 * CLI sits there after the build has finished writing. That reads as a hung
 * build on CI, so once everything is on disk we end the process ourselves.
 */
function exitWhenWritten(): Plugin {
  return {
    name: "portfolio:exit-when-written",
    apply: "build",
    closeBundle: {
      order: "post",
      sequential: true,
      handler() {
        process.exitCode ??= 0;
        setTimeout(() => process.exit(process.exitCode ?? 0), 100).unref();
      },
    },
  };
}

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    vitePrerenderPlugin({
      renderTarget: "#root",
      prerenderScript: resolve(__dirname, "src/prerender.tsx"),
      // Not linked from anywhere, but Vercel serves it for unmatched URLs.
      additionalPrerenderRoutes: ["/404.html"],
    }),
    sitemap(),
    exitWhenWritten(),
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  assetsInclude: ["**/*.yaml"],
});
