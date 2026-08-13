import { PageLayout } from "@/components/PageLayout";
import { SectionHeader } from "@/components/SectionHeader";
import { PaperItem } from "@/components/Research";
import { FadeIn } from "@/components/FadeIn";
import { research } from "@/lib/data";

export function ResearchPage() {
  return (
    <PageLayout path="/research">
      <section className="py-6 pb-18">
        <SectionHeader num="05" title="Research" level={1} />
        <FadeIn className="text-muted text-[16px] leading-relaxed -mt-4 mb-8 max-w-[600px] font-sans">
          <p dangerouslySetInnerHTML={{ __html: research.bridge }} />
        </FadeIn>
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
