"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const BASE_SUPPORTERS = 1247;
const INCREMENT_INTERVAL_MS = 4000;
const INCREMENT_MIN = 1;
const INCREMENT_MAX = 5;

export default function ViralMomentumBar() {
  const [supporters, setSupporters] = useState(BASE_SUPPORTERS);

  useEffect(() => {
    const t = setInterval(() => {
      setSupporters((s) => s + INCREMENT_MIN + Math.floor(Math.random() * (INCREMENT_MAX - INCREMENT_MIN + 1)));
    }, INCREMENT_INTERVAL_MS);
    return () => clearInterval(t);
  }, []);

  return (
    <motion.div
      className="sticky top-0 z-[100] flex items-center justify-center gap-3 py-3 px-4 bg-navy/90 backdrop-blur-md border-b border-white/10"
      initial={{ y: -60 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <span className="text-sm md:text-base text-text-primary font-medium">
        DODOBONYA Movement is Growing 🚀
      </span>
      <span className="text-accent font-bold font-mono tabular-nums">
        +{supporters.toLocaleString()} supporters
      </span>
    </motion.div>
  );
}
