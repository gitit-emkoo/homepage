"use client";

import { useEffect, useRef } from "react";

export default function HeroAmbient() {
  const rootRef = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0.7, y: 0.32 });
  const current = useRef({ x: 0.7, y: 0.32 });
  const raf = useRef<number | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    const hero = root?.parentElement;
    if (!root || !hero) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const paint = () => {
      const { x, y } = current.current;
      root.style.setProperty("--mx", `${(x * 100).toFixed(2)}%`);
      root.style.setProperty("--my", `${(y * 100).toFixed(2)}%`);
    };

    const tick = () => {
      const dx = target.current.x - current.current.x;
      const dy = target.current.y - current.current.y;
      current.current.x += dx * 0.08;
      current.current.y += dy * 0.08;
      paint();
      if (Math.abs(dx) > 0.0004 || Math.abs(dy) > 0.0004) {
        raf.current = requestAnimationFrame(tick);
      } else {
        raf.current = null;
      }
    };

    const start = () => {
      if (raf.current == null) raf.current = requestAnimationFrame(tick);
    };

    const onMove = (event: PointerEvent) => {
      if (reduceMotion) return;
      const rect = hero.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;
      target.current = {
        x: Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width)),
        y: Math.min(1, Math.max(0, (event.clientY - rect.top) / rect.height)),
      };
      start();
    };

    const onLeave = () => {
      target.current = { x: 0.7, y: 0.32 };
      start();
    };

    paint();
    hero.addEventListener("pointermove", onMove, { passive: true });
    hero.addEventListener("pointerleave", onLeave);
    return () => {
      hero.removeEventListener("pointermove", onMove);
      hero.removeEventListener("pointerleave", onLeave);
      if (raf.current != null) cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <div className="hero__bg" aria-hidden="true" ref={rootRef}>
      <div className="hero__grid" />
      <div className="hero__glow" />
    </div>
  );
}
