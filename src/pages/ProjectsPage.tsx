import { useState } from "react";
import { PageLayout } from "@/components/PageLayout";
import { SectionHeader } from "@/components/SectionHeader";
import { FadeIn } from "@/components/FadeIn";
import { BuildCard } from "@/components/Hardware";
import { ProjectEntry } from "@/components/Projects";
import { hardware, projects } from "@/lib/data";

/**
 * Hardware lives in its own file, but reads as one more kind of thing I've
 * built, so it gets a tab alongside the software rather than a section of its
 * own. Highlights are the projects marked `featured`; other is everything else.
 */
const TABS = [
  { key: "highlights", items: projects.items.filter((p) => p.featured) },
  { key: "other", items: projects.items.filter((p) => !p.featured) },
  { key: "hardware", items: null },
];

export function ProjectsPage() {
  const [active, setActive] = useState(TABS[0].key);
  const tabs = TABS.filter((tab) =>
    tab.items === null ? hardware.builds.length > 0 : tab.items.length > 0,
  );

  return (
    <PageLayout path="/projects">
      <section className="py-6 pb-18">
        <SectionHeader num="03" title="Projects Archive" level={1} />
        <FadeIn className="text-muted text-[16px] leading-relaxed -mt-4 mb-8 max-w-[600px] font-sans">
          <p dangerouslySetInnerHTML={{ __html: projects.bridge }} />
        </FadeIn>

        <FadeIn className="mb-4">
          <div className="flex flex-wrap gap-2" role="tablist">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                role="tab"
                id={`tab-${tab.key}`}
                aria-controls={`panel-${tab.key}`}
                aria-selected={active === tab.key}
                onClick={() => setActive(tab.key)}
                className={`font-mono text-[13px] px-3 py-1.5 rounded-md border cursor-pointer transition-colors ${
                  active === tab.key
                    ? "border-accent-light text-accent bg-accent-bg"
                    : "border-border text-muted hover:text-accent hover:border-accent-light"
                }`}
              >
                {tab.key}
              </button>
            ))}
          </div>
        </FadeIn>

        {/* Every panel is rendered and the inactive ones are hidden, rather
            than swapped in on click — that way the whole archive is in the
            prerendered HTML instead of only whichever tab opens first. */}
        {tabs.map((tab) => (
          <div
            key={tab.key}
            role="tabpanel"
            id={`panel-${tab.key}`}
            aria-labelledby={`tab-${tab.key}`}
            hidden={active !== tab.key}
          >
            {tab.items === null ? (
              <div className="grid grid-cols-2 gap-3.5 max-sm:grid-cols-1 pt-5">
                {hardware.builds.map((build) => (
                  <BuildCard key={build.name} build={build} />
                ))}
              </div>
            ) : (
              tab.items.map((proj) => <ProjectEntry key={proj.name} proj={proj} />)
            )}
          </div>
        ))}
      </section>
    </PageLayout>
  );
}
