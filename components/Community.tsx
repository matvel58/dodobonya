"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { HiOutlineUserGroup } from "react-icons/hi";

const COMMUNITY_URL =
  "https://x.com/i/communities/2026267583456911729";

export default function Community() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="community"
      ref={ref}
      className="relative z-10 py-24 px-6 md:px-16 lg:px-24"
    >
      <div className="max-w-3xl mx-auto text-center">
        <motion.h2
          className="text-2xl md:text-3xl font-bold text-text-primary mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Join the community
        </motion.h2>
        <motion.p
          className="text-white/70 mb-10"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Stand with DODOBONYA. Share the story. Drive change.
        </motion.p>
        <motion.a
          href={COMMUNITY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 px-10 py-5 rounded-full text-lg font-semibold text-white bg-gradient-to-r from-accent to-amber-500 shadow-lg shadow-accent/30 hover:shadow-accent/50 hover:scale-105 transition-all duration-300 animate-glow-pulse"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          <HiOutlineUserGroup className="w-6 h-6" />
          Join the Community on X
        </motion.a>
      </div>
    </section>
  );
}
