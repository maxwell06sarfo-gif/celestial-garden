"use client";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function GlassModal({ isOpen, memory, onClose }) {
  if (!memory) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-start sm:items-center justify-center p-4 overflow-y-auto"
          style={{ backgroundColor: "rgba(0,0,0,0.82)", backdropFilter: "blur(20px)" }}
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.86, y: 55, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0, y: 40 }}
            transition={{ type: "spring", damping: 22, stiffness: 100 }}
            className="relative w-full max-w-lg overflow-y-auto max-h-[90vh] rounded-[28px]"
            style={{
              background: "linear-gradient(160deg, rgba(10,0,18,0.97) 0%, rgba(6,0,12,0.99) 100%)",
              border: `1px solid ${memory.color}44`,
              boxShadow: `0 0 0 1px rgba(255,255,255,0.04), 0 24px 80px rgba(0,0,0,0.75), 0 0 80px ${memory.color}28`,
            }}
            onClick={e => e.stopPropagation()}
          >
            {/* Top shimmer line */}
            <div className="absolute top-0 left-0 right-0 h-[1.5px] rounded-t-[28px]"
              style={{ background: `linear-gradient(90deg, transparent, ${memory.color}aa, ${memory.color}, ${memory.color}aa, transparent)` }}
            />

            {/* Image */}
            <div className={`relative w-full overflow-hidden rounded-t-[28px] ${memory.layout === "portrait" ? "h-[300px]" : "h-[200px]"}`}>
              <Image src={memory.image} alt={memory.title} fill className="object-cover" sizes="500px" />
              <div className="absolute inset-0" style={{ background: `linear-gradient(to top, rgba(6,0,12,0.97) 0%, rgba(6,0,12,0.3) 60%, transparent 100%)` }} />
            </div>

            {/* Floating hearts */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[28px]">
              {[...Array(9)].map((_, i) => (
                <motion.div key={i}
                  style={{ position: "absolute", left: `${8 + i * 10}%`, bottom: "-5%", fontSize: 12 + (i % 3) * 5, opacity: 0 }}
                  animate={{ y: [0, -380], opacity: [0, 0.65, 0.4, 0] }}
                  transition={{ duration: 5 + i * 0.7, delay: i * 0.9, repeat: Infinity, ease: "easeOut" }}
                >
                  {["💛", "🤍", "💕", "✨", "🌸", "💫", "🫧", "🕊️", "🌷"][i]}
                </motion.div>
              ))}
            </div>

            {/* Content */}
            <div className="relative px-8 pb-8 pt-5">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-bold"
                    style={{ background: `radial-gradient(circle, ${memory.color}cc 0%, ${memory.color}55 100%)`, color: "#000", boxShadow: `0 0 18px ${memory.color}55`, fontFamily: "'Cormorant Garamond', serif" }}
                  >{memory.id}</div>
                  <span className="text-[11px] tracking-[0.28em] uppercase font-semibold"
                    style={{ color: memory.color, fontFamily: "'Cormorant Garamond', serif" }}
                  >{memory.title}</span>
                </div>
                <button onClick={onClose}
                  className="w-7 h-7 rounded-full flex items-center justify-center text-sm transition-all"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.4)" }}
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.12)"; e.currentTarget.style.color = "#fff"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.color = "rgba(255,255,255,0.4)"; }}
                >✕</button>
              </div>

              <div className="mb-5 h-px" style={{ background: `linear-gradient(90deg, ${memory.color}55, transparent)` }} />

              <div className="text-[14.5px] leading-[2] font-light whitespace-pre-wrap"
                style={{ color: "rgba(245,235,255,0.9)", fontFamily: "'Cormorant Garamond', serif" }}
              >{memory.message}</div>

              <div className="mt-8 flex justify-center">
                <button onClick={onClose}
                  className="px-8 py-2.5 rounded-full text-[10px] tracking-[0.3em] uppercase font-medium transition-all duration-300"
                  style={{ background: `${memory.color}18`, color: memory.color, border: `1px solid ${memory.color}44`, fontFamily: "'Cormorant Garamond', serif", boxShadow: `0 0 24px ${memory.color}22` }}
                  onMouseEnter={e => { e.currentTarget.style.background = `${memory.color}30`; e.currentTarget.style.boxShadow = `0 0 35px ${memory.color}44`; }}
                  onMouseLeave={e => { e.currentTarget.style.background = `${memory.color}18`; e.currentTarget.style.boxShadow = `0 0 24px ${memory.color}22`; }}
                >✦ Close Memory ✦</button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
