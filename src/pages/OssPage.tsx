import { PageLayout } from "@/components/PageLayout";
import { SectionHeader } from "@/components/SectionHeader";
import { OssRow } from "@/components/Oss";
import { FadeIn } from "@/components/FadeIn";
import { oss } from "@/lib/data";

export function OssPage() {
  return (
    <PageLayout>
      <section className="py-6 pb-18">
        <SectionHeader num="02" title="Open source & volunteering" />
        <FadeIn className="text-muted text-[15px] leading-relaxed -mt-4 mb-8 max-w-[520px] font-serif">
          <p dangerouslySetInnerHTML={{ __html: oss.bridge }} />
        </FadeIn>
        <div>
          {oss.items.map((item, i) => (
            <OssRow
              key={item.name}
              item={item}
              className={i > 0 ? "border-t border-border" : ""}
            />
          ))}
        </div>
      </section>
    </PageLayout>
  );
}
