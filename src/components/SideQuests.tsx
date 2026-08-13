import { SectionHeader } from "./SectionHeader";
import { SectionFooter } from "./SectionFooter";
import { Bridge } from "./Bridge";
import { FadeIn } from "./FadeIn";
import { sidequests } from "@/lib/data";
import type { SideQuestItem } from "@/lib/types";

export function SideQuestRow({
  item,
  className,
}: {
  item: SideQuestItem;
  className?: string;
}) {
  return (
    <FadeIn
      className={`flex justify-between items-baseline gap-4 hover:text-accent group ${className ?? ""}`}
    >
      <span>{item.name}</span>
      <span className="text-dim text-[14px] text-right shrink-0 group-hover:text-accent-light">
        {item.description}
      </span>
    </FadeIn>
  );
}

export function SideQuests() {
  return (
    <>
      <Bridge html={sidequests.bridge} />
      <section id="sidequests" className="py-6 pb-18">
        <SectionHeader num="06" title="Side quests" />
        <div className="text-[16px] leading-[2.2]">
          {sidequests.items.map((item, i) => (
            <SideQuestRow
              key={item.name}
              item={item}
              className={i < sidequests.items.length - 1 ? "border-b border-border" : ""}
            />
          ))}
          <SectionFooter route="/sidequests" className="mt-4" />
        </div>
      </section>
    </>
  );
}
