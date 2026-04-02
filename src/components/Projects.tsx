import { useState } from "react";
import { SectionHeader } from "./SectionHeader";
import { SectionFooter } from "./SectionFooter";
import { Bridge } from "./Bridge";
import { FadeIn } from "./FadeIn";
import { projects } from "@/lib/data";
import type { Project } from "@/lib/types";

const VISIBLE_COUNT = 3;

export function ProjectItem({ proj, className }: { proj: Project; className?: string }) {
  return (
    <FadeIn
      className={`py-[18px] grid grid-cols-[1fr_auto] gap-x-6 gap-y-1 max-sm:grid-cols-1 ${className ?? ""}`}
    >
      <div className="text-[15px] font-medium">
        <a href={proj.url} className="border-none hover:text-accent transition-colors">
          {proj.name}
        </a>
      </div>
      <div className="font-mono text-xs text-dim">{proj.year}</div>
      <div className="text-sm text-muted col-span-full leading-relaxed">
        <span className="font-mono text-[11px] text-accent mr-1.5">
          {proj.tag}
        </span>
        {proj.description}
      </div>
    </FadeIn>
  );
}

export function Projects() {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? projects.items : projects.items.slice(0, VISIBLE_COUNT);
  const hiddenCount = projects.items.length - VISIBLE_COUNT;

  return (
    <>
      <Bridge html={projects.bridge} />
      <section
        id="projects"
        className="py-6 pb-18"
        data-buddy="type"
        data-buddy-label="shipping..."
      >
        <SectionHeader num="02" title="Projects" />
        <div>
          {visible.map((proj, i) => (
            <ProjectItem
              key={proj.name}
              proj={proj}
              className={i > 0 ? "border-t border-border" : ""}
            />
          ))}

          <SectionFooter
            route="/projects"
            hiddenCount={hiddenCount}
            showAll={showAll}
            onToggle={() => setShowAll(!showAll)}
            noun="project"
          />
        </div>
      </section>
    </>
  );
}
