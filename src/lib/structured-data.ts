/**
 * Schema.org graphs, built from the same YAML the page renders so the markup
 * and the machine-readable copy can't disagree.
 *
 * Everything hangs off two stable `@id`s — the Person and the WebSite — so a
 * crawler reading any single page can still resolve the entity behind it.
 */

import { SITE, absolute, pageMeta, type PageMeta } from "./seo";
import { profile, work, research, projects, oss, hardware, sidequests } from "./data";

type Node = Record<string, unknown>;

const PERSON_ID = `${SITE.url}/#person`;
const WEBSITE_ID = `${SITE.url}/#website`;

/** The role currently held, used for `jobTitle` and `worksFor`. */
const currentPosition =
  work.positions.find((p) => /present/i.test(p.date)) ?? work.positions[0];

/** Profile links that point at a real profile elsewhere — mailto and the local PDF don't count. */
const sameAs = profile.links
  .filter((l) => /^https?:/.test(l.url))
  .map((l) => l.url);

const person: Node = {
  "@type": "Person",
  "@id": PERSON_ID,
  name: profile.name,
  url: SITE.url,
  jobTitle: currentPosition.title,
  description: profile.tagline,
  email: profile.links.find((l) => l.icon === "mail")?.url,
  image: absolute(SITE.ogImage),
  sameAs,
  worksFor: {
    "@type": "Organization",
    name: currentPosition.company,
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Indian Institute of Information Technology Dharwad",
    url: "https://iiitdwd.ac.in",
  },
  knowsAbout: [
    "Browser agents",
    "AI agent infrastructure",
    "React",
    "TypeScript",
    "Next.js",
    "Vector databases",
    "Full-stack web development",
    "Hardware prototyping",
  ],
};

const website: Node = {
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: SITE.url,
  name: SITE.name,
  description: pageMeta("/").description,
  inLanguage: "en",
  publisher: { "@id": PERSON_ID },
  about: { "@id": PERSON_ID },
};

function breadcrumbs(page: PageMeta): Node {
  return {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
      { "@type": "ListItem", position: 2, name: page.label, item: absolute(page.path) },
    ],
  };
}

/** Wraps a page's contents as a numbered list, which is what these pages are. */
function itemList(name: string, items: Node[]): Node {
  return {
    "@type": "ItemList",
    name,
    numberOfItems: items.length,
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item,
    })),
  };
}

/** `"A, B, C."` as it appears in research.yaml → one Person node each. */
function authorsOf(authors: string): Node[] {
  return authors
    .split(",")
    .map((a) => a.replace(/\.$/, "").trim())
    .filter(Boolean)
    .map((name) => ({ "@type": "Person", name }));
}

const listFor: Record<string, () => Node> = {
  "/work": () =>
    itemList(
      "Positions",
      work.positions.map((pos) => ({
        "@type": "OrganizationRole",
        roleName: pos.title,
        description: pos.diff.map((d) => d.text).join(" "),
        memberOf: { "@type": "Organization", name: pos.company },
      }))
    ),

  "/projects": () =>
    itemList(
      "Projects",
      projects.items.map((proj) => ({
        "@type": "SoftwareApplication",
        name: proj.name,
        description: proj.description,
        applicationCategory: "DeveloperApplication",
        url: proj.live ?? proj.repo,
        codeRepository: proj.repo,
        author: { "@id": PERSON_ID },
      }))
    ),

  "/oss": () =>
    itemList(
      "Open source contributions",
      oss.items.map((item) => ({
        "@type": "CreativeWork",
        name: item.name,
        description: item.role,
        url: item.url ?? undefined,
        contributor: { "@id": PERSON_ID },
      }))
    ),

  "/research": () =>
    itemList(
      "Publications",
      research.papers.map((paper) => ({
        "@type": "ScholarlyArticle",
        headline: paper.title.replace(/\.$/, ""),
        author: authorsOf(paper.authors),
        publication: paper.venue,
        url: paper.links[0]?.url,
      }))
    ),

  "/hardware": () =>
    itemList(
      "Hardware builds",
      hardware.builds.map((build) => ({
        "@type": "CreativeWork",
        name: build.name,
        description: build.description,
        image: build.image ? absolute(build.image) : undefined,
        creator: { "@id": PERSON_ID },
      }))
    ),

  "/sidequests": () =>
    itemList(
      "Side quests",
      sidequests.items.map((item) => ({
        "@type": "CreativeWork",
        name: item.name,
        description: item.description,
      }))
    ),
};

/**
 * The graph for a route. The homepage identifies itself as the person's
 * ProfilePage; every other route is a CollectionPage listing its own contents,
 * with breadcrumbs back to the root.
 */
export function graphFor(path: string): Node {
  const page = pageMeta(path);
  const url = absolute(page.path);

  if (path === "/") {
    return {
      "@context": "https://schema.org",
      "@graph": [
        person,
        website,
        {
          "@type": "ProfilePage",
          "@id": `${url}#page`,
          url,
          name: page.title,
          description: page.description,
          isPartOf: { "@id": WEBSITE_ID },
          about: { "@id": PERSON_ID },
          mainEntity: { "@id": PERSON_ID },
          inLanguage: "en",
        },
      ],
    };
  }

  const list = listFor[path]?.();

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${url}#page`,
        url,
        name: page.title,
        description: page.description,
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": PERSON_ID },
        inLanguage: "en",
        ...(list ? { mainEntity: list } : {}),
      },
      breadcrumbs(page),
    ],
  };
}
