"use client";

import { motion, Variants } from "framer-motion";
import { useGithubRepos } from "@/hooks/useGithubRepos";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.04 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 8, filter: "blur(3px)" },
  visible: { 
    opacity: 1, 
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } 
  }
};

// Full Page Skeleton Helper (DECLARED OUTSIDE)
const SkeletonPage5 = () => (
  <div className="flex flex-col gap-1.5 opacity-[0.15] animate-pulse mb-4">
    <div className="h-2.5 w-1/2 bg-black rounded-sm" />
    <div className="h-3 w-full bg-black/60 rounded-sm" />
    <div className="h-3 w-full bg-black/60 rounded-sm" />
    <div className="h-3 w-3/4 bg-black/60 rounded-sm" />
  </div>
);

export default function Page5() {
  const { repos, loading } = useGithubRepos(); // Removed unused error
  const overflowRepos = repos.slice(21);

  return (
    <motion.div 
      className="w-full h-full relative bg-[var(--bg-page-alt)] flex flex-col overflow-hidden text-[var(--text-primary)] after:content-[''] after:absolute after:inset-y-0 after:left-0 after:w-6 after:bg-[linear-gradient(to_left,transparent,rgba(0,0,0,0.04))] after:pointer-events-none after:z-10 px-8 py-8"
      data-page="5"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="absolute top-6 left-7 font-mono text-[8px] tracking-[0.25em] text-[var(--text-muted)] opacity-50 select-none">05</div>

      <div className="flex-1 overflow-y-auto pr-1 scrollbar-hide py-2">
        {loading ? (
          <div className="columns-3 gap-3 space-y-2">
            {Array.from({ length: 24 }).map((_, i) => <SkeletonPage5 key={i} />)}
          </div>
        ) : overflowRepos.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center opacity-20 text-center p-12">
             <span className="font-serif italic text-xs">End of archive. No further entries found.</span>
          </div>
        ) : (
          <div className="columns-3 gap-3 space-y-3">
            {overflowRepos.map((repo) => (
              <motion.a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="group break-inside-avoid flex flex-col no-underline hover:opacity-60 transition-opacity mb-2"
                variants={itemVariants}
              >
                <p className="font-serif text-[9.4px] leading-[1.3] text-justify text-[var(--text-secondary)]">
                  <span className="font-sans font-black uppercase tracking-tight mr-1 text-[9px] text-[var(--text-primary)]">
                    {repo.name.replace(/-/g, " ")}
                  </span>
                  <span className="opacity-40 mx-0.5">—</span>{" "}
                  {repo.description || "Experimental entry found in the archives. No further notes available for this build."}
                </p>
              </motion.a>
            ))}
          </div>
        )}
      </div>

      {/* ── CLEAN FOOTER ── */}
      <div className="mt-4 pt-4 border-t border-black/10 flex justify-between font-mono text-[7px] tracking-[0.2em] opacity-40 select-none uppercase">
         <span>Archive Supplement</span>
         <span>Registry_End</span>
      </div>
    </motion.div>
  );
}
