"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function FloatingPetals() {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const items = [];
    const vh = typeof window !== "undefined" ? window.innerHeight : 900;

    // Rose petals — organic shapes
    const petalColors = ["#f48fb1", "#e91e63", "#ce93d8", "#ba68c8", "#ffab91", "#ff8a65", "#fff176", "#f06292"];
    for (let i = 0; i < 30; i++) {
      items.push({
        id: `petal-${i}`,
        type: "petal",
        left: (i * 3.3) % 100,
        size: 7 + ((i * 4) % 8),
        duration: 14 + ((i * 3) % 14),
        delay: (i * 0.45) % 12,
        color: petalColors[i % petalColors.length],
        xOffset1: 25 + ((i * 12) % 35),
        xOffset2: -20 + ((i * 17) % 40),
        yEnd: vh * 1.2,
        rotate: (i * 37) % 360,
      });
    }

    // Fireflies — bioluminescent dots
    for (let i = 0; i < 18; i++) {
      items.push({
        id: `firefly-${i}`,
        type: "firefly",
        left: 5 + ((i * 5.5) % 88),
        top: 8 + ((i * 4.7) % 72),
        size: 2 + ((i * 1.1) % 3),
        duration: 4 + ((i * 1.3) % 5),
        delay: (i * 0.6) % 8,
        xRange: 30 + ((i * 8) % 50),
        yRange: 20 + ((i * 6) % 40),
      });
    }

    // Golden spore dust — tiny luminous particles
    for (let i = 0; i < 45; i++) {
      items.push({
        id: `dust-${i}`,
        type: "dust",
        left: (i * 2.22) % 100,
        top: (i * 3.14) % 90,
        size: 1 + ((i * 0.5) % 2),
        duration: 5 + ((i * 0.8) % 7),
        delay: (i * 0.22) % 8,
        color: i % 4 === 0 ? "#c8f090" : i % 4 === 1 ? "#ffd740" : i % 4 === 2 ? "#80deea" : "#ffab40",
      });
    }

    // Dandelion seeds — wispy floaters
    for (let i = 0; i < 12; i++) {
      items.push({
        id: `seed-${i}`,
        type: "seed",
        left: (i * 8.33) % 100,
        top: 20 + ((i * 6.1) % 60),
        duration: 20 + ((i * 3) % 20),
        delay: (i * 1.5) % 14,
      });
    }

    setParticles(items);
  }, []);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      {particles.map((p) => {
        if (p.type === "petal") {
          return (
            <motion.div
              key={p.id}
              className="absolute"
              style={{
                left: `${p.left}%`,
                top: "-3%",
                width: p.size,
                height: p.size * 0.65,
                backgroundColor: p.color,
                borderRadius: "50% 30% 50% 30%",
                opacity: 0.7,
                boxShadow: `0 0 4px ${p.color}88`,
              }}
              animate={{
                y: [0, p.yEnd],
                x: [0, p.xOffset1, p.xOffset2, p.xOffset1 * 0.5, 0],
                rotate: [p.rotate, p.rotate + 360],
                opacity: [0, 0.75, 0.6, 0.5, 0],
              }}
              transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "linear" }}
            />
          );
        }

        if (p.type === "firefly") {
          return (
            <motion.div
              key={p.id}
              className="absolute rounded-full"
              style={{
                left: `${p.left}%`,
                top: `${p.top}%`,
                width: p.size,
                height: p.size,
                backgroundColor: "#c8f090",
              }}
              animate={{
                opacity: [0, 0.95, 0.1, 0.85, 0],
                x: [0, p.xRange * 0.5, -p.xRange * 0.3, p.xRange * 0.8, 0],
                y: [0, -p.yRange * 0.6, p.yRange * 0.3, -p.yRange, 0],
                boxShadow: [
                  `0 0 0px 0px rgba(180,245,100,0)`,
                  `0 0 ${p.size * 6}px ${p.size * 3}px rgba(180,245,100,0.6)`,
                  `0 0 ${p.size * 2}px ${p.size}px rgba(180,245,100,0.2)`,
                  `0 0 ${p.size * 8}px ${p.size * 4}px rgba(180,245,100,0.7)`,
                  `0 0 0px 0px rgba(180,245,100,0)`,
                ],
              }}
              transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
            />
          );
        }

        if (p.type === "dust") {
          return (
            <motion.div
              key={p.id}
              className="absolute rounded-full"
              style={{
                left: `${p.left}%`,
                top: `${p.top}%`,
                width: p.size,
                height: p.size,
                backgroundColor: p.color,
              }}
              animate={{
                opacity: [0, 0.8, 0.3, 0.7, 0],
                scale: [0.5, 1.5, 0.8, 1.2, 0.5],
                y: [0, -30, -60, -90, -120],
                boxShadow: [
                  `0 0 ${p.size}px ${p.color}`,
                  `0 0 ${p.size * 3}px ${p.color}`,
                  `0 0 ${p.size}px ${p.color}`,
                ],
              }}
              transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeOut" }}
            />
          );
        }

        if (p.type === "seed") {
          return (
            <motion.div
              key={p.id}
              className="absolute text-[10px] select-none"
              style={{ left: `${p.left}%`, top: `${p.top}%`, color: "rgba(200,240,160,0.5)" }}
              animate={{
                x: [0, 60, 100, 40, -20, 0],
                y: [0, -50, -25, -80, -30, 0],
                opacity: [0.2, 0.6, 0.4, 0.7, 0.3, 0.2],
                rotate: [0, 45, 90, 135, 180, 360],
              }}
              transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
            >
              ✿
            </motion.div>
          );
        }
        return null;
      })}
    </div>
  );
}
