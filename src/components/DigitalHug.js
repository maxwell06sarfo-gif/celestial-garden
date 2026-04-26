"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function DigitalHug() {
  const [hugs, setHugs] = useState(0);
  const [burst, setBurst] = useState([]);
  const [heartId, setHeartId] = useState(0);

  useEffect(() => {
    setHeartId(Date.now());
  }, []);

  useEffect(() => {
    if (burst.length === 0) return;
    const timer = setTimeout(() => setBurst([]), 2500);
    return () => clearTimeout(timer);
  }, [burst]);

  const sendHug = () => {
    setHugs((prev) => prev + 1);
    const baseId = heartId;
    setHeartId((prev) => prev + 14);

    const emojis = ["\u2764\ufe0f", "\ud83e\udd0d", "\ud83d\udc9b", "\ud83c\udf38", "\ud83c\udf3f", "\u2728"];
    const newHearts = [...Array(14)].map((_, i) => ({
      id: baseId + i,
      x: Math.random() * 240 - 120,
      y: Math.random() * -260 - 40,
      emoji: emojis[i % emojis.length],
      size: Math.random() * 8 + 16,
    }));

    setBurst(newHearts);
  };

  return (
    <div className="fixed bottom-8 right-8 z-[150] flex flex-col items-center">
      <AnimatePresence>
        {burst.map((heart) => (
          <motion.div
            key={heart.id}
            initial={{ opacity: 1, scale: 0, x: 0, y: 0 }}
            animate={{ opacity: 0, scale: 1.4, x: heart.x, y: heart.y }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.8, ease: "easeOut" }}
            className="absolute"
            style={{ fontSize: heart.size }}
          >
            {heart.emoji}
          </motion.div>
        ))}
      </AnimatePresence>

      <motion.div
        key={hugs}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-3 text-[#5a3e2b]/60 text-[10px] tracking-[0.3em] uppercase font-medium"
      >
        {hugs > 0 ? `${hugs} Garden Blessings` : "Send a Blessing"}
      </motion.div>

      <motion.button
        onClick={sendHug}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        className="w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 group shadow-lg"
        style={{
          background: "rgba(255, 255, 255, 0.8)",
          border: "1px solid rgba(139, 195, 74, 0.3)",
          boxShadow: "0 4px 16px rgba(139, 195, 74, 0.15)",
        }}
      >
        <span
          className="text-xl transition-all duration-300 group-hover:scale-110"
          style={{ filter: "drop-shadow(0 2px 4px rgba(139, 195, 74, 0.3))" }}
        >
          {"\ud83e\udd17"}
        </span>
      </motion.button>
    </div>
  );
}