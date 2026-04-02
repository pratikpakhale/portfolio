import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface SectionFooterProps {
  route: string;
  hiddenCount: number;
  showAll: boolean;
  onToggle: () => void;
  noun?: string;
  className?: string;
}

export function SectionFooter({
  route,
  hiddenCount,
  showAll,
  onToggle,
  noun,
  className,
}: SectionFooterProps) {
  if (hiddenCount <= 0) return null;

  return (
    <div
      className={`border-t border-border pt-5 flex items-center justify-between ${className ?? ""}`}
    >
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
