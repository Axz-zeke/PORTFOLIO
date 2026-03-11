"use client";

import { useRef, useEffect } from "react";

export default function GlobalLiquidBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const blobRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  // Raw mouse pos (local to canvas)
  const mouseRef = useRef({ x: -9999, y: -9999 });
  // Smoothed mouse for blob
  const smoothRef = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const setSize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    setSize();

    const ro = new ResizeObserver(setSize);
    ro.observe(canvas);

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };
    window.addEventListener("mousemove", handleMouseMove);

    const handleMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };
    canvas.addEventListener("mouseleave", handleMouseLeave);

    let t = 0;

    const draw = () => {
      const W = canvas.width;
      const H = canvas.height;
      if (W === 0 || H === 0) {
        rafRef.current = requestAnimationFrame(draw);
        return;
      }

      t += 0.007;

      // Smooth the blob cursor
      smoothRef.current.x = lerp(smoothRef.current.x, mouseRef.current.x, 0.07);
      smoothRef.current.y = lerp(smoothRef.current.y, mouseRef.current.y, 0.07);

      // Move DIV blob
      if (blobRef.current) {
        blobRef.current.style.transform = `translate(${smoothRef.current.x - 300}px, ${smoothRef.current.y - 300}px)`;
      }

      // Fill background — unified dark charcoal
      ctx.fillStyle = "#050505";
      ctx.fillRect(0, 0, W, H);

      const lineCount = 60;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // Interaction params
      const interactRadius = 220;
      const interactStrength = 100;

      for (let i = 0; i < lineCount; i++) {
        const baseX = (i / (lineCount - 1)) * W;
        const phase = (i / lineCount) * Math.PI * 2;

        // Opacity pulses subtly with time
        const opacity = 0.08 + 0.05 * Math.sin(phase + t * 0.4);
        ctx.beginPath();
        // Subtle white lines for dark mode
        ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.lineWidth = 0.5;

        for (let y = 0; y <= H; y += 4) {
          // Multi-layer autonomous waves
          const w1 = Math.sin(y * 0.015 + t + phase) * 12;
          const w2 = Math.sin(y * 0.008 - t * 1.5 + phase * 1.8) * 20;
          const w3 = Math.sin(y * 0.045 + t * 0.6 + phase * 0.4) * 8;
          const w4 = Math.sin(y * 0.005 + t * 0.3) * 25;
          const w5 = Math.sin(y * 0.060 - t * 2.0 + phase) * 4;

          let x = baseX + w1 + w2 + w3 + w4 + w5;

          // --- Cursor interaction: repulsion ---
          const dx = x - mx;
          const dy = y - my;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < interactRadius && dist > 0) {
            const falloff = Math.pow(1 - dist / interactRadius, 2.5);
            const pushX = (dx / dist) * interactStrength * falloff;
            x += pushX;
          }

          if (y === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      ro.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden bg-[#050505]">
      {/* Canvas — background color + animated + interactive lines */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Dark Vignette — subtly framing the content */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 80% 25% at 50% 0%, rgba(255,255,255,0.03) 0%, transparent 100%),
            radial-gradient(ellipse 80% 25% at 50% 100%, rgba(255,255,255,0.03) 0%, transparent 100%),
            radial-gradient(ellipse 20% 100% at 0% 50%, rgba(255,255,255,0.02) 0%, transparent 100%),
            radial-gradient(ellipse 20% 100% at 100% 50%, rgba(255,255,255,0.02) 0%, transparent 100%)
          `,
        }}
      />
    </div>
  );
}
