"use client";
import { useState, useMemo, memo } from "react";
import { AnimatePresence, motion } from "framer-motion";

import DigitalHug from "@/components/DigitalHug";
import FloatingPetals from "@/components/StarField";
import LandingGate from "@/components/LandingGate";
import LightVine from "@/components/LightVine";
import SacredFlower from "@/components/SacredFlower";
import GlassModal from "@/components/GlassModal";
import AudioEngine from "@/components/AudioEngine";

import { memories } from "@/utils/memories";

// Static star field — pure CSS, zero JS per frame
const StarField = memo(function StarField() {
  return (
    <>
      <style>{`
        @keyframes starTwinkle { 0%,100%{opacity:0.2} 50%{opacity:0.85} }
        .star { position:absolute; border-radius:50%; pointer-events:none; background:white; animation: starTwinkle var(--dur) var(--del) ease-in-out infinite; }
      `}</style>
      {Array.from({ length: 80 }, (_, i) => (
        <div
          key={i}
          className="star"
          style={{
            left: `${(i * 1.25) % 100}%`,
            top: `${(i * 0.83) % 52}%`,
            width: i % 7 === 0 ? 2 : 1,
            height: i % 7 === 0 ? 2 : 1,
            opacity: 0.3 + ((i * 0.07) % 0.45),
            "--dur": `${2.5 + ((i * 0.3) % 4)}s`,
            "--del": `${(i * 0.15) % 6}s`,
          }}
        />
      ))}
    </>
  );
});

// Static forest — no per-frame rendering
const ForestSilhouette = memo(function ForestSilhouette() {
  const blades = useMemo(() => Array.from({ length: 50 }, (_, i) => {
    const x = (i * 20) % 1000;
    const h = 16 + ((i * 5) % 26);
    const b = (i % 2 === 0 ? -1 : 1) * (3 + ((i * 2) % 6));
    const color = i % 3 === 0 ? "#2d6b18" : i % 3 === 1 ? "#3a8020" : "#4a9a28";
    return `<path d="M ${x} 160 Q ${x + b} ${160 - h * 0.6} ${x + b * 0.5} ${160 - h}" stroke="${color}" stroke-width="0.8" fill="none" stroke-linecap="round"/>`;
  }).join(""), []);

  return (
    <svg
      className="absolute bottom-0 left-0 right-0 w-full pointer-events-none"
      viewBox="0 0 1000 160"
      preserveAspectRatio="none"
      style={{ height: "22%", zIndex: 5 }}
    >
      <path d="M 0 160 Q 100 100 200 120 Q 300 105 400 125 Q 500 108 600 122 Q 700 108 800 120 Q 900 105 1000 118 L 1000 160Z" fill="#0a1f0a" opacity="0.9" />
      <path d="M 0 160 Q 80 118 160 132 Q 250 122 350 138 Q 440 124 530 140 Q 620 126 720 138 Q 820 124 920 136 Q 960 130 1000 133 L 1000 160Z" fill="#0f2a0f" />
      <path d="M 0 160 Q 60 138 120 148 Q 200 138 280 150 Q 370 140 450 152 Q 540 142 620 152 Q 700 142 780 150 Q 860 141 940 148 Q 970 144 1000 146 L 1000 160Z" fill="#142d14" />
      <g dangerouslySetInnerHTML={{ __html: blades }} />
    </svg>
  );
});

// Desktop: fixed percentage positions (original layout)
const desktopPositions = [
  { x: "18%", y: "10%" },
  { x: "18%", y: "28%" },
  { x: "18%", y: "46%" },
  { x: "18%", y: "64%" },
  { x: "18%", y: "78%" },
  { x: "62%", y: "10%" },
  { x: "62%", y: "28%" },
  { x: "62%", y: "46%" },
  { x: "62%", y: "64%" },
  { x: "62%", y: "78%" },
];

export default function Home() {
  const [hasEntered, setHasEntered] = useState(false);
  const [selectedMemory, setSelectedMemory] = useState(null);

  return (
    <main
      className="relative h-screen w-full overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #020c03 0%, #071408 12%, #0d2010 28%, #0f2a12 48%, #122e14 68%, #163318 85%, #1a3a1a 100%)",
      }}
    >
      <AudioEngine hasEntered={hasEntered} />
      <StarField />

      {/* Moon glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "-60px", right: "-60px",
          width: 300, height: 300, borderRadius: "50%",
          background: "radial-gradient(circle at 40% 40%, rgba(255,252,180,0.18) 0%, rgba(255,248,100,0.06) 50%, transparent 70%)",
        }}
      />

      {/* Ground mist */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{
          height: "18%",
          background: "linear-gradient(to top, rgba(180,240,180,0.07) 0%, transparent 100%)",
          filter: "blur(12px)",
        }}
      />

      <ForestSilhouette />
      <FloatingPetals />

      {/* Landing Gate */}
      <AnimatePresence>
        {!hasEntered && (
          <motion.div
            exit={{ opacity: 0, scale: 1.03 }}
            transition={{ duration: 1.4, ease: [0.43, 0.13, 0.23, 0.96] }}
            className="fixed inset-0 z-[100]"
          >
            <LandingGate onEnter={() => setHasEntered(true)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Garden content */}
      {hasEntered && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 0.3 }}
          className="relative h-full w-full"
        >
          <LightVine isActive={true} />

          {/* ── DESKTOP layout: fixed positions ── */}
          <div className="hidden md:block absolute inset-0">
            {memories.slice(0, 10).map((memory, index) => (
              <SacredFlower
                key={memory.id}
                type={memory.type}
                color={memory.color}
                position={desktopPositions[index]}
                onClick={() => setSelectedMemory(memory)}
                index={index}
              />
            ))}
          </div>

          {/* ── MOBILE layout: scrollable 2-column grid ── */}
          <div
            className="md:hidden absolute inset-0 overflow-y-auto"
            style={{ paddingBottom: "80px", zIndex: 20 }}
          >
            <style>{`
              .mobile-garden::-webkit-scrollbar { display: none; }
              .mobile-garden { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
            <div
              className="mobile-garden grid grid-cols-2 gap-y-2 gap-x-4 px-6 pt-14 pb-6"
              style={{ minHeight: "100%" }}
            >
              {memories.slice(0, 10).map((memory, index) => (
                <MobileFlower
                  key={memory.id}
                  memory={memory}
                  index={index}
                  onClick={() => setSelectedMemory(memory)}
                />
              ))}
            </div>
          </div>

          {/* Garden label */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.5, duration: 1.4 }}
            className="absolute bottom-5 left-1/2 -translate-x-1/2 z-30"
          >
            <div
              className="px-7 py-2.5 rounded-full text-[9px] tracking-[0.5em] uppercase font-medium whitespace-nowrap"
              style={{
                background: "rgba(5,18,5,0.75)",
                border: "1px solid rgba(120,200,70,0.25)",
                color: "rgba(160,230,100,0.75)",
                backdropFilter: "blur(16px)",
                fontFamily: "'Cormorant Garamond', serif",
                boxShadow: "0 4px 20px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)",
              }}
            >
              ✦ Uriel&apos;s Celestial Garden ✦
            </div>
          </motion.div>

          <DigitalHug />
        </motion.div>
      )}

      <GlassModal
        isOpen={!!selectedMemory}
        memory={selectedMemory}
        onClose={() => setSelectedMemory(null)}
      />

      {/* Deep vignette */}
      <div
        className="absolute inset-0 pointer-events-none z-40"
        style={{
          background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.35) 100%)",
          boxShadow: "inset 0 0 120px 40px rgba(0,0,0,0.55)",
        }}
      />
    </main>
  );
}

// Mobile flower card — tap to open memory
function MobileFlower({ memory, index, onClick }) {
  function hex2rgb(hex) {
    const n = parseInt(hex.replace("#", ""), 16);
    return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
  }
  function rgba(hex, a) {
    const { r, g, b } = hex2rgb(hex);
    return `rgba(${r},${g},${b},${a})`;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay: index * 0.08, type: "spring", stiffness: 120, damping: 18 }}
      whileTap={{ scale: 0.93 }}
      onClick={onClick}
      className="flex flex-col items-center cursor-pointer"
      style={{ willChange: "transform" }}
    >
      {/* Flower icon area */}
      <div
        className="relative flex items-center justify-center rounded-2xl mb-2"
        style={{
          width: "100%",
          aspectRatio: "1 / 1",
          background: `radial-gradient(circle at 40% 35%, ${rgba(memory.color, 0.18)} 0%, ${rgba(memory.color, 0.06)} 60%, transparent 100%)`,
          border: `1px solid ${rgba(memory.color, 0.3)}`,
          boxShadow: `0 0 18px ${rgba(memory.color, 0.12)}`,
        }}
      >
        {/* Flower emoji / SVG placeholder — lightweight for mobile */}
        <div style={{ fontSize: 38 }}>
          {["🌹","🌻","🪷","🌸","🌺","💐","🌼","🏵️","🌷","✿"][index % 10]}
        </div>
        {/* Memory number badge */}
        <div
          className="absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold"
          style={{
            background: rgba(memory.color, 0.85),
            color: "#000",
            fontFamily: "'Cormorant Garamond', serif",
          }}
        >
          {memory.id}
        </div>
      </div>

      {/* Label */}
      <div
        className="text-center text-[9px] tracking-[0.25em] uppercase font-medium leading-tight px-1"
        style={{
          color: rgba(memory.color, 0.85),
          fontFamily: "'Cormorant Garamond', serif",
          maxWidth: "100%",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        Memory {memory.id}
      </div>
    </motion.div>
  );
}
