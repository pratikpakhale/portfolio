import { SectionHeader } from "./SectionHeader";
import { Bridge } from "./Bridge";
import { FadeIn } from "./FadeIn";
import { research } from "@/lib/data";

export function Research() {
  return (
    <>
      <Bridge html={research.bridge} />
      <section id="research" className="py-6 pb-18" data-buddy="read" data-buddy-label="hmm...">
        <SectionHeader num="03" title="Research" />
        <div>
          {research.papers.map((paper, i) => (
            <FadeIn
              key={paper.title}
              className={`py-[18px] text-[15px] leading-relaxed ${
                i > 0 ? "border-t border-border" : ""
              }`}
            >
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
          ))}
        </div>
      </section>
    </>
  );
}
