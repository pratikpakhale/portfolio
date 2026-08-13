import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface SectionFooterProps {
  route: string;
  /** How many items the section is holding back. Omit when it shows everything. */
  hiddenCount?: number;
  showAll?: boolean;
  onToggle?: () => void;
  noun?: string;
  className?: string;
}

/**
 * The link to a section's full page always renders, even when the section has
 * nothing hidden — it's how a reader (and a crawler) gets from the homepage to
 * the archive. Only the expand toggle depends on there being more to show.
 */
export function SectionFooter({
  route,
  hiddenCount = 0,
  showAll,
  onToggle,
  noun,
  className,
}: SectionFooterProps) {
  const canExpand = hiddenCount > 0 && onToggle;

  return (
    <div
      className={`pt-2 flex items-center ${canExpand ? "justify-between" : "justify-end"} ${className ?? ""}`}
    >
      {canExpand && (
        <button
          onClick={onToggle}
          className="font-sans text-sm text-muted hover:text-accent transition-colors cursor-pointer"
        >
          {showAll
            ? "show less"
            : noun
              ? `+ ${hiddenCount} more ${noun}${hiddenCount > 1 ? "s" : ""}`
              : `+ ${hiddenCount} more`}
        </button>
      )}
      <Link
        to={route}
        className="font-sans text-sm text-muted border-b border-border hover:text-accent hover:border-accent transition-colors flex items-center gap-1.5"
      >
        full
        <ArrowRight size={14} />
      </Link>
    </div>
  );
}
