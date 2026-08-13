import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "./FadeIn";
import { LinkWithPreview } from "./LinkWithPreview";
import { profile } from "@/lib/data";

export function Hero() {
  return (
    <header className="py-25 pb-20">
      <FadeIn as="h1" className="font-sans text-[clamp(38px,6.5vw,52px)] font-semibold leading-[1.12] tracking-[-0.025em] mb-5">
        {profile.name}
      </FadeIn>
      <FadeIn className="text-[19px] text-muted max-w-[520px] leading-relaxed">
        <p>{profile.tagline}</p>
      </FadeIn>
      <FadeIn className="mt-7 flex flex-wrap gap-x-[18px] gap-y-2.5 font-mono text-[14px]">
        {profile.links.map((link) => (
          <LinkWithPreview
            key={link.label}
            link={link}
            className="text-dim border-b border-border hover:text-accent hover:border-accent transition-colors"
          />
        ))}

        <span aria-hidden className="text-border select-none">/</span>

        <Link
          to="/projects"
          className="inline-flex items-center gap-1 text-dim border-b border-border hover:text-accent hover:border-accent transition-colors"
        >
          projects archive
          <ArrowRight size={12} className="shrink-0" />
        </Link>
      </FadeIn>
    </header>
  );
}
