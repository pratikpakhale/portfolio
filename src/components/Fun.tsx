import { SectionHeader } from "./SectionHeader";
import { Bridge } from "./Bridge";
import { FadeIn } from "./FadeIn";
import { fun } from "@/lib/data";

export function Fun() {
  return (
    <>
      <Bridge html={fun.bridge} />
      <section id="fun" className="py-6 pb-18" data-buddy="dance" data-buddy-label="!!">
        <SectionHeader num="06" title="Fun stuff" />
        <div className="text-[15px] leading-[2.2]">
          {fun.items.map((item, i) => (
            <FadeIn
              key={item.name}
              className={`flex justify-between items-baseline gap-4 hover:text-accent group ${
                i < fun.items.length - 1 ? "border-b border-border" : ""
              }`}
            >
              <span>{item.name}</span>
              <span className="text-dim text-[13px] text-right shrink-0 group-hover:text-accent-light">
                {item.description}
              </span>
            </FadeIn>
          ))}
        </div>
      </section>
    </>
  );
}
