import { useEffect, useState, useCallback } from "react";

const links = [
  { href: "#work", num: "01", label: "work" },
  { href: "#oss", num: "02", label: "oss" },
  { href: "#projects", num: "03", label: "projects" },
  { href: "#hardware", num: "04", label: "hardware" },
  { href: "#fun", num: "05", label: "fun" },
  { href: "#vibecoded", num: "06", label: "vibecoded" },
  { href: "#research", num: "07", label: "research" },
  { href: "#sidequests", num: "08", label: "side quests" },
];

const sectionIds = links.map((l) => l.href.slice(1));

export function Nav() {
  const [active, setActive] = useState("");

  const updateActive = useCallback(() => {
    const scrollY = window.scrollY;
    const viewportHeight = window.innerHeight;

    // If near the bottom, activate last section
    if (scrollY + viewportHeight >= document.documentElement.scrollHeight - 50) {
      setActive("#" + sectionIds[sectionIds.length - 1]);
      return;
    }

    // Find the section whose top is closest to (but above) a point 40% down the viewport
    const target = scrollY + viewportHeight * 0.4;
    let best = "";

    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (!el) continue;
      const top = el.offsetTop;
      if (top <= target) {
        best = "#" + id;
      }
    }

    setActive(best);
  }, []);

  useEffect(() => {
    updateActive();
    window.addEventListener("scroll", updateActive, { passive: true });
    window.addEventListener("resize", updateActive, { passive: true });
    return () => {
      window.removeEventListener("scroll", updateActive);
      window.removeEventListener("resize", updateActive);
    };
  }, [updateActive]);

  return (
    <nav className="fixed right-5 top-1/2 -translate-y-1/2 z-50 flex flex-col items-end gap-1 max-md:right-2.5">
      {links.map((l) => {
        const isActive = active === l.href;
        return (
          <a
            key={l.href}
            href={l.href}
            aria-label={l.label}
            className="flex items-center gap-2 border-b-0 group"
          >
            <span
              className={`font-mono text-xs transition-all duration-300 ${
                isActive
                  ? "opacity-100 translate-x-0 text-accent"
                  : "opacity-0 translate-x-2 text-dim group-hover:opacity-100 group-hover:translate-x-0"
              }`}
            >
              {l.label}
            </span>
            <span
              className={`block rounded-full shrink-0 transition-all duration-300 ${
                isActive
                  ? "w-2.5 h-2.5 bg-accent"
                  : "w-1.5 h-1.5 bg-dim/40 group-hover:bg-dim group-hover:scale-125"
              }`}
            />
          </a>
        );
      })}
    </nav>
  );
}
