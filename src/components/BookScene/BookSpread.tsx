"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { usePageFlip } from "@/hooks/usePageFlip";

// ─── Gimmicks ───────────────────────────────────────────────────────────────
import ScribbleCanvas from "@/components/Gimmicks/ScribbleCanvas";
import CVViewer       from "@/components/Gimmicks/CVViewer";

// ─── Page Registry ───────────────────────────────────────────────────────────
// ... existing imports ...
import Page1InsideCover from "@/components/pages/Page1InsideCover";
import Page2Intro       from "@/components/pages/Page2";
import Page3Skills      from "@/components/pages/Page3";
import Page4Projects    from "@/components/pages/Page4";
import Page5Contact     from "@/components/pages/Page5";
import Page6Archive     from "@/components/pages/Page6";
import Page7Connect     from "@/components/pages/Page7";
import Page8BackCover   from "@/components/pages/Page8BackCover";

const PAGES = [
  <Page1InsideCover key="p1" />,
  <Page2Intro       key="p2" />,
  <Page3Skills      key="p3" />,
  <Page4Projects    key="p4" />,
  <Page5Contact     key="p5" />,
  <Page6Archive     key="p6" />,
  <Page7Connect     key="p7" />,
  <Page8BackCover   key="p8" />,
];

interface BookSpreadProps {
  onClose: () => void;
  isCVOpen: boolean;
  setIsCVOpen: (val: boolean) => void;
}

export default function BookSpread({ onClose, isCVOpen, setIsCVOpen }: BookSpreadProps) {
  const [isDrawing, setIsDrawing] = useState(false);

  const {
    currentPage,
    canGoNext,
    canGoPrev,
    spreadRef,
    flipCardRef,
    flipState,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    onMouseMove,
    onMouseLeave,
    hoverEdge,
  } = usePageFlip(PAGES.length);

  // ── Page indices ...
  const rightIdx = currentPage;
  const leftIdx  = currentPage - 1;

  const underForwardRight = rightIdx + 2;
  const underForwardLeft  = rightIdx + 1;
  const underBackwardLeft = leftIdx - 2;
  const underBackwardRight = leftIdx - 1;

  const get = (i: number) => (i >= 0 && i < PAGES.length ? PAGES[i] : null);

  const spreadNum    = Math.ceil(currentPage / 2);
  const totalSpreads = Math.ceil((PAGES.length - 1) / 2);
  const showPrev     = canGoPrev;
  const showNext     = canGoNext;

  const isForward  = flipState?.direction === "forward";
  const isBackward = flipState?.direction === "backward";

  return (
    <div className="relative flex flex-col items-center gap-6">
      <ScribbleCanvas isActive={isDrawing} onClose={() => setIsDrawing(false)} />
      <CVViewer isOpen={isCVOpen} onClose={() => setIsCVOpen(false)} />

      {/* ── Book block + HUD + Buttons wrapped together so they move AS ONE ── */}
      <motion.div
        animate={{ 
          x: isCVOpen ? -320 : 0, // Slide further left
          scale: isCVOpen ? 0.96 : 1,
          z: isCVOpen ? -120 : 0
        }}
        transition={{ type: "spring", damping: 24, stiffness: 100 }}
        className="relative perspective-[2000px] preserve-3d flex flex-col items-center gap-6"
      >
        {/* Soft shadow - now INSIDE the motion container so it moves with the book */}
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[85%] h-[60px] bg-[radial-gradient(ellipse,rgba(0,0,0,0.22)_0%,transparent_70%)] blur-[18px] pointer-events-none z-0 translate-z-0 will-change-[filter]" />

        <div
          ref={spreadRef}
          className="relative flex w-[calc(var(--book-width)*2)] h-[var(--book-height)] max-w-[92vw] max-h-[88vh] rounded-[2px] cursor-grab active:cursor-grabbing touch-none select-none z-[1] shadow-[0_2px_4px_rgba(0,0,0,0.08),0_8px_16px_rgba(0,0,0,0.10),0_24px_48px_rgba(0,0,0,0.14),0_60px_90px_rgba(0,0,0,0.10)]"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseLeave}
        >

          {/* ... existing pages logic ... */}
          {/* ════════════════ LEFT PAGE ... */}
          <div className="flex-1 h-full relative bg-[var(--bg-page-alt)] perspective-[1500px] perspective-origin-[100%_50%] rounded-l-[2px] shadow-[inset_-12px_0_20px_rgba(0,0,0,0.06)]">
            <div className="absolute inset-0 w-full h-full translate-z-0 backface-hidden" style={{ opacity: isBackward ? 0 : 1 }}>
              {get(leftIdx)}
            </div>
            {isBackward && (
              <div className="absolute inset-0 w-full h-full translate-z-0 backface-hidden z-0">
                {get(underBackwardLeft)}
              </div>
            )}
            {isBackward && (
              <div ref={flipCardRef} className="absolute inset-0 w-full h-full preserve-3d will-change-transform z-[20] origin-[100%_80%] !transition-none">
                <div className="absolute inset-0 backface-hidden overflow-hidden bg-[var(--bg-page)]">
                  {get(leftIdx)}
                  <div className="absolute inset-0 pointer-events-none z-[5] bg-[linear-gradient(to_right,rgba(0,0,0,0.22)_0%,rgba(0,0,0,0.06)_30%,transparent_60%)]" />
                </div>
                <div className="absolute inset-0 backface-hidden overflow-hidden bg-[var(--bg-page-alt)]" style={{ transform: 'rotateY(-180deg) scaleX(-1)' }}>
                  {get(underBackwardRight)}
                  <div className="absolute inset-0 pointer-events-none z-[5] bg-[linear-gradient(to_left,rgba(0,0,0,0.18)_0%,rgba(0,0,0,0.04)_30%,transparent_60%)]" />
                </div>
                <div className="absolute top-0 bottom-0 right-0 w-[2px] bg-[linear-gradient(to_left,rgba(0,0,0,0.15),transparent)] pointer-events-none z-10" />
              </div>
            )}
            <div className="absolute bottom-0 left-0 w-14 h-14 pointer-events-none transition-opacity duration-[0.22s] bg-[radial-gradient(ellipse_at_bottom_left,rgba(0,0,0,0.08)_0%,transparent_70%)] rounded-bl-[2px]" style={{ opacity: hoverEdge === "left" && showPrev ? 1 : 0 }} />
          </div>

          <div className="absolute left-1/2 top-0 bottom-0 w-1 -translate-x-1/2 z-[30] pointer-events-none bg-[linear-gradient(to_right,rgba(0,0,0,0.25)_0%,rgba(0,0,0,0.05)_50%,rgba(0,0,0,0.25)_100%)] shadow-[-6px_0_16px_rgba(0,0,0,0.12),6px_0_16px_rgba(0,0,0,0.12)]" />

          {/* ════════════════ RIGHT PAGE ... */}
          <div className="flex-1 h-full relative bg-[var(--bg-page)] perspective-[1500px] perspective-origin-[0%_50%] rounded-r-[2px] shadow-[inset_12px_0_20px_rgba(0,0,0,0.06)]">
            <div className="absolute inset-0 w-full h-full translate-z-0 backface-hidden" style={{ opacity: isForward ? 0 : 1 }}>
              {get(rightIdx)}
            </div>
            {isForward && (
              <div className="absolute inset-0 w-full h-full translate-z-0 backface-hidden z-0">
                {get(underForwardRight)}
              </div>
            )}
            {isForward && (
              <div ref={flipCardRef} className="absolute inset-0 w-full h-full preserve-3d will-change-transform z-[20] origin-[0%_80%] !transition-none">
                <div className="absolute inset-0 backface-hidden overflow-hidden bg-[var(--bg-page)]">
                  {get(rightIdx)}
                  <div className="absolute inset-0 pointer-events-none z-[5] bg-[linear-gradient(to_left,rgba(0,0,0,0.22)_0%,rgba(0,0,0,0.06)_30%,transparent_60%)]" />
                </div>
                <div className="absolute inset-0 backface-hidden overflow-hidden bg-[var(--bg-page-alt)]" style={{ transform: 'rotateY(180deg) scaleX(-1)' }}>
                  {get(underForwardLeft)}
                  <div className="absolute inset-0 pointer-events-none z-[5] bg-[linear-gradient(to_right,rgba(0,0,0,0.18)_0%,rgba(0,0,0,0.04)_30%,transparent_60%)]" />
                </div>
                <div className="absolute top-0 bottom-0 left-0 w-[2px] bg-[linear-gradient(to_right,rgba(0,0,0,0.15),transparent)] pointer-events-none z-10" />
              </div>
            )}
            <div className="absolute bottom-0 right-0 w-14 h-14 pointer-events-none transition-all duration-[0.22s] bg-[radial-gradient(ellipse_at_bottom_right,rgba(0,0,0,0.08)_0%,transparent_70%)] rounded-br-[2px]" style={{ opacity: hoverEdge === "right" && showNext ? 1 : 0, transform: hoverEdge === "right" && showNext ? "translateY(-5px)" : "translateY(0)" }} />
          </div>
        </div>

        {/* ─── HUD ─── */}
        <div className="flex items-center justify-between w-full max-w-[calc(var(--book-width)*2)] z-[1] px-1 mt-6">
          <span className="text-[9px] font-mono text-[var(--text-muted)] tracking-[0.12em] min-w-[72px] opacity-70">{showPrev ? "← drag" : ""}</span>
          <span className="text-[10px] font-mono text-[var(--text-secondary)] bg-black/[0.04] border border-[var(--border)] px-[0.9rem] py-[0.2rem] rounded-[20px] tracking-[0.12em]">{spreadNum} / {totalSpreads}</span>
          <span className="text-[9px] font-mono text-[var(--text-muted)] tracking-[0.12em] min-w-[72px] opacity-70 text-right">{showNext ? "drag →" : ""}</span>
        </div>

        {/* Top Buttons Group */}
        <div className="absolute -top-10 right-0 flex items-center gap-3 z-[20]">
          {/* CV Button */}
          <motion.button
            className={`flex items-center gap-2 h-7 px-4 rounded-full border transition-all shadow-sm active:scale-95 ${isCVOpen ? 'border-black bg-black text-white' : 'border-[var(--border-strong)] bg-black/[0.04] text-[var(--text-muted)] hover:border-[#111] hover:text-[#111] hover:bg-black/[0.06]'}`}
            onClick={() => setIsCVOpen(!isCVOpen)}
            whileHover={{ scale: 1.05 }}
            title="View Resume"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-3 h-3">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
            <span className="font-mono text-[9px] tracking-widest uppercase font-bold">CV</span>
          </motion.button>

          {/* Pen Button */}
          <motion.button
            className={`w-7 h-7 rounded-full border flex items-center justify-center transition-all shadow-sm active:scale-95 ${isDrawing ? 'border-black bg-black text-white' : 'border-[var(--border-strong)] bg-black/[0.04] text-[var(--text-muted)] hover:border-[#111] hover:text-[#111] hover:bg-black/[0.06]'}`}
            onClick={() => setIsDrawing(!isDrawing)}
            whileHover={{ scale: 1.1 }}
            title="Draw something"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-[14px] h-[14px]">
              <path d="M12 20h9" />
              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
            </svg>
          </motion.button>

          {/* Close */}
          <motion.button
            className="w-7 h-7 rounded-full border border-[var(--border-strong)] bg-black/[0.04] text-[var(--text-muted)] flex items-center justify-center transition-all hover:border-[#111] hover:text-[#111] hover:bg-black/[0.06] shadow-sm active:scale-95 text-[10px]"
            onClick={onClose}
            whileHover={{ scale: 1.1 }}
            title="Clear & Close book"
          >
            ✕
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
