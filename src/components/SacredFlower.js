"use client";
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

/* ─── Shared: Realistic Stem + Leaves ─────────────────── */
function StemAndLeaves({ color }) {
  return (
    <>
      {/* Realistic stem with gradient */}
      <defs>
        <linearGradient id="stemGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#2d5a1b" />
          <stop offset="40%" stopColor="#4a7c2a" />
          <stop offset="100%" stopColor="#3a6e20" />
        </linearGradient>
        <linearGradient id="leaf1Grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#5a9e2e" />
          <stop offset="100%" stopColor="#3a7020" />
        </linearGradient>
        <linearGradient id="leaf2Grad" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#4e8a28" />
          <stop offset="100%" stopColor="#2d5a18" />
        </linearGradient>
      </defs>
      {/* Main stem */}
      <path
        d="M 50 120 Q 48 98 50 82"
        stroke="url(#stemGrad)" strokeWidth="3.5" fill="none" strokeLinecap="round"
      />
      {/* Stem highlight */}
      <path
        d="M 50 120 Q 49 98 50 82"
        stroke="rgba(120,200,80,0.3)" strokeWidth="1.2" fill="none" strokeLinecap="round"
      />
      {/* Left leaf */}
      <g transform="rotate(-28 38 100)">
        <ellipse cx="38" cy="100" rx="14" ry="5.5" fill="url(#leaf1Grad)" opacity="0.9" />
        {/* Leaf vein */}
        <path d="M 25 100 Q 38 98 51 100" stroke="rgba(255,255,255,0.18)" strokeWidth="0.8" fill="none" />
        {/* Dewdrop */}
        <circle cx="48" cy="100" r="1.5" fill="rgba(200,240,220,0.7)" opacity="0.8" />
      </g>
      {/* Right leaf */}
      <g transform="rotate(22 62 92)">
        <ellipse cx="62" cy="92" rx="12" ry="4.5" fill="url(#leaf2Grad)" opacity="0.85" />
        <path d="M 51 92 Q 62 90 73 92" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" fill="none" />
      </g>
    </>
  );
}

/* ─── ROSE — ultra-realistic layered petals ────────────── */
function RoseSVG({ color }) {
  const d1 = adjustColor(color, -40);
  const d2 = adjustColor(color, -25);
  const l1 = adjustColor(color, 30);
  const l2 = adjustColor(color, 15);

  return (
    <svg viewBox="0 0 100 130" className="w-full h-full" style={{ overflow: "visible" }}>
      <defs>
        <radialGradient id={`roseCenter-${color}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={l1} />
          <stop offset="40%" stopColor={color} />
          <stop offset="100%" stopColor={d1} />
        </radialGradient>
        <radialGradient id={`petalGlow-${color}`} cx="30%" cy="30%" r="70%">
          <stop offset="0%" stopColor={l2} stopOpacity="0.9" />
          <stop offset="100%" stopColor={d1} stopOpacity="0.95" />
        </radialGradient>
        <filter id="rosef">
          <feGaussianBlur in="SourceAlpha" stdDeviation="2" result="blur" />
          <feOffset dx="0" dy="2" result="offset" />
          <feFlood floodColor={d1} floodOpacity="0.3" result="color" />
          <feComposite in="color" in2="offset" operator="in" result="shadow" />
          <feMerge><feMergeNode in="shadow" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      <StemAndLeaves color={color} />

      {/* Outermost guard petals */}
      {[0, 72, 144, 216, 288].map((a, i) => (
        <ellipse key={`g${i}`} cx="50" cy="50" rx="22" ry="12"
          fill={d1} opacity="0.75"
          transform={`rotate(${a} 50 50) translate(0 -14)`}
          filter="url(#rosef)" />
      ))}
      {/* Second ring */}
      {[36, 108, 180, 252, 324].map((a, i) => (
        <ellipse key={`r2${i}`} cx="50" cy="50" rx="20" ry="10.5"
          fill={d2} opacity="0.82"
          transform={`rotate(${a} 50 50) translate(0 -11)`} />
      ))}
      {/* Third ring */}
      {[0, 60, 120, 180, 240, 300].map((a, i) => (
        <ellipse key={`r3${i}`} cx="50" cy="50" rx="17" ry="9"
          fill={color} opacity="0.88"
          transform={`rotate(${a} 50 50) translate(0 -8)`} />
      ))}
      {/* Inner cupped petals */}
      {[30, 90, 150, 210, 270, 330].map((a, i) => (
        <ellipse key={`r4${i}`} cx="50" cy="50" rx="12" ry="6.5"
          fill={l2} opacity="0.9"
          transform={`rotate(${a} 50 50) translate(0 -5.5)`} />
      ))}
      {/* Rose spiral center */}
      <path
        d={`M50 50 Q${47} ${44} 50 41 Q${53} ${38} 50 35 Q${47} ${33} 50 31`}
        fill="none" stroke={l1} strokeWidth="2" strokeLinecap="round" opacity="0.6"
      />
      {/* Center glow disk */}
      <circle cx="50" cy="50" r="8" fill={`url(#roseCenter-${color})`} />
      <circle cx="50" cy="50" r="5" fill={l1} opacity="0.7" />
      <circle cx="48" cy="48" r="1.5" fill="rgba(255,255,200,0.9)" />
    </svg>
  );
}

/* ─── SUNFLOWER — botanically detailed ─────────────────── */
function SunflowerSVG({ color }) {
  const petalCount = 18;
  const warm = "#f5c842";
  const darkWarm = "#d4a017";

  return (
    <svg viewBox="0 0 100 130" className="w-full h-full" style={{ overflow: "visible" }}>
      <defs>
        <radialGradient id="sfCenter" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#4a2800" />
          <stop offset="50%" stopColor="#3d2200" />
          <stop offset="100%" stopColor="#2a1800" />
        </radialGradient>
        <radialGradient id="sfPetal" cx="50%" cy="0%" r="100%">
          <stop offset="0%" stopColor={warm} />
          <stop offset="70%" stopColor={darkWarm} />
          <stop offset="100%" stopColor="#b8880f" />
        </radialGradient>
        <filter id="sfDrop">
          <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#00000033" />
        </filter>
      </defs>
      <StemAndLeaves color={color} />

      {/* Petals — long ray florets */}
      {Array.from({ length: petalCount }).map((_, i) => {
        const angle = (i / petalCount) * 360;
        const isOdd = i % 2 === 1;
        return (
          <ellipse
            key={i}
            cx="50" cy="50"
            rx={isOdd ? "7" : "6"}
            ry={isOdd ? "20" : "18"}
            fill={isOdd ? darkWarm : warm}
            opacity={isOdd ? "0.88" : "0.95"}
            transform={`rotate(${angle} 50 50) translate(0 -${isOdd ? 21 : 19})`}
          />
        );
      })}

      {/* Seed head — realistic with hexagonal pattern dots */}
      <circle cx="50" cy="50" r="16" fill="url(#sfCenter)" filter="url(#sfDrop)" />
      {/* Seed pattern */}
      {Array.from({ length: 37 }).map((_, i) => {
        const phi = (1 + Math.sqrt(5)) / 2;
        const theta = i * 2 * Math.PI / (phi * phi);
        const r = Math.sqrt(i / 37) * 13;
        const x = 50 + r * Math.cos(theta);
        const y = 50 + r * Math.sin(theta);
        return <circle key={i} cx={x} cy={y} r="1.1" fill="#6b3a00" opacity="0.7" />;
      })}
      {/* Center highlight */}
      <circle cx="46" cy="46" r="3" fill="rgba(255,200,100,0.12)" />
    </svg>
  );
}

/* ─── ORCHID — exotic tropical bloom ───────────────────── */
function OrchidSVG({ color }) {
  const d = adjustColor(color, -35);
  const l = adjustColor(color, 40);
  const vein = adjustColor(color, -60);

  return (
    <svg viewBox="0 0 100 130" className="w-full h-full" style={{ overflow: "visible" }}>
      <defs>
        <radialGradient id={`orchidPetal-${color}`} cx="50%" cy="80%" r="80%">
          <stop offset="0%" stopColor={l} />
          <stop offset="60%" stopColor={color} />
          <stop offset="100%" stopColor={d} />
        </radialGradient>
        <filter id="orchidBlur">
          <feGaussianBlur stdDeviation="0.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      <StemAndLeaves color={color} />

      {/* 3 back petals (dorsal) */}
      <ellipse cx="50" cy="35" rx="10" ry="18" fill={`url(#orchidPetal-${color})`} opacity="0.85" />
      <ellipse cx="50" cy="35" rx="10" ry="18" fill={`url(#orchidPetal-${color})`} opacity="0.85"
        transform="rotate(120 50 50)" />
      <ellipse cx="50" cy="35" rx="10" ry="18" fill={`url(#orchidPetal-${color})`} opacity="0.85"
        transform="rotate(240 50 50)" />

      {/* 2 lateral petals */}
      <ellipse cx="50" cy="35" rx="8" ry="16" fill={color} opacity="0.9"
        transform="rotate(60 50 50)" />
      <ellipse cx="50" cy="35" rx="8" ry="16" fill={color} opacity="0.9"
        transform="rotate(300 50 50)" />

      {/* Labellum (lip petal) */}
      <path
        d="M 40 55 Q 35 68 50 72 Q 65 68 60 55 Q 55 48 50 50 Q 45 48 40 55Z"
        fill={l} opacity="0.95"
      />
      {/* Lip veining */}
      <path d="M 50 52 Q 48 62 50 70" stroke={vein} strokeWidth="0.8" fill="none" opacity="0.5" />
      <path d="M 50 52 Q 52 62 50 70" stroke={vein} strokeWidth="0.8" fill="none" opacity="0.5" />

      {/* Column (center reproductive structure) */}
      <ellipse cx="50" cy="52" rx="5" ry="4" fill="#fffde7" opacity="0.9" />
      <circle cx="50" cy="51" r="2" fill="#fff176" />
      <circle cx="49" cy="50" r="0.8" fill="#f9a825" />

      {/* Petal veins */}
      {[0, 120, 240].map((a, i) => (
        <line key={i}
          x1="50" y1="50" x2="50" y2="22"
          stroke={vein} strokeWidth="0.6" opacity="0.3"
          transform={`rotate(${a} 50 50)`}
        />
      ))}
    </svg>
  );
}

/* ─── PEONY — lush layered bloom ───────────────────────── */
function PeonySVG({ color }) {
  const d1 = adjustColor(color, -30);
  const d2 = adjustColor(color, -15);
  const l1 = adjustColor(color, 35);
  const l2 = adjustColor(color, 20);

  const outerAngles = [0, 51, 103, 154, 206, 257, 309];
  const midAngles = [25, 77, 128, 180, 231, 283, 334];
  const innerAngles = [0, 72, 144, 216, 288];

  return (
    <svg viewBox="0 0 100 130" className="w-full h-full" style={{ overflow: "visible" }}>
      <defs>
        <radialGradient id={`peonyG-${color}`} cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor={l1} />
          <stop offset="100%" stopColor={d1} />
        </radialGradient>
        <filter id="peonyF">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor={d1} floodOpacity="0.4" />
        </filter>
      </defs>
      <StemAndLeaves color={color} />

      {/* Sepals */}
      {[0, 72, 144, 216, 288].map((a, i) => (
        <ellipse key={`s${i}`} cx="50" cy="65" rx="4" ry="9"
          fill="#3a7020" opacity="0.7"
          transform={`rotate(${a} 50 65)`} />
      ))}

      {/* Outer ring — large cupped petals */}
      {outerAngles.map((a, i) => (
        <ellipse key={`o${i}`} cx="50" cy="48" rx="14" ry="20"
          fill={d1} opacity="0.78"
          transform={`rotate(${a} 50 52) translate(0 -4)`}
          filter="url(#peonyF)" />
      ))}
      {/* Mid ring */}
      {midAngles.map((a, i) => (
        <ellipse key={`m${i}`} cx="50" cy="48" rx="12" ry="17"
          fill={d2} opacity="0.85"
          transform={`rotate(${a} 50 52) translate(0 -2)`} />
      ))}
      {/* Inner ring */}
      {innerAngles.map((a, i) => (
        <ellipse key={`i${i}`} cx="50" cy="48" rx="10" ry="14"
          fill={color} opacity="0.9"
          transform={`rotate(${a} 50 52)`} />
      ))}
      {/* Innermost petals */}
      {[36, 108, 180, 252, 324].map((a, i) => (
        <ellipse key={`ii${i}`} cx="50" cy="48" rx="7" ry="10"
          fill={l2} opacity="0.92"
          transform={`rotate(${a} 50 52) translate(0 1.5)`} />
      ))}

      {/* Stamens cluster */}
      {Array.from({ length: 20 }).map((_, i) => {
        const angle = (i / 20) * Math.PI * 2;
        const r = 3 + (i % 3) * 1.5;
        const x = 50 + Math.cos(angle) * r;
        const y = 52 + Math.sin(angle) * r;
        return (
          <g key={`st${i}`}>
            <line x1="50" y1="52" x2={x} y2={y}
              stroke="#d4a017" strokeWidth="0.6" opacity="0.7" />
            <circle cx={x} cy={y} r="0.9" fill="#ffd740" opacity="0.9" />
          </g>
        );
      })}
      {/* Center */}
      <circle cx="50" cy="52" r="4" fill={`url(#peonyG-${color})`} />
    </svg>
  );
}

/* ─── LOTUS — serene spiritual bloom ───────────────────── */
function LotusSVG({ color }) {
  const d = adjustColor(color, -25);
  const l = adjustColor(color, 45);

  return (
    <svg viewBox="0 0 100 130" className="w-full h-full" style={{ overflow: "visible" }}>
      <defs>
        <linearGradient id={`lotusGrad-${color}`} x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor={l} />
          <stop offset="100%" stopColor={d} />
        </linearGradient>
        <filter id="lotusGlow">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      <StemAndLeaves color={color} />

      {/* Water lily pad hint at base */}
      <ellipse cx="50" cy="82" rx="20" ry="5" fill="#2d6b1a" opacity="0.5" />
      <path d="M 50 82 L 50 77" stroke="#2d6b1a" strokeWidth="1.5" />

      {/* Outer ring — broad flat petals */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((a, i) => (
        <ellipse key={`lo${i}`} cx="50" cy="52" rx="9" ry="22"
          fill={d} opacity="0.7"
          transform={`rotate(${a} 50 56) translate(0 -6)`} />
      ))}
      {/* Mid ring */}
      {[22, 67, 112, 157, 202, 247, 292, 337].map((a, i) => (
        <ellipse key={`lm${i}`} cx="50" cy="52" rx="8" ry="18"
          fill={color} opacity="0.85"
          transform={`rotate(${a} 50 56) translate(0 -3)`} />
      ))}
      {/* Inner upright petals */}
      {[0, 60, 120, 180, 240, 300].map((a, i) => (
        <ellipse key={`li${i}`} cx="50" cy="52" rx="6" ry="14"
          fill={`url(#lotusGrad-${color})`} opacity="0.92"
          transform={`rotate(${a} 50 56) translate(0 0)`} />
      ))}
      {/* Center — golden receptacle */}
      <circle cx="50" cy="52" r="8" fill="#f5c842" opacity="0.9" filter="url(#lotusGlow)" />
      <circle cx="50" cy="52" r="5.5" fill="#e6b020" />
      {/* Seed pods */}
      {Array.from({ length: 9 }).map((_, i) => {
        const a = (i / 9) * Math.PI * 2;
        return <circle key={i} cx={50 + Math.cos(a) * 3.5} cy={52 + Math.sin(a) * 3.5}
          r="1.2" fill="#a07800" opacity="0.8" />;
      })}
      <circle cx="50" cy="52" r="2.5" fill="#ffd740" />
    </svg>
  );
}

/* ─── LAVENDER — delicate spired bloom ─────────────────── */
function LavenderSVG({ color }) {
  const l = adjustColor(color, 30);
  const d = adjustColor(color, -20);

  return (
    <svg viewBox="0 0 100 130" className="w-full h-full" style={{ overflow: "visible" }}>
      <defs>
        <linearGradient id={`lavGrad-${color}`} x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor={l} />
          <stop offset="100%" stopColor={d} />
        </linearGradient>
      </defs>
      {/* Multiple stems for lavender spike look */}
      <path d="M 50 120 Q 48 95 50 78" stroke="#4a7c2a" strokeWidth="3" fill="none" strokeLinecap="round" />
      {/* Side stems */}
      <path d="M 50 105 Q 42 95 40 82" stroke="#3a6e20" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M 50 105 Q 58 95 60 82" stroke="#3a6e20" strokeWidth="1.5" fill="none" strokeLinecap="round" />

      {/* Leaves — narrow lance-shaped */}
      {[-35, -20, 20, 35].map((a, i) => (
        <ellipse key={i} cx={i < 2 ? "42" : "58"} cy={i < 2 ? "105" : "100"}
          rx="3" ry="9" fill="#4a8a28" opacity="0.8"
          transform={`rotate(${a} ${i < 2 ? "42" : "58"} ${i < 2 ? "105" : "100"})`} />
      ))}

      {/* Lavender floret clusters — stacked along spike */}
      {[0, 1, 2, 3, 4, 5, 6, 7].map((row) => {
        const y = 75 - row * 5.5;
        const count = row < 3 ? 3 : row < 6 ? 2 : 1;
        return Array.from({ length: count }).map((_, j) => {
          const offset = (j - (count - 1) / 2) * 7;
          return (
            <g key={`${row}-${j}`}>
              {/* Bract */}
              <ellipse cx={50 + offset} cy={y + 3} rx="2.5" ry="4.5"
                fill="#5a8c2a" opacity="0.6" />
              {/* Floret pair */}
              <ellipse cx={50 + offset - 1.5} cy={y} rx="2.8" ry="3.5"
                fill={`url(#lavGrad-${color})`} opacity="0.9" />
              <ellipse cx={50 + offset + 1.5} cy={y - 1} rx="2.5" ry="3.2"
                fill={l} opacity="0.85" />
            </g>
          );
        });
      })}
    </svg>
  );
}

/* ─── MAIN COMPONENT ─────────────────────────────────────── */
const flowerMap = {
  hexagon: RoseSVG,
  star: SunflowerSVG,
  diamond: OrchidSVG,
  pentagon: PeonySVG,
  lotus: LotusSVG,
  lavender: LavenderSVG,
};

export default function SacredFlower({ type, color, onClick, position, index }) {
  // Cycle through all flower types based on index for variety
  const types = ["hexagon", "star", "diamond", "pentagon", "lotus", "lavender"];
  const actualType = types[index % types.length];
  const FlowerSVG = flowerMap[actualType] || RoseSVG;

  const delay = index * 0.18;
  const swayDuration = 3.5 + ((index * 1.3) % 3);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 1.1, delay, type: "spring", stiffness: 90, damping: 14 }}
      whileHover={{ scale: 1.22, y: -12, transition: { duration: 0.35, ease: "easeOut" } }}
      onClick={onClick}
      className="absolute cursor-pointer z-30 group"
      style={{ top: position.y, left: position.x, width: 70, height: 90 }}
    >
      {/* Swaying animation */}
      <motion.div
        className="w-full h-full"
        animate={{ rotate: [-2.5, 2.5, -2.5] }}
        transition={{ duration: swayDuration, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "50% 100%" }}
      >
        {/* Bioluminescent ground glow */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 h-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse, ${rgba(color, 0.55)} 0%, transparent 70%)`,
            filter: "blur(6px)",
          }}
        />
        {/* Ambient glow behind flower */}
        <div
          className="absolute inset-0 rounded-full opacity-20 group-hover:opacity-50 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(circle, ${rgba(color, 0.7)} 0%, transparent 70%)`,
            transform: "scale(1.8)",
            filter: "blur(8px)",
          }}
        />

        {/* The flower */}
        <div className="relative w-full h-full">
          <FlowerSVG color={color} />
        </div>

        {/* Memory label — appears on hover */}
        <motion.div
          className="absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100"
          style={{ transition: "opacity 0.25s ease" }}
        >
          <div
            className="px-3 py-1 rounded-full text-[9px] tracking-[0.35em] uppercase font-medium"
            style={{
              background: "rgba(5,20,5,0.85)",
              border: `1px solid ${rgba(color, 0.5)}`,
              color: color,
              backdropFilter: "blur(10px)",
              boxShadow: `0 2px 12px ${rgba(color, 0.3)}`,
              fontFamily: "'Cormorant Garamond', serif",
            }}
          >
            Memory {index + 1}
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
