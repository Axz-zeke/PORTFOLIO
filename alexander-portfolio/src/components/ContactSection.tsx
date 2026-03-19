"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send, Github, Linkedin, MessageSquare, User, AtSign } from "lucide-react";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [emailError, setEmailError] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error" | "reviewing">("idle");

  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError("");

    if (!validateEmail(formData.email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    if (status !== "reviewing") {
      setStatus("reviewing");
      return;
    }

    setStatus("submitting");

    try {
      const response = await fetch("https://formspree.io/f/xreyrwpd", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Form error:", error);
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="min-h-screen flex flex-col justify-center px-6 relative overflow-hidden bg-[#050505] py-24">
      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-20 lg:gap-32 items-start text-center md:text-left">

          {/* Left Side: Content */}
          <div className="lg:sticky lg:top-24 space-y-12 h-full flex flex-col justify-center py-10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-7xl md:text-8xl font-black tracking-tighter leading-[0.85] text-white uppercase italic mb-10">
                LET'S GET <br />
                <span style={{ WebkitTextStroke: "1px #fff", color: "transparent" }}>
                  IN TOUCH?
                </span>
              </h2>
              <p className="max-w-md mx-auto md:mx-0 text-white/40 text-lg font-bold uppercase tracking-widest leading-relaxed border-l-2 border-white/10 pl-8">
                Have a project in mind or just want to chat? Reach out and let's build something exceptional together.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="flex flex-col md:flex-row items-center gap-6 group">
                <div className="size-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                  <Mail size={22} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 mb-1">Direct Line</p>
                  <p className="text-white font-bold tracking-tight text-lg break-all">alexandersanalilalopez05@gmail.com</p>
                </div>
              </div>

              <div className="flex justify-center md:justify-start gap-6 pt-4">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer"
                  className="size-14 rounded-2xl border border-white/10 bg-white/5 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                  <Github size={22} />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
                  className="size-14 rounded-2xl border border-white/10 bg-white/5 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                  <Linkedin size={22} />
                </a>
              </div>
            </motion.div>
          </div>

          {/* Right Side: Form */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="w-full lg:pt-14"
          >
            <div className="relative group p-0">
              <form onSubmit={handleSubmit} className="space-y-10 relative z-10">
                {status === "reviewing" ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-8"
                  >
                    <div className="space-y-1">
                      <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30">Confirmation</p>
                      <h3 className="text-xl font-black text-white uppercase italic tracking-tighter">Ready to ship?</h3>
                    </div>

                    <div className="space-y-6 pt-4">
                      <div className="border-b border-white/10 pb-4">
                        <p className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-2">Ship to</p>
                        <p className="text-lg font-bold text-white tracking-widest uppercase">{formData.name}</p>
                      </div>
                      <div className="border-b border-white/20 pb-4">
                        <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">Reply to</p>
                        <p className="text-lg font-bold text-white tracking-widest uppercase">{formData.email}</p>
                      </div>
                      <div className="pb-4">
                        <p className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-2">Message</p>
                        <p className="text-base text-white/60 leading-relaxed font-bold uppercase tracking-wider line-clamp-3">"{formData.message}"</p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setStatus("idle")}
                      className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 hover:text-white transition-colors border-b border-white/10 pb-1"
                    >
                      ← Back to editor
                    </button>
                  </motion.div>
                ) : (
                  <div className="space-y-10">
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-[0.4em] text-white block ml-1">Name</label>
                      <input
                        type="text"
                        placeholder="Alexander Lopez"
                        required
                        className="w-full bg-transparent border-b border-white/10 py-4 text-base text-white/90 placeholder:text-white/5 focus:outline-none focus:border-white transition-all font-bold  tracking-widest"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-[0.4em] text-white block ml-1">Email</label>
                      <div className="relative">
                        <input
                          type="email"
                          placeholder="alex@example.com"
                          required
                          className={`w-full bg-transparent border-b py-4 text-base text-white/90 placeholder:text-white/5 focus:outline-none transition-all font-bold tracking-widest ${emailError ? 'border-red-500' : 'border-white/10 focus:border-white'}`}
                          value={formData.email}
                          onBlur={() => {
                            if (formData.email && !validateEmail(formData.email)) {
                              setEmailError("Invalid format");
                            }
                          }}
                          onChange={(e) => {
                            setFormData({ ...formData, email: e.target.value });
                            if (validateEmail(e.target.value)) {
                              setEmailError("");
                            }
                          }}
                        />
                      </div>
                      {emailError && (
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-[10px] font-bold text-red-500 mt-2 uppercase tracking-widest"
                        >
                          {emailError}
                        </motion.p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-[0.4em] text-white block ml-1">Message</label>
                      <textarea
                        placeholder="How can I help you?"
                        required
                        rows={2}
                        className="w-full bg-transparent border-b border-white/10 py-4 text-base text-white/90 placeholder:text-white/5 focus:outline-none focus:border-white transition-all font-bold tracking-widest resize-none"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      />
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === "submitting" || status === "success"}
                  className={`w-full h-20 rounded-none font-black uppercase tracking-[0.4em] text-sm flex items-center justify-center gap-4 transition-all ${status === "success"
                    ? "text-green-400 border-y border-green-500/20"
                    : status === "error"
                      ? "text-red-400 border-y border-red-500/20"
                      : "text-white border-y border-white/10 hover:bg-white hover:text-black"
                    }`}
                >
                  {status === "submitting" ? (
                    <>
                      Shipping...
                      <div className="size-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    </>
                  ) : status === "success" ? (
                    <>
                      Mission Accomplished
                      <Send className="size-4" />
                    </>
                  ) : status === "error" ? (
                    "Transmission Failed"
                  ) : status === "reviewing" ? (
                    <>
                      Confirm & Send
                      <Send className="size-4" />
                    </>
                  ) : (
                    <>
                      Enter Message
                      <Send className="size-4" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
