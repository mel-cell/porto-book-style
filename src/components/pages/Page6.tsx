"use client";

import { useState, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useMessages } from "@/hooks/useMessages";

// ── Wax Seal Component ──
const WaxSeal = ({ size = 36 }: { size?: number }) => (
  <div className="relative" style={{ width: size, height: size }}>
    <svg viewBox="0 0 60 60" className="w-full h-full">
      <circle cx="30" cy="30" r="26" fill="#8B1A1A" />
      <ellipse cx="18" cy="12" rx="7" ry="4" fill="#8B1A1A" />
      <ellipse cx="44" cy="14" rx="5" ry="3" fill="#8B1A1A" />
      <ellipse cx="14" cy="40" rx="4" ry="5" fill="#8B1A1A" />
      <ellipse cx="46" cy="38" rx="6" ry="4" fill="#8B1A1A" />
      <circle cx="24" cy="24" r="7" fill="rgba(255,255,255,0.07)" />
    </svg>
    <div className="absolute inset-0 flex items-center justify-center">
      <span className="font-serif font-bold text-[#f5e6d0] drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)] select-none" style={{ fontSize: size * 0.38 }}>M</span>
    </div>
  </div>
);

// ── Envelope Shape (Landscape/Portrait-aware) ──
const EnvelopeShape = ({ width, height, children, className = "" }: { width?: number; height?: number; children?: React.ReactNode; className?: string }) => (
  <div className={`relative ${className}`} style={{ width: width || 'auto', height: height || 'auto' }}>
    <div className="absolute inset-0 bg-[#f5f0e6] rounded-[2px] border border-black/10" />
    <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.01),transparent_30%,transparent_70%,rgba(0,0,0,0.03))] rounded-[2px] pointer-events-none" />
    <div className="absolute inset-x-6 bottom-6 space-y-2 pointer-events-none opacity-15">
      <div className="h-[0.5px] bg-black w-full" />
      <div className="h-[0.5px] bg-black w-full" />
      <div className="h-[0.5px] bg-black w-2/3" />
    </div>
    {children}
  </div>
);

export default function Page6() {
  const [isOpened, setIsOpened] = useState(false);
  const [flapOpen, setFlapOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const { sendMessage, sending, sent, reset } = useMessages();

  useEffect(() => {
    // Use timeout to bypass synchronous setState warning
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  const handleOpen = useCallback(() => {
    if (isOpened) return;
    setIsOpened(true);
    setTimeout(() => setFlapOpen(true), 500);
  }, [isOpened]);

  const handleClose = useCallback(() => {
    setFlapOpen(false);
    setTimeout(() => {
      setIsOpened(false);
      reset();
      setFormData({ name: "", email: "", message: "" });
    }, 350);
  }, [reset]);

  const handleSend = async () => {
    await sendMessage(formData);
    setTimeout(() => handleClose(), 2500);
  };

  // ── Overlay Assignment ──
  const overlay = (mounted && isOpened) ? createPortal(
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[99999] flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="absolute inset-0 bg-black/25 backdrop-blur-[4px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
        />

        <motion.div
          className="relative z-10 flex flex-col items-center"
          style={{ perspective: "1200px" }}
          initial={{ scale: 0.5, y: 80, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.5, y: 80, opacity: 0 }}
          transition={{ type: "spring", stiffness: 70, damping: 16 }}
        >
          <div className="relative" style={{ width: 1000, height: 420 }}>
            <div className="absolute inset-0 bg-[#f5f0e6] rounded-[4px] border border-black/10 shadow-[0_40px_120px_rgba(0,0,0,0.4)]" />
            
            {/* Meta Info */}
            <div className="absolute top-10 left-12 flex flex-col gap-1.5 pointer-events-none">
              <span className="font-handwrite text-3xl text-black/40 leading-none">To: Visitor</span>
              <span className="font-mono text-[10px] text-black/20 uppercase tracking-[0.5em]">Classified / System_Node_06</span>
            </div>
            
            {/* Flap */}
            <motion.div
              className="absolute -top-[1.5px] left-0 right-0 pointer-events-none origin-top z-[5]"
              style={{ height: 220 }}
              animate={{ rotateX: flapOpen ? -180 : 0 }}
              transition={{ type: "spring", stiffness: 40, damping: 14 }}
            >
              <svg viewBox="0 0 1000 220" className="w-full h-full drop-shadow-md" preserveAspectRatio="none">
                <path d="M0,0 L500,210 L1000,0 Z" fill="#ede8da" stroke="rgba(0,0,0,0.06)" strokeWidth="0.5" />
              </svg>
            </motion.div>

            {/* Seal */}
            <motion.div
              className="absolute left-1/2 top-[50%] -translate-x-1/2 -translate-y-1/2 z-[10] pointer-events-none"
              animate={{
                scale: flapOpen ? 0.35 : 1,
                y: flapOpen ? 140 : 0,
                opacity: flapOpen ? 0.08 : 1,
              }}
              transition={{ type: "spring", stiffness: 60, damping: 14 }}
            >
              <WaxSeal size={90} />
            </motion.div>

            {/* ── REFINED COMPACT LETTER ── */}
            <AnimatePresence>
              {flapOpen && (
                <motion.div
                  className="absolute -top-[300px] left-1/2 -translate-x-1/2 w-[820px] bg-[#fdfbf7] border border-black/10 rounded-[2px] shadow-[0_20px_80px_rgba(0,0,0,0.2)] z-[20] p-12 flex flex-col gap-8"
                  initial={{ y: 180, opacity: 0, scale: 0.92 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  exit={{ y: 180, opacity: 0, scale: 0.92 }}
                  transition={{ type: "spring", stiffness: 55, damping: 18, delay: 0.2 }}
                >
                  {sent ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <motion.span className="text-5xl mb-6" initial={{ scale: 0 }} animate={{ scale: 1 }}>✓</motion.span>
                      <span className="font-serif text-base text-black/60 tracking-wider">Terima kasih, pesan Anda telah tersimpan.</span>
                    </div>
                  ) : (
                    <>
                      <div className="text-center">
                        <span className="font-handwrite text-3xl text-black/50">Tulis sesuatu untuk Melvin...</span>
                      </div>

                      <div className="grid grid-cols-2 gap-12 pt-4">
                        <div className="flex flex-col gap-1.5">
                          <label className="font-mono text-[8px] uppercase tracking-widest text-black/25 ml-1">Nama Pengirim</label>
                          <input type="text" placeholder="Melvin's Friend" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full bg-transparent border-b border-black/15 text-sm font-serif py-2 px-1 focus:outline-none focus:border-black/50 transition-colors" />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="font-mono text-[8px] uppercase tracking-widest text-black/25 ml-1">Email (Opsional)</label>
                          <input type="email" placeholder="hello@friend.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full bg-transparent border-b border-black/15 text-sm font-serif py-2 px-1 focus:outline-none focus:border-black/50 transition-colors" />
                        </div>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="font-mono text-[8px] uppercase tracking-widest text-black/25 ml-1">Kandungan Pesan</label>
                        <textarea placeholder="Ceritakan sesuatu..." value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} rows={4} className="w-full bg-transparent border-b border-black/15 text-base font-serif py-2 px-1 focus:outline-none focus:border-black/50 resize-none transition-colors" />
                      </div>

                      <div className="flex justify-between items-center mt-6 pt-4 border-t border-black/5">
                        <button onClick={handleClose} className="font-mono text-[10px] uppercase tracking-[0.4em] text-black/25 hover:text-red-900 transition-colors cursor-pointer">Batal</button>
                        <button onClick={handleSend} disabled={sending || !formData.name || !formData.message} className="font-mono text-[10px] uppercase tracking-[0.4em] bg-black text-white px-12 py-4 rounded-sm hover:bg-black/90 disabled:opacity-10 transition-all shadow-xl active:scale-95 cursor-pointer">{sending ? "MENGIRIM..." : "KIRIM PESAN"}</button>
                      </div>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  ) : null;

  return (
    <>
      <div className="w-full h-full relative bg-[var(--bg-page-alt)] flex flex-col overflow-hidden text-[var(--text-primary)] after:content-[''] after:absolute after:inset-y-0 after:right-0 after:w-6 after:bg-[linear-gradient(to_right,transparent,rgba(0,0,0,0.04))] after:pointer-events-none after:z-10" data-page="6">
        <div className="absolute top-6 right-7 font-mono text-[8px] tracking-[0.25em] text-[var(--text-muted)] opacity-50 select-none">06</div>

        <div className="flex-1 flex items-center justify-center relative">
          {/* CTA Text in the bottom left box area */}
          <div className="absolute bottom-10 left-10 max-w-[140px] opacity-60 select-none pointer-events-none">
            <p className="font-serif text-[10px] leading-relaxed italic">
              kamu juga bisa kasih pesan untuk melvin dari sini loh
            </p>
          </div>

          <motion.div
            className="relative cursor-pointer select-none group"
            onClick={handleOpen}
            initial={{ rotate: 101 }}
            whileHover={{ scale: 1.04, rotate: 90, y: -6 }}
            whileTap={{ scale: 0.96 }}
            style={{ opacity: isOpened ? 0 : 1, width: "110%" }}
          >
            <EnvelopeShape className="!w-full !h-0 !pb-[65%] shadow-[0_4px_16px_rgba(0,0,0,0.1)] group-hover:shadow-[0_10px_30px_rgba(0,0,0,0.15)] transition-shadow">
              <div className="absolute top-[8%] left-[6%]"><span className="font-handwrite text-[9px] text-black/35">To: Visitor</span></div>
              <div className="absolute top-[8%] right-[6%]"><span className="font-mono text-[5px] text-black/20 uppercase tracking-widest">Private</span></div>
              <div className="absolute -top-[0.5px] left-0 right-0 pointer-events-none" style={{ height: "55%" }}>
                <svg viewBox="0 0 300 165" className="w-full h-full" preserveAspectRatio="none">
                  <path d="M0,0 L150,160 L300,0 Z" fill="#ede8da" stroke="rgba(0,0,0,0.05)" strokeWidth="0.5" />
                </svg>
              </div>
              <div className="absolute left-1/2 top-[40%] -translate-x-1/2 -translate-y-1/2 z-[5]"><WaxSeal size={34} /></div>
            </EnvelopeShape>
          </motion.div>
        </div>

        <div className="px-8 pb-6">
          <div className="pt-4 border-t border-black/10 flex justify-between font-mono text-[7px] tracking-[0.2em] opacity-40 select-none uppercase">
            <span>Mail_Service</span>
            <span>Sealed // MMXXVI</span>
          </div>
        </div>
      </div>
      {overlay}
    </>
  );
}
