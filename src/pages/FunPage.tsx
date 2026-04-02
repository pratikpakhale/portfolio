import { PageLayout } from "@/components/PageLayout";
import { SectionHeader } from "@/components/SectionHeader";
import { FunRow } from "@/components/Fun";
import { fun } from "@/lib/data";

export function FunPage() {
  return (
    <PageLayout>
      <section className="py-6 pb-18">
        <SectionHeader num="06" title="Fun stuff" />
        <div className="text-[15px] leading-[2.2]">
          {fun.items.map((item, i) => (
            <FunRow
              key={item.name}
              item={item}
              className={i < fun.items.length - 1 ? "border-b border-border" : ""}
            />
          ))}
        </div>
      </section>
    </PageLayout>
  );
}
