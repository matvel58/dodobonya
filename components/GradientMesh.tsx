"use client";

import { motion } from "framer-motion";

export default function GradientMesh() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <motion.div
        className="absolute w-[120%] h-[120%] -left-[10%] -top-[10%] opacity-30 animate-mesh"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 20% 40%, rgba(255, 106, 0, 0.12) 0%, transparent 50%), radial-gradient(ellipse 60% 40% at 80% 60%, rgba(255, 140, 66, 0.08) 0%, transparent 50%), radial-gradient(ellipse 50% 30% at 50% 80%, rgba(255, 106, 0, 0.06) 0%, transparent 50%)",
        }}
      />
    </div>
  );
}
