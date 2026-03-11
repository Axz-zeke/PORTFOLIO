"use client";

import { useRef, useEffect, useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  useAnimationFrame,
  useMotionValue,
} from "framer-motion";
import { wrap } from "@motionone/utils";

interface ParqueeProps {
  baseVelocity: number;
}

function Parquee({ baseVelocity = 100 }: ParqueeProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

  const directionFactor = useRef<number>(1);
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();

    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="overflow-hidden whitespace-nowrap flex flex-nowrap cursor-grab active:cursor-grabbing">
      <motion.div 
        className="flex whitespace-nowrap flex-nowrap" 
        style={{ x }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={1}
        onDrag={(e, info) => {
          // Manual drag updates the position and sets the flow direction
          baseX.set(baseX.get() + info.delta.x * 0.05);
          if (info.delta.x !== 0) {
            directionFactor.current = info.delta.x > 0 ? 1 : -1;
          }
        }}
      >
        {[...Array(6)].map((_, i) => (
          <span key={i} className="text-[12vw] font-black tracking-tighter text-[#f1f5f9]/80 uppercase leading-none select-none px-12 block">
            READY TO KNOW ME?
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export default function InteractiveBridge() {
  return (
    <section className="w-full overflow-hidden py-16 md:py-24 bg-black/60 backdrop-blur-3xl relative shadow-[0_0_80px_rgba(0,0,0,0.1)] border-y border-white/[0.05]">
      {/* Subtle Noise to maintain texture */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden opacity-[0.05]">
        <div className="absolute inset-[-200%] bg-noise animate-noise" />
      </div>

      <div className="relative z-20">
        <Parquee baseVelocity={1} />
      </div>
    </section>
  );
}
