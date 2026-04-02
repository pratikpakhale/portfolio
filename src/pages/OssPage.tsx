import { PageLayout } from "@/components/PageLayout";
import { SectionHeader } from "@/components/SectionHeader";
import { OssRow } from "@/components/Oss";
import { oss } from "@/lib/data";

export function OssPage() {
  return (
    <PageLayout>
      <section className="py-6 pb-18">
        <SectionHeader num="08" title="Open source & volunteering" />
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
