"use client";
import { useEffect, useRef } from "react";
import { Howl } from "howler";

export default function AudioEngine({ hasEntered }) {
  const track = useRef(null);

  useEffect(() => {
    if (hasEntered) {
      track.current = new Howl({
        src: ["/audio/supermarket-flowers.mp3"],
        loop: true,
        volume: 0,
      });

      track.current.play();
      track.current.fade(0, 0.5, 4000); // Gentle 4-second fade in
    }

    return () => {
      if (track.current) {
        track.current.fade(0.5, 0, 2000);
        // Stop after fade completes
        setTimeout(() => track.current?.stop(), 2100);
      }
    };
  }, [hasEntered]);

  return null;
}