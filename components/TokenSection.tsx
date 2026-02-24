"use client";

import { useRef, useState, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { HiOutlineClipboard, HiCheck } from "react-icons/hi";

const TOKEN_ADDRESS = "BzW55BCUM9Uq3QPaXjdJk5xu7Fhbu5vHp4Dipfppump";

export default function TokenSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [copied, setCopied] = useState(false);

  const copyAddress = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(TOKEN_ADDRESS);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (_) { /* ignore */ }
  }, []);

  return (
    <section
      id="token"
      ref={ref}
      className="relative z-10 py-16 px-6 md:px-16 lg:px-24"
    >
      <div className="max-w-[1400px] mx-auto">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center text-text-primary mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          DODOBONYA Token
        </motion.h2>
        <motion.p
          className="text-center text-white/70 mb-10"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Community-driven token on Solana
        </motion.p>

        <motion.div
          className="relative max-w-3xl mx-auto"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="gradient-border-wrap p-[1px] rounded-2xl shadow-xl">
            <div className="rounded-2xl bg-navy/80 backdrop-blur-xl border border-white/10 p-4 md:p-5 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <div className="flex-1 min-w-0">
                <p className="text-xs text-white/50 uppercase tracking-wider mb-1">
                  Token address
                </p>
                <p className="font-mono text-sm md:text-base text-text-primary break-all">
                  {TOKEN_ADDRESS}
                </p>
              </div>
              <motion.button
                type="button"
                onClick={copyAddress}
                className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-accent/20 hover:border-accent/40 transition-colors duration-300"
                aria-label="Copy token address"
                animate={copied ? { scale: [1, 1.05, 1] } : {}}
                transition={{ duration: 0.4 }}
              >
                {copied ? (
                  <>
                    <HiCheck className="w-5 h-5 text-emerald-400" />
                    <span className="text-emerald-400 font-medium">Copied!</span>
                  </>
                ) : (
                  <>
                    <HiOutlineClipboard className="w-5 h-5 text-text-primary" />
                    <span className="text-text-primary font-medium">Copy</span>
                  </>
                )}
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
