"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Network,
    Code,
    Terminal,
    ShieldCheck,
    Cpu,
    Globe,
    Database,
    Layers,
    Cloud,
    Settings,
    Zap
} from "lucide-react";

const BentoItem = ({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay }}
        viewport={{ once: true }}
        className={`bg-white/5 backdrop-blur-md border border-white/10 rounded-[40px] p-8 hover:border-white/20 hover:shadow-2xl transition-all duration-500 transform-gpu ${className}`}
    >
        {children}
    </motion.div>
);

export default function BentoGrid() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 max-w-7xl mx-auto p-4 lg:p-8">
            {/* Experience Section */}
            <BentoItem className="lg:col-span-2 lg:row-span-2 flex flex-col justify-between overflow-hidden relative group">
                <div className="absolute inset-0 bg-black/[0.01] pointer-events-none" />
                <div>
                    <Badge variant="outline" className="mb-4 border-white/10 text-white/30 bg-white/5 text-[10px] font-black uppercase tracking-widest">Experience</Badge>
                    <h3 className="text-3xl font-black mb-2 text-white leading-none">IT Specialist / IT Administrator</h3>
                    <p className="text-white/30 text-[10px] uppercase mb-6 tracking-[0.2em] font-black">ShoreAgents | 2025 – Present</p>
                    <ul className="space-y-3 text-sm text-white/40 font-medium">
                        <li className="flex gap-3">
                            <Zap className="w-4 h-4 text-white/10 shrink-0" />
                            <span>Full IT infrastructure autonomy for 200+ employees from Day 1.</span>
                        </li>
                        <li className="flex gap-3">
                            <Layers className="w-4 h-4 text-white/10 shrink-0" />
                            <span>Developed custom Asset Management System (Next.js 15 + Supabase).</span>
                        </li>
                        <li className="flex gap-3">
                            <Network className="w-4 h-4 text-white/10 shrink-0" />
                            <span>Managed Ubiquiti UniFi network & dual ISP segregation.</span>
                        </li>
                    </ul>
                </div>
                <div className="mt-8 flex flex-wrap gap-2">
                    <Badge variant="outline" className="border-white/10 text-white/40 bg-white/5">IT Infrastructure</Badge>
                    <Badge variant="outline" className="border-white/10 text-white/40 bg-white/5">Cloud Admin</Badge>
                    <Badge variant="outline" className="border-white/10 text-white/40 bg-white/5">Support L1-L3</Badge>
                </div>
            </BentoItem>

            {/* Education & Achievements */}
            {/* Education & Achievements — Neutralized */}
            <BentoItem className="lg:col-span-2 flex flex-col justify-center bg-white/[0.01]">
                <Badge variant="outline" className="w-fit mb-4 border-white/10 text-white/30 bg-white/5 text-[10px] font-black uppercase tracking-widest">Education</Badge>
                <h3 className="text-2xl font-black text-white leading-tight">Bachelor of Science in Information Technology</h3>
                <p className="text-xs font-bold text-white/30 uppercase tracking-widest mt-1">Major in Network Administration</p>
                <div className="mt-6 flex items-baseline gap-3">
                    <span className="text-4xl font-black text-white">Cum Laude</span>
                    <span className="text-white/30 text-[10px] font-black uppercase tracking-widest">System Plus College Foundation</span>
                </div>
            </BentoItem>

            {/* Skills - IT & Networking */}
            <BentoItem className="bg-white/[0.01]">
                <div className="flex items-center gap-2 mb-6">
                    <Network className="w-5 h-5 text-white/20" />
                    <h4 className="font-black text-xs uppercase tracking-widest text-white">Networking</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                    {["VPN", "Ubiquiti", "UniFi", "NMS", "CCTV", "Firewall"].map(skill => (
                        <Badge key={skill} variant="outline" className="bg-blue-500/10 border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-tighter">
                            {skill}
                        </Badge>
                    ))}
                </div>
            </BentoItem>

            {/* Skills - Programming */}
            <BentoItem className="bg-white/[0.01]">
                <div className="flex items-center gap-2 mb-6">
                    <Code className="w-5 h-5 text-white/20" />
                    <h4 className="font-black text-xs uppercase tracking-widest text-white">Code</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                    {["Next.js 15", "React 19", "TS", "Python", "PostgreSQL"].map(skill => (
                        <Badge key={skill} variant="outline" className="bg-slate-500/10 border-slate-500/20 text-slate-400 text-[10px] font-black uppercase tracking-tighter">
                            {skill}
                        </Badge>
                    ))}
                </div>
            </BentoItem>

            {/* Project Card */}
            <BentoItem className="lg:col-span-2 bg-white/[0.01] flex flex-col justify-between">
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <h4 className="font-black text-xl text-white">PERMIT EASE</h4>
                        <Badge className="bg-white text-black border-0 text-[10px] font-black uppercase tracking-widest">Capstone</Badge>
                    </div>
                    <p className="text-sm text-white/40 leading-snug">
                        Cloud-Based School Automated Exam Permit System. Developed as a lead for digitalizing academic permissions.
                    </p>
                </div>
                <div className="mt-4 flex -space-x-2">
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="w-8 h-8 rounded-full border-2 border-[#0a0a0a] bg-white/10 flex items-center justify-center text-[10px] font-bold text-white/40">
                            Dev
                        </div>
                    ))}
                    <div className="w-8 h-8 rounded-full border-2 border-[#0a0a0a] bg-white flex items-center justify-center text-[10px] font-bold text-black">
                        +3
                    </div>
                </div>
            </BentoItem>

            {/* Cloud & Tools */}
            <BentoItem className="lg:col-span-1 bg-white/[0.01]">
                <div className="flex items-center gap-2 mb-6">
                    <Cloud className="w-5 h-5 text-white/20" />
                    <h4 className="font-black text-xs uppercase tracking-widest text-white">Cloud</h4>
                </div>
                <div className="space-y-4">
                    <div className="flex justify-between items-center text-xs text-white/40">
                        <span>M365 Admin</span>
                        <span className="font-mono">100%</span>
                    </div>
                    <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
                        <motion.div initial={{ width: 0 }} whileInView={{ width: "100%" }} transition={{ duration: 1 }} className="bg-white h-full" />
                    </div>
                    <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-white/20">
                        <span>Google Workspace</span>
                        <span className="font-mono">90%</span>
                    </div>
                    <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
                        <motion.div initial={{ width: 0 }} whileInView={{ width: "90%" }} transition={{ duration: 1 }} className="bg-white h-full" />
                    </div>
                </div>
            </BentoItem>

            {/* Contact Card */}
            <BentoItem className="lg:col-span-1 bg-white text-black flex flex-col items-center justify-center text-center">
                <Globe className="w-10 h-10 mb-4 animate-spin-slow opacity-60" />
                <h4 className="font-black text-sm uppercase tracking-widest">Available for Work</h4>
                <p className="text-xs opacity-60 mt-2 italic">Mabalacat, Philippines</p>
            </BentoItem>
        </div>
    );
}
