"use client";
import { motion } from "framer-motion";

export default function LightVine({ isActive }) {
  if (!isActive) return null;

  const leafPositions = [
    { x: 8, y: 18, r: -40, d: 1.2, size: [2.5, 1.1] },
    { x: 18, y: 12, r: 30, d: 1.6, size: [3, 1.3] },
    { x: 28, y: 16, r: -55, d: 2.0, size: [2.2, 1.0] },
    { x: 38, y: 11, r: 45, d: 2.4, size: [3.2, 1.4] },
    { x: 50, y: 14, r: -35, d: 2.8, size: [2.8, 1.2] },
    { x: 62, y: 10, r: 50, d: 3.2, size: [2.5, 1.1] },
    { x: 72, y: 15, r: -28, d: 3.6, size: [3.0, 1.3] },
    { x: 82, y: 12, r: 40, d: 4.0, size: [2.3, 1.0] },
    { x: 92, y: 17, r: -45, d: 4.4, size: [2.8, 1.2] },
  ];

  const flowerAccents = [
    { x: 22, y: 10, d: 2.2, color: "#f48fb1", r: 2.5 },
    { x: 45, y: 13, d: 3.0, color: "#ce93d8", r: 2.2 },
    { x: 68, y: 9, d: 3.8, color: "#80deea", r: 2.0 },
    { x: 88, y: 14, d: 4.6, color: "#ffab91", r: 2.3 },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
      <svg className="absolute top-0 left-0 w-full" viewBox="0 0 100 30" preserveAspectRatio="none" style={{ height: "12%" }}>
        <defs>
          <linearGradient id="vineGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#2d6b18" stopOpacity="0" />
            <stop offset="20%" stopColor="#3a8020" stopOpacity="0.5" />
            <stop offset="80%" stopColor="#3a8020" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#2d6b18" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="vineGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#4a9a28" stopOpacity="0" />
            <stop offset="30%" stopColor="#5ab030" stopOpacity="0.35" />
            <stop offset="70%" stopColor="#5ab030" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#4a9a28" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Main vine — thick and graceful */}
        <motion.path
          d="M -3 22 C 8 8, 18 24, 28 14 S 48 6, 58 16 S 78 22, 88 12 S 98 8, 103 15"
          fill="none" stroke="url(#vineGrad1)" strokeWidth="0.7" strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 4, delay: 0.8, ease: "easeInOut" }}
        />
        {/* Secondary vine */}
        <motion.path
          d="M -3 28 C 12 18, 22 28, 35 20 S 55 14, 65 22 S 82 28, 92 20 S 100 18, 103 22"
          fill="none" stroke="url(#vineGrad2)" strokeWidth="0.45" strokeLinecap="round"
          strokeDasharray="2 3"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.8 }}
          transition={{ duration: 4.5, delay: 1.3, ease: "easeInOut" }}
        />
        {/* Tertiary tendril */}
        <motion.path
          d="M 10 25 C 15 12, 20 20, 25 15"
          fill="none" stroke="rgba(80,160,40,0.3)" strokeWidth="0.35" strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, delay: 3, ease: "easeOut" }}
        />
        <motion.path
          d="M 60 18 C 65 8, 70 16, 75 12"
          fill="none" stroke="rgba(80,160,40,0.3)" strokeWidth="0.35" strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, delay: 3.8, ease: "easeOut" }}
        />

        {/* Leaves along vine */}
        {leafPositions.map((leaf, i) => (
          <motion.ellipse
            key={i}
            cx={leaf.x} cy={leaf.y}
            rx={leaf.size[0]} ry={leaf.size[1]}
            fill="#4a9a28"
            opacity="0"
            transform={`rotate(${leaf.r} ${leaf.x} ${leaf.y})`}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.45 }}
            transition={{ duration: 0.6, delay: leaf.d, ease: "easeOut" }}
          />
        ))}

        {/* Tiny accent flowers on vine */}
        {flowerAccents.map((f, i) => (
          <motion.g key={i} initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 0.7 }}
            transition={{ duration: 0.5, delay: f.d, ease: "backOut" }}>
            {[0, 72, 144, 216, 288].map((a, j) => (
              <ellipse key={j} cx={f.x} cy={f.y} rx={f.r} ry={f.r * 0.45}
                fill={f.color} opacity="0.8"
                transform={`rotate(${a} ${f.x} ${f.y}) translate(0 -${f.r * 0.8})`} />
            ))}
            <circle cx={f.x} cy={f.y} r={f.r * 0.35} fill="#ffd740" opacity="0.9" />
          </motion.g>
        ))}
      </svg>

      {/* Left side vertical vine */}
      <svg className="absolute left-0 top-0 h-full" viewBox="0 0 8 100" preserveAspectRatio="none" style={{ width: "3%" }}>
        <motion.path
          d="M 4 5 C 1 20, 7 30, 3 45 S 6 60, 2 75 S 5 90, 4 100"
          fill="none" stroke="rgba(60,140,30,0.25)" strokeWidth="0.8" strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 5, delay: 2, ease: "easeInOut" }}
        />
        {[15, 32, 50, 68, 84].map((y, i) => (
          <motion.ellipse key={i}
            cx={i % 2 === 0 ? 6 : 2} cy={y}
            rx="2.2" ry="1" fill="#3a8020" opacity="0"
            transform={`rotate(${i % 2 === 0 ? 30 : -30} ${i % 2 === 0 ? 6 : 2} ${y})`}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.4 }}
            transition={{ duration: 0.5, delay: 2.5 + i * 0.4 }}
          />
        ))}
      </svg>

      {/* Right side vertical vine */}
      <svg className="absolute right-0 top-0 h-full" viewBox="0 0 8 100" preserveAspectRatio="none" style={{ width: "3%" }}>
        <motion.path
          d="M 4 3 C 7 18, 1 28, 5 43 S 2 58, 6 73 S 3 88, 4 100"
          fill="none" stroke="rgba(60,140,30,0.2)" strokeWidth="0.8" strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 5.5, delay: 2.5, ease: "easeInOut" }}
        />
        {[12, 28, 48, 65, 80].map((y, i) => (
          <motion.ellipse key={i}
            cx={i % 2 === 0 ? 2 : 6} cy={y}
            rx="2" ry="0.9" fill="#3a8020" opacity="0"
            transform={`rotate(${i % 2 === 0 ? -30 : 30} ${i % 2 === 0 ? 2 : 6} ${y})`}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.35 }}
            transition={{ duration: 0.5, delay: 3 + i * 0.4 }}
          />
        ))}
      </svg>
    </div>
  );
}
