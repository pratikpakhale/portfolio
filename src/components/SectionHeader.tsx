import { FadeIn } from "./FadeIn";

export function SectionHeader({ num, title }: { num: string; title: string }) {
  return (
    <FadeIn className="flex items-baseline gap-3.5 mb-8">
      <span className="font-mono text-xs text-accent-light shrink-0">
        {num}
      </span>
      <h2 className="font-serif text-[26px] font-normal tracking-tight">
        {title}
      </h2>
    </FadeIn>
  );
}
