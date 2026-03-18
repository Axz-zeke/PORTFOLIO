"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import LiquidMask from "@/components/LiquidMask";
import GlobalLiquidBackground from "@/components/GlobalLiquidBackground";
import BinaryBackground from "@/components/BinaryBackground";
import InteractiveBridge from "@/components/InteractiveBridge";
import TerminalLoader from "@/components/TerminalLoader";
import CustomCursor from "@/components/CustomCursor";
import AboutStorytelling from "@/components/AboutStorytelling";
import TechStack from "@/components/TechStack";
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
  ChevronDown,
  LayoutGrid
} from "lucide-react";

function ProjectSection() {
  const [isExpanded, setIsExpanded] = useState(false);

  // Full detailed text content — and prepending short description
  const fullDescription = `ShoreAgents Assets Management is a modern, full-stack enterprise solution designed to simplify the lifecycle management of corporate assets. From acquisition to maintenance, the platform provides a centralized hub for tracking personnel and equipment.

Built with a focus on user experience and data integrity, the application leverages Next.js 15+, TypeScript, and Tailwind CSS for a premium, responsive interface. The backend is powered by Supabase, ensuring secure authentication, real-time database synchronization, and scalable file storage.

Core Features:
Integrated QR Ecosystem: One-click QR code generation and multi-modal scanning (Camera-based & File upload) for instant asset lookup and status updates.
Dynamic Asset Tracking: Comprehensive data management with advanced filtering, sorting, and pagination, supporting thousands of unique asset records.
Maintenance & Lifecycle Logs: Dedicated modules for logging repairs, tracking maintenance history, and managing dynamic forms.
Customizable "Pulse" Dashboard: A drag-and-drop enabled interface (via dnd-kit) allowing users to prioritize and organize asset categories.
Enterprise Data Tools: Built-in CSV import/export functionality for seamless manual data migration and reporting.
Full-Stack Security: Protected authentication flows and role-based data access integrated with Supabase Auth.

Tech Stack:
Frontend: Next.js 15+, React 19, TypeScript, Tailwind CSS, Radix UI (Shadcn), TanStack Query.
Backend: Supabase (Postgres, Auth, Edge Functions, Storage).
Utilities: Lucide Icons, Date-fns, Recharts, HTML5-QRCode.`;

  const sections = fullDescription.split(/(?=Core Features:|Tech Stack:)/);

  return (
    <section id="projects" className="min-h-screen flex flex-col justify-center py-32 px-6">
      <div className="max-w-[1400px] mx-auto w-full">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl md:text-8xl font-black text-center mb-16 text-white tracking-tighter"
        >
          PROJECTS<span className="text-white/10">.</span>
        </motion.h2>

        <motion.div 
          layout
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          {/* Main Layout Container — Dynamically changes layout on expand */}
          <motion.div 
            layout 
            className={`flex flex-col ${isExpanded ? 'items-center gap-16' : 'lg:flex-row lg:items-center gap-12 lg:gap-20'}`}
          >
            {/* Left/Top: Video Wrapper — Centers and grows on expand */}
            <motion.div 
              layout
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className={`relative shadow-[0_0_120px_rgba(255,255,255,0.03)] border border-white/5 bg-white/[0.02] rounded-[40px] overflow-hidden 
                ${isExpanded ? 'w-full max-w-5xl aspect-video' : 'w-full lg:w-[62%] aspect-video'}
              `}
            >
              <video 
                src="/preview.mp4" 
                autoPlay 
                loop 
                muted 
                playsInline 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
            </motion.div>

            {/* Right/Bottom: Content Summary — Shifts below on expand */}
            <motion.div 
              layout
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className={`flex flex-col ${isExpanded ? 'w-full max-w-[1400px] text-center items-center' : 'w-full lg:w-[38%]'}`}
            >
              <motion.div layout transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="mb-0 flex flex-col items-inherit">
                <motion.div layout>
                  <Badge 
                    variant="outline" 
                    className={`w-fit border-white/10 text-white/40 text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-lg mb-6 bg-white/5 ${isExpanded ? 'mx-auto' : ''}`}
                  >
                    Enterprise Solution
                  </Badge>
                </motion.div>
                
                <motion.h3 
                  layout
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className={`font-black text-white leading-[1.1] tracking-tighter transition-all duration-500 whitespace-nowrap
                  ${isExpanded ? 'text-4xl md:text-6xl xl:text-8xl mb-6' : 'text-4xl md:text-5xl xl:text-7xl mb-8'}
                `}>
                  {isExpanded ? (
                    "ShoreAgents Assets Management"
                  ) : (
                    <>ShoreAgents <br /> Assets Management</>
                  )}
                </motion.h3>
                
                <AnimatePresence mode="wait">
                  {!isExpanded && (
                    <motion.div
                      key="summary-content"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.4 }}
                    >
                      <p className="text-white/60 text-base md:text-xl leading-relaxed mb-8 font-medium">
                        ShoreAgents Assets Management is a modern, full-stack enterprise solution designed to simplify the lifecycle management of corporate assets. From acquisition to maintenance, the platform provides a centralized hub for tracking personnel and equipment.
                      </p>

                      <div className="flex items-center gap-6">
                        <button
                          onClick={() => setIsExpanded(true)}
                          className="h-12 px-8 rounded-full border border-white/10 bg-white/5 text-[10px] font-black uppercase tracking-[0.2em] text-white/40 hover:text-white hover:border-white/20 transition-all flex items-center gap-3 bg-white/5 hover:scale-105 active:scale-95"
                        >
                          <LayoutGrid size={14} className="text-white/20 transition-all" />
                          System Details
                        </button>

                        <a 
                          href="https://shore-agents-assets-management.vercel.app/" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="h-12 px-8 rounded-full bg-white text-black text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 hover:scale-105 transition-all shadow-xl active:scale-95"
                        >
                          View Site
                          <ArrowRight size={14} />
                        </a>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Bottom Section — 2-Column Open Layout Expansion */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="mt-6 pt-16 border-t border-white/5 flex justify-center"
              >
                <div className="max-w-5xl w-full space-y-20 pb-12">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-20 gap-y-16">
                    {sections.map((section, idx) => {
                      const lines = section.trim().split('\n');
                      const heading = lines[0];
                      const body = lines.slice(1);
                      const isFeature = heading === "Core Features:" || heading === "Tech Stack:";

                      return (
                        <motion.div 
                          key={idx} 
                          initial={{ opacity: 0, y: 40 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 + (idx * 0.1), duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                          className={`flex flex-col gap-10 ${!isFeature ? 'lg:col-span-2' : 'lg:col-span-1'}`}
                        >
                          {isFeature ? (
                            <div className="flex flex-col gap-10">
                              <h4 className="text-2xl md:text-3xl font-black text-white/90 tracking-tight border-b border-white/10 pb-6">{heading.replace(':', '')}</h4>
                              <div className="grid grid-cols-1 gap-8">
                                {body.filter(l => l.trim()).map((line, lIdx) => (
                                  <div key={lIdx} className="flex gap-6 items-start group/line">
                                    <div className="size-1.5 rounded-full bg-white/20 mt-2.5 transition-colors group-hover/line:bg-white/60 shrink-0" />
                                    <p className="text-white/60 text-base md:text-lg leading-relaxed font-medium">
                                      {line.trim().replace(/^•\s*/, '')}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ) : (
                            <div className="space-y-8 max-w-4xl">
                              {lines.filter(l => l.trim()).map((line, lIdx) => (
                                <p key={lIdx} className="text-white/60 text-lg md:text-xl leading-relaxed first-of-type:font-medium">
                                  {line.trim()}
                                </p>
                              ))}
                            </div>
                          )}
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* Relocated Buttons in Expanded View — Centralized at end */}
                  <div className="flex flex-wrap items-center justify-center gap-6 pt-12">
                    <button
                      onClick={() => setIsExpanded(!isExpanded)}
                      className="h-14 px-10 rounded-full border border-white/10 bg-white/5 text-[10px] font-black uppercase tracking-[0.2em] text-white/40 hover:text-white hover:border-white/20 transition-all flex items-center gap-3 backdrop-blur-md hover:scale-105 active:scale-95"
                    >
                      <LayoutGrid size={16} className="text-white" />
                      Back to Overview
                    </button>

                    <a 
                      href="https://shore-agents-assets-management.vercel.app/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="h-14 px-10 rounded-full bg-white text-black text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 hover:scale-105 transition-all shadow-2xl active:scale-95"
                    >
                      Explore Project
                      <ArrowRight size={16} />
                    </a>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

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
                {["#about", "#projects", "#contact"].map((href) => (
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



              {/* Binary Text Animation and Noise already present */}
            </section>

            {/* TRANSITION MARQUEE: BETWEEN INTRO AND HERO */}
            <InteractiveBridge />

            {/* HERO/ABOUT SECTION — Scroll storytelling */}
            <AboutStorytelling />

            {/* Tech Stack Section — 3D Icon Cloud */}
            <TechStack />



            {/* Projects Section — Spotlight Layout */}
            <ProjectSection />

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
