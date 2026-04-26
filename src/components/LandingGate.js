"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

/* Moonlit firefly */
function Firefly({ left, top, delay, size }) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        left: `${left}%`,
        top: `${top}%`,
        width: size,
        height: size,
        backgroundColor: "#d4f5a0",
        boxShadow: `0 0 ${size * 3}px ${size * 2}px rgba(180, 245, 100, 0.5)`,
      }}
      animate={{
        opacity: [0, 0.9, 0.2, 1, 0],
        x: [0, 15, -10, 20, 0],
        y: [0, -20, 10, -30, 0],
      }}
      transition={{ duration: 5 + delay, delay, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

/* Detailed grass blade */
function GrassBlade({ x, height, width, color, delay }) {
  return (
    <motion.path
      d={`M ${x} 100 Q ${x - width * 1.5} ${100 - height * 0.6} ${x - width * 0.5} ${100 - height}`}
      fill={color}
      initial={{ scaleY: 0, transformOrigin: `${x}px 100px` }}
      animate={{
        scaleY: 1,
        rotate: [0, (Math.random() - 0.5) * 4, 0],
      }}
      transition={{
        scaleY: { duration: 1.2, delay, ease: "easeOut" },
        rotate: {
          duration: 3 + Math.random() * 2,
          delay: delay + 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
      style={{ transformOrigin: `${x}px 100px` }}
    />
  );
}

export default function LandingGate({ onEnter }) {
  const [fireflies] = useState(() =>
    Array.from({ length: 22 }, (_, i) => ({
      left: (i * 4.7 + 5) % 90,
      top: 15 + ((i * 7.3) % 65),
      delay: (i * 0.7) % 6,
      size: 2 + ((i * 3) % 4),
    }))
  );

  // Grass blades data
  const grassBlades = Array.from({ length: 80 }, (_, i) => ({
    x: (i * 1.26) % 100,
    height: 8 + ((i * 3.7) % 18),
    width: 0.4 + ((i * 0.3) % 0.8),
    color: i % 3 === 0 ? "#2d6b18" : i % 3 === 1 ? "#3a8020" : "#4a9a28",
    delay: (i * 0.04) % 1.5,
  }));

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #020a04 0%, #071408 15%, #0d2010 35%, #0f2a12 55%, #142d14 75%, #1a3a1a 100%)",
      }}
    >
      {/* Stars */}
      {Array.from({ length: 120 }).map((_, i) => (
        <motion.div
          key={`star-${i}`}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: `${(i * 0.831) % 100}%`,
            top: `${(i * 0.631) % 55}%`,
            width: i % 5 === 0 ? 2.5 : i % 3 === 0 ? 1.5 : 1,
            height: i % 5 === 0 ? 2.5 : i % 3 === 0 ? 1.5 : 1,
            backgroundColor: i % 7 === 0 ? "#fffde7" : "white",
            boxShadow: i % 5 === 0 ? "0 0 6px 2px rgba(255,253,200,0.6)" : "none",
          }}
          animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.3, 1] }}
          transition={{
            duration: 2 + ((i * 0.37) % 4),
            delay: (i * 0.13) % 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Moon */}
      <motion.div
        className="absolute"
        style={{ top: "6%", right: "10%", width: 90, height: 90 }}
        animate={{ opacity: [0.85, 1, 0.85] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <div
          style={{
            width: 90, height: 90, borderRadius: "50%",
            background: "radial-gradient(circle at 35% 35%, #fffde7 0%, #fff8c5 40%, #f5e660 100%)",
            boxShadow: "0 0 40px 15px rgba(255,248,150,0.25), 0 0 80px 30px rgba(255,240,100,0.12)",
          }}
        />
        {/* Moon craters */}
        <div style={{ position:"absolute", top:"30%", left:"55%", width:10, height:10, borderRadius:"50%", background:"rgba(200,180,60,0.4)" }} />
        <div style={{ position:"absolute", top:"55%", left:"30%", width:6, height:6, borderRadius:"50%", background:"rgba(200,180,60,0.3)" }} />
      </motion.div>

      {/* Moonlight beam */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: 0, right: "14%", width: 120, height: "100%",
          background: "linear-gradient(180deg, rgba(255,250,180,0.07) 0%, rgba(255,250,180,0.03) 50%, transparent 100%)",
          transform: "skewX(-5deg)",
        }}
      />

      {/* Mist layers */}
      {[0.12, 0.08, 0.06].map((opacity, i) => (
        <motion.div
          key={`mist-${i}`}
          className="absolute pointer-events-none"
          style={{
            bottom: `${10 + i * 8}%`, left: "-10%", right: "-10%",
            height: "12%",
            background: `radial-gradient(ellipse 80% 100% at 50% 50%, rgba(200,240,220,${opacity}) 0%, transparent 70%)`,
            filter: "blur(20px)",
          }}
          animate={{ x: ["-5%", "5%", "-5%"], opacity: [opacity * 0.6, opacity, opacity * 0.6] }}
          transition={{ duration: 18 + i * 6, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      {/* Forest silhouette trees */}
      <svg
        className="absolute bottom-0 left-0 right-0 w-full pointer-events-none"
        viewBox="0 0 1000 300" preserveAspectRatio="none"
        style={{ height: "42%" }}
      >
        {/* Deep background trees */}
        {[50, 120, 200, 280, 360, 440, 510, 580, 660, 730, 810, 880, 950].map((x, i) => {
          const h = 160 + ((i * 23) % 80);
          const w = 50 + ((i * 11) % 40);
          return (
            <g key={`tree-bg-${i}`}>
              <path d={`M${x} 300 L${x} ${300 - h} L${x - w / 2} 300Z`}
                fill={i % 3 === 0 ? "#0a1f0a" : "#081808"} opacity="0.9" />
            </g>
          );
        })}
        {/* Mid trees */}
        {[30, 100, 170, 250, 330, 405, 480, 555, 630, 700, 775, 845, 920].map((x, i) => {
          const h = 120 + ((i * 19) % 60);
          const w = 45 + ((i * 13) % 35);
          return (
            <path key={`tree-mid-${i}`}
              d={`M${x} 300 L${x} ${300 - h} Q${x + w * 0.3} ${300 - h * 0.5} ${x + w} 300Z`}
              fill={i % 2 === 0 ? "#0f2a0f" : "#112e11"} opacity="0.95" />
          );
        })}
        {/* Foreground dense brush */}
        <path d="M 0 300 Q 100 240 200 260 Q 300 250 400 270 Q 500 245 600 265 Q 700 250 800 268 Q 900 252 1000 262 L 1000 300Z"
          fill="#142d12" />
        <path d="M 0 300 Q 80 258 160 275 Q 250 260 340 278 Q 430 265 520 280 Q 610 268 700 282 Q 790 270 880 280 Q 940 273 1000 278 L 1000 300Z"
          fill="#1a3a18" />

        {/* Grass */}
        {grassBlades.map((blade, i) => (
          <GrassBlade key={i} {...blade} x={blade.x * 10} />
        ))}

        {/* Foreground flowers */}
        {[80, 190, 310, 430, 540, 670, 780, 900].map((x, i) => {
          const colors = ["#c2185b","#e91e63","#ad1457","#f06292","#ec407a","#f48fb1","#ff80ab","#e040fb"];
          const c = colors[i % colors.length];
          return (
            <g key={`fg-flower-${i}`}>
              <line x1={x} y1="290" x2={x} y2={`${268 - ((i*7)%15)}`} stroke="#2d6b18" strokeWidth="2" />
              {[0,72,144,216,288].map((a, j) => (
                <ellipse key={j}
                  cx={x} cy={265 - ((i*7)%15)}
                  rx="4" ry="7" fill={c} opacity="0.85"
                  transform={`rotate(${a} ${x} ${265 - ((i*7)%15)})`} />
              ))}
              <circle cx={x} cy={265 - ((i*7)%15)} r="3" fill="#ffd740" opacity="0.9" />
            </g>
          );
        })}
      </svg>

      {/* Fireflies */}
      {fireflies.map((ff, i) => <Firefly key={i} {...ff} />)}

      {/* Falling petals */}
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={`petal-${i}`}
          className="absolute pointer-events-none rounded-[50%_30%_50%_30%]"
          style={{
            left: `${(i * 6.7) % 100}%`,
            top: "-3%",
            width: 6 + ((i * 3) % 6),
            height: 4 + ((i * 2) % 5),
            backgroundColor: ["#f48fb1","#ce93d8","#ffab91","#fff176","#a5d6a7"][i % 5],
            opacity: 0.65,
          }}
          animate={{ y: ["0vh", "110vh"], x: [0, 30 + (i % 3) * 20, -20, 15, 0], rotate: [0, 180, 360] }}
          transition={{ duration: 12 + ((i * 2.3) % 10), delay: (i * 0.8) % 10, repeat: Infinity, ease: "linear" }}
        />
      ))}

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 2, ease: "easeOut", delay: 0.4 }}
        className="text-center relative z-10 flex flex-col items-center"
      >
        {/* Ornate botanical frame */}
        <motion.div
          className="mb-8"
          animate={{ scale: [1, 1.04, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg width="120" height="100" viewBox="0 0 120 100">
            {/* Decorative botanical circle */}
            <circle cx="60" cy="50" r="38" fill="none" stroke="rgba(180,230,120,0.3)" strokeWidth="0.8" />
            <circle cx="60" cy="50" r="33" fill="none" stroke="rgba(180,230,120,0.2)" strokeWidth="0.5" strokeDasharray="4 3" />
            {/* Leaf accents */}
            {[0,45,90,135,180,225,270,315].map((a, i) => (
              <ellipse key={i} cx="60" cy="12" rx="3" ry="7" fill="#4a9a28" opacity="0.5"
                transform={`rotate(${a} 60 50)`} />
            ))}
            {/* Center rose */}
            {[0,60,120,180,240,300].map((a, i) => (
              <ellipse key={i} cx="60" cy="50" rx="12" ry="7" fill="#c2185b" opacity="0.7"
                transform={`rotate(${a} 60 50) translate(0 -6)`} />
            ))}
            <circle cx="60" cy="50" r="6" fill="#ffd740" opacity="0.9" />
            <circle cx="60" cy="50" r="3.5" fill="#f9a825" />
          </svg>
        </motion.div>

        {/* Title */}
        <p
          className="text-[11px] tracking-[0.7em] uppercase mb-3 font-medium"
          style={{ color: "rgba(180,240,130,0.7)", fontFamily: "'Cormorant Garamond', serif", letterSpacing: "0.6em" }}
        >
          A Garden of Memories
        </p>

        <h2
          className="text-4xl md:text-5xl font-light mb-3 tracking-widest"
          style={{
            color: "#f5f0e8",
            fontFamily: "'Playfair Display', Georgia, serif",
            textShadow: "0 0 40px rgba(200,250,150,0.25), 0 2px 4px rgba(0,0,0,0.5)",
          }}
        >
          For Uriel
        </h2>

        <p
          className="mb-12 text-[12px] tracking-[0.35em] uppercase"
          style={{ color: "rgba(160,220,100,0.55)", fontFamily: "'Cormorant Garamond', serif" }}
        >
          Ten memories · One beautiful soul
        </p>

        {/* Enter button */}
        <motion.button
          onClick={onEnter}
          whileHover={{ scale: 1.06, y: -2 }}
          whileTap={{ scale: 0.96 }}
          className="relative group px-12 py-4 rounded-full font-medium tracking-[0.3em] uppercase text-[11px] overflow-hidden"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(160,230,100,0.35)",
            color: "#c8f090",
            fontFamily: "'Cormorant Garamond', serif",
            backdropFilter: "blur(16px)",
            boxShadow: "0 0 30px rgba(120,200,60,0.15), inset 0 1px 0 rgba(255,255,255,0.06)",
          }}
        >
          {/* Shimmer */}
          <span
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: "linear-gradient(120deg, transparent 20%, rgba(180,240,120,0.12) 50%, transparent 80%)",
              animation: "shimmer 1.8s infinite",
            }}
          />
          <span className="relative flex items-center gap-3">
            <span style={{ fontSize: "14px" }}>✦</span>
            Enter the Garden
            <span style={{ fontSize: "14px" }}>✦</span>
          </span>
        </motion.button>
      </motion.div>
    </div>
  );
}
