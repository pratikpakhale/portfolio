import { useEffect } from "react";
import { pageMeta } from "@/lib/seo";

/**
 * Keeps the document title and description in step with client-side
 * navigation.
 *
 * Crawlers never rely on this — every route ships its full head prerendered
 * (see src/lib/head.ts). This only exists so the tab title is right after an
 * in-app link click.
 */
export function Seo({ path }: { path: string }) {
  const { title, description } = pageMeta(path);

  useEffect(() => {
    document.title = title;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", description);
  }, [title, description]);

  return null;
}
