import { useState } from "react";
import { SectionHeader } from "./SectionHeader";
import { SectionFooter } from "./SectionFooter";
import { Bridge } from "./Bridge";
import { FadeIn } from "./FadeIn";
import { work } from "@/lib/data";
import type { Position } from "@/lib/types";

const VISIBLE_COUNT = 3;

export function WorkPosition({ pos, className }: { pos: Position; className?: string }) {
  return (
    <FadeIn className={`py-5 ${className ?? ""}`}>
      <div>
        <span className="text-dim text-xs float-right max-sm:float-none max-sm:block">
          {pos.date}
        </span>
      </div>
      <div className="text-text font-sans text-base font-medium mt-1">
        {pos.title}
      </div>
      <div className="text-muted font-sans text-sm mt-0.5">
        {pos.company}
      </div>
      <div className="mt-3 space-y-1">
        {pos.diff.map((line, j) => (
          <div
            key={j}
            className="flex items-baseline gap-2.5 font-sans text-sm text-muted leading-relaxed"
          >
            <span className="shrink-0 text-[5px] translate-y-[-1px] text-accent-light/70">
              ●
            </span>
            <span>{line.text}</span>
          </div>
        ))}
      </div>
    </FadeIn>
  );
}

export function Work() {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? work.positions : work.positions.slice(0, VISIBLE_COUNT);
  const hiddenCount = work.positions.length - VISIBLE_COUNT;

  return (
    <>
      <Bridge html={work.bridge} />
      <section id="work" className="py-6 pb-18">
        <SectionHeader num="01" title="Work" />
        <div className="font-mono text-[14px]">
          {visible.map((pos, i) => (
            <WorkPosition
              key={pos.hash}
              pos={pos}
              className={i > 0 ? "border-t border-border" : ""}
            />
          ))}

          <SectionFooter
            route="/work"
            hiddenCount={hiddenCount}
            showAll={showAll}
            onToggle={() => setShowAll(!showAll)}
            noun="role"
          />
        </div>
      </section>
    </>
  );
}
