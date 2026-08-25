import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Play, X, Youtube, Instagram, ImageIcon } from "lucide-react";

/* ---------- Social links ----------
   Instagram is taken from the existing site links.
   TODO: replace the placeholder below with the real Design Tint Studio channel URL. */
export const INSTAGRAM_URL = "https://instagram.com/design_tint_studio";
export const YOUTUBE_CHANNEL_URL = "YOUR_YOUTUBE_CHANNEL_URL"; // placeholder

export type VideoProject = {
  title: string;
  category: string;
  description: string;
  thumbnail: string;
  youtubeUrl: string;
  youtubeId: string;
};

/* Add a new video by appending one object here. */
export const videoProjects: VideoProject[] = [
  {
    title: "Independence Day 2026 🇮🇳",
    category: "Festival AI Film",
    description:
      "A cinematic AI-powered Independence Day special created to celebrate India's spirit, freedom and pride.",
    youtubeId: "RaXQEAcz4fw",
    youtubeUrl: "https://youtube.com/shorts/RaXQEAcz4fw?si=6jiOBAJqtfIUDLyh",
    thumbnail: "https://i.ytimg.com/vi/RaXQEAcz4fw/hqdefault.jpg",
  },
  {
    title: "What If Burj Khalifa Became a Café? ☕",
    category: "AI What-If Concept",
    description: "An imaginative AI concept transforming the iconic Burj Khalifa into a futuristic café.",
    youtubeId: "1rdJWLxNFoA",
    youtubeUrl: "https://youtube.com/shorts/1rdJWLxNFoA?si=ETTUOU4Jlf-9petQ",
    thumbnail: "https://i.ytimg.com/vi/1rdJWLxNFoA/hqdefault.jpg",
  },
  {
    title: "Raja Raja Cholan Meets AI 👑",
    category: "AI History Concept",
    description:
      "What if the legendary Raja Raja Cholan entered the modern AI era? A creative blend of Tamil history and futuristic imagination.",
    youtubeId: "OlWP_a66RW0",
    youtubeUrl: "https://youtube.com/shorts/OlWP_a66RW0?feature=shared",
    thumbnail: "https://i.ytimg.com/vi/OlWP_a66RW0/hqdefault.jpg",
  },
  {
    title: "Kindness ❤️",
    category: "AI Short Story",
    description:
      "A short emotional AI-created story about kindness, humanity and the impact of a small good deed.",
    youtubeId: "elfY5ce7Ors",
    youtubeUrl: "https://youtu.be/elfY5ce7Ors?si=6HXvec9sTJu1oehc",
    thumbnail: "https://i.ytimg.com/vi/elfY5ce7Ors/hqdefault.jpg",
  },
  {
    title: "Moon & Star 🌙⭐",
    category: "AI Story",
    description: "A magical AI visual story inspired by the moon, stars, imagination and wonder.",
    youtubeId: "QKCBzI-X4iY",
    youtubeUrl: "https://youtube.com/shorts/QKCBzI-X4iY?si=aflewqKp233UeZr1",
    thumbnail: "https://i.ytimg.com/vi/QKCBzI-X4iY/hqdefault.jpg",
  },
];

export const YOUTUBE_CHANNEL = "https://www.youtube.com/channel/UCA32SqrQkk7I4TGNxz-nxXg";

/* ---------- YouTube URL -> embed URL ---------- */
export function toYouTubeEmbedUrl(url: string): string | null {
  try {
    const u = new URL(url);
    if (!/(^|\.)youtube\.com$|(^|\.)youtu\.be$/.test(u.hostname)) return null;
    let id = "";
    if (u.hostname.endsWith("youtu.be")) id = u.pathname.slice(1);
    else if (u.pathname.startsWith("/shorts/")) id = u.pathname.split("/")[2] ?? "";
    else if (u.pathname.startsWith("/embed/")) id = u.pathname.split("/")[2] ?? "";
    else id = u.searchParams.get("v") ?? "";
    if (!id) return null;
    return `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`;
  } catch {
    return null;
  }
}

/* ---------- Local reveal (matches site pattern) ---------- */
function Reveal({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
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

/* ---------- VideoCard ---------- */
export function VideoCard({ video, onPlay }: { video: VideoProject; onPlay: () => void }) {
  const [broken, setBroken] = useState(false);
  return (
    <article className="glass group h-full flex flex-col rounded-3xl overflow-hidden transition-all duration-500 motion-safe:hover:-translate-y-2 hover:shadow-[0_28px_60px_-24px_hsl(var(--primary)/0.4)]">
      <button
        type="button"
        onClick={onPlay}
        aria-label={`Play video: ${video.title}`}
        className="relative block w-full aspect-video overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        {broken ? (
          <div className="absolute inset-0 grid place-items-center bg-[image:var(--gradient-brand)]/10">
            <ImageIcon className="h-8 w-8 text-primary/50" aria-hidden="true" />
          </div>
        ) : (
          <img
            src={video.thumbnail}
            alt={`${video.title} — ${video.category} video thumbnail by Design Tint Studio`}
            loading="lazy"
            decoding="async"
            onError={() => setBroken(true)}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 motion-safe:group-hover:scale-105"
          />
        )}
        <span className="absolute inset-0 bg-[#0F172A]/20 group-hover:bg-[#0F172A]/45 transition-colors duration-500" />
        <span className="absolute inset-0 grid place-items-center">
          <span className="grid h-14 w-14 place-items-center rounded-full bg-white/95 text-primary shadow-[0_10px_30px_-8px_hsl(var(--primary)/0.6)] ring-1 ring-primary/30 transition-all duration-500 motion-safe:group-hover:scale-110 group-hover:shadow-[0_0_0_10px_hsl(var(--primary)/0.15),0_10px_30px_-6px_hsl(var(--primary)/0.7)]">
            <Play className="h-5 w-5 translate-x-[1px] fill-current" aria-hidden="true" />
          </span>
        </span>
      </button>

      <div className="flex flex-1 flex-col p-6">
        <span className="self-start rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-primary">
          {video.category}
        </span>
        <h3 className="mt-4 text-lg font-bold">{video.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{video.description}</p>
        <button
          type="button"
          onClick={onPlay}
          aria-label={`Watch video: ${video.title}`}
          className="mt-6 inline-flex items-center justify-center gap-2 rounded-full btn-glow px-5 py-2.5 text-sm font-semibold"
        >
          <Play className="h-4 w-4 fill-current" aria-hidden="true" />
          Watch Video
        </button>
      </div>
    </article>
  );
}

/* ---------- VideoModal ---------- */
export function VideoModal({ video, onClose }: { video: VideoProject | null; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!video) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [video, onClose]);

  if (!video) return null;
  const embed = video.youtubeId
    ? `https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&rel=0`
    : toYouTubeEmbedUrl(video.youtubeUrl);

  return (
    <div className="fixed inset-0 z-[100] grid place-items-center p-4" role="dialog" aria-modal="true" aria-label={video.title}>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        className="absolute inset-0 bg-[#0F172A]/85 backdrop-blur-md" onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 240, damping: 24 }}
        className="relative w-full max-w-4xl"
      >
        <button
          ref={closeRef}
          aria-label="Close video"
          onClick={onClose}
          className="absolute -top-12 right-0 grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white ring-1 ring-white/25 hover:bg-white/20 transition"
        >
          <X className="h-5 w-5" />
        </button>
        <div className="overflow-hidden rounded-3xl bg-black shadow-[0_40px_100px_-30px_hsl(var(--primary)/0.6)] ring-1 ring-white/10">
          <div className="relative aspect-video">
            {embed ? (
              <iframe
                src={embed}
                title={video.title}
                className="absolute inset-0 h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            ) : (
              <div className="absolute inset-0 grid place-items-center p-6 text-center text-sm text-white/70">
                This video will be available soon.
              </div>
            )}
          </div>
        </div>
        <p className="mt-4 text-center text-sm text-white/80">{video.title}</p>
      </motion.div>
    </div>
  );
}

/* ---------- VideoShowcase ---------- */
export function VideoShowcase() {
  const [active, setActive] = useState<VideoProject | null>(null);
  const hasYouTube = YOUTUBE_CHANNEL_URL.startsWith("http");

  return (
    <section id="videos" className="relative py-24 md:py-32 bg-hero">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,hsl(var(--primary)/0.08),transparent_60%)]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal><SectionKicker>Creative Works</SectionKicker></Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-3 text-4xl md:text-5xl font-bold">
              Ideas That <span className="gradient-text">Come Alive.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-4 text-muted-foreground">
              Explore our AI-powered videos, creative concepts, festival specials and visual stories created by Design Tint Studio.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {videoProjects.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.07} className="h-full">
              <VideoCard video={v} onPlay={() => setActive(v)} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-16 glass rounded-3xl p-8 md:p-10 text-center">
            <h3 className="text-2xl md:text-3xl font-bold">More Videos Coming Soon.</h3>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground">
              Explore more creative AI videos, cinematic concepts, festival specials and visual stories from Design Tint Studio.
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <a
                href={YOUTUBE_CHANNEL}
                target="_blank" rel="noopener noreferrer"
                aria-label="More videos on the Design Tint Studio YouTube channel"
                className="inline-flex items-center gap-2 rounded-full btn-glow px-6 py-3 text-sm font-semibold"
              >
                <Youtube className="h-4 w-4" /> More Videos
              </a>
            </div>
          </div>
        </Reveal>
      </div>

      <VideoModal video={active} onClose={() => setActive(null)} />
    </section>
  );
}

export default VideoShowcase;
