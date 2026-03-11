"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BOOT_LOGS = [
  "INITIALIZING SYSTEM CORE...",
  "ESTABLISHING SECURE PROTOCOLS...",
  "LOADING NETWORK INTERFACES [OK]",
  "MOUNTING REPOSITORIES...",
  "CHECKING BIT INTEGRITY...",
  "CONNECTING TO ALEXANDER.DEV [STABLE]",
  "DECRYPTING PORTFOLIO ASSETS...",
  "OPTIMIZING UI ENGINE...",
  "SYSTEM STATUS: 100% READY",
  "WELCOME, USER."
];

export default function TerminalLoader({ onComplete }: { onComplete: () => void }) {
  const [currentLine, setCurrentLine] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    if (currentLine < BOOT_LOGS.length) {
      const timeout = setTimeout(() => {
        setLogs(prev => [...prev, BOOT_LOGS[currentLine]]);
        setCurrentLine(prev => prev + 1);
      }, Math.random() * 200 + 100);

      return () => clearTimeout(timeout);
    } else {
      // Finished logs, wait a bit then complete
      const finalTimeout = setTimeout(onComplete, 800);
      return () => clearTimeout(finalTimeout);
    }
  }, [currentLine, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[10000] bg-[#050505] flex flex-col items-center justify-center p-6 font-mono"
    >
      <div className="w-full max-w-lg">
        <div className="flex items-center gap-2 mb-8 opacity-40">
          <div className="w-2 h-2 rounded-full bg-red-500" />
          <div className="w-2 h-2 rounded-full bg-yellow-500" />
          <div className="w-2 h-2 rounded-full bg-green-500" />
          <span className="text-[10px] uppercase tracking-widest text-white/40 ml-2">AL-OS BOOTLOADER v4.0.0</span>
        </div>

        <div className="space-y-1.5">
          <AnimatePresence mode="popLayout">
            {logs.map((log, i) => (
              <motion.div
                key={log}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-[11px] sm:text-xs tracking-tight"
              >
                <span className="text-white/20 mr-2">[{i.toString().padStart(2, '0')}]</span>
                <span className={i === logs.length - 1 ? "text-white" : "text-white/40"}>
                  {log}
                </span>
                {i === logs.length - 1 && (
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                    className="inline-block w-1.5 h-3 bg-white ml-2 align-middle"
                  />
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Progress Bar */}
        <div className="mt-12 w-full h-[1px] bg-white/5 relative">
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 2.5, ease: "easeInOut" }}
            className="absolute top-0 left-0 h-full bg-white/40 shadow-[0_0_10px_rgba(255,255,255,0.2)]"
          />
        </div>
      </div>
    </motion.div>
  );
}
