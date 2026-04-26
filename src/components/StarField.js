"use client";
import { useEffect, useRef } from "react";

// Pure CSS-animation particles — zero framer-motion overhead
export default function FloatingPetals() {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Fireflies on canvas — GPU-accelerated, no DOM nodes
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const fireflies = Array.from({ length: 16 }, (_, i) => ({
      x: (i * 6.1 + 4) % 90 / 100,
      y: (18 + (i * 6.3) % 62) / 100,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.2,
      phase: Math.random() * Math.PI * 2,
      speed: 0.4 + Math.random() * 0.5,
      r: 1.5 + (i * 1.1) % 2.5,
    }));

    let animId;
    let t = 0;
    const draw = () => {
      t += 0.012;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const W = canvas.width, H = canvas.height;

      for (const ff of fireflies) {
        ff.x += ff.vx * 0.002;
        ff.y += ff.vy * 0.002;
        if (ff.x < 0) ff.x = 1; if (ff.x > 1) ff.x = 0;
        if (ff.y < 0.05) ff.y = 0.85; if (ff.y > 0.88) ff.y = 0.05;

        const glow = (Math.sin(t * ff.speed + ff.phase) + 1) / 2;
        const alpha = glow * 0.85 + 0.05;
        const gSize = ff.r * (3 + glow * 5);

        const grad = ctx.createRadialGradient(ff.x * W, ff.y * H, 0, ff.x * W, ff.y * H, gSize);
        grad.addColorStop(0, `rgba(180,245,100,${alpha})`);
        grad.addColorStop(0.4, `rgba(140,220,80,${alpha * 0.5})`);
        grad.addColorStop(1, "rgba(100,200,60,0)");
        ctx.beginPath();
        ctx.arc(ff.x * W, ff.y * H, gSize, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      }
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Canvas fireflies — GPU drawn */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ opacity: 0.9 }} />

      {/* CSS-only falling petals — no JS per frame */}
      <style>{`
        @keyframes petalFall {
          0%   { transform: translateY(-40px) rotate(0deg) translateX(0px); opacity: 0; }
          5%   { opacity: 0.75; }
          95%  { opacity: 0.4; }
          100% { transform: translateY(110vh) rotate(420deg) translateX(60px); opacity: 0; }
        }
        @keyframes petalDrift {
          0%   { transform: translateY(-40px) rotate(0deg) translateX(0px); opacity: 0; }
          5%   { opacity: 0.65; }
          95%  { opacity: 0.35; }
          100% { transform: translateY(110vh) rotate(-300deg) translateX(-50px); opacity: 0; }
        }
        .petal { position:absolute; top:0; border-radius:50% 30% 50% 30%; pointer-events:none; will-change:transform,opacity; }
      `}</style>

      {[
        { l:"3%",  w:8,  h:5,  c:"#f48fb1", dur:"18s", del:"0s",   anim:"petalFall" },
        { l:"11%", w:7,  h:4,  c:"#ce93d8", dur:"22s", del:"2.5s", anim:"petalDrift" },
        { l:"19%", w:9,  h:6,  c:"#ffab91", dur:"16s", del:"5s",   anim:"petalFall" },
        { l:"27%", w:6,  h:4,  c:"#fff176", dur:"24s", del:"1s",   anim:"petalDrift" },
        { l:"35%", w:8,  h:5,  c:"#f06292", dur:"19s", del:"8s",   anim:"petalFall" },
        { l:"44%", w:7,  h:4,  c:"#ce93d8", dur:"21s", del:"3.5s", anim:"petalDrift" },
        { l:"52%", w:9,  h:6,  c:"#ffab91", dur:"17s", del:"6s",   anim:"petalFall" },
        { l:"61%", w:6,  h:4,  c:"#f48fb1", dur:"23s", del:"0.5s", anim:"petalDrift" },
        { l:"69%", w:8,  h:5,  c:"#fff176", dur:"20s", del:"9s",   anim:"petalFall" },
        { l:"78%", w:7,  h:4,  c:"#f06292", dur:"25s", del:"4s",   anim:"petalDrift" },
        { l:"86%", w:9,  h:6,  c:"#ce93d8", dur:"15s", del:"7s",   anim:"petalFall" },
        { l:"93%", w:6,  h:4,  c:"#f48fb1", dur:"22s", del:"11s",  anim:"petalDrift" },
      ].map((p, i) => (
        <div
          key={i}
          className="petal"
          style={{
            left: p.l,
            width: p.w,
            height: p.h,
            backgroundColor: p.c,
            animation: `${p.anim} ${p.dur} ${p.del} linear infinite`,
            boxShadow: `0 0 3px ${p.c}88`,
          }}
        />
      ))}

      {/* CSS dust specks */}
      <style>{`
        @keyframes dustRise { 0%{opacity:0;transform:translateY(0) scale(0.5)} 40%{opacity:0.7} 100%{opacity:0;transform:translateY(-120px) scale(1.3)} }
        .dust { position:absolute; border-radius:50%; pointer-events:none; will-change:transform,opacity; }
      `}</style>
      {[
        { l:"5%",  t:"70%", s:2, c:"#c8f090", dur:"6s",  del:"0s" },
        { l:"14%", t:"55%", s:1, c:"#ffd740", dur:"8s",  del:"1s" },
        { l:"23%", t:"65%", s:2, c:"#80deea", dur:"5s",  del:"2s" },
        { l:"33%", t:"72%", s:1, c:"#ffab40", dur:"7s",  del:"0.5s" },
        { l:"42%", t:"60%", s:2, c:"#c8f090", dur:"9s",  del:"3s" },
        { l:"51%", t:"68%", s:1, c:"#ffd740", dur:"6s",  del:"1.5s" },
        { l:"60%", t:"75%", s:2, c:"#80deea", dur:"8s",  del:"4s" },
        { l:"70%", t:"62%", s:1, c:"#c8f090", dur:"5s",  del:"2.5s" },
        { l:"80%", t:"70%", s:2, c:"#ffab40", dur:"7s",  del:"0s" },
        { l:"89%", t:"58%", s:1, c:"#ffd740", dur:"9s",  del:"3.5s" },
      ].map((d, i) => (
        <div
          key={i}
          className="dust"
          style={{
            left: d.l, top: d.t,
            width: d.s, height: d.s,
            backgroundColor: d.c,
            boxShadow: `0 0 ${d.s * 2}px ${d.c}`,
            animation: `dustRise ${d.dur} ${d.del} ease-out infinite`,
          }}
        />
      ))}
    </div>
  );
}
