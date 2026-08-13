import { useState } from "react";
import { PageLayout } from "@/components/PageLayout";
import { SectionHeader } from "@/components/SectionHeader";
import { FadeIn } from "@/components/FadeIn";
import { BrandIcon } from "@/components/BrandIcon";
import { BuildCard } from "@/components/Hardware";
import { hardware, projects } from "@/lib/data";
import { destinations } from "@/lib/links";
import type { Project } from "@/lib/types";

function ProjectEntry({ proj }: { proj: Project }) {
  const links = destinations(proj);
  const [primary] = links;

  return (
    <FadeIn className="py-5 border-b border-border last:border-b-0">
      <div className="flex justify-between items-baseline gap-4 mb-1">
        {primary ? (
          <a
            href={primary.url}
            className="text-base font-medium border-none hover:text-accent transition-colors"
          >
            {proj.name}
          </a>
        ) : (
          <span className="text-base font-medium">{proj.name}</span>
        )}
        <div className="flex items-baseline gap-3 shrink-0">
          <span className="font-mono text-[12px] text-accent">{proj.tag}</span>
          {proj.year && (
            <span className="font-mono text-[12px] text-dim">{proj.year}</span>
          )}
        </div>
      </div>

      <p className="text-[14px] text-muted leading-relaxed">{proj.description}</p>

      {links.length > 0 && (
        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1">
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

      {proj.story && (
        <p className="mt-3 text-sm text-muted/70 leading-relaxed italic">
          {proj.story}
        </p>
      )}
    </FadeIn>
  );
}

/**
 * Hardware lives in its own file, but reads as one more kind of thing I've
 * built — so it gets a tab alongside the project groups rather than a section
 * of its own.
 */
const HARDWARE = "hardware";

export function ProjectsPage() {
  const [active, setActive] = useState(projects.groups[0].key);

  const tabs = [
    ...projects.groups,
    ...(hardware.builds.length > 0 ? [{ key: HARDWARE, title: HARDWARE }] : []),
  ];

  return (
    <PageLayout path="/projects">
      <section className="py-6 pb-18">
        <SectionHeader num="03" title="Projects Archive" level={1} />
        <FadeIn className="text-muted text-[16px] leading-relaxed -mt-4 mb-8 max-w-[600px] font-sans">
          <p dangerouslySetInnerHTML={{ __html: projects.bridge }} />
        </FadeIn>

        <FadeIn className="mb-4">
          <div className="flex flex-wrap gap-2" role="tablist">
            {tabs.map((group) => (
              <button
                key={group.key}
                role="tab"
                id={`tab-${group.key}`}
                aria-controls={`panel-${group.key}`}
                aria-selected={active === group.key}
                onClick={() => setActive(group.key)}
                className={`font-mono text-[13px] px-3 py-1.5 rounded-md border cursor-pointer transition-colors ${
                  active === group.key
                    ? "border-accent-light text-accent bg-accent-bg"
                    : "border-border text-muted hover:text-accent hover:border-accent-light"
                }`}
              >
                {group.title}
              </button>
            ))}
          </div>
        </FadeIn>

        {/* Every panel is rendered and the inactive ones are hidden, rather
            than swapped in on click — that way the whole archive is in the
            prerendered HTML instead of only whichever tab opens first. */}
        {tabs.map((group) => (
          <div
            key={group.key}
            role="tabpanel"
            id={`panel-${group.key}`}
            aria-labelledby={`tab-${group.key}`}
            hidden={active !== group.key}
          >
            {group.key === HARDWARE ? (
              <div className="grid grid-cols-2 gap-3.5 max-sm:grid-cols-1 pt-5">
                {hardware.builds.map((build) => (
                  <BuildCard key={build.name} build={build} />
                ))}
              </div>
            ) : (
              projects.items
                .filter((proj) => proj.group === group.key)
                .map((proj) => <ProjectEntry key={proj.name} proj={proj} />)
            )}
          </div>
        ))}
      </section>
    </PageLayout>
  );
}
