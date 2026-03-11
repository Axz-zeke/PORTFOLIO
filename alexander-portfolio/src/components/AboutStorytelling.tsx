"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { Monitor, Download, ArrowRight } from "lucide-react";
import LiquidMask from "./LiquidMask";
import GlobalLiquidBackground from "./GlobalLiquidBackground";

function BioParagraph({ i, bioScroll, children }: { i: number, bioScroll: any, children: React.ReactNode }) {
  // Tighten ranges to minimize overlap and ensure a "one-out, one-in" feel
  const opacity = useTransform(
    bioScroll,
    [
      (i * 0.25) - 0.05, // Start fading in slightly before the "spot"
      i * 0.25,          // Fully in
      (i * 0.25) + 0.18, // Hold fully in
      (i + 1) * 0.25     // Fully out before next one hits peak
    ],
    [0, 1, 1, 0]
  );

  const y = useTransform(
    bioScroll,
    [(i * 0.25) - 0.05, i * 0.25, (i + 1) * 0.25],
    [15, 0, -15]
  );

  return (
    <motion.p
      style={{ opacity, y }}
      className="absolute inset-0 text-sm font-medium leading-relaxed text-white/60 uppercase tracking-wide"
    >
      {children}
    </motion.p>
  );
}

export default function AboutStorytelling() {
  const bioRef = useRef(null);
  const { scrollYProgress: bioScroll } = useScroll({
    target: bioRef,
    offset: ["start start", "end end"]
  });

  // Dynamic Background Glow linked to scroll
  const glowOpacity = useTransform(bioScroll, [0, 0.5, 1], [0.1, 0.2, 0.1]);
  const glowScale = useTransform(bioScroll, [0, 0.5, 1], [1, 1.2, 1]);

  // 3D Tilt Values
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const springTiltX = useSpring(tiltX, { stiffness: 100, damping: 30 });
  const springTiltY = useSpring(tiltY, { stiffness: 100, damping: 30 });

  // Reflex/Gloss Values
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);
  const reflexBackground = useTransform(
    [glowX, glowY],
    ([x, y]) => `radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,0.15) 0%, transparent 60%)`
  );

  const bioParagraphs = [
    <>I am <strong className="text-white">Alexander S. Lopez</strong>, a Cum Laude graduate in IT. My foundation is supported by <strong className="text-white">Cisco CyberOps</strong> and CCNA certifications, alongside proficiency in <strong className="text-white">Django, ReactJS, and AWS</strong>.</>,
    <>My journey began at <strong className="text-white">ShoreAgents</strong> as an IT Specialist. I operated as the <strong className="text-white">sole administrator</strong>, taking full responsibility for managing and maintaining the entire IT infrastructure from the ground up.</>,
    <>I provided support for <strong className="text-white">200+ employees</strong>, configured firewall security, and implemented an <strong className="text-white">NMS with dual ISP segregation</strong> to ensure 99.9% network reliability and technical autonomy.</>,
    <>I led projects like migrating to <strong className="text-white">Google Workspace</strong> and supporting early-stage development. I excel at troubleshooting complex hardware while building <strong className="text-white">automated digital solutions</strong>.</>
  ];

  return (
    <section id="about" ref={bioRef} className="relative w-full h-[450vh]">
      {/* Scroll Indicator Dot-line or track could go here */}

      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex items-center justify-center bg-[#050505]">
        {/* Animated background restricted to this view */}
        <GlobalLiquidBackground />

        {/* Ambient Scroll Glow */}
        <motion.div
          style={{ opacity: glowOpacity, scale: glowScale }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0%,transparent_70%)] pointer-events-none"
        />

        <div className="relative z-10 px-6 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10 md:gap-20 w-full">
          {/* Left Column — Text */}
          <div className="flex-1 space-y-8 text-center md:text-left">
            <div className="inline-flex items-center gap-2 border border-white/10 bg-white/5 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-white/40">
              <Monitor className="w-3 h-3" />
              IT Specialist &amp; Full-Stack Developer
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.85] text-white uppercase">
              About<br />
              <span style={{ WebkitTextStroke: "2px #fff", color: "transparent" }}>
                Me.
              </span>
            </h1>

            <div className="relative h-40 sm:h-32 md:h-24 max-w-md mx-auto md:mx-0">
              {bioParagraphs.map((text, i) => (
                <BioParagraph key={i} i={i} bioScroll={bioScroll}>
                  {text}
                </BioParagraph>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start pt-4">
              <button className="h-14 px-8 rounded-2xl bg-white text-black text-sm font-black uppercase tracking-widest flex items-center gap-2 hover:scale-[1.03] active:scale-[0.97] transition-transform shadow-xl shadow-white/5 cursor-pointer">
                Download Resume
                <Download className="w-4 h-4" />
              </button>
              <button className="h-14 px-8 rounded-2xl border border-white/20 bg-white/5 backdrop-blur-md text-sm font-black uppercase tracking-widest text-white flex items-center gap-2 hover:bg-white hover:text-black transition-all group cursor-pointer" onClick={() => window.location.href = '#experience'}>
                View Projects
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right Column — 3D Tilt Liquid Portrait */}
          <div className="flex-shrink-0 w-full max-w-[260px] sm:max-w-[320px] md:max-w-[400px] aspect-[3/4] relative group"
            data-no-negative="true"
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = (e.clientX - rect.left) / rect.width;
              const y = (e.clientY - rect.top) / rect.height;
              tiltX.set((y - 0.5) * 15);
              tiltY.set((x - 0.5) * -15);
              glowX.set(x * 100);
              glowY.set(y * 100);
            }}
            onMouseLeave={() => {
              tiltX.set(0);
              tiltY.set(0);
            }}
          >
            {/* Background Aura */}
            <div className="absolute -inset-10 rounded-[60px] bg-white/[0.02] blur-[100px] pointer-events-none" />

            <motion.div
              className="relative w-full h-full rounded-[40px] overflow-hidden border border-white/[0.1] shadow-2xl bg-[#0a0a0a]"
              style={{
                rotateX: springTiltX,
                rotateY: springTiltY,
                transformStyle: "preserve-3d",
                perspective: "1200px"
              }}
            >
              <div className="absolute inset-0 z-0 scale-[1.01]">
                <LiquidMask
                  imageBase="/funko.png"
                  imageHover="/PROFILE.png"
                  className="w-full h-full"
                  splatRadius={0.14}
                  splatStrength={1.2}
                  dissipation={0.8}
                />
              </div>

              {/* Dynamic Sheen */}
              <motion.div
                className="absolute inset-0 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                style={{ background: reflexBackground }}
              />

              <div className="absolute top-6 right-6 z-20" style={{ transform: "translateZ(60px)" }}>
                <div className="bg-black/80 backdrop-blur-xl px-5 py-2.5 rounded-2xl flex items-center gap-2.5 border border-white/10 shadow-2xl">
                  <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                  <span className="text-[11px] font-black uppercase tracking-widest text-white/90">Available for Hire</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
