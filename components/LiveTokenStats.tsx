"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

const DEXSCREENER_API =
  "https://api.dexscreener.com/latest/dex/pairs/solana/hezmhtxbc7du1bvzg6vgad7gpudedhx6pwseleevqigo";

/** Format price for display: no scientific notation, min 6 decimals, $ sign */
function formatPriceUSD(n: number): string {
  if (typeof n !== "number" || !isFinite(n) || n < 0) return "$0.000000";
  if (n >= 1) return "$" + n.toFixed(4);
  if (n >= 0.000001) return "$" + n.toFixed(6);
  if (n > 0) {
    const fixed = n.toFixed(8);
    const trimmed = fixed.replace(/\.?0+$/, "");
    const decimals = (trimmed.split(".")[1] || "").length;
    const minDecimals = Math.max(6, decimals);
    return "$" + n.toFixed(minDecimals);
  }
  return "$0.000000";
}

function formatCompact(n: number): string {
  if (n >= 1e9) return (n / 1e9).toFixed(2) + "B";
  if (n >= 1e6) return (n / 1e6).toFixed(2) + "M";
  if (n >= 1e3) return (n / 1e3).toFixed(2) + "K";
  return n.toFixed(2);
}

function useAnimatedValue(target: number, duration = 1.2, isActive: boolean) {
  const [display, setDisplay] = useState(0);
  const startRef = useRef(0);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isActive || typeof target !== "number" || !isFinite(target)) return;
    startRef.current = display;
    startTimeRef.current = null;

    const tick = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = (timestamp - startTimeRef.current) / 1000;
      const t = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(startRef.current + (target - startRef.current) * eased);
      if (t < 1) requestAnimationFrame(tick);
    };
    const id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [target, duration, isActive]);

  return display;
}

type CardProps = {
  label: string;
  value: number;
  formatter: (n: number) => string;
  suffix?: string;
  isPositive?: boolean;
  isVisible: boolean;
  delay: number;
};

function StatCard({ label, value, formatter, suffix = "", isPositive, isVisible, delay }: CardProps) {
  const animValue = useAnimatedValue(value, 1.2, isVisible && isFinite(value));
  const displayStr = formatter(animValue) + suffix;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -6 }}
      className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur-lg p-6 md:p-8 relative overflow-hidden group shadow-[0_0_30px_rgba(255,106,0,0.06)]"
    >
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-accent/80 to-amber-500/80" />
      <p
        className={`text-2xl md:text-3xl lg:text-4xl font-bold font-mono tabular-nums ${
          isPositive === true
            ? "text-emerald-400"
            : isPositive === false
              ? "text-red-400"
              : "text-text-primary"
        }`}
      >
        {displayStr}
      </p>
      <p className="mt-2 text-sm text-white/60">{label}</p>
    </motion.div>
  );
}

export default function LiveTokenStats() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [data, setData] = useState<{
    priceUsd?: number;
    volume24h?: number;
    marketCap?: number;
    priceChange24h?: number;
  } | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch(DEXSCREENER_API)
      .then((r) => r.json())
      .then((json) => {
        if (cancelled) return;
        const pair = json?.pairs?.[0];
        if (!pair) {
          setError(true);
          return;
        }
        const priceUsd = pair.priceUsd ? parseFloat(pair.priceUsd) : undefined;
        const volume24h = pair.volume?.h24 ? parseFloat(pair.volume.h24) : undefined;
        const fd = pair.fdv ?? pair.marketCap;
        const marketCap = fd ? Number(fd) : undefined;
        const priceChange24h = pair.priceChange?.h24 ? parseFloat(pair.priceChange.h24) : undefined;
        setData({
          priceUsd,
          volume24h,
          marketCap,
          priceChange24h,
        });
      })
      .catch(() => {
        if (!cancelled) setError(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (error && !data) {
    return (
      <section ref={ref} className="relative z-10 py-24 px-6 md:px-16 lg:px-24">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-center text-text-primary mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
          >
            Live Token Data
          </motion.h2>
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur-lg p-12 text-center"
          >
            <p className="text-white/70">Live data temporarily unavailable.</p>
            <p className="text-sm text-white/50 mt-2">Check back soon or view on DexScreener.</p>
          </motion.div>
        </div>
      </section>
    );
  }

  const priceUsd = data?.priceUsd ?? 0;
  const volume24h = data?.volume24h ?? 0;
  const marketCap = data?.marketCap ?? 0;
  const priceChange24h = data?.priceChange24h ?? 0;

  return (
    <section ref={ref} className="relative z-10 py-24 px-6 md:px-16 lg:px-24">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center gradient-text-animate mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
        >
          Live Token Data
        </motion.h2>
        <motion.p
          className="text-center text-white/60 mb-12"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.1 }}
        >
          Real-time stats from DexScreener
        </motion.p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            label="Price (USD)"
            value={priceUsd}
            formatter={formatPriceUSD}
            suffix=""
            isVisible={isInView}
            delay={0.1}
          />
          <StatCard
            label="24h Volume"
            value={volume24h}
            formatter={formatCompact}
            suffix=" USD"
            isVisible={isInView}
            delay={0.15}
          />
          <StatCard
            label="Market Cap"
            value={marketCap}
            formatter={formatCompact}
            suffix=" USD"
            isVisible={isInView}
            delay={0.2}
          />
          <StatCard
            label="24h Change"
            value={priceChange24h}
            formatter={(n) => (n >= 0 ? "+" : "") + n.toFixed(2)}
            suffix="%"
            isPositive={priceChange24h > 0 ? true : priceChange24h < 0 ? false : undefined}
            isVisible={isInView}
            delay={0.25}
          />
        </div>
      </div>
    </section>
  );
}
