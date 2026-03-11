"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function CustomCursor() {
  const [isPointer, setIsPointer] = useState(false);
  const [noNegative, setNoNegative] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [clickCount, setClickCount] = useState(0);

  const STAGES = [24, 48, 96, 192, 0];
  const currentSize = STAGES[clickCount % STAGES.length];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });

      const target = e.target as HTMLElement;

      // Check for interactive elements
      setIsPointer(
        window.getComputedStyle(target).cursor === "pointer" ||
        target.tagName === "BUTTON" ||
        target.tagName === "A"
      );

      // Check if we should disable the negative effect (mix-blend-difference)
      const noNeg = !!target.closest('[data-no-negative="true"]');
      setNoNegative(noNeg);
    };

    const handleClick = () => {
      setClickCount((prev) => (prev + 1));
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[10000] transform-gpu flex items-center justify-center"
        animate={{
          x: position.x - currentSize / 2,
          y: position.y - currentSize / 2,
          width: currentSize,
          height: currentSize,
          scale: isPointer && currentSize > 0 ? 1.2 : 1,
          opacity: (currentSize === 0 || noNegative) ? 0 : 1,
          mixBlendMode: ("difference" as any),
          backgroundColor: "rgba(255, 255, 255, 1)",
        }}
        transition={{ type: "spring", stiffness: 250, damping: 30, mass: 0.6 }}
      >
        {/* Only show inner ring for larger sizes when not deactivated */}
        {currentSize > 80 && !noNegative && (
          <div className="w-[90%] h-[90%] border border-black/20 rounded-full" />
        )}
      </motion.div>

      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-white rounded-full pointer-events-none z-[10000] transform-gpu"
        animate={{
          x: position.x - 0.75,
          y: position.y - 0.75,
          opacity: currentSize === 0 ? 0 : 1,
        }}
        transition={{ type: "tween", ease: "linear", duration: 0 }}
      />
    </>
  );
}
