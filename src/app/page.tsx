"use client";

import React, { useState, useEffect } from "react";
import {
  Award,
  Calendar,
  MapPin,
  Mail,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  Clock,
  BookOpen,
  Users,
  Cpu,
  Layers,
  Lightbulb,
  Zap,
  BarChart2,
  Activity,
  Compass,
  ArrowRight,
  Menu,
  X,
  Phone,
  FileText,
  Sun,
  Moon
} from "lucide-react";
import SmartGrid from "@/components/SmartGrid";
import CountUp from "@/components/CountUp";
import Ticket from "@/components/Ticket";

// Custom LinkedIn SVG Icon component since it's missing in the environment's lucide-react package
const Linkedin = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

// Static Webinar Session details
interface Session {
  id: number;
  number: string;
  title: string;
  speaker: string;
  speakerTitle: string;
  speakerOrg: string;
  date: string;
  description: string;
  icon: React.ReactNode;
}

const sessionsData: Session[] = [
  {
    id: 1,
    number: "Session 1",
    title: "Power System Operations & Smart Grids",
    speaker: "Mr. Satish Saini",
    speakerTitle: "Utilities Industry Specialist",
    speakerOrg: "HEXstream",
    date: "10 July 2026",
    description: "Explore the critical aspects of modern utility control centers, power flow optimizations, and real-time operations inside state-of-the-art smart grids.",
    icon: <Zap className="w-6 h-6 text-brand-emerald" />
  },
  {
    id: 2,
    number: "Session 2",
    title: "Power System Analysis & Computing",
    speaker: "Dr. Elena Rostova",
    speakerTitle: "Senior Grid Computing Expert",
    speakerOrg: "TechGrid Labs",
    date: "16 July 2026 (Expected)",
    description: "Delve into numerical methods, load flow calculations, and advanced computational platforms driving grid analysis models.",
    icon: <Cpu className="w-6 h-6 text-brand-emerald" />
  },
  {
    id: 3,
    number: "Session 3",
    title: "Power System Dynamics & Stability",
    speaker: "Prof. Marcus Vance",
    speakerTitle: "Professor of Electrical Systems",
    speakerOrg: "Imperial Energy Institute",
    date: "22 July 2026 (Expected)",
    description: "Understand transient stability, small-signal oscillations, and the dynamic behavior of grids with high renewable penetration.",
    icon: <Activity className="w-6 h-6 text-brand-emerald" />
  },
  {
    id: 4,
    number: "Session 4",
    title: "Planning, Forecasting & Risk Management",
    speaker: "Ms. Amara Okafor",
    speakerTitle: "Director of Grid Risk Planning",
    speakerOrg: "Continental TransCo",
    date: "29 July 2026 (Expected)",
    description: "Learn load forecasting techniques, predictive analytics, asset optimization, and mitigation models for grid failures.",
    icon: <BarChart2 className="w-6 h-6 text-brand-emerald" />
  },
  {
    id: 5,
    number: "Session 5",
    title: "Uncertainty, Optimization & Intelligent Systems",
    speaker: "Dr. Kenji Tanaka",
    speakerTitle: "AI Energy Principal Researcher",
    speakerOrg: "Kyoto AI Power",
    date: "05 August 2026 (Expected)",
    description: "Deploy machine learning, evolutionary algorithms, and stochastic optimizations to resolve grid uncertainties and load dispatch challenges.",
    icon: <Lightbulb className="w-6 h-6 text-brand-emerald" />
  }
];

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [activeTimelineNode, setActiveTimelineNode] = useState<number>(0);
  
  // Theme Toggle Effect
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("start");

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") as "dark" | "light" | null;
    if (storedTheme) {
      setTheme(storedTheme);
      if (storedTheme === "light") {
        document.documentElement.classList.add("light");
      } else {
        document.documentElement.classList.remove("light");
      }
    }

    const handleScroll = () => {
      // Navbar shrink trigger
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Scroll spy for sidebars
      const scrollPos = window.scrollY + 350;
      const aboutEl = document.getElementById("about");
      const inaugurationEl = document.getElementById("inauguration");
      const sessionsEl = document.getElementById("sessions");

      if (sessionsEl && scrollPos >= sessionsEl.offsetTop) {
        setActiveSection("03");
      } else if (inaugurationEl && scrollPos >= inaugurationEl.offsetTop) {
        setActiveSection("02");
      } else if (aboutEl && scrollPos >= aboutEl.offsetTop) {
        setActiveSection("01");
      } else {
        setActiveSection("start");
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
    if (nextTheme === "light") {
      document.documentElement.classList.add("light");
    } else {
      document.documentElement.classList.remove("light");
    }
  };

  // Registration Form States
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    ieeeNumber: "",
    institution: "",
    category: "Student"
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registeredUser, setRegisteredUser] = useState<any | null>(null);

  // Live Countdown Timer to July 10, 2026 (10:00:00 AM)
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isOver: false
  });

  useEffect(() => {
    const targetDate = new Date("2026-07-10T10:00:00").getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isOver: true });
      } else {
        const d = Math.floor(difference / (1000 * 60 * 60 * 24));
        const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ days: d, hours: h, minutes: m, seconds: s, isOver: false });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.institution) {
      alert("Please fill out all required fields.");
      return;
    }

    setIsSubmitting(true);
    // Simulate API registration delay
    setTimeout(() => {
      setIsSubmitting(false);
      const ticketId = `PN-${Math.floor(1000 + Math.random() * 9000)}`;
      setRegisteredUser({
        name: formData.name,
        email: formData.email,
        institution: formData.institution,
        category: formData.category,
        ticketId
      });
      // Scroll to ticket visual
      setTimeout(() => {
        document.getElementById("registration-section")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }, 1500);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div className="relative min-h-screen selection:bg-brand-emerald/30 selection:text-white">
      {/* Background Cyber Grid */}
      <div className="fixed inset-0 cyber-grid opacity-[0.25] pointer-events-none z-0" />
      
      {/* Subtle Grid Animation Overlay */}
      <div className="fixed inset-0 cyber-grid animate-grid-move opacity-[0.05] pointer-events-none z-0" />

      {/* Decorative vertical line dividers (styled after the reference UI) */}
      <div className="fixed top-0 bottom-0 left-[8%] w-[1px] bg-white/[0.02] pointer-events-none z-10 hidden md:block" />
      <div className="fixed top-0 bottom-0 right-[8%] w-[1px] bg-white/[0.02] pointer-events-none z-10 hidden md:block" />
      <div className="fixed top-0 bottom-0 left-[50%] w-[1px] bg-white/[0.01] pointer-events-none z-10 hidden md:block" />

      {/* Left Sidebar: Fixed Follow Us */}
      <div className="fixed left-[2%] md:left-[3%] top-[45%] -translate-y-1/2 flex flex-col items-center gap-6 z-40 select-none hidden sm:flex pointer-events-auto">
        <span className="text-[9px] font-extrabold text-white/40 uppercase tracking-[0.25em] [writing-mode:vertical-lr] rotate-180">
          Follow us
        </span>
        <span className="h-8 w-[1px] bg-white/20" />
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white transition-colors">
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
          </svg>
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white transition-colors">
          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </a>
      </div>

      {/* Right Sidebar: Fixed Scroll Spy Timeline Navigation */}
      <div className="fixed right-[2%] md:right-[3%] top-[45%] -translate-y-1/2 flex flex-col items-center gap-4 z-40 select-none hidden sm:flex text-right">
        <span
          className={`text-[9px] font-extrabold uppercase tracking-widest transition-colors duration-300 ${
            activeSection === "start" ? "text-brand-gold font-black" : "text-white/40"
          }`}
        >
          Start
        </span>
        <span className="h-10 w-[1px] bg-white/20" />
        <span
          className={`text-[10px] font-black transition-colors duration-300 ${
            activeSection === "01" ? "text-brand-emerald" : "text-white/30"
          }`}
        >
          01
        </span>
        <span
          className={`text-[10px] font-black transition-colors duration-300 ${
            activeSection === "02" ? "text-brand-emerald" : "text-white/30"
          }`}
        >
          02
        </span>
        <span
          className={`text-[10px] font-black transition-colors duration-300 ${
            activeSection === "03" ? "text-brand-emerald" : "text-white/30"
          }`}
        >
          03
        </span>
      </div>

      {/* Radial Emerald/Forest Glow Spots in background */}
      <div className="fixed top-[15%] left-[20%] w-[50vw] h-[50vw] bg-brand-emerald/5 rounded-full blur-3xl pointer-events-none z-0" />
      <div className="fixed bottom-[20%] right-[10%] w-[45vw] h-[45vw] bg-brand-forest/6 rounded-full blur-3xl pointer-events-none z-0" />
      <div className="fixed top-[55%] right-[25%] w-[40vw] h-[40vw] bg-brand-gold/3 rounded-full blur-3xl pointer-events-none z-0" />

      {/* NAVIGATION BAR */}
      <header className="fixed top-0 left-0 right-0 z-50 w-full pointer-events-none">
        <div
          className={`mx-auto pointer-events-auto transition-all duration-500 ease-in-out ${
            scrolled
              ? "mt-4 w-[92%] md:w-[80%] max-w-5xl rounded-full border border-white/10 bg-slate-950/85 backdrop-blur-md shadow-xl shadow-brand-emerald/5 py-2.5 px-6 md:px-8"
              : "mt-0 w-full border-b border-white/5 bg-slate-950/20 backdrop-blur-sm py-4 px-6 md:px-12"
          }`}
        >
          <div className="flex justify-between items-center">
            {/* Logo Branding: Official IEEE Logo */}
            <a href="#" className="flex items-center group">
              <img
                src="/IEEELOGO.png"
                alt="IEEE"
                className={`h-5 md:h-6 w-auto object-contain transition-all duration-300 ${
                  theme === "light" ? "filter brightness-0" : "filter brightness-0 invert"
                }`}
              />
            </a>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-gray-300">
              <a href="#about" className="hover:text-brand-emerald transition-colors">About</a>
              <a href="#inauguration" className="hover:text-brand-emerald transition-colors">Inauguration</a>
              <a href="#sessions" className="hover:text-brand-emerald transition-colors">Sessions</a>
              <a href="#schedule" className="hover:text-brand-emerald transition-colors">Schedule</a>
              <a href="#why-attend" className="hover:text-brand-emerald transition-colors">Why Attend</a>
              <a href="#faq" className="hover:text-brand-emerald transition-colors">FAQ</a>
              <a href="#contact" className="hover:text-brand-emerald transition-colors">Contact</a>
            </nav>

            {/* Action Button */}
            <div className="hidden md:flex items-center gap-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-gray-300 hover:text-brand-emerald transition-colors cursor-pointer"
                title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
              >
                {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
              <a
                href="#register"
                className="px-5 py-2 rounded-lg bg-gradient-to-r from-brand-emerald to-brand-forest text-white font-bold hover:brightness-110 shadow-lg shadow-brand-emerald/20 transition-all hover:scale-102 hover:shadow-brand-emerald/35 cursor-pointer text-sm"
              >
                Register Now
              </a>
            </div>

            {/* Mobile Controls */}
            <div className="flex md:hidden items-center gap-3">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-gray-300 hover:text-brand-emerald transition-colors cursor-pointer"
                title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
              >
                {theme === "dark" ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
              </button>
              
              {/* Mobile Menu Toggle */}
              <button
                className="text-white hover:text-brand-emerald focus:outline-none cursor-pointer"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Dropdown Panel */}
          {mobileMenuOpen && (
            <div className={`md:hidden absolute left-0 right-0 bg-slate-950/95 backdrop-blur-lg flex flex-col p-6 gap-4 text-center animate-fadeIn shadow-2xl ${
              scrolled ? "top-[115%] rounded-2xl border border-white/10 mx-auto w-[95%]" : "top-[100%] w-full border-b border-white/10"
            }`}>
              <a
                href="#about"
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-300 hover:text-brand-emerald py-2 border-b border-white/5 text-sm font-semibold"
              >
                About
              </a>
              <a
                href="#inauguration"
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-300 hover:text-brand-emerald py-2 border-b border-white/5 text-sm font-semibold"
              >
                Inauguration
              </a>
              <a
                href="#sessions"
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-300 hover:text-brand-emerald py-2 border-b border-white/5 text-sm font-semibold"
              >
                Sessions
              </a>
              <a
                href="#schedule"
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-300 hover:text-brand-emerald py-2 border-b border-white/5 text-sm font-semibold"
              >
                Schedule
              </a>
              <a
                href="#why-attend"
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-300 hover:text-brand-emerald py-2 border-b border-white/5 text-sm font-semibold"
              >
                Why Attend
              </a>
              <a
                href="#faq"
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-300 hover:text-brand-emerald py-2 border-b border-white/5 text-sm font-semibold"
              >
                FAQ
              </a>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-300 hover:text-brand-emerald py-2 border-b border-white/5 text-sm font-semibold"
              >
                Contact
              </a>
              <a
                href="#register"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-2 w-full py-2.5 rounded-lg bg-gradient-to-r from-brand-emerald to-brand-forest text-white font-bold hover:brightness-110 shadow-lg shadow-brand-emerald/20 transition-all text-sm inline-block"
              >
                Register Now
              </a>
            </div>
          )}
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative min-h-[92vh] flex items-center py-12 md:py-20 px-6 md:px-12 z-20 overflow-hidden bg-[#22B968]">
        {/* White Grunge Canvas Texture Overlay */}
        <div
          className="absolute inset-0 z-0 opacity-25 mix-blend-overlay bg-cover bg-center bg-no-repeat pointer-events-none"
          style={{ backgroundImage: "url('/white-grunge-texture-primed-canvas%201.png')" }}
        />
        {/* Cyber grid mesh */}
        <div className="absolute inset-0 z-0 cyber-grid opacity-[0.15] mix-blend-overlay pointer-events-none" />
        
        {/* Dark vignette to blend with sections below */}
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/0 via-black/25 to-[#070a13] pointer-events-none" />

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* Left Column: Title and details */}
          <div className="lg:col-span-7 flex flex-col text-left">
            {/* Hosting Organizers (Subheader matching layout style) */}
            <div className="space-y-1 mb-6">
              <span className="text-[10px] md:text-xs font-black tracking-[0.25em] text-white uppercase block font-sans">
                IEEE PES Student Branch Chapter, CEAL
              </span>
              <div className="flex items-center gap-2">
                <span className="h-[1px] w-6 bg-white/30" />
                <span className="text-[9px] md:text-[10px] font-bold text-white/70 uppercase tracking-widest">
                  IN COLLABORATION WITH
                </span>
                <span className="h-[1px] w-6 bg-white/30" />
              </div>
              <span className="text-[10px] md:text-xs font-black tracking-[0.25em] text-white/90 uppercase block font-sans">
                IEEE PES KERALA CHAPTER
              </span>
            </div>

            {/* Script Text */}
            <span className="font-script text-3xl md:text-4xl text-brand-gold font-normal tracking-wide pl-2 animate-pulse-slow">
              Presents
            </span>

            {/* Main Title: Original POWERNEXUS Vector Logo */}
            <div className="relative mt-2 mb-4 group select-none max-w-full">
              <img
                src="/Vector 2968.svg"
                alt="POWERNEXUS"
                className={`w-full max-w-[450px] sm:max-w-[550px] h-auto transition-all duration-300 ${
                  theme === "light" ? "filter invert drop-shadow-[0_0_10px_rgba(0,0,0,0.15)]" : "filter drop-shadow-[0_0_15px_rgba(16,185,129,0.35)]"
                }`}
              />
            </div>

            {/* Tagline */}
            <p className="text-base md:text-lg text-white font-medium max-w-xl leading-relaxed mt-4">
              Empowering the future of power & energy systems through knowledge, innovation, and global collaboration.
            </p>

            {/* Live Countdown Timer Block */}
            <div className="mt-8 mb-6 p-4 bg-slate-950/45 backdrop-blur-md rounded-xl max-w-md border border-white/10 relative">
              <div className="absolute top-2 right-3 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-brand-gold animate-ping" />
                <span className="text-[9px] font-bold text-brand-gold uppercase tracking-widest">
                  Live Countdown
                </span>
              </div>
              <div className="text-[10px] text-white/80 font-bold uppercase tracking-wider mb-2.5">
                Event Launching In
              </div>
              <div className="grid grid-cols-4 gap-2 text-center">
                <div className="bg-slate-950/80 p-2.5 rounded-lg border border-white/5">
                  <div className="text-2xl md:text-3xl font-extrabold font-serif text-white tracking-tight">
                    {timeLeft.days}
                  </div>
                  <div className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mt-0.5">Days</div>
                </div>
                <div className="bg-slate-950/80 p-2.5 rounded-lg border border-white/5">
                  <div className="text-2xl md:text-3xl font-extrabold font-serif text-white tracking-tight">
                    {timeLeft.hours}
                  </div>
                  <div className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mt-0.5">Hrs</div>
                </div>
                <div className="bg-slate-950/80 p-2.5 rounded-lg border border-white/5">
                  <div className="text-2xl md:text-3xl font-extrabold font-serif text-white tracking-tight">
                    {timeLeft.minutes}
                  </div>
                  <div className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mt-0.5">Mins</div>
                </div>
                <div className="bg-slate-950/80 p-2.5 rounded-lg border border-white/5">
                  <div className="text-2xl md:text-3xl font-extrabold font-serif text-brand-gold tracking-tight animate-pulse">
                    {timeLeft.seconds}
                  </div>
                  <div className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mt-0.5">Secs</div>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 items-center">
              <a
                href="#register"
                className="px-6 py-3 rounded-lg bg-slate-950 hover:bg-slate-900 border border-white/10 text-white font-extrabold shadow-lg shadow-black/20 transition-all hover:scale-102 flex items-center gap-2 cursor-pointer text-sm"
              >
                Register Now
                <ArrowRight className="w-4 h-4 text-white" />
              </a>
              <a
                href="#schedule"
                className="px-6 py-3 rounded-lg bg-white/10 border border-white/20 hover:bg-white/20 text-white font-semibold transition-all text-sm"
              >
                View Schedule
              </a>
              <a
                href="#speakers"
                className="px-6 py-3 rounded-lg bg-slate-950/40 border border-white/15 hover:bg-slate-950/60 text-white font-semibold transition-all text-sm"
              >
                Meet Speakers
              </a>
            </div>
          </div>

          {/* Right Column: SmartGrid SVG System */}
          <div className="lg:col-span-5 w-full flex justify-center">
            <SmartGrid />
          </div>
        </div>
      </section>

      {/* ORGANIZERS LOGO SECTION (Silhouetted white logos banners) */}
      <section className="py-10 px-6 border-y border-white/5 bg-slate-950/80 relative z-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4">
          <div className="text-center md:text-left">
            <span className="text-[10px] text-gray-500 uppercase tracking-widest font-extrabold block">
              Cooperating Entities
            </span>
            <h5 className="text-xs font-semibold text-gray-300 mt-1">
              Official IEEE Organizers & Partners
            </h5>
          </div>

          {/* Logo Strip (official uploaded logo assets matching the white layouts in reference image) */}
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12 opacity-85">
            {/* Logo 1: IEEE */}
            <div className="flex items-center justify-center border border-white/5 px-4 py-2 rounded-lg bg-slate-900/10 h-14 md:h-16 w-32 md:w-36">
              <img
                src="/IEEELOGO.png"
                alt="IEEE Logo"
                className="max-h-full max-w-full object-contain filter brightness-0 invert opacity-80 hover:opacity-100 transition-opacity"
              />
            </div>

            {/* Logo 2: IEEE PES */}
            <div className="flex items-center justify-center border border-white/5 px-4 py-2 rounded-lg bg-slate-900/10 h-14 md:h-16 w-32 md:w-36">
              <img
                src="/IEEE-PES_Logo-color.png"
                alt="IEEE Power & Energy Society"
                className="max-h-full max-w-full object-contain filter brightness-0 invert opacity-80 hover:opacity-100 transition-opacity"
              />
            </div>

            {/* Logo 3: PES Kerala */}
            <div className="flex items-center justify-center border border-white/5 px-4 py-2 rounded-lg bg-slate-900/10 h-14 md:h-16 w-32 md:w-36">
              <img
                src="/PESKC%20Newlogo.png"
                alt="IEEE PES Kerala Chapter"
                className="max-h-full max-w-full object-contain filter brightness-0 invert opacity-80 hover:opacity-100 transition-opacity"
              />
            </div>

            {/* Logo 4: SBC CEAL */}
            <div className="flex items-center justify-center border border-white/5 px-4 py-2 rounded-lg bg-slate-900/10 h-14 md:h-16 w-32 md:w-36">
              <img
                src="/LOGO%20SB%20CEAL%20LAW2%20W.png"
                alt="IEEE PES SBC CEAL"
                className="max-h-full max-w-full object-contain opacity-80 hover:opacity-100 transition-opacity"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION (SECTION 01) - Alternating layout: Text Left, Image Right */}
      <section id="about" className="py-24 px-6 md:px-12 relative z-20 vertical-stripes">
        <div className="max-w-7xl mx-auto">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative">
            {/* Outline section number in background */}
            <div className="text-outline text-[12rem] md:text-[16rem] font-bold font-serif select-none pointer-events-none absolute -top-32 left-0 -z-10 tracking-tighter opacity-80">
              01
            </div>

            {/* Left Column: Description & Stats Row */}
            <div className="lg:col-span-7 relative z-10 text-left">
              <span className="text-[10px] font-bold tracking-[0.3em] text-brand-gold uppercase block">
                THE INITIATIVE
              </span>
              <h2 className="text-3xl md:text-5xl font-serif text-white mt-2 mb-6 tracking-tight leading-tight">
                About the Webinar Series
              </h2>
              <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-6">
                POWERNEXUS is a premier, multi-session online technical webinar series organized by the <span className="text-brand-emerald font-semibold">IEEE PES SBC CEAL</span> in collaboration with the <span className="text-brand-forest font-semibold">IEEE PES Kerala Chapter</span>.
              </p>
              <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-8">
                The initiative connects students, researchers, young professionals, and industry experts to explore emerging trends, structural optimizations, and real-world applications in modern power and energy systems. Through focused panels, we aim to bridge the gap between academic research and commercial technology implementations.
              </p>

              {/* Stats counters row */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-6 border-t border-white/5">
                <div>
                  <div className="text-3xl font-bold font-serif text-white">
                    <CountUp end={5} suffix="" />
                  </div>
                  <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest block mt-0.5">
                    Technical Sessions
                  </span>
                </div>
                <div>
                  <div className="text-3xl font-bold font-serif text-white">
                    <CountUp end={3} suffix="" />
                  </div>
                  <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest block mt-0.5">
                    IEEE Experts
                  </span>
                </div>
                <div>
                  <div className="text-3xl font-bold font-serif text-brand-gold">
                    <CountUp end={100} suffix="%" />
                  </div>
                  <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest block mt-0.5">
                    Free Registration
                  </span>
                </div>
              </div>

              <div className="mt-8">
                <a
                  href="#register"
                  className="inline-flex items-center gap-2 text-xs font-bold text-brand-gold hover:text-brand-gold/80 transition-colors uppercase tracking-wider"
                >
                  Register & Attend <span className="text-sm">→</span>
                </a>
              </div>
            </div>

            {/* Right Column: Custom Vertical Image Asset with offset frame */}
            <div className="lg:col-span-5 w-full flex justify-center relative">
              <div className="relative group">
                {/* Floating offset frame */}
                <div className="absolute top-4 left-4 w-full h-full border border-brand-gold/30 rounded-sm -z-10 group-hover:translate-x-1 group-hover:translate-y-1 transition-transform duration-500" />
                <div className="relative bg-slate-950 p-2 border border-white/10 rounded-sm shadow-2xl">
                  <img
                    src="/wind_turbines.png"
                    alt="Wind Turbines on Green Peak"
                    className="w-full max-w-sm h-[320px] md:h-[450px] object-cover rounded-sm filter brightness-90 hover:brightness-100 transition-all duration-500"
                  />
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </section>

      {/* INAUGURATION CEREMONY (SECTION 02) - Alternating layout: Image Left, Text Right */}
      <section id="inauguration" className="py-24 px-6 md:px-12 bg-slate-950/40 relative z-20 border-y border-white/5 vertical-stripes">
        <div className="max-w-7xl mx-auto">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative">
            {/* Outline section number in background */}
            <div className="text-outline text-[12rem] md:text-[16rem] font-bold font-serif select-none pointer-events-none absolute -top-32 right-0 lg:right-[40%] -z-10 tracking-tighter opacity-80">
              02
            </div>

            {/* Left Column: Smart Grid Substation Image with offset frame */}
            <div className="lg:col-span-5 w-full flex justify-center order-last lg:order-first relative">
              <div className="relative group">
                {/* Floating offset frame (shifted left) */}
                <div className="absolute top-4 -left-4 w-full h-full border border-brand-emerald/30 rounded-sm -z-10 group-hover:-translate-x-1 group-hover:translate-y-1 transition-transform duration-500" />
                <div className="relative bg-slate-950 p-2 border border-white/10 rounded-sm shadow-2xl">
                  <img
                    src="/smart_substation.png"
                    alt="Smart Substation Concept"
                    className="w-full max-w-sm h-[320px] md:h-[450px] object-cover rounded-sm filter brightness-90 hover:brightness-100 transition-all duration-500"
                  />
                </div>
              </div>
            </div>

            {/* Right Column: Timeline & Speaker Info */}
            <div className="lg:col-span-7 relative z-10 text-left">
              <span className="text-[10px] font-bold tracking-[0.3em] text-brand-gold uppercase block">
                LAUNCH DAY - 10 JULY 2026
              </span>
              <h2 className="text-3xl md:text-5xl font-serif text-white mt-2 mb-6 tracking-tight leading-tight">
                Inauguration Ceremony
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                {/* Timeline info */}
                <div>
                  <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">
                    Ceremony Timeline
                  </h4>
                  <div className="space-y-4 border-l border-white/10 pl-4 ml-1.5">
                    <div className="relative">
                      <div className="absolute -left-[21px] top-1 w-2 h-2 rounded-full bg-brand-emerald border border-slate-950" />
                      <div className="text-xs font-bold text-white tracking-wider">Welcome Address</div>
                      <p className="text-[10px] text-gray-500 mt-0.5">IEEE PES Student Chapter Representative</p>
                    </div>
                    <div className="relative">
                      <div className="absolute -left-[21px] top-1 w-2 h-2 rounded-full bg-white/20 border border-slate-950" />
                      <div className="text-xs font-bold text-white tracking-wider">Presidential Address</div>
                      <p className="text-[10px] text-gray-400 mt-0.5">Dr. Boby Philip (Chair, IEEE PES Kerala Chapter)</p>
                    </div>
                    <div className="relative">
                      <div className="absolute -left-[21px] top-1 w-2 h-2 rounded-full bg-white/20 border border-slate-950" />
                      <div className="text-xs font-bold text-white tracking-wider">Chief Guest Address</div>
                      <p className="text-[10px] text-gray-400 mt-0.5">Prof. Canbing Li (IEEE PES Region 10 Representative)</p>
                    </div>
                    <div className="relative">
                      <div className="absolute -left-[21px] top-1 w-2 h-2 rounded-full bg-white/20 border border-slate-950" />
                      <div className="text-xs font-bold text-brand-gold tracking-wider">Official Inauguration</div>
                      <p className="text-[10px] text-gray-500 mt-0.5">Formal Ribbon/Portal Decal Activation</p>
                    </div>
                  </div>
                </div>

                {/* Speaker detail summaries */}
                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
                    Honored Speakers
                  </h4>

                  {/* Prof Canbing Li */}
                  <div className="p-3.5 rounded bg-white/5 border border-white/5">
                    <div className="flex justify-between items-start">
                      <h5 className="text-sm font-bold text-white font-serif">Prof. Canbing Li</h5>
                      <span className="text-[8px] bg-brand-emerald/10 text-brand-emerald px-1.5 py-0.5 rounded border border-brand-emerald/20 uppercase font-bold">Chief Guest</span>
                    </div>
                    <p className="text-[10px] text-brand-emerald font-semibold mt-0.5">Shanghai Jiao Tong University</p>
                    <p className="text-[10px] text-gray-400 mt-1">IEEE PES Region 10 Representative (Asia & Pacific). Leading smart grid expert.</p>
                  </div>

                  {/* Dr Boby Philip */}
                  <div className="p-3.5 rounded bg-white/5 border border-white/5">
                    <div className="flex justify-between items-start">
                      <h5 className="text-sm font-bold text-white font-serif">Dr. Boby Philip</h5>
                      <span className="text-[8px] bg-white/10 text-gray-300 px-1.5 py-0.5 rounded border border-white/10 uppercase font-bold">Presidential</span>
                    </div>
                    <p className="text-[10px] text-brand-emerald font-semibold mt-0.5">Chair, IEEE PES Kerala Chapter</p>
                    <p className="text-[10px] text-gray-400 mt-1">Acclaimed researcher driving state-level energy grids integration initiatives.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </section>

      {/* FEATURED TECHNICAL SESSION & SPEAKER (SECTION 03) - Alternating: Text Left, Image Right */}
      <section className="py-24 px-6 md:px-12 relative z-20 vertical-stripes">
        <div className="max-w-7xl mx-auto">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative">
            {/* Outline section number in background */}
            <div className="text-outline text-[12rem] md:text-[16rem] font-bold font-serif select-none pointer-events-none absolute -top-32 left-0 -z-10 tracking-tighter opacity-80">
              03
            </div>

            {/* Left Column: Speaker details */}
            <div className="lg:col-span-7 relative z-10 text-left">
              <span className="text-[10px] font-bold tracking-[0.3em] text-brand-gold uppercase block">
                FEATURED KEYNOTE LECTURE
              </span>
              <h2 className="text-3xl md:text-5xl font-serif text-white mt-2 mb-6 tracking-tight leading-tight">
                Power System Operations & Smart Grids
              </h2>
              
              <div className="glass-panel p-6 rounded-xl border border-white/5 mb-6">
                <div className="flex items-center gap-4 border-b border-white/5 pb-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-slate-900 border-2 border-brand-emerald flex items-center justify-center font-bold text-white font-serif">
                    SS
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white font-serif">Mr. Satish Saini</h4>
                    <p className="text-[10px] font-bold text-brand-emerald uppercase tracking-wider">
                      BSEE, SMIEEE, P.Eng. • Utilities Industry Specialist
                    </p>
                  </div>
                </div>
                <p className="text-xs md:text-sm text-gray-300 leading-relaxed">
                  Mr. Satish Saini is a senior utilities specialist at <span className="text-brand-emerald font-semibold">HEXstream</span>. With decades of energy diagnostics experience, his session analyzes modern SCADA operations, power dispatch optimization, and protective risk mitigation grids.
                </p>
                <div className="flex items-center gap-1.5 text-[10px] text-gray-400 font-semibold mt-4">
                  <Linkedin className="w-3.5 h-3.5 text-sky-400" />
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-brand-emerald transition-colors">
                    satishsaini-linkedin
                  </a>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <span className="text-[9px] font-bold bg-brand-emerald/10 border border-brand-emerald/20 px-2.5 py-1 rounded-full text-brand-emerald">
                  Grid Optimization
                </span>
                <span className="text-[9px] font-bold bg-brand-gold/10 border border-brand-gold/20 px-2.5 py-1 rounded-full text-brand-gold">
                  SCADA Utilities
                </span>
                <span className="text-[9px] font-bold bg-white/5 border border-white/10 px-2.5 py-1 rounded-full text-gray-300">
                  IEEE Senior Member
                </span>
              </div>
            </div>

            {/* Right Column: Solar Grid Image with offset frame */}
            <div className="lg:col-span-5 w-full flex justify-center relative">
              <div className="relative group">
                {/* Floating offset frame */}
                <div className="absolute top-4 left-4 w-full h-full border border-brand-gold/30 rounded-sm -z-10 group-hover:translate-x-1 group-hover:translate-y-1 transition-transform duration-500" />
                <div className="relative bg-slate-950 p-2 border border-white/10 rounded-sm shadow-2xl">
                  <img
                    src="/solar_grid.png"
                    alt="Solar Panels Grid Array"
                    className="w-full max-w-sm h-[320px] md:h-[450px] object-cover rounded-sm filter brightness-95 hover:brightness-100 transition-all duration-500"
                  />
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </section>

      {/* TECHNICAL WEBINAR SERIES (SECTION 04) - 5 Sessions Grid */}
      <section id="sessions" className="py-24 px-6 md:px-12 bg-slate-950/40 relative z-20 border-y border-white/5 vertical-stripes">
        <div className="max-w-7xl mx-auto">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start relative">
            {/* Outline section number in background */}
            <div className="text-outline text-[12rem] md:text-[16rem] font-bold font-serif select-none pointer-events-none absolute -top-32 left-0 -z-10 tracking-tighter opacity-80">
              04
            </div>

            {/* Left Column: Heading */}
            <div className="lg:col-span-4 relative z-10 text-left">
              <span className="text-[10px] font-bold tracking-[0.3em] text-brand-gold uppercase block">
                THE CURRICULUM
              </span>
              <h2 className="text-3xl md:text-5xl font-serif text-white mt-2 mb-6 tracking-tight leading-tight">
                Technical Webinar Series
              </h2>
              <p className="text-gray-400 text-sm md:text-base leading-relaxed mt-6">
                POWERNEXUS spans 5 distinct core curriculum domains inside modern grids, stability risk control, and intelligent optimization. Click register to join.
              </p>
            </div>

            {/* Right Column: Sessions Grid */}
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              {sessionsData.map((session) => (
                <div
                  key={session.id}
                  className="glass-panel p-6 rounded-xl border border-white/5 hover:border-brand-emerald/35 transition-all text-left flex flex-col justify-between group glass-panel-hover"
                >
                  <div>
                    {/* Header */}
                    <div className="flex justify-between items-center">
                      <span className="text-[9px] font-black text-brand-emerald uppercase bg-brand-emerald/10 px-2 py-0.5 rounded border border-brand-emerald/15">
                        {session.number}
                      </span>
                      {session.icon}
                    </div>

                    <h4 className="text-lg font-bold font-serif text-white group-hover:text-brand-emerald transition-colors mt-4">
                      {session.title}
                    </h4>

                    <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                      {session.description}
                    </p>
                  </div>

                  {/* Speaker detail & CTA */}
                  <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                    <div>
                      <div className="text-[9px] text-gray-500 uppercase tracking-wider font-semibold">
                        SPEAKER
                      </div>
                      <div className="text-xs font-bold text-white mt-0.5">
                        {session.speaker}
                      </div>
                      <div className="text-[9px] text-gray-400">
                        {session.speakerOrg}
                      </div>
                    </div>

                    <a
                      href="#register"
                      className="px-3 py-1.5 rounded bg-brand-emerald/10 border border-brand-emerald/20 text-[10px] font-bold text-brand-emerald hover:bg-brand-emerald hover:text-slate-950 transition-colors uppercase tracking-wider cursor-pointer"
                    >
                      Register
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
        </div>
      </section>

      {/* SPEAKERS SECTION */}
      <section id="speakers" className="py-24 px-6 md:px-12 relative z-20">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[10px] font-bold tracking-[0.3em] text-brand-gold uppercase block">
              EXPERTS PANEL
            </span>
            <h2 className="text-3xl md:text-5xl font-serif text-white mt-2 tracking-tight">
              Featured Speakers & Guests
            </h2>
            <p className="text-gray-400 text-sm mt-4 leading-relaxed">
              Learn from globally recognized IEEE officers and industry specialists representing premier global institutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Speaker 1: Prof Canbing Li */}
            <div className="glass-panel p-6 rounded-2xl border border-white/10 flex flex-col justify-between items-center text-center hover:border-brand-emerald/30 hover:-translate-y-1 transition-all group">
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 rounded-full bg-slate-950 border-2 border-brand-emerald flex items-center justify-center relative overflow-hidden shadow-lg shadow-brand-emerald/10 mb-6">
                  <div className="absolute inset-0 bg-[radial-gradient(#10b981_10%,transparent_60%)] opacity-35" />
                  <span className="text-2xl font-bold text-white font-serif">CL</span>
                </div>
                <span className="text-[9px] font-extrabold bg-brand-emerald/10 border border-brand-emerald/20 text-brand-emerald px-2.5 py-0.5 rounded-full uppercase tracking-wider mb-2">
                  Expected Chief Guest
                </span>
                <h3 className="text-xl font-bold font-serif text-white group-hover:text-brand-emerald transition-colors">
                  Prof. Canbing Li
                </h3>
                <p className="text-xs text-gray-400 font-semibold mt-1">
                  IEEE PES Region 10 Representative
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Shanghai Jiao Tong University
                </p>
                <p className="text-xs text-gray-400 mt-4 leading-relaxed px-2">
                  Driving regional membership activities and smart-grid computational diagnostics across Region 10 (Asia & Pacific).
                </p>
              </div>
              <div className="w-full mt-6 pt-4 border-t border-white/5 flex justify-center">
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs text-brand-emerald hover:text-brand-emerald-light font-bold">
                  <Linkedin className="w-3.5 h-3.5" />
                  Connect Profile
                </a>
              </div>
            </div>

            {/* Speaker 2: Mr. Satish Saini */}
            <div className="glass-panel p-6 rounded-2xl border border-white/10 flex flex-col justify-between items-center text-center hover:border-brand-emerald/30 hover:-translate-y-1 transition-all group">
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 rounded-full bg-slate-950 border-2 border-brand-emerald flex items-center justify-center relative overflow-hidden shadow-lg shadow-brand-emerald/10 mb-6">
                  <div className="absolute inset-0 bg-[radial-gradient(#10b981_10%,transparent_60%)] opacity-35" />
                  <span className="text-2xl font-bold text-white font-serif">SS</span>
                </div>
                <span className="text-[9px] font-extrabold bg-brand-emerald/10 border border-brand-emerald/20 text-brand-emerald px-2.5 py-0.5 rounded-full uppercase tracking-wider mb-2">
                  Technical Keynote
                </span>
                <h3 className="text-xl font-bold font-serif text-white group-hover:text-brand-emerald transition-colors">
                  Mr. Satish Saini
                </h3>
                <p className="text-xs text-gray-400 font-semibold mt-1">
                  Utilities Industry Specialist
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  HEXstream (BSEE, SMIEEE, P.Eng.)
                </p>
                <p className="text-xs text-gray-400 mt-4 leading-relaxed px-2">
                  Specializing in real-time grid computations, asset health index, SCADA, and utility automation logic.
                </p>
              </div>
              <div className="w-full mt-6 pt-4 border-t border-white/5 flex justify-center">
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs text-brand-emerald hover:text-brand-emerald-light font-bold">
                  <Linkedin className="w-3.5 h-3.5" />
                  Connect Profile
                </a>
              </div>
            </div>

            {/* Speaker 3: Dr. Mythili Chaganti */}
            <div className="glass-panel p-6 rounded-2xl border border-white/10 flex flex-col justify-between items-center text-center hover:border-brand-emerald/30 hover:-translate-y-1 transition-all group">
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 rounded-full bg-slate-950 border-2 border-brand-emerald flex items-center justify-center relative overflow-hidden shadow-lg shadow-brand-emerald/10 mb-6">
                  <div className="absolute inset-0 bg-[radial-gradient(#10b981_10%,transparent_60%)] opacity-35" />
                  <span className="text-2xl font-bold text-white font-serif">MC</span>
                </div>
                <span className="text-[9px] font-extrabold bg-brand-emerald/10 border border-brand-emerald/20 text-brand-emerald px-2.5 py-0.5 rounded-full uppercase tracking-wider mb-2">
                  Global IEEE Officer
                </span>
                <h3 className="text-xl font-bold font-serif text-white group-hover:text-brand-emerald transition-colors">
                  Dr. Mythili Chaganti
                </h3>
                <p className="text-xs text-gray-400 font-semibold mt-1">
                  IEEE PES Vice President
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Chapters & Membership Association
                </p>
                <p className="text-xs text-gray-400 mt-4 leading-relaxed px-2">
                  Overseeing global chapters and academic programs, structuring key student initiatives and research networks.
                </p>
              </div>
              <div className="w-full mt-6 pt-4 border-t border-white/5 flex justify-center">
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs text-brand-emerald hover:text-brand-emerald-light font-bold">
                  <Linkedin className="w-3.5 h-3.5" />
                  Connect Profile
                </a>
              </div>
            </div>
          </div>
          
        </div>
      </section>

      {/* SCHEDULE TIMELINE (SECTION 05) */}
      <section id="schedule" className="py-24 px-6 md:px-12 bg-slate-950/40 relative z-20 border-y border-white/5 vertical-stripes">
        <div className="max-w-7xl mx-auto">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start relative">
            {/* Outline section number in background */}
            <div className="text-outline text-[12rem] md:text-[16rem] font-bold font-serif select-none pointer-events-none absolute -top-32 left-0 -z-10 tracking-tighter opacity-80">
              05
            </div>

            {/* Left Column: Heading and description */}
            <div className="lg:col-span-5 relative z-10 text-left">
              <span className="text-[10px] font-bold tracking-[0.3em] text-brand-gold uppercase block">
                CHRONOLOGY
              </span>
              <h2 className="text-3xl md:text-5xl font-serif text-white mt-2 mb-6 tracking-tight leading-tight">
                Event Schedule Timeline
              </h2>
              <p className="text-gray-400 text-sm md:text-base leading-relaxed mt-6">
                POWERNEXUS begins on 10 July 2026. Review our session milestones below. Click on any node in the timeline to view details.
              </p>

              {/* Mini Details Block linked to clicked node */}
              <div className="mt-8 p-6 glass-panel rounded-xl border border-white/5 text-left">
                <div className="text-[10px] font-extrabold text-brand-gold uppercase tracking-wider">
                  Timeline Detail
                </div>
                {activeTimelineNode === 0 && (
                  <div className="mt-3">
                    <h5 className="text-sm font-bold text-white font-serif">Inauguration & Launch Day</h5>
                    <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                      Official commencement of the series. Connect with Regional IEEE Chairs and the Executive Committee at 10:00 AM.
                    </p>
                  </div>
                )}
                {activeTimelineNode === 1 && (
                  <div className="mt-3">
                    <h5 className="text-sm font-bold text-white font-serif">Power System Operations & Smart Grids</h5>
                    <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                      Keynote presentation by Mr. Satish Saini (HEXstream) starting directly after the formal launch ceremony at 11:30 AM.
                    </p>
                  </div>
                )}
                {activeTimelineNode === 2 && (
                  <div className="mt-3">
                    <h5 className="text-sm font-bold text-white font-serif">Subsequent Webinars (Sessions 2 to 5)</h5>
                    <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                      Remaining webinar sessions will run on 16 July and onwards. Join via the same Webex/Zoom entry credential provided in your pass.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Interactive Vertical Timeline */}
            <div className="lg:col-span-7 relative pl-8 border-l border-white/10 ml-4 py-4 space-y-12">
              {/* Timeline item 1 */}
              <div
                className={`relative cursor-pointer transition-all duration-300 ${
                  activeTimelineNode === 0 ? "scale-[1.02] pl-2" : "opacity-75 hover:opacity-100"
                }`}
                onClick={() => setActiveTimelineNode(0)}
              >
                {/* Node indicator */}
                <div
                  className={`absolute -left-[41px] top-1 w-5 h-5 rounded-full border-4 border-slate-950 flex items-center justify-center transition-all ${
                    activeTimelineNode === 0 ? "bg-brand-emerald scale-125" : "bg-white/20"
                  }`}
                />
                <span className="text-[10px] font-black text-brand-emerald uppercase tracking-widest">
                  10 July 2026 • 10:00 AM IST
                </span>
                <h4 className="text-xl font-bold font-serif text-white mt-1">
                  Inauguration Ceremony
                </h4>
                <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                  Join IEEE PES Kerala Chapter, CEAL officers, and global delegates for the inaugural ritual and series kickoff.
                </p>
              </div>

              {/* Timeline item 2 */}
              <div
                className={`relative cursor-pointer transition-all duration-300 ${
                  activeTimelineNode === 1 ? "scale-[1.02] pl-2" : "opacity-75 hover:opacity-100"
                }`}
                onClick={() => setActiveTimelineNode(1)}
              >
                {/* Node indicator */}
                <div
                  className={`absolute -left-[41px] top-1 w-5 h-5 rounded-full border-4 border-slate-950 flex items-center justify-center transition-all ${
                    activeTimelineNode === 1 ? "bg-brand-emerald scale-125" : "bg-white/20"
                  }`}
                />
                <span className="text-[10px] font-black text-brand-gold uppercase tracking-widest">
                  10 July 2026 • 11:30 AM IST
                </span>
                <h4 className="text-xl font-bold font-serif text-white mt-1">
                  Power System Operations & Smart Grids
                </h4>
                <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                  Webinar Session 1 led by Mr. Satish Saini (Utilities Specialist, HEXstream) analyzing real-time control metrics.
                </p>
              </div>

              {/* Timeline item 3 */}
              <div
                className={`relative cursor-pointer transition-all duration-300 ${
                  activeTimelineNode === 2 ? "scale-[1.02] pl-2" : "opacity-75 hover:opacity-100"
                }`}
                onClick={() => setActiveTimelineNode(2)}
              >
                {/* Node indicator */}
                <div
                  className={`absolute -left-[41px] top-1 w-5 h-5 rounded-full border-4 border-slate-950 flex items-center justify-center transition-all ${
                    activeTimelineNode === 2 ? "bg-brand-emerald scale-125" : "bg-white/20"
                  }`}
                />
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  16 July 2026 Onwards
                </span>
                <h4 className="text-xl font-bold font-serif text-white mt-1">
                  Remaining Webinar Sessions
                </h4>
                <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                  Sessions 2 to 5 will proceed over the following weeks, covering Analysis, Dynamics, Planning, and Intelligent Systems.
                </p>
              </div>
            </div>
          </div>
          
        </div>
      </section>

      {/* WHY ATTEND */}
      <section id="why-attend" className="py-24 px-6 md:px-12 relative z-20">
        <div className="max-w-7xl mx-auto">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start relative animate-fadeIn">
            {/* Outline section number in background */}
            <div className="text-outline text-[12rem] md:text-[16rem] font-bold font-serif select-none pointer-events-none absolute -top-32 left-0 -z-10 tracking-tighter opacity-80">
              06
            </div>

            {/* Left Column */}
            <div className="lg:col-span-4 relative z-10 text-left">
              <span className="text-[10px] font-bold tracking-[0.3em] text-brand-gold uppercase block">
                BENEFITS
              </span>
              <h2 className="text-3xl md:text-5xl font-serif text-white mt-2 mb-6 tracking-tight leading-tight">
                Why Attend POWERNEXUS?
              </h2>
              <p className="text-gray-400 text-sm md:text-base leading-relaxed mt-6">
                Develop essential competence in power networks, discover research domains, and claim official IEEE PES certificates.
              </p>
            </div>

            {/* Right Column: Benefits cards grid */}
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              
              {/* Card 1 */}
              <div className="glass-panel p-6 rounded-xl border border-white/5 hover:border-brand-emerald/30 hover:-translate-y-1 transition-all text-left group">
                <div className="w-10 h-10 rounded-lg bg-brand-emerald/15 flex items-center justify-center mb-4">
                  <Users className="w-5 h-5 text-brand-emerald" />
                </div>
                <h4 className="text-base font-bold font-serif text-white group-hover:text-brand-emerald transition-colors">
                  Global IEEE Experts
                </h4>
                <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                  Interact with senior IEEE coordinators and representatives across global sectors.
                </p>
              </div>

              {/* Card 2 */}
              <div className="glass-panel p-6 rounded-xl border border-white/5 hover:border-brand-emerald/30 hover:-translate-y-1 transition-all text-left group">
                <div className="w-10 h-10 rounded-lg bg-brand-emerald/15 flex items-center justify-center mb-4">
                  <Cpu className="w-5 h-5 text-brand-emerald" />
                </div>
                <h4 className="text-base font-bold font-serif text-white group-hover:text-brand-emerald transition-colors">
                  Industry Insights
                </h4>
                <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                  Understand core utility setups, SCADA implementations, and real-world system applications.
                </p>
              </div>

              {/* Card 3 */}
              <div className="glass-panel p-6 rounded-xl border border-white/5 hover:border-brand-emerald/30 hover:-translate-y-1 transition-all text-left group">
                <div className="w-10 h-10 rounded-lg bg-brand-emerald/15 flex items-center justify-center mb-4">
                  <BookOpen className="w-5 h-5 text-brand-emerald" />
                </div>
                <h4 className="text-base font-bold font-serif text-white group-hover:text-brand-emerald transition-colors">
                  Latest Research
                </h4>
                <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                  Examine transient grid dynamics, stability metrics, and AI integration research models.
                </p>
              </div>

              {/* Card 4 */}
              <div className="glass-panel p-6 rounded-xl border border-white/5 hover:border-brand-emerald/30 hover:-translate-y-1 transition-all text-left group">
                <div className="w-10 h-10 rounded-lg bg-brand-emerald/15 flex items-center justify-center mb-4">
                  <Compass className="w-5 h-5 text-brand-emerald" />
                </div>
                <h4 className="text-base font-bold font-serif text-white group-hover:text-brand-emerald transition-colors">
                  Professional Networking
                </h4>
                <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                  Connect with academic peers, research scholars, and industry professionals.
                </p>
              </div>

              {/* Card 5 */}
              <div className="glass-panel p-6 rounded-xl border border-white/5 hover:border-brand-emerald/30 hover:-translate-y-1 transition-all text-left group">
                <div className="w-10 h-10 rounded-lg bg-brand-emerald/15 flex items-center justify-center mb-4">
                  <Award className="w-5 h-5 text-brand-emerald" />
                </div>
                <h4 className="text-base font-bold font-serif text-white group-hover:text-brand-emerald transition-colors">
                  IEEE E-Certificate
                </h4>
                <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                  Receive a validated technical participation certificate issued directly by IEEE PES.
                </p>
              </div>

              {/* Card 6 */}
              <div className="glass-panel p-6 rounded-xl border border-white/5 hover:border-brand-emerald/30 hover:-translate-y-1 transition-all text-left group">
                <div className="w-10 h-10 rounded-lg bg-brand-emerald/15 flex items-center justify-center mb-4">
                  <Layers className="w-5 h-5 text-brand-emerald" />
                </div>
                <h4 className="text-base font-bold font-serif text-white group-hover:text-brand-emerald transition-colors">
                  Interactive Q&A
                </h4>
                <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                  Submit queries directly to speakers and interact during active panel reviews.
                </p>
              </div>

            </div>
          </div>
          
        </div>
      </section>

      {/* REGISTRATION SECTION */}
      <section id="register" className="py-24 px-6 md:px-12 bg-slate-950/40 relative z-20 border-y border-white/5 vertical-stripes">
        <div id="registration-section" className="max-w-7xl mx-auto scroll-mt-24">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative">
            {/* Outline section number in background */}
            <div className="text-outline text-[12rem] md:text-[16rem] font-bold font-serif select-none pointer-events-none absolute -top-32 left-0 -z-10 tracking-tighter opacity-80">
              07
            </div>

            {/* Left Column: Info block */}
            <div className="lg:col-span-5 relative z-10 text-left">
              <span className="text-[10px] font-bold tracking-[0.3em] text-brand-gold uppercase block">
                SECURE SEAT
              </span>
              <h2 className="text-3xl md:text-5xl font-serif text-white mt-2 mb-6 tracking-tight leading-tight">
                Event Registration
              </h2>
              <p className="text-gray-300 text-sm md:text-base leading-relaxed mt-6">
                Register now to secure access to all 5 technical sessions and generate your official IEEE entry pass.
              </p>

              <div className="mt-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-brand-gold" />
                  <span className="text-xs font-semibold text-gray-300">
                    Registration Deadline: 09 July 2026
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-brand-emerald" />
                  <span className="text-xs font-semibold text-gray-300">
                    Fee: 100% Free of Cost
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Dynamic Form / Entry Pass View */}
            <div className="lg:col-span-7 w-full">
              {registeredUser ? (
                /* Ticket view on registration success */
                <div className="animate-fadeIn">
                  <div className="text-center mb-6">
                    <span className="text-xs font-extrabold bg-green-500/10 border border-green-500/20 text-green-400 px-3 py-1 rounded-full uppercase tracking-wider">
                      ✓ Registration Successful
                    </span>
                    <h3 className="text-xl font-bold font-serif text-white mt-3">
                      Your Official Pass is Ready!
                    </h3>
                  </div>
                  <Ticket attendee={registeredUser} />
                </div>
              ) : (
                /* Glassmorphic Form panel */
                <form
                  onSubmit={handleRegisterSubmit}
                  className="glass-panel p-8 rounded-2xl border border-white/10 relative text-left"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-brand-emerald-glow blur-2xl pointer-events-none rounded-full" />
                  
                  <h4 className="text-lg font-bold font-serif text-white border-b border-white/5 pb-4 mb-6">
                    Registration Form
                  </h4>

                  <div className="space-y-4">
                    {/* Name input */}
                    <div>
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1.5">
                        Full Name <span className="text-brand-emerald">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        placeholder="e.g. John Doe"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full bg-slate-950/70 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-emerald/60 transition-colors"
                      />
                    </div>

                    {/* Email input */}
                    <div>
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1.5">
                        Email Address <span className="text-brand-emerald">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        placeholder="john.doe@example.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full bg-slate-950/70 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-emerald/60 transition-colors"
                      />
                    </div>

                    {/* Institution input */}
                    <div>
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1.5">
                        Institution / University <span className="text-brand-emerald">*</span>
                      </label>
                      <input
                        type="text"
                        name="institution"
                        required
                        placeholder="e.g. College of Engineering Attingal"
                        value={formData.institution}
                        onChange={handleInputChange}
                        className="w-full bg-slate-950/70 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-emerald/60 transition-colors"
                      />
                    </div>

                    {/* Split Row: Category & IEEE Member code */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1.5">
                          Category <span className="text-brand-emerald">*</span>
                        </label>
                        <select
                          name="category"
                          value={formData.category}
                          onChange={handleInputChange}
                          className="w-full bg-slate-950/70 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-brand-emerald/60 transition-colors"
                        >
                          <option value="Student" className="bg-slate-950">Student</option>
                          <option value="Professional" className="bg-slate-950">Professional</option>
                          <option value="Researcher" className="bg-slate-950">Researcher</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1.5">
                          IEEE Member No. <span className="text-gray-500">(Optional)</span>
                        </label>
                        <input
                          type="text"
                          name="ieeeNumber"
                          placeholder="e.g. 9832810"
                          value={formData.ieeeNumber}
                          onChange={handleInputChange}
                          className="w-full bg-slate-950/70 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-brand-emerald/60 transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mt-8 py-3 rounded-lg bg-gradient-to-r from-brand-emerald to-brand-forest text-white font-black hover:brightness-110 shadow-lg shadow-brand-emerald/20 transition-all text-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Generating Entry Pass...
                      </>
                    ) : (
                      <>
                        Register & Get Digital Pass
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
          
        </div>
      </section>

      {/* FAQ SECTION */}
      <section id="faq" className="py-24 px-6 md:px-12 relative z-20">
        <div className="max-w-4xl mx-auto">
          
          <div className="text-center mb-16">
            <span className="text-[10px] font-bold tracking-[0.3em] text-brand-gold uppercase block">
              ASSISTANCE
            </span>
            <h2 className="text-3xl md:text-5xl font-serif text-white mt-2 tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4 text-left">
            {[
              {
                q: "Is participation free?",
                a: "Yes, registration is completely free of charge for students, researchers, and professionals."
              },
              {
                q: "Will certificates be provided?",
                a: "Yes, all registered attendees who participate in the webinar sessions will receive an official E-Certificate co-authenticated by IEEE PES Kerala Chapter and IEEE PES CEAL Student Chapter."
              },
              {
                q: "Who can attend the webinar series?",
                a: "Anyone interested in electrical engineering, smart grids, renewable energy, AI grid applications, and power stability. IEEE membership is not required to register."
              },
              {
                q: "Will recordings of the sessions be available?",
                a: "Recordings and speaker materials will be published and shared with registered participants after the completion of each session."
              }
            ].map((faq, i) => (
              <div
                key={i}
                className="glass-panel rounded-xl border border-white/5 overflow-hidden transition-colors hover:border-brand-emerald/20"
              >
                <button
                  onClick={() => toggleFaq(i)}
                  className="w-full p-5 flex justify-between items-center text-left focus:outline-none cursor-pointer"
                >
                  <span className="font-bold text-white font-serif text-sm md:text-base">
                    {faq.q}
                  </span>
                  {activeFaq === i ? (
                    <ChevronUp className="w-5 h-5 text-brand-emerald shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500 shrink-0" />
                  )}
                </button>
                {activeFaq === i && (
                  <div className="p-5 pt-0 border-t border-white/5 text-xs md:text-sm text-gray-400 leading-relaxed bg-slate-900/30 animate-fadeIn">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="py-24 px-6 md:px-12 bg-slate-950/40 border-t border-white/5 relative z-20 vertical-stripes">
        <div className="max-w-7xl mx-auto">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 text-left">
            {/* Left: Contact Info */}
            <div className="lg:col-span-5">
              <span className="text-[10px] font-bold tracking-[0.3em] text-brand-gold uppercase block">
                GET IN TOUCH
              </span>
              <h2 className="text-3xl md:text-5xl font-serif text-white mt-2 tracking-tight">
                Contact Organizers
              </h2>
              <p className="text-gray-400 text-sm leading-relaxed mt-4 mb-8">
                For partnerships, speaker inquiries, or registration assistance, please contact our student chapter committee.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-slate-900 border border-white/10 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-brand-emerald" />
                  </div>
                  <div>
                    <div className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">
                      EMAIL ADDRESS
                    </div>
                    <a href="mailto:pes.ceal@ieee.org" className="text-sm font-bold text-white hover:text-brand-emerald transition-colors">
                      pes.ceal@ieee.org
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-slate-900 border border-white/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-brand-emerald" />
                  </div>
                  <div>
                    <div className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">
                      LOCATION
                    </div>
                    <p className="text-sm font-bold text-white">
                      College of Engineering Attingal, Thiruvananthapuram, Kerala, India
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-slate-900 border border-white/10 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-brand-emerald" />
                  </div>
                  <div>
                    <div className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">
                      INQUIRY NUMBER
                    </div>
                    <p className="text-sm font-bold text-white">
                      +91 984 651 2026
                    </p>
                  </div>
                </div>
              </div>

              {/* External Links */}
              <div className="mt-8 pt-6 border-t border-white/5">
                <a
                  href="https://pes.ieeekerala.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-brand-emerald hover:text-brand-emerald-light font-bold"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Visit IEEE PES Kerala Chapter
                </a>
              </div>
            </div>

            {/* Right: Map Placeholder / Vector Map */}
            <div className="lg:col-span-7">
              <div className="w-full h-80 rounded-2xl border border-white/10 overflow-hidden relative group">
                {/* Custom glowing map background using SVG */}
                <div className="absolute inset-0 bg-slate-950 cyber-grid opacity-30 group-hover:scale-102 transition-transform duration-700" />
                
                {/* SVG glowing coordinates and circles */}
                <svg className="w-full h-full absolute inset-0 z-10" xmlns="http://www.w3.org/2000/svg">
                  {/* Abstract connection lines */}
                  <g stroke="rgba(16, 185, 129, 0.15)" strokeWidth="1">
                    <line x1="100" y1="50" x2="350" y2="150" />
                    <line x1="350" y1="150" x2="200" y2="280" />
                    <line x1="200" y1="280" x2="100" y2="50" />
                    <line x1="350" y1="150" x2="420" y2="80" />
                    <line x1="200" y1="280" x2="420" y2="220" />
                  </g>
                  {/* Node locations */}
                  <circle cx="100" cy="50" r="4" fill="rgba(255,255,255,0.2)" />
                  <circle cx="420" cy="80" r="4" fill="rgba(255,255,255,0.2)" />
                  <circle cx="420" cy="220" r="4" fill="rgba(255,255,255,0.2)" />
                  
                  {/* Main Event Node (College of Engineering Attingal) */}
                  <g className="animate-pulse">
                    <circle cx="350" cy="150" r="16" fill="rgba(16, 185, 129, 0.15)" />
                    <circle cx="350" cy="150" r="8" fill="rgba(16, 185, 129, 0.3)" />
                    <circle cx="350" cy="150" r="3" fill="#10b981" />
                  </g>
                  <text x="350" y="130" fill="#10b981" fontSize="10" fontWeight="bold" textAnchor="middle" letterSpacing="1">
                    CE ATTINGAL (CEAL)
                  </text>
                </svg>

                {/* Map labels */}
                <div className="absolute bottom-4 left-4 z-20 bg-slate-900/90 border border-white/10 rounded-lg px-4 py-3 backdrop-blur-md">
                  <div className="text-xs font-bold text-white font-serif">CEAL Campus Hub</div>
                  <div className="text-[10px] text-gray-400 mt-0.5">8.6946° N, 76.8143° E • Kerala, IN</div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </section>

      {/* FOOTER (Styled exactly as the reference UI's bottom bar) */}
      <footer className="py-12 px-6 md:px-12 border-t border-white/5 bg-slate-950 relative z-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded bg-brand-emerald flex items-center justify-center font-bold text-slate-950 text-xs">⚡</span>
              <span className="font-extrabold tracking-widest text-sm font-sans text-white">POWERNEXUS</span>
            </div>
            <p className="text-[10px] text-gray-500 mt-2">
              © {new Date().getFullYear()} IEEE PES SBC CEAL. All Rights Reserved.
            </p>
          </div>

          {/* Social media connections */}
          <div className="flex gap-4 items-center">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded bg-white/5 hover:bg-brand-emerald/20 border border-white/5 hover:border-brand-emerald/35 flex items-center justify-center text-gray-400 hover:text-brand-emerald transition-all cursor-pointer">
              <Linkedin className="w-4 h-4" />
            </a>
            <a href="mailto:pes.ceal@ieee.org" className="w-8 h-8 rounded bg-white/5 hover:bg-brand-emerald/20 border border-white/5 hover:border-brand-emerald/35 flex items-center justify-center text-gray-400 hover:text-brand-emerald transition-all cursor-pointer">
              <Mail className="w-4 h-4" />
            </a>
            <a href="https://pes.ieeekerala.org" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded bg-white/5 hover:bg-brand-emerald/20 border border-white/5 hover:border-brand-emerald/35 flex items-center justify-center text-gray-400 hover:text-brand-emerald transition-all cursor-pointer">
              <FileText className="w-4 h-4" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
