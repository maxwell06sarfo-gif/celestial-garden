"use client";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";

export default function LandingGate({ onEnter }) {
  // Pre-compute all random data once with useMemo — no re-renders
  const stars = useMemo(() => Array.from({ length: 45 }, (_, i) => ({
    left: (i * 1.666) % 100,
    top: (i * 0.921) % 55,
    size: i % 5 === 0 ? 2 : 1,
    dur: 2.5 + ((i * 0.4) % 3),
    delay: (i * 0.18) % 5,
    bright: i % 5 === 0,
  })), []);

  const fireflies = useMemo(() => Array.from({ length: 14 }, (_, i) => ({
    left: (i * 7.1 + 4) % 90,
    top: 18 + ((i * 6.3) % 60),
    size: 2 + ((i * 1.1) % 3),
    dur: 4 + ((i * 1.2) % 5),
    delay: (i * 0.7) % 6,
    xR: 25 + ((i * 8) % 40),
    yR: 18 + ((i * 5) % 32),
  })), []);

  const petals = useMemo(() => Array.from({ length: 10 }, (_, i) => ({
    left: (i * 10) % 100,
    size: 6 + ((i * 3) % 6),
    dur: 14 + ((i * 2) % 10),
    delay: (i * 1.1) % 10,
    color: ["#f48fb1","#ce93d8","#ffab91","#fff176","#a5d6a7"][i % 5],
    xO: 25 + (i % 3) * 18,
    rot: i * 40,
  })), []);

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #020a04 0%, #071408 15%, #0d2010 40%, #142d14 75%, #1a3a1a 100%)",
      }}
    >
      {/* Stars — pure CSS, zero JS per frame */}
      <style>{`@keyframes lgStar{0%,100%{opacity:0.18}50%{opacity:0.88}}.lg-star{position:absolute;border-radius:50%;pointer-events:none;animation:lgStar var(--d) var(--dl) ease-in-out infinite;}`}</style>
      {stars.map((s, i) => (
        <div
          key={i}
          className="lg-star"
          style={{
            left: `${s.left}%`, top: `${s.top}%`,
            width: s.size, height: s.size,
            backgroundColor: s.bright ? "#fffde7" : "white",
            "--d": `${s.dur}s`, "--dl": `${s.delay}s`,
          }}
        />
      ))}

      {/* Moon */}
      <motion.div
        className="absolute"
        style={{ top: "6%", right: "9%", width: 80, height: 80, willChange: "opacity" }}
        animate={{ opacity: [0.85, 1, 0.85] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <div style={{
          width: 80, height: 80, borderRadius: "50%",
          background: "radial-gradient(circle at 35% 35%, #fffde7 0%, #fff8c5 40%, #f5e660 100%)",
          boxShadow: "0 0 35px 12px rgba(255,248,150,0.22), 0 0 70px 25px rgba(255,240,100,0.1)",
        }} />
      </motion.div>

      {/* Moonlight beam */}
      <div className="absolute pointer-events-none" style={{
        top: 0, right: "13%", width: 100, height: "100%",
        background: "linear-gradient(180deg, rgba(255,250,180,0.06) 0%, rgba(255,250,180,0.02) 60%, transparent 100%)",
        transform: "skewX(-5deg)",
      }} />

      {/* Mist — CSS only, no framer-motion */}
      <div className="absolute pointer-events-none" style={{
        bottom: "12%", left: "-5%", right: "-5%", height: "10%",
        background: "radial-gradient(ellipse 80% 100% at 50% 50%, rgba(200,240,220,0.1) 0%, transparent 70%)",
        filter: "blur(18px)",
        animation: "mistDrift 20s ease-in-out infinite",
      }} />

      {/* Forest silhouette — single static SVG, no animation */}
      <svg
        className="absolute bottom-0 left-0 right-0 w-full pointer-events-none"
        viewBox="0 0 1000 220" preserveAspectRatio="none"
        style={{ height: "36%" }}
      >
        {/* Back trees */}
        <path d="M0 220 Q100 140 200 170 Q300 150 400 175 Q500 148 600 172 Q700 150 800 170 Q900 148 1000 165 L1000 220Z"
          fill="#0a1f0a" />
        {/* Mid trees */}
        <path d="M0 220 Q80 158 160 180 Q250 162 340 185 Q430 165 520 185 Q610 166 700 183 Q790 165 880 180 Q940 168 1000 175 L1000 220Z"
          fill="#0f2a0f" />
        {/* Foreground */}
        <path d="M0 220 Q60 185 120 198 Q200 186 280 200 Q370 188 450 202 Q540 190 620 202 Q700 190 780 200 Q860 190 940 198 Q970 193 1000 195 L1000 220Z"
          fill="#142d14" />
        {/* Simplified grass — static */}
        {Array.from({ length: 40 }, (_, i) => {
          const x = (i * 25) % 1000;
          const h = 14 + ((i * 5) % 22);
          const b = (i % 2 === 0 ? -1 : 1) * (3 + ((i * 2) % 5));
          return <path key={i}
            d={`M${x} 220 Q${x+b} ${220-h*0.6} ${x+b*0.4} ${220-h}`}
            stroke={i%3===0?"#2d6b18":i%3===1?"#3a8020":"#4a9a28"}
            strokeWidth="0.9" fill="none" strokeLinecap="round" />;
        })}
        {/* A few foreground flowers */}
        {[120, 280, 450, 610, 760, 900].map((x, i) => {
          const cols = ["#f48fb1","#ce93d8","#ffab91","#80deea","#f06292","#b39ddb"];
          const c = cols[i % cols.length];
          const h = 200 - ((i*5)%14);
          return <g key={i}>
            <line x1={x} y1="218" x2={x} y2={h} stroke="#2d6b18" strokeWidth="1.5"/>
            {[0,72,144,216,288].map((a,j) => (
              <ellipse key={j} cx={x} cy={h} rx="3.5" ry="6.5" fill={c} opacity="0.85"
                transform={`rotate(${a} ${x} ${h})`} />
            ))}
            <circle cx={x} cy={h} r="2.5" fill="#ffd740" opacity="0.9"/>
          </g>;
        })}
      </svg>

      {/* Fireflies */}
      {fireflies.map((ff, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: `${ff.left}%`, top: `${ff.top}%`,
            width: ff.size, height: ff.size,
            backgroundColor: "#c8f090",
            willChange: "transform, opacity",
          }}
          animate={{
            opacity: [0, 0.9, 0.1, 0.85, 0],
            x: [0, ff.xR*0.5, -ff.xR*0.3, ff.xR*0.7, 0],
            y: [0, -ff.yR*0.6, ff.yR*0.3, -ff.yR, 0],
            boxShadow: [
              "0 0 0px 0px rgba(180,245,100,0)",
              `0 0 ${ff.size*5}px ${ff.size*2}px rgba(180,245,100,0.6)`,
              "0 0 0px 0px rgba(180,245,100,0)",
            ],
          }}
          transition={{ duration: ff.dur, delay: ff.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      {/* Petals */}
      {petals.map((p, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none"
          style={{
            left: `${p.left}%`, top: "-2%",
            width: p.size, height: p.size * 0.65,
            backgroundColor: p.color,
            borderRadius: "50% 30% 50% 30%",
            opacity: 0.65,
            willChange: "transform",
          }}
          animate={{ y: ["0vh", "108vh"], x: [0, p.xO, -p.xO*0.5, p.xO*0.3, 0], rotate: [p.rot, p.rot+360] }}
          transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: "linear" }}
        />
      ))}

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.6, ease: "easeOut", delay: 0.3 }}
        className="text-center relative z-10 flex flex-col items-center"
      >
        {/* Botanical icon */}
        <motion.div
          className="mb-7"
          animate={{ scale: [1, 1.04, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg width="100" height="86" viewBox="0 0 120 100">
            <circle cx="60" cy="50" r="36" fill="none" stroke="rgba(180,230,120,0.25)" strokeWidth="0.8" />
            <circle cx="60" cy="50" r="31" fill="none" stroke="rgba(180,230,120,0.15)" strokeWidth="0.5" strokeDasharray="4 3" />
            {[0,45,90,135,180,225,270,315].map((a,i) => (
              <ellipse key={i} cx="60" cy="15" rx="2.5" ry="6" fill="#4a9a28" opacity="0.45"
                transform={`rotate(${a} 60 50)`} />
            ))}
            {[0,60,120,180,240,300].map((a,i) => (
              <ellipse key={i} cx="60" cy="50" rx="11" ry="6.5" fill="#c2185b" opacity="0.65"
                transform={`rotate(${a} 60 50) translate(0 -6)`} />
            ))}
            <circle cx="60" cy="50" r="5.5" fill="#ffd740" opacity="0.9" />
            <circle cx="60" cy="50" r="3" fill="#f9a825" />
          </svg>
        </motion.div>

        <p style={{
          color: "rgba(180,240,130,0.65)", fontSize: "10px",
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          letterSpacing: "0.65em", textTransform: "uppercase", marginBottom: "10px", fontWeight: 500,
        }}>
          A Garden of Memories
        </p>

        <h2 style={{
          color: "#f5f0e8", fontSize: "clamp(2rem, 5vw, 3rem)",
          fontFamily: "'Playfair Display', Georgia, serif",
          fontWeight: 300, letterSpacing: "0.12em", marginBottom: "10px",
          textShadow: "0 0 40px rgba(200,250,150,0.2), 0 2px 4px rgba(0,0,0,0.5)",
        }}>
          For Uriel
        </h2>

        <p style={{
          marginBottom: "44px", fontSize: "11px", letterSpacing: "0.35em",
          textTransform: "uppercase", color: "rgba(160,220,100,0.5)",
          fontFamily: "'Cormorant Garamond', Georgia, serif",
        }}>
          Ten memories · One beautiful soul
        </p>

        <motion.button
          onClick={onEnter}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.96 }}
          style={{
            padding: "14px 48px", borderRadius: "999px",
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontWeight: 500, letterSpacing: "0.3em",
            textTransform: "uppercase", fontSize: "11px",
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(160,230,100,0.35)",
            color: "#c8f090",
            backdropFilter: "blur(12px)",
            boxShadow: "0 0 28px rgba(120,200,60,0.14), inset 0 1px 0 rgba(255,255,255,0.06)",
            cursor: "pointer",
            willChange: "transform",
          }}
        >
          ✦ Enter the Garden ✦
        </motion.button>
      </motion.div>
    </div>
  );
}
