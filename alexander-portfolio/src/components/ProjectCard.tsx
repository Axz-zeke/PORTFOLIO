"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Monitor, ChevronDown, ExternalLink } from "lucide-react";

interface ProjectCardProps {
  badge: string;
  title: string;
  description: string;
  fullDescription?: string;
  videoSrc?: string;
  link?: string;
}

export default function ProjectCard({
  badge,
  title,
  description,
  fullDescription,
  videoSrc,
  link
}: ProjectCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="rounded-[40px] overflow-hidden border border-white/10 bg-white/5 backdrop-blur-md group hover:shadow-2xl hover:border-white/20 hover:-translate-y-1 transition-all p-10 flex flex-col h-full">
      <div className="flex justify-between items-start mb-4">
        <Badge variant="outline" className="w-fit border-white/10 text-white/30 text-[10px] font-black uppercase tracking-widest">
          {badge}
        </Badge>
        {link && (
          <a 
            href={link} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="p-2 rounded-xl bg-white/5 border border-white/10 text-white/30 hover:text-white hover:bg-white/10 transition-all"
            onClick={(e) => e.stopPropagation()}
          >
            <ExternalLink size={14} />
          </a>
        )}
      </div>
      
      <h3 className="text-4xl font-black leading-none text-white mb-4">{title}</h3>
      
      <div className="flex-grow mb-8">
        <p className="text-white/40 text-base leading-relaxed">
          {description}
        </p>
        
        {fullDescription && (
          <>
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="text-white/40 text-sm leading-relaxed whitespace-pre-line mt-4 pt-4 border-t border-white/5">
                    {fullDescription}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(!isExpanded);
              }}
              className="text-[10px] font-black uppercase tracking-widest text-white/50 hover:text-white transition-colors flex items-center gap-1 mt-4"
            >
              {isExpanded ? "Read Less" : "Read More"}
              <ChevronDown 
                size={12} 
                className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} 
              />
            </button>
          </>
        )}
      </div>

      <div className="w-full aspect-video bg-white/[0.03] rounded-3xl flex items-center justify-center group-hover:bg-white/[0.06] transition-colors overflow-hidden relative mt-auto">
        {videoSrc ? (
          <video 
            src={videoSrc} 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="w-full h-full object-cover rounded-3xl"
          />
        ) : (
          <Monitor className="w-16 h-16 text-white/10 group-hover:text-white/30 group-hover:scale-110 transition-all" />
        )}
      </div>
    </div>
  );
}
