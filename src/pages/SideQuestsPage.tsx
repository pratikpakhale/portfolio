import { Link } from "react-router-dom";
import { FadeIn } from "@/components/FadeIn";
import { SectionHeader } from "@/components/SectionHeader";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Footer } from "@/components/Footer";
import { useTheme } from "@/hooks/useTheme";
import { sidequests } from "@/lib/data";

export function SideQuestsPage() {
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

      <section className="py-6 pb-18">
        <SectionHeader num="08" title="Side quests" />
        <div className="text-[15px] leading-[2.2]">
          {sidequests.items.map((item, i) => (
            <FadeIn
              key={item.name}
              className={`flex justify-between items-baseline gap-4 hover:text-accent group ${
                i < sidequests.items.length - 1 ? "border-b border-border" : ""
              }`}
            >
              <span>{item.name}</span>
              <span className="text-dim text-[13px] text-right shrink-0 group-hover:text-accent-light">
                {item.description}
              </span>
            </FadeIn>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}
