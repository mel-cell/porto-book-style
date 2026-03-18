"use client";

import { useState } from "react";
import BookScene from "@/components/BookScene/BookScene";
import IntroGimmick from "@/components/IntroGimmick";

export type IntroState = "locked" | "fading" | "done";

export default function Home() {
  const [introState, setIntroState] = useState<IntroState>("locked");

  return (
    <main>
      <h1 className="sr-only">Melvin — Web Dev &amp; DevOps Portfolio</h1>
      
      {/* Layer 1: Book — renders normally, no blur */}
      <BookScene />

      {/* Layer 2: Frosted glass overlay — blurs everything behind it */}
      {introState !== "done" && (
        <div 
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9998,
            background: "rgba(240, 237, 232, 0.35)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            opacity: introState === "fading" ? 0 : 1,
            transition: "opacity 1s ease-in-out",
            pointerEvents: "none",
          }}
        />
      )}

      {/* Layer 3: IntroGimmick — content only (text, icon, button) */}
      {introState !== "done" && (
        <IntroGimmick 
          isFading={introState === "fading"} 
          onStartFade={() => setIntroState("fading")}
          onComplete={() => setIntroState("done")}
        />
      )}
    </main>
  );
}
