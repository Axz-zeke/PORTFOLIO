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
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
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

const PROJECTS = [
  {
    title: "ShoreAgents Assets Management",
    titleMobile: <>ShoreAgents <br className="hidden md:block" /> Assets Management</>,
    badge: "Enterprise Solution",
    videoSrc: "/preview.mp4",
    siteLink: "https://shore-agents-assets-management.vercel.app/",
    description: "ShoreAgents Assets Management is a modern, full-stack enterprise solution designed to simplify the lifecycle management of corporate assets. From acquisition to maintenance, the platform provides a centralized hub for tracking personnel and equipment.",
    fullDescription: `ShoreAgents Assets Management is a modern, full-stack enterprise solution designed to simplify the lifecycle management of corporate assets. From acquisition to maintenance, the platform provides a centralized hub for tracking personnel and equipment.

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
Utilities: Lucide Icons, Date-fns, Recharts, HTML5-QRCode.`,
  },
  {
    title: "Capstone Project : PermitEase",
    titleMobile: <>Capstone Project: <br className="hidden md:block" /> PermitEase</>,
    badge: "Student Management",
    videoSrc: "/PermitEase.mp4",
    description: "PermitEase is a comprehensive, automated permit issuance and student management system designed to streamline academic administrative workflows. It focuses on digitizing the examination permit process, tracking student financial obligations, and automating communication between institutions, professors, and students.",
    fullDescription: `PermitEase is a comprehensive, automated permit issuance and student management system designed to streamline academic administrative workflows. It focuses on digitizing the examination permit process, tracking student financial obligations, and automating communication between institutions, professors, and students.

Core Features:
Automated Permit Issuance: Automatically generates and dispatches examination permits (Prelims, Midterms, Prefinals, Finals) to students via email once financial requirements are met.
Financial Tracking & Installment Management: Monitors student balances across different academic periods and manages flags for installment-based payments.
Digital Attendance System: A specialized module for professors to record exam attendance, with built-in permit validation (e.g., Present with Permit vs. Present no Permit).
Asynchronous Background Tasks: Utilizes Celery to handle batch processes such as fetching payment verification emails, sending automated reminders, and processing large reports.
Institutional Data Management: Centralized database for managing students, faculty, subjects, and exam schedules with role-based access control (Admin/Professor).
Automated Reporting: Dynamic generation of PDF-based examination reports and Statements of Account (SOA) reminders.

Tech Stack:
Backend: Python, Django (Web Framework), PostgreSQL (Relational Data Storage).
Task Management: Celery (Distributed Task Queue), Redis (Message Broker & Cache).
Containerization: Docker & Docker Compose.
Infrastructure: AWS (EC2 for hosting, CloudWatch for monitoring).
Reporting: Automated PDF generation for permits and academic documents.`,
  }
];

function ProjectItem({ project }: { project: typeof PROJECTS[0] }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const sections = project.fullDescription.split(/(?=Core Features:|Tech Stack:)/);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="relative mb-24 md:mb-40 last:mb-0"
    >
      {/* Main Layout Container — Dynamically changes layout on expand */}
      <motion.div
        layout
        className={`flex flex-col ${isExpanded ? 'items-center gap-16' : 'lg:flex-row lg:items-center gap-8 lg:gap-20'}`}
      >
        {/* Left/Top: Video Wrapper — Centers and grows on expand */}
        <motion.div
          layout
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className={`relative flex flex-col ${isExpanded ? 'w-full max-w-5xl' : 'w-full lg:w-[62%]'} gap-3 md:gap-6`}
        >
          {/* Mobile-only Badge — Top of Preview */}
          <motion.div layout className="lg:hidden flex justify-center">
            <Badge
              variant="outline"
              className="w-fit border-white/10 text-white/40 text-[9px] font-black uppercase tracking-[0.2em] px-2.5 py-1 rounded-lg bg-white/5"
            >
              {project.badge}
            </Badge>
          </motion.div>

          <div className={`relative shadow-[0_0_120px_rgba(255,255,255,0.03)] border border-white/5 bg-white/[0.02] rounded-[40px] overflow-hidden aspect-video w-full`}>
            <video
              src={project.videoSrc}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
          </div>
        </motion.div>

        {/* Right/Bottom: Content Summary — Shifts below on expand */}
        <motion.div
          layout
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className={`flex flex-col ${isExpanded ? 'w-full max-w-[1400px] text-center items-center' : 'w-full lg:w-[38%] items-start text-left'}`}
        >
          <motion.div layout transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="mb-0 flex flex-col items-start">
            {/* Desktop-only Badge */}
            <motion.div layout className={`hidden lg:block ${isExpanded ? 'mx-auto' : ''}`}>
              <Badge
                variant="outline"
                className={`w-fit border-white/10 text-white/40 text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-lg mb-6 bg-white/5`}
              >
                {project.badge}
              </Badge>
            </motion.div>

            <motion.h3
              layout
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className={`font-black text-white leading-[1.1] tracking-tighter transition-all duration-500
              ${isExpanded ? 'text-3xl md:text-6xl xl:text-8xl mb-6 mx-auto' : 'text-3xl md:text-5xl xl:text-7xl mb-4 md:mb-8'}
            `}>
              {isExpanded ? (
                project.title
              ) : (
                project.titleMobile
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
                  <p className="text-white/60 text-sm md:text-xl leading-relaxed mb-6 md:mb-8 font-medium">
                    {project.description}
                  </p>

                  <div className="flex items-center gap-4 md:gap-6">
                    <button
                      onClick={() => setIsExpanded(true)}
                      className="h-10 md:h-12 px-5 md:px-8 rounded-full border border-white/10 bg-white/5 text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-white/40 hover:text-white hover:border-white/20 transition-all flex items-center gap-2 md:gap-3 bg-white/5 hover:scale-105 active:scale-95"
                    >
                      <LayoutGrid size={12} className="text-white/20 transition-all" />
                      Details
                    </button>

                    {project.siteLink && (
                      <a
                        href={project.siteLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="h-10 md:h-12 px-5 md:px-8 rounded-full bg-white text-black text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 hover:scale-105 transition-all shadow-xl active:scale-95"
                      >
                        View Site
                        <ArrowRight size={12} />
                      </a>
                    )}
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
                            <p key={lIdx} className="text-white/60 text-base md:text-xl leading-relaxed first-of-type:font-medium text-center md:text-left transition-all duration-500">
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

                {project.siteLink && (
                  <a
                    href={project.siteLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-14 px-10 rounded-full bg-white text-black text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 hover:scale-105 transition-all shadow-2xl active:scale-95"
                  >
                    Explore Project
                    <ArrowRight size={16} />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function ProjectSection() {
  return (
    <section id="projects" className="min-h-screen flex flex-col justify-center pt-28 pb-12 md:py-32 px-6">
      <div className="max-w-[1400px] mx-auto w-full">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-8xl font-black text-center mb-10 md:mb-16 text-white tracking-tighter"
        >
          PROJECTS<span className="text-white/10">.</span>
        </motion.h2>

        <div className="space-y-32 md:space-y-64">
          {PROJECTS.map((project, idx) => (
            <ProjectItem key={idx} project={project} />
          ))}
        </div>
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
              className="fixed top-0 left-0 w-full z-50 px-4 md:px-6 py-3 md:py-6 flex items-center justify-between pointer-events-none data-[visible=true]:pointer-events-auto"
              data-visible={scrollY.get() > 100}
            >
              {/* Name — top left, stacked like reference */}
              <div className="flex flex-col leading-none cursor-pointer">
                <span className="font-black text-xs uppercase tracking-tighter text-white">Alexander</span>
                <span className="font-black text-xs uppercase tracking-tighter text-white">Lopez</span>
              </div>

              {/* Desktop Nav Links */}
              <div className="hidden md:flex items-center gap-6 bg-black/40 border border-white/10 px-6 py-2 rounded-2xl backdrop-blur-xl shadow-sm pointer-events-auto">
                <a href="#about" className="text-xs font-black uppercase tracking-widest hover:text-white transition-colors text-white/60">About</a>
                <a href="#projects" className="text-xs font-black uppercase tracking-widest hover:text-white transition-colors text-white/60">Projects</a>
                <a href="#contact" className="text-xs font-black uppercase tracking-widest hover:text-white transition-colors text-white/60">Contact</a>
              </div>

              <div className="flex items-center gap-2 pointer-events-auto">
                <a href="/Alexander_Lopez_Resume.pdf" download="Alexander_Lopez_Resume.pdf" className="hidden md:block">
                  <button className="h-9 px-5 flex items-center gap-2 rounded-xl border border-white/10 bg-black/40 text-white text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all">
                    Resume
                    <Download size={14} />
                  </button>
                </a>
                <a href="https://github.com/Axz-zeke" target="_blank" rel="noopener noreferrer">
                  <div className="h-9 w-9 flex items-center justify-center rounded-xl border border-white/10 bg-black/40 backdrop-blur-md hover:bg-white hover:text-black text-white transition-all cursor-pointer">
                    <Github size={16} />
                  </div>
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                  <button className="h-8 md:h-9 px-3 md:px-5 flex items-center gap-2 rounded-xl border border-white bg-white text-black text-[10px] font-black uppercase tracking-widest hover:bg-white/80 transition-all">
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
            <AnimatePresence>
              {menuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="fixed top-[68px] md:top-[88px] left-0 w-full h-[calc(100vh-68px)] z-40 bg-[#050505]/95 backdrop-blur-xl border-b border-white/10 flex flex-col items-center justify-center gap-8 py-8 md:hidden"
                >
                  {["#about", "#projects", "#contact"].map((href) => (
                    <a key={href} href={href} onClick={() => setMenuOpen(false)}
                      className="text-3xl font-black uppercase tracking-widest hover:text-white transition-colors text-white/40">
                      {href.replace("#", "")}
                    </a>
                  ))}
                  <div className="w-12 h-px bg-white/10 my-2" />
                  <a href="/Alexander_Lopez_Resume.pdf" download="Alexander_Lopez_Resume.pdf" onClick={() => setMenuOpen(false)}>
                    <button className="h-14 px-8 rounded-2xl bg-white text-black text-xs font-black uppercase tracking-widest flex items-center gap-3 shadow-2xl">
                      Download Resume
                      <Download size={16} />
                    </button>
                  </a>
                </motion.div>
              )}
            </AnimatePresence>

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
                  <span className="text-xs font-black uppercase tracking-[0.4em] text-white/30">Portfolio</span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                  className="text-5xl sm:text-8xl md:text-9xl lg:text-[12rem] font-black tracking-tighter leading-none text-white select-none px-4"
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

            {/* Contact Section — Now the final section */}
            <ContactSection />

            <Footer />
          </motion.main>
        )}
      </AnimatePresence>
    </>
  );
}
