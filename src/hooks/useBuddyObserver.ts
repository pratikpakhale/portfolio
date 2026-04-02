import { useEffect } from "react";

export type BuddyFrame =
  | "wave"
  | "type"
  | "read"
  | "build"
  | "vibe"
  | "dance"
  | "heart"
  | "walk";

export function useBuddyObserver(
  onFrameChange: (frame: BuddyFrame, label: string) => void
) {
  useEffect(() => {
    const sections = document.querySelectorAll("[data-buddy]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const frame = (entry.target as HTMLElement).dataset
              .buddy as BuddyFrame;
            const label =
              (entry.target as HTMLElement).dataset.buddyLabel || "";
            onFrameChange(frame, label);
          }
        });
      },
      { threshold: 0.4 }
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [onFrameChange]);
}
