"use client";
import { memo } from "react";
import { motion } from "framer-motion";

const LightVine = memo(function LightVine({ isActive }) {
  if (!isActive) return null;

  return (
    <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
      {/* Top vine — simplified, fewer animated elements */}
      <svg className="absolute top-0 left-0 w-full" viewBox="0 0 100 28" preserveAspectRatio="none" style={{ height: "10%" }}>
        <defs>
          <linearGradient id="vineGradTop" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3a8020" stopOpacity="0" />
            <stop offset="25%" stopColor="#3a8020" stopOpacity="0.45" />
            <stop offset="75%" stopColor="#3a8020" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#3a8020" stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.path
          d="M -3 20 C 8 6, 18 22, 28 12 S 48 4, 58 14 S 78 20, 88 10 S 98 6, 103 13"
          fill="none" stroke="url(#vineGradTop)" strokeWidth="0.7" strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 3, delay: 0.5, ease: "easeInOut" }}
        />
        {/* Static leaves — no per-leaf animation, just fade in as group */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 1.5, delay: 2.5 }}
        >
          {[
            { x: 8,  y: 16, r: -40 }, { x: 18, y: 10, r: 30 }, { x: 28, y: 14, r: -55 },
            { x: 38, y: 9,  r: 45  }, { x: 50, y: 12, r: -35 }, { x: 62, y: 8,  r: 50  },
            { x: 72, y: 13, r: -28 }, { x: 82, y: 10, r: 40  }, { x: 92, y: 15, r: -45 },
          ].map((leaf, i) => (
            <ellipse key={i} cx={leaf.x} cy={leaf.y} rx="2.5" ry="1.1" fill="#4a9a28"
              transform={`rotate(${leaf.r} ${leaf.x} ${leaf.y})`} />
          ))}
        </motion.g>

        {/* Accent flowers — group animated */}
        <motion.g
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.65, scale: 1 }}
          transition={{ duration: 0.6, delay: 2.8, ease: "backOut" }}
        >
          {[
            { x: 22, y: 8,  color: "#f48fb1", r: 2.5 },
            { x: 45, y: 11, color: "#ce93d8", r: 2.2 },
            { x: 68, y: 7,  color: "#80deea", r: 2.0 },
            { x: 88, y: 12, color: "#ffab91", r: 2.3 },
          ].map((f, i) => (
            <g key={i}>
              {[0, 72, 144, 216, 288].map((a, j) => (
                <ellipse key={j} cx={f.x} cy={f.y} rx={f.r} ry={f.r * 0.45} fill={f.color} opacity="0.8"
                  transform={`rotate(${a} ${f.x} ${f.y}) translate(0 -${f.r * 0.8})`} />
              ))}
              <circle cx={f.x} cy={f.y} r={f.r * 0.35} fill="#ffd740" opacity="0.9" />
            </g>
          ))}
        </motion.g>
      </svg>

      {/* Left vine — single path + static leaves */}
      <svg className="absolute left-0 top-0 h-full" viewBox="0 0 8 100" preserveAspectRatio="none" style={{ width: "3%" }}>
        <motion.path
          d="M 4 5 C 1 20, 7 30, 3 45 S 6 60, 2 75 S 5 90, 4 100"
          fill="none" stroke="rgba(60,140,30,0.22)" strokeWidth="0.8" strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 3.5, delay: 1.5, ease: "easeInOut" }}
        />
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 0.38 }} transition={{ delay: 3.5, duration: 1 }}>
          {[15, 32, 50, 68, 84].map((y, i) => (
            <ellipse key={i} cx={i % 2 === 0 ? 6 : 2} cy={y} rx="2.2" ry="1"
              fill="#3a8020" transform={`rotate(${i % 2 === 0 ? 30 : -30} ${i % 2 === 0 ? 6 : 2} ${y})`} />
          ))}
        </motion.g>
      </svg>

      {/* Right vine */}
      <svg className="absolute right-0 top-0 h-full" viewBox="0 0 8 100" preserveAspectRatio="none" style={{ width: "3%" }}>
        <motion.path
          d="M 4 3 C 7 18, 1 28, 5 43 S 2 58, 6 73 S 3 88, 4 100"
          fill="none" stroke="rgba(60,140,30,0.18)" strokeWidth="0.8" strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 4, delay: 2, ease: "easeInOut" }}
        />
        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 0.33 }} transition={{ delay: 4, duration: 1 }}>
          {[12, 28, 48, 65, 80].map((y, i) => (
            <ellipse key={i} cx={i % 2 === 0 ? 2 : 6} cy={y} rx="2" ry="0.9"
              fill="#3a8020" transform={`rotate(${i % 2 === 0 ? -30 : 30} ${i % 2 === 0 ? 2 : 6} ${y})`} />
          ))}
        </motion.g>
      </svg>
    </div>
  );
});

export default LightVine;
