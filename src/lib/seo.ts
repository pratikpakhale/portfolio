/**
 * Single source of truth for anything a crawler reads: the canonical origin,
 * and the title/description for every route.
 *
 * This module is deliberately free of `?raw` YAML imports and JSX so that
 * `vite.config.ts` can import it directly when it writes the sitemap — the app
 * and the sitemap can't drift apart if they read the same list.
 */

export const SITE = {
  /**
   * Canonical origin. `pakhale.com` 301s here (set in the Vercel project's
   * domain settings) so the two names never compete for the same content.
   */
  url: "https://pratik.pakhale.com",
  name: "Pratik Pakhale",
  /** Used as the `og:site_name` and in title suffixes. */
  shortName: "Pratik Pakhale",
  locale: "en_US",
  twitter: "@_pratikpakhale",
  ogImage: "/og.png",
  ogImageAlt: "Pratik Pakhale — engineer. pratik.pakhale.com",
} as const;

export interface PageMeta {
  /** Route path, always leading-slash and never trailing-slash. */
  path: string;
  /** Full `<title>`. Kept under ~60 characters so it survives the SERP. */
  title: string;
  /** Short label for breadcrumbs and the sitemap-facing name. */
  label: string;
  /** `<meta name="description">`. Aim for 140–160 characters. */
  description: string;
  /** Sitemap weighting, relative to the homepage's 1.0. */
  priority: number;
  changefreq: "daily" | "weekly" | "monthly" | "yearly";
}

export const PAGES: PageMeta[] = [
  {
    path: "/",
    label: "Home",
    title: "Pratik Pakhale — Engineer",
    description:
      "Pratik Pakhale is a founding engineer at Raccoon AI, working on browser agents and the infrastructure around them. Projects, open source, research and hardware builds.",
    priority: 1.0,
    changefreq: "weekly",
  },
  {
    path: "/work",
    label: "Work",
    title: "Work — Pratik Pakhale",
    description:
      "Where Pratik Pakhale has worked: founding engineer at Raccoon AI building browser-agent infrastructure, and EdTech research at IIT Bombay.",
    priority: 0.9,
    changefreq: "monthly",
  },
  {
    path: "/projects",
    label: "Projects",
    title: "Projects Archive — Pratik Pakhale",
    description:
      "The full archive of things Pratik Pakhale has built — vibecoded tools like sitedrop and whispr, learning projects, and one-off experiments.",
    priority: 0.9,
    changefreq: "weekly",
  },
  {
    path: "/oss",
    label: "Open Source",
    title: "Open Source — Pratik Pakhale",
    description:
      "Open source work by Pratik Pakhale: Google Summer of Code with the PEcAn Project as contributor and mentor, plus contributions to browser-use, cmux and college websites.",
    priority: 0.8,
    changefreq: "monthly",
  },
  {
    path: "/research",
    label: "Research",
    title: "Research Papers — Pratik Pakhale",
    description:
      "Peer-reviewed papers co-authored by Pratik Pakhale, published in Springer Proceedings in Mathematics & Statistics and IEEE Big Data.",
    priority: 0.8,
    changefreq: "yearly",
  },
  {
    path: "/hardware",
    label: "Hardware",
    title: "Hardware & Builds — Pratik Pakhale",
    description:
      "Physical builds by Pratik Pakhale — an RC car, an LED room controller, a Raspberry Pi 500 dev box, and other things you can actually hold.",
    priority: 0.7,
    changefreq: "monthly",
  },
  {
    path: "/sidequests",
    label: "Side Quests",
    title: "Side Quests — Pratik Pakhale",
    description:
      "What Pratik Pakhale does outside the editor: president of Velocity Club at IIIT Dharwad, Postman Student Leader, and hackathon wins.",
    priority: 0.6,
    changefreq: "monthly",
  },
];


export function pageMeta(path: string): PageMeta {
  const match = PAGES.find((p) => p.path === path);
  if (!match) throw new Error(`No page metadata registered for "${path}"`);
  return match;
}

/** Absolute URL for a site-relative path, for canonicals and OG tags. */
export function absolute(path: string): string {
  return new URL(path, SITE.url).href;
}
