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
  Rocket
} from "lucide-react";

export const metadata = {
  title: "Alexander Lopez | Portfolio",
  description: "IT Specialist and Full-Stack Developer with a focus on enterprise-grade infrastructure and modern web development.",
};

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background overflow-x-hidden selection:bg-primary/30">
      <GlobalLiquidBackground />
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none -z-10">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-5%] left-[-5%] w-[400px] h-[400px] bg-blue-500/10 blur-[100px] rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_0%,var(--background)_100%)] opacity-50" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-primary/10 border border-primary/20 flex items-center justify-center rounded-xl backdrop-blur-md">
            <p className="font-bold text-lg">AL</p>
          </div>
          <span className="font-bold tracking-tight hidden sm:block">Alexander Lopez</span>
        </div>
        <div className="flex items-center gap-6 bg-card/40 border border-border/50 px-6 py-2 rounded-2xl backdrop-blur-xl">
          <a href="#about" className="text-sm font-medium hover:text-primary transition-colors">About</a>
          <a href="#experience" className="text-sm font-medium hover:text-primary transition-colors">Experience</a>
          <a href="#projects" className="text-sm font-medium hover:text-primary transition-colors">Projects</a>
          <a href="#contact" className="text-sm font-medium hover:text-primary transition-colors">Contact</a>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="rounded-xl flex-shrink-0">
            <Github size={20} />
          </Button>
          <Button variant="default" size="icon" className="rounded-xl flex-shrink-0 bg-primary text-primary-foreground">
            <Linkedin size={20} />
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative px-6 pt-32 pb-24 md:pt-48 md:pb-40 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
        <div className="flex-1 space-y-8 text-center md:text-left">
          <Badge variant="outline" className="px-4 py-1.5 border-primary/20 bg-primary/5 text-primary text-xs uppercase tracking-widest font-semibold flex items-center gap-2 w-fit mx-auto md:mx-0">
            <Monitor className="w-3 h-3" />
            IT Specialist & Full-Stack Developer
          </Badge>

          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9]">
            TRANSFORMING <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">INFRASTRUCTURE.</span>
          </h1>

          <p className="max-w-xl text-lg text-muted-foreground font-medium leading-relaxed mx-auto md:mx-0">
            Building digital ecosystems with <span className="text-foreground">Next.js 15</span> and managing enterprise networks for over 200+ employees. Passionate about
            <span className="text-foreground"> technical autonomy</span> and efficient system operations.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 justify-center md:justify-start">
            <Button className="h-14 px-8 rounded-2xl bg-primary text-primary-foreground font-bold group shadow-xl shadow-primary/20">
              Download Resume
              <Download className="ml-2 w-5 h-5 group-hover:-translate-y-1 transition-transform" />
            </Button>
            <Button variant="outline" className="h-14 px-8 rounded-2xl border-border hover:bg-muted font-bold group transition-all">
              View Projects
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>

        {/* Hero Visual Block */}
        <div className="flex-1 w-full max-w-[800px] aspect-[4/5] relative group scale-110">
          <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full group-hover:bg-primary/30 transition-colors animate-pulse" />
          <div className="relative w-full h-full bg-card/10 border border-white/5 rounded-[40px] overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] backdrop-blur-sm">
            <LiquidMask
              imageBase="/funko.png"
              imageHover="/PROFILE.png"
              className="w-full h-full"
              splatRadius={0.15}
              splatStrength={0.5}
            />

            {/* Floating Elements */}
            <div className="absolute top-4 right-4 z-10">
              <div className="bg-black/50 backdrop-blur-md px-4 py-2 rounded-xl flex items-center gap-2 border border-white/10">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-xs font-bold text-white uppercase tracking-tighter">Available for Hire</span>
              </div>
            </div>

            <div className="absolute bottom-6 left-6 z-10 flex flex-col gap-1">
              <p className="text-white text-xl font-black italic tracking-tight drop-shadow-lg">Alexander S. Lopez</p>
              <p className="text-white/70 text-[10px] uppercase font-bold tracking-widest drop-shadow-md">Since 2021 • Mabalacat City, PH</p>
            </div>
          </div>
        </div>
      </section>

      {/* Experience / Info Section with Bento Grid */}
      <section id="experience" className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">ENGINEERING <span className="opacity-40">&</span> DESIGN</h2>
          <p className="text-muted-foreground uppercase tracking-[0.2em] font-bold text-sm">Professional Experience & Educational Foundation</p>
        </div>
        <BentoGrid />
      </section>

      {/* Projects Hook Section */}
      <section id="projects" className="py-32 px-6">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-10 border border-primary/20">
            <Rocket className="text-primary w-10 h-10" />
          </div>
          <h2 className="text-5xl md:text-7xl font-black text-center mb-12 italic">
            CRAFTING MODERN <br />
            <span className="text-muted-foreground not-italic">TECHNICAL SOLUTIONS.</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
            <Card className="rounded-[40px] overflow-hidden border-0 bg-card group cursor-pointer hover:shadow-2xl transition-all shadow-lg">
              <CardHeader className="p-8 pb-0">
                <Badge variant="outline" className="w-fit mb-4">Capstone 2025</Badge>
                <CardTitle className="text-3xl font-black leading-none">PermitEase</CardTitle>
                <p className="text-muted-foreground text-sm mt-4">Cloud-Based Automated School Exam Permit System. A revolutionary way to handle digital permissions in academic environments.</p>
              </CardHeader>
              <CardContent className="p-8">
                <div className="w-full aspect-video bg-muted rounded-2xl flex items-center justify-center group-hover:bg-primary/5 transition-colors">
                  <Monitor className="w-12 h-12 text-muted-foreground group-hover:text-primary group-hover:scale-110 transition-transform" />
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-[40px] overflow-hidden border-0 bg-card group cursor-pointer hover:shadow-2xl transition-all shadow-lg">
              <CardHeader className="p-8 pb-0">
                <Badge variant="outline" className="w-fit mb-4">IT Administration</Badge>
                <CardTitle className="text-3xl font-black leading-none">Asset Management System</CardTitle>
                <p className="text-muted-foreground text-sm mt-4">Developing Next-Gen inventory control for ShoreAgents using Next.js 15 and Supabase, featuring real-time QR tracking.</p>
              </CardHeader>
              <CardContent className="p-8">
                <div className="w-full aspect-video bg-muted rounded-2xl flex items-center justify-center group-hover:bg-blue-500/5 transition-colors">
                  <div className="w-12 h-12 text-muted-foreground group-hover:text-blue-500 group-hover:rotate-12 transition-transform">
                    <Monitor className="w-full h-full" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-24 px-6 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
        <div className="max-w-4xl mx-auto text-center relative z-10 flex flex-col items-center">
          <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">LET'S BUILD THE <br />NEXT GENERATION OF IT.</h2>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <Button className="bg-white text-black hover:bg-white/90 font-bold h-14 px-8 rounded-2xl">
              <Mail className="mr-2" />
              alexandersanalilalopez05@gmail.com
            </Button>
            <div className="flex gap-4">
              <Button variant="outline" className="border-white/20 hover:bg-white/10 rounded-2xl size-14">
                <Linkedin />
              </Button>
              <Button variant="outline" className="border-white/20 hover:bg-white/10 rounded-2xl size-14">
                <Github />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border/50 text-center">
        <p className="text-sm text-muted-foreground font-medium">© 2025 ALEXANDER LOPEZ. CRAFTED WITH ANTIGRAVITY + NEXT.JS.</p>
      </footer>
    </main>
  );
}
