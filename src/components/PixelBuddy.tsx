import { useEffect, useRef, useCallback, useState, useMemo } from "react";
import { useBuddyObserver, type BuddyFrame } from "@/hooks/useBuddyObserver";

const LIGHT_PAL: Record<string, string | null> = {
  ".": null,
  k: "#1a1918",
  s: "#deb887",
  h: "#4a3a1a",
  e: "#1a1918",
  b: "#5b7abf",
  B: "#4a6aaf",
  p: "#6b6862",
  P: "#5c584f",
  w: "#faf8f4",
  r: "#e88",
  a: "#c9a85c",
  H: "#e8b4b4",
};

const DARK_PAL: Record<string, string | null> = {
  ".": null,
  k: "#e8e5df",
  s: "#deb887",
  h: "#6a5a2a",
  e: "#e8e5df",
  b: "#7b9ad0",
  B: "#6a8ac0",
  p: "#9b9790",
  P: "#8a867e",
  w: "#141311",
  r: "#f99",
  a: "#dfc07a",
  H: "#e8b4b4",
};

const FRAMES: Record<BuddyFrame, string[]> = {
  wave: [
    "....hhhh........",
    "...hhhhhh.......",
    "...hssesskk.....",
    "...sseessk.s....",
    "...ssssss..s....",
    "....ssss...s....",
    "..s.bbbb..s.....",
    "..s.bBbb.s......",
    "...sbbbb........",
    "....bBbb........",
    "....pppp........",
    "....pPpp........",
    "....pppp........",
    "....p..p........",
    "....p..p........",
    "...kk..kk.......",
  ],
  type: [
    "....hhhh........",
    "...hhhhhh.......",
    "...hssess.......",
    "...sseess.......",
    "...ssssss.......",
    "....ssss........",
    "...sbbbb........",
    "..s.bBbbs.......",
    "....bbbbs.......",
    "..aabBbbaa......",
    "..aaaaaaaaaa....",
    "....pppp........",
    "....pPpp........",
    "....p..p........",
    "....p..p........",
    "...kk..kk.......",
  ],
  read: [
    "....hhhh........",
    "...hhhhhh.......",
    "...hssess.......",
    "..wwseessww.....",
    "...ssssss.......",
    "....ssss........",
    "...sbbbb........",
    "...sbBbbs.......",
    "...abbbba.......",
    "...abBbba.......",
    "...aaaaaa.......",
    "....pppp........",
    "....pPpp........",
    "....p..p........",
    "....p..p........",
    "...kk..kk.......",
  ],
  build: [
    "....hhhh........",
    "...hhhhhh.......",
    "...hssess.......",
    "...sseess.......",
    "...ssssss.......",
    "....ssss........",
    "...sbbbb........",
    "..a.bBbbs.......",
    "..a.bbbb........",
    "..a.bBbb........",
    "....pppp........",
    "....pPpp........",
    "....pppp........",
    "....p..p........",
    "....p..p........",
    "...kk..kk.......",
  ],
  vibe: [
    "....hhhh........",
    "...hhhhhh.......",
    "...hssess.......",
    "...sswess.......",
    "...ssssss.......",
    "....ssss........",
    ".s..bbbb..s.....",
    "..s.bBbb.s......",
    "...sbbbb........",
    "....bBbb........",
    "....pppp........",
    "....pPpp........",
    "....p..p........",
    "...p....p.......",
    "...p....p.......",
    "..kk....kk......",
  ],
  dance: [
    "....hhhh........",
    "...hhhhhh.......",
    "...hssess.......",
    "...sswess.......",
    "...ssssss.......",
    "..s.ssss.s......",
    ".s..bbbb..s.....",
    "....bBbb........",
    "....bbbb........",
    "....bBbb........",
    "....pppp........",
    "....pPpp........",
    "...p....p.......",
    "..p......p......",
    "..p......p......",
    ".kk......kk.....",
  ],
  heart: [
    "....hhhh........",
    "...hhhhhh.......",
    "...hssess.......",
    "...sswess.......",
    "...ssssss.......",
    "....ssss........",
    "...sbbbb........",
    "...sbBbbs.......",
    "...sbbbb..HH.HH.",
    "....bBbb.HHHHHH.",
    "....pppp..HHHH..",
    "....pPpp...HH...",
    "....pppp........",
    "....p..p........",
    "....p..p........",
    "...kk..kk.......",
  ],
  walk: [
    "....hhhh........",
    "...hhhhhh.......",
    "...hssess.......",
    "...sseess.......",
    "...ssssss.......",
    "....ssss........",
    "...sbbbb........",
    "....bBbbs.......",
    "....bbbb........",
    "....bBbb........",
    "....pppp........",
    "....pPpp........",
    "...p..pp........",
    "..p....p........",
    "..p...p.........",
    ".kk..kk.........",
  ],
};

const S = 6;
const W = 16;

export function PixelBuddy({ theme }: { theme: "light" | "dark" }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<BuddyFrame>("wave");
  const [label, setLabel] = useState("");
  const pal = useMemo(
    () => (theme === "dark" ? DARK_PAL : LIGHT_PAL),
    [theme]
  );
  const palRef = useRef(pal);
  palRef.current = pal;

  const drawFrame = useCallback(
    (name: BuddyFrame) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.clearRect(0, 0, 96, 96);
      const frame = FRAMES[name];
      if (!frame) return;

      const p = palRef.current;
      for (let y = 0; y < W; y++) {
        const row = frame[y];
        for (let x = 0; x < row.length; x++) {
          const c = p[row[x]];
          if (c) {
            ctx.fillStyle = c;
            ctx.fillRect(x * S, y * S, S, S);
          }
        }
      }
    },
    []
  );

  // Redraw when theme changes
  useEffect(() => {
    drawFrame(frameRef.current);
  }, [theme, drawFrame]);

  const handleFrameChange = useCallback(
    (frame: BuddyFrame, newLabel: string) => {
      if (frame !== frameRef.current) {
        frameRef.current = frame;
        drawFrame(frame);
      }
      setLabel(newLabel);
    },
    [drawFrame]
  );

  useBuddyObserver(handleFrameChange);

  useEffect(() => {
    drawFrame("wave");
    let tick = 0;
    let blinkOn = false;
    let rafId: number;

    const loop = () => {
      tick++;
      if (tick % 40 === 0) {
        blinkOn = !blinkOn;
        drawFrame(frameRef.current);
        if (blinkOn) {
          const canvas = canvasRef.current;
          const ctx = canvas?.getContext("2d");
          if (ctx) {
            ctx.fillStyle = palRef.current["s"]!;
            ctx.fillRect(4 * S, 3 * S, S, S);
            ctx.fillRect(5 * S, 3 * S, S, S);
          }
        }
      }
      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafId);
  }, [drawFrame]);

  return (
    <>
      <canvas
        ref={canvasRef}
        width={96}
        height={96}
        className="fixed bottom-6 right-6 z-[100] [image-rendering:pixelated] transition-opacity max-md:right-3 max-md:bottom-5 max-md:scale-75 max-md:origin-bottom-right"
      />
      <div className="fixed bottom-3 right-6 z-[100] font-mono text-[10px] text-dim text-center w-24 transition-opacity max-md:right-3 max-md:bottom-1.5 max-md:text-[9px] max-md:w-[72px]">
        {label}
      </div>
    </>
  );
}
