/**
 * The `<head>` for a route, as plain data.
 *
 * The prerenderer turns these into real tags at build time, which is what
 * every crawler and social scraper actually reads — none of it depends on the
 * client bundle running.
 */

import { SITE, absolute, pageMeta } from "./seo";
import { graphFor } from "./structured-data";

export interface HeadElement {
  type: string;
  props: Record<string, string>;
}

export interface PageHead {
  lang: string;
  title: string;
  elements: HeadElement[];
}

const meta = (props: Record<string, string>): HeadElement => ({ type: "meta", props });

export function headFor(path: string): PageHead {
  const page = pageMeta(path);
  const url = absolute(page.path);
  const image = absolute(SITE.ogImage);
  const isHome = path === "/";

  const elements: HeadElement[] = [
    meta({ name: "description", content: page.description }),
    meta({ name: "author", content: SITE.name }),
    meta({
      name: "robots",
      content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
    }),
    { type: "link", props: { rel: "canonical", href: url } },

    meta({ property: "og:type", content: isHome ? "profile" : "website" }),
    meta({ property: "og:site_name", content: SITE.shortName }),
    meta({ property: "og:locale", content: SITE.locale }),
    meta({ property: "og:url", content: url }),
    meta({ property: "og:title", content: page.title }),
    meta({ property: "og:description", content: page.description }),
    meta({ property: "og:image", content: image }),
    meta({ property: "og:image:width", content: "1200" }),
    meta({ property: "og:image:height", content: "630" }),
    meta({ property: "og:image:alt", content: SITE.ogImageAlt }),

    meta({ name: "twitter:card", content: "summary_large_image" }),
    meta({ name: "twitter:site", content: SITE.twitter }),
    meta({ name: "twitter:creator", content: SITE.twitter }),
    meta({ name: "twitter:title", content: page.title }),
    meta({ name: "twitter:description", content: page.description }),
    meta({ name: "twitter:image", content: image }),
    meta({ name: "twitter:image:alt", content: SITE.ogImageAlt }),

    {
      type: "script",
      props: {
        type: "application/ld+json",
        // `<` is escaped so a stray angle bracket in the content can't close
        // the script tag early — the serializer writes children verbatim.
        children: JSON.stringify(graphFor(path)).replace(/</g, "\\u003c"),
      },
    },
  ];

  if (isHome) {
    elements.push(
      meta({ property: "profile:first_name", content: "Pratik" }),
      meta({ property: "profile:last_name", content: "Pakhale" }),
      meta({ property: "profile:username", content: "pratikpakhale" })
    );
  }

  return { lang: "en", title: page.title, elements };
}

/** The head for anything unmatched — deliberately kept out of the index. */
export function notFoundHead(): PageHead {
  return {
    lang: "en",
    title: `Not found — ${SITE.name}`,
    elements: [meta({ name: "robots", content: "noindex, follow" })],
  };
}
