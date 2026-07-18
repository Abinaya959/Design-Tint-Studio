import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, useInView, useScroll, useSpring } from "framer-motion";
import emailjs from "@emailjs/browser";
import {
  Code2, Palette, Clapperboard, Megaphone, ArrowRight, Sparkles, Rocket,
  BadgeCheck, Zap, Timer, Sun, Moon, ArrowUp, Mail, Instagram, Linkedin,
  MapPin, ExternalLink, Quote, ChevronLeft, ChevronRight,
  Menu, X, Check, Star,
} from "lucide-react";
import heroImg from "@/assets/hero-illustration.png";
import santhiImg from "@/assets/project-santhi.png";
import fancyImg from "@/assets/project-fancy-corner.png";
import santhiDesktop from "@/assets/santhi-desktop.png";
import santhiMobile from "@/assets/santhi-mobile.png";
import logoAsset from "@/assets/design-tint-logo.png.asset.json";

const LOGO_URL = logoAsset.url;
const EMAILJS = {
  serviceId: "service_cf8nyl9",
  templateId: "template_3wj7wvo",
  publicKey: "HgBatByBKmFahpQoJ",
};

export const Route = createFileRoute("/")({
  component: LandingPage,
});

/* ---------- Theme ---------- */
function useTheme() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  useEffect(() => {
    const saved = (localStorage.getItem("dts-theme") as "light" | "dark") || "light";
    setTheme(saved);
  }, []);
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    localStorage.setItem("dts-theme", theme);
  }, [theme]);
  return { theme, toggle: () => setTheme((t) => (t === "dark" ? "light" : "dark")) };
}

/* ---------- Reveal ---------- */
function Reveal({ children, delay = 0, y = 24 }: { children: React.ReactNode; delay?: number; y?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ---------- Counter ---------- */
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const dur = 1600;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);
  return <span ref={ref}>{val}{suffix}</span>;
}

/* ---------- Floating background shapes ---------- */
function FloatingShapes() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-primary/20 blur-3xl animate-float-slow" />
      <div className="absolute right-[-6rem] top-40 h-80 w-80 rounded-full bg-accent/25 blur-3xl animate-float-slow" style={{ animationDelay: "-4s" }} />
      <div className="absolute left-1/3 bottom-0 h-64 w-64 rounded-full bg-primary/15 blur-3xl animate-float-slow" style={{ animationDelay: "-8s" }} />
      <svg className="absolute left-8 top-1/3 h-10 w-10 text-primary/40 animate-float" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 6.6L21 11l-6.6 2.4L12 20l-2.4-6.6L3 11l6.6-2.4z"/></svg>
      <div className="absolute right-16 top-24 h-8 w-8 rounded-md rotate-12 border border-accent/60 animate-float" style={{ animationDelay: "-2s" }} />
      <div className="absolute right-1/4 bottom-24 h-6 w-6 rounded-full border-2 border-primary/40 animate-float" style={{ animationDelay: "-5s" }} />
    </div>
  );
}

/* ---------- Nav ---------- */
const NAV = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Pricing", href: "#pricing" },
  { label: "Projects", href: "#projects" },
  { label: "Process", href: "#process" },
  { label: "Team", href: "#team" },
  { label: "Contact", href: "#contact" },
];

function Navbar({ theme, toggle }: { theme: "light" | "dark"; toggle: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? "py-2" : "py-4"}`}>
      <div className={`mx-auto max-w-7xl px-4 sm:px-6 transition-all ${scrolled ? "" : ""}`}>
        <div className={`glass flex items-center justify-between px-4 sm:px-6 py-3 ${scrolled ? "shadow-[var(--shadow-soft)]" : ""}`}>
          <a href="#home" className="flex items-center gap-2 min-w-0">
            <img src={LOGO_URL} alt="Design Tint Studio" className="h-10 w-10 shrink-0 object-contain" />
            <span className="font-display text-lg font-bold tracking-tight truncate">
              Design<span className="gradient-text">Tint</span> Studio
            </span>
          </a>
          <nav className="hidden lg:flex items-center gap-1">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-foreground/5 transition">
                {n.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <button
              aria-label="Toggle theme"
              onClick={toggle}
              className="grid h-10 w-10 place-items-center rounded-full border border-border bg-background/60 hover:bg-foreground/5 transition"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <a href="#contact" className="hidden sm:inline-flex btn-glow items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold">
              Let's Talk <ArrowRight className="h-4 w-4" />
            </a>
            <button aria-label="Menu" className="lg:hidden grid h-10 w-10 place-items-center rounded-full border border-border" onClick={() => setOpen((v) => !v)}>
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
        {open && (
          <div className="lg:hidden glass mt-2 p-3 grid gap-1">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} onClick={() => setOpen(false)} className="rounded-xl px-4 py-2 text-sm font-medium hover:bg-foreground/5">
                {n.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}

/* ---------- Hero ---------- */
function Hero() {
  return (
    <section id="home" className="relative bg-hero pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden">
      <FloatingShapes />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium tracking-wide">
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              Creative Digital Agency
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-6 text-5xl sm:text-6xl md:text-7xl font-extrabold leading-[1.02]">
              Design That <span className="gradient-text">Builds</span> Your Brand.
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-xl text-base sm:text-lg text-muted-foreground leading-relaxed">
              We help businesses establish a powerful online presence through websites, branding, creative media, and digital marketing.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#projects" className="btn-glow inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold">
                View Our Work <ArrowRight className="h-4 w-4" />
              </a>
              <a href="#contact" className="glass inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold hover:-translate-y-0.5 transition">
                Get Free Consultation
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.4}>
            <div className="mt-10 grid grid-cols-3 gap-6 max-w-md">
              {[
                { k: "2+", v: "Years" },
                { k: "10+", v: "Projects" },
                { k: "100%", v: "Happy Clients" },
              ].map((s) => (
                <div key={s.v}>
                  <div className="text-2xl font-display font-bold gradient-text">{s.k}</div>
                  <div className="text-xs text-muted-foreground mt-1">{s.v}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
        <Reveal delay={0.2} y={40}>
          <div className="relative">
            <div className="absolute inset-0 -z-10 rounded-[3rem] bg-[image:var(--gradient-brand)] opacity-20 blur-3xl" />
            <div className="glass p-4 sm:p-6 rounded-[2rem]">
              <img src={heroImg} alt="Design Tint Studio creative work — laptop, phone and branding" className="w-full h-auto animate-float" width={1200} height={1024} />
            </div>
            <div className="absolute -bottom-6 -left-6 glass px-4 py-3 rounded-2xl flex items-center gap-2 shadow-[var(--shadow-soft)]">
              <Zap className="h-4 w-4 text-primary" />
              <span className="text-xs font-semibold">Fast Delivery</span>
            </div>
            <div className="absolute -top-6 -right-6 glass px-4 py-3 rounded-2xl flex items-center gap-2 shadow-[var(--shadow-soft)]">
              <Sparkles className="h-4 w-4 text-accent" />
              <span className="text-xs font-semibold">AI-Powered</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- About ---------- */
function About() {
  const stats = [
    { k: 2, s: "+", label: "Years Experience", icon: Timer },
    { k: 10, s: "+", label: "Projects Delivered", icon: Rocket },
    { k: 100, s: "%", label: "Client Satisfaction", icon: BadgeCheck },
    { k: 24, s: "/7", label: "Fast Delivery", icon: Zap },
  ];
  return (
    <section id="about" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 grid lg:grid-cols-2 gap-14 items-center">
        <Reveal>
          <div>
            <SectionKicker>About Us</SectionKicker>
            <h2 className="mt-3 text-4xl md:text-5xl font-bold">
              Where <span className="gradient-text">creativity</span> meets technology.
            </h2>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              Design Tint Studio is a creative digital agency focused on helping startups, entrepreneurs, and businesses grow online. We combine creativity with technology to build websites, strong brand identities, engaging content, and powerful digital experiences.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              From modern websites to AI-generated videos and complete branding solutions, we provide everything needed to build a memorable digital presence.
            </p>
          </div>
        </Reveal>
        <div className="grid grid-cols-2 gap-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <div className="glass p-6 rounded-2xl hover:-translate-y-1 transition group">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-[image:var(--gradient-brand)] text-white shadow-[var(--shadow-glow)]">
                  <s.icon className="h-5 w-5" />
                </div>
                <div className="mt-5 text-3xl md:text-4xl font-display font-bold">
                  <Counter to={s.k} suffix={s.s} />
                </div>
                <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function SectionKicker({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-primary">
      <span className="h-px w-8 bg-primary" />
      {children}
    </span>
  );
}

/* ---------- Services ---------- */
const SERVICES = [
  {
    icon: Code2,
    title: "Web Development",
    desc: "Modern, fast, responsive websites tailored to your goals.",
    items: [
      "Business Websites", "Portfolio Websites", "Landing Pages", "Personal Websites",
      "Startup Websites", "Custom Website Development", "Responsive Design", "SEO Friendly",
      "Fast Performance", "Mobile Optimized", "Domain & Hosting Guidance", "Maintenance Support",
    ],
  },
  {
    icon: Palette,
    title: "Graphic Design & Branding",
    desc: "Bold identities and print collateral that stand out.",
    items: [
      "Logo Design", "Brand Identity", "Visiting Cards", "Posters", "Banners", "Flyers",
      "Brochures", "Letterheads", "Business Profiles", "Social Media Designs", "Print Ready Files",
    ],
  },
  {
    icon: Clapperboard,
    title: "Video Editing & AI Videos",
    desc: "Cinematic edits and AI-powered motion for every platform.",
    items: [
      "Professional Video Editing", "AI Generated Videos", "Product Videos", "Promotional Videos",
      "Motion Graphics", "Instagram Reels", "YouTube Shorts", "Business Ads", "Cinematic Editing",
      "Thumbnail Design",
    ],
  },
  {
    icon: Megaphone,
    title: "Content Creation & Social Media Marketing",
    desc: "Strategy, posts, and copy that grow your audience.",
    items: [
      "Social Media Management", "Instagram Marketing", "Facebook Marketing", "Content Writing",
      "Caption Writing", "Post Design", "Creative Campaigns", "Branding Strategy",
      "Monthly Content Planning", "Engagement Growth",
    ],
  },
];

function Services() {
  const [openService, setOpenService] = useState<number | null>(null);
  return (
    <section id="services" className="relative py-24 md:py-32 bg-hero">
      <FloatingShapes />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto">
          <Reveal><SectionKicker>What we do</SectionKicker></Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-3 text-4xl md:text-5xl font-bold">Our <span className="gradient-text">Services</span></h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-4 text-muted-foreground">Four pillars, one goal — help your brand look and perform like the best.</p>
          </Reveal>
        </div>
        <div className="mt-14 grid md:grid-cols-2 gap-6">
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.08}>
              <div className="group relative glass p-8 rounded-3xl overflow-hidden hover:-translate-y-1 transition duration-500">
                <div className="absolute -top-24 -right-24 h-56 w-56 rounded-full bg-[image:var(--gradient-brand)] opacity-0 group-hover:opacity-30 blur-3xl transition duration-700" />
                <div className="flex items-start gap-4">
                  <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-[image:var(--gradient-brand)] text-white shadow-[var(--shadow-glow)]">
                    <s.icon className="h-6 w-6" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-xl md:text-2xl font-bold">{s.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
                  </div>
                </div>
                <ul className="mt-6 grid sm:grid-cols-2 gap-y-2 gap-x-4 text-sm">
                  {s.items.slice(0, 6).map((it) => (
                    <li key={it} className="flex items-center gap-2 text-muted-foreground">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" /> {it}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => setOpenService(i)}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all"
                >
                  Learn More
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </button>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
      <ServiceModal
        service={openService !== null ? SERVICES[openService] : null}
        onClose={() => setOpenService(null)}
      />
    </section>
  );
}

function ServiceModal({
  service,
  onClose,
}: {
  service: (typeof SERVICES)[number] | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!service) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [service, onClose]);
  if (!service) return null;
  const Icon = service.icon;
  return (
    <div className="fixed inset-0 z-[100] grid place-items-center p-4">
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        className="absolute inset-0 bg-background/70 backdrop-blur-md" onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 240, damping: 24 }}
        className="relative glass w-full max-w-2xl rounded-3xl p-8 md:p-10 shadow-[var(--shadow-glow)] max-h-[85vh] overflow-y-auto"
      >
        <button aria-label="Close" onClick={onClose}
          className="absolute top-4 right-4 grid h-9 w-9 place-items-center rounded-full border border-border hover:bg-foreground/5 transition">
          <X className="h-4 w-4" />
        </button>
        <div className="flex items-start gap-4">
          <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-[image:var(--gradient-brand)] text-white shadow-[var(--shadow-glow)]">
            <Icon className="h-6 w-6" />
          </div>
          <div className="min-w-0">
            <h3 className="text-2xl md:text-3xl font-bold">{service.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{service.desc}</p>
          </div>
        </div>
        <ul className="mt-8 grid sm:grid-cols-2 gap-3">
          {service.items.map((it) => (
            <li key={it} className="flex items-start gap-2 text-sm">
              <Check className="h-4 w-4 mt-0.5 text-primary shrink-0" />
              <span>{it}</span>
            </li>
          ))}
        </ul>
        <a
          href={GOOGLE_FORM_URL}
          target="_blank"
          rel="noreferrer"
          onClick={onClose}
          className="mt-8 btn-glow inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold"
        >
          Book Your Project <ExternalLink className="h-4 w-4" />
        </a>
      </motion.div>
    </div>
  );
}

/* ---------- Why Us ---------- */
function WhyUs() {
  const items = [
    { icon: Palette, title: "Creative Design", desc: "Distinctive visuals that reflect your brand's voice." },
    { icon: Code2, title: "Modern & Responsive", desc: "Fast, accessible sites that shine on every screen." },
    { icon: BadgeCheck, title: "Affordable Pricing", desc: "Premium quality without the enterprise price tag." },
    { icon: Timer, title: "On-Time Delivery", desc: "Clear timelines, reliable milestones, no surprises." },
  ];
  return (
    <section className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto">
          <Reveal><SectionKicker>Why choose us</SectionKicker></Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-3 text-4xl md:text-5xl font-bold">Built for brands that <span className="gradient-text">mean it</span>.</h2>
          </Reveal>
        </div>
        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((it, i) => (
            <Reveal key={it.title} delay={i * 0.06}>
              <div className="glass p-6 rounded-3xl h-full hover:-translate-y-1 transition">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[image:var(--gradient-brand)] text-white shadow-[var(--shadow-glow)]">
                  <it.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-lg font-bold">{it.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{it.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Projects ---------- */
function Projects() {
  return (
    <section id="projects" className="relative py-24 md:py-32 bg-hero">
      <FloatingShapes />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto">
          <Reveal><SectionKicker>Featured</SectionKicker></Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-3 text-4xl md:text-5xl font-bold">Featured <span className="gradient-text">Projects</span></h2>
          </Reveal>
        </div>
        <div className="mt-14 grid md:grid-cols-2 gap-6 max-w-5xl mx-auto [perspective:1200px]">
          <Reveal>
            <div className="glass rounded-3xl overflow-hidden group h-full flex flex-col transition-transform duration-500 will-change-transform hover:-translate-y-2 hover:[transform:perspective(1200px)_rotateX(2deg)_rotateY(-3deg)_translateY(-8px)]">
              <div className="relative bg-[image:var(--gradient-brand)]/10 p-6 pb-10 flex items-end justify-center gap-3 sm:gap-4 overflow-hidden">
                <div className="pointer-events-none absolute inset-x-8 bottom-3 h-6 rounded-[50%] bg-black/40 blur-2xl opacity-60" />
                {/* Laptop mockup — premium */}
                <div className="relative flex-1 max-w-[85%] animate-float">
                  <div className="relative rounded-t-2xl bg-gradient-to-b from-neutral-700 via-neutral-900 to-black p-[6px] sm:p-[7px] shadow-[0_25px_50px_-20px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.06)_inset]">
                    <div className="rounded-t-xl bg-black p-1 sm:p-1.5">
                      <div className="relative rounded-md overflow-hidden bg-white aspect-[16/10] ring-1 ring-white/10">
                        <img src={santhiDesktop} alt="Santhi Polyclinic website — desktop homepage" loading="lazy" className="w-full h-full object-cover object-top" />
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10" />
                      </div>
                    </div>
                    <div className="absolute top-[3px] left-1/2 -translate-x-1/2 h-[3px] w-10 rounded-full bg-neutral-700/80" />
                  </div>
                  {/* Base / hinge */}
                  <div className="relative mx-[-9%]">
                    <div className="h-[10px] bg-gradient-to-b from-neutral-300 via-neutral-400 to-neutral-600 dark:from-neutral-500 dark:via-neutral-700 dark:to-neutral-900 rounded-b-[14px] shadow-[0_10px_20px_-10px_rgba(0,0,0,0.6)]" />
                    <div className="mx-auto h-[3px] w-1/4 bg-neutral-800/60 rounded-b-full" />
                  </div>
                </div>
                {/* Phone mockup */}
                <div className="relative w-[24%] min-w-[74px] -mb-2 animate-float [animation-delay:1s]">
                  <div className="rounded-[1.25rem] bg-gradient-to-b from-neutral-800 to-black p-[3px] border border-white/10 shadow-[0_18px_35px_-12px_rgba(0,0,0,0.7)]">
                    <div className="relative rounded-[1rem] overflow-hidden bg-white aspect-[390/844]">
                      <img src={santhiMobile} alt="Santhi Polyclinic website — mobile view" loading="lazy" className="absolute inset-0 w-full h-full object-cover object-top" />
                      <div className="absolute top-1 left-1/2 -translate-x-1/2 h-[6px] w-[30%] rounded-full bg-black/90" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-8 flex flex-col flex-1">
                <div className="flex flex-wrap gap-2 mb-3">
                  <Tag>Healthcare</Tag>
                  <Tag>Web Design</Tag>
                  <Tag>Responsive</Tag>
                </div>
                <h3 className="text-2xl font-bold">Santhi Polyclinic Website</h3>
                <p className="mt-3 text-muted-foreground flex-1">
                  A professional healthcare website designed for Santhi Polyclinic with a clean UI, responsive design, patient-friendly experience, service pages, and appointment-focused layout.
                </p>
                <a href="https://santhi-polyclinic.netlify.app/" target="_blank" rel="noreferrer"
                  className="mt-6 btn-glow inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold self-start">
                  Live Website <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="glass rounded-3xl overflow-hidden group h-full flex flex-col transition-transform duration-500 will-change-transform hover:-translate-y-2 hover:[transform:perspective(1200px)_rotateX(2deg)_rotateY(3deg)_translateY(-8px)]">
              <div className="relative bg-[image:var(--gradient-brand)]/10 p-6 pb-8 flex justify-center overflow-hidden">
                <div className="pointer-events-none absolute inset-x-12 bottom-3 h-6 rounded-[50%] bg-black/40 blur-2xl opacity-60" />
                <div className="relative w-[62%] max-w-[240px] animate-float">
                  <div className="rounded-[1.75rem] bg-gradient-to-b from-neutral-800 to-black p-[4px] border border-white/10 shadow-[0_25px_50px_-15px_rgba(0,0,0,0.7)]">
                    <div className="relative rounded-[1.5rem] overflow-hidden bg-black aspect-[9/19]">
                      <img src={fancyImg} alt="Fancy Corner Instagram profile — social media marketing preview" loading="lazy" className="w-full h-full object-cover object-top" />
                      <div className="absolute top-1.5 left-1/2 -translate-x-1/2 h-[6px] w-[32%] rounded-full bg-black" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-8 flex flex-col flex-1">
                <div className="flex flex-wrap gap-2 mb-3">
                  <Tag>Social Media Marketing</Tag>
                  <Tag>Graphic Design</Tag>
                  <Tag>Content Creation</Tag>
                </div>
                <h3 className="text-2xl font-bold">Fancy Corner Instagram Marketing</h3>
                <p className="mt-3 text-muted-foreground flex-1">
                  Designed and managed Instagram promotional content for Fancy Corner — including product posters, reels, captions, branding, promotional campaigns, and engaging social media creatives to increase brand awareness and customer engagement.
                </p>
                <ul className="mt-4 grid sm:grid-cols-2 gap-y-1.5 gap-x-4 text-sm text-muted-foreground">
                  {["Instagram Post Designs","Promotional Posters","Product Branding","Reels & Short Videos","Caption Writing","Social Media Strategy"].map((f) => (
                    <li key={f} className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-primary" />{f}</li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
function Tag({ children }: { children: React.ReactNode }) {
  return <span className="inline-flex items-center rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-semibold">{children}</span>;
}

/* ---------- Process ---------- */
const STEPS = [
  { n: "01", title: "Discuss", desc: "We listen to your goals, audience, and vision." },
  { n: "02", title: "Plan", desc: "Strategy, sitemap, and creative direction." },
  { n: "03", title: "Design & Build", desc: "Craft the interface and ship the code." },
  { n: "04", title: "Test & Launch", desc: "Polish, QA, and a smooth go-live." },
  { n: "05", title: "Support", desc: "Care, updates, and long-term partnership." },
];
function Process() {
  return (
    <section id="process" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto">
          <Reveal><SectionKicker>How we work</SectionKicker></Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-3 text-4xl md:text-5xl font-bold">A process built for <span className="gradient-text">clarity</span>.</h2>
          </Reveal>
        </div>
        {/* Desktop */}
        <div className="hidden md:block mt-16 relative">
          <div className="absolute left-0 right-0 top-10 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
          <div className="grid grid-cols-5 gap-4">
            {STEPS.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.08}>
                <div className="flex flex-col items-center text-center">
                  <div className="relative grid h-20 w-20 place-items-center rounded-full glass shadow-[var(--shadow-glow)]">
                    <span className="font-display font-bold gradient-text text-lg">{s.n}</span>
                    <span className="absolute inset-0 rounded-full ring-1 ring-primary/30" />
                  </div>
                  <h3 className="mt-5 font-bold">{s.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground max-w-[180px]">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
        {/* Mobile */}
        <div className="md:hidden mt-12 relative pl-6">
          <div className="absolute left-3 top-2 bottom-2 w-px bg-primary/40" />
          <div className="grid gap-6">
            {STEPS.map((s) => (
              <Reveal key={s.n}>
                <div className="relative">
                  <span className="absolute -left-[1.4rem] top-1 h-4 w-4 rounded-full bg-[image:var(--gradient-brand)] shadow-[var(--shadow-glow)]" />
                  <div className="glass p-5 rounded-2xl">
                    <div className="text-xs font-bold gradient-text">{s.n}</div>
                    <h3 className="mt-1 font-bold">{s.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Team ---------- */
const TEAM = [
  { name: "Abinaya Sathiyaseelan", role: "Founder", field: "AI & Data Science", exp: "2+ Years Experience", initials: "AS",
    bio: "Passionate about building modern websites, creative branding solutions, AI-powered content, and helping businesses grow digitally." },
  { name: "Afrin U", role: "Co-Founder", field: "AI & Data Science", exp: "2+ Years Experience", initials: "AU",
    bio: "Focused on creative strategy, content creation, branding, and delivering innovative digital solutions with AI-driven approaches." },
];
function Team() {
  return (
    <section id="team" className="relative py-24 md:py-32 bg-hero">
      <FloatingShapes />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto">
          <Reveal><SectionKicker>Founders</SectionKicker></Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-3 text-4xl md:text-5xl font-bold">Meet Our <span className="gradient-text">Team</span></h2>
          </Reveal>
        </div>
        <div className="mt-14 grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {TEAM.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.1}>
              <div className="glass p-8 rounded-3xl hover:-translate-y-1 transition text-center">
                <div className="mx-auto relative h-28 w-28">
                  <div className="absolute inset-0 rounded-full bg-[image:var(--gradient-brand)] blur-2xl opacity-60" />
                  <div className="relative grid h-28 w-28 place-items-center rounded-full bg-[image:var(--gradient-brand)] text-white font-display font-bold text-3xl shadow-[var(--shadow-glow)] ring-4 ring-background">
                    {t.initials}
                  </div>
                </div>
                <h3 className="mt-5 text-xl font-bold">{t.name}</h3>
                <div className="mt-1 text-sm font-semibold text-primary">{t.role}</div>
                <div className="mt-1 text-xs text-muted-foreground">{t.field} · {t.exp}</div>
                <p className="mt-4 text-sm text-muted-foreground">{t.bio}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Testimonials ---------- */
const TESTIMONIALS = [
  {
    name: "Dr. V. Sathivel",
    role: "Founder, Santhi Polyclinic",
    text: "Design Tint Studio developed our clinic website exactly as we envisioned. The website is modern, responsive, professional, and easy for our patients to navigate. Their attention to detail and commitment throughout the project made the entire experience smooth and highly satisfactory.",
  },
  {
    name: "Kala",
    role: "Owner, Fancy Corner",
    text: "Working with Design Tint Studio has significantly improved our Instagram presence. Their creative posters, engaging content, and promotional strategies helped us present our products professionally and attract more customer attention. Their creativity and timely delivery exceeded our expectations.",
  },
];
function Testimonials() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % TESTIMONIALS.length), 6000);
    return () => clearInterval(t);
  }, []);
  const t = TESTIMONIALS[i];
  return (
    <section className="relative py-24 md:py-32">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="text-center">
          <Reveal><SectionKicker>Testimonials</SectionKicker></Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-3 text-4xl md:text-5xl font-bold">Words from <span className="gradient-text">our clients</span></h2>
          </Reveal>
        </div>
        <Reveal delay={0.2}>
          <div className="mt-12 glass rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
            <Quote className="absolute -top-4 -left-4 h-24 w-24 text-primary/10" />
            <motion.div
              key={`stars-${t.name}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="relative flex items-center justify-center gap-1 mb-4"
            >
              {Array.from({ length: 5 }).map((_, idx) => (
                <Star key={idx} className="h-5 w-5 fill-primary text-primary" />
              ))}
            </motion.div>
            <motion.p
              key={t.name}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative text-lg md:text-2xl font-medium leading-relaxed"
            >
              "{t.text}"
            </motion.p>
            <div className="mt-6">
              <div className="font-bold">{t.name}</div>
              <div className="text-sm text-muted-foreground">{t.role}</div>
            </div>
            <div className="mt-8 flex items-center justify-center gap-3">
              <button aria-label="Prev" onClick={() => setI((v) => (v - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)} className="grid h-10 w-10 place-items-center rounded-full border border-border hover:bg-foreground/5 transition">
                <ChevronLeft className="h-4 w-4" />
              </button>
              <div className="flex gap-2">
                {TESTIMONIALS.map((_, idx) => (
                  <button key={idx} aria-label={`Slide ${idx + 1}`} onClick={() => setI(idx)}
                    className={`h-2 rounded-full transition-all ${idx === i ? "w-8 bg-primary" : "w-2 bg-border"}`} />
                ))}
              </div>
              <button aria-label="Next" onClick={() => setI((v) => (v + 1) % TESTIMONIALS.length)} className="grid h-10 w-10 place-items-center rounded-full border border-border hover:bg-foreground/5 transition">
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- CTA ---------- */
function CTA() {
  return (
    <section className="relative py-24 md:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] p-10 md:p-16 text-center bg-[image:var(--gradient-brand)] text-white shadow-[var(--shadow-glow)]">
            <div className="absolute -top-20 -left-20 h-64 w-64 rounded-full bg-white/20 blur-3xl" />
            <div className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
            <h2 className="relative text-3xl md:text-5xl font-bold">Let's Build Something Amazing Together</h2>
            <p className="relative mt-4 max-w-2xl mx-auto text-white/90">
              Ready to grow your business online? Let's create a digital presence that stands out.
            </p>
            <div className="relative mt-8 flex flex-wrap gap-3 justify-center">
              <a href="#contact" className="inline-flex items-center gap-2 rounded-full bg-white text-[color:var(--primary)] px-6 py-3 text-sm font-semibold hover:-translate-y-0.5 transition">
                Start Your Project <Rocket className="h-4 w-4" />
              </a>
              <a href="#contact" className="inline-flex items-center gap-2 rounded-full border border-white/60 px-6 py-3 text-sm font-semibold hover:bg-white/10 transition">
                Contact Us
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Contact ---------- */
function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;
    setStatus("sending");
    try {
      await emailjs.sendForm(EMAILJS.serviceId, EMAILJS.templateId, formRef.current, { publicKey: EMAILJS.publicKey });
      setStatus("sent");
      formRef.current.reset();
    } catch (err) {
      console.error("EmailJS error", err);
      setStatus("error");
    }
  };
  return (
    <section id="contact" className="relative py-24 md:py-32 bg-hero">
      <FloatingShapes />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 grid lg:grid-cols-2 gap-10">
        <Reveal>
          <div>
            <SectionKicker>Get in touch</SectionKicker>
            <h2 className="mt-3 text-4xl md:text-5xl font-bold">Let's <span className="gradient-text">Connect</span></h2>
            <p className="mt-4 text-muted-foreground max-w-md">Tell us about your project. We usually respond within a day.</p>
            <div className="mt-8 grid gap-3">
              {[
                { icon: Mail, label: "contact.designtintstudio@gmail.com", href: "mailto:contact.designtintstudio@gmail.com" },
                { icon: Instagram, label: "@design_tint_studio", href: "https://instagram.com/design_tint_studio" },
                { icon: MapPin, label: "Tamil Nadu, India" },
              ].map((c) => (
                <a
                  key={c.label}
                  href={c.href || "#"}
                  target={c.href && c.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="glass flex items-center gap-3 rounded-2xl px-4 py-3 hover:-translate-y-0.5 transition"
                >
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-[image:var(--gradient-brand)] text-white">
                    <c.icon className="h-4 w-4" />
                  </div>
                  <span className="text-sm break-all">{c.label}</span>
                </a>
              ))}
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <form
            ref={formRef}
            onSubmit={onSubmit}
            className="glass p-6 md:p-8 rounded-3xl grid gap-4"
          >
            <Field label="Name"><input required name="from_name" className="input-el" placeholder="Your name" /></Field>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Email"><input required name="from_email" type="email" className="input-el" placeholder="you@brand.com" /></Field>
              <Field label="Phone Number"><input name="phone" className="input-el" placeholder="+91 ..." /></Field>
            </div>
            <Field label="Project Requirement">
              <select name="service" className="input-el">
                <option>Web Development</option>
                <option>Branding & Design</option>
                <option>Video / AI Video</option>
                <option>Social Media</option>
                <option>Other</option>
              </select>
            </Field>
            <Field label="Message"><textarea rows={4} name="message" required className="input-el resize-none" placeholder="Tell us about your project..." /></Field>
            <button type="submit" disabled={status === "sending"} className="btn-glow inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold disabled:opacity-70">
              {status === "sending" && "Sending..."}
              {status === "sent" && "Message Sent ✓"}
              {status === "error" && "Try Again — Send Failed"}
              {status === "idle" && (<>Send Message <ArrowRight className="h-4 w-4" /></>)}
            </button>
            {status === "sent" && <p className="text-xs text-primary text-center">Thanks! We'll reply within 24 hours.</p>}
            {status === "error" && <p className="text-xs text-destructive text-center">Something went wrong. Please email us directly.</p>}
          </form>
        </Reveal>
      </div>
      <style>{`
        .input-el {
          width: 100%;
          background: var(--glass-bg);
          border: 1px solid var(--color-border);
          border-radius: 0.9rem;
          padding: 0.75rem 1rem;
          font-size: 0.9rem;
          color: var(--color-foreground);
          outline: none;
          transition: border-color .2s, box-shadow .2s;
        }
        .input-el:focus { border-color: var(--color-primary); box-shadow: 0 0 0 4px oklch(from var(--color-primary) l c h / 0.15); }
      `}</style>
    </section>
  );
}
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="grid gap-1.5">
      <span className="text-xs font-semibold tracking-wide uppercase text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}

/* ---------- Pricing ---------- */
const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLScppLGerdaw_FM5U2cyYB36r27HU5pwP6WznAG_Q2s6xtEI7A/viewform?usp=header";

const PRICING = [
  { emoji: "💻", icon: Code2, title: "Web Development", price: "₹1,500 – ₹5,000", popular: true,
    features: ["Landing Pages", "Portfolio Websites", "Business Websites", "Responsive Design", "Basic SEO", "Fast Delivery"] },
  { emoji: "🎨", icon: Palette, title: "Graphic Design & Branding", price: "₹500 – ₹2,000",
    features: ["Logo Design", "Visiting Cards", "Posters", "Flyers", "Brochures", "Letterheads"] },
  { emoji: "🎬", icon: Clapperboard, title: "Video Editing & AI Videos", price: "₹500 – ₹3,000",
    features: ["AI Videos", "Reels", "Shorts", "Motion Graphics", "Video Editing"] },
  { emoji: "📱", icon: Megaphone, title: "Content & Social Media", price: "₹1,000 – ₹3,500",
    features: ["Social Media Promotion", "Content Writing", "Caption Writing", "Post Design", "Content Creation"] },
];

function Pricing() {
  const [openPlan, setOpenPlan] = useState<string | null>(null);
  return (
    <section id="pricing" className="relative py-24 md:py-32">
      <FloatingShapes />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto">
          <Reveal><SectionKicker>Pricing</SectionKicker></Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-3 text-4xl md:text-5xl font-bold">Simple, <span className="gradient-text">transparent</span> pricing</h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-4 text-muted-foreground">Premium quality, honest starting prices. Pick the plan that fits your goals.</p>
          </Reveal>
        </div>
        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRICING.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08}>
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="group relative h-full"
              >
                {p.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 inline-flex items-center gap-1 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-[var(--shadow-glow)] bg-[image:var(--gradient-brand)]">
                    <Star className="h-3 w-3 fill-white" /> Most Popular
                  </div>
                )}
                <div className="absolute -inset-px rounded-3xl bg-[image:var(--gradient-brand)] opacity-0 group-hover:opacity-70 blur-md transition duration-500" />
                <div className="relative glass h-full rounded-3xl p-7 flex flex-col overflow-hidden ring-1 ring-transparent group-hover:ring-primary/40 transition">
                  <div className="absolute -top-24 -right-24 h-52 w-52 rounded-full bg-[image:var(--gradient-brand)] opacity-0 group-hover:opacity-30 blur-3xl transition duration-700" />
                  <div className="flex items-center gap-3">
                    <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[image:var(--gradient-brand)] text-white shadow-[var(--shadow-glow)]">
                      <p.icon className="h-5 w-5" />
                    </div>
                    <span className="text-2xl" aria-hidden>{p.emoji}</span>
                  </div>
                  <h3 className="mt-5 text-lg font-bold">{p.title}</h3>
                  <div className="mt-4">
                    <div className="text-[10px] font-semibold tracking-widest uppercase text-muted-foreground">Starting Price</div>
                    <div className="mt-1 text-2xl font-display font-extrabold gradient-text">{p.price}</div>
                  </div>
                  <ul className="mt-5 grid gap-2 text-sm text-muted-foreground flex-1">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-2">
                        <Check className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => setOpenPlan(p.title)}
                    className="mt-6 btn-glow inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold"
                  >
                    Choose Plan <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
      <InquiryModal open={!!openPlan} plan={openPlan} onClose={() => setOpenPlan(null)} />
    </section>
  );
}

function InquiryModal({ open, plan, onClose }: { open: boolean; plan: string | null; onClose: () => void }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[100] grid place-items-center p-4">
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        className="absolute inset-0 bg-background/70 backdrop-blur-md" onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 24 }}
        className="relative glass w-full max-w-md rounded-3xl p-8 text-center shadow-[var(--shadow-glow)]"
      >
        <button aria-label="Close" onClick={onClose}
          className="absolute top-4 right-4 grid h-9 w-9 place-items-center rounded-full border border-border hover:bg-foreground/5 transition">
          <X className="h-4 w-4" />
        </button>
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-[image:var(--gradient-brand)] text-white shadow-[var(--shadow-glow)]">
          <Sparkles className="h-6 w-6" />
        </div>
        <h3 className="mt-5 text-2xl font-bold">Project Inquiry</h3>
        {plan && <div className="mt-2 text-sm text-muted-foreground">Selected plan: <span className="font-semibold text-foreground">{plan}</span></div>}
        <p className="mt-4 text-sm text-muted-foreground">Share your project details and we'll get back to you within 24 hours.</p>
        <a
          href={GOOGLE_FORM_URL}
          target="_blank"
          rel="noreferrer"
          onClick={onClose}
          className="mt-6 btn-glow inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold"
        >
          Open Project Inquiry Form <ExternalLink className="h-4 w-4" />
        </a>
        <div className="mt-3 text-[11px] text-muted-foreground">Opens Google Form in a new tab</div>
      </motion.div>
    </div>
  );
}

/* ---------- Footer ---------- */
function Footer() {
  return (
    <footer className="relative border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-14 grid md:grid-cols-3 gap-10">
        <div>
          <div className="flex items-center gap-2">
            <img src={LOGO_URL} alt="Design Tint Studio" className="h-10 w-10 object-contain" />
            <span className="font-display text-lg font-bold">Design<span className="gradient-text">Tint</span> Studio</span>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">Design • Develop • Grow</p>
        </div>
        <div>
          <h4 className="font-bold">Quick Links</h4>
          <ul className="mt-4 grid gap-2 text-sm text-muted-foreground">
            <li><a href="#services" className="hover:text-foreground">Services</a></li>
            <li><a href="#projects" className="hover:text-foreground">Projects</a></li>
            <li><a href="#about" className="hover:text-foreground">About</a></li>
            <li><a href="#contact" className="hover:text-foreground">Contact</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold">Follow</h4>
          <div className="mt-4 flex gap-2">
            {[Instagram, Linkedin, Mail].map((I, idx) => (
              <a key={idx} href="#contact" className="grid h-10 w-10 place-items-center rounded-full glass hover:-translate-y-0.5 transition" aria-label="social">
                <I className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-border py-6 text-center text-xs text-muted-foreground">
        © 2026 Design Tint Studio. All Rights Reserved.
      </div>
    </footer>
  );
}

/* ---------- Scroll Progress + Back to Top ---------- */
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const w = useSpring(scrollYProgress, { stiffness: 120, damping: 20, mass: 0.2 });
  return (
    <motion.div style={{ scaleX: w, transformOrigin: "0% 50%" }}
      className="fixed top-0 left-0 right-0 h-[3px] bg-[image:var(--gradient-brand)] z-[60]" />
  );
}
function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 500);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!show) return null;
  return (
    <button aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 right-6 z-50 grid h-12 w-12 place-items-center rounded-full btn-glow">
      <ArrowUp className="h-5 w-5" />
    </button>
  );
}

/* ---------- Page ---------- */
function LandingPage() {
  const { theme, toggle } = useTheme();
  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <ScrollProgress />
      <Navbar theme={theme} toggle={toggle} />
      <main>
        <Hero />
        <About />
        <Services />
        <WhyUs />
        <Pricing />
        <Projects />
        <Process />
        <Team />
        <Testimonials />
        <CTA />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
