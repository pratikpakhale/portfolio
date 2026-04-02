import type { ReactNode } from "react";
import { useFadeIn } from "@/hooks/useFadeIn";

export function FadeIn({
  children,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: keyof HTMLElementTagNameMap;
}) {
  const ref = useFadeIn<HTMLElement>();
  // @ts-expect-error dynamic tag
  return <Tag ref={ref} className={`fade-in ${className}`}>{children}</Tag>;
}
