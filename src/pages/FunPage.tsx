import { PageLayout } from "@/components/PageLayout";
import { SectionHeader } from "@/components/SectionHeader";
import { FunCard } from "@/components/Fun";
import { FadeIn } from "@/components/FadeIn";
import { fun } from "@/lib/data";

export function FunPage() {
  return (
    <PageLayout>
      <section className="py-6 pb-18">
        <SectionHeader num="05" title="Fun stuff" />
        <FadeIn className="text-muted text-[15px] leading-relaxed -mt-4 mb-8 max-w-[520px] font-serif">
          <p dangerouslySetInnerHTML={{ __html: fun.bridge }} />
        </FadeIn>
        <div className="grid grid-cols-2 gap-3.5 max-sm:grid-cols-1">
          {fun.items.map((item) => (
            <FunCard key={item.name} item={item} />
          ))}
        </div>
      </section>
    </PageLayout>
  );
}
