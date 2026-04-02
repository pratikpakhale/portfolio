import { FadeIn } from "./FadeIn";
import { profile } from "@/lib/data";

export function Hero() {
  return (
    <header className="py-[100px] pb-20" data-buddy="wave" data-buddy-label="">
      <FadeIn as="h1" className="font-serif text-[clamp(44px,8vw,72px)] font-normal leading-[1.05] tracking-tight mb-5">
        {profile.name}
      </FadeIn>
      <FadeIn className="text-[17px] text-muted max-w-[460px] leading-relaxed">
        <p>{profile.tagline}</p>
      </FadeIn>
      <FadeIn className="mt-7 flex gap-[18px] font-mono text-[13px]">
        {profile.links.map((link) => (
          <a
            key={link.label}
            href={link.url}
            className="text-dim border-b border-border hover:text-accent hover:border-accent transition-colors"
          >
            {link.label}
          </a>
        ))}
      </FadeIn>
    </header>
  );
}
