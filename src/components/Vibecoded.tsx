import { useState } from "react";
import { SectionHeader } from "./SectionHeader";
import { SectionFooter } from "./SectionFooter";
import { Bridge } from "./Bridge";
import { FadeIn } from "./FadeIn";
import { vibecoded } from "@/lib/data";
import type { Demo } from "@/lib/types";

const VISIBLE_COUNT = 3;

export function DemoCard({ demo }: { demo: Demo }) {
  return (
    <FadeIn>
      <a
        href={demo.url}
        className="block border border-border rounded-lg overflow-hidden hover:border-accent-light transition-colors group"
      >
        {demo.image && (
          <div className="w-full aspect-[3/1] bg-raised flex items-center justify-center border-b border-border">
            <img src={demo.image} alt={demo.name} className="w-full h-full object-cover" />
          </div>
        )}
        <div className="py-3.5 px-4 flex justify-between items-baseline gap-4">
          <span className="text-sm font-medium group-hover:text-accent transition-colors">
            {demo.name}
          </span>
          <span className="font-mono text-[11px] text-muted text-right shrink-0">
            {demo.note}
          </span>
        </div>
      </a>
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
        <SectionHeader num="06" title="Vibecoded" />
        <FadeIn className="text-muted text-sm -mt-5 mb-6">
          <p>{vibecoded.subtitle}</p>
        </FadeIn>
        <div className="flex flex-col gap-3">
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
