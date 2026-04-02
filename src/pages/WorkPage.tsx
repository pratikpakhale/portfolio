import { PageLayout } from "@/components/PageLayout";
import { SectionHeader } from "@/components/SectionHeader";
import { WorkPosition } from "@/components/Work";
import { work } from "@/lib/data";

export function WorkPage() {
  return (
    <PageLayout>
      <section className="py-6 pb-18">
        <SectionHeader num="01" title="Where I've been" />
        <div className="font-mono text-[13px]">
          {work.positions.map((pos, i) => (
            <WorkPosition
              key={pos.hash}
              pos={pos}
              className={i > 0 ? "border-t border-border" : ""}
            />
          ))}
        </div>
      </section>
    </PageLayout>
  );
}
