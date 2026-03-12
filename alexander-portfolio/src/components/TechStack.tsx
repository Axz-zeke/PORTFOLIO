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
    "css3",
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
    "visualstudiocode",
    "amazonaws",
    "figma",
    "canva",
    "fortinet",
    "powerapps",
    "googleappsscript",
    "dotnet",
    "lucide",
    "recharts",
    "nodedotjs",
    "mongodb",
    "cursor",
    "antigravity", // Custom logo below
    "vlcmediaplayer",
    "windowsterminal",
    "ubiquiti",
    "googledrive",
    "vercel",
    "npm",
    "pnpm",
    "yarn",
    "strapi",
];

export default function TechStack() {
    // Custom images for brands not in Simple Icons
    const customImages = [
        "https://upload.wikimedia.org/wikipedia/commons/e/e1/Hikvision_logo.svg",
        "https://www.zkteco.com/static/images/logo.png",
        "https://www.anviz.com/Public/Home/images/logo.png", // CrossChex related
    ];

    const images = [
        ...slugs.map((s) => {
            const whiteIcons = ["nextdotjs", "github", "vercel", "cursor"];
            return `https://cdn.simpleicons.org/${s}${whiteIcons.includes(s) ? "/white" : ""}`;
        }),
        ...customImages,
    ];

    return (
        <section className="min-h-[100dvh] flex flex-col justify-center py-20 bg-transparent overflow-hidden relative">
            <div className="max-w-7xl mx-auto px-6 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    {/* Left Side: Text and Categories */}
                    <div className="space-y-16">
                        <div className="grid gap-12">
                            {/* Programming & Development */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6 }}
                                viewport={{ once: true }}
                            >
                                <h4 className="text-2xl md:text-3xl font-black uppercase tracking-[0.2em] text-white mb-8">Programming & Dev</h4>
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
                                    className="flex flex-wrap gap-3"
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
                                            <Badge variant="outline" className="bg-white/5 border-white/10 text-white/60 text-xs md:text-sm font-bold py-2 px-4 rounded-xl hover:bg-white hover:text-black transition-colors cursor-default">
                                                {tech}
                                            </Badge>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            </motion.div>

                            {/* Tools & Platforms */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                viewport={{ once: true }}
                            >
                                <h4 className="text-2xl md:text-3xl font-black uppercase tracking-[0.2em] text-white mb-8">Tools & Platforms</h4>
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
                                    className="flex flex-wrap gap-3"
                                >
                                    {[
                                        "Antigravity", "Cursor", "Docker", "GitHub", "Visual Studio Code", "AWS",
                                        "Figma", "Canva", "Microsoft Power Apps", "Google Apps Script",
                                        "ZKTeco Attendance Management", "CrossChex Standard", "Fortinet", "HIK Vision"
                                    ].map((tool) => (
                                        <motion.div
                                            key={tool}
                                            variants={{
                                                hidden: { opacity: 0, scale: 0.5, y: 10 },
                                                show: { opacity: 1, scale: 1, y: 0 }
                                            }}
                                        >
                                            <Badge variant="outline" className="bg-blue-500/5 border-blue-500/10 text-blue-400/80 text-xs md:text-sm font-bold py-2 px-4 rounded-xl hover:bg-blue-400 hover:text-white transition-colors cursor-default">
                                                {tool}
                                            </Badge>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            </motion.div>
                        </div>
                    </div>

                    {/* Right Side: 3D Cloud */}
                    <div className="relative flex items-center justify-center lg:justify-end min-h-[600px] w-full">
                        {/* Creative Background Elements */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1.5, ease: "circOut" }}
                            viewport={{ once: true }}
                            className="absolute inset-0 flex items-center justify-center pointer-events-none"
                        >
                            {/* Smooth High-Fidelity Radial Glow */}
                            <div className="absolute size-[600px] bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1)_0%,rgba(139,92,246,0.05)_30%,transparent_70%)]" />

                            {/* Orbital 'Scan' Ring */}
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                className="absolute size-[480px] border border-white/5 rounded-full"
                            >
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 size-1 bg-white/20 rounded-full shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
                            </motion.div>

                            <motion.div
                                animate={{ rotate: -360 }}
                                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                                className="absolute size-[580px] border border-white-[2%] rounded-full border-dashed"
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
                            className="relative size-full max-w-[900px] aspect-square flex items-center justify-center"
                        >
                            <IconCloud images={images} />
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
