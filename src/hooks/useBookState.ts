"use client";

import { useState, useCallback } from "react";

export type BookState = "cover" | "opening" | "open" | "closing";

export interface UseBookStateReturn {
  state: BookState;
  currentSpread: number;
  totalSpreads: number;
  openBook: () => void;
  closeBook: () => void;
  nextPage: () => void;
  prevPage: () => void;
  canGoNext: boolean;
  canGoPrev: boolean;
}

export function useBookState(totalSpreads: number): UseBookStateReturn {
  const [state, setState] = useState<BookState>("cover");
  const [currentSpread, setCurrentSpread] = useState(0);

  const openBook = useCallback(() => {
    setState("opening");
    setTimeout(() => setState("open"), 1200); // match GSAP duration
  }, []);

  const closeBook = useCallback(() => {
    setState("closing");
    setTimeout(() => setState("cover"), 1000);
  }, []);

  const nextPage = useCallback(() => {
    if (currentSpread < totalSpreads - 1) {
      setCurrentSpread((p) => p + 1);
    }
  }, [currentSpread, totalSpreads]);

  const prevPage = useCallback(() => {
    if (currentSpread > 0) {
      setCurrentSpread((p) => p - 1);
    }
  }, [currentSpread]);

  return {
    state,
    currentSpread,
    totalSpreads,
    openBook,
    closeBook,
    nextPage,
    prevPage,
    canGoNext: currentSpread < totalSpreads - 1,
    canGoPrev: currentSpread > 0,
  };
}
