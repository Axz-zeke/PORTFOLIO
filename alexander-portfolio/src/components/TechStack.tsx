"use client";

import React from "react";
import { IconCloud } from "@/components/ui/icon-cloud";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

const slugs = [
    "nextdotjs",
    "react",
    "typescript",
    "javascript",
    "html5",
    "python",
    "django",
    "postgresql",
    "tailwindcss",
    "shadcnui",
    "supabase",
    "reactquery",
    "zod",
    "docker",
    "github",
    "figma",
    "fortinet",
    "googleappsscript",
    "dotnet",
    "lucide",
    "nodedotjs",
    "mongodb",
    "vlcmediaplayer",
    "ubiquiti",
    "googledrive",
    "vercel",
    "npm",
    "pnpm",
    "yarn",
    "strapi",
];

export default function TechStack() {
    // Removed corporate logos as they were being blocked by client/CORS
    const customImages: string[] = [];

    const images = [
        ...slugs.map((s) => {
            const whiteIcons = ["nextdotjs", "github", "vercel"];
            return `https://cdn.simpleicons.org/${s}${whiteIcons.includes(s) ? "/white" : ""}`;
        }),
        ...customImages,
    ];

    {/* Mobile Sliding Icon Marquees */}
    const marqueeIcons = ["nextdotjs", "react", "typescript", "python", "postgresql", "supabase", "docker", "vercel", "github", "tailwind", "shadcnui", "figma"];

    return (
        <section id="tech" className="min-h-screen flex flex-col justify-center items-center pt-24 pb-20 lg:py-20 bg-transparent overflow-hidden relative">
            {/* Top Sliding Row (Mobile/Tablet Up to 1024px) */}
            <div className="absolute top-4 left-0 w-full overflow-hidden block lg:hidden z-0 opacity-[0.07] pointer-events-none">
                <motion.div 
                    animate={{ x: [0, -1000] }}
                    transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
                    className="flex gap-12 items-center whitespace-nowrap"
                >
                    {[...marqueeIcons, ...marqueeIcons].map((s, i) => (
                        <img 
                            key={i} 
                            src={`https://cdn.simpleicons.org/${s}/white`} 
                            alt={s} 
                            className="size-8 grayscale brightness-200"
                        />
                    ))}
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-transparent to-[#050505]" />
            </div>

            {/* Bottom Sliding Row (Mobile/Tablet Up to 1024px) */}
            <div className="absolute bottom-4 left-0 w-full overflow-hidden block lg:hidden z-0 opacity-[0.05] pointer-events-none">
                <motion.div 
                    animate={{ x: [-1000, 0] }}
                    transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
                    className="flex gap-16 items-center whitespace-nowrap"
                >
                    {[...marqueeIcons.reverse(), ...marqueeIcons].map((s, i) => (
                        <img 
                            key={i} 
                            src={`https://cdn.simpleicons.org/${s}/white`} 
                            alt={s} 
                            className="size-10 grayscale brightness-200"
                        />
                    ))}
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-transparent to-[#050505]" />
            </div>

            <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
                    {/* Left Side: Text and Categories */}
                    <div className="space-y-10 lg:space-y-16">
                        <div className="grid gap-8 lg:gap-16">
                            {/* Programming & Development */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                viewport={{ once: true }}
                                className="text-center lg:text-left px-4 lg:px-0"
                            >
                                <h4 className="text-xs lg:text-3xl font-black uppercase tracking-widest text-white mb-6 lg:mb-8 border-b border-white/10 pb-4 lg:pb-0">Programming & Dev</h4>
                                <motion.div
                                    variants={{
                                        hidden: { opacity: 0 },
                                        show: {
                                            opacity: 1,
                                            transition: {
                                                staggerChildren: 0.05
                                            }
                                        }
                                    }}
                                    initial="hidden"
                                    whileInView="show"
                                    viewport={{ once: true }}
                                    className="flex flex-wrap justify-center lg:justify-start gap-2 max-w-[400px] mx-auto lg:mx-0"
                                >
                                    {[
                                        "Next.js 15", "React 19", "TypeScript", "HTML", "CSS", "JavaScript",
                                        "ReactJS", "Python (Django)", "PostgreSQL", "VB.NET", "Tailwind CSS",
                                        "shadcn/UI", "Supabase", "TanStack Query", "Zod", "Recharts", "Lucide Icons"
                                    ].map((tech) => (
                                        <motion.div
                                            key={tech}
                                            variants={{
                                                hidden: { opacity: 0, scale: 0.5, y: 10 },
                                                show: { opacity: 1, scale: 1, y: 0 }
                                            }}
                                        >
                                            <Badge variant="outline" className="bg-white/5 border-white/10 text-white/50 text-[10px] md:text-sm font-bold py-1.5 md:py-2 px-4 md:px-5 rounded-xl md:rounded-2xl hover:bg-white hover:text-black transition-colors cursor-default whitespace-nowrap">
                                                {tech}
                                            </Badge>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            </motion.div>

                            {/* Tools & Platforms */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                viewport={{ once: true }}
                                className="text-center lg:text-left px-4 lg:px-0"
                            >
                                <h4 className="text-xs lg:text-3xl font-black uppercase tracking-widest text-white mb-6 lg:mb-8 border-b border-white/10 pb-4 lg:pb-0">Tools & Platforms</h4>
                                <motion.div
                                    variants={{
                                        hidden: { opacity: 0 },
                                        show: {
                                            opacity: 1,
                                            transition: {
                                                staggerChildren: 0.05,
                                                delayChildren: 0.4
                                            }
                                        }
                                    }}
                                    initial="hidden"
                                    whileInView="show"
                                    viewport={{ once: true }}
                                    className="flex flex-wrap justify-center lg:justify-start gap-2 max-w-[400px] mx-auto lg:mx-0"
                                >
                                    {[
                                        "Antigravity", "Cursor", "Docker", "GitHub", "VS Code", "AWS",
                                        "Figma", "Canva", "Power Apps", "Apps Script",
                                        "ZKTeco", "CrossChex", "Fortinet", "HIK Vision"
                                    ].map((tool) => (
                                        <motion.div
                                            key={tool}
                                            variants={{
                                                hidden: { opacity: 0, scale: 0.5, y: 10 },
                                                show: { opacity: 1, scale: 1, y: 0 }
                                            }}
                                        >
                                            <Badge variant="outline" className="bg-blue-500/5 border-blue-500/10 text-blue-400/70 text-[10px] md:text-sm font-bold py-1.5 md:py-2 px-4 md:px-5 rounded-xl md:rounded-2xl hover:bg-blue-400 hover:text-white transition-colors cursor-default whitespace-nowrap">
                                                {tool}
                                            </Badge>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            </motion.div>
                        </div>
                    </div>

                    {/* Right Side: 3D Cloud - Now HIDDEN in mobile */}
                    <div className="hidden lg:flex relative items-center justify-center lg:justify-end min-h-[600px] w-full mt-0">
                        {/* Creative Background Elements */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1.5, ease: "circOut" }}
                            viewport={{ once: true }}
                            className="absolute inset-0 flex items-center justify-center pointer-events-none"
                        >
                            {/* Smooth High-Fidelity Radial Glow */}
                            <div className="absolute size-[300px] md:size-[600px] bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1)_0%,rgba(139,92,246,0.05)_30%,transparent_70%)]" />

                            {/* Orbital 'Scan' Ring */}
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                className="absolute size-[280px] md:size-[480px] border border-white/5 rounded-full"
                            >
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 size-1 bg-white/20 rounded-full shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
                            </motion.div>

                            <motion.div
                                animate={{ rotate: -360 }}
                                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                                className="absolute size-[340px] md:size-[580px] border border-white-[2%] rounded-full border-dashed"
                            />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.2, rotate: -45 }}
                            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                            transition={{
                                type: "spring",
                                stiffness: 60,
                                damping: 15,
                                delay: 0.2
                            }}
                            viewport={{ once: true }}
                            className="relative w-full max-w-[280px] sm:max-w-[450px] md:max-w-[700px] lg:max-w-[900px] aspect-square flex items-center justify-center mx-auto"
                        >
                            <IconCloud images={images} />
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
