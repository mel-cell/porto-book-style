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

// Full Page Skeleton Helper
const SkeletonPage4 = () => (
  <div className="flex flex-col gap-1.5 opacity-[0.15] animate-pulse mb-4">
    <div className="h-2.5 w-1/2 bg-black rounded-sm" />
    <div className="h-3 w-full bg-black/60 rounded-sm" />
    <div className="h-3 w-full bg-black/60 rounded-sm" />
    <div className="h-3 w-3/4 bg-black/60 rounded-sm" />
  </div>
);

export default function Page4() {
  const { repos, loading, error } = useGithubRepos();

  return (
    <motion.div 
      className="w-full h-full relative bg-[var(--bg-page)] flex flex-col overflow-hidden text-[var(--text-primary)] after:content-[''] after:absolute after:inset-y-0 after:right-0 after:w-6 after:bg-[linear-gradient(to_right,transparent,rgba(0,0,0,0.04))] after:pointer-events-none after:z-10 px-8 py-8"
      data-page="4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* ── TOP PAGE NUMBER ── */}
      <div className="absolute top-6 left-7 font-mono text-[8px] tracking-[0.25em] text-[var(--text-muted)] opacity-50 select-none">04</div>

      {/* ── QUOTE SECTION ── */}
      <div className="flex flex-col items-center text-center mt-2 mb-5 select-none">
        <span className="text-2xl font-serif leading-none opacity-40">“</span>
        <h2 className="font-sans font-black text-base max-w-[280px] leading-tight tracking-tight">
           Dihina tak tumbang. <br /> Dipuji makasih bang. 
        </h2>
        <span className="text-2xl font-serif leading-none opacity-40 mt-1">”</span>
        <span className="text-[8px] font-sans max-w-[250px] leading-none opacity-40 mt-1">Semua Project yang sempat aku kerjakan baik individual atau kelompok</span>
      </div>

      <div className="flex-1 overflow-y-auto pr-1 scrollbar-hide py-2">
        {loading ? (
          <div className="columns-3 gap-3 space-y-2">
            {Array.from({ length: 24 }).map((_, i) => <SkeletonPage4 key={i} />)}
          </div>
        ) : error ? (
          <div className="flex-1 flex items-center justify-center opacity-40 font-mono text-[8px]">FAILED_TO_LOAD</div>
        ) : (
          <div className="columns-3 gap-3 space-y-3">
            {repos.slice(0, 21).map((repo) => (
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

    </motion.div>
  );
}
