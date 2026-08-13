import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { Bridge } from "./Bridge";
import { FadeIn } from "./FadeIn";
import { BrandIcon } from "./BrandIcon";
import { projects } from "@/lib/data";
import { destinations } from "@/lib/links";
import type { Project } from "@/lib/types";

export function ProjectCard({ proj }: { proj: Project }) {
  const links = destinations(proj);
  const [primary] = links;

  return (
    <FadeIn className="flex flex-col rounded-lg border border-border hover:border-accent-light transition-colors">
      {proj.image && (
        <div className="w-full aspect-[4/3] bg-raised flex items-center justify-center border-b border-border rounded-t-lg overflow-hidden">
          <img src={proj.image} alt={proj.name} className="w-full h-full object-cover" />
        </div>
      )}

      <div className="flex flex-col flex-1 p-3 px-3.5">
        <div className="flex justify-between items-baseline gap-2 mb-[3px]">
          {primary ? (
            <a
              href={primary.url}
              className="text-sm font-medium border-none hover:text-accent transition-colors"
            >
              {proj.name}
            </a>
          ) : (
            <span className="text-sm font-medium">{proj.name}</span>
          )}

          {proj.year && (
            <span className="font-mono text-[12px] text-dim shrink-0">{proj.year}</span>
          )}
        </div>

        <div className="text-[14px] text-muted leading-normal">
          <span className="font-mono text-[12px] text-accent mr-1.5">{proj.tag}</span>
          {proj.description}
        </div>

        {links.length > 0 && (
          <div className="mt-auto pt-2.5 flex flex-wrap items-center gap-x-4 gap-y-1">
            {links.map((dest) => (
              <a
                key={dest.url}
                href={dest.url}
                className="flex items-center gap-1.5 border-none text-dim hover:text-accent transition-colors"
              >
                <BrandIcon name={dest.icon} size={13} className="shrink-0" />
                <span className="font-mono text-[12px] break-all">{dest.handle}</span>
              </a>
            ))}
          </div>
        )}
      </div>
    </FadeIn>
  );
}

export function Projects() {
  const featured = projects.items.filter((p) => p.featured);

  return (
    <>
      <Bridge html={projects.bridge} />
      <section id="projects" className="py-6 pb-18">
        <SectionHeader num="03" title="Projects" />
        <div className="grid grid-cols-2 gap-3.5 max-sm:grid-cols-1">
          {featured.map((proj) => (
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
