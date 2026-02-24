"use client";

import { useEffect, useRef } from "react";

const PARTICLE_COUNT = 24;

export default function FloatingParticles() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const particles = Array.from({ length: PARTICLE_COUNT }, (_, i) => {
      const el = document.createElement("div");
      el.className = "absolute rounded-full bg-accent/20 blur-sm";
      el.style.width = `${4 + Math.random() * 8}px`;
      el.style.height = el.style.width;
      el.style.left = `${Math.random() * 100}%`;
      el.style.top = `${Math.random() * 100}%`;
      el.style.animation = `float-slow ${6 + Math.random() * 6}s ease-in-out infinite`;
      el.style.animationDelay = `${Math.random() * 2}s`;
      container.appendChild(el);
      return el;
    });

    return () => particles.forEach((el) => el.remove());
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-[2] overflow-hidden"
      aria-hidden
    />
  );
}
