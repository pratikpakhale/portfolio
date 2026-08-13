import type { BrandIconName, Project } from "./types";

export interface Destination {
  icon: BrandIconName;
  /** What the reader sees — a bare domain, or owner/repo for GitHub. */
  handle: string;
  url: string;
}

/** `pratikpakhale/vchar` for a repo, `txt.pakhale.com` for anything else. */
function handleFor(url: string): string {
  const { hostname, pathname } = new URL(url);
  const bare = hostname.replace(/^www\./, "");

  if (bare === "github.com") {
    const path = pathname.replace(/^\/|\/$/g, "");
    return path || bare;
  }

  return bare + (pathname === "/" ? "" : pathname.replace(/\/$/, ""));
}

/**
 * Where a project can be visited, live site first. Empty for the handful of
 * older things that were never published anywhere.
 */
export function destinations(proj: Project): Destination[] {
  const out: Destination[] = [];

  if (proj.live) out.push({ icon: "globe", handle: handleFor(proj.live), url: proj.live });
  if (proj.repo) out.push({ icon: "github", handle: handleFor(proj.repo), url: proj.repo });

  return out;
}
