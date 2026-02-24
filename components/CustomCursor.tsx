"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

const CORE_SIZE = 8;
const GLOW_SIZE = 120;
const TRAIL_LENGTH = 3;
const TRAIL_DECAY = 0.7;

type Point = { x: number; y: number; t: number };

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trail, setTrail] = useState<Point[]>([]);
  const [isHoveringButton, setIsHoveringButton] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    setTrail((prev) => {
      const next = [...prev.filter((p) => p.t > 0.05), { ...position, t: 1 }].slice(-TRAIL_LENGTH);
      return next.map((p, i) => ({ ...p, t: Math.pow(TRAIL_DECAY, next.length - 1 - i) }));
    });
  }, [position.x, position.y]);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };
    const handleLeave = () => setIsVisible(false);
    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setIsHoveringButton(!!target.closest("a, button"));
    };
    const handleOut = () => setIsHoveringButton(false);

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseover", handleOver);
    window.addEventListener("mouseout", handleOut);
    document.body.addEventListener("mouseleave", handleLeave);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseover", handleOver);
      window.removeEventListener("mouseout", handleOut);
      document.body.removeEventListener("mouseleave", handleLeave);
    };
  }, [isVisible]);

  const scale = isHoveringButton ? 1.4 : 1;
  const coreScale = isHoveringButton ? 1.2 : 1;

  return (
    <>
      <div
        className="pointer-events-none fixed z-[9999] hidden md:block"
        aria-hidden
      >
        {/* Trail glows */}
        {trail.map((p, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-accent/30"
            style={{
              left: p.x,
              top: p.y,
              width: GLOW_SIZE * p.t * scale,
              height: GLOW_SIZE * p.t * scale,
              marginLeft: (-GLOW_SIZE * p.t * scale) / 2,
              marginTop: (-GLOW_SIZE * p.t * scale) / 2,
              filter: `blur(${20 + (1 - p.t) * 25}px)`,
            }}
            animate={{ opacity: isVisible ? p.t * 0.6 : 0 }}
            transition={{ duration: 0.15 }}
          />
        ))}

        {/* Main glow */}
        <motion.div
          className="absolute rounded-full bg-accent/25"
          style={{
            left: position.x,
            top: position.y,
            width: GLOW_SIZE * scale,
            height: GLOW_SIZE * scale,
            marginLeft: (-GLOW_SIZE * scale) / 2,
            marginTop: (-GLOW_SIZE * scale) / 2,
            filter: "blur(28px)",
          }}
          animate={{ opacity: isVisible ? 1 : 0, scale }}
          transition={{ duration: 0.2 }}
        />

        {/* White core */}
        <motion.div
          className="absolute rounded-full bg-white"
          style={{
            left: position.x,
            top: position.y,
            width: CORE_SIZE * coreScale,
            height: CORE_SIZE * coreScale,
            marginLeft: (-CORE_SIZE * coreScale) / 2,
            marginTop: (-CORE_SIZE * coreScale) / 2,
            boxShadow: "0 0 12px rgba(255,255,255,0.8)",
          }}
          animate={{
            opacity: isVisible ? 1 : 0,
            scale: coreScale,
          }}
          transition={{ duration: 0.15 }}
        />
      </div>
    </>
  );
}
