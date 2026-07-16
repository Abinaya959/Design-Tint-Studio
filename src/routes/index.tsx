import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, useInView, useScroll, useSpring } from "framer-motion";
import {
  Code2, Palette, Clapperboard, Megaphone, ArrowRight, Sparkles, Rocket,
  BadgeCheck, Zap, Timer, Sun, Moon, ArrowUp, Mail, Instagram, Linkedin,
  MessageCircle, MapPin, ExternalLink, Quote, ChevronLeft, ChevronRight,
  Menu, X,
} from "lucide-react";
import heroImg from "@/assets/hero-illustration.png";
import santhiImg from "@/assets/project-santhi.png";

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
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[image:var(--gradient-brand)] text-white shadow-[var(--shadow-glow)]">
              <Sparkles className="h-5 w-5" />
            </span>
            <span className="font-display text-lg font-bold tracking-tight truncate">
              Design<span className="gradient-text">Tint</span>
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
                { k: "50+", v: "Projects" },
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
    { k: 50, s: "+", label: "Projects Delivered", icon: Rocket },
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
    items: ["Business Websites", "Portfolio Websites", "Landing Pages", "Custom Development"],
  },
  {
    icon: Palette,
    title: "Graphic Design & Branding",
    desc: "Bold identities and print collateral that stand out.",
    items: ["Logo Design", "Visiting Cards", "Posters & Banners", "Brochures & Flyers", "Letterheads", "Business Profiles"],
  },
  {
    icon: Clapperboard,
    title: "Video Editing & AI Videos",
    desc: "Cinematic edits and AI-powered motion for every platform.",
    items: ["Video Editing", "AI Videos", "Motion Graphics", "Instagram Reels", "YouTube Shorts"],
  },
  {
    icon: Megaphone,
    title: "Content & Social Media",
    desc: "Strategy, posts, and copy that grow your audience.",
    items: ["Social Media Promotion", "Post Design", "Content Writing", "Caption Writing", "Content Creation"],
  },
];

function Services() {
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
                  {s.items.map((it) => (
                    <li key={it} className="flex items-center gap-2 text-muted-foreground">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" /> {it}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                  Learn more
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
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
        <div className="mt-14 grid lg:grid-cols-3 gap-6">
          <Reveal>
            <div className="lg:col-span-2 glass rounded-3xl overflow-hidden group hover:-translate-y-1 transition">
              <div className="relative bg-[image:var(--gradient-brand)]/10 p-8">
                <img src={santhiImg} alt="Santhi Polyclinic website preview" loading="lazy" width={1200} height={900} className="w-full h-auto animate-float" />
              </div>
              <div className="p-8">
                <div className="flex flex-wrap gap-2 mb-3">
                  <Tag>Healthcare</Tag>
                  <Tag>Web Design</Tag>
                  <Tag>Responsive</Tag>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold">Santhi Polyclinic Website</h3>
                <p className="mt-3 text-muted-foreground max-w-2xl">
                  A professional healthcare website designed for Santhi Polyclinic with a clean interface, responsive design, service pages, and patient-friendly experience.
                </p>
                <a href="https://santhi-polyclinic.netlify.app/" target="_blank" rel="noreferrer"
                  className="mt-6 btn-glow inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold">
                  Live Website <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
          </Reveal>
          <div className="grid gap-6">
            {[1, 2].map((n, i) => (
              <Reveal key={n} delay={0.1 * i}>
                <div className="glass rounded-3xl p-8 h-full flex flex-col justify-between min-h-[240px] relative overflow-hidden">
                  <div className="absolute inset-0 -z-10 opacity-40 bg-[image:var(--gradient-brand)] blur-3xl" />
                  <div>
                    <Tag>Coming Soon</Tag>
                    <h3 className="mt-4 text-xl font-bold">Project Slot #{n}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">A new case study is on the way. Your brand could be featured here next.</p>
                  </div>
                  <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                    Reserve this slot <ArrowRight className="h-4 w-4" />
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
  { name: "Ravi Kumar", role: "Founder, Santhi Polyclinic", text: "Design Tint Studio built us a beautiful, patient-friendly website in record time. Communication was seamless and the result exceeded expectations." },
  { name: "Priya Menon", role: "Marketing Lead, Startup", text: "Their branding work gave us a fresh identity that our customers instantly connected with. Truly premium creative team." },
  { name: "Arjun R.", role: "Content Creator", text: "The AI video edits and reels boosted our engagement massively. Fast turnaround and stunning quality every single time." },
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
  const [sent, setSent] = useState(false);
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
                { icon: Mail, label: "hello@designtintstudio.com" },
                { icon: Instagram, label: "@designtintstudio" },
                { icon: Linkedin, label: "Design Tint Studio" },
                { icon: MessageCircle, label: "+91 00000 00000 (WhatsApp)" },
                { icon: MapPin, label: "Tamil Nadu, India" },
              ].map((c) => (
                <div key={c.label} className="glass flex items-center gap-3 rounded-2xl px-4 py-3">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-[image:var(--gradient-brand)] text-white">
                    <c.icon className="h-4 w-4" />
                  </div>
                  <span className="text-sm">{c.label}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <form
            onSubmit={(e) => { e.preventDefault(); setSent(true); }}
            className="glass p-6 md:p-8 rounded-3xl grid gap-4"
          >
            <Field label="Name"><input required className="input-el" placeholder="Your name" /></Field>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Email"><input required type="email" className="input-el" placeholder="you@brand.com" /></Field>
              <Field label="Phone Number"><input className="input-el" placeholder="+91 ..." /></Field>
            </div>
            <Field label="Project Requirement">
              <select className="input-el">
                <option>Web Development</option>
                <option>Branding & Design</option>
                <option>Video / AI Video</option>
                <option>Social Media</option>
                <option>Other</option>
              </select>
            </Field>
            <Field label="Message"><textarea rows={4} className="input-el resize-none" placeholder="Tell us about your project..." /></Field>
            <button type="submit" className="btn-glow inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold">
              {sent ? "Message Sent ✓" : (<>Send Message <ArrowRight className="h-4 w-4" /></>)}
            </button>
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

/* ---------- Footer ---------- */
function Footer() {
  return (
    <footer className="relative border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-14 grid md:grid-cols-3 gap-10">
        <div>
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-[image:var(--gradient-brand)] text-white">
              <Sparkles className="h-5 w-5" />
            </span>
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
            {[Instagram, Linkedin, Mail, MessageCircle].map((I, idx) => (
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
