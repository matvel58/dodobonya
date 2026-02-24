"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const DATA = [{ name: "Community", value: 100, color: "#FF6A00" }];

export default function TokenomicsSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative z-10 py-24 px-6 md:px-16 lg:px-24 bg-navy/50"
    >
      <div className="max-w-3xl mx-auto">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center gradient-text-animate mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
        >
          100% Community Owned
        </motion.h2>
        <motion.p
          className="text-center text-white/60 mb-16"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.1 }}
        >
          The entire token supply belongs to the community.
        </motion.p>

        <motion.div
          className="relative rounded-2xl bg-white/5 border border-white/10 backdrop-blur-lg p-8 md:p-12"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Radial glow behind chart */}
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none overflow-hidden"
            style={{
              background: "radial-gradient(ellipse 70% 70% at 50% 50%, rgba(255, 106, 0, 0.12) 0%, transparent 65%)",
            }}
          />
          <div className="relative h-[280px] w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={85}
                  outerRadius={120}
                  dataKey="value"
                  animationBegin={0}
                  animationDuration={1200}
                  stroke="rgba(11, 18, 32, 0.6)"
                  strokeWidth={2}
                >
                  {DATA.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="text-lg md:text-xl font-semibold text-text-primary/90">
                Community Controlled
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
