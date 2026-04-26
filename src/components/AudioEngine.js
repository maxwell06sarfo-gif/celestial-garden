"use client";
import { useEffect, useRef } from "react";
import { Howl, Howler } from "howler";

export default function AudioEngine({ hasEntered }) {
  const track = useRef(null);
  const loaded = useRef(false);
  const played = useRef(false);

  // On mount: unlock audio context immediately + preload the track
  useEffect(() => {
    if (loaded.current) return;
    loaded.current = true;

    // Unlock Howler audio context on first user interaction (any click/touch)
    const unlock = () => {
      if (Howler.ctx && Howler.ctx.state === "suspended") {
        Howler.ctx.resume();
      }
      window.removeEventListener("click", unlock);
      window.removeEventListener("touchstart", unlock);
      window.removeEventListener("keydown", unlock);
    };
    window.addEventListener("click", unlock, { once: true });
    window.addEventListener("touchstart", unlock, { once: true, passive: true });
    window.addEventListener("keydown", unlock, { once: true });

    // Preload track immediately so it's buffered before the button is clicked
    track.current = new Howl({
      src: ["/audio/supermarket-flowers.mp3"],
      loop: true,
      volume: 0,
      preload: true,
      html5: false, // Web Audio API = no decode delay
    });
  }, []);

  // Play instantly when user enters — track is already loaded
  useEffect(() => {
    if (!hasEntered || !track.current || played.current) return;
    played.current = true;

    // Resume audio context in case it's suspended (browser policy)
    if (Howler.ctx && Howler.ctx.state === "suspended") {
      Howler.ctx.resume().then(() => {
        track.current.play();
        track.current.fade(0, 0.55, 1800);
      });
    } else {
      track.current.play();
      track.current.fade(0, 0.55, 1800);
    }
  }, [hasEntered]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (track.current) {
        track.current.fade(0.55, 0, 1000);
        setTimeout(() => {
          track.current?.stop();
          track.current?.unload();
        }, 1100);
      }
    };
  }, []);

  return null;
}
