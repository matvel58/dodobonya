"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { HiExternalLink } from "react-icons/hi";

const DEXSCREENER_URL =
  "https://dexscreener.com/solana/hezmhtxbc7du1bvzg6vgad7gpudedhx6pwseleevqigo";

export default function DexEmbed() {
  const ref = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number; delay: number }>>([]);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setParticles(
      Array.from({ length: 12 }, (_, i) => ({
        id: i,
        x: Math.random() * 100 - 10,
        y: Math.random() * 100 - 10,
        size: 2 + Math.random() * 4,
        delay: Math.random() * 3,
      }))
    );
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / rect.width;
    const dy = (e.clientY - cy) / rect.height;
    setParallax({ x: dx * 6, y: dy * 6 });
  }, []);

  const handleMouseLeave = useCallback(() => setParallax({ x: 0, y: 0 }), []);

  return (
    <section
      id="chart"
      ref={ref}
      className="relative z-10 py-24 px-6 md:px-16 lg:px-24"
    >
      <div ref={containerRef} className="max-w-[1400px] mx-auto" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
        <motion.div
          className="relative rounded-2xl"
          style={{ x: parallax.x, y: parallax.y }}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Radial glow behind */}
          <div
            className="absolute inset-0 -m-8 rounded-3xl pointer-events-none opacity-40"
            style={{
              background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(255, 106, 0, 0.15) 0%, transparent 60%)",
            }}
          />

          {/* Floating particles */}
          <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
            {particles.map((p) => (
              <motion.div
                key={p.id}
                className="absolute rounded-full bg-accent/30"
                style={{
                  left: `${p.x}%`,
                  top: `${p.y}%`,
                  width: p.size,
                  height: p.size,
                }}
                animate={{
                  y: [0, -15, 0],
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: 3 + p.delay,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>

          {/* Glowing border wrapper */}
          <div className="gradient-border-wrap p-[1px] rounded-2xl shadow-2xl shadow-accent/10">
            <div className="relative rounded-2xl overflow-hidden bg-navy/80 border border-white/10">
              <iframe
                src={DEXSCREENER_URL}
                title="DODOBONYA on DexScreener"
                className="w-full h-[400px] sm:h-[500px] lg:h-[600px] rounded-2xl border-0 block"
              />
              <div className="absolute bottom-4 left-4 right-4 flex justify-center">
                <motion.a
                  href={DEXSCREENER_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-accent hover:bg-accent/90 text-white font-semibold shadow-lg shadow-accent/30 hover:scale-105 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <HiExternalLink className="w-5 h-5" />
                  Trade on DexScreener
                </motion.a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
