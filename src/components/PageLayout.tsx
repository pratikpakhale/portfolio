import { Link } from "react-router-dom";
import { FadeIn } from "./FadeIn";
import { ThemeToggle } from "./ThemeToggle";
import { Footer } from "./Footer";
import { Seo } from "./Seo";
import { useTheme } from "@/hooks/useTheme";

/**
 * `path` is the route this page is mounted at — passing it here keeps each
 * page's head tags next to the layout that owns the page, rather than repeated
 * in every page component. The 404 sets its own head and passes nothing.
 */
export function PageLayout({
  path,
  children,
}: {
  path?: string;
  children: React.ReactNode;
}) {
  const { theme, toggle } = useTheme();

  return (
    <>
      {path && <Seo path={path} />}
      <ThemeToggle theme={theme} onToggle={toggle} />
      <FadeIn className="pt-16 pb-6">
        <Link
          to="/"
          className="font-mono text-[14px] text-dim border-b border-border hover:text-accent hover:border-accent transition-colors"
        >
          ← back
        </Link>
      </FadeIn>
      {children}
      <Footer />
    </>
  );
}
