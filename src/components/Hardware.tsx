import { useState } from "react";
import { SectionHeader } from "./SectionHeader";
import { SectionFooter } from "./SectionFooter";
import { Bridge } from "./Bridge";
import { FadeIn } from "./FadeIn";
import { hardware } from "@/lib/data";
import type { Build } from "@/lib/types";

const VISIBLE_COUNT = 2;

export function BuildCard({ build }: { build: Build }) {
  return (
    <FadeIn className="rounded-lg overflow-hidden border border-border hover:border-accent-light transition-colors">
      <div className="w-full aspect-[4/3] bg-raised flex items-center justify-center font-mono text-[11px] text-dim border-b border-border">
        {build.image ? (
          <img src={build.image} alt={build.name} className="w-full h-full object-cover" />
        ) : (
          "your photo here"
        )}
      </div>
      <div className="p-3 px-3.5">
        <div className="text-sm font-medium mb-[3px]">{build.name}</div>
        <div className="text-[13px] text-muted leading-normal">
          {build.description}
        </div>
      </div>
    </FadeIn>
  );
}

export function Hardware() {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? hardware.builds : hardware.builds.slice(0, VISIBLE_COUNT);
  const hiddenCount = hardware.builds.length - VISIBLE_COUNT;

  return (
    <>
      <Bridge html={hardware.bridge} />
      <section
        id="hardware"
        className="py-6 pb-18"
        data-buddy="build"
        data-buddy-label="*bzzzz*"
      >
        <SectionHeader num="04" title="Hardware & builds" />
        <div className="grid grid-cols-2 gap-3.5 max-sm:grid-cols-1">
          {visible.map((build) => (
            <BuildCard key={build.name} build={build} />
          ))}
        </div>

        <SectionFooter
          route="/hardware"
          hiddenCount={hiddenCount}
          showAll={showAll}
          onToggle={() => setShowAll(!showAll)}
          noun="build"
          className="mt-5"
        />
      </section>
    </>
  );
}
