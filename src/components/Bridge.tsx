import { FadeIn } from "./FadeIn";
import type { BuddyFrame } from "@/hooks/useBuddyObserver";

export function Bridge({
  html,
  buddy = "walk",
  buddyLabel = "",
}: {
  html: string;
  buddy?: BuddyFrame;
  buddyLabel?: string;
}) {
  return (
    <FadeIn
      className="pt-14 pb-5 font-serif text-[22px] text-muted leading-[1.45] max-w-[520px] bridge"
    >
      <div
        data-buddy={buddy}
        data-buddy-label={buddyLabel}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </FadeIn>
  );
}
