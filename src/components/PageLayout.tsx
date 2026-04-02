import { Link } from "react-router-dom";
import { FadeIn } from "./FadeIn";
import { ThemeToggle } from "./ThemeToggle";
import { Footer } from "./Footer";
import { useTheme } from "@/hooks/useTheme";

export function PageLayout({ children }: { children: React.ReactNode }) {
  const { theme, toggle } = useTheme();

  return (
    <>
      <ThemeToggle theme={theme} onToggle={toggle} />
      <FadeIn className="pt-16 pb-6">
        <Link
          to="/"
          className="font-mono text-[13px] text-dim border-b border-border hover:text-accent hover:border-accent transition-colors"
        >
          ← back
        </Link>
      </FadeIn>
      {children}
      <Footer />
    </>
  );
}
