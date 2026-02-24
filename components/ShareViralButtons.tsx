"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { FaXTwitter } from "react-icons/fa6";
import { HiOutlineClipboard, HiCheck, HiOutlineExternalLink } from "react-icons/hi";

const TOKEN_ADDRESS = "BzW55BCUM9Uq3QPaXjdJk5xu7Fhbu5vHp4Dipfppump";
const DEXSCREENER_URL =
  "https://dexscreener.com/solana/hezmhtxbc7du1bvzg6vgad7gpudedhx6pwseleevqigo";
const SHARE_TEXT = "Justice for DODOBONYA 🐕 Kindness should never cost a job. $DODOBONYA on Solana.";
const SHARE_URL = typeof window !== "undefined" ? window.location.href : "";

export default function ShareViralButtons() {
  const [copied, setCopied] = useState(false);

  const copyAddress = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(TOKEN_ADDRESS);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (_) { /* ignore */ }
  }, []);

  const shareOnX = useCallback(() => {
    const u = `https://twitter.com/intent/tweet?text=${encodeURIComponent(SHARE_TEXT)}&url=${encodeURIComponent(SHARE_URL)}`;
    window.open(u, "_blank", "noopener,noreferrer");
  }, []);

  const shareBtn = {
    label: "Share on X",
    icon: FaXTwitter,
    onClick: shareOnX,
    className: "bg-white/5 border-white/10 hover:border-accent/50 hover:shadow-accent/20",
  };
  const copyBtn = {
    label: copied ? "Copied!" : "Copy token address",
    icon: copied ? HiCheck : HiOutlineClipboard,
    onClick: copyAddress,
    className: copied
      ? "border-emerald-500/50 text-emerald-400"
      : "bg-white/5 border-white/10 hover:border-accent/50 hover:shadow-accent/20",
  };
  const dexBtn = {
    label: "Open DexScreener",
    icon: HiOutlineExternalLink,
    href: DEXSCREENER_URL,
    className: "bg-white/5 border-white/10 hover:border-accent/50 hover:shadow-accent/20",
  };

  return (
    <section className="relative z-10 py-20 px-6 md:px-16 lg:px-24">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          className="text-2xl md:text-3xl font-bold text-center text-text-primary mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Spread the movement
        </motion.h2>
        <motion.p
          className="text-center text-white/60 mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Share the story. Copy the token. Trade on DexScreener.
        </motion.p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center flex-wrap">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <button
              type="button"
              onClick={shareBtn.onClick}
              className={`inline-flex items-center gap-3 px-8 py-4 rounded-xl border backdrop-blur-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl text-text-primary ${shareBtn.className}`}
            >
              <FaXTwitter className="w-5 h-5 flex-shrink-0" />
              <span>{shareBtn.label}</span>
            </button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <button
              type="button"
              onClick={copyBtn.onClick}
              className={`inline-flex items-center gap-3 px-8 py-4 rounded-xl border backdrop-blur-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl text-text-primary ${copyBtn.className}`}
            >
              {copied ? (
                <HiCheck className="w-5 h-5 flex-shrink-0" />
              ) : (
                <HiOutlineClipboard className="w-5 h-5 flex-shrink-0" />
              )}
              <span>{copyBtn.label}</span>
            </button>
          </motion.div>
          <motion.a
            href={dexBtn.href}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.16 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className={`inline-flex items-center gap-3 px-8 py-4 rounded-xl border backdrop-blur-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl text-text-primary ${dexBtn.className}`}
          >
            <HiOutlineExternalLink className="w-5 h-5 flex-shrink-0" />
            <span>{dexBtn.label}</span>
          </motion.a>
        </div>
      </div>
    </section>
  );
}
