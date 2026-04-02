import { useEffect, useState } from "react";

const links = [
  { href: "#work", num: "01", label: "work" },
  { href: "#projects", num: "02", label: "projects" },
  { href: "#research", num: "03", label: "research" },
  { href: "#hardware", num: "04", label: "hardware" },
  { href: "#vibecoded", num: "05", label: "vibecoded" },
  { href: "#fun", num: "06", label: "fun" },
  { href: "#oss", num: "07", label: "oss" },
];

export function Nav() {
  const [active, setActive] = useState("");

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive("#" + entry.target.id);
          }
        });
      },
      { threshold: 0.25 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-bg/92 backdrop-blur-[12px] border-b border-border py-3.5 flex gap-5 font-mono text-[11px] text-dim overflow-x-auto">
      {links.map((l) => (
        <a
          key={l.href}
          href={l.href}
          className={`whitespace-nowrap border-none transition-colors hover:text-text ${
            active === l.href ? "!text-accent" : ""
          }`}
        >
          <span className="text-accent-light mr-[3px]">{l.num}</span>
          {l.label}
        </a>
      ))}
    </nav>
  );
}
