import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { Bridge } from "./Bridge";
import { FadeIn } from "./FadeIn";
import { sidequests } from "@/lib/data";

const VISIBLE_COUNT = 3;

export function SideQuests() {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? sidequests.items : sidequests.items.slice(0, VISIBLE_COUNT);
  const hiddenCount = sidequests.items.length - VISIBLE_COUNT;

  return (
    <>
      <Bridge html={sidequests.bridge} />
      <section
        id="sidequests"
        className="py-6 pb-18"
        data-buddy="dance"
        data-buddy-label="!!"
      >
        <SectionHeader num="07" title="Side quests" />
        <div className="text-[15px] leading-[2.2]">
          {visible.map((item, i) => (
            <FadeIn
              key={item.name}
              className={`flex justify-between items-baseline gap-4 hover:text-accent group ${
                i < visible.length - 1 ? "border-b border-border" : ""
              }`}
            >
              <span>{item.name}</span>
              <span className="text-dim text-[13px] text-right shrink-0 group-hover:text-accent-light">
                {item.description}
              </span>
            </FadeIn>
          ))}

          {hiddenCount > 0 && (
            <div className="pt-2 flex items-center justify-between">
              <button
                onClick={() => setShowAll(!showAll)}
                className="font-sans text-sm text-muted hover:text-accent transition-colors cursor-pointer"
              >
                {showAll
                  ? "show less"
                  : `+ ${hiddenCount} more`}
              </button>
              <Link
                to="/sidequests"
                className="font-sans text-sm text-muted border-b border-border hover:text-accent hover:border-accent transition-colors flex items-center gap-1.5"
              >
                full
                <ArrowRight size={14} />
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
