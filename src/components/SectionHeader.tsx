import { FadeIn } from "./FadeIn";

/**
 * `level` follows the document, not the styling: the homepage stacks these
 * under the name in the hero so they stay h2, while a standalone archive page
 * has no other heading above it and needs its section title to be the h1.
 */
export function SectionHeader({
  num,
  title,
  level = 2,
}: {
  num: string;
  title: string;
  level?: 1 | 2;
}) {
  const Heading = level === 1 ? "h1" : "h2";

  return (
    <FadeIn className="flex items-baseline gap-3.5 mb-8">
      <span className="font-mono text-xs text-accent-light shrink-0">
        {num}
      </span>
      <Heading className="font-sans text-[23px] font-semibold tracking-[-0.015em]">
        {title}
      </Heading>
    </FadeIn>
  );
}
