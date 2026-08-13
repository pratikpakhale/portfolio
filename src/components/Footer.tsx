import { FadeIn } from "./FadeIn";
import { profile } from "@/lib/data";

export function Footer() {
  return (
    <FadeIn as="footer" className="py-12 pb-16 text-center text-dim text-[14px] font-mono">
      <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 mb-4">
        {profile.links.map((link) => (
          <a
            key={link.label}
            href={link.url}
            className="text-dim border-none hover:text-accent transition-colors"
          >
            {link.label}
          </a>
        ))}
      </div>
    </FadeIn>
  );
}
