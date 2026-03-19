"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence } from "framer-motion";
import { Monitor, Download, ArrowRight, ChevronDown, X } from "lucide-react";
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
      className="absolute inset-0 text-base sm:text-lg md:text-xl font-medium leading-relaxed text-white/60 uppercase tracking-wide"
    >
      {children}
    </motion.p>
  );
}

export default function AboutStorytelling() {
  const [showFullBio, setShowFullBio] = useState(false);
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
    <section id="about" ref={bioRef} className="relative w-full h-auto min-h-screen lg:h-[450vh] bg-[#050505]">
      <div className="relative lg:sticky top-0 left-0 w-full min-h-screen lg:h-screen overflow-hidden flex items-center justify-center bg-[#050505] pt-32 pb-12 lg:py-0">
        <div className="hidden lg:block">
          <Spotlight />
        </div>

        <div className="relative z-10 px-6 max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between lg:justify-center gap-6 lg:gap-20 w-full h-full lg:h-auto overflow-y-auto lg:overflow-visible">
          
          {/* Badge TOP on mobile */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:hidden inline-flex items-center gap-2 border border-white/10 bg-white/5 backdrop-blur-md px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest text-white/40"
          >
            <Monitor className="w-2.5 h-2.5" />
            IT Specialist &amp; Full-Stack Developer
          </motion.div>
          
          {/* Portrait SECOND on mobile */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
            className="flex-shrink-0 w-full max-w-[320px] lg:max-w-[400px] aspect-[3/4] relative group"
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
            onMouseLeave={() => { tiltX.set(0); tiltY.set(0); }}
          >
            <motion.div
              className="relative w-full h-full rounded-[40px] overflow-hidden border border-white/[0.1] shadow-2xl bg-[#0a0a0a]"
              style={{ rotateX: springTiltX, rotateY: springTiltY, transformStyle: "preserve-3d", perspective: "1200px" }}
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
              <motion.div className="absolute inset-0 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ background: reflexBackground }} />
              <div className="absolute top-4 md:top-6 right-4 md:right-6 z-20" style={{ transform: "translateZ(60px)" }}>
                <div className="bg-black/80 backdrop-blur-xl px-3 md:px-5 py-1.5 md:py-2.5 rounded-xl md:rounded-2xl flex items-center gap-2 border border-white/10 shadow-2xl">
                  <div className="w-2 h-2 md:w-2.5 md:h-2.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                  <span className="text-[9px] md:text-[11px] font-black uppercase tracking-widest text-white/90">Available for Hire</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Text Content */}
          <div className="flex-1 space-y-3 lg:space-y-8 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="hidden lg:inline-flex items-center gap-2 border border-white/10 bg-white/5 backdrop-blur-md px-3 lg:px-4 py-1 lg:py-1.5 rounded-full text-[9px] lg:text-[10px] font-black uppercase tracking-widest text-white/40"
            >
              <Monitor className="w-2.5 h-2.5 lg:w-3 lg:h-3" />
              IT Specialist &amp; Full-Stack Developer
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.85] text-white uppercase text-center lg:text-left pt-4 lg:pt-0"
            >
              About Me<span style={{ WebkitTextStroke: "1px #fff", color: "transparent" }}>.</span>
            </motion.h1>

            {/* Mobile-Only Preview Paragraph (Up to 1024px) */}
            <div className="lg:hidden space-y-6 mt-6">
              <p className="text-base font-medium leading-relaxed text-white/60 uppercase tracking-wide text-center">
                {bioParagraphs[0]}
              </p>
              <button 
                onClick={() => setShowFullBio(true)}
                className="mx-auto flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-white/30 hover:text-white transition-colors group pb-4"
              >
                Read More
                <ChevronDown className="w-3 h-3 group-hover:translate-y-1 transition-transform" />
              </button>
            </div>

            {/* Desktop Only Scroll Storytelling (Above 1024px) */}
            <div className="hidden lg:block relative h-[320px] max-w-3xl mx-auto lg:mx-0">
              {bioParagraphs.map((text, i) => (
                <BioParagraph key={i} i={i} bioScroll={bioScroll} isLast={i === bioParagraphs.length - 1}>
                  {text}
                </BioParagraph>
              ))}
            </div>

            {/* Full Bio Modal (Mobile/Tablet Only - Up to 1024px) */}
            <AnimatePresence>
              {showFullBio && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 lg:hidden">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setShowFullBio(false)}
                    className="absolute inset-0 bg-black/90 backdrop-blur-2xl"
                  />
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    className="relative w-full max-h-[80vh] overflow-hidden bg-[#0a0a0a] border border-white/10 rounded-[32px] flex flex-col shadow-2xl"
                  >
                    <div className="p-8 border-b border-white/5 flex items-center justify-between sticky top-0 bg-[#0a0a0a] z-10">
                      <h3 className="text-xl font-black uppercase tracking-widest text-white italic">Full Story</h3>
                      <button onClick={() => setShowFullBio(false)} className="size-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white">
                        <X className="size-5" />
                      </button>
                    </div>
                    <div className="p-8 overflow-y-auto space-y-10 custom-scrollbar">
                      {bioParagraphs.map((text, idx) => (
                        <p key={idx} className="text-base font-medium leading-relaxed text-white/60 uppercase tracking-wide first-of-type:text-white">
                          {text}
                        </p>
                      ))}
                    </div>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
