import { useState } from "react";
import { SectionHeader } from "./SectionHeader";
import { SectionFooter } from "./SectionFooter";
import { Bridge } from "./Bridge";
import { FadeIn } from "./FadeIn";
import { oss } from "@/lib/data";
import type { OssItem as OssItemType } from "@/lib/types";

const VISIBLE_COUNT = 3;

export function OssRow({ item, className }: { item: OssItemType; className?: string }) {
  return (
    <FadeIn
      className={`py-3.5 flex justify-between items-baseline gap-6 ${className ?? ""}`}
    >
      <div>
        <div className="text-[15px]">
          {item.url ? (
            <a href={item.url} className="border-none hover:text-accent transition-colors">
              {item.name}
            </a>
          ) : (
            item.name
          )}
        </div>
        <div className="text-[13px] text-muted mt-0.5">{item.role}</div>
      </div>
      <span className="font-mono text-xs text-dim shrink-0">
        {item.period}
      </span>
    </FadeIn>
  );
}

export function Oss() {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? oss.items : oss.items.slice(0, VISIBLE_COUNT);
  const hiddenCount = oss.items.length - VISIBLE_COUNT;

  return (
    <>
      <Bridge html={oss.bridge} />
      <section
        id="oss"
        className="py-6 pb-18"
        data-buddy="heart"
        data-buddy-label="<3"
      >
        <SectionHeader num="08" title="Open source & volunteering" />
        <div>
          {visible.map((item, i) => (
            <OssRow
              key={item.name}
              item={item}
              className={i > 0 ? "border-t border-border" : ""}
            />
          ))}

          <SectionFooter
            route="/oss"
            hiddenCount={hiddenCount}
            showAll={showAll}
            onToggle={() => setShowAll(!showAll)}
          />
        </div>
      </section>
    </>
  );
}
