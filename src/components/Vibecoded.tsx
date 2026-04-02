import { useState } from "react";
import { SectionHeader } from "./SectionHeader";
import { SectionFooter } from "./SectionFooter";
import { Bridge } from "./Bridge";
import { FadeIn } from "./FadeIn";
import { vibecoded } from "@/lib/data";
import type { Demo } from "@/lib/types";

const VISIBLE_COUNT = 2;

export function DemoCard({ demo }: { demo: Demo }) {
  return (
    <FadeIn className="border border-border rounded-lg overflow-hidden hover:border-accent-light transition-colors">
      <div className="bg-raised py-2.5 px-3.5 border-b border-border flex items-center gap-2">
        <div className="flex gap-[5px]">
          <span className="w-[7px] h-[7px] rounded-full bg-border" />
          <span className="w-[7px] h-[7px] rounded-full bg-border" />
          <span className="w-[7px] h-[7px] rounded-full bg-border" />
        </div>
        <span className="font-mono text-[11px] text-dim ml-1.5">
          {demo.url}
        </span>
      </div>
      <div className="py-7 px-5 min-h-[100px] flex items-center justify-center text-[13px] text-dim font-mono">
        {demo.image ? (
          <img src={demo.image} alt={demo.name} className="w-full" />
        ) : (
          "your live embed or screenshot"
        )}
      </div>
      <div className="py-3 px-3.5 border-t border-border flex justify-between items-baseline">
        <span className="text-sm font-medium">{demo.name}</span>
        <span className="font-mono text-[11px] text-accent">
          {demo.note}
        </span>
      </div>
    </FadeIn>
  );
}

export function Vibecoded() {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? vibecoded.demos : vibecoded.demos.slice(0, VISIBLE_COUNT);
  const hiddenCount = vibecoded.demos.length - VISIBLE_COUNT;

  return (
    <>
      <Bridge html={vibecoded.bridge} />
      <section
        id="vibecoded"
        className="py-6 pb-18"
        data-buddy="vibe"
        data-buddy-label="vibin~"
      >
        <SectionHeader num="05" title="Vibecoded" />
        <FadeIn className="text-muted text-sm -mt-5 mb-6">
          <p>{vibecoded.subtitle}</p>
        </FadeIn>
        <div className="flex flex-col gap-5">
          {visible.map((demo) => (
            <DemoCard key={demo.name} demo={demo} />
          ))}
        </div>

        <SectionFooter
          route="/vibecoded"
          hiddenCount={hiddenCount}
          showAll={showAll}
          onToggle={() => setShowAll(!showAll)}
          noun="demo"
          className="mt-5"
        />
      </section>
    </>
  );
}
