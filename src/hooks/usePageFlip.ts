"use client";

import { useState, useRef, useCallback, useEffect } from "react";

export type FlipDirection = "forward" | "backward" | null;

export interface FlipState {
  direction: FlipDirection;
  originY: number;   // normalized 0..1 where drag started
  progress: number;  // 0..1
}

export interface UsePageFlipReturn {
  currentPage: number;
  canGoNext: boolean;
  canGoPrev: boolean;
  // Refs for direct DOM manipulation (zero re-render during drag)
  spreadRef: React.RefObject<HTMLDivElement | null>;
  flipCardRef: React.RefObject<HTMLDivElement | null>;
  // Flip state (only updates at flip start/end, NOT per-frame)
  flipState: FlipState | null;
  isFlipping: boolean;
  // Gesture handlers
  onPointerDown: (e: React.PointerEvent) => void;
  onPointerMove: (e: React.PointerEvent) => void;
  onPointerUp: (e: React.PointerEvent) => void;
  onMouseMove: (e: React.MouseEvent) => void;
  onMouseLeave: () => void;
  hoverEdge: "left" | "right" | null;
  // Programmatic navigation
  goNext: () => void;
  goPrev: () => void;
}

const SNAP_THRESHOLD = 0.38;
const FLIP_MS = 480;
const ease = (t: number) => 1 - Math.pow(2, -10 * t); // expo out

export function usePageFlip(totalPages: number): UsePageFlipReturn {
  // currentPage = the index of the RIGHT-side page (starts at 1)
  const [currentPage, setCurrentPage] = useState(1);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipState, setFlipState] = useState<FlipState | null>(null);
  const [hoverEdge, setHoverEdge] = useState<"left" | "right" | null>(null);

  const spreadRef = useRef<HTMLDivElement>(null);
  const flipCardRef = useRef<HTMLDivElement>(null);

  // Drag tracking refs (no state — no re-renders during drag)
  const dragRef = useRef({
    active: false,
    startX: 0,
    startY: 0,
    direction: null as FlipDirection,
    progress: 0,
    animating: false,
  });

  const scrollLocked = useRef(false);
  const currentPageRef = useRef(currentPage);
  useEffect(() => { currentPageRef.current = currentPage; }, [currentPage]);

  const canGoNext = currentPage + 2 <= totalPages;   // needs at least 2 more pages
  const canGoPrev = currentPage > 1;                  // first real spread is page 1

  // ─── Apply transform directly to DOM (zero React overhead) ───────────────
  const applyFlipTransform = useCallback((progress: number, dir: FlipDirection, originY: number) => {
    const el = flipCardRef.current;
    if (!el) return;
    const angle = dir === "forward" ? -(progress * 180) : (progress * 180);
    el.style.transform = `rotateY(${angle}deg)`;
    el.style.transformOrigin = `${dir === "forward" ? "0%" : "100%"} ${originY * 100}%`;
  }, []);

  // ─── Animate to completion or snap back ──────────────────────────────────
  const animate = useCallback((
    fromProgress: number,
    toProgress: number,
    dir: FlipDirection,
    originY: number,
    onComplete: () => void,
  ) => {
    dragRef.current.animating = true;
    const start = performance.now();
    const delta = toProgress - fromProgress;
    const duration = FLIP_MS * Math.abs(delta);

    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = fromProgress + delta * ease(t);
      applyFlipTransform(eased, dir, originY);
      dragRef.current.progress = eased;

      if (t < 1) {
        requestAnimationFrame(tick);
      } else {
        dragRef.current.animating = false;
        onComplete();
      }
    };
    requestAnimationFrame(tick);
  }, [applyFlipTransform]);

  // ─── Commit a completed flip ──────────────────────────────────────────────
  const commitFlip = useCallback((dir: FlipDirection) => {
    if (dir === "forward") {
      setCurrentPage(p => Math.min(p + 2, totalPages - 1));
    } else {
      setCurrentPage(p => Math.max(p - 2, 1));
    }
    // Reset DOM and state
    if (flipCardRef.current) {
      flipCardRef.current.style.transform = "rotateY(0deg)";
    }
    dragRef.current.progress = 0;
    dragRef.current.direction = null;
    setIsFlipping(false);
    setFlipState(null);
  }, [totalPages]);

  // ─── Trigger a programmatic flip ─────────────────────────────────────────
  const triggerFlip = useCallback((dir: FlipDirection, originY = 0.8) => {
    if (dragRef.current.animating || isFlipping) return;
    if (dir === "forward" && !canGoNext) return;
    if (dir === "backward" && !canGoPrev) return;

    setFlipState({ direction: dir, originY, progress: 0 });
    setIsFlipping(true);

    // Wait one frame for React to render the flipCard
    requestAnimationFrame(() => {
      animate(0, 1, dir, originY, () => commitFlip(dir));
    });
  }, [isFlipping, canGoNext, canGoPrev, animate, commitFlip]);

  const goNext = useCallback(() => triggerFlip("forward"), [triggerFlip]);
  const goPrev = useCallback(() => triggerFlip("backward"), [triggerFlip]);

  // ─── Pointer down ─────────────────────────────────────────────────────────
  const onPointerDown = useCallback((e: React.PointerEvent) => {
    if (dragRef.current.animating || isFlipping) return;
    const rect = spreadRef.current?.getBoundingClientRect();
    if (!rect) return;

    dragRef.current.active = true;
    dragRef.current.startX = e.clientX;
    dragRef.current.startY = e.clientY;
    dragRef.current.direction = null;
    dragRef.current.progress = 0;

    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, [isFlipping]);

  // ─── Pointer move — direct DOM update, no setState ───────────────────────
  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragRef.current.active || dragRef.current.animating) return;
    const rect = spreadRef.current?.getBoundingClientRect();
    if (!rect) return;

    const dx = e.clientX - dragRef.current.startX;
    const absDx = Math.abs(dx);

    // Determine direction
    if (!dragRef.current.direction && absDx > 6) {
      const dir: FlipDirection = dx < 0 ? "forward" : "backward";
      if (dir === "forward" && !canGoNext) { dragRef.current.active = false; return; }
      if (dir === "backward" && !canGoPrev) { dragRef.current.active = false; return; }

      const relY = (e.clientY - rect.top) / rect.height;
      dragRef.current.direction = dir;
      dragRef.current.startY = e.clientY;

      // Mount flip card via state (only one setState during whole drag)
      setFlipState({ direction: dir, originY: relY, progress: 0 });
      setIsFlipping(true);
    }

    if (!dragRef.current.direction) return;

    // Progress = how far dragged relative to half-width of spread
    const halfWidth = rect.width / 2;
    const progress = Math.min(absDx / halfWidth, 1);
    dragRef.current.progress = progress;

    // Direct DOM manipulation — NO React state update
    applyFlipTransform(
      progress,
      dragRef.current.direction,
      (dragRef.current.startY - rect.top) / rect.height
    );
  }, [canGoNext, canGoPrev, applyFlipTransform]);

  // ─── Pointer up — snap complete or snap back ──────────────────────────────
  const onPointerUp = useCallback((e: React.PointerEvent) => {
    if (!dragRef.current.active) return;
    dragRef.current.active = false;

    const dir = dragRef.current.direction;
    const prog = dragRef.current.progress;
    const originY = (dragRef.current.startY - (spreadRef.current?.getBoundingClientRect().top ?? 0)) /
                    (spreadRef.current?.getBoundingClientRect().height ?? 1);

    if (!dir || !isFlipping) return;

    if (prog >= SNAP_THRESHOLD) {
      // Complete the flip
      animate(prog, 1, dir, originY, () => commitFlip(dir));
    } else {
      // Snap back
      animate(prog, 0, dir, originY, () => {
        if (flipCardRef.current) flipCardRef.current.style.transform = "rotateY(0deg)";
        dragRef.current.direction = null;
        dragRef.current.progress = 0;
        setIsFlipping(false);
        setFlipState(null);
      });
    }
  }, [isFlipping, animate, commitFlip]);

  // ─── Hover edge detection ─────────────────────────────────────────────────
  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (dragRef.current.active || dragRef.current.animating) return;
    const rect = spreadRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const zone = rect.width * 0.08;
    if (x < zone && canGoPrev) setHoverEdge("left");
    else if (x > rect.width - zone && canGoNext) setHoverEdge("right");
    else setHoverEdge(null);
  }, [canGoNext, canGoPrev]);

  const onMouseLeave = useCallback(() => setHoverEdge(null), []);

  // ─── Scroll wheel flip ────────────────────────────────────────────────────
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (scrollLocked.current || dragRef.current.animating) return;

      const dir: FlipDirection = e.deltaY > 0 ? "forward" : "backward";
      const page = currentPageRef.current;
      if (dir === "forward" && page + 2 > totalPages) return;
      if (dir === "backward" && page <= 1) return;

      scrollLocked.current = true;
      const originY = 0.82;

      setFlipState({ direction: dir, originY, progress: 0 });
      setIsFlipping(true);

      requestAnimationFrame(() => {
        animate(0, 1, dir, originY, () => {
          if (dir === "forward") {
            setCurrentPage(p => Math.min(p + 2, totalPages - 1));
          } else {
            setCurrentPage(p => Math.max(p - 2, 1));
          }
          if (flipCardRef.current) flipCardRef.current.style.transform = "rotateY(0deg)";
          dragRef.current.progress = 0;
          setIsFlipping(false);
          setFlipState(null);
          setTimeout(() => { scrollLocked.current = false; }, 300);
        });
      });
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [totalPages, animate]);

  return {
    currentPage,
    canGoNext: canGoNext,
    canGoPrev: canGoPrev,
    spreadRef,
    flipCardRef,
    flipState,
    isFlipping,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    onMouseMove,
    onMouseLeave,
    hoverEdge,
    goNext,
    goPrev,
  };
}
