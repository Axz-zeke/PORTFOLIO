"use client";

import { useEffect, useRef } from "react";

const BinaryBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const fontSize = 18; // Larger font = fewer bits = better performance
    const columns = Math.ceil(canvas.width / fontSize) + 1;
    const rows = Math.ceil(canvas.height / fontSize) + 1;

    const bits = Array.from({ length: columns * rows }, () => ({
      value: Math.random() > 0.5 ? "1" : "0",
      opacity: Math.random() * 0.2,
      targetOpacity: Math.random() * 0.3,
      flickerSpeed: 0.01 + Math.random() * 0.03,
    }));

    let animationId: number;

    const draw = (time: number) => {
      // Clean clear for absolute darkness
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.font = `500 ${fontSize}px Geist Mono, monospace`;

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const maskRadius = Math.max(canvas.width, canvas.height) * 0.8;

      for (let r = 0; r < rows; r++) {
        const speed = 0.015;
        const direction = r % 2 === 0 ? 1 : -1;
        const rowOffset = (time * speed * direction) % (fontSize * 4);

        for (let c = 0; c < columns; c++) {
          const index = r * columns + c;
          const bit = bits[index];

          const x = (c - 1) * fontSize + rowOffset;
          const y = r * fontSize;

          const dx = x - centerX;
          const dy = y - centerY;
          const dist = Math.sqrt(dx * dx + dy * dy);

          // Apply exponential curve (x^2) for a much smoother and wider center "hollow"
          const maskVal = Math.pow(Math.min(1, dist / maskRadius), 2);

          if (Math.abs(bit.opacity - bit.targetOpacity) < 0.01) {
            bit.targetOpacity = Math.random() * 0.4;
          }
          bit.opacity += (bit.targetOpacity - bit.opacity) * bit.flickerSpeed;

          const alpha = bit.opacity * maskVal;

          if (alpha > 0.01) {
            ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
            ctx.fillText(bit.value, x, y);
          }

          if (Math.random() > 0.998) {
            bit.value = bit.value === "1" ? "0" : "1";
          }
        }
      }
      animationId = requestAnimationFrame(draw);
    };

    animationId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 pointer-events-none"
    />
  );
};

export default BinaryBackground;
