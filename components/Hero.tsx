"use client";

import { useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { HiOutlineBookOpen, HiOutlineUserGroup } from "react-icons/hi";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const [imgError, setImgError] = useState(false);
  const IMG_SRC =
    "https://raw.githubusercontent.com/matvel58/dodobonya/main/public/dodobonya-hero.jpg";

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / rect.width;
      const dy = (e.clientY - cy) / rect.height;
      setParallax({ x: dx * 8, y: dy * 8 });
    },
    []
  );

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex flex-col md:flex-row items-center justify-center md:justify-between gap-12 px-6 md:px-16 lg:px-24 py-20 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-navy via-navy to-navy/95 z-[1]" />
      <div className="relative z-10 flex flex-col md:flex-row w-full max-w-7xl mx-auto items-center gap-12 md:gap-16">
        {/* Left: DODOBONYA image with parallax */}
        <motion.div
          className="relative w-full md:w-1/2 max-w-lg flex-shrink-0"
          style={{ x: parallax.x * 2, y: parallax.y * 2 }}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-white/10 shadow-2xl ring-1 ring-white/5 bg-white/5">
            {!imgError ? (
              <img
                src={IMG_SRC}
                alt="DODOBONYA — a stray dog in the snow, at the heart of the movement"
                className="absolute inset-0 w-full h-full object-cover"
                loading="eager"
                onError={() => setImgError(true)}
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center">
                <span className="text-6xl opacity-40">🐕</span>
              </div>
            )}
          </div>
        </motion.div>

        {/* Right: Text block */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <motion.h1
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-text-primary leading-[1.1]"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            JUSTICE FOR
            <br />
            <span className="bg-gradient-to-r from-accent to-amber-400 bg-clip-text text-transparent">
              DODOBONYA
            </span>
          </motion.h1>
          <motion.p
            className="mt-6 text-lg sm:text-xl text-white/80 max-w-md mx-auto md:mx-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            Kindness should never cost a job.
          </motion.p>
          <motion.div
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <a
              href="#story"
              className="btn-ripple inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-accent to-amber-500 text-white font-semibold shadow-lg shadow-accent/25 hover:shadow-accent/40 hover:scale-[1.02] transition-all duration-300"
            >
              <HiOutlineBookOpen className="w-5 h-5" />
              Read the Story
            </a>
            <a
              href="#community"
              className="btn-ripple inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-lg text-text-primary font-semibold hover:bg-white/10 hover:border-accent/30 transition-all duration-300"
            >
              <HiOutlineUserGroup className="w-5 h-5" />
              Join the Community
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
