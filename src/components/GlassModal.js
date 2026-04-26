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
          style={{
            backgroundColor: "rgba(2,10,3,0.75)",
            backdropFilter: "blur(18px)",
          }}
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.88, y: 50, rotateX: 8, opacity: 0 }}
            animate={{ scale: 1, y: 0, rotateX: 0, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0, y: 40 }}
            transition={{ type: "spring", damping: 22, stiffness: 100 }}
            className="relative w-full max-w-lg overflow-y-auto max-h-[90vh] rounded-[28px] custom-scrollbar"
            style={{
              background: "linear-gradient(160deg, rgba(12,28,12,0.97) 0%, rgba(8,22,8,0.98) 100%)",
              border: `1px solid ${memory.color}33`,
              boxShadow: `0 0 0 1px rgba(255,255,255,0.04), 0 24px 80px rgba(0,0,0,0.7), 0 0 60px ${memory.color}22`,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top color accent line */}
            <div
              className="absolute top-0 left-0 right-0 h-[1.5px] rounded-t-[28px]"
              style={{
                background: `linear-gradient(90deg, transparent, ${memory.color}88, ${memory.color}, ${memory.color}88, transparent)`,
              }}
            />

            {/* Shimmer sweep */}
            <div className="absolute top-0 left-0 right-0 h-[1.5px] rounded-t-[28px] overflow-hidden">
              <div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.6) 50%, transparent 100%)",
                  animation: "shimmer 3s infinite",
                  width: "40%",
                }}
              />
            </div>

            {/* Image Section */}
            <div className={`relative w-full overflow-hidden rounded-t-[28px] ${
              memory.layout === "portrait" ? "h-[340px]" : "h-[220px]"
            }`}>
              <Image
                src={memory.image}
                alt={memory.title}
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
                sizes="(max-width: 768px) 100vw, 500px"
              />
              {/* Dark gradient overlay on image */}
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(to top, rgba(8,20,8,0.97) 0%, rgba(8,20,8,0.4) 50%, transparent 100%)`,
                }}
              />
              {/* Color tint */}
              <div
                className="absolute inset-0"
                style={{ background: `${memory.color}10`, mixBlendMode: "overlay" }}
              />
            </div>

            {/* Text Content */}
            <div className="relative px-8 pb-8 pt-4">
              {/* Header */}
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  {/* Memory number badge */}
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-bold"
                    style={{
                      background: `radial-gradient(circle, ${memory.color}cc 0%, ${memory.color}66 100%)`,
                      color: "#000",
                      boxShadow: `0 0 16px ${memory.color}55`,
                      fontFamily: "'Cormorant Garamond', serif",
                    }}
                  >
                    {memory.id}
                  </div>
                  <span
                    className="text-[11px] tracking-[0.3em] uppercase font-semibold"
                    style={{ color: memory.color, fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    {memory.title}
                  </span>
                </div>
                {/* Close X */}
                <button
                  onClick={onClose}
                  className="w-7 h-7 rounded-full flex items-center justify-center text-[14px] transition-all duration-200"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "rgba(255,255,255,0.4)",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "#fff"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.color = "rgba(255,255,255,0.4)"; }}
                >
                  ✕
                </button>
              </div>

              {/* Decorative divider */}
              <div
                className="mb-5 h-px"
                style={{ background: `linear-gradient(90deg, ${memory.color}44, transparent)` }}
              />

              {/* Memory text */}
              <div
                className="text-[14.5px] leading-[1.9] font-light whitespace-pre-wrap"
                style={{
                  color: "rgba(240,235,220,0.88)",
                  fontFamily: "'Cormorant Garamond', serif",
                }}
              >
                {memory.message}
              </div>

              {/* Close button */}
              <div className="mt-8 flex justify-center">
                <button
                  onClick={onClose}
                  className="px-8 py-2.5 rounded-full text-[10px] tracking-[0.3em] uppercase font-medium transition-all duration-300"
                  style={{
                    background: `${memory.color}18`,
                    color: memory.color,
                    border: `1px solid ${memory.color}44`,
                    fontFamily: "'Cormorant Garamond', serif",
                    boxShadow: `0 0 20px ${memory.color}22`,
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = `${memory.color}30`; e.currentTarget.style.boxShadow = `0 0 30px ${memory.color}44`; }}
                  onMouseLeave={e => { e.currentTarget.style.background = `${memory.color}18`; e.currentTarget.style.boxShadow = `0 0 20px ${memory.color}22`; }}
                >
                  ✦ Close Memory ✦
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
