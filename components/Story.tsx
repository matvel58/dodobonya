"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const cards = [
  {
    title: "Worker fired after giving a blanket in –20°C",
    description:
      "A compassionate worker offered warmth to a dog in freezing conditions—and lost their job for it.",
  },
  {
    title: "Public outrage followed",
    description:
      "The story spread. People everywhere stood up for kindness and accountability.",
  },
  {
    title: "Company denied the reason",
    description:
      "Despite the outcry, the company refused to acknowledge the true cause.",
  },
  {
    title: "DODOBONYA is now safe and protected",
    description:
      "Today, DODOBONYA is cared for. The community ensures this story is never forgotten.",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Story() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="story"
      ref={ref}
      className="relative z-10 py-24 px-6 md:px-16 lg:px-24"
    >
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center text-text-primary mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          The Story
        </motion.h2>
        <motion.p
          className="text-center text-white/70 max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          What happened—and why we stand together.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="relative rounded-2xl bg-white/5 border border-white/10 backdrop-blur-lg p-6 md:p-8 overflow-hidden group"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent to-amber-500" />
              <h3 className="text-xl font-semibold text-text-primary mb-2">
                {card.title}
              </h3>
              <p className="text-white/70 leading-relaxed">{card.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
