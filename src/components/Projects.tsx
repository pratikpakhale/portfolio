import { Link } from "react-router-dom";
import { SectionHeader } from "./SectionHeader";
import { Bridge } from "./Bridge";
import { FadeIn } from "./FadeIn";
import { projects } from "@/lib/data";
import type { Project } from "@/lib/types";
import { ArrowRight } from "lucide-react";

const VISIBLE_COUNT = 4;

export function ProjectCard({ proj }: { proj: Project }) {
  return (
    <FadeIn className="rounded-lg overflow-hidden border border-border hover:border-accent-light transition-colors">
      {proj.image && (
        <div className="w-full aspect-[4/3] bg-raised flex items-center justify-center border-b border-border">
          <img src={proj.image} alt={proj.name} className="w-full h-full object-cover" />
        </div>
      )}
      <div className="p-3 px-3.5">
        <div className="flex justify-between items-baseline gap-2 mb-[3px]">
          <a href={proj.url} className="text-sm font-medium border-none hover:text-accent transition-colors">
            {proj.name}
          </a>
          <span className="font-mono text-[11px] text-dim shrink-0">{proj.year}</span>
        </div>
        <div className="text-[13px] text-muted leading-normal">
          <span className="font-mono text-[11px] text-accent mr-1.5">{proj.tag}</span>
          {proj.description}
        </div>
      </div>
    </FadeIn>
  );
}

export function Projects() {
  const visible = projects.items.slice(0, VISIBLE_COUNT);

  return (
    <>
      <Bridge html={projects.bridge} />
      <section
        id="projects"
        className="py-6 pb-18"
        data-buddy="type"
        data-buddy-label="shipping..."
      >
        <SectionHeader num="03" title="Projects" />
        <div className="grid grid-cols-2 gap-3.5 max-sm:grid-cols-1">
          {visible.map((proj) => (
            <ProjectCard key={proj.name} proj={proj} />
          ))}
        </div>

        <div className="mt-6 flex justify-center">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 px-6 py-2.5 border border-border rounded-lg text-sm text-muted hover:text-accent hover:border-accent-light transition-colors"
          >
            Projects Archive
            <ArrowRight size={14} />
          </Link>
        </div>
      </section>
    </>
  );
}
