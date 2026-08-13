import { FadeIn } from "./FadeIn";

export function Bridge({ html }: { html: string }) {
  return (
    <FadeIn
      className="pt-14 pb-5 font-sans text-[24px] text-muted leading-[1.45] max-w-[600px] bridge"
    >
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </FadeIn>
  );
}
