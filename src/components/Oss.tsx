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
    <FadeIn className={`py-3.5 ${className ?? ""}`}>
      <div className="text-[16px]">
        {item.url ? (
          <a href={item.url} className="border-none hover:text-accent transition-colors">
            {item.name}
          </a>
        ) : (
          item.name
        )}
      </div>
      <div className="text-[14px] text-muted mt-0.5">{item.role}</div>
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
      <section id="oss" className="py-6 pb-18">
        <SectionHeader num="02" title="Open source & volunteering" />
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
