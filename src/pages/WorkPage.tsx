import { PageLayout } from "@/components/PageLayout";
import { SectionHeader } from "@/components/SectionHeader";
import { FadeIn } from "@/components/FadeIn";
import { work } from "@/lib/data";
import type { Position } from "@/lib/types";

function WorkEntry({ pos }: { pos: Position }) {
  return (
    <FadeIn className="py-6 border-b border-border last:border-b-0">
      <div>
        <span className="text-dim text-xs float-right max-sm:float-none max-sm:block">
          {pos.date}
        </span>
      </div>
      <div className="text-text font-sans text-base font-medium mt-1">
        {pos.title}
      </div>
      <div className="text-muted font-sans text-sm mt-0.5">
        {pos.company}
      </div>
      <div className="mt-3 space-y-1">
        {pos.diff.map((line, j) => (
          <div
            key={j}
            className="flex items-baseline gap-2.5 font-sans text-sm text-muted leading-relaxed"
          >
            <span className="shrink-0 text-[5px] translate-y-[-1px] text-accent-light/70">
              ●
            </span>
            <span>{line.text}</span>
          </div>
        ))}
      </div>
      {pos.story && (
        <p className="mt-4 text-sm text-muted/80 leading-relaxed italic">
          {pos.story}
        </p>
      )}
    </FadeIn>
  );
}

export function WorkPage() {
  return (
    <PageLayout path="/work">
      <section className="py-6 pb-18">
        <SectionHeader num="01" title="Work" level={1} />
        <FadeIn className="text-muted text-[16px] leading-relaxed -mt-4 mb-8 max-w-[600px] font-sans">
          <p dangerouslySetInnerHTML={{ __html: work.bridge }} />
        </FadeIn>
        <div className="font-mono text-[14px]">
          {work.positions.map((pos) => (
            <WorkEntry key={pos.hash} pos={pos} />
          ))}
        </div>
      </section>
    </PageLayout>
  );
}
