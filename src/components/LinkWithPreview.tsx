import type { CSSProperties } from "react";
import { BrandIcon } from "./BrandIcon";
import type { ProfileLink } from "@/lib/types";

/**
 * A profile link that reveals a card with its platform mark and handle on
 * hover or keyboard focus.
 *
 * The card is a sibling of the link rather than a child, so it can hold its
 * own anchors; the gap between the two is bridged by transparent padding so
 * the cursor can travel into it. It hides with `visibility`, not opacity
 * alone, so while closed it neither swallows clicks nor sits in the tab order.
 */
export function LinkWithPreview({
  link,
  className = "",
}: {
  link: ProfileLink;
  className?: string;
}) {
  const brand = {
    "--brand": link.color,
    "--brand-dark": link.colorDark ?? link.color,
  } as CSSProperties;

  return (
    <span className="relative inline-block group/preview">
      <a href={link.url} className={className}>
        {link.label}
      </a>

      <span className="absolute top-full left-0 pt-2 z-50 invisible opacity-0 translate-y-1 transition-all duration-200 group-hover/preview:visible group-hover/preview:opacity-100 group-hover/preview:translate-y-0 group-focus-within/preview:visible group-focus-within/preview:opacity-100 group-focus-within/preview:translate-y-0">
        <span className="block w-max max-w-[260px] text-left rounded-lg border border-border bg-raised px-3 py-2.5 shadow-lg">
          <a
            href={link.url}
            style={brand}
            className="flex items-center gap-2 border-none brand hover:opacity-75 transition-opacity"
          >
            <BrandIcon name={link.icon} size={15} className="shrink-0" />
            <span className="font-mono text-[13px] leading-none break-all">
              {link.handle}
            </span>
          </a>

          {link.note &&
            (link.noteUrl ? (
              <a
                href={link.noteUrl}
                className="mt-1.5 block font-sans text-[12px] leading-snug text-muted border-none hover:text-accent transition-colors"
              >
                {link.note}
              </a>
            ) : (
              <span className="mt-1.5 block font-sans text-[12px] leading-snug text-muted">
                {link.note}
              </span>
            ))}
        </span>
      </span>
    </span>
  );
}
