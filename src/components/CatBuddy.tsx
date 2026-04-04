import { useEffect, useRef, useState, useCallback } from "react";

/* ── configuration ── */
const CONFIG = {
  /* global */
  scale: 1.5,
  spriteHeight: 48,
  canvasWidth: 192,
  canvasHeight: 112,

  /* movement */
  fleeDistance: 280,

  /* positioning */
  groundOffset: 8,
  spawnX: 0.6,
  targetXMargin: 48,
  targetYMargin: 64,
  jumpTrigger: 36,

  /* interaction */
  clickRadius: 72,
  debug: true,

  /* timing [base, randomRange] */
  idleDelay: [3, 4] as [number, number],
  startDelay: [2, 3] as [number, number],
  runArrivalDelay: [3, 5] as [number, number],
  jumpArrivalDelay: [2, 3] as [number, number],
  sleepDuration: [7, 8] as [number, number],
  /* idle → next state (relative weights, "move" = pick target then run/jump) */
  idleWeights: { sleep: 18, move: 82 } as Record<string, number>,

  /* bubbles */
  frightenBubble: { text: "!!", duration: 0.8 },
  wakeBubble: { text: "?", duration: 1 },

  /* thought bubbles (idle musings) */
  thoughtBubbles: ["meow?", "...", "~♪", "nya~", ">.<", "o.o", "prrr"],
  thoughtInterval: [6, 10] as [number, number],
  thoughtDuration: 2.5,

  /* scroll reactions */
  scrollFastThreshold: 1500,
  scrollCuriousBubble: { text: "?", duration: 1.2 },
  scrollCuriousCooldown: 3,
  noScrollSleepDelay: 30,

  /* jump arc */
  arcHeightMin: 24,
  arcHeightMax: 56,
  arcHeightYFactor: 0.5,
  arcHeightDistFactor: 0.08,

  /* background removal */
  bgRemovalThreshold: 35,

  /* target picking */
  groundSpots: 3,
  sectionMinWidth: 140,
  sectionMinHeight: 40,
  sectionXInset: 48,
  sectionTopOffset: 8,
  sectionRangeCap: 320,
  farThreshold: 100,
  maxTargetDistanceFraction: 0.5,
  horizontalBias: 0.4,
  verticalDeadzone: 30,

  /* animations — merged sheet + anim config, per-anim scale multiplier */
  anims: {
    idle: {
      src: "tail-wiggle-3x3.png",
      cols: 3,
      rows: 3,
      fps: 5,
      loop: true,
      scale: 1,
      speed: 0,
    },
    run: {
      src: "run-3x3.png",
      cols: 3,
      rows: 3,
      fps: 8,
      loop: true,
      scale: 1,
      speed: 100,
    },
    sleep: {
      src: "sleep-3x3.png",
      cols: 3,
      rows: 3,
      fps: 3,
      loop: true,
      scale: 1,
      speed: 0,
    },
    frighten: {
      src: "frighten-3x2.png",
      cols: 3,
      rows: 2,
      fps: 8,
      loop: false,
      scale: 1,
      speed: 0,
    },
    jump: {
      src: "jump-3x2.png",
      cols: 3,
      rows: 2,
      fps: 8,
      loop: true,
      scale: 1.5,
      speed: 80,
    },
    stretch: {
      src: "stretch-3x2.png",
      cols: 3,
      rows: 2,
      fps: 3,
      loop: false,
      scale: 1,
      speed: 0,
    },
  },
};

/* ── derived constants ── */
const SPRITE_H = CONFIG.spriteHeight * CONFIG.scale;
const CANVAS_W = CONFIG.canvasWidth * CONFIG.scale;
const CANVAS_H = CONFIG.canvasHeight * CONFIG.scale;

type CatState = keyof typeof CONFIG.anims;

function randomDelay([base, range]: [number, number]) {
  return base + Math.random() * range;
}

/* ── cat state ── */
interface Cat {
  state: CatState;
  x: number;
  y: number;
  startX: number;
  startY: number;
  targetX: number;
  targetY: number;
  facingLeft: boolean;
  frame: number;
  tick: number;
  timer: number;
  delay: number;
  bubble: string;
  bubbleTimer: number;
  thoughtTimer: number;
  thoughtDelay: number;
}

function getGroundY() {
  return window.innerHeight - CONFIG.groundOffset;
}

function clampX(x: number) {
  return Math.max(CANVAS_W / 2, Math.min(window.innerWidth - CANVAS_W / 2, x));
}

function clampY(y: number) {
  return Math.max(SPRITE_H, Math.min(getGroundY(), y));
}

function resetAnimation(cat: Cat, nextState: CatState) {
  cat.state = nextState;
  cat.frame = 0;
  cat.tick = 0;
  cat.timer = 0;
  cat.thoughtTimer = 0;
}

function setIdle(cat: Cat, delay = randomDelay(CONFIG.idleDelay)) {
  resetAnimation(cat, "idle");
  cat.delay = delay;
}

function makeCat(): Cat {
  const x = clampX(window.innerWidth * CONFIG.spawnX);
  const y = getGroundY();

  return {
    state: "idle",
    x,
    y,
    startX: x,
    startY: y,
    targetX: x,
    targetY: y,
    facingLeft: false,
    frame: 0,
    tick: 0,
    timer: 0,
    delay: randomDelay(CONFIG.startDelay),
    bubble: "",
    bubbleTimer: 0,
    thoughtTimer: 0,
    thoughtDelay: randomDelay(CONFIG.thoughtInterval),
  };
}

/* ── background removal on load ── */
function cleanSprite(img: HTMLImageElement): HTMLCanvasElement {
  const c = document.createElement("canvas");
  c.width = img.naturalWidth;
  c.height = img.naturalHeight;
  const ctx = c.getContext("2d")!;
  ctx.drawImage(img, 0, 0);

  const id = ctx.getImageData(0, 0, c.width, c.height);
  const d = id.data;
  const bgR = d[0],
    bgG = d[1],
    bgB = d[2];
  const thr = CONFIG.bgRemovalThreshold;

  for (let i = 0; i < d.length; i += 4) {
    if (
      Math.abs(d[i] - bgR) < thr &&
      Math.abs(d[i + 1] - bgG) < thr &&
      Math.abs(d[i + 2] - bgB) < thr
    ) {
      d[i + 3] = 0;
    }
  }
  ctx.putImageData(id, 0, 0);
  return c;
}

/* ── pick a place to walk to ── */
function pickTarget(cat: Cat): "run" | "jump" {
  const groundY = getGroundY();
  const pts: { x: number; y: number }[] = [];

  for (let i = 0; i < CONFIG.groundSpots; i++) {
    pts.push({
      x: clampX(
        CONFIG.targetXMargin +
          Math.random() *
            Math.max(window.innerWidth - CONFIG.targetXMargin * 2, 1),
      ),
      y: groundY,
    });
  }

  document.querySelectorAll("*").forEach((el) => {
    const r = el.getBoundingClientRect();
    if (
      r.width < CONFIG.sectionMinWidth ||
      r.height < CONFIG.sectionMinHeight ||
      r.bottom < CONFIG.targetYMargin ||
      r.top > window.innerHeight - CONFIG.targetYMargin
    )
      return;

    pts.push({
      x: clampX(
        r.left +
          CONFIG.sectionXInset +
          Math.random() * Math.max(r.width - CONFIG.sectionXInset * 2, 1),
      ),
      y: clampY(r.top + CONFIG.sectionTopOffset),
    });
  });

  const viewportRadius =
    Math.hypot(window.innerWidth, window.innerHeight) *
    CONFIG.maxTargetDistanceFraction;

  // filter: nearby, not too close, reject nearly-vertical targets
  const candidates = pts
    .filter((p) => Math.hypot(p.x - cat.x, p.y - cat.y) <= viewportRadius)
    .filter(
      (p) =>
        Math.abs(p.x - cat.x) + Math.abs(p.y - cat.y) > CONFIG.farThreshold,
    )
    .filter((p) => {
      const dx = Math.abs(p.x - cat.x);
      const dy = Math.abs(p.y - cat.y);
      if (dy > CONFIG.jumpTrigger && dx < CONFIG.verticalDeadzone) return false;
      return true;
    });

  let pool: typeof pts;
  if (Math.random() < CONFIG.horizontalBias) {
    const horiz = candidates.filter(
      (p) => Math.abs(p.y - cat.y) <= CONFIG.jumpTrigger,
    );
    pool = horiz.length ? horiz : candidates;
  } else {
    pool = candidates.length ? candidates : pts;
  }

  if (!pool.length) pool = pts;
  const t = pool[Math.floor(Math.random() * pool.length)];
  cat.targetX = t.x;
  cat.targetY = t.y;

  return Math.abs(t.y - cat.y) > CONFIG.jumpTrigger ? "jump" : "run";
}

/* ── pick target & start moving ── */
function startMoving(cat: Cat) {
  const mode = pickTarget(cat);
  if (mode === "jump") {
    cat.startX = cat.x;
    cat.startY = cat.y;
    resetAnimation(cat, "jump");
  } else {
    resetAnimation(cat, "run");
  }
}

function advanceFrame(cat: Cat) {
  while (true) {
    const anim = CONFIG.anims[cat.state];
    const totalFrames = anim.cols * anim.rows;
    const frameDuration = 1 / anim.fps;

    if (cat.tick < frameDuration) {
      return;
    }

    cat.tick -= frameDuration;
    cat.frame += 1;

    if (cat.frame < totalFrames) {
      return;
    }

    if (anim.loop) {
      cat.frame = 0;
      return;
    }

    cat.frame = totalFrames - 1;

    switch (cat.state) {
      case "frighten":
        startMoving(cat);
        return;
      case "stretch":
        setIdle(cat);
        return;
      case "jump":
        return;
    }
  }
}

function clampCat(cat: Cat) {
  cat.x = clampX(cat.x);
  cat.targetX = clampX(cat.targetX);
  cat.startX = clampX(cat.startX);
  cat.y = clampY(cat.y);
  cat.targetY = clampY(cat.targetY);
  cat.startY = clampY(cat.startY);
}

/* ── state machine update ── */
function update(cat: Cat, dt: number) {
  cat.timer += dt;
  if (cat.bubbleTimer > 0) cat.bubbleTimer -= dt;
  if (cat.bubbleTimer <= 0) cat.bubble = "";

  cat.tick += dt;
  advanceFrame(cat);

  if (cat.state === "run") {
    const dx = cat.targetX - cat.x;
    const dy = cat.targetY - cat.y;
    const dist = Math.hypot(dx, dy);

    if (dist <= 1) {
      cat.x = cat.targetX;
      cat.y = cat.targetY;
      setIdle(cat, randomDelay(CONFIG.runArrivalDelay));
    } else {
      cat.facingLeft = dx < 0;
      const travel = Math.min(dist, CONFIG.anims.run.speed * dt);
      cat.x += (dx / dist) * travel;
      cat.y += (dy / dist) * travel;
    }
  }

  if (cat.state === "jump") {
    const distance = Math.hypot(
      cat.targetX - cat.startX,
      cat.targetY - cat.startY,
    );
    const jumpAnim = CONFIG.anims.jump;
    const animTime = (jumpAnim.cols * jumpAnim.rows) / jumpAnim.fps;
    const duration = Math.max(animTime, distance / CONFIG.anims.jump.speed);
    const progress = Math.min(cat.timer / duration, 1);
    const arcHeight = Math.min(
      CONFIG.arcHeightMax,
      Math.max(
        CONFIG.arcHeightMin,
        Math.abs(cat.targetY - cat.startY) * CONFIG.arcHeightYFactor +
          distance * CONFIG.arcHeightDistFactor,
      ),
    );

    cat.facingLeft = cat.targetX < cat.startX;
    cat.x = cat.startX + (cat.targetX - cat.startX) * progress;
    cat.y =
      cat.startY +
      (cat.targetY - cat.startY) * progress -
      Math.sin(progress * Math.PI) * arcHeight;

    if (progress >= 1) {
      cat.x = cat.targetX;
      cat.y = cat.targetY;
      setIdle(cat, randomDelay(CONFIG.jumpArrivalDelay));
    }
  }

  if (cat.state === "idle" && cat.timer > cat.delay) {
    const weights = Object.entries(CONFIG.idleWeights);
    const total = weights.reduce((s, [, w]) => s + w, 0);
    let roll = Math.random() * total;
    let next = "move";
    for (const [state, w] of weights) {
      roll -= w;
      if (roll <= 0) {
        next = state;
        break;
      }
    }

    if (next === "move") {
      startMoving(cat);
    } else {
      resetAnimation(cat, next as CatState);
      if (next === "sleep") {
        cat.delay = randomDelay(CONFIG.sleepDuration);
      }
    }
  }

  if (cat.state === "sleep" && cat.timer > cat.delay) {
    resetAnimation(cat, "stretch");
  }

  /* idle thought bubbles */
  if (cat.state === "idle" && !cat.bubble && cat.timer > 1) {
    cat.thoughtTimer += dt;
    if (cat.thoughtTimer >= cat.thoughtDelay) {
      const thoughts = CONFIG.thoughtBubbles;
      cat.bubble = thoughts[Math.floor(Math.random() * thoughts.length)];
      cat.bubbleTimer = CONFIG.thoughtDuration;
      cat.thoughtTimer = 0;
      cat.thoughtDelay = randomDelay(CONFIG.thoughtInterval);
    }
  }

  clampCat(cat);
}

/* ── render to canvas ── */
function render(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  cat: Cat,
  sprites: Map<CatState, HTMLCanvasElement>,
) {
  const anim = CONFIG.anims[cat.state];
  const src = sprites.get(cat.state);
  if (!src) return;

  const fw = src.width / anim.cols;
  const fh = src.height / anim.rows;
  const col = cat.frame % anim.cols;
  const row = Math.floor(cat.frame / anim.cols);
  const destHeight = CONFIG.spriteHeight * CONFIG.scale * anim.scale;
  const destWidth = Math.round(destHeight * (fw / fh));
  const drawX = Math.round((CANVAS_W - destWidth) / 2);
  const drawY = CANVAS_H - destHeight;

  ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);
  ctx.save();
  ctx.imageSmoothingEnabled = false;
  if (cat.facingLeft) {
    ctx.translate(CANVAS_W, 0);
    ctx.scale(-1, 1);
  }
  ctx.drawImage(
    src,
    col * fw,
    row * fh,
    fw,
    fh,
    drawX,
    drawY,
    destWidth,
    destHeight,
  );
  ctx.restore();

  canvas.style.left = `${Math.round(cat.x - CANVAS_W / 2)}px`;
  canvas.style.top = `${Math.round(cat.y - CANVAS_H)}px`;
}

/* ── debug panel ── */
const PANEL_W = 176;
const PANEL_H_CLOSED = 36;

function clampPos(x: number, y: number, w: number, h: number) {
  return {
    x: Math.max(0, Math.min(window.innerWidth - w, x)),
    y: Math.max(0, Math.min(window.innerHeight - h, y)),
  };
}

function DebugPanel({
  catRef,
  openRef,
}: {
  catRef: React.RefObject<Cat | null>;
  openRef: React.RefObject<boolean>;
}) {
  const [open, setOpen] = useState(false);
  const [liveState, setLiveState] = useState<CatState>("idle");
  const [livePos, setLivePos] = useState({ x: 0, y: 0 });
  const [teleportMode, setTeleportMode] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{
    ox: number;
    oy: number;
    sx: number;
    sy: number;
    moved: boolean;
  } | null>(null);
  const [pos, setPos] = useState(() =>
    clampPos(
      window.innerWidth - 88,
      window.innerHeight - 40,
      80,
      PANEL_H_CLOSED,
    ),
  );

  // poll cat state at ~10fps for live readout
  useEffect(() => {
    let raf: number;
    let last = 0;
    const poll = (t: number) => {
      if (t - last > 100) {
        last = t;
        const cat = catRef.current;
        if (cat) {
          setLiveState(cat.state);
          setLivePos({ x: Math.round(cat.x), y: Math.round(cat.y) });
        }
      }
      raf = requestAnimationFrame(poll);
    };
    raf = requestAnimationFrame(poll);
    return () => cancelAnimationFrame(raf);
  }, [catRef]);

  // teleport click handler
  useEffect(() => {
    if (!teleportMode) return;
    const handler = (e: MouseEvent) => {
      const cat = catRef.current;
      if (!cat) return;
      // ignore clicks on the debug panel itself
      if (containerRef.current?.contains(e.target as Node)) return;
      e.preventDefault();
      e.stopPropagation();
      cat.x = clampX(e.clientX);
      cat.y = clampY(e.clientY);
      cat.startX = cat.x;
      cat.startY = cat.y;
      cat.targetX = cat.x;
      cat.targetY = cat.y;
      setIdle(cat, 0.5);
      setTeleportMode(false);
    };
    window.addEventListener("click", handler, { capture: true });
    return () =>
      window.removeEventListener("click", handler, { capture: true });
  }, [teleportMode, catRef]);

  // cursor style for teleport mode
  useEffect(() => {
    if (teleportMode) {
      document.body.style.cursor = "crosshair";
      return () => {
        document.body.style.cursor = "";
      };
    }
  }, [teleportMode]);

  const toggle = useCallback(
    (v: boolean) => {
      setOpen(v);
      openRef.current = v;
    },
    [openRef],
  );

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      const tag = (e.target as HTMLElement).closest("button[data-action]");
      if (tag) return;
      dragRef.current = {
        ox: e.clientX,
        oy: e.clientY,
        sx: pos.x,
        sy: pos.y,
        moved: false,
      };
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    },
    [pos],
  );

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    const d = dragRef.current;
    if (!d) return;
    const dx = e.clientX - d.ox;
    const dy = e.clientY - d.oy;
    if (Math.abs(dx) > 3 || Math.abs(dy) > 3) d.moved = true;
    const el = containerRef.current;
    const w = el?.offsetWidth ?? PANEL_W;
    const h = el?.offsetHeight ?? PANEL_H_CLOSED;
    setPos(clampPos(d.sx + dx, d.sy + dy, w, h));
  }, []);

  const onPointerUp = useCallback(
    (e: React.PointerEvent) => {
      const d = dragRef.current;
      dragRef.current = null;
      // don't toggle when clicking action buttons
      if ((e.target as HTMLElement).closest("button[data-action]")) return;
      if (!d?.moved) toggle(!open);
    },
    [open, toggle],
  );

  useEffect(() => {
    const handler = () => {
      const el = containerRef.current;
      const w = el?.offsetWidth ?? PANEL_W;
      const h = el?.offsetHeight ?? PANEL_H_CLOSED;
      setPos((p) => clampPos(p.x, p.y, w, h));
    };
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  // determine which direction the panel should expand to stay in viewport
  const expandRight = pos.x + PANEL_W <= window.innerWidth;
  const expandDown = pos.y + 220 <= window.innerHeight;
  const originX = expandRight ? "left" : "right";
  const originY = expandDown ? "top" : "bottom";

  return (
    <div
      ref={containerRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      className="fixed z-[9999] select-none touch-none"
      style={{ left: pos.x, top: pos.y }}
    >
      {/* collapsed pill */}
      <div
        className="flex items-center gap-1.5 rounded-full border border-subtle bg-background/90 px-2.5 py-1.5 backdrop-blur-sm transition-all duration-300 cursor-grab active:cursor-grabbing"
        style={{ opacity: open ? 0 : 1, pointerEvents: open ? "none" : "auto" }}
      >
        <span className="inline-flex items-center justify-center w-3 h-3 text-[10px]">
          🐾
        </span>
        <span className="font-mono text-[9px] leading-none tracking-wide text-dim uppercase">
          {liveState}
        </span>
      </div>

      {/* expanded panel */}
      <div
        className="absolute flex flex-col gap-2 rounded-2xl border border-subtle bg-background/95 p-3 backdrop-blur-sm shadow-sm transition-all duration-300 cursor-grab active:cursor-grabbing overflow-hidden"
        style={{
          width: PANEL_W,
          [expandRight ? "left" : "right"]: 0,
          [expandDown ? "top" : "bottom"]: 0,
          opacity: open ? 1 : 0,
          transform: open ? "scale(1)" : "scale(0.8)",
          transformOrigin: `${originX} ${originY}`,
          pointerEvents: open ? "auto" : "none",
        }}
      >
        {/* header with live state */}
        <div className="flex items-center justify-between px-0.5">
          <span className="inline-flex items-center gap-1.5 font-mono text-[10px] text-text tracking-wide leading-none">
            <span className="inline-flex items-center justify-center w-3 h-3 text-[10px]">
              🐾
            </span>
            <span className="text-accent">{liveState}</span>
            <span className="text-dim">
              {livePos.x}, {livePos.y}
            </span>
          </span>
          <button
            data-action
            onClick={() => toggle(false)}
            className="text-[10px] text-dim hover:text-text transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* state buttons with active highlight */}
        <div className="flex flex-wrap gap-1">
          {(Object.keys(CONFIG.anims) as CatState[]).map((state) => (
            <button
              data-action
              key={state}
              onClick={() => {
                const cat = catRef.current;
                if (!cat) return;
                resetAnimation(cat, state);
                if (state === "sleep")
                  cat.delay = randomDelay(CONFIG.sleepDuration);
              }}
              className={`rounded-full border px-2 py-0.5 font-mono text-[9px] transition-all duration-150 cursor-pointer ${
                liveState === state
                  ? "border-accent/60 bg-accent/10 text-accent"
                  : "border-subtle text-muted hover:border-accent/40 hover:text-accent"
              }`}
            >
              {state}
            </button>
          ))}
        </div>

        <div className="h-px bg-subtle" />

        {/* actions */}
        <div className="flex gap-1 min-w-0">
          <button
            data-action
            onClick={() => {
              if (catRef.current) startMoving(catRef.current);
            }}
            className="flex-1 min-w-0 truncate rounded-lg border border-accent/20 bg-accent/5 px-2 py-1 font-mono text-[9px] text-accent transition-all duration-150 hover:bg-accent/15 cursor-pointer"
          >
            move
          </button>
          <button
            data-action
            onClick={() => {
              const cat = catRef.current;
              if (!cat) return;
              resetAnimation(cat, "frighten");
              cat.bubble = CONFIG.frightenBubble.text;
              cat.bubbleTimer = CONFIG.frightenBubble.duration;
            }}
            className="flex-1 min-w-0 truncate rounded-lg border border-accent/20 bg-accent/5 px-2 py-1 font-mono text-[9px] text-accent transition-all duration-150 hover:bg-accent/15 cursor-pointer"
          >
            scare
          </button>
          <button
            data-action
            onClick={() => setTeleportMode(!teleportMode)}
            className={`flex-1 min-w-0 truncate rounded-lg border px-2 py-1 font-mono text-[9px] transition-all duration-150 cursor-pointer ${
              teleportMode
                ? "border-accent bg-accent/20 text-accent"
                : "border-accent/20 bg-accent/5 text-accent hover:bg-accent/15"
            }`}
          >
            {teleportMode ? "click.." : "warp"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── component ── */
export function CatBuddy({ theme }: { theme: "light" | "dark" }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bubbleRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);
  const debugOpenRef = useRef(false);
  const catRef = useRef<Cat>(makeCat());
  const spritesRef = useRef<Map<CatState, HTMLCanvasElement>>(new Map());
  const readyRef = useRef(false);
  const scrollYRef = useRef(0);
  const noScrollTimerRef = useRef(0);
  const scrollCooldownRef = useRef(0);

  /* load / reload sprites when theme changes */
  useEffect(() => {
    readyRef.current = false;
    let loaded = 0;
    const entries = Object.entries(CONFIG.anims) as [
      CatState,
      (typeof CONFIG.anims)[CatState],
    ][];

    entries.forEach(([name, cfg]) => {
      const img = new Image();
      img.src = `/cats/${theme}/${cfg.src}`;
      img.onload = () => {
        spritesRef.current.set(name, cleanSprite(img));
        loaded++;
        if (loaded === entries.length) readyRef.current = true;
      };
    });
  }, [theme]);

  /* animation loop */
  useEffect(() => {
    scrollYRef.current = window.scrollY;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    ctx.imageSmoothingEnabled = false;
    let last = 0;
    let raf: number;

    const loop = (t: number) => {
      const dt = last ? Math.min((t - last) / 1000, 0.1) : 0.016;
      last = t;

      if (readyRef.current) {
        const cat = catRef.current;
        update(cat, dt);

        /* no-scroll sleepiness */
        noScrollTimerRef.current += dt;
        if (
          noScrollTimerRef.current > CONFIG.noScrollSleepDelay &&
          cat.state === "idle" &&
          cat.timer > 2
        ) {
          resetAnimation(cat, "sleep");
          cat.delay = randomDelay(CONFIG.sleepDuration);
          cat.bubble = "zzz";
          cat.bubbleTimer = 2;
          noScrollTimerRef.current = 0;
        }

        render(canvas, ctx, cat, spritesRef.current);

        if (bubbleRef.current) {
          if (cat.bubble) {
            bubbleRef.current.textContent = cat.bubble;
            bubbleRef.current.style.opacity = "1";
            bubbleRef.current.style.left = `${Math.round(cat.x)}px`;
            bubbleRef.current.style.top = `${Math.round(cat.y - SPRITE_H - 12)}px`;
          } else {
            bubbleRef.current.style.opacity = "0";
          }
        }

        if (CONFIG.debug && targetRef.current) {
          const showTarget =
            debugOpenRef.current &&
            (cat.state === "run" || cat.state === "jump");
          targetRef.current.style.opacity = showTarget ? "1" : "0";
          targetRef.current.style.left = `${Math.round(cat.targetX)}px`;
          targetRef.current.style.top = `${Math.round(cat.targetY)}px`;
        }
      }
      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const cat = catRef.current;
      const dx = e.clientX - cat.x;
      const dy = e.clientY - (cat.y - SPRITE_H / 2);
      if (Math.hypot(dx, dy) < CONFIG.clickRadius) {
        resetAnimation(cat, "frighten");
        cat.bubble = CONFIG.frightenBubble.text;
        cat.bubbleTimer = CONFIG.frightenBubble.duration;
        cat.facingLeft = dx > 0;
      }
    };
    window.addEventListener("click", handler);
    return () => window.removeEventListener("click", handler);
  }, []);

  useEffect(() => {
    let lastScrollTime = 0;
    const handler = () => {
      const cat = catRef.current;
      const now = performance.now() / 1000;
      const nextScrollY = window.scrollY;
      const delta = nextScrollY - scrollYRef.current;
      const timeDelta = now - lastScrollTime;

      lastScrollTime = now;
      scrollYRef.current = nextScrollY;
      noScrollTimerRef.current = 0;

      /* scroll-speed reactions */
      if (timeDelta > 0 && timeDelta < 0.5) {
        const speed = Math.abs(delta) / timeDelta;

        if (speed > CONFIG.scrollFastThreshold && cat.state !== "frighten") {
          resetAnimation(cat, "frighten");
          cat.bubble = CONFIG.frightenBubble.text;
          cat.bubbleTimer = CONFIG.frightenBubble.duration;
        } else if (
          speed > 50 &&
          now - scrollCooldownRef.current > CONFIG.scrollCuriousCooldown
        ) {
          if (cat.state === "sleep") {
            resetAnimation(cat, "stretch");
            cat.bubble = CONFIG.wakeBubble.text;
            cat.bubbleTimer = CONFIG.wakeBubble.duration;
          } else if (cat.state === "idle" && !cat.bubble) {
            cat.bubble = CONFIG.scrollCuriousBubble.text;
            cat.bubbleTimer = CONFIG.scrollCuriousBubble.duration;
          }
          scrollCooldownRef.current = now;
        }
      } else if (cat.state === "sleep") {
        resetAnimation(cat, "stretch");
        cat.bubble = CONFIG.wakeBubble.text;
        cat.bubbleTimer = CONFIG.wakeBubble.duration;
      }

      /* adjust perched cat position */
      const groundY = getGroundY();
      const perched =
        cat.y < groundY - CONFIG.jumpTrigger ||
        cat.targetY < groundY - CONFIG.jumpTrigger;
      if (!perched || delta === 0) {
        return;
      }

      cat.y = clampY(cat.y - delta);
      cat.targetY = clampY(cat.targetY - delta);
      cat.startY = clampY(cat.startY - delta);
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    const handler = () => {
      const cat = catRef.current;
      const previousGroundY =
        cat.targetY >= getGroundY() - 1 ? cat.targetY : getGroundY();

      clampCat(cat);

      if (Math.abs(cat.y - previousGroundY) < CONFIG.jumpTrigger) {
        cat.y = getGroundY();
      }
      if (Math.abs(cat.targetY - previousGroundY) < CONFIG.jumpTrigger) {
        cat.targetY = getGroundY();
      }
    };

    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        width={CANVAS_W}
        height={CANVAS_H}
        className="fixed z-[9999] pointer-events-none"
        style={{ imageRendering: "pixelated" }}
      />
      <div
        ref={bubbleRef}
        className="fixed z-[9999] pointer-events-none -translate-x-1/2 font-mono text-xs text-accent select-none transition-opacity duration-300"
        style={{ opacity: 0 }}
      />
      {CONFIG.debug && (
        <>
          <div
            ref={targetRef}
            className="fixed z-[9998] pointer-events-none -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/40 transition-opacity duration-300"
            style={{
              opacity: 0,
              width: 6,
              height: 6,
              background: "var(--color-accent)",
              boxShadow: "0 0 6px var(--color-accent)",
            }}
          />
          <DebugPanel catRef={catRef} openRef={debugOpenRef} />
        </>
      )}
    </>
  );
}
