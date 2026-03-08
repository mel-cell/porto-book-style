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
      
      <BookScene isBlurred={introState !== "done"} />

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
