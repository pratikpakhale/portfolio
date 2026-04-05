import { useState } from "react";
import { SectionHeader } from "./SectionHeader";
import { SectionFooter } from "./SectionFooter";
import { Bridge } from "./Bridge";
import { FadeIn } from "./FadeIn";
import { research } from "@/lib/data";
import type { Paper } from "@/lib/types";

const VISIBLE_COUNT = 2;

export function PaperItem({ paper, className }: { paper: Paper; className?: string }) {
  return (
    <FadeIn className={`py-[18px] text-[15px] leading-relaxed ${className ?? ""}`}>
      <span className="text-muted">{paper.authors}</span>{" "}
      <span className="font-medium italic">{paper.title}</span>{" "}
      <span className="text-dim font-mono text-xs">{paper.venue}</span>
      <div className="mt-1 font-mono text-[11px]">
        {paper.links.map((link) => (
          <a
            key={link.label}
            href={link.url}
            className="text-accent mr-3.5 border-none hover:underline"
          >
            {link.label}
          </a>
        ))}
      </div>
    </FadeIn>
  );
}

export function Research() {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? research.papers : research.papers.slice(0, VISIBLE_COUNT);
  const hiddenCount = research.papers.length - VISIBLE_COUNT;

  return (
    <>
      <Bridge html={research.bridge} />
      <section
        id="research"
        className="py-6 pb-18"
        data-buddy="read"
        data-buddy-label="hmm..."
      >
        <SectionHeader num="07" title="Research" />
        <div>
          {visible.map((paper, i) => (
            <PaperItem
              key={paper.title}
              paper={paper}
              className={i > 0 ? "border-t border-border" : ""}
            />
          ))}

          <SectionFooter
            route="/research"
            hiddenCount={hiddenCount}
            showAll={showAll}
            onToggle={() => setShowAll(!showAll)}
            noun="paper"
          />
        </div>
      </section>
    </>
  );
}
