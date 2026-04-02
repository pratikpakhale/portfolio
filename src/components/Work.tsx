import { SectionHeader } from "./SectionHeader";
import { Bridge } from "./Bridge";
import { FadeIn } from "./FadeIn";
import { work } from "@/lib/data";

export function Work() {
  return (
    <>
      <Bridge html={work.bridge} />
      <section id="work" className="py-6 pb-18" data-buddy="type" data-buddy-label="*clack clack*">
        <SectionHeader num="01" title="Where I've been" />
        <div className="font-mono text-[13px]">
          {work.positions.map((pos, i) => (
            <FadeIn
              key={pos.hash}
              className={`py-5 ${i > 0 ? "border-t border-border" : ""}`}
            >
              <div>
                <span className="text-accent-light mr-2">{pos.hash}</span>
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
              <div className="mt-3.5 py-3.5 px-[18px] bg-raised rounded-md border-l-[3px] border-accent-light font-sans text-sm text-muted leading-7">
                {pos.diff.map((line, j) => (
                  <div key={j}>
                    <span
                      className={`font-mono font-medium ${
                        line.type === "plus" ? "text-green" : "text-red"
                      }`}
                    >
                      {line.type === "plus" ? "+" : "\u2212"}
                    </span>{" "}
                    {line.text}
                  </div>
                ))}
              </div>
            </FadeIn>
          ))}
        </div>
      </section>
    </>
  );
}
