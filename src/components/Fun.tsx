import { useState } from "react";
import { SectionHeader } from "./SectionHeader";
import { SectionFooter } from "./SectionFooter";
import { Bridge } from "./Bridge";
import { FadeIn } from "./FadeIn";
import { fun } from "@/lib/data";
import type { FunItem as FunItemType } from "@/lib/types";

const VISIBLE_COUNT = 3;

export function FunCard({ item }: { item: FunItemType }) {
  return (
    <FadeIn className="rounded-lg overflow-hidden border border-border hover:border-accent-light transition-colors">
      {item.image && (
        <div className="w-full aspect-[4/3] bg-raised flex items-center justify-center border-b border-border">
          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
        </div>
      )}
      <div className="p-3 px-3.5">
        <div className="text-sm font-medium mb-[3px]">{item.name}</div>
        <div className="text-[13px] text-muted leading-normal">
          {item.description}
        </div>
      </div>
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
        <SectionHeader num="05" title="Fun stuff" />
        <div className="grid grid-cols-2 gap-3.5 max-sm:grid-cols-1">
          {visible.map((item) => (
            <FunCard key={item.name} item={item} />
          ))}
        </div>

        <SectionFooter
          route="/fun"
          hiddenCount={hiddenCount}
          showAll={showAll}
          onToggle={() => setShowAll(!showAll)}
          className="mt-5"
        />
      </section>
    </>
  );
}
