import { PageLayout } from "@/components/PageLayout";
import { SectionHeader } from "@/components/SectionHeader";
import { DemoCard } from "@/components/Vibecoded";
import { FadeIn } from "@/components/FadeIn";
import { vibecoded } from "@/lib/data";

export function VibecodedPage() {
  return (
    <PageLayout>
      <section className="py-6 pb-18">
        <SectionHeader num="06" title="Vibecoded" />
        <FadeIn className="text-muted text-[15px] leading-relaxed -mt-4 mb-8 max-w-[520px] font-serif">
          <p dangerouslySetInnerHTML={{ __html: vibecoded.bridge }} />
        </FadeIn>
        <FadeIn className="text-muted text-sm -mt-5 mb-6">
          <p>{vibecoded.subtitle}</p>
        </FadeIn>
        <div className="flex flex-col gap-3">
          {vibecoded.demos.map((demo) => (
            <DemoCard key={demo.name} demo={demo} />
          ))}
        </div>
      </section>
    </PageLayout>
  );
}
