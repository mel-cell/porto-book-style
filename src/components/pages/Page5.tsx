"use client";

// Nanti isi dengan: email, socials, CTA, "close book" button

export default function Page5() {
  return (
    <div className="w-full h-full relative bg-[var(--bg-page-alt)] flex flex-col overflow-hidden text-[var(--text-primary)] after:content-[''] after:absolute after:inset-y-0 after:left-0 after:w-6 after:bg-[linear-gradient(to_left,transparent,rgba(0,0,0,0.04))] after:pointer-events-none after:z-10" data-page="5">
      <div className="absolute top-6 left-7 font-mono text-[8px] tracking-[0.25em] text-[var(--text-muted)] opacity-50 select-none">
        05
      </div>
      <div className="flex-1 flex flex-col items-center justify-center p-12 text-center">
        <h3 className="font-serif text-[1.2rem] mb-4 uppercase tracking-widest font-bold">Contact</h3>
        <p className="font-mono text-[10px] text-[var(--text-secondary)] opacity-60 uppercase tracking-widest">Section under development</p>
      </div>
    </div>
  );
}
