"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Mail, Send, Github, Linkedin, MessageSquare, User, AtSign } from "lucide-react";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [emailError, setEmailError] = useState("");
  const [captchaError, setCaptchaError] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error" | "reviewing">("idle");
  const [isVerified, setIsVerified] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

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

    if (!isVerified) {
      setCaptchaError("Please verify that you are not a robot.");
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
        setIsVerified(false);
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
    <section id="contact" className="min-h-screen flex flex-col justify-center relative overflow-x-clip bg-[#050505] pt-48 pb-24 md:py-32">
      <div className="max-w-7xl mx-auto w-full px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-y-16 lg:gap-x-32 items-start lg:items-center text-left w-full h-fit">
          {/* Left Side: Content */}
          <div className="space-y-12 h-full flex flex-col justify-center items-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="w-full text-center lg:text-left flex flex-col items-center lg:items-start"
            >
              <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tightest sm:tracking-tighter leading-[0.9] text-white uppercase italic mb-10">
                LET'S GET <br />
                <span style={{ WebkitTextStroke: "1px #fff", color: "transparent" }}>
                  IN TOUCH?
                </span>
              </h2>
              <p className="max-w-md mx-0 text-white/40 text-base sm:text-lg font-bold uppercase tracking-widest leading-relaxed border-l-2 border-white/10 px-6 lg:pl-6">
                Have a project in mind or just want to chat? Reach out and let's build something together.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-10 w-full flex flex-col items-center lg:items-start"
            >
              {/* Centered Icons Row */}
              <div className="flex items-center gap-4 sm:gap-6">
                <div className="size-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all text-white cursor-pointer">
                  <Mail size={22} />
                </div>
                <a href="https://github.com/Axz-zeke" target="_blank" rel="noopener noreferrer"
                  className="size-14 rounded-2xl border border-white/10 bg-white/5 flex items-center justify-center hover:bg-white hover:text-black transition-all text-white">
                  <Github size={22} />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
                  className="size-14 rounded-2xl border border-white/10 bg-white/5 flex items-center justify-center hover:bg-white hover:text-black transition-all text-white">
                  <Linkedin size={22} />
                </a>
              </div>

              {/* Direct Line Details */}
              <div className="text-center lg:text-left">
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 mb-2 leading-none">Direct Line</p>
                <p className="text-white font-bold tracking-tight text-sm sm:text-lg break-all">alexandersanalilalopez05@gmail.com</p>
              </div>
            </motion.div>
          </div>

          {/* Right Side: Form */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="w-full"
          >
            <div className="relative group p-0">
              <form onSubmit={handleSubmit} className="space-y-10 relative z-10">
                {status === "reviewing" ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-8 text-left"
                  >
                    <div className="space-y-1">
                      <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30">Confirmation</p>
                      <h3 className="text-xl font-black text-white uppercase italic tracking-tighter">Ready to ship?</h3>
                    </div>

                    <div className="space-y-6 pt-4">
                      <div className="border-b border-white/10 pb-4">
                        <p className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-2">Ship to</p>
                        <p className="text-lg font-bold text-white tracking-widest">{formData.name}</p>
                      </div>
                      <div className="border-b border-white/20 pb-4">
                        <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">Reply to</p>
                        <p className="text-lg font-bold text-white tracking-widest">{formData.email}</p>
                      </div>
                      <div className="pb-4">
                        <p className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-2">Message</p>
                        <p className="text-base text-white/60 leading-relaxed font-bold tracking-wider line-clamp-3">"{formData.message}"</p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setStatus("idle")}
                      className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 hover:text-white transition-colors border-b border-white/10 pb-1 mx-auto lg:mx-0 block"
                    >
                      ← Back to editor
                    </button>
                  </motion.div>
                ) : (
                  <div className="space-y-10">
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-[0.4em] text-white block ml-1 text-center lg:text-left">Name</label>
                      <input
                        type="text"
                        placeholder="ALEXANDER LOPEZ"
                        required
                        className="w-full bg-transparent border-b border-white/10 py-4 text-center lg:text-left text-base text-white/90 placeholder:text-white/20 focus:outline-none focus:border-white transition-all font-bold tracking-widest"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-[0.4em] text-white block ml-1 text-center lg:text-left">Email Address</label>
                      <div className="relative">
                        <input
                          type="email"
                          placeholder="ALEX@EXAMPLE.COM"
                          required
                          className={`w-full bg-transparent border-b py-4 text-center lg:text-left text-base text-white/90 placeholder:text-white/20 focus:outline-none transition-all font-bold tracking-widest ${emailError ? 'border-red-500' : 'border-white/10 focus:border-white'}`}
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
                          className="text-[10px] font-bold text-red-500 mt-2 uppercase tracking-widest text-center lg:text-left"
                        >
                          {emailError}
                        </motion.p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-[0.4em] text-white block ml-1 text-center lg:text-left">Message</label>
                      <textarea
                        placeholder="HOW CAN I HELP YOU?"
                        required
                        rows={4}
                        className="w-full bg-transparent border-b border-white/10 py-4 text-center lg:text-left text-base text-white/90 placeholder:text-white/20 focus:outline-none focus:border-white transition-all font-bold tracking-widest resize-none"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      />
                    </div>

                    {/* Custom Slider CAPTCHA */}
                    <div className="pt-6">
                      <div
                        ref={sliderRef}
                        className={`relative h-14 w-full border transition-all overflow-hidden ${isVerified ? 'border-green-500/30 bg-green-500/5' : captchaError ? 'border-red-500/50 bg-red-500/5' : 'border-white/10 bg-white/[0.02]'
                          }`}
                      >
                        {/* Track Background Text */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <p className={`text-[10px] font-black uppercase tracking-[0.4em] transition-opacity duration-300 ${isVerified ? 'text-green-500' : 'text-white/20'
                            }`}>
                            {isVerified ? "Verification Complete" : "Slide to Verify"}
                          </p>
                        </div>

                        {/* Slider Track Progress (Green highlight) */}
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: isVerified ? "100%" : 0 }}
                          className="absolute inset-y-0 left-0 bg-green-500/10 pointer-events-none"
                        />

                        {/* Draggable Handle */}
                        {!isVerified ? (
                          <motion.div
                            drag="x"
                            dragConstraints={sliderRef}
                            dragElastic={0}
                            dragMomentum={false}
                            onDragEnd={(event, info) => {
                              const containerWidth = sliderRef.current?.offsetWidth || 0;
                              const handleWidth = 56; // aspect-square h-14
                              const threshold = containerWidth - handleWidth - 10;
                              
                              if (info.offset.x > threshold * 0.8) {
                                setIsVerified(true);
                                setCaptchaError("");
                              }
                            }}
                            className="absolute left-0 top-0 bottom-0 aspect-square bg-white flex items-center justify-center cursor-grab active:cursor-grabbing z-20 group/handle transition-colors"
                          >
                            <div className="flex gap-0.5 pointer-events-none">
                              <div className="w-0.5 h-4 bg-black/20" />
                              <div className="w-0.5 h-4 bg-black/20" />
                              <div className="w-0.5 h-4 bg-black/20" />
                            </div>
                          </motion.div>
                        ) : (
                          <motion.div
                            initial={{ x: "calc(100% - 3.5rem)" }}
                            className="absolute left-0 top-0 bottom-0 aspect-square bg-green-500 flex items-center justify-center z-20"
                          >
                            <motion.svg
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="size-5 text-black"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={4}
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </motion.svg>
                          </motion.div>
                        )}
                      </div>
                      {captchaError && (
                        <motion.p
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-[10px] font-bold text-red-500 mt-2 uppercase tracking-widest text-center lg:text-left ml-1"
                        >
                          {captchaError}
                        </motion.p>
                      )}
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
