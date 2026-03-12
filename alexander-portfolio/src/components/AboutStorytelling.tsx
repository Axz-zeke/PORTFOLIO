"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { Monitor, Download, ArrowRight } from "lucide-react";
import LiquidMask from "./LiquidMask";
import { Spotlight } from "@/components/ui/spotlight-new";

function BioParagraph({ i, bioScroll, isLast, children }: { i: number, bioScroll: any, isLast: boolean, children: React.ReactNode }) {
  // If it's the last paragraph, we don't fade it out at the end of the scroll
  const opacityRange = isLast
    ? [(i * 0.25) - 0.05, i * 0.25, 1, 1]
    : [(i * 0.25) - 0.05, i * 0.25, (i * 0.25) + 0.18, (i + 1) * 0.25];

  const yRange = isLast
    ? [(i * 0.25) - 0.05, i * 0.25, 1]
    : [(i * 0.25) - 0.05, i * 0.25, (i + 1) * 0.25];

  const opacity = useTransform(bioScroll, opacityRange, [0, 1, 1, isLast ? 1 : 0]);
  const y = useTransform(bioScroll, yRange, [15, 0, isLast ? 0 : -15]);

  return (
    <motion.p
      style={{ opacity, y }}
      className="absolute inset-0 text-lg md:text-xl font-medium leading-relaxed text-white/60 uppercase tracking-wide"
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
    <>I am <strong className="text-white">Alexander S. Lopez</strong>, graduate in Information Technology. My technical expertise is anchored by multiple <strong className="text-white">Cisco certifications</strong>, including <strong className="text-white">CyberOps Associate and CCNA</strong>, alongside a strong background in full-stack development.</>,
    <>My professional career began at <strong className="text-white">ShoreAgents</strong>, where I was immediately challenged to study and master the company&apos;s entire IT infrastructure independently from my very first day. For the first half of my tenure, I served as the <strong className="text-white">sole IT Specialist</strong>, managing every aspect of the technology stack for over 200 employees. This included providing <strong className="text-white">Level 1–3 technical support</strong>, maintaining firewall security policies, and implementing a <strong className="text-white">Network Monitoring System (NMS)</strong> with dual ISP traffic segregation to ensure maximum reliability.</>,
    <>I bridge the gap between robust infrastructure and modern software solutions. I developed a custom <strong className="text-white">Asset Management System using Next.js 15 and Supabase</strong>, featuring an automated QR-tracking ecosystem and a dynamic schema-driven architecture for real-time inventory control. Beyond software, I manage complex physical security and connectivity, including <strong className="text-white">Ubiquiti UniFi wireless controllers</strong>, Hikvision CCTV systems, and biometric access via ZKTeco and CrossChex.</>,
    <>Whether I am leading large-scale cloud migrations from <strong className="text-white">Microsoft 365 to Google Workspace</strong> or building type-safe applications with <strong className="text-white">TypeScript</strong>, I focus on creating secure, efficient, and scalable environments that drive organizational success.</>
  ];

  return (
    <section id="about" ref={bioRef} className="relative w-full h-[450vh]">
      {/* Scroll Indicator Dot-line or track could go here */}

      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex items-center justify-center bg-[#050505]">
        {/* Animated background restricted to this view */}
        <Spotlight />

        <div className="relative z-10 px-6 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10 md:gap-20 w-full">
          {/* Left Column — Text */}
          <div className="flex-1 space-y-8 text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 border border-white/10 bg-white/5 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-white/40"
            >
              <Monitor className="w-3 h-3" />
              IT Specialist &amp; Full-Stack Developer
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.85] text-white uppercase"
            >
              About<br />
              <span style={{ WebkitTextStroke: "2px #fff", color: "transparent" }}>
                Me.
              </span>
            </motion.h1>

            <div className="relative h-[400px] sm:h-[350px] md:h-[320px] max-w-3xl mx-auto md:mx-0 mt-6 md:mt-10">
              {bioParagraphs.map((text, i) => (
                <BioParagraph key={i} i={i} bioScroll={bioScroll} isLast={i === bioParagraphs.length - 1}>
                  {text}
                </BioParagraph>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start mt-12 md:mt-20"
            >
              <button className="h-14 px-8 rounded-2xl bg-white text-black text-sm font-black uppercase tracking-widest flex items-center gap-2 hover:scale-[1.03] active:scale-[0.97] transition-transform shadow-xl shadow-white/5 cursor-pointer">
                Download Resume
                <Download className="w-4 h-4" />
              </button>
              <button className="h-14 px-8 rounded-2xl border border-white/20 bg-white/5 backdrop-blur-md text-sm font-black uppercase tracking-widest text-white flex items-center gap-2 hover:bg-white hover:text-black transition-all group cursor-pointer" onClick={() => window.location.href = '#experience'}>
                View Projects
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          </div>

          {/* Right Column — 3D Tilt Liquid Portrait */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 50 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
            className="flex-shrink-0 w-full max-w-[260px] sm:max-w-[320px] md:max-w-[400px] aspect-[3/4] relative group"
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
          </motion.div>
        </div>
      </div>
    </section>
  );
}
