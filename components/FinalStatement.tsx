"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function FinalStatement() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="relative z-10 py-32 px-6 md:px-16 lg:px-24"
    >
      <motion.div
        className="max-w-4xl mx-auto text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight gradient-text-animate animate-float-slow">
          Kindness is not a crime.
          <br />
          Compassion is not misconduct.
        </p>
      </motion.div>
    </section>
  );
}
