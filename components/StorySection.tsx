"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const STORY_PARAGRAPHS = [
  "In Chelyabinsk, a sweet stray dog known as DODOBONYA had been living outside a branch of Dodo Pizza for over a year and a half. Local staff members quietly cared for her — offering food, warmth, and support during harsh winter days.",
  "During a particularly brutal cold snap reaching –20 °C, a courier named Mikhail covered DODOBONYA with a blanket to help keep her warm. Shortly before this, a new manager had reportedly forbidden employees from helping the dog and threatened to fire anyone who disobeyed.",
  "Despite the ban, Mikhail chose compassion and covered the dog again. Soon after, he was fired from his job — a decision that sparked widespread outrage online. Thousands of people reacted, condemning the firing and calling for accountability.",
  "What began as a simple act of kindness turned into a movement of support. Today, DODOBONYA is safe and under protection, and the story continues to draw attention to compassion and community action. Updates and more details are shared in the official community.",
];

export default function StorySection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      id="story"
      ref={ref}
      className="relative z-10 py-24 md:py-32 px-6 md:px-8 lg:px-12"
    >
      {/* Soft orange radial glow behind container */}
      <div
        className="absolute inset-0 pointer-events-none flex justify-center items-start pt-32"
        aria-hidden
      >
        <div
          className="w-full max-w-[900px] h-[120%] rounded-3xl"
          style={{
            background: "radial-gradient(ellipse 85% 70% at 50% 20%, rgba(255, 106, 0, 0.08) 0%, transparent 60%)",
          }}
        />
      </div>

      <motion.div
        className="relative max-w-[900px] mx-auto rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl shadow-black/10 p-16 md:p-20"
        initial={{ opacity: 0, y: 32 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <h2 className="text-3xl md:text-4xl lg:text-[2.5rem] font-bold text-text-primary mb-14 md:mb-16">
          The Story Behind the Movement
        </h2>

        <div className="space-y-8 md:space-y-10 text-text-primary/95 text-lg md:text-xl leading-[1.8]">
          {STORY_PARAGRAPHS.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
