import { PageLayout } from "@/components/PageLayout";
import { SectionHeader } from "@/components/SectionHeader";
import { PaperItem } from "@/components/Research";
import { research } from "@/lib/data";

export function ResearchPage() {
  return (
    <PageLayout>
      <section className="py-6 pb-18">
        <SectionHeader num="03" title="Research" />
        <div>
          {research.papers.map((paper, i) => (
            <PaperItem
              key={paper.title}
              paper={paper}
              className={i > 0 ? "border-t border-border" : ""}
            />
          ))}
        </div>
      </section>
    </PageLayout>
  );
}
