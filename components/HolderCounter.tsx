"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

const SOLSCAN_HOLDERS_API =
  "https://public-api.solscan.io/token/holders?tokenAddress=BzW55BCUM9Uq3QPaXjdJk5xu7Fhbu5vHp4Dipfppump&offset=0&limit=1";

function useAnimatedCount(target: number, duration: number, isActive: boolean) {
  const [count, setCount] = useState(0);
  const startRef = useRef(0);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isActive || !isFinite(target)) return;
    startRef.current = count;
    startTimeRef.current = null;

    const tick = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = (timestamp - startTimeRef.current) / 1000;
      const t = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setCount(Math.round(startRef.current + (target - startRef.current) * eased));
      if (t < 1) requestAnimationFrame(tick);
    };
    const id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [target, duration, isActive]);

  return count;
}

export default function HolderCounter() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [holders, setHolders] = useState<number | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch(SOLSCAN_HOLDERS_API)
      .then((r) => r.json())
      .then((json) => {
        if (cancelled) return;
        const total = typeof json?.total === "number" ? json.total : null;
        if (total != null) setHolders(total);
        else setError(true);
      })
      .catch(() => {
        if (!cancelled) setError(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const displayCount = useAnimatedCount(holders ?? 0, 1.5, isInView && holders != null && holders > 0);

  return (
    <section ref={ref} className="relative z-10 py-24 px-6 md:px-16 lg:px-24">
      <div className="max-w-4xl mx-auto text-center">
        {error || holders == null ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            className="inline-block"
          >
            <p className="text-4xl md:text-5xl lg:text-6xl font-bold gradient-text-animate animate-glow-pulse shimmer-bg rounded-2xl px-8 py-4">
              Community Growing
            </p>
            <p className="mt-4 text-white/60">Growing community. Real momentum.</p>
          </motion.div>
        ) : (
          <>
            <motion.p
              className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold font-mono tabular-nums gradient-text-animate"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              {displayCount.toLocaleString()}
            </motion.p>
            <motion.p
              className="mt-4 text-lg text-white/70"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.2 }}
            >
              Holders
            </motion.p>
            <motion.p
              className="mt-2 text-white/50"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.3 }}
            >
              Growing community. Real momentum.
            </motion.p>
          </>
        )}
      </div>
    </section>
  );
}
