import { useRef, useState } from "react";
import { SectionHeader } from "./SectionHeader";
import { Bridge } from "./Bridge";
import { FadeIn } from "./FadeIn";
import { hardware } from "@/lib/data";
import type { Build } from "@/lib/types";
import { Play, Pause, Maximize2, Minimize2 } from "lucide-react";

function VideoPlayer({ build }: { build: Build }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  const toggleExpand = (e: React.MouseEvent) => {
    e.stopPropagation();
    setExpanded(!expanded);
  };

  return (
    <div
      ref={containerRef}
      className={`relative bg-black rounded-lg overflow-hidden cursor-pointer group ${
        expanded ? "aspect-auto" : "aspect-video"
      }`}
      onClick={toggle}
    >
      <video
        ref={videoRef}
        src={build.video!}
        poster={build.thumbnail ?? undefined}
        loop
        muted
        playsInline
        preload="metadata"
        className="w-full h-full object-cover"
        onEnded={() => setPlaying(false)}
      />

      {/* Play overlay — shows when paused */}
      {!playing && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
          <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
            <Play size={18} className="text-white ml-0.5" />
          </div>
        </div>
      )}

      {/* Controls bar */}
      <div className="absolute bottom-0 left-0 right-0 px-3 py-2 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-between">
        <button
          onClick={toggle}
          className="text-white/80 hover:text-white transition-colors"
        >
          {playing ? <Pause size={14} /> : <Play size={14} />}
        </button>
        <button
          onClick={toggleExpand}
          className="text-white/80 hover:text-white transition-colors"
        >
          {expanded ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
        </button>
      </div>
    </div>
  );
}

export function BuildCard({ build }: { build: Build }) {
  return (
    <FadeIn className="rounded-lg overflow-hidden border border-border hover:border-accent-light transition-colors">
      {build.video ? (
        <VideoPlayer build={build} />
      ) : build.image ? (
        <div className="w-full aspect-video bg-raised flex items-center justify-center border-b border-border">
          <img src={build.image} alt={build.name} className="w-full h-full object-cover" />
        </div>
      ) : null}
      <div className="p-3 px-3.5">
        <div className="text-sm font-medium mb-[3px]">{build.name}</div>
        <div className="text-[13px] text-muted leading-normal">
          {build.description}
        </div>
      </div>
    </FadeIn>
  );
}

export function Hardware() {
  if (hardware.builds.length === 0) return null;

  return (
    <>
      <Bridge html={hardware.bridge} />
      <section
        id="hardware"
        className="py-6 pb-18"
        data-buddy="build"
        data-buddy-label="*bzzzz*"
      >
        <SectionHeader num="04" title="Hardware & builds" />
        <div className="grid grid-cols-2 gap-3.5 max-sm:grid-cols-1">
          {hardware.builds.map((build) => (
            <BuildCard key={build.name} build={build} />
          ))}
        </div>
      </section>
    </>
  );
}
