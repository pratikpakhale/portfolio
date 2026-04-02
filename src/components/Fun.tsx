import { useState } from "react";
import { SectionHeader } from "./SectionHeader";
import { SectionFooter } from "./SectionFooter";
import { Bridge } from "./Bridge";
import { FadeIn } from "./FadeIn";
import { fun } from "@/lib/data";
import type { FunItem as FunItemType } from "@/lib/types";

const VISIBLE_COUNT = 3;

export function FunRow({ item, className }: { item: FunItemType; className?: string }) {
  return (
    <FadeIn
      className={`flex justify-between items-baseline gap-4 hover:text-accent group ${className ?? ""}`}
    >
      <span>{item.name}</span>
      <span className="text-dim text-[13px] text-right shrink-0 group-hover:text-accent-light">
        {item.description}
      </span>
    </FadeIn>
  );
}

export function Fun() {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? fun.items : fun.items.slice(0, VISIBLE_COUNT);
  const hiddenCount = fun.items.length - VISIBLE_COUNT;

  return (
    <>
      <Bridge html={fun.bridge} />
      <section
        id="fun"
        className="py-6 pb-18"
        data-buddy="dance"
        data-buddy-label="!!"
      >
        <SectionHeader num="06" title="Fun stuff" />
        <div className="text-[15px] leading-[2.2]">
          {visible.map((item, i) => (
            <FunRow
              key={item.name}
              item={item}
              className={i < visible.length - 1 ? "border-b border-border" : ""}
            />
          ))}

          <SectionFooter
            route="/fun"
            hiddenCount={hiddenCount}
            showAll={showAll}
            onToggle={() => setShowAll(!showAll)}
          />
        </div>
      </section>
    </>
  );
}
