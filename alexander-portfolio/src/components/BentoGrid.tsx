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
        className={`bg-card/50 backdrop-blur-md border border-border/50 rounded-3xl p-6 hover:border-primary/50 transition-colors duration-300 ${className}`}
    >
        {children}
    </motion.div>
);

export default function BentoGrid() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-7xl mx-auto p-4 md:p-8">
            {/* Experience Section */}
            <BentoItem className="md:col-span-2 md:row-span-2 flex flex-col justify-between overflow-hidden relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent pointer-events-none" />
                <div>
                    <Badge variant="outline" className="mb-4 bg-primary/10 text-primary border-primary/20">Experience</Badge>
                    <h3 className="text-2xl font-bold mb-2">IT Specialist / IT Administrator</h3>
                    <p className="text-muted-foreground text-sm uppercase mb-4 tracking-widest">ShoreAgents | 2025 – Present</p>
                    <ul className="space-y-2 text-sm text-foreground/80">
                        <li className="flex gap-2">
                            <Zap className="w-4 h-4 text-blue-500 shrink-0" />
                            <span>Full IT infrastructure autonomy for 200+ employees from Day 1.</span>
                        </li>
                        <li className="flex gap-2">
                            <Layers className="w-4 h-4 text-blue-500 shrink-0" />
                            <span>Developed custom Asset Management System (Next.js 15 + Supabase).</span>
                        </li>
                        <li className="flex gap-2">
                            <Network className="w-4 h-4 text-blue-500 shrink-0" />
                            <span>Managed Ubiquiti UniFi network & dual ISP segregation.</span>
                        </li>
                    </ul>
                </div>
                <div className="mt-8 flex flex-wrap gap-2">
                    <Badge variant="secondary">IT Infrastructure</Badge>
                    <Badge variant="secondary">Cloud Admin</Badge>
                    <Badge variant="secondary">Support L1-L3</Badge>
                </div>
            </BentoItem>

            {/* Education & Achievements */}
            <BentoItem className="md:col-span-2 flex flex-col justify-center bg-gradient-to-tr from-purple-500/10 to-transparent">
                <Badge variant="outline" className="w-fit mb-2 border-purple-500/30 text-purple-400">Education</Badge>
                <h3 className="text-xl font-bold italic">Bachelor of Science in Information Technology</h3>
                <p className="text-sm text-foreground/70">Major in Network Administration</p>
                <div className="mt-4 flex items-baseline gap-2">
                    <span className="text-3xl font-black text-purple-500">Cum Laude</span>
                    <span className="text-muted-foreground text-xs uppercase">System Plus College Foundation</span>
                </div>
            </BentoItem>

            {/* Skills - IT & Networking */}
            <BentoItem className="bg-gradient-to-br from-green-500/5 to-transparent">
                <div className="flex items-center gap-2 mb-4">
                    <Network className="w-5 h-5 text-green-500" />
                    <h4 className="font-semibold">Networking</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                    {["VPN", "Ubiquiti", "UniFi", "NMS", "CCTV", "Firewall"].map(skill => (
                        <Badge key={skill} variant="outline" className="bg-green-500/5 border-green-500/20 text-green-400 text-xs">
                            {skill}
                        </Badge>
                    ))}
                </div>
            </BentoItem>

            {/* Skills - Programming */}
            <BentoItem className="bg-gradient-to-br from-orange-500/5 to-transparent">
                <div className="flex items-center gap-2 mb-4">
                    <Code className="w-5 h-5 text-orange-500" />
                    <h4 className="font-semibold">Code</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                    {["Next.js 15", "React 19", "TS", "Python", "PostgreSQL"].map(skill => (
                        <Badge key={skill} variant="outline" className="bg-orange-500/5 border-orange-500/20 text-orange-400 text-xs">
                            {skill}
                        </Badge>
                    ))}
                </div>
            </BentoItem>

            {/* Project Card */}
            <BentoItem className="md:col-span-2 bg-gradient-to-r from-red-500/10 to-transparent flex flex-col justify-between">
                <div>
                    <div className="flex items-center justify-between mb-2">
                        <h4 className="font-bold text-lg">PROMIT EASE</h4>
                        <Badge className="bg-red-500 text-white border-0">Capstone</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground leading-snug">
                        Cloud-Based School Automated Exam Permit System. Developed as a lead for digitalizing academic permissions.
                    </p>
                </div>
                <div className="mt-4 flex -space-x-2">
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="w-8 h-8 rounded-full border-2 border-background bg-muted flex items-center justify-center text-[10px] font-bold">
                            Dev
                        </div>
                    ))}
                    <div className="w-8 h-8 rounded-full border-2 border-background bg-primary flex items-center justify-center text-[10px] font-bold text-primary-foreground">
                        +3
                    </div>
                </div>
            </BentoItem>

            {/* Cloud & Tools */}
            <BentoItem className="md:col-span-1 bg-gradient-to-br from-cyan-500/5 to-transparent">
                <div className="flex items-center gap-2 mb-4">
                    <Cloud className="w-5 h-5 text-cyan-500" />
                    <h4 className="font-semibold">Cloud</h4>
                </div>
                <div className="space-y-4">
                    <div className="flex justify-between items-center text-xs">
                        <span>M365 Admin</span>
                        <span className="text-muted-foreground font-mono">100%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-1 overflow-hidden">
                        <motion.div initial={{ width: 0 }} whileInView={{ width: "100%" }} transition={{ duration: 1 }} className="bg-cyan-500 h-full" />
                    </div>
                    <div className="flex justify-between items-center text-xs">
                        <span>Google Workspace</span>
                        <span className="text-muted-foreground font-mono">90%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-1 overflow-hidden">
                        <motion.div initial={{ width: 0 }} whileInView={{ width: "90%" }} transition={{ duration: 1 }} className="bg-cyan-500 h-full" />
                    </div>
                </div>
            </BentoItem>

            {/* Contact Card */}
            <BentoItem className="md:col-span-1 bg-primary text-primary-foreground flex flex-col items-center justify-center text-center">
                <Globe className="w-10 h-10 mb-4 animate-spin-slow" />
                <h4 className="font-bold">Available for Work</h4>
                <p className="text-xs opacity-80 mt-2">Mabalacat, Philippines</p>
            </BentoItem>
        </div>
    );
}
