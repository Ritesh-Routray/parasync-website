"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

/* ─── Image slot ─────────────────────────────────────────────────
   Drop files into web/public/images/ (see README.md there). Until a
   file exists, a tidy labelled placeholder is shown instead of a broken image. */
function ImageSlot({ src, alt, className = "", priority = false }: {
  src: string; alt: string; className?: string; priority?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  // A 404 can fire before hydration, so onError is missed — re-check once mounted.
  useEffect(() => {
    const el = imgRef.current;
    if (el && el.complete && el.naturalWidth === 0) setFailed(true);
  }, []);
  return (
    <div className={`relative overflow-hidden rounded-3xl border border-white/12 bg-[#111] ${className}`}>
      {!failed && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          ref={imgRef} src={src} alt={alt}
          loading={priority ? "eager" : "lazy"}
          onError={() => setFailed(true)}
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}
      {failed ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-center p-6 bg-gradient-to-br from-[#3b82f6]/15 via-[#111] to-[#111]">
          <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/60 text-xl">▣</div>
          <p className="text-sm text-white/70 font-medium">{alt}</p>
          <p className="text-xs text-white/40 font-mono">{src}</p>
        </div>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/60 via-transparent to-transparent pointer-events-none" />
      )}
    </div>
  );
}

/* ─── Navbar ─────────────────────────────────────────────────── */
function Navbar() {
  const [open, setOpen] = useState(false);
  const links = ["Features", "How It Works", "Roles", "About"];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#080808]/90 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">

        {/* Logo — Para (white) Sync (blue) */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-7 h-7 rounded-md bg-white flex items-center justify-center">
            <span className="text-black font-black text-xs leading-none">PS</span>
          </div>
          <span className="text-lg font-black tracking-tight">
            <span className="text-white">Para</span>
            <span className="text-[#3b82f6]">Sync</span>
            <span className="text-white/55 font-light">.</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <a key={l} href={`#${l.toLowerCase().replace(/ /g, "-")}`}
              className="text-sm text-white/75 hover:text-white transition-colors font-medium tracking-wide">
              {l}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="flex items-center gap-3">
          <Link href="/login" className="hidden sm:block text-sm text-white/75 hover:text-white transition-colors font-medium">
            Sign In
          </Link>
          <Link href="/signup"
            className="text-sm font-semibold bg-white text-black px-5 py-2 rounded-full hover:bg-white/90 transition-all">
            Start Now →
          </Link>
          <button className="md:hidden text-white/85 hover:text-white" onClick={() => setOpen(o => !o)}>
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-[#080808] border-t border-white/5 px-6 py-5 flex flex-col gap-4">
          {links.map(l => (
            <a key={l} href={`#${l.toLowerCase().replace(/ /g, "-")}`}
              onClick={() => setOpen(false)}
              className="text-sm text-white/85 hover:text-white transition-colors font-medium py-1 border-b border-white/5">
              {l}
            </a>
          ))}
          <Link href="/signup" className="mt-1 text-center text-sm font-semibold bg-white text-black py-3 rounded-full">
            Start Now →
          </Link>
        </div>
      )}
    </header>
  );
}

/* ─── Hero ───────────────────────────────────────────────────── */
function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center pt-16 px-6 md:px-10 bg-[#080808] relative overflow-hidden">

      {/* Faint grid */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)", backgroundSize: "72px 72px" }} />

      {/* Glow blob */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#3b82f6]/8 blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative py-10">
       <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-12 items-center mb-16">
        <div>
        {/* Large headline */}
        <h1 className="text-[clamp(2.4rem,5vw,4.6rem)] font-black leading-[1] tracking-tighter text-white mb-8">
          The AI platform<br />
          for <span className="text-[#3b82f6]">para-athletes.</span>
        </h1>

        <div className="flex flex-col items-start gap-8">
          <p className="text-white/80 text-lg sm:text-xl max-w-lg leading-relaxed">
            Biomechanics analysis, health monitoring, coaching sessions, and scout discovery — all in one place.
          </p>
          <div className="flex items-center gap-3 shrink-0">
            <Link href="/signup"
              className="px-7 py-3.5 bg-white text-black font-bold text-sm rounded-full hover:bg-white/90 transition-all">
              Get Started →
            </Link>
            <a href="#how-it-works"
              className="px-7 py-3.5 border border-white/15 text-white font-medium text-sm rounded-full hover:border-white/35 transition-all">
              Learn More
            </a>
          </div>
        </div>
        </div>
        <ImageSlot src="/images/hero.svg" alt="Para-athlete training with AI pose tracking" priority
          className="aspect-[4/5] sm:aspect-[5/4] lg:aspect-[4/5]" />
       </div>

        {/* Stat row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/5 border border-white/5 rounded-2xl overflow-hidden">
          {[
            { n: "14+", l: "Biomechanical Metrics" },
            { n: "4",   l: "Roles Supported" },
            { n: "6",   l: "Para Sports" },
            { n: "IPC", l: "Classification Aware" },
          ].map(s => (
            <div key={s.n} className="bg-[#080808] px-8 py-6">
              <div className="text-3xl font-black text-white mb-1">{s.n}</div>
              <div className="text-xs text-white/60 font-medium tracking-wide uppercase">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Big Feature Blocks ─────────────────────────────────────── */
function FeatureBlock({
  tag, title, accent, desc, bullets, image, imageAlt, align = "left", bg = "#0c0c0c",
}: {
  image: string; imageAlt: string;
  tag: string; title: string; accent: string; desc: string;
  bullets: string[]; align?: "left" | "right"; bg?: string;
}) {
  const content = (
    <div className={`flex flex-col justify-center ${align === "right" ? "lg:items-end lg:text-right" : ""}`}>
      <div className="inline-flex items-center gap-2 mb-5">
        <span className="text-xs font-bold tracking-widest uppercase text-[#60a5fa] border border-[#3b82f6]/30 bg-[#3b82f6]/10 px-3 py-1 rounded-full">{tag}</span>
      </div>
      <h2 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-5">
        {title.split("{{accent}}")[0]}
        <span className="text-[#3b82f6]">{accent}</span>
        {title.split("{{accent}}")[1]}
      </h2>
      <p className="text-white/75 text-base sm:text-lg leading-relaxed max-w-lg mb-7">{desc}</p>
      <ul className={`space-y-3 ${align === "right" ? "lg:items-end" : ""}`}>
        {bullets.map(b => (
          <li key={b} className="flex items-start gap-3 text-sm text-white/85">
            <span className="w-5 h-5 rounded-full border border-white/15 flex items-center justify-center shrink-0 mt-0.5 text-[10px] text-[#3b82f6]">✓</span>
            {b}
          </li>
        ))}
      </ul>
    </div>
  );

  const visual = <ImageSlot src={image} alt={imageAlt} className="aspect-[4/3]" />;

  return (
    <section style={{ backgroundColor: bg }} className="py-24 px-6 md:px-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {align === "left" ? <>{content}{visual}</> : <>{visual}{content}</>}
      </div>
    </section>
  );
}

/* ─── Features section ───────────────────────────────────────── */
function Features() {
  return (
    <>
      <FeatureBlock
        tag="🎥 AI Analysis"
        image="/images/feature-analysis.svg"
        imageAlt="AI skeleton tracking on a wheelchair athlete"
        title="Upload a video.{{accent}} Get biomechanics."
        accent=""
        desc="ParaSync analyses any training video using Google Gemini and MediaPipe pose estimation. Get 14+ metrics across Propulsion, Agility, and Fatigue — all benchmarked to your IPC classification, not generic averages."
        bullets={[
          "Works on any smartphone video, no special equipment",
          "Results in minutes — not days",
          "Pillar breakdown: Propulsion · Agility · Fatigue",
          "AI-written personalised feedback per session",
        ]}
        align="left"
      />
      <FeatureBlock
        tag="⌚ Health Monitor"
        image="/images/feature-health.svg"
        imageAlt="Athlete with smartwatch health metrics"
        title="Real-time{{accent}} health tracking."
        accent=""
        desc="Connect your Garmin, Apple Watch, Samsung Galaxy Watch or Polar to monitor Heart Rate, HRV, SpO₂, Stress and Active Minutes. Injury risk alerts fire before problems become serious."
        bullets={[
          "Supports 5 major smartwatch brands",
          "7 health metrics tracked live",
          "Risk band alerts — green / yellow / red",
          "Data visible to coach and scout with permission",
        ]}
        align="right"
        bg="#0a0a0a"
      />
      <FeatureBlock
        tag="📹 Live Coaching"
        image="/images/feature-coaching.svg"
        imageAlt="Coach and athlete in a live video session"
        title="1-on-1 sessions,{{accent}} recorded."
        accent=""
        desc="Coaches schedule live video sessions with athletes. Sessions are recorded and stored for later review — no third-party app needed. Coaches can annotate sessions and assign training drills directly from the platform."
        bullets={[
          "Built-in meet link, no external tool required",
          "Recordings stored and accessible to athletes",
          "Coach can leave timestamped notes",
          "Training plans assigned per session",
        ]}
        align="left"
        bg="#0c0c0c"
      />
      <FeatureBlock
        tag="🔭 Scout Discovery"
        image="/images/feature-scouting.svg"
        imageAlt="Scout reviewing athlete data on a tablet"
        title="Find talent{{accent}} backed by data."
        accent=""
        desc="Scouts browse all discoverable para-athletes filtered by sport, IPC class, state, and performance score. Compare athletes head-to-head, build a private shortlist, and add scouting notes — all in one view."
        bullets={[
          "Filter by sport · IPC class · state · score",
          "Side-by-side metric comparison",
          "Private shortlist and personal scouting notes",
          "Alerts when connected athletes post new sessions",
        ]}
        align="right"
        bg="#080808"
      />
    </>
  );
}

/* ─── How It Works ───────────────────────────────────────────── */
function HowItWorks() {
  const steps = [
    { n: "01", title: "Create Your Account", desc: "Sign up as Athlete, Coach, Scout, or Federation. Your role determines your dashboard, tools, and data access." },
    { n: "02", title: "Record & Upload", desc: "Athletes film a training session on any phone and upload it through the ParaSync mobile app in one tap." },
    { n: "03", title: "AI Analyses the Session", desc: "Our AI pipeline extracts biomechanical metrics and Gemini writes personalised feedback within minutes." },
    { n: "04", title: "Connect & Grow", desc: "Coaches review your data. Scouts discover you. Federations track your progress. All on one unified platform." },
  ];

  return (
    <section id="how-it-works" className="py-28 px-6 md:px-10 bg-[#080808] border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <p className="text-xs font-bold tracking-widest uppercase text-[#60a5fa] mb-4">How It Works</p>
          <h2 className="text-5xl sm:text-6xl font-black text-white leading-tight max-w-2xl">
            From video to insight<br /><span className="text-[#3b82f6]">in minutes.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 border border-white/5 rounded-3xl overflow-hidden">
          {steps.map((s, i) => (
            <div key={s.n} className="bg-[#080808] p-8 hover:bg-[#0f0f0f] transition-colors">
              <div className="text-sm font-black text-[#3b82f6] tracking-widest mb-6">{s.n}</div>
              <h3 className="text-lg font-bold text-white mb-3">{s.title}</h3>
              <p className="text-[15px] text-white/75 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Roles ──────────────────────────────────────────────────── */
function Roles() {
  const roles = [
    {
      emoji: "🏅", role: "Athlete",
      tagline: "Train smarter. Get discovered.",
      items: ["AI biomechanics reports", "Smartwatch health tracking", "Live coaching sessions", "Scout visibility controls", "AI chatbot for performance Q&A"],
    },
    {
      emoji: "📋", role: "Coach",
      tagline: "Coach with data, not guesswork.",
      items: ["Full athlete session history", "Assign training plans", "Live + recorded video sessions", "AI risk alerts per athlete", "Metric trend dashboards"],
    },
    {
      emoji: "🔭", role: "Scout",
      tagline: "Discover talent backed by data.",
      items: ["Filter athletes by sport, class, state", "Head-to-head metric compare", "Private shortlist + notes", "Session history access", "New session alerts"],
    },
    {
      emoji: "🏛️", role: "Federation",
      tagline: "Govern with full visibility.",
      items: ["National performance dashboards", "IPC verification tracking", "Aggregate training metrics", "High-potential athlete alerts", "Export committee reports"],
    },
  ];

  return (
    <section id="roles" className="py-28 px-6 md:px-10 bg-[#060606] border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <p className="text-xs font-bold tracking-widest uppercase text-[#60a5fa] mb-4">Who It's For</p>
          <h2 className="text-5xl sm:text-6xl font-black text-white leading-tight">
            One platform.<br /><span className="text-[#3b82f6]">Four roles.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {roles.map(r => (
            <div key={r.role}
              className="group bg-[#0c0c0c] border border-white/12 rounded-3xl p-7 flex flex-col hover:border-white/20 hover:bg-[#101010] transition-all">
              <div className="text-3xl mb-4">{r.emoji}</div>
              <div className="text-xs font-black uppercase tracking-widest text-white/55 mb-1">{r.role}</div>
              <div className="text-base font-bold text-white mb-5">{r.tagline}</div>
              <ul className="space-y-2.5 flex-1">
                {r.items.map(it => (
                  <li key={it} className="flex items-start gap-2.5 text-sm text-white/75">
                    <span className="text-[#3b82f6] mt-0.5 shrink-0">→</span>
                    {it}
                  </li>
                ))}
              </ul>
              <Link href="/signup"
                className="mt-7 text-center text-xs font-bold border border-white/10 text-white py-2.5 rounded-full hover:bg-white hover:text-black transition-all">
                Join as {r.role}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Sports ─────────────────────────────────────────────────── */
function Sports() {
  const sports = [
    { name: "Wheelchair Basketball", icon: "🏀", classes: "Class 1–4" },
    { name: "Para Athletics",        icon: "🏃", classes: "T51–T54" },
    { name: "Wheelchair Tennis",     icon: "🎾", classes: "Class 1–2" },
    { name: "Para Swimming",         icon: "🏊", classes: "S1–S4" },
    { name: "Wheelchair Badminton",  icon: "🏸", classes: "WH1–WH2" },
    { name: "Boccia",                icon: "🎯", classes: "BC1–BC4" },
  ];

  return (
    <section className="py-20 px-6 md:px-10 bg-[#080808] border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
          <div>
            <p className="text-xs font-bold tracking-widest uppercase text-[#60a5fa] mb-3">Coverage</p>
            <h2 className="text-3xl font-black text-white">6 Para Sports. IPC-aligned metrics.</h2>
          </div>
          <p className="text-sm text-white/60 max-w-xs">Every score benchmarked to the athlete's own IPC class — never to generic norms.</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {sports.map(s => (
            <div key={s.name}
              className="bg-[#0c0c0c] border border-white/12 rounded-2xl p-5 text-center hover:border-white/18 hover:bg-[#101010] transition-all">
              <div className="text-3xl mb-3">{s.icon}</div>
              <div className="text-sm font-bold text-white leading-tight mb-1">{s.name}</div>
              <div className="text-xs text-[#60a5fa]">{s.classes}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── About ──────────────────────────────────────────────────── */
function About() {
  return (
    <section id="about" className="py-28 px-6 md:px-10 bg-[#060606] border-t border-white/5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div>
          <p className="text-xs font-bold tracking-widest uppercase text-[#60a5fa] mb-5">Our Mission</p>
          <h2 className="text-5xl sm:text-6xl font-black text-white leading-tight mb-7">
            Levelling the field<br />for <span className="text-[#3b82f6]">every</span><br />para-athlete.
          </h2>
          <p className="text-white/75 text-base leading-relaxed mb-5">
            Para-athletes in India train without the performance technology their able-bodied peers take for granted. ParaSync changes that — making professional-grade biomechanics analysis accessible to anyone with a smartphone.
          </p>
          <p className="text-white/60 text-sm leading-relaxed mb-8">
            Built by a team passionate about inclusive sports technology, ParaSync brings AI-powered performance insight to athletes, coaches and scouts alike.
          </p>
          <Link href="/signup" className="inline-flex items-center gap-2 text-sm font-bold text-white border border-white/20 px-6 py-3 rounded-full hover:bg-white hover:text-black transition-all">
            Join the Platform →
          </Link>
        </div>

        {/* Image + value cards */}
        <div className="flex flex-col gap-3">
        <ImageSlot src="/images/about.svg" alt="Para-athletes training together" className="aspect-[16/9]" />
        <div className="grid grid-cols-2 gap-3">
          {[
            { icon: "⚡", t: "Instant Analysis", d: "Biomechanics feedback minutes after upload — no lab, no waiting." },
            { icon: "🔒", t: "Privacy First", d: "Athletes own their data. Scout visibility is fully opt-in." },
            { icon: "📱", t: "Mobile Native", d: "Full-featured Expo app — works anywhere in India." },
            { icon: "🌐", t: "Open Ecosystem", d: "Coaches, scouts, and federations on the same data — no silos." },
          ].map(v => (
            <div key={v.t} className="bg-[#0c0c0c] border border-white/12 rounded-2xl p-6 hover:border-white/15 transition-all">
              <div className="text-xl mb-3">{v.icon}</div>
              <div className="text-sm font-bold text-white mb-2">{v.t}</div>
              <div className="text-sm text-white/75 leading-relaxed">{v.d}</div>
            </div>
          ))}
        </div>
        </div>
      </div>
    </section>
  );
}

/* ─── CTA ────────────────────────────────────────────────────── */
function CTA() {
  return (
    <section className="py-28 px-6 md:px-10 bg-[#080808] border-t border-white/5">
      <div className="max-w-5xl mx-auto">
        <div className="border border-white/12 rounded-3xl p-14 md:p-20 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#3b82f6]/5 to-transparent pointer-events-none" />
          <p className="text-xs font-bold tracking-widest uppercase text-[#60a5fa] mb-5 relative">Ready to Start?</p>
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-black text-white leading-tight mb-5 relative">
            Let's build<br />your <span className="text-[#3b82f6]">future.</span>
          </h2>
          <p className="text-white/70 text-base max-w-md mx-auto mb-10 relative">
            Join athletes, coaches, scouts, and federations already using ParaSync to raise the standard of para-sports in India.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative">
            <Link href="/signup"
              className="w-full sm:w-auto px-10 py-4 bg-white text-black font-bold text-sm rounded-full hover:bg-white/90 transition-all">
              Create Free Account →
            </Link>
            <Link href="/login"
              className="w-full sm:w-auto px-10 py-4 border border-white/15 text-white font-medium text-sm rounded-full hover:border-white/30 transition-all">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Footer ─────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="bg-[#060606] border-t border-white/5 px-6 md:px-10 py-14">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">

          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-md bg-white flex items-center justify-center">
                <span className="text-black font-black text-xs">PS</span>
              </div>
              <span className="text-lg font-black tracking-tight">
                <span className="text-white">Para</span>
                <span className="text-[#3b82f6]">Sync</span>
                <span className="text-white/45 font-light">.</span>
              </span>
            </Link>
            <p className="text-sm text-white/70 leading-relaxed max-w-xs mb-5">
              AI-powered biomechanics intelligence for Indian para-athletes, coaches, scouts, and federations.
            </p>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs text-white/50">All systems operational</span>
            </div>
          </div>

          {/* Links */}
          {[
            { title: "Platform", items: ["Features", "How It Works", "Pricing", "Changelog"] },
            { title: "For",      items: ["Athletes", "Coaches", "Scouts", "Federations"] },
            { title: "Company",  items: ["About", "Blog", "Privacy", "Terms"] },
          ].map(col => (
            <div key={col.title}>
              <div className="text-[10px] font-black uppercase tracking-widest text-white/45 mb-4">{col.title}</div>
              <ul className="space-y-3">
                {col.items.map(it => (
                  <li key={it}>
                    <a href="#" className="text-sm text-white/70 hover:text-white transition-colors">{it}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/5 pt-7 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/45">© 2025 ParaSync. All rights reserved.</p>
          <p className="text-xs text-white/45">Powered by Google Gemini · MediaPipe · Next.js · FastAPI</p>
        </div>
      </div>
    </footer>
  );
}

/* ─── Page ───────────────────────────────────────────────────── */
export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[#080808] text-white">
      <Navbar />
      <Hero />
      <section id="features"><Features /></section>
      <HowItWorks />
      <Roles />
      <Sports />
      <About />
      <CTA />
      <Footer />
    </main>
  );
}
