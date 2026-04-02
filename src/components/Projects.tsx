import { SectionHeader } from "./SectionHeader";
import { Bridge } from "./Bridge";
import { FadeIn } from "./FadeIn";
import { projects } from "@/lib/data";

export function Projects() {
  return (
    <>
      <Bridge html={projects.bridge} />
      <section id="projects" className="py-6 pb-18" data-buddy="type" data-buddy-label="shipping...">
        <SectionHeader num="02" title="Projects" />
        <div>
          {projects.items.map((proj, i) => (
            <FadeIn
              key={proj.name}
              className={`py-[18px] grid grid-cols-[1fr_auto] gap-x-6 gap-y-1 max-sm:grid-cols-1 ${
                i > 0 ? "border-t border-border" : ""
              }`}
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
          ))}
        </div>
      </section>
    </>
  );
}
