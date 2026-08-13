import { PageLayout } from "@/components/PageLayout";
import { SectionHeader } from "@/components/SectionHeader";
import { SideQuestRow } from "@/components/SideQuests";
import { sidequests } from "@/lib/data";

export function SideQuestsPage() {
  return (
    <PageLayout path="/sidequests">
      <section className="py-6 pb-18">
        <SectionHeader num="06" title="Side quests" level={1} />
        <div className="text-[16px] leading-[2.2]">
          {sidequests.items.map((item, i) => (
            <SideQuestRow
              key={item.name}
              item={item}
              className={i < sidequests.items.length - 1 ? "border-b border-border" : ""}
            />
          ))}
        </div>
      </section>
    </PageLayout>
  );
}
