export function ThemeToggle({
  theme,
  onToggle,
}: {
  theme: "light" | "dark";
  onToggle: () => void;
}) {
  const isDark = theme === "dark";

  // Theme toggle disabled — locked to dark mode
  return null;
  return (
    <button
      onClick={onToggle}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      className="fixed top-4 right-6 z-[60] w-9 h-9 flex items-center justify-center rounded-full bg-raised/80 backdrop-blur-sm border border-border/50 hover:border-accent-light/60 cursor-pointer group transition-colors duration-300 max-md:right-3"
    >
      <div
        className="relative w-5 h-5 transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
        style={{ transform: isDark ? "rotate(360deg)" : "rotate(0deg)" }}
      >
        {/* Sun rays — fade out in dark mode */}
        <div
          className="absolute inset-0 transition-all duration-500"
          style={{
            opacity: isDark ? 0 : 1,
            transform: isDark ? "scale(0.5) rotate(-90deg)" : "scale(1) rotate(0deg)",
          }}
        >
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
            <span
              key={deg}
              className="absolute left-1/2 top-0 w-px h-1 bg-accent origin-[50%_10px] transition-all duration-500 group-hover:h-1.5"
              style={{ transform: `translateX(-50%) rotate(${deg}deg)` }}
            />
          ))}
        </div>

        {/* Core circle — shrinks to crescent in dark mode via mask */}
        <span
          className="absolute inset-[3px] rounded-full bg-accent transition-all duration-500 group-hover:shadow-[0_0_8px_var(--color-accent-light)]"
          style={{
            maskImage: isDark
              ? "radial-gradient(circle 5px at 65% 30%, transparent 100%, black 100%)"
              : "none",
            WebkitMaskImage: isDark
              ? "radial-gradient(circle 5px at 65% 30%, transparent 100%, black 100%)"
              : "none",
          }}
        />
      </div>
    </button>
  );
}
