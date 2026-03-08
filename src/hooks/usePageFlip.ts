"use client";

import { useState, useRef, useCallback, useEffect } from "react";

export type FlipDirection = "left" | "right" | null;

export interface FlipState {
  isFlipping: boolean;
  progress: number; // 0 → 1
  originX: number; // where the drag started (normalized 0-1)
  originY: number;
  direction: FlipDirection;
}

export interface UsePageFlipReturn {
  flipState: FlipState;
  pageRef: React.RefObject<HTMLDivElement | null>;
  onPointerDown: (e: React.PointerEvent) => void;
  onPointerMove: (e: React.PointerEvent) => void;
  onPointerUp: (e: React.PointerEvent) => void;
  cornerPeekSide: "left" | "right" | null;
  onMouseMove: (e: React.MouseEvent) => void;
  onMouseLeave: () => void;
}

interface UsePageFlipOptions {
  onFlipNext: () => void;
  onFlipPrev: () => void;
  canGoNext: boolean;
  canGoPrev: boolean;
}

const SNAP_THRESHOLD = 0.38; // 38% drag → snap complete

export function usePageFlip({
  onFlipNext,
  onFlipPrev,
  canGoNext,
  canGoPrev,
}: UsePageFlipOptions): UsePageFlipReturn {
  const pageRef = useRef<HTMLDivElement>(null);
  const dragStartX = useRef(0);
  const dragStartY = useRef(0);
  const isDragging = useRef(false);
  const [cornerPeekSide, setCornerPeekSide] = useState<"left" | "right" | null>(null);

  const [flipState, setFlipState] = useState<FlipState>({
    isFlipping: false,
    progress: 0,
    originX: 1,
    originY: 1,
    direction: null,
  });

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    if (!pageRef.current) return;
    const rect = pageRef.current.getBoundingClientRect();
    dragStartX.current = e.clientX;
    dragStartY.current = e.clientY;
    isDragging.current = true;

    // normalized origin (0-1) relative to full spread
    const originX = (e.clientX - rect.left) / rect.width;
    const originY = (e.clientY - rect.top) / rect.height;

    setFlipState((prev) => ({
      ...prev,
      originX,
      originY,
    }));

    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, []);

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging.current || !pageRef.current) return;

      const rect = pageRef.current.getBoundingClientRect();
      const deltaX = e.clientX - dragStartX.current;
      const progress = Math.abs(deltaX) / (rect.width / 2);
      const direction: FlipDirection = deltaX < 0 ? "right" : "left";

      // Block invalid directions
      if (direction === "right" && !canGoNext) return;
      if (direction === "left" && !canGoPrev) return;

      setFlipState((prev) => ({
        ...prev,
        isFlipping: true,
        progress: Math.min(progress, 1),
        direction,
      }));
    },
    [canGoNext, canGoPrev]
  );

  const onPointerUp = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging.current) return;
      isDragging.current = false;

      setFlipState((prev) => {
        if (prev.progress >= SNAP_THRESHOLD) {
          // Snap complete → trigger page change
          setTimeout(() => {
            if (prev.direction === "right") onFlipNext();
            else if (prev.direction === "left") onFlipPrev();
          }, 350);

          return { ...prev, progress: 1 };
        }
        // Snap back
        return { ...prev, progress: 0, isFlipping: false, direction: null };
      });

      // Reset after animation
      setTimeout(() => {
        setFlipState({
          isFlipping: false,
          progress: 0,
          originX: 1,
          originY: 1,
          direction: null,
        });
      }, 700);
    },
    [onFlipNext, onFlipPrev]
  );

  // Corner peek on hover (non-drag)
  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (isDragging.current || !pageRef.current) return;
      const rect = pageRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const edgeZone = rect.width * 0.12;

      if (x < edgeZone && canGoPrev) setCornerPeekSide("left");
      else if (x > rect.width - edgeZone && canGoNext) setCornerPeekSide("right");
      else setCornerPeekSide(null);
    },
    [canGoNext, canGoPrev]
  );

  const onMouseLeave = useCallback(() => {
    setCornerPeekSide(null);
  }, []);

  // Keep refs fresh to avoid stale closure in wheel listener
  const canGoNextRef = useRef(canGoNext);
  const canGoPrevRef = useRef(canGoPrev);
  const onFlipNextRef = useRef(onFlipNext);
  const onFlipPrevRef = useRef(onFlipPrev);
  useEffect(() => { canGoNextRef.current = canGoNext; }, [canGoNext]);
  useEffect(() => { canGoPrevRef.current = canGoPrev; }, [canGoPrev]);
  useEffect(() => { onFlipNextRef.current = onFlipNext; }, [onFlipNext]);
  useEffect(() => { onFlipPrevRef.current = onFlipPrev; }, [onFlipPrev]);

  const scrollLocked = useRef(false);

  // Scroll to flip
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (scrollLocked.current) return;

      if (e.deltaY > 30 && canGoNextRef.current) {
        scrollLocked.current = true;
        setFlipState({ isFlipping: true, progress: 1, originX: 0.98, originY: 0.9, direction: "right" });
        setTimeout(() => {
          onFlipNextRef.current();
          setTimeout(() => {
            setFlipState({ isFlipping: false, progress: 0, originX: 1, originY: 1, direction: null });
            scrollLocked.current = false;
          }, 500);
        }, 450);
      } else if (e.deltaY < -30 && canGoPrevRef.current) {
        scrollLocked.current = true;
        setFlipState({ isFlipping: true, progress: 1, originX: 0.02, originY: 0.9, direction: "left" });
        setTimeout(() => {
          onFlipPrevRef.current();
          setTimeout(() => {
            setFlipState({ isFlipping: false, progress: 0, originX: 0, originY: 1, direction: null });
            scrollLocked.current = false;
          }, 500);
        }, 450);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, []); // refs keep it fresh — no deps needed

  return {
    flipState,
    pageRef,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    cornerPeekSide,
    onMouseMove,
    onMouseLeave,
  };
}
