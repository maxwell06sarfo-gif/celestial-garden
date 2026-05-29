"use client";
import { useEffect, useRef } from "react";

export default function CrystalHeart() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let animId;
    let renderer;

    async function init() {
      const THREE = await import("three");

      const W = window.innerWidth;
      const H = window.innerHeight;

      // ── Renderer ──
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
      renderer.setSize(W, H);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x000000, 1);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.25;

      // ── Scene / Camera ──
      const scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2(0x080003, 0.042);
      const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 200);
      camera.position.set(0, 0, 7);

      // ── Lights ──
      scene.add(new THREE.AmbientLight(0xff3399, 0.6));

      const topLight = new THREE.PointLight(0xffffff, 3.8, 26);
      topLight.position.set(0, 8, 3);
      scene.add(topLight);

      const pinkL = new THREE.PointLight(0xff69b4, 2.4, 20);
      pinkL.position.set(-5, 2, 4);
      scene.add(pinkL);

      const pinkR = new THREE.PointLight(0xff1493, 2.0, 18);
      pinkR.position.set(5, -2, 3);
      scene.add(pinkR);

      const rimLight = new THREE.PointLight(0xffffff, 1.4, 14);
      rimLight.position.set(0, -6, -4);
      scene.add(rimLight);

      // ── Heart parametric function ──
      function hp(t) {
        const s = Math.sin(t), c = Math.cos(t);
        return {
          x: 16 * s * s * s * 0.058,
          y: (13 * c - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) * 0.058,
        };
      }

      // ── Crystal heart mesh (extruded, flat-shaded low-poly) ──
      const heartShape = new THREE.Shape();
      for (let i = 0; i <= 90; i++) {
        const t = (i / 90) * Math.PI * 2;
        const p = hp(t);
        i === 0 ? heartShape.moveTo(p.x, p.y) : heartShape.lineTo(p.x, p.y);
      }
      heartShape.closePath();

      const heartGeo = new THREE.ExtrudeGeometry(heartShape, {
        depth: 0.52,
        bevelEnabled: true,
        bevelThickness: 0.16,
        bevelSize: 0.12,
        bevelSegments: 2,
        curveSegments: 10,
      });
      heartGeo.center();

      // Convert to non-indexed for flat shading
      const nonIdx = heartGeo.toNonIndexed();
      nonIdx.computeVertexNormals();

      const heartMat = new THREE.MeshStandardMaterial({
        color: 0xff0f6e,
        emissive: 0x8b0033,
        emissiveIntensity: 0.4,
        roughness: 0.07,
        metalness: 0.75,
        flatShading: true,
      });

      const heart = new THREE.Mesh(nonIdx, heartMat);
      heart.position.y = 0.25;
      scene.add(heart);

      // ── Inner glow core ──
      const coreGeo = new THREE.SphereGeometry(0.88, 14, 14);
      const coreMat = new THREE.MeshBasicMaterial({
        color: 0xff2266,
        transparent: true,
        opacity: 0.07,
      });
      scene.add(new THREE.Mesh(coreGeo, coreMat));


      // ── Outer particle heart (2200 pts, orbiting) ──
      const N = 2200;
      const oPos = new Float32Array(N * 3);
      const oCol = new Float32Array(N * 3);
      const oPhase = new Float32Array(N);
      const COLS = [
        new THREE.Color(0xff69b4),
        new THREE.Color(0xff1493),
        new THREE.Color(0xff0066),
        new THREE.Color(0xffffff),
        new THREE.Color(0xff99cc),
        new THREE.Color(0xdd0055),
      ];

      for (let i = 0; i < N; i++) {
        const t = (i / N) * Math.PI * 2;
        const p = hp(t);
        const sc = (Math.random() - 0.5) * 0.3;
        const nx = Math.cos(t + Math.PI / 2);
        const ny = Math.sin(t + Math.PI / 2);
        oPos[i * 3]     = p.x * 1.88 + nx * sc;
        oPos[i * 3 + 1] = p.y * 1.88 + ny * sc + 0.25;
        oPos[i * 3 + 2] = (Math.random() - 0.5) * 0.85;
        oPhase[i] = Math.random() * Math.PI * 2;
        const c = COLS[i % COLS.length];
        oCol[i * 3]     = c.r;
        oCol[i * 3 + 1] = c.g;
        oCol[i * 3 + 2] = c.b;
      }

      const outerGeo = new THREE.BufferGeometry();
      outerGeo.setAttribute("position", new THREE.BufferAttribute(oPos, 3));
      outerGeo.setAttribute("color", new THREE.BufferAttribute(oCol, 3));

      const outerMat = new THREE.PointsMaterial({
        size: 0.045,
        vertexColors: true,
        transparent: true,
        opacity: 0.9,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        sizeAttenuation: true,
      });
      const outerPts = new THREE.Points(outerGeo, outerMat);
      scene.add(outerPts);

      // ── Sparkle ring (white, over-bright, pulsing) ──
      const SK = 130;
      const skPos = new Float32Array(SK * 3);
      for (let i = 0; i < SK; i++) {
        const t = (i / SK) * Math.PI * 2;
        const p = hp(t);
        skPos[i * 3]     = p.x * 1.88;
        skPos[i * 3 + 1] = p.y * 1.88 + 0.25;
        skPos[i * 3 + 2] = 0;
      }
      const skGeo = new THREE.BufferGeometry();
      skGeo.setAttribute("position", new THREE.BufferAttribute(skPos, 3));
      const skMat = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.07,
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        sizeAttenuation: true,
      });
      scene.add(new THREE.Points(skGeo, skMat));

      // ── Ambient dust ──
      const DP = 2000;
      const dPos = new Float32Array(DP * 3);
      const dCol = new Float32Array(DP * 3);
      const dCols = [new THREE.Color(0xff1a4d), new THREE.Color(0x77002b), new THREE.Color(0xbb003e)];
      for (let i = 0; i < DP; i++) {
        dPos[i * 3]     = (Math.random() - 0.5) * 22;
        dPos[i * 3 + 1] = (Math.random() - 0.5) * 18;
        dPos[i * 3 + 2] = (Math.random() - 0.5) * 18;
        const c = dCols[i % dCols.length];
        const b = 0.35 + Math.random() * 0.45;
        dCol[i * 3]     = c.r * b;
        dCol[i * 3 + 1] = c.g * b;
        dCol[i * 3 + 2] = c.b * b;
      }
      const dustGeo = new THREE.BufferGeometry();
      dustGeo.setAttribute("position", new THREE.BufferAttribute(dPos, 3));
      dustGeo.setAttribute("color", new THREE.BufferAttribute(dCol, 3));
      const dustMat = new THREE.PointsMaterial({
        size: 0.02,
        vertexColors: true,
        transparent: true,
        opacity: 0.5,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        sizeAttenuation: true,
      });
      const dust = new THREE.Points(dustGeo, dustMat);
      scene.add(dust);


      // ── Resize + mouse ──
      function onResize() {
        const w = window.innerWidth, h = window.innerHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      }
      window.addEventListener("resize", onResize);

      let mx = 0, my = 0;
      function onMouse(e) {
        mx = (e.clientX / window.innerWidth - 0.5) * 2;
        my = -(e.clientY / window.innerHeight - 0.5) * 2;
      }
      window.addEventListener("mousemove", onMouse);

      // ── Render loop ──
      const clock = new THREE.Clock();
      const outerPosAttr = outerGeo.attributes.position;

      function tick() {
        animId = requestAnimationFrame(tick);
        const t = clock.getElapsedTime();

        // Crystal heart: rotate + breathe
        heart.rotation.y = t * 0.44;
        heart.rotation.x = Math.sin(t * 0.28) * 0.11;
        heart.rotation.z = -mx * 0.11;
        heart.scale.setScalar(1 + Math.sin(t * 1.9) * 0.052);

        // Outer ring: slow orbit + shimmer scatter
        outerPts.rotation.z = -mx * 0.055;
        for (let i = 0; i < N; i++) {
          const base = (i / N) * Math.PI * 2;
          const angle = base + t * 0.11 + oPhase[i] * 0.025;
          const p = hp(angle);
          const sc = Math.sin(t * 2.1 + oPhase[i]) * 0.17;
          const nx = Math.cos(angle + Math.PI / 2);
          const ny = Math.sin(angle + Math.PI / 2);
          outerPosAttr.setXYZ(
            i,
            p.x * 1.88 + nx * sc,
            p.y * 1.88 + ny * sc + 0.25,
            Math.sin(t * 1.3 + oPhase[i]) * 0.28,
          );
        }
        outerPosAttr.needsUpdate = true;

        // Sparkle pulse
        skMat.opacity = 0.5 + Math.sin(t * 4.8) * 0.48;
        skMat.size = 0.07 + Math.sin(t * 3.1) * 0.025;

        // Dust drift
        dust.rotation.y = t * 0.016;
        dust.rotation.x = t * 0.008;

        // Dynamic light dance
        topLight.intensity = 3.8 + Math.sin(t * 1.9) * 0.9;
        pinkL.position.x = -5 + Math.sin(t * 0.6) * 1.3;
        pinkR.position.x = 5 + Math.cos(t * 0.45) * 1.3;

        renderer.render(scene, camera);
      }
      tick();

      window.__crystalCleanup = () => {
        cancelAnimationFrame(animId);
        window.removeEventListener("resize", onResize);
        window.removeEventListener("mousemove", onMouse);
        renderer.dispose();
      };
    }

    init().catch(console.error);

    return () => {
      if (typeof window.__crystalCleanup === "function") {
        window.__crystalCleanup();
        delete window.__crystalCleanup;
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        display: "block",
        pointerEvents: "none",
      }}
    />
  );
}
