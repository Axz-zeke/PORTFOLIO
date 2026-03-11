"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import LiquidMask from "@/components/LiquidMask";
import GlobalLiquidBackground from "@/components/GlobalLiquidBackground";
import BinaryBackground from "@/components/BinaryBackground";
import InteractiveBridge from "@/components/InteractiveBridge";
import BentoGrid from "@/components/BentoGrid";
import TerminalLoader from "@/components/TerminalLoader";
import CustomCursor from "@/components/CustomCursor";
import AboutStorytelling from "@/components/AboutStorytelling";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Github,
  Linkedin,
  Mail,
  Download,
  ArrowRight,
  Monitor,
  Rocket,
  Menu,
  X,
  ChevronDown
} from "lucide-react";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY, scrollYProgress } = useScroll();

  // Intro section exit animations
  const introOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const introScale = useTransform(scrollYProgress, [0, 0.4], [1, 0.95]);
  const introY = useTransform(scrollYProgress, [0, 0.4], [0, -50]);

  // Reveal nav after 200px of scroll
  const navOpacity = useTransform(scrollY, [100, 300], [0, 1]);
  const navY = useTransform(scrollY, [100, 300], [-20, 0]);
  const navScale = useTransform(scrollY, [100, 300], [0.95, 1]);

  return (
    <>
      <CustomCursor />

      <AnimatePresence mode="wait">
        {isLoading ? (
          <TerminalLoader key="loader" onComplete={() => setIsLoading(false)} />
        ) : (
          <motion.main
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative min-h-screen bg-[#050505] will-change-opacity"
            style={{ color: "#f8f9fb" }}
          >
            {/* Navigation */}
            <motion.nav
              style={{ opacity: navOpacity, y: navY, scale: navScale }}
              className="fixed top-0 left-0 w-full z-50 px-6 py-6 flex items-center justify-between pointer-events-none data-[visible=true]:pointer-events-auto"
              data-visible={scrollY.get() > 100}
            >
              {/* Name — top left, stacked like reference */}
              <div className="flex flex-col leading-none cursor-pointer">
                <span className="font-black text-xs uppercase tracking-tighter text-white">Alexander</span>
                <span className="font-black text-xs uppercase tracking-tighter text-white">Lopez</span>
              </div>

              {/* Desktop Nav Links */}
              <div className="hidden md:flex items-center gap-6 bg-black/40 border border-white/10 px-6 py-2 rounded-2xl backdrop-blur-xl shadow-sm">
                <a href="#about" className="text-xs font-black uppercase tracking-widest hover:text-white transition-colors text-white/60">About</a>
                <a href="#experience" className="text-xs font-black uppercase tracking-widest hover:text-white transition-colors text-white/60">Experience</a>
                <a href="#projects" className="text-xs font-black uppercase tracking-widest hover:text-white transition-colors text-white/60">Projects</a>
                <a href="#contact" className="text-xs font-black uppercase tracking-widest hover:text-white transition-colors text-white/60">Contact</a>
              </div>

              <div className="flex items-center gap-2">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                  <div className="h-9 w-9 flex items-center justify-center rounded-xl border border-white/10 bg-black/40 backdrop-blur-md hover:bg-white hover:text-black text-white transition-all cursor-pointer">
                    <Github size={16} />
                  </div>
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                  <button className="h-9 px-5 flex items-center gap-2 rounded-xl border border-white bg-white text-black text-[10px] font-black uppercase tracking-widest hover:bg-white/80 transition-all">
                    Let's Talk
                  </button>
                </a>
                {/* Mobile Hamburger */}
                <button
                  className="rounded-xl flex-shrink-0 md:hidden h-9 w-9 flex items-center justify-center border border-white/10 bg-black/40 text-white"
                  onClick={() => setMenuOpen(!menuOpen)}
                >
                  {menuOpen ? <X size={18} /> : <Menu size={18} />}
                </button>
              </div>
            </motion.nav>

            {/* Mobile Menu */}
            {menuOpen && (
              <div className="fixed top-[72px] left-0 w-full z-40 bg-[#050505]/95 backdrop-blur-xl border-b border-white/10 flex flex-col items-center gap-6 py-8 md:hidden">
                {["#about", "#experience", "#projects", "#contact"].map((href) => (
                  <a key={href} href={href} onClick={() => setMenuOpen(false)}
                    className="text-sm font-black uppercase tracking-widest hover:text-white transition-colors text-white/60">
                    {href.replace("#", "")}
                  </a>
                ))}
              </div>
            )}

            {/* NEW 1st SECTION: INTRO ONLY */}
            <section className="relative w-full h-[100dvh] flex flex-col items-center justify-center overflow-hidden bg-[#050505]">
              {/* Binary Text Animation */}
              <BinaryBackground />

              <motion.div
                style={{ opacity: introOpacity, scale: introScale, y: introY }}
                className="relative z-20 text-center px-6"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="mb-6"
                >
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30">Portfolio 2025</span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                  className="text-7xl sm:text-8xl md:text-9xl lg:text-[12rem] font-black tracking-tighter leading-none text-white select-none"
                >
                  ALEXANDER<br />
                  LOPEZ
                </motion.h1>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 1, ease: "easeOut" }}
                  className="mt-12 flex flex-col items-center gap-4"
                >
                  <p className="text-xs font-black uppercase tracking-[0.3em] text-white/50">IT Specialist • Full-Stack Developer</p>
                  <div className="w-px h-12 bg-white/10 mt-4 animate-bounce" />
                </motion.div>
              </motion.div>

              {/* Blending Gradient at bottom */}
              <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-[#050505] to-transparent z-30 pointer-events-none" />

              {/* Binary Text Animation and Noise already present */}
            </section>

            {/* TRANSITION MARQUEE: BETWEEN INTRO AND HERO */}
            <InteractiveBridge />

            {/* HERO/ABOUT SECTION — Scroll storytelling */}
            <AboutStorytelling />

            {/* Marquee divider — cohesive dark theme */}
            <div className="w-full overflow-hidden pointer-events-none select-none py-10 border-y border-white/5 bg-black/40">
              <p className="text-[10vw] font-black tracking-tighter text-white/[0.03] whitespace-nowrap">
                IT SPECIALIST &nbsp;&nbsp; FULL-STACK DEV &nbsp;&nbsp; NETWORK ADMIN &nbsp;&nbsp;
                IT SPECIALIST &nbsp;&nbsp; FULL-STACK DEV &nbsp;&nbsp; NETWORK ADMIN
              </p>
            </div>

            {/* Experience / Bento Grid — fitted to viewport */}
            <section id="experience" className="min-h-screen flex flex-col justify-center py-24 bg-transparent">
              <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
                <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-4 text-white">
                  ENGINEERING <span className="text-white/10">&</span> DESIGN
                </h2>
                <p className="text-white/30 uppercase tracking-[0.2em] font-black text-[10px]">Professional Experience &amp; Educational Foundation</p>
              </div>
              <BentoGrid />
            </section>

            {/* Projects Hook Section — fitted to viewport and light theme */}
            <section id="projects" className="min-h-screen flex flex-col justify-center py-32 px-6 bg-transparent">
              <div className="max-w-7xl mx-auto flex flex-col items-center">
                <h2 className="text-3xl sm:text-5xl md:text-8xl font-black text-center mb-16 italic text-white">
                  CRAFTING MODERN <br />
                  <span style={{ WebkitTextStroke: "2px rgba(255,255,255,0.1)", color: "transparent" }}>SOLUTIONS.</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                  <div className="rounded-[40px] overflow-hidden border border-white/10 bg-white/5 backdrop-blur-md group cursor-pointer hover:shadow-2xl hover:border-white/20 hover:-translate-y-1 transition-all p-10">
                    <Badge variant="outline" className="w-fit mb-4 border-white/10 text-white/30 text-[10px] font-black uppercase tracking-widest">Capstone 2025</Badge>
                    <h3 className="text-4xl font-black leading-none text-white mb-4">PermitEase</h3>
                    <p className="text-white/40 text-base leading-relaxed mb-8">Cloud-Based Automated School Exam Permit System. A revolutionary way to handle digital permissions in academic environments.</p>
                    <div className="w-full aspect-video bg-white/[0.03] rounded-3xl flex items-center justify-center group-hover:bg-white/[0.06] transition-colors">
                      <Monitor className="w-16 h-16 text-white/10 group-hover:text-white/30 group-hover:scale-110 transition-all" />
                    </div>
                  </div>

                  <div className="rounded-[40px] overflow-hidden border border-white/10 bg-white/5 backdrop-blur-md group cursor-pointer hover:shadow-2xl hover:border-white/20 hover:-translate-y-1 transition-all p-10">
                    <Badge variant="outline" className="w-fit mb-4 border-white/10 text-white/30 text-[10px] font-black uppercase tracking-widest">IT Administration</Badge>
                    <h3 className="text-4xl font-black leading-none text-white mb-4">Asset Management System</h3>
                    <p className="text-white/40 text-base leading-relaxed mb-8">Next-Gen inventory control for ShoreAgents using Next.js 15 and Supabase, featuring real-time QR tracking.</p>
                    <div className="w-full aspect-video bg-white/[0.03] rounded-3xl flex items-center justify-center group-hover:bg-white/[0.06] transition-colors">
                      <Monitor className="w-16 h-16 text-white/10 group-hover:text-white/30 group-hover:scale-110 transition-all" />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* CTA Section — fitted to viewport with premium rounding */}
            <section id="contact" className="min-h-[90vh] flex flex-col justify-center px-6 relative overflow-hidden bg-black text-white rounded-t-[60px] md:rounded-t-[120px] mt-10">
              <div className="absolute inset-0 opacity-10 pointer-events-none"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='100' viewBox='0 0 40 100'%3E%3Cpath d='M20 0 Q 30 12.5, 20 25 Q 10 37.5, 20 50 Q 30 62.5, 20 75 Q 10 87.5, 20 100' fill='none' stroke='%23ffffff' stroke-width='1'/%3E%3C/svg%3E")`,
                  backgroundSize: "40px 100px",
                }}
              />
              <div className="max-w-5xl mx-auto text-center relative z-10 flex flex-col items-center">
                <h2 className="text-5xl md:text-8xl font-black mb-12 leading-tight tracking-tighter uppercase italic">
                  READY TO <br />
                  EVOLVE?
                </h2>
                <div className="flex flex-wrap items-center justify-center gap-6">
                  <a href="mailto:alexandersanalilalopez05@gmail.com"
                    className="h-16 px-10 bg-white text-black font-black text-sm rounded-2xl flex items-center gap-2 hover:scale-[1.05] transition-all shadow-2xl">
                    <Mail className="shrink-0" />
                    <span className="truncate">alexandersanalilalopez05@gmail.com</span>
                  </a>
                  <div className="flex gap-4">
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
                      className="size-16 border border-white/20 rounded-2xl flex items-center justify-center hover:bg-white/10 transition-colors">
                      <Linkedin />
                    </a>
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer"
                      className="size-16 border border-white/20 rounded-2xl flex items-center justify-center hover:bg-white/10 transition-colors">
                      <Github />
                    </a>
                  </div>
                </div>
              </div>
            </section>

            {/* Footer — solid black to match CTA */}
            <footer className="py-12 px-6 text-center bg-black">
              <p className="text-[10px] text-white/30 font-black uppercase tracking-[0.4em]">© 2025 ALEXANDER LOPEZ. CRAFTED WITH NEXT.JS &amp; PASSION.</p>
            </footer>
          </motion.main>
        )}
      </AnimatePresence>
    </>
  );
}
