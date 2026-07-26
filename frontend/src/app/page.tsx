'use client'

import React, { useState } from "react";
import {
  Download,
  ArrowRight,
  Mail,
  Phone,
  Wind,
  Gauge,
  Droplets,
  MapPin,
  Send,
} from "lucide-react";
import { Spotlight } from '../components/motion-primitives/spotlight';

/* ------------------------------------------------------------------ */
/* Brand icons — lucide-react dropped Linkedin/Github (trademark      */
/* restrictions), so these are small inline replacements in the       */
/* same stroke style.                                                 */
/* ------------------------------------------------------------------ */

function LinkedinIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function GithubIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.3-.4-4.1 1.6a13.4 13.4 0 0 0-7 0C4.6 3 3.3 3.4 3.3 3.4a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 1.9 9.8c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* DATA — edit these objects to swap in real CV content              */
/* ------------------------------------------------------------------ */

const PROJECTS = [
  {
    code: "MECH / AIR-01",
    title: "Compressed Air Leak Detection",
    icon: Wind,
    description:
      "Built an acoustic-sensor rig to locate leaks in a factory compressed-air network, cutting the manual audit time from a full day to under two hours.",
    tools: ["Ultrasonic Sensors", "MATLAB", "SolidWorks"],
    impact: "18% reduction in compressor energy waste",
  },
  {
    code: "MECH / GKT-02",
    title: "Go-Kart — BFKCT",
    icon: Gauge,
    description:
      "Led chassis and drivetrain design for a formula-style go-kart, from CAD modelling through to on-track testing with a five-person student team.",
    tools: ["SolidWorks", "ANSYS", "Manual Lathe/Mill"],
    impact: "0.4s lap-time gain after suspension redesign",
  },
  {
    code: "MECH / BIO-03",
    title: "Biodiesel Blends",
    icon: Droplets,
    description:
      "Investigated combustion performance of waste-cooking-oil biodiesel blends against standard diesel, benchmarking emissions and fuel efficiency.",
    tools: ["Excel / Data Analysis", "Gas Chromatography", "Engine Test Rig"],
    impact: "B20 blend matched diesel output at 12% lower emissions",
  },
];

const EXPERIENCE = [
  {
    role: "Executive Administrative Assistant",
    org: "Private Office",
    period: "2023 — 2024",
    points: [
      "Managed scheduling, budgets, and reporting for senior leadership across three concurrent projects.",
      "Built spreadsheet models to track spend against forecast, catching a 9% budget drift early.",
    ],
  },
  {
    role: "Steward",
    org: "Wembley Stadium",
    period: "2021 — 2023",
    points: [
      "Directed crowd flow for events of 80,000+ attendees, making rapid safety calls under pressure.",
      "Trained and briefed incoming steward teams ahead of major fixtures.",
    ],
  },
  {
    role: "Online Shopper",
    org: "Retail Fulfilment",
    period: "2020 — 2021",
    points: [
      "Hit accuracy and speed targets picking 200+ orders per shift during peak demand.",
      "Flagged a stock-mapping error that was costing the store recurring pick-time losses.",
    ],
  },
];

const TECH_SKILLS = [
  { label: "Mechanical Design (SolidWorks / CAD)", level: 85 },
  { label: "Data Analysis (Excel / MATLAB)", level: 80 },
  { label: "FEA / Simulation (ANSYS)", level: 65 },
  { label: "Manufacturing Processes", level: 70 },
];

const SOFT_SKILLS = [
  "Problem Solving",
  "Negotiation",
  "Time Management",
  "Financial Acumen",
  "Team Leadership",
  "Communication",
];

/* ------------------------------------------------------------------ */
/* SUB-COMPONENTS                                                    */
/* ------------------------------------------------------------------ */

export function SpotlightBasic() {
  return (
    <div className='relative aspect-video h-50 rounded-sm border border-zinc-100 bg-white dark:border-zinc-800 dark:bg-black overflow-hidden'>
      <Spotlight
        className='bg-zinc-700 blur-2xl'
        size={64}
        springOptions={{
          bounce: 0.3,
          duration: 0.1,
        }}
      />
      <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-sm bg-white p-2 dark:bg-black pointer-events-none z-10'>
        <svg
          role='img'
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 70 70'
          aria-label='MP Logo'
          width='70'
          height='70'
          className='h-8 w-auto stroke-black dark:stroke-white'
          fill='none'
        >
          <path
            stroke='currentColor'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='3'
            d='M51.883 26.495c-7.277-4.124-18.08-7.004-26.519-7.425-2.357-.118-4.407-.244-6.364 1.06M59.642 51c-10.47-7.25-26.594-13.426-39.514-15.664-3.61-.625-6.744-1.202-9.991.263'
          ></path>
        </svg>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* MAIN PORTFOLIO COMPONENT                                          */
/* ------------------------------------------------------------------ */

interface FormState {
  name: string;
  email: string;
  message: string;
}

export default function Portfolio() {
  const [formState, setFormState] = useState<FormState>({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="pf-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap');

        .pf-root {
          --navy: #0B1220;
          --navy-soft: #131B2E;
          --slate-900: #1E293B;
          --slate-700: #334155;
          --slate-500: #64748B;
          --slate-300: #CBD5E1;
          --slate-100: #F1F5F9;
          --off-white: #F8FAFC;
          --white: #FFFFFF;
          --orange: #F97316;
          --orange-dark: #EA580C;
          --line: #E2E8F0;
          font-family: 'Inter', sans-serif;
          color: var(--slate-900);
          background: var(--off-white);
          line-height: 1.5;
        }
        .pf-root * { box-sizing: border-box; }
        .pf-mono { font-family: 'JetBrains Mono', monospace; }

        a { color: inherit; text-decoration: none; }
        button { font-family: inherit; cursor: pointer; }

        .pf-section {
          padding: 96px 8vw;
          max-width: 1280px;
          margin: 0 auto;
        }
        @media (max-width: 720px) {
          .pf-section { padding: 64px 6vw; }
        }

        .pf-eyebrow {
          font-family: 'JetBrains Mono', monospace;
          font-size: 12px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--orange);
          font-weight: 600;
          margin-bottom: 14px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .pf-eyebrow::before {
          content: '';
          width: 22px;
          height: 1px;
          background: var(--orange);
          display: inline-block;
        }

        .pf-h2 {
          font-size: clamp(28px, 3.4vw, 40px);
          font-weight: 800;
          letter-spacing: -0.01em;
          margin: 0 0 18px 0;
        }

        /* ---------- NAV ---------- */
        .pf-nav {
          position: sticky;
          top: 0;
          z-index: 50;
          background: rgba(11, 18, 32, 0.92);
          backdrop-filter: blur(6px);
          border-bottom: 1px solid rgba(255,255,255,0.08);
        }
        .pf-nav-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 18px 8vw;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .pf-logo {
          color: var(--white);
          font-weight: 700;
          font-size: 16px;
          letter-spacing: 0.02em;
        }
        .pf-logo span { color: var(--orange); }
        .pf-nav-links {
          display: flex;
          gap: 32px;
          font-size: 14px;
          font-weight: 500;
        }
        .pf-nav-links a { color: var(--slate-300); transition: color .15s ease; }
        .pf-nav-links a:hover { color: var(--white); }
        @media (max-width: 720px) {
          .pf-nav-links { display: none; }
        }

        /* ---------- HERO ---------- */
        .pf-hero {
          position: relative;
          background: var(--navy);
          color: var(--white);
          overflow: hidden;
        }
        .pf-hero-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px);
          background-size: 44px 44px;
          mask-image: radial-gradient(circle at 70% 30%, black 0%, transparent 70%);
        }
        .pf-hero-inner {
          position: relative;
          max-width: 1280px;
          margin: 0 auto;
          padding: 120px 8vw 110px;
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 48px;
          align-items: center;
        }
        @media (max-width: 860px) {
          .pf-hero-inner { grid-template-columns: 1fr; padding: 90px 6vw 70px; }
        }
        .pf-hero h1 {
          font-size: clamp(34px, 5vw, 56px);
          font-weight: 800;
          line-height: 1.08;
          letter-spacing: -0.02em;
          margin: 0 0 22px 0;
        }
        .pf-hero h1 em {
          font-style: normal;
          color: var(--orange);
        }
        .pf-hero p {
          font-size: 18px;
          color: var(--slate-300);
          max-width: 480px;
          margin: 0 0 36px 0;
        }
        .pf-cta-row { display: flex; gap: 16px; flex-wrap: wrap; }

        .pf-btn-primary {
          background: var(--orange);
          color: var(--navy);
          font-weight: 700;
          font-size: 15px;
          border: none;
          border-radius: 6px;
          padding: 14px 26px;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          transition: background .15s ease, transform .15s ease;
        }
        .pf-btn-primary:hover { background: var(--orange-dark); transform: translateY(-1px); }

        .pf-btn-secondary {
          background: transparent;
          color: var(--white);
          font-weight: 600;
          font-size: 15px;
          border: 1px solid rgba(255,255,255,0.28);
          border-radius: 6px;
          padding: 14px 26px;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          transition: border-color .15s ease, background .15s ease;
        }
        .pf-btn-secondary:hover { border-color: var(--orange); background: rgba(249,115,22,0.08); }

        /* Hero schematic */
        .pf-schematic {
          position: relative;
          border: 1px solid rgba(255,255,255,0.14);
          border-radius: 10px;
          padding: 28px;
          background: rgba(255,255,255,0.03);
        }
        .pf-schematic-tag {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          color: var(--slate-500);
          letter-spacing: 0.08em;
          margin-bottom: 16px;
        }
        .pf-schematic svg { width: 100%; height: auto; display: block; }

        /* ---------- ABOUT ---------- */
        .pf-about-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
          align-items: start;
        }
        @media (max-width: 860px) {
          .pf-about-grid { grid-template-columns: 1fr; gap: 40px; }
        }
        .pf-about-text p {
          color: var(--slate-700);
          font-size: 16px;
          margin: 0 0 16px 0;
        }
        .pf-path {
          display: flex;
          flex-direction: column;
          gap: 0;
        }
        .pf-path-node {
          display: flex;
          gap: 18px;
          padding-bottom: 30px;
          position: relative;
        }
        .pf-path-node:not(:last-child)::before {
          content: '';
          position: absolute;
          left: 9px;
          top: 22px;
          bottom: -2px;
          width: 2px;
          background: var(--line);
        }
        .pf-path-dot {
          width: 20px;
          height: 20px;
          min-width: 20px;
          border-radius: 50%;
          border: 2px solid var(--slate-300);
          background: var(--white);
          margin-top: 2px;
        }
        .pf-path-node.pf-final .pf-path-dot {
          border-color: var(--orange);
          background: var(--orange);
        }
        .pf-path-label-title {
          font-weight: 700;
          font-size: 15px;
          color: var(--slate-900);
        }
        .pf-path-label-sub {
          font-size: 13px;
          color: var(--slate-500);
        }

        /* ---------- PROJECTS ---------- */
        .pf-projects-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        @media (max-width: 960px) {
          .pf-projects-grid { grid-template-columns: 1fr; }
        }
        .pf-card {
          background: var(--white);
          border: 1px solid var(--line);
          border-radius: 10px;
          padding: 26px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          transition: box-shadow .18s ease, transform .18s ease;
        }
        .pf-card:hover {
          box-shadow: 0 12px 28px rgba(15, 23, 42, 0.08);
          transform: translateY(-3px);
        }
        .pf-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .pf-card-icon {
          width: 40px;
          height: 40px;
          border-radius: 8px;
          background: var(--navy);
          color: var(--orange);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .pf-card-code {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          color: var(--slate-500);
          letter-spacing: 0.06em;
        }
        .pf-card h3 {
          font-size: 18px;
          font-weight: 700;
          margin: 0;
          color: var(--slate-900);
        }
        .pf-card p.pf-desc {
          font-size: 14px;
          color: var(--slate-700);
          margin: 0;
        }
        .pf-tools {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }
        .pf-tool-pill {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          background: var(--slate-100);
          color: var(--slate-700);
          padding: 4px 9px;
          border-radius: 4px;
        }
        .pf-impact {
          border-top: 1px dashed var(--line);
          padding-top: 14px;
          font-size: 13px;
          color: var(--navy);
          font-weight: 600;
        }
        .pf-impact span { color: var(--orange); font-family: 'JetBrains Mono', monospace; font-weight: 600; }

        /* ---------- EXPERIENCE ---------- */
        .pf-timeline {
          position: relative;
          padding-left: 32px;
        }
        .pf-timeline::before {
          content: '';
          position: absolute;
          left: 6px;
          top: 6px;
          bottom: 6px;
          width: 2px;
          background: var(--line);
        }
        .pf-tl-item {
          position: relative;
          padding-bottom: 44px;
        }
        .pf-tl-item:last-child { padding-bottom: 0; }
        .pf-tl-dot {
          position: absolute;
          left: -32px;
          top: 4px;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: var(--navy);
          border: 3px solid var(--orange);
        }
        .pf-tl-head {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 6px;
        }
        .pf-tl-role { font-size: 17px; font-weight: 700; color: var(--slate-900); }
        .pf-tl-org { font-size: 14px; color: var(--orange-dark); font-weight: 600; margin-left: 8px; }
        .pf-tl-period {
          font-family: 'JetBrains Mono', monospace;
          font-size: 12px;
          color: var(--slate-500);
        }
        .pf-tl-item ul {
          margin: 8px 0 0 0;
          padding-left: 18px;
          color: var(--slate-700);
          font-size: 14px;
        }
        .pf-tl-item li { margin-bottom: 6px; }

        /* ---------- SKILLS ---------- */
        .pf-skills-grid {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 56px;
        }
        @media (max-width: 860px) {
          .pf-skills-grid { grid-template-columns: 1fr; gap: 40px; }
        }
        .pf-skills-subhead {
          font-size: 13px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--slate-500);
          margin-bottom: 20px;
        }
        .pf-bar-row { margin-bottom: 18px; }
        .pf-bar-label {
          display: flex;
          justify-content: space-between;
          font-size: 14px;
          font-weight: 600;
          color: var(--slate-900);
          margin-bottom: 6px;
        }
        .pf-bar-label span.pf-bar-pct {
          font-family: 'JetBrains Mono', monospace;
          color: var(--slate-500);
          font-weight: 500;
        }
        .pf-bar-track {
          height: 8px;
          border-radius: 4px;
          background: var(--slate-100);
          overflow: hidden;
        }
        .pf-bar-fill {
          height: 100%;
          background: linear-gradient(90deg, var(--navy), var(--orange));
          border-radius: 4px;
        }
        .pf-tags { display: flex; flex-wrap: wrap; gap: 10px; }
        .pf-tag {
          border: 1px solid var(--line);
          background: var(--white);
          color: var(--slate-700);
          font-size: 13px;
          font-weight: 600;
          padding: 9px 16px;
          border-radius: 20px;
        }

        /* ---------- FOOTER / CONTACT ---------- */
        .pf-footer {
          background: var(--navy);
          color: var(--white);
        }
        .pf-footer-grid {
          display: grid;
          grid-template-columns: 0.9fr 1.1fr;
          gap: 56px;
          margin-bottom: 48px;
        }
        @media (max-width: 860px) {
          .pf-footer-grid { grid-template-columns: 1fr; gap: 40px; }
        }
        .pf-footer h2 { color: var(--white); }
        .pf-footer p.pf-lede { color: var(--slate-300); font-size: 15px; max-width: 400px; }
        .pf-contact-list { margin-top: 28px; display: flex; flex-direction: column; gap: 14px; }
        .pf-contact-item {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 14px;
          color: var(--slate-300);
        }
        .pf-contact-item svg { color: var(--orange); flex-shrink: 0; }
        .pf-social-row { display: flex; gap: 12px; margin-top: 24px; }
        .pf-social-btn {
          width: 40px; height: 40px;
          border-radius: 8px;
          border: 1px solid rgba(255,255,255,0.16);
          display: flex; align-items: center; justify-content: center;
          transition: border-color .15s ease, background .15s ease;
        }
        .pf-social-btn:hover { border-color: var(--orange); background: rgba(249,115,22,0.1); }

        .pf-form { display: flex; flex-direction: column; gap: 16px; }
        .pf-form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        @media (max-width: 520px) { .pf-form-row { grid-template-columns: 1fr; } }
        .pf-form label {
          font-size: 12px;
          font-family: 'JetBrains Mono', monospace;
          letter-spacing: 0.06em;
          color: var(--slate-500);
          text-transform: uppercase;
          display: block;
          margin-bottom: 6px;
        }
        .pf-form input, .pf-form textarea {
          width: 100%;
          background: var(--navy-soft);
          border: 1px solid rgba(255,255,255,0.14);
          border-radius: 6px;
          padding: 12px 14px;
          color: var(--white);
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          resize: vertical;
        }
        .pf-form input::placeholder, .pf-form textarea::placeholder { color: var(--slate-500); }
        .pf-form input:focus, .pf-form textarea:focus {
          outline: none;
          border-color: var(--orange);
        }
        .pf-form-submit {
          align-self: flex-start;
          margin-top: 4px;
        }
        .pf-sent-note {
          font-size: 13px;
          color: var(--orange);
          font-family: 'JetBrains Mono', monospace;
        }
        .pf-bottom-bar {
          border-top: 1px solid rgba(255,255,255,0.1);
          padding: 22px 8vw;
          max-width: 1280px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 10px;
          font-size: 13px;
          color: var(--slate-500);
        }
        .pf-showcase-wrapper {
          max-width: 1280px;
          margin: 0 auto 48px;
          padding: 0 8vw;
        }
      `}</style>

      {/* NAV */}
      <nav className="pf-nav">
        <div className="pf-nav-inner">
          <div className="pf-logo">J. WHITFIELD <span>/ MECH ENG</span></div>
          <div className="pf-nav-links">
            <a href="#about">About</a>
            <a href="#projects">Projects</a>
            <a href="#experience">Experience</a>
            <a href="#skills">Skills</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <header className="pf-hero">
        <div className="pf-hero-grid" />
        <div className="pf-hero-inner">
          <div>
            <div className="pf-eyebrow">Mechanical Engineering · M.S. Candidate, London</div>
            <h1>
              Mechanical Engineer &amp; <em>Versatile</em> Operations Professional
            </h1>
            <p>
              I bring engineering rigour and cross-industry adaptability together —
              built through roles spanning stadium operations, administration, and
              retail before turning fully toward mechanical design and analysis.
            </p>
            <div className="pf-cta-row">
              <button className="pf-btn-primary">
                <Download size={18} /> Download Resume
              </button>
              <a href="#projects">
                <button className="pf-btn-secondary">
                  View Projects <ArrowRight size={16} />
                </button>
              </a>
            </div>
          </div>

          <div className="pf-schematic">
            <div className="pf-schematic-tag">FIG. 01 — LOAD PATH, GO-KART CHASSIS</div>
            <svg viewBox="0 0 320 220" fill="none">
              <rect x="20" y="150" width="280" height="8" rx="2" stroke="#F97316" strokeWidth="1.5" />
              <line x1="40" y1="150" x2="40" y2="70" stroke="#94A3B8" strokeWidth="1.5" />
              <line x1="280" y1="150" x2="280" y2="70" stroke="#94A3B8" strokeWidth="1.5" />
              <line x1="40" y1="70" x2="280" y2="70" stroke="#94A3B8" strokeWidth="1.5" strokeDasharray="4 4" />
              <circle cx="70" cy="158" r="16" stroke="#F8FAFC" strokeWidth="1.5" />
              <circle cx="250" cy="158" r="16" stroke="#F8FAFC" strokeWidth="1.5" />
              <line x1="70" y1="142" x2="70" y2="70" stroke="#475569" strokeWidth="1" strokeDasharray="2 3" />
              <line x1="250" y1="142" x2="250" y2="70" stroke="#475569" strokeWidth="1" strokeDasharray="2 3" />
              <text x="150" y="60" fill="#64748B" fontSize="9" fontFamily="JetBrains Mono" textAnchor="middle">240mm WHEELBASE REF.</text>
              <path d="M120 150 Q160 100 200 150" stroke="#F97316" strokeWidth="1.5" fill="none" />
              <text x="160" y="115" fill="#F97316" fontSize="9" fontFamily="JetBrains Mono" textAnchor="middle">σ MAX</text>
            </svg>
          </div>
        </div>
      </header>

      {/* ABOUT */}
      <section className="pf-section" id="about">
        <div className="pf-eyebrow">About</div>
        <h2 className="pf-h2">Different rooms, one work ethic.</h2>
        <div className="pf-about-grid">
          <div className="pf-about-text">
            <p>
              My path into mechanical engineering didn't run in a straight line — and
              that's exactly what makes it useful. Time spent in retail, executive
              administration, and large-scale crowd management at Wembley Stadium
              taught me how to read a room, manage competing priorities, and make
              sound decisions when the pressure is real and the margin for error is
              small.
            </p>
            <p>
              Those roles built the problem-solving and communication instincts I now
              apply on the engineering side: breaking down a technical problem,
              working with a team toward a deadline, and explaining a result clearly
              to people who weren't in the room for the analysis.
            </p>
            <p>
              I'm currently pursuing an M.S. in Mechanical Engineering in London,
              sharpening the technical foundation — CAD, simulation, and data
              analysis — that sits underneath every project on this page.
            </p>
          </div>
          <div className="pf-path">
            <div className="pf-path-node">
              <div className="pf-path-dot" />
              <div>
                <div className="pf-path-label-title">Retail</div>
                <div className="pf-path-label-sub">Speed, accuracy, working under targets</div>
              </div>
            </div>
            <div className="pf-path-node">
              <div className="pf-path-dot" />
              <div>
                <div className="pf-path-label-title">Administration</div>
                <div className="pf-path-label-sub">Financial acumen, structured reporting</div>
              </div>
            </div>
            <div className="pf-path-node">
              <div className="pf-path-dot" />
              <div>
                <div className="pf-path-label-title">Crowd Management</div>
                <div className="pf-path-label-sub">High-pressure judgement, leadership</div>
              </div>
            </div>
            <div className="pf-path-node pf-final">
              <div className="pf-path-dot" />
              <div>
                <div className="pf-path-label-title">Mechanical Engineering</div>
                <div className="pf-path-label-sub">Where it all converges — M.S., London</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section className="pf-section" id="projects" style={{ background: "var(--slate-100)", maxWidth: "100%" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div className="pf-eyebrow">Technical Projects</div>
          <h2 className="pf-h2">Engineering, tested against the real world.</h2>
          <div className="pf-projects-grid">
            {PROJECTS.map((proj) => {
              const Icon = proj.icon;
              return (
                <div className="pf-card" key={proj.code}>
                  <div className="pf-card-top">
                    <div className="pf-card-icon">
                      <Icon size={20} />
                    </div>
                    <div className="pf-card-code">{proj.code}</div>
                  </div>
                  <h3>{proj.title}</h3>
                  <p className="pf-desc">{proj.description}</p>
                  <div className="pf-tools">
                    {proj.tools.map((t) => (
                      <span className="pf-tool-pill" key={t}>{t}</span>
                    ))}
                  </div>
                  <div className="pf-impact">
                    Impact — <span>{proj.impact}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section className="pf-section" id="experience">
        <div className="pf-eyebrow">Work Experience</div>
        <h2 className="pf-h2">The professional foundation.</h2>
        <div className="pf-timeline">
          {EXPERIENCE.map((job) => (
            <div className="pf-tl-item" key={job.role}>
              <div className="pf-tl-dot" />
              <div className="pf-tl-head">
                <div>
                  <span className="pf-tl-role">{job.role}</span>
                  <span className="pf-tl-org">{job.org}</span>
                </div>
                <div className="pf-tl-period">{job.period}</div>
              </div>
              <ul>
                {job.points.map((pt, i) => (
                  <li key={i}>{pt}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* SKILLS */}
      <section className="pf-section" id="skills" style={{ background: "var(--slate-100)", maxWidth: "100%" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div className="pf-eyebrow">Skills Matrix</div>
          <h2 className="pf-h2">What I bring to the table.</h2>
          <div className="pf-skills-grid">
            <div>
              <div className="pf-skills-subhead">Technical / Engineering</div>
              {TECH_SKILLS.map((s) => (
                <div className="pf-bar-row" key={s.label}>
                  <div className="pf-bar-label">
                    <span>{s.label}</span>
                    <span className="pf-bar-pct">{s.level}%</span>
                  </div>
                  <div className="pf-bar-track">
                    <div className="pf-bar-fill" style={{ width: `${s.level}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <div>
              <div className="pf-skills-subhead">Professional / Soft Skills</div>
              <div className="pf-tags">
                {SOFT_SKILLS.map((s) => (
                  <span className="pf-tag" key={s}>{s}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER / CONTACT */}
      <footer className="pf-footer" id="contact">
        <div className="pf-section" style={{ paddingBottom: 0 }}>
          <div className="pf-footer-grid">
            <div>
              <div className="pf-eyebrow">Contact</div>
              <h2 className="pf-h2">Let's build something.</h2>
              <p className="pf-lede">
                Open to graduate engineering roles, internships, and operations
                positions where adaptability matters as much as technical skill.
              </p>
              <div className="pf-contact-list">
                <div className="pf-contact-item"><Mail size={16} /> j.whitfield@email.com</div>
                <div className="pf-contact-item"><Phone size={16} /> +44 7000 000000</div>
                <div className="pf-contact-item"><MapPin size={16} /> London, UK</div>
              </div>
              <div className="pf-social-row">
                <a className="pf-social-btn" href="#" aria-label="LinkedIn"><LinkedinIcon size={18} /></a>
                <a className="pf-social-btn" href="#" aria-label="GitHub"><GithubIcon size={18} /></a>
              </div>
            </div>

            <form className="pf-form" onSubmit={handleSubmit}>
              <div className="pf-form-row">
                <div>
                  <label htmlFor="pf-name">Name</label>
                  <input
                    id="pf-name"
                    type="text"
                    placeholder="Your name"
                    value={formState.name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setFormState({ ...formState, name: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <label htmlFor="pf-email">Email</label>
                  <input
                    id="pf-email"
                    type="email"
                    placeholder="you@example.com"
                    value={formState.email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setFormState({ ...formState, email: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
              <div>
                <label htmlFor="pf-message">Message</label>
                <textarea
                  id="pf-message"
                  rows={5}
                  placeholder="What are you looking to build or discuss?"
                  value={formState.message}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setFormState({ ...formState, message: e.target.value })
                  }
                  required
                />
              </div>
              <div className="pf-form-submit">
                <button type="submit" className="pf-btn-primary">
                  <Send size={16} /> Send Message
                </button>
              </div>
              {sent && <div className="pf-sent-note">Message sent — thanks, I'll reply soon.</div>}
            </form>
          </div>
        </div>

        {/* MOTION PRIMITIVES BANNER SHOWCASE */}
        <div className="pf-showcase-wrapper">
          <SpotlightBasic />
        </div>

        <div className="pf-bottom-bar">
          <span>© {new Date().getFullYear()} J. Whitfield. All rights reserved.</span>
          <span className="pf-mono">MECH ENG · LONDON</span>
        </div>
      </footer>
    </div>
  );
}