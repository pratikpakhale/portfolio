import { StaticRouter } from "react-router-dom";
import { Root } from "./Root";
import { PAGES } from "./lib/seo";
import { headFor, notFoundHead } from "./lib/head";

/**
 * Build-time entry: renders one route to HTML, plus the head that belongs to
 * it. Called once per path by vite-prerender-plugin.
 *
 * `links` seeds the crawl with every known page, so adding a route to
 * `PAGES` is all it takes to get it prerendered.
 */
export async function prerender({ url }: { url: string }) {
  const path = url.replace(/\/$/, "") || "/";
  const known = PAGES.some((page) => page.path === path);

  // This module and the client entry are inputs to the same build, and their
  // shared code ends up in one chunk. Importing the renderer lazily keeps
  // react-dom/server out of that chunk, so browsers never download it.
  const { renderToString } = await import("react-dom/server");

  const html = renderToString(
    <StaticRouter location={url}>
      <Root />
    </StaticRouter>
  );

  return {
    html,
    links: new Set(PAGES.map((page) => page.path)),
    head: known ? headFor(path) : notFoundHead(),
  };
}
