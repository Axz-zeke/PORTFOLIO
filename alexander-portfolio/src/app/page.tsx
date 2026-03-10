"use client";

import { useState } from "react";
import LiquidMask from "@/components/LiquidMask";
import GlobalLiquidBackground from "@/components/GlobalLiquidBackground";
import BentoGrid from "@/components/BentoGrid";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Github,
  Linkedin,
  Mail,
  Download,
  ArrowRight,
  Monitor,
  Rocket,
  Menu,
  X
} from "lucide-react";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#f8f9fb]" style={{ color: "#111827" }}>
      {/* NO GlobalLiquidBackground here – it lives inside the hero section */}

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 px-6 py-6 flex items-center justify-between">
        {/* Name — top left, stacked like reference */}
        <div className="flex flex-col leading-none cursor-pointer">
          <span className="font-black text-xs uppercase tracking-tighter text-black">Alexander</span>
          <span className="font-black text-xs uppercase tracking-tighter text-black">Lopez</span>
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-6 bg-white/60 border border-black/10 px-6 py-2 rounded-2xl backdrop-blur-xl shadow-sm">
          <a href="#about" className="text-xs font-black uppercase tracking-widest hover:text-blue-600 transition-colors">About</a>
          <a href="#experience" className="text-xs font-black uppercase tracking-widest hover:text-blue-600 transition-colors">Experience</a>
          <a href="#projects" className="text-xs font-black uppercase tracking-widest hover:text-blue-600 transition-colors">Projects</a>
          <a href="#contact" className="text-xs font-black uppercase tracking-widest hover:text-blue-600 transition-colors">Contact</a>
        </div>

        <div className="flex items-center gap-2">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer">
            <button className="h-9 w-9 flex items-center justify-center rounded-xl border border-black/10 bg-white/60 backdrop-blur-md hover:bg-black hover:text-white transition-all">
              <Github size={16} />
            </button>
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <button className="h-9 px-5 flex items-center gap-2 rounded-xl border border-black bg-black text-white text-[10px] font-black uppercase tracking-widest hover:bg-black/80 transition-all">
              Let's Talk
            </button>
          </a>
          {/* Mobile Hamburger */}
          <button
            className="rounded-xl flex-shrink-0 md:hidden h-9 w-9 flex items-center justify-center border border-black/10 bg-white/60"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed top-[72px] left-0 w-full z-40 bg-white/95 backdrop-blur-xl border-b border-black/10 flex flex-col items-center gap-6 py-8 md:hidden">
          {["#about", "#experience", "#projects", "#contact"].map((href) => (
            <a key={href} href={href} onClick={() => setMenuOpen(false)}
              className="text-sm font-black uppercase tracking-widest hover:text-blue-600 transition-colors">
              {href.replace("#", "")}
            </a>
          ))}
        </div>
      )}

      {/* HERO SECTION — has its own background contained inside it */}
      <section className="relative w-full overflow-hidden" style={{ minHeight: "100svh" }}>
        {/* Animated background: only visible here */}
        <GlobalLiquidBackground />

        <div className="relative z-10 px-6 pt-32 pb-16 md:pt-52 md:pb-40 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10 md:gap-20">
          {/* Left Column — Text */}
          <div className="flex-1 space-y-8 text-center md:text-left">
            <div className="inline-flex items-center gap-2 border border-black/10 bg-white/60 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-black/60">
              <Monitor className="w-3 h-3" />
              IT Specialist &amp; Full-Stack Developer
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.85] text-black">
              TRANSFORM<br />
              <span style={{ WebkitTextStroke: "2px #111", color: "transparent" }}>
                ING INFRA.
              </span>
            </h1>

            <p className="max-w-md text-sm font-medium leading-relaxed text-black/50 mx-auto md:mx-0 uppercase tracking-wide">
              Building digital ecosystems with <strong className="text-black/80">Next.js 15</strong> and managing enterprise networks for 200+ employees. Passionate about <strong className="text-black/80">technical autonomy</strong>.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
              <button className="h-14 px-8 rounded-2xl bg-black text-white text-sm font-black uppercase tracking-widest flex items-center gap-2 hover:scale-[1.03] active:scale-[0.97] transition-transform shadow-xl shadow-black/20">
                Download Resume
                <Download className="w-4 h-4" />
              </button>
              <button className="h-14 px-8 rounded-2xl border border-black/20 bg-white/60 backdrop-blur-md text-sm font-black uppercase tracking-widest flex items-center gap-2 hover:bg-black hover:text-white transition-all group">
                View Projects
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right Column — Liquid Mask Portrait — neutralized to background color */}
          <div className="flex-shrink-0 w-full max-w-[360px] sm:max-w-[440px] md:max-w-[520px] aspect-[3/4] relative">
            <div className="absolute inset-4 rounded-[40px] bg-black/[0.03] blur-xl" />
            <div className="relative w-full h-full rounded-[40px] overflow-hidden border border-black/[0.08] shadow-lg" style={{ background: "#f8f9fb" }}>
              <LiquidMask
                imageBase="/funko.png"
                imageHover="/PROFILE.png"
                className="w-full h-full filter blur-[0.8px] [text-rendering:optimizeLegibility]"
                style={{ filter: "drop-shadow(0 0 2px rgba(0,0,0,0.03)) blur(0.6px)" }}
                splatRadius={0.15}
                splatStrength={0.5}
              />

              <div className="absolute top-4 right-4 z-10">
                <div className="bg-white/70 backdrop-blur-md px-4 py-2 rounded-xl flex items-center gap-2 border border-black/10 shadow-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-tighter text-black">Available for Hire</span>
                </div>
              </div>

              <div className="absolute bottom-6 left-6 z-10">
                <p className="text-black text-xl font-black italic tracking-tight drop-shadow-sm">Alexander S. Lopez</p>
                <p className="text-black/50 text-[10px] uppercase font-black tracking-widest mt-1">Since 2021 • Mabalacat City, PH</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee divider — cohesive light theme */}
      <div className="w-full overflow-hidden pointer-events-none select-none py-10 border-y border-black/5 bg-white/40">
        <p className="text-[10vw] font-black tracking-tighter text-black/[0.03] whitespace-nowrap">
          IT SPECIALIST &nbsp;&nbsp; FULL-STACK DEV &nbsp;&nbsp; NETWORK ADMIN &nbsp;&nbsp;
          IT SPECIALIST &nbsp;&nbsp; FULL-STACK DEV &nbsp;&nbsp; NETWORK ADMIN
        </p>
      </div>

      {/* Experience / Bento Grid — fitted to viewport */}
      <section id="experience" className="min-h-screen flex flex-col justify-center py-24 bg-transparent">
        <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
          <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-4 text-black">
            ENGINEERING <span className="text-black/10">&</span> DESIGN
          </h2>
          <p className="text-black/40 uppercase tracking-[0.2em] font-black text-[10px]">Professional Experience &amp; Educational Foundation</p>
        </div>
        <BentoGrid />
      </section>

      {/* Projects Hook Section — fitted to viewport and light theme */}
      <section id="projects" className="min-h-screen flex flex-col justify-center py-32 px-6 bg-transparent">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <h2 className="text-3xl sm:text-5xl md:text-8xl font-black text-center mb-16 italic text-black">
            CRAFTING MODERN <br />
            <span style={{ WebkitTextStroke: "2px rgba(0,0,0,0.1)", color: "transparent" }}>SOLUTIONS.</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
            <div className="rounded-[40px] overflow-hidden border border-black/10 bg-white/70 backdrop-blur-md group cursor-pointer hover:shadow-2xl hover:border-black/20 hover:-translate-y-1 transition-all p-10">
              <Badge variant="outline" className="w-fit mb-4 border-black/10 text-black/40 text-[10px] font-black uppercase tracking-widest">Capstone 2025</Badge>
              <h3 className="text-4xl font-black leading-none text-black mb-4">PermitEase</h3>
              <p className="text-black/50 text-base leading-relaxed mb-8">Cloud-Based Automated School Exam Permit System. A revolutionary way to handle digital permissions in academic environments.</p>
              <div className="w-full aspect-video bg-black/[0.03] rounded-3xl flex items-center justify-center group-hover:bg-black/[0.06] transition-colors">
                <Monitor className="w-16 h-16 text-black/10 group-hover:text-black/30 group-hover:scale-110 transition-all" />
              </div>
            </div>

            <div className="rounded-[40px] overflow-hidden border border-black/10 bg-white/70 backdrop-blur-md group cursor-pointer hover:shadow-2xl hover:border-black/20 hover:-translate-y-1 transition-all p-10">
              <Badge variant="outline" className="w-fit mb-4 border-black/10 text-black/40 text-[10px] font-black uppercase tracking-widest">IT Administration</Badge>
              <h3 className="text-4xl font-black leading-none text-black mb-4">Asset Management System</h3>
              <p className="text-black/50 text-base leading-relaxed mb-8">Next-Gen inventory control for ShoreAgents using Next.js 15 and Supabase, featuring real-time QR tracking.</p>
              <div className="w-full aspect-video bg-black/[0.03] rounded-3xl flex items-center justify-center group-hover:bg-black/[0.06] transition-colors">
                <Monitor className="w-16 h-16 text-black/10 group-hover:text-black/30 group-hover:scale-110 transition-all" />
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
    </main>
  );
}
