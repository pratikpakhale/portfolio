import { PageLayout } from "@/components/PageLayout";
import { SectionHeader } from "@/components/SectionHeader";
import { FadeIn } from "@/components/FadeIn";
import { projects, vibecoded, fun } from "@/lib/data";
import type { Project, Demo, FunItem } from "@/lib/types";

const eras = [
  {
    key: "post-ai",
    title: "Post-AI era",
    caption:
      "Building with AI, not just about it. LLMs as co-pilots, local inference, browser agents — the toolkit changed, the instinct didn't.",
  },
  {
    key: "college",
    title: "Handcrafted learnings",
    caption:
      "No copilot, no shortcuts. Just docs, Stack Overflow answers with 3 upvotes, and the stubbornness to ship anyway. Every bug was a lesson.",
  },
  {
    key: "early",
    title: "The stackoverflow era",
    caption:
      "Didn't fully understand what I was building — but shipped it anyway. Copy-paste driven development, Firebase for everything, and vibes.",
  },
];

function ProjectEntry({ proj }: { proj: Project }) {
  return (
    <FadeIn className="py-5 border-b border-border last:border-b-0">
      <div className="flex justify-between items-baseline gap-4 mb-1">
        <a
          href={proj.url}
          className="text-base font-medium border-none hover:text-accent transition-colors"
        >
          {proj.name}
        </a>
        <div className="flex items-baseline gap-3 shrink-0">
          <span className="font-mono text-[11px] text-accent">{proj.tag}</span>
          <span className="font-mono text-[11px] text-dim">{proj.year}</span>
        </div>
      </div>
      <p className="text-[13px] text-muted leading-relaxed">{proj.description}</p>
      {proj.story && (
        <p className="mt-3 text-sm text-muted/70 leading-relaxed italic">
          {proj.story}
        </p>
      )}
    </FadeIn>
  );
}

function DemoEntry({ demo }: { demo: Demo }) {
  return (
    <FadeIn className="py-4 border-b border-border last:border-b-0">
      <div className="flex justify-between items-baseline gap-4">
        <a
          href={demo.url}
          className="text-sm font-medium border-none hover:text-accent transition-colors"
        >
          {demo.name}
        </a>
        <span className="font-mono text-[11px] text-muted text-right shrink-0">
          {demo.note}
        </span>
      </div>
    </FadeIn>
  );
}

function FunEntry({ item }: { item: FunItem }) {
  return (
    <FadeIn className="py-4 border-b border-border last:border-b-0">
      <p className="text-sm font-medium mb-0.5">{item.name}</p>
      <p className="text-[13px] text-muted leading-relaxed">{item.description}</p>
    </FadeIn>
  );
}

export function ProjectsPage() {
  return (
    <PageLayout>
      <section className="py-6 pb-18">
        <SectionHeader num="03" title="Projects Archive" />
        <FadeIn className="text-muted text-[15px] leading-relaxed -mt-4 mb-12 max-w-[520px] font-serif">
          <p dangerouslySetInnerHTML={{ __html: projects.bridge }} />
        </FadeIn>

        {eras.map((era) => {
          const eraProjects = projects.items.filter((p) => p.era === era.key);
          if (eraProjects.length === 0) return null;

          return (
            <FadeIn key={era.key} className="mb-14">
              <h3 className="font-serif text-lg text-foreground mb-1.5">
                {era.title}
              </h3>
              <p className="text-[13px] text-muted/60 leading-relaxed mb-6 max-w-[480px]">
                {era.caption}
              </p>
              <div>
                {eraProjects.map((proj) => (
                  <ProjectEntry key={proj.name} proj={proj} />
                ))}
              </div>
            </FadeIn>
          );
        })}

        <FadeIn className="mb-14">
          <h3 className="font-serif text-lg text-foreground mb-1.5">
            Vibecoded
          </h3>
          <p className="text-[13px] text-muted/60 leading-relaxed mb-6 max-w-[480px]">
            Zero hand-written lines. Prompted into existence — tiny tools that just needed to work.
          </p>
          <div>
            {vibecoded.demos.map((demo) => (
              <DemoEntry key={demo.name} demo={demo} />
            ))}
          </div>
        </FadeIn>

        <FadeIn className="mb-14 last:mb-0">
          <h3 className="font-serif text-lg text-foreground mb-1.5">
            Just for fun
          </h3>
          <p className="text-[13px] text-muted/60 leading-relaxed mb-6 max-w-[480px]">
            Not everything needs a reason. Sometimes the best projects are the ones that just make you laugh.
          </p>
          <div>
            {fun.items.map((item) => (
              <FunEntry key={item.name} item={item} />
            ))}
          </div>
        </FadeIn>
      </section>
    </PageLayout>
  );
}
