import { PageLayout } from "@/components/PageLayout";
import { SectionHeader } from "@/components/SectionHeader";
import { DemoCard } from "@/components/Vibecoded";
import { FadeIn } from "@/components/FadeIn";
import { vibecoded } from "@/lib/data";

export function VibecodedPage() {
  return (
    <PageLayout>
      <section className="py-6 pb-18">
        <SectionHeader num="05" title="Vibecoded" />
        <FadeIn className="text-muted text-sm -mt-5 mb-6">
          <p>{vibecoded.subtitle}</p>
        </FadeIn>
        <div className="flex flex-col gap-5">
          {vibecoded.demos.map((demo) => (
            <DemoCard key={demo.name} demo={demo} />
          ))}
        </div>
      </section>
    </PageLayout>
  );
}
