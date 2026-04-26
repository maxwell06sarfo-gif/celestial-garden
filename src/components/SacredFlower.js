"use client";
import { memo, useCallback } from "react";
import { motion } from "framer-motion";

/* ─── Utility ─────────────────────────────────────────── */
function hex2rgb(hex) {
  const n = parseInt(hex.replace("#", ""), 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}
function adjustColor(hex, amt) {
  const { r, g, b } = hex2rgb(hex);
  const clamp = (v) => Math.min(255, Math.max(0, v + amt));
  return `#${[clamp(r), clamp(g), clamp(b)].map((v) => v.toString(16).padStart(2, "0")).join("")}`;
}
function rgba(hex, a) {
  const { r, g, b } = hex2rgb(hex);
  return `rgba(${r},${g},${b},${a})`;
}

/* ─── Stem — no defs/gradients for performance ────────── */
function StemAndLeaves({ uid }) {
  return (
    <>
      <path d="M 50 120 Q 48 98 50 82" stroke="#4a7c2a" strokeWidth="3" fill="none" strokeLinecap="round" />
      <g transform="rotate(-28 38 100)">
        <ellipse cx="38" cy="100" rx="14" ry="5.5" fill="#4a8a28" opacity="0.9" />
      </g>
      <g transform="rotate(22 62 92)">
        <ellipse cx="62" cy="92" rx="12" ry="4.5" fill="#3a7a20" opacity="0.85" />
      </g>
    </>
  );
}

/* ─── ROSE ─────────────────────────────────────────────── */
const RoseSVG = memo(function RoseSVG({ color, uid }) {
  const d1 = adjustColor(color, -40);
  const d2 = adjustColor(color, -20);
  const l1 = adjustColor(color, 30);
  const l2 = adjustColor(color, 15);
  return (
    <svg viewBox="0 0 100 130" className="w-full h-full" style={{ overflow: "visible" }}>
      <StemAndLeaves uid={uid} />
      {[0, 72, 144, 216, 288].map((a, i) => (
        <ellipse key={`g${i}`} cx="50" cy="50" rx="21" ry="11" fill={d1} opacity="0.72" transform={`rotate(${a} 50 50) translate(0 -13)`} />
      ))}
      {[36, 108, 180, 252, 324].map((a, i) => (
        <ellipse key={`r2${i}`} cx="50" cy="50" rx="19" ry="10" fill={d2} opacity="0.8" transform={`rotate(${a} 50 50) translate(0 -10)`} />
      ))}
      {[0, 60, 120, 180, 240, 300].map((a, i) => (
        <ellipse key={`r3${i}`} cx="50" cy="50" rx="16" ry="8.5" fill={color} opacity="0.88" transform={`rotate(${a} 50 50) translate(0 -7.5)`} />
      ))}
      {[30, 90, 150, 210, 270, 330].map((a, i) => (
        <ellipse key={`r4${i}`} cx="50" cy="50" rx="11" ry="6" fill={l2} opacity="0.9" transform={`rotate(${a} 50 50) translate(0 -5)`} />
      ))}
      <circle cx="50" cy="50" r="8" fill={l1} />
      <circle cx="50" cy="50" r="5" fill={l1} opacity="0.7" />
      <circle cx="48" cy="48" r="1.5" fill="rgba(255,255,200,0.9)" />
    </svg>
  );
});

/* ─── SUNFLOWER ─────────────────────────────────────────── */
const SunflowerSVG = memo(function SunflowerSVG({ uid }) {
  const warm = "#f5c842";
  const darkWarm = "#d4a017";
  return (
    <svg viewBox="0 0 100 130" className="w-full h-full" style={{ overflow: "visible" }}>
      <StemAndLeaves uid={uid} />
      {Array.from({ length: 18 }, (_, i) => {
        const angle = (i / 18) * 360;
        const isOdd = i % 2 === 1;
        return (
          <ellipse key={i} cx="50" cy="50" rx={isOdd ? "7" : "6"} ry={isOdd ? "20" : "18"}
            fill={isOdd ? darkWarm : warm} opacity={isOdd ? "0.88" : "0.95"}
            transform={`rotate(${angle} 50 50) translate(0 -${isOdd ? 21 : 19})`} />
        );
      })}
      <circle cx="50" cy="50" r="16" fill="#3d2200" />
      {Array.from({ length: 29 }, (_, i) => {
        const phi = (1 + Math.sqrt(5)) / 2;
        const theta = i * 2 * Math.PI / (phi * phi);
        const r = Math.sqrt(i / 29) * 12;
        return <circle key={i} cx={50 + r * Math.cos(theta)} cy={50 + r * Math.sin(theta)} r="1.1" fill="#6b3a00" opacity="0.7" />;
      })}
    </svg>
  );
});

/* ─── ORCHID ─────────────────────────────────────────────── */
const OrchidSVG = memo(function OrchidSVG({ color, uid }) {
  const d = adjustColor(color, -35);
  const l = adjustColor(color, 40);
  const vein = adjustColor(color, -60);
  return (
    <svg viewBox="0 0 100 130" className="w-full h-full" style={{ overflow: "visible" }}>
      <StemAndLeaves uid={uid} />
      <ellipse cx="50" cy="35" rx="10" ry="18" fill={color} opacity="0.82" />
      <ellipse cx="50" cy="35" rx="10" ry="18" fill={color} opacity="0.82" transform="rotate(120 50 50)" />
      <ellipse cx="50" cy="35" rx="10" ry="18" fill={color} opacity="0.82" transform="rotate(240 50 50)" />
      <ellipse cx="50" cy="35" rx="8" ry="16" fill={d} opacity="0.9" transform="rotate(60 50 50)" />
      <ellipse cx="50" cy="35" rx="8" ry="16" fill={d} opacity="0.9" transform="rotate(300 50 50)" />
      <path d="M 40 55 Q 35 68 50 72 Q 65 68 60 55 Q 55 48 50 50 Q 45 48 40 55Z" fill={l} opacity="0.95" />
      <ellipse cx="50" cy="52" rx="5" ry="4" fill="#fffde7" opacity="0.9" />
      <circle cx="50" cy="51" r="2" fill="#fff176" />
    </svg>
  );
});

/* ─── PEONY ───────────────────────────────────────────────── */
const PeonySVG = memo(function PeonySVG({ color, uid }) {
  const d1 = adjustColor(color, -30);
  const d2 = adjustColor(color, -15);
  const l2 = adjustColor(color, 20);
  return (
    <svg viewBox="0 0 100 130" className="w-full h-full" style={{ overflow: "visible" }}>
      <StemAndLeaves uid={uid} />
      {[0, 51, 103, 154, 206, 257, 309].map((a, i) => (
        <ellipse key={`o${i}`} cx="50" cy="48" rx="13" ry="19" fill={d1} opacity="0.75" transform={`rotate(${a} 50 52) translate(0 -4)`} />
      ))}
      {[25, 77, 128, 180, 231, 283, 334].map((a, i) => (
        <ellipse key={`m${i}`} cx="50" cy="48" rx="11" ry="16" fill={d2} opacity="0.83" transform={`rotate(${a} 50 52) translate(0 -2)`} />
      ))}
      {[0, 72, 144, 216, 288].map((a, i) => (
        <ellipse key={`i${i}`} cx="50" cy="48" rx="9" ry="13" fill={color} opacity="0.9" transform={`rotate(${a} 50 52)`} />
      ))}
      {[36, 108, 180, 252, 324].map((a, i) => (
        <ellipse key={`ii${i}`} cx="50" cy="48" rx="6.5" ry="9" fill={l2} opacity="0.92" transform={`rotate(${a} 50 52) translate(0 1.5)`} />
      ))}
      <circle cx="50" cy="52" r="5" fill={color} />
    </svg>
  );
});

/* ─── LOTUS ───────────────────────────────────────────────── */
const LotusSVG = memo(function LotusSVG({ color, uid }) {
  const d = adjustColor(color, -25);
  const l = adjustColor(color, 45);
  return (
    <svg viewBox="0 0 100 130" className="w-full h-full" style={{ overflow: "visible" }}>
      <StemAndLeaves uid={uid} />
      <ellipse cx="50" cy="82" rx="20" ry="5" fill="#2d6b1a" opacity="0.5" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((a, i) => (
        <ellipse key={`lo${i}`} cx="50" cy="52" rx="9" ry="22" fill={d} opacity="0.68" transform={`rotate(${a} 50 56) translate(0 -6)`} />
      ))}
      {[22, 67, 112, 157, 202, 247, 292, 337].map((a, i) => (
        <ellipse key={`lm${i}`} cx="50" cy="52" rx="8" ry="18" fill={color} opacity="0.83" transform={`rotate(${a} 50 56) translate(0 -3)`} />
      ))}
      {[0, 60, 120, 180, 240, 300].map((a, i) => (
        <ellipse key={`li${i}`} cx="50" cy="52" rx="6" ry="14" fill={l} opacity="0.9" transform={`rotate(${a} 50 56)`} />
      ))}
      <circle cx="50" cy="52" r="8" fill="#f5c842" opacity="0.9" />
      <circle cx="50" cy="52" r="2.5" fill="#ffd740" />
    </svg>
  );
});

/* ─── LAVENDER ─────────────────────────────────────────────── */
const LavenderSVG = memo(function LavenderSVG({ color, uid }) {
  const l = adjustColor(color, 30);
  const d = adjustColor(color, -20);
  return (
    <svg viewBox="0 0 100 130" className="w-full h-full" style={{ overflow: "visible" }}>
      <path d="M 50 120 Q 48 95 50 78" stroke="#4a7c2a" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M 50 105 Q 42 95 40 82" stroke="#3a6e20" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M 50 105 Q 58 95 60 82" stroke="#3a6e20" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {[0, 1, 2, 3, 4, 5, 6].map((row) => {
        const y = 75 - row * 5.5;
        const count = row < 3 ? 3 : row < 6 ? 2 : 1;
        return Array.from({ length: count }, (_, j) => {
          const offset = (j - (count - 1) / 2) * 7;
          return (
            <g key={`${row}-${j}`}>
              <ellipse cx={50 + offset - 1.5} cy={y} rx="2.8" ry="3.5" fill={l} opacity="0.9" />
              <ellipse cx={50 + offset + 1.5} cy={y - 1} rx="2.5" ry="3.2" fill={d} opacity="0.85" />
            </g>
          );
        });
      })}
    </svg>
  );
});

/* ─── MAIN COMPONENT ─────────────────────────────────────── */
const flowerTypes = ["hexagon", "star", "diamond", "pentagon", "lotus", "lavender"];
const flowerMap = {
  hexagon: RoseSVG,
  star: SunflowerSVG,
  diamond: OrchidSVG,
  pentagon: PeonySVG,
  lotus: LotusSVG,
  lavender: LavenderSVG,
};

const SacredFlower = memo(function SacredFlower({ type, color, onClick, position, index }) {
  const actualType = flowerTypes[index % flowerTypes.length];
  const FlowerSVG = flowerMap[actualType] || RoseSVG;
  const uid = `f${index}`;
  const delay = index * 0.15;
  const swayDuration = 3.5 + ((index * 1.3) % 3);

  const handleClick = useCallback(() => onClick(), [onClick]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.9, delay, type: "spring", stiffness: 100, damping: 16 }}
      whileHover={{ scale: 1.2, y: -10, transition: { duration: 0.25, ease: "easeOut" } }}
      onClick={handleClick}
      className="absolute cursor-pointer z-30 group"
      style={{ top: position.y, left: position.x, width: 70, height: 90, willChange: "transform" }}
    >
      <motion.div
        className="w-full h-full"
        animate={{ rotate: [-2.5, 2.5, -2.5] }}
        transition={{ duration: swayDuration, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "50% 100%", willChange: "transform" }}
      >
        {/* Ambient glow — CSS only, no JS */}
        <div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background: `radial-gradient(circle, ${rgba(color, 0.5)} 0%, transparent 70%)`,
            transform: "scale(1.6)",
            filter: "blur(6px)",
            opacity: 0.15,
            transition: "opacity 0.3s ease",
          }}
        />

        {/* Flower SVG */}
        <div className="relative w-full h-full">
          <FlowerSVG color={color} uid={uid} />
        </div>

        {/* Hover label — pure CSS opacity */}
        <div
          className="absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100"
          style={{ transition: "opacity 0.2s ease" }}
        >
          <div
            className="px-3 py-1 rounded-full text-[9px] tracking-[0.35em] uppercase font-medium"
            style={{
              background: "rgba(5,20,5,0.88)",
              border: `1px solid ${rgba(color, 0.5)}`,
              color: color,
              backdropFilter: "blur(8px)",
              fontFamily: "'Cormorant Garamond', serif",
            }}
          >
            Memory {index + 1}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
});

export default SacredFlower;
