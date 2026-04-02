import { SectionHeader } from "./SectionHeader";
import { Bridge } from "./Bridge";
import { FadeIn } from "./FadeIn";
import { oss } from "@/lib/data";

export function Oss() {
  return (
    <>
      <Bridge html={oss.bridge} />
      <section id="oss" className="py-6 pb-18" data-buddy="heart" data-buddy-label="<3">
        <SectionHeader num="07" title="Open source & volunteering" />
        <div>
          {oss.items.map((item, i) => (
            <FadeIn
              key={item.name}
              className={`py-3.5 flex justify-between items-baseline gap-6 ${
                i > 0 ? "border-t border-border" : ""
              }`}
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
          ))}
        </div>
      </section>
    </>
  );
}
