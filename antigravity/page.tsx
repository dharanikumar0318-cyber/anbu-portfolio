'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
} from 'framer-motion';
import SwarmPreloader from './src/components/SwarmPreloader';
import ActiveGearAssembly from './src/components/ActiveGearAssembly';
import { downloadCV } from './src/utils/cvDownload';
import {
  Cog,
  Wrench,
  Ruler,
  Crosshair,
  Database,
  Activity,
  Gauge,
  Wind,
  Flame,
  Zap,
  Layers,
  Cpu,
  Compass,
  ShieldCheck,
  BarChart3,
  TrendingUp,
  Clock,
  Users,
  DollarSign,
  Workflow,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Download,
  Send,
  Mail,
  Phone,
  MapPin,
  ChevronRight,
  ExternalLink,
  ArrowUpRight,
  Maximize2,
  Sliders,
  Terminal,
  Search,
  Radio,
  CornerDownRight,
  GraduationCap,
  Briefcase,
  Factory,
  Car,
  X,
  Play,
  Copy,
  Check,
  Settings,
  ArrowUp
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/* TYPES & INTERFACES                                                 */
/* ------------------------------------------------------------------ */

interface ProjectData {
  id: string;
  code: string;
  title: string;
  subtitle: string;
  category: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  summary: string;
  metrics: { label: string; value: string; delta?: string }[];
  tags: string[];
  specs: { [key: string]: string };
  methodology: string[];
  outcomes: string[];
  schematicType: 'pneumatic' | 'energy' | 'bio' | 'kart';
}

/* ------------------------------------------------------------------ */
/* DATA REPOSITORY                                                   */
/* ------------------------------------------------------------------ */

const PROJECTS: ProjectData[] = [
  {
    id: 'compressed-air',
    code: 'SYS-01 // PNEUMATICS',
    title: 'Compressed Air Leak Detection & Reduction',
    subtitle: 'Ultrasonic Acoustic Diagnostics & Energy Reclamation',
    category: 'Fluid Mechanics & Industrial Auditing',
    icon: Wind,
    summary:
      'Engineered an ultrasonic acoustic detection protocol across a high-volume factory pneumatic network. Pinpointed hairline orifice leaks, minimized compressor cycling loss, and reduced system electrical consumption in full accordance with ISO 11011 compressed air auditing standards.',
    metrics: [
      { label: 'Energy Waste Cut', value: '23%', delta: '-23% kWh' },
      { label: 'Audit Time Cycle', value: '<2.0 hrs', delta: '-75% time' },
      { label: 'Line Pressure Delta', value: '7.2 → 6.1 BAR', delta: 'Nominal' },
      { label: 'Projected Recovery', value: '£14,200/yr', delta: '+ROI' },
    ],
    tags: ['Acoustic Diagnostics', 'ISO 11011', 'MATLAB Spectrum', 'SolidWorks Pneumatics', 'Root Cause Analysis'],
    specs: {
      'Audit Standard': 'ISO 11011:2013 Compressed Air Energy Efficiency',
      'Operating Line Pressure': '6.8 - 7.2 BAR (Peak Flow)',
      'Ultrasonic Sensor Band': '38.4 kHz Center Bandwidth',
      'Orifice Leak Range': '0.3mm — 2.4mm Hairline Fittings',
      'Verification Method': 'Acoustic Decibel Log & Thermal Flow Metering',
    },
    methodology: [
      'Pneumatic manifold mapping and high-frequency ultrasound acoustic scan across 450m of distribution piping.',
      'Acoustic signal decibel parsing in MATLAB to separate background machinery noise from turbulent orifice discharge.',
      'Quantitative CFM loss calculation using orifice flow formulas and enthalpy degradation curves.',
      'Designed retrofit push-in safety couplings and scheduled preventative pressure monitoring regime.',
    ],
    outcomes: [
      'Identified and eliminated 19 critical leakage nodes across pneumatic distribution manifolds.',
      'Reduced air compressor unloaded running hours by 18.5%, significantly lowering motor thermal stress.',
      'Documented complete compliance matrix meeting ISO 11011 factory energy audit protocols.',
    ],
    schematicType: 'pneumatic',
  },
  {
    id: 'energy-efficiency',
    code: 'SYS-02 // THERMAL & POWER',
    title: 'Energy Efficiency Improvements in Small-Scale Industries',
    subtitle: 'Thermal Balancing, Motor Optimization & Power Factor Correction',
    category: 'Thermodynamics & Industrial Optimization',
    icon: Factory,
    summary:
      'Conducted end-to-end industrial energy audits for small-to-medium manufacturing units. Formulated systemic interventions including inductive motor power factor correction, boiler waste-heat economizers, and thermal insulation jackets, unlocking rapid capital payback.',
    metrics: [
      { label: 'Thermal Loss Reduction', value: '31%', delta: '-31% therms' },
      { label: 'Power Factor Lift', value: '0.76 → 0.94', delta: '+23.6%' },
      { label: 'Peak Electrical Demand', value: '-18.5 kW', delta: 'Peak shaving' },
      { label: 'CapEx Payback Window', value: '8.4 Months', delta: 'High ROI' },
    ],
    tags: ['Thermal Auditing', 'Power Factor (PF)', 'HVAC Balancing', 'Waste Heat Recovery', 'CapEx/OpEx Analysis'],
    specs: {
      'Audit Baseline': 'CIBSE TM22 Energy Assessment Protocols',
      'Active Motor Load': '3-Phase 415V / 50Hz Induction Drives',
      'Initial Power Factor': '0.76 Inductive Lagging',
      'Optimized Power Factor': '0.94 Automatic Capacitor Switched',
      'Waste Heat Recovery': 'Counter-Flow Shell & Tube Economizer',
    },
    methodology: [
      'Comprehensive electrical telemetry and thermographic imaging of boiler steam jackets and inductive pumps.',
      'Mass and energy balance formulation across processing vessels to identify major thermal enthalpy leaks.',
      'Sizing and staging of automatic power factor correction (APFC) capacitor banks to eliminate utility penalties.',
      'Engineering low-cost custom insulation blankets for steam manifolds, reducing radiant heat dissipation.',
    ],
    outcomes: [
      'Eliminated monthly reactive power utility penalty surcharges through automated capacitor bank tuning.',
      'Recovered 42 kW thermal equivalent through boiler feed-water preheating economizer retrofits.',
      'Delivered structured compliance handbook for local factory shop-floor operators.',
    ],
    schematicType: 'energy',
  },
  {
    id: 'biodiesel-nano',
    code: 'SYS-03 // COMBUSTION & MATERIALS',
    title: 'Impact of TiO₂ and ZrO₂ Blends with Biodiesel',
    subtitle: 'Nanoparticle Thermal Catalysis & Exhaust Abatement in CI Engines',
    category: 'Alternative Fuels & Material Science',
    icon: Flame,
    summary:
      'Investigated the thermo-physical and combustion kinetics of titanium dioxide (TiO₂) and zirconium dioxide (ZrO₂) nanoparticle additives blended into waste-cooking-oil biodiesel (B20). Verified significant improvements in brake thermal efficiency and marked reduction in toxic NOx/particulate emissions.',
    metrics: [
      { label: 'Brake Thermal Eff. (BTE)', value: '+8.2%', delta: '+8.2% output' },
      { label: 'NOx Emission Delta', value: '-16.4%', delta: '-16.4% PPM' },
      { label: 'Smoke Opacity Reduction', value: '-21.0%', delta: '-21% opacity' },
      { label: 'Combustion Delay Period', value: '-1.8° CA', delta: 'Faster ignite' },
    ],
    tags: ['Nanomaterial Doping', 'TiO₂ / ZrO₂ Catalysts', 'IC Engine Testing', 'Gas Chromatography', 'Emissions Abatement'],
    specs: {
      'Base Fuel Matrix': 'B20 (20% Waste Cooking Oil Biodiesel + 80% Diesel)',
      'Nanoparticle Doping Concentration': '50 ppm & 100 ppm Ultrasonic Dispersed',
      'Average Particle Grain Size': '30 — 45 nm Spherical Crystallites',
      'Test Rig Configuration': 'Single Cylinder 4-Stroke Direct Injection Diesel Rig',
      'Instrumentation': 'Kistler Piezo Transducer & AVL Exhaust Gas Analyzer',
    },
    methodology: [
      'High-energy ultrasonication (45 minutes, 40 kHz) using CTAB surfactant to ensure homogeneous nanoparticle suspension without sedimentation.',
      'Experimental bench testing on variable-load compression ignition engine coupled to eddy current dynamometer.',
      'Acquisition of cylinder pressure profiles, heat release rates (HRR), and ignition delay using high-speed DAQ.',
      'Flue gas analysis for nitrogen oxides (NOx), carbon monoxide (CO), unburnt hydrocarbons (UHC), and smoke opacity.',
    ],
    outcomes: [
      'Proved TiO₂ and ZrO₂ act as oxygen-donating micro-catalysts, enhancing secondary fuel droplet micro-explosions.',
      'Attained superior peak cylinder pressures and reduced specific fuel consumption (SFC) across all loading states.',
      'Published analytical dataset validating sustainable alternative fuel utilization for commercial compression engines.',
    ],
    schematicType: 'bio',
  },
  {
    id: 'gokart-chassis',
    code: 'SYS-04 // AUTOMOTIVE DYNAMICS',
    title: 'Go-Kart Space-Frame Chassis & Drivetrain (BFKCT)',
    subtitle: 'Chassis Torsional Rigidity, Ackermann Steering & Track Validation',
    category: 'Automotive Design & Structural Simulation',
    icon: Car,
    summary:
      'Led structural design, CAD modeling, and ANSYS FEA simulation for a competition go-kart entered into the national BFKCT championship. Optimized AISI 4130 chromoly tubular space-frame for high torsional stiffness, verified Ackermann steering geometry, and fabricated precision drivetrain mounts.',
    metrics: [
      { label: 'Torsional Stiffness', value: '1,250 Nm/°', delta: '+14% rigidity' },
      { label: 'Total Kerb Mass', value: '84.0 kg', delta: 'Lightweight' },
      { label: 'Corner Exit Lap Gain', value: '-0.42 s', delta: 'Track proven' },
      { label: 'Safety Factor (FEA)', value: '2.85 FOS', delta: 'Von Mises Safe' },
    ],
    tags: ['SolidWorks CAD', 'ANSYS Mechanical FEA', 'AISI 4130 Chromoly', 'Ackermann Geometry', 'Machining & TIG Welding'],
    specs: {
      'Chassis Architecture': 'Tubular Space-Frame (AISI 4130 Seamless Steel)',
      'Tube Dimensions': 'Ø32mm OD × 2.0mm Wall Thickness (Primary Members)',
      'Wheelbase / Track Width': '1040mm / 1120mm (Front) & 1160mm (Rear)',
      'Steering Kinematics': '100% Pro-Ackermann Geometry with 8° Kingpin Caster',
      'FEA Loading Regimes': 'Frontal Impact (5G), Rear Impact (5G), Torsional Bending',
    },
    methodology: [
      'Parametric 3D CAD modeling in SolidWorks factoring in driver ergonomic envelope, ballast limits, and engine clearances.',
      'Finite Element Analysis (FEA) in ANSYS Mechanical under multiple dynamic impact loads and torsional roll simulations.',
      'Manual fabrication incorporating CNC tube notching, custom jigging fixtures, and precision GTAW / TIG welding.',
      'Telemetry-guided track testing with accelerometer logging to fine-tune caster, camber, and tire contact patches.',
    ],
    outcomes: [
      'Achieved zero permanent chassis deformation after high-G track cornering and obstacle endurance trials.',
      'Refined front-end steering geometry to eliminate understeer slip angles on tight technical hairpins.',
      'Successfully steered team through rigorous technical scrutineering and dynamic safety inspections.',
    ],
    schematicType: 'kart',
  },
];

const WORK_HISTORY = [
  {
    role: "Online Shopper & Retail Assistant",
    company: "Sainsbury's",
    timeline: "Oct 2024 — Oct 2025",
    location: "London, United Kingdom",
    type: "Operations & Logistics Track",
    icon: Briefcase,
    badges: ["FIFO Stock Rotation", "Health & Safety Compliance", "Pick Velocity SLA", "Ergonomics"],
    points: [
      "Enforced rigorous First-In-First-Out (FIFO) inventory rotation across high-throughput fresh product categories, reducing inventory expiration write-offs and upholding HACCP compliance.",
      "Consistently achieved top-tier fulfillment velocity (>185 units/hour) with a sustained 99.4% picking accuracy rate under intense peak-hour delivery deadlines.",
      "Maintained zero-incident occupational health and safety (OHS) standards through proactive floor obstacle remediation and ergonomic manual handling protocols.",
      "Identified and reported inventory barcode mapping discrepancies in the store warehouse management system, accelerating routing efficiency for the entire night team."
    ],
    telemetry: {
      metric1: "99.4% Pick Accuracy",
      metric2: "185+ Units/Hr",
      metric3: "Zero Safety Incidents"
    }
  },
  {
    role: "Steward",
    company: "Gryphon (Wembley Stadium)",
    timeline: "03/2024 — Present",
    location: "London, United Kingdom",
    type: "Safety & Crowd Dynamics Track",
    icon: ShieldCheck,
    badges: ["80,000+ Crowd Safety", "Choke-Point Control", "Emergency Egress", "High-Stress Judgement"],
    points: [
      "Directed high-density crowd distribution, perimeter security, and emergency egress protocols across premier sports finals and stadium concerts accommodating 80,000+ attendees.",
      "Executed rapid situational triage and conflict de-escalation under extreme acoustic and physical congestion, coordinating seamlessly with venue safety command.",
      "Monitored turnstile throughput bottlenecks and regulated flow velocities to avert dynamic crush risks along high-gradient concourse stairwells.",
      "Conducted pre-event stadium sweeps for safety compliance, verifying emergency fire exits, anti-panic hardware, and medical station accessibility."
    ],
    telemetry: {
      metric1: "80,000+ Attendees",
      metric2: "Green Guide Compliant",
      metric3: "Rapid Evacuation Lead"
    }
  },
  {
    role: "Executive Administrative Assistant",
    company: "Santosh University",
    timeline: "07/2022 — 12/2023",
    location: "Chennai, India",
    type: "Data Analysis & Workflow Track",
    icon: Database,
    badges: ["Data Analytics", "Resource Scheduling", "Budget Drift Modeling", "Process Automation"],
    points: [
      "Engineered institutional data models and scheduling matrices across 12 faculties, optimizing lecture hall and lab equipment utilization by 22%.",
      "Constructed dynamic spreadsheet financial models tracking expenditures against quarterly forecasts, successfully intercepting a 9% budget drift prior to fiscal year close.",
      "Streamlined high-volume administrative document routing by consolidating cross-departmental filing workflows into standardized digital repositories.",
      "Coordinated senior executive briefings, preparing analytical digests and statistical breakdowns on academic KPIs and operational overheads."
    ],
    telemetry: {
      metric1: "-9% Budget Drift Intercepted",
      metric2: "+22% Facility Utilization",
      metric3: "12 Faculties Coordinated"
    }
  },
  {
    role: "Crew Member",
    company: "KFC",
    timeline: "01/2022 — 06/2022",
    location: "Chennai, India",
    type: "Process & Inventory Track",
    icon: Factory,
    badges: ["HACCP Compliance", "Inventory Velocity", "Cold-Chain Integrity", "Peak Throughput"],
    points: [
      "Maintained cold-chain integrity and precision temperature logs across raw protein storage in strict compliance with global HACCP and food safety regulations.",
      "Coordinated daily inventory cycles, raw stock reconciliations, and perishable asset turnover to prevent material starvation during high-demand lunch/dinner peaks.",
      "Adhered to systematic station sanitization schedules and monitored personal protective equipment (PPE) compliance across high-temperature fryers.",
      "Trained onboarding team members on standardized operational checklists, line replenishment speed, and quality control checkpoints."
    ],
    telemetry: {
      metric1: "100% HACCP Audit Pass",
      metric2: "High-Volume FIFO",
      metric3: "Line Velocity Maintained"
    }
  }
];

const SKILLS_MATRIX = [
  {
    category: "Data Analysis",
    icon: Database,
    code: "ANLYS-01",
    score: 92,
    summary: "Quantitative analysis of physical processes, acoustic signals, and operational metrics.",
    items: [
      { name: "Statistical Process Control (SPC)", level: 90 },
      { name: "MATLAB & Acoustic Frequency Analysis", level: 88 },
      { name: "Excel Advanced Financial Modeling", level: 94 },
      { name: "Python Telemetry & Data Cleaning", level: 82 },
      { name: "Weibull Failure & Reliability Analysis", level: 80 },
    ],
  },
  {
    category: "Problem Solving",
    icon: Crosshair,
    code: "SOLVE-02",
    score: 95,
    summary: "Root-cause diagnostics, failure mode identification, and systemic engineering resolution.",
    items: [
      { name: "5-Why & Ishikawa / Fishbone Diagnostics", level: 96 },
      { name: "Failure Mode and Effects Analysis (FMEA)", level: 90 },
      { name: "8D Problem Solving Methodology", level: 88 },
      { name: "Rapid Dynamic Triage under Pressure", level: 95 },
      { name: "Engineering Design Trade-off Studies", level: 92 },
    ],
  },
  {
    category: "Time Management",
    icon: Clock,
    code: "TIME-03",
    score: 91,
    summary: "SLA compliance, critical path planning, and rapid throughput optimization.",
    items: [
      { name: "Critical Path Method (CPM) Planning", level: 90 },
      { name: "Lean Kanban & Process Bottleneck Removal", level: 92 },
      { name: "High-Throughput Logistics Velocity", level: 95 },
      { name: "Multi-Workstream Sprint Scheduling", level: 88 },
      { name: "Strict SLA Delivery & Milestone Tracking", level: 93 },
    ],
  },
  {
    category: "Financial Acumen",
    icon: DollarSign,
    code: "FIN-04",
    score: 87,
    summary: "Cost-benefit evaluation, CapEx/OpEx budgeting, and energy conservation ROI modeling.",
    items: [
      { name: "CapEx / OpEx Payback Modeling", level: 90 },
      { name: "Energy Conservation Measure (ECM) ROI", level: 92 },
      { name: "Budget Variance & Drift Detection", level: 88 },
      { name: "Life Cycle Costing (LCC) for Equipment", level: 82 },
      { name: "Procurement & Material Requisition Planning", level: 85 },
    ],
  },
  {
    category: "Teamwork",
    icon: Users,
    code: "TEAM-05",
    score: 96,
    summary: "Cross-functional leadership, safety stewardship, and multi-disciplinary alignment.",
    items: [
      { name: "High-Density Operations Stewardship", level: 98 },
      { name: "Cross-Disciplinary Team Coordination", level: 94 },
      { name: "Safety Briefings & Compliance Training", level: 92 },
      { name: "Conflict De-escalation & Communication", level: 95 },
      { name: "Collaborative Workshop & Jig Fabrication", level: 90 },
    ],
  },
];

const DOMAIN_ENGINEERING_TOOLS = [
  { name: "SolidWorks CAD", tag: "3D Modeling & Assemblies", icon: Compass, spec: "Parametric Design, GD&T, 2D Drafting" },
  { name: "ANSYS Mechanical", tag: "FEA Simulation", icon: Activity, spec: "Static Structural, Modal, von Mises Stress" },
  { name: "Thermodynamics & Heat", tag: "Thermal Systems", icon: Flame, spec: "Heat Exchangers, Enthalpy Balance, HVAC" },
  { name: "Fluid & Pneumatics", tag: "Fluid Dynamics", icon: Wind, spec: "Compressible Flow, ISO 11011, Pipe Sizing" },
  { name: "Lean Six Sigma", tag: "Process Optimization", icon: Workflow, spec: "DMAIC, 5S, Kaizen, Waste Minimization" },
  { name: "Workshop Machining", tag: "Fabrication", icon: Wrench, spec: "Manual Lathe, Milling, TIG Welded Jigs" },
];

/* ------------------------------------------------------------------ */
/* INTERACTIVE SCHEMATICS (SVG Blueprint Visuals)                      */
/* ------------------------------------------------------------------ */

function SchematicVisual({ type }: { type: 'pneumatic' | 'energy' | 'bio' | 'kart' }) {
  if (type === 'pneumatic') {
    return (
      <div className="relative w-full h-44 bg-[#0a0d14] rounded-lg border border-white/10 p-3 overflow-hidden flex flex-col justify-between">
        <div className="flex items-center justify-between text-[10px] font-mono-cad text-zinc-400">
          <span className="flex items-center gap-1.5 text-[#ff5f15]">
            <span className="inline-block w-2 h-2 rounded-full bg-[#ff5f15] animate-ping" />
            ISO 11011 ACOUSTIC SPECTRUM
          </span>
          <span className="text-zinc-500">FREQ: 38.4 kHz // 7.2 BAR</span>
        </div>
        <div className="relative h-24 w-full flex items-center justify-center">
          <svg className="w-full h-full" viewBox="0 0 360 90" fill="none">
            <line x1="0" y1="45" x2="360" y2="45" stroke="rgba(255,255,255,0.08)" strokeDasharray="3 3" />
            <line x1="180" y1="0" x2="180" y2="90" stroke="rgba(255,255,255,0.08)" strokeDasharray="3 3" />
            <path
              d="M0 45 Q 30 42 60 45 T 120 45 Q 140 44 150 42 Q 165 10 180 8 Q 195 10 210 42 Q 220 45 270 45 T 360 45"
              stroke="#ff5f15"
              strokeWidth="2"
              fill="url(#pneumatic-grad)"
            />
            <circle cx="180" cy="12" r="4" fill="#ff5f15" className="animate-pulse" />
            <line x1="180" y1="18" x2="180" y2="45" stroke="#ff5f15" strokeWidth="1" strokeDasharray="2 2" />
            <text x="188" y="24" fill="#ff5f15" fontSize="9" fontFamily="monospace" fontWeight="bold">
              ORIFICE LEAK (-23%)
            </text>
            <text x="10" y="80" fill="#94a3b8" fontSize="8" fontFamily="monospace">
              HEADER PRESSURE: 7.2 BAR → 6.1 BAR (RESTORED)
            </text>
            <defs>
              <linearGradient id="pneumatic-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ff5f15" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#ff5f15" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className="flex justify-between items-center text-[10px] font-mono-cad border-t border-white/5 pt-1.5 text-zinc-400">
          <span>SAMPLING: 96 kS/s</span>
          <span className="text-[#ff5f15] font-semibold">LEAK SEALED: COMPLETE</span>
        </div>
      </div>
    );
  }

  if (type === 'energy') {
    return (
      <div className="relative w-full h-44 bg-[#0a0d14] rounded-lg border border-white/10 p-3 overflow-hidden flex flex-col justify-between">
        <div className="flex items-center justify-between text-[10px] font-mono-cad text-zinc-400">
          <span className="flex items-center gap-1.5 text-[#facc15]">
            <Gauge size={13} className="text-[#facc15]" />
            POWER FACTOR & THERMAL AUDIT
          </span>
          <span className="text-zinc-500">PF: 0.76 → 0.94</span>
        </div>
        <div className="relative h-24 w-full flex items-center justify-around px-2">
          <div className="flex flex-col items-center">
            <svg width="70" height="50" viewBox="0 0 70 50">
              <path d="M 10 45 A 25 25 0 0 1 60 45" stroke="#252d3d" strokeWidth="6" fill="none" strokeLinecap="round" />
              <path d="M 10 45 A 25 25 0 0 1 54 23" stroke="#facc15" strokeWidth="6" fill="none" strokeLinecap="round" />
              <circle cx="35" cy="45" r="4" fill="#facc15" />
              <line x1="35" y1="45" x2="52" y2="25" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <span className="text-[10px] font-mono-cad text-[#facc15] font-bold">PF 0.94 (OPT)</span>
          </div>
          <div className="flex flex-col gap-1 text-[10px] font-mono-cad">
            <div className="flex items-center justify-between gap-4">
              <span className="text-zinc-400">Boiler Thermal Loss:</span>
              <span className="text-emerald-400 font-semibold">-31%</span>
            </div>
            <div className="w-36 bg-zinc-800 h-1.5 rounded-full overflow-hidden">
              <div className="bg-emerald-500 h-full w-[69%]" />
            </div>
            <div className="flex items-center justify-between gap-4 mt-1">
              <span className="text-zinc-400">Peak Demand Shift:</span>
              <span className="text-[#ff5f15] font-semibold">-18.5 kW</span>
            </div>
            <div className="w-36 bg-zinc-800 h-1.5 rounded-full overflow-hidden">
              <div className="bg-[#ff5f15] h-full w-[82%]" />
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center text-[10px] font-mono-cad border-t border-white/5 pt-1.5 text-zinc-400">
          <span>APFC CAPACITOR STAGES: ACTIVE</span>
          <span className="text-emerald-400 font-semibold">PAYBACK: 8.4 MOS</span>
        </div>
      </div>
    );
  }

  if (type === 'bio') {
    return (
      <div className="relative w-full h-44 bg-[#0a0d14] rounded-lg border border-white/10 p-3 overflow-hidden flex flex-col justify-between">
        <div className="flex items-center justify-between text-[10px] font-mono-cad text-zinc-400">
          <span className="flex items-center gap-1.5 text-[#ff5f15]">
            <Flame size={13} className="text-[#ff5f15]" />
            NANO-CATALYST EMISSIONS ABATEMENT
          </span>
          <span className="text-zinc-500">B20 + TiO₂ / ZrO₂</span>
        </div>
        <div className="relative h-24 w-full flex items-center justify-between px-2">
          <div className="w-full space-y-2 text-[10px] font-mono-cad">
            <div>
              <div className="flex justify-between mb-0.5">
                <span className="text-zinc-400">Brake Thermal Efficiency (BTE)</span>
                <span className="text-emerald-400 font-bold">+8.2%</span>
              </div>
              <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden flex">
                <div className="bg-emerald-500 h-full w-[78%]" />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-0.5">
                <span className="text-zinc-400">NOx Exhaust Concentration</span>
                <span className="text-[#ff5f15] font-bold">-16.4%</span>
              </div>
              <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden flex">
                <div className="bg-[#ff5f15] h-full w-[45%]" />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-0.5">
                <span className="text-zinc-400">Smoke Opacity / Particulate</span>
                <span className="text-sky-400 font-bold">-21.0%</span>
              </div>
              <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden flex">
                <div className="bg-sky-500 h-full w-[40%]" />
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center text-[10px] font-mono-cad border-t border-white/5 pt-1.5 text-zinc-400">
          <span>PARTICLE GRAIN: 35nm</span>
          <span className="text-[#ff5f15] font-semibold">HOMOGENEOUS DISPERSION</span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-44 bg-[#0a0d14] rounded-lg border border-white/10 p-3 overflow-hidden flex flex-col justify-between">
      <div className="flex items-center justify-between text-[10px] font-mono-cad text-zinc-400">
        <span className="flex items-center gap-1.5 text-[#ff5f15]">
          <Car size={13} className="text-[#ff5f15]" />
          BFKCT CHASSIS FEA VON MISES STRESS
        </span>
        <span className="text-zinc-500">AISI 4130 CHROMOLY</span>
      </div>
      <div className="relative h-24 w-full flex items-center justify-center">
        <svg viewBox="0 0 340 85" className="w-full h-full" fill="none">
          <line x1="30" y1="55" x2="310" y2="55" stroke="#ff5f15" strokeWidth="2.5" />
          <line x1="60" y1="30" x2="280" y2="30" stroke="#94a3b8" strokeWidth="1.5" />
          <line x1="60" y1="30" x2="30" y2="55" stroke="#ff5f15" strokeWidth="2" />
          <line x1="280" y1="30" x2="310" y2="55" stroke="#ff5f15" strokeWidth="2" />
          <line x1="140" y1="30" x2="140" y2="55" stroke="#94a3b8" strokeWidth="1.5" />
          <line x1="210" y1="30" x2="210" y2="55" stroke="#94a3b8" strokeWidth="1.5" />
          <line x1="140" y1="55" x2="210" y2="30" stroke="#ff5f15" strokeWidth="1" strokeDasharray="3 2" />
          <rect x="18" y="44" width="16" height="22" rx="3" stroke="#ffffff" strokeWidth="1.5" fill="#121620" />
          <rect x="306" y="44" width="16" height="22" rx="3" stroke="#ffffff" strokeWidth="1.5" fill="#121620" />
          <circle cx="140" cy="55" r="5" fill="#ff5f15" className="animate-ping" />
          <circle cx="140" cy="55" r="3" fill="#ffffff" />
          <text x="150" y="70" fill="#ff5f15" fontSize="8" fontFamily="monospace" fontWeight="bold">
            VON MISES: 168 MPa (FOS 2.85)
          </text>
          <text x="70" y="22" fill="#94a3b8" fontSize="8" fontFamily="monospace">
            WHEELBASE: 1040mm // RIGIDITY: 1250 Nm/°
          </text>
        </svg>
      </div>
      <div className="flex justify-between items-center text-[10px] font-mono-cad border-t border-white/5 pt-1.5 text-zinc-400">
        <span>STEERING: 100% ACKERMANN</span>
        <span className="text-[#ff5f15] font-semibold">TRACK TESTED: PASSED</span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* MAIN COMPONENT: DEVELOPER PORTFOLIO FOR DHARANI KUMAR SUBBAN       */
/* ------------------------------------------------------------------ */

export default function MechanicalEngineerPortfolio() {
  const [isBuilding, setIsBuilding] = useState<boolean>(true);
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const [downloadedToast, setDownloadedToast] = useState<boolean>(false);
  const [activeSkillCategory, setActiveSkillCategory] = useState<string>('Data Analysis');
  const [currentTime, setCurrentTime] = useState<string>('');
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'transmitting' | 'sent'>('idle');
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [honeypot, setHoneypot] = useState<string>('');
  const [formError, setFormError] = useState<string | null>(null);
  const formMountTime = useRef<number>(Date.now());
  const lastSubmitTime = useRef<number>(0);

  // Instant CV Download Handler
  const handleDownloadCV = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    downloadCV('Dharani_Kumar_Subban_Mechanical_Engineer_CV.pdf');
    setDownloadedToast(true);
    setTimeout(() => setDownloadedToast(false), 4000);
  };

  // Lock body scroll and close modal on Escape key
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedProject(null);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedProject]);

  // 1. CUSTOM WRENCH CURSOR (Framer Motion with physics spring)
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springConfig = { damping: 28, stiffness: 450, mass: 0.4 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);
  const [isCursorHovered, setIsCursorHovered] = useState<boolean>(false);
  const [isCursorVisible, setIsCursorVisible] = useState<boolean>(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isCursorVisible) setIsCursorVisible(true);

      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = target.closest(
          'a, button, [role="button"], input, textarea, select, .laser-border-glow, .group, .cursor-pointer'
        );
        setIsCursorHovered(!!interactive);
      }
    };

    const handleMouseLeave = () => setIsCursorVisible(false);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [cursorX, cursorY, isCursorVisible]);

  // 2. GEAR-DRIVEN SCROLL PROGRESS INDICATOR
  const { scrollYProgress } = useScroll();
  const gearRotation = useTransform(scrollYProgress, [0, 1], [0, 720]);
  const counterGearRotation = useTransform(scrollYProgress, [0, 1], [0, -1440]);
  const [scrollPct, setScrollPct] = useState<number>(0);

  useEffect(() => {
    return scrollYProgress.on('change', (latest) => {
      setScrollPct(Math.round(latest * 100));
    });
  }, [scrollYProgress]);

  // 3. MECHANICAL PARALLAX ON BENTO SECTION
  const bentoRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: bentoScrollProgress } = useScroll({
    target: bentoRef,
    offset: ['start end', 'end start'],
  });

  const bentoIconParallax = useTransform(bentoScrollProgress, [0, 1], [-25, 25]);
  const bentoBadgeParallax = useTransform(bentoScrollProgress, [0, 1], [20, -20]);
  const bentoGearParallax = useTransform(bentoScrollProgress, [0, 1], [0, 120]);

  // Digital industrial clock readout
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' }) + ' UTC'
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('dharani.subban@engineering-mech.co.uk');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    // 1. Honeypot Bot Trap: If hidden bot field is filled, silently discard spam
    if (honeypot) {
      setFormStatus('sent');
      setTimeout(() => setFormStatus('idle'), 3000);
      return;
    }

    // 2. Automated Script Detection: Form submitted abnormally fast (< 1.2s)
    if (Date.now() - formMountTime.current < 1200) {
      setFormError('SECURITY PROTOCOL: Rapid automated submission rejected by Shield.');
      return;
    }

    // 3. Rate-Limiting Protection: Enforce 10-second cooldown between transmissions
    if (Date.now() - lastSubmitTime.current < 10000) {
      setFormError('RATE LIMIT: Telemetry cooldown active. Please wait 10 seconds.');
      return;
    }

    // 4. Input Sanitization & RFC Email Validation
    const cleanEmail = formData.email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      setFormError('INVALID COMM CHANNEL: Please enter a verified email address.');
      return;
    }

    if (!formData.name.trim() || !formData.message.trim()) {
      setFormError('PAYLOAD INSUFFICIENT: Please fill out both identifier name and message payload.');
      return;
    }

    lastSubmitTime.current = Date.now();
    setFormStatus('transmitting');
    setTimeout(() => {
      setFormStatus('sent');
      setTimeout(() => {
        setFormData({ name: '', email: '', subject: '', message: '' });
        setFormStatus('idle');
      }, 4000);
    }, 1200);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#080a0f] text-[#f1f5f9] selection:bg-[#ff5f15] selection:text-black relative md:cursor-none overflow-x-hidden">
      {/* ------------------------------------------------------------ */}
      {/* 0. GLOBAL GATEKEEPER "SWARM REBUILD" PRELOADER OVERLAY       */}
      {/* ------------------------------------------------------------ */}
      <AnimatePresence>
        {isBuilding && (
          <SwarmPreloader onComplete={() => setIsBuilding(false)} />
        )}
      </AnimatePresence>

      {/* ------------------------------------------------------------ */}
      {/* 1. CUSTOM MECHANICAL WRENCH CURSOR (Only active when ready)  */}
      {/* ------------------------------------------------------------ */}
      {!isBuilding && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block"
            style={{
              x: smoothX,
              y: smoothY,
              translateX: '-35%',
              translateY: '-35%',
              opacity: isCursorVisible ? 1 : 0,
            }}
          >
            <motion.div
              animate={{
                rotate: isCursorHovered ? 45 : 0,
                scale: isCursorHovered ? 1.35 : 1,
              }}
              transition={{ type: 'spring', damping: 18, stiffness: 350 }}
              className={`relative flex items-center justify-center p-2 rounded-full transition-colors ${
                isCursorHovered
                  ? 'text-[#ff5f15] drop-shadow-[0_0_14px_rgba(255,95,21,0.9)]'
                  : 'text-zinc-300 drop-shadow-[0_0_6px_rgba(255,255,255,0.4)]'
              }`}
            >
              <span
                className={`absolute w-1.5 h-1.5 rounded-full transition-all ${
                  isCursorHovered ? 'bg-[#ff5f15] shadow-[0_0_8px_#ff5f15] scale-125' : 'bg-white/80'
                }`}
              />
              <Wrench size={isCursorHovered ? 26 : 22} className="stroke-[2.5]" />

              <span
                className={`absolute -top-1 -right-1 font-mono-cad text-[8px] font-bold tracking-tighter ${
                  isCursorHovered ? 'text-[#ff5f15]' : 'text-zinc-500'
                }`}
              >
                {isCursorHovered ? 'LOCK' : 'ENG'}
              </span>
            </motion.div>
          </motion.div>
        )}

        {/* ------------------------------------------------------------ */}
        {/* 2. GEAR-DRIVEN SCROLL PROGRESS INDICATOR (Bottom Right)      */}
        {/* ------------------------------------------------------------ */}
        {!isBuilding && (
          <div className="fixed bottom-6 right-6 z-40 flex flex-col items-center">
        <motion.div
          onClick={scrollToTop}
          title="Scroll Telemetry & Return to Top"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#0d1017] border-2 border-white/20 hover:border-[#ff5f15] flex items-center justify-center cursor-pointer shadow-[0_0_25px_rgba(0,0,0,0.8)] hover:shadow-[0_0_20px_rgba(255,95,21,0.5)] transition-all group overflow-hidden"
        >
          <div className="absolute inset-0 bg-radial from-[#151a24] via-[#0d1017] to-[#050608] opacity-90" />

          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="46" stroke="#252d3d" strokeWidth="1.5" strokeDasharray="3 3" fill="none" />
            <circle
              cx="50"
              cy="50"
              r="46"
              stroke="#ff5f15"
              strokeWidth="2"
              strokeDasharray="290"
              strokeDashoffset={290 - (290 * scrollPct) / 100}
              strokeLinecap="round"
              fill="none"
              className="transition-[stroke-dashoffset] duration-150"
            />
          </svg>

          <motion.div
            style={{ rotate: gearRotation }}
            className="relative z-10 text-[#ff5f15] group-hover:text-[#ff7a38] transition-colors"
          >
            <Cog size={30} className="stroke-[2.2]" />
          </motion.div>

          <motion.div
            style={{ rotate: counterGearRotation }}
            className="absolute top-1.5 right-1.5 z-10 text-[#facc15] opacity-80"
          >
            <Settings size={14} className="stroke-[2]" />
          </motion.div>

          <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-[#080a0f]/80 backdrop-blur-xs text-[#ff5f15]">
            <ArrowUp size={18} className="stroke-[3] -translate-y-0.5" />
          </div>
        </motion.div>

          <div className="mt-1.5 px-2 py-0.5 rounded bg-[#0d1017] border border-white/10 text-[10px] font-mono-cad text-zinc-300 font-bold flex items-center gap-1 shadow-md">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff5f15] animate-pulse" />
            <span>{scrollPct}%</span>
            <span className="text-zinc-600">CAD</span>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------ */}
      {/* 3. ACTUAL PORTFOLIO COMPONENTS (Fully preloaded & mounted)   */}
      {/* ------------------------------------------------------------ */}
      <motion.div
        animate={{
          opacity: isBuilding ? 0.2 : 1,
          filter: isBuilding ? 'blur(1.5px)' : 'blur(0px)',
          scale: isBuilding ? 0.99 : 1,
        }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={`w-full relative z-10 ${
          isBuilding ? 'pointer-events-none select-none max-h-screen overflow-hidden' : ''
        }`}
      >
        {/* Background CAD grid */}
        <div className="fixed inset-0 bg-cad-grid pointer-events-none opacity-40 -z-10" />
        <div className="fixed inset-0 bg-gradient-to-b from-transparent via-[#080a0f]/60 to-[#080a0f] pointer-events-none -z-10" />

        {/* ------------------------------------------------------------ */}
        {/* TOP SYSTEM STATUS BAR & NAVIGATION                           */}
        {/* ------------------------------------------------------------ */}
        <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#080a0f]/90 border-b border-white/10">
        <div className="hidden md:flex items-center justify-between px-6 py-1 bg-[#050608] border-b border-white/5 text-[11px] font-mono-cad text-zinc-400">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-zinc-300">
              <span className="w-2 h-2 rounded-full bg-[#ff5f15] animate-pulse" />
              SYSTEM TELEMETRY: NOMINAL
            </span>
            <span className="text-zinc-600">|</span>
            <span>SPEC: ISO 9001 &amp; ISO 11011 AUDITED</span>
            <span className="text-zinc-600">|</span>
            <span className="text-zinc-300">DEGREE: M.S. MECHANICAL ENGINEERING (2026)</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-zinc-400">TIME: {currentTime || '12:00:00 UTC'}</span>
            <span className="text-zinc-600">|</span>
            <span className="text-[#ff5f15] font-semibold">BASE: LONDON, UK</span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded bg-[#121620] border border-[#ff5f15]/60 flex items-center justify-center text-[#ff5f15] group-hover:shadow-[0_0_15px_rgba(255,95,21,0.5)] transition-all">
              <Cog size={20} className="animate-[spin_8s_linear_infinite]" />
            </div>
            <div>
              <div className="font-extrabold tracking-tight text-white flex items-center gap-1.5 text-sm sm:text-base">
                DHARANI KUMAR SUBBAN
                <span className="text-[10px] font-mono-cad bg-[#ff5f15]/15 text-[#ff5f15] px-1.5 py-0.5 rounded border border-[#ff5f15]/30">
                  MECH ENG
                </span>
              </div>
              <div className="text-[10px] font-mono-cad text-zinc-400 tracking-wider">
                PROCESS OPTIMIZATION &bull; SAFETY COMPLIANCE
              </div>
            </div>
          </a>

          <nav className="hidden lg:flex items-center gap-6 text-xs font-mono-cad tracking-wider uppercase">
            <a href="#projects" className="text-zinc-400 hover:text-[#ff5f15] transition-colors flex items-center gap-1">
              <span className="text-[#ff5f15]">//</span> 01. Engineered Systems
            </a>
            <a href="#education" className="text-zinc-400 hover:text-[#ff5f15] transition-colors flex items-center gap-1">
              <span className="text-[#ff5f15]">//</span> 02. Education
            </a>
            <a href="#experience" className="text-zinc-400 hover:text-[#ff5f15] transition-colors flex items-center gap-1">
              <span className="text-[#ff5f15]">//</span> 03. Operations Track
            </a>
            <a href="#skills" className="text-zinc-400 hover:text-[#ff5f15] transition-colors flex items-center gap-1">
              <span className="text-[#ff5f15]">//</span> 04. Skills Matrix
            </a>
            <a href="#contact" className="text-zinc-400 hover:text-[#ff5f15] transition-colors flex items-center gap-1">
              <span className="text-[#ff5f15]">//</span> 05. Comms Console
            </a>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="#contact"
              className="px-3 py-1.5 rounded bg-[#ff5f15] text-[#050608] font-bold text-xs font-mono-cad hover:bg-[#ff7a38] transition-all shadow-[0_0_15px_rgba(255,95,21,0.3)] flex items-center gap-1.5"
            >
              <Terminal size={14} />
              <span className="hidden sm:inline">INITIALIZE</span> COMMS
            </a>
          </div>
        </div>
      </header>

      {/* ------------------------------------------------------------ */}
      {/* HERO SECTION: HEAVY INDUSTRIAL BRUTALISM                     */}
      {/* ------------------------------------------------------------ */}
      <section className="relative z-10 pt-14 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-white/10 overflow-hidden">
        <div className="absolute top-4 left-4 text-zinc-600 font-mono-cad text-[10px] pointer-events-none select-none">
          + LAT: 51.5074° N // LNG: 0.1278° W [CAD GRD: 01-A]
        </div>
        <div className="absolute top-4 right-4 text-zinc-600 font-mono-cad text-[10px] pointer-events-none select-none">
          DOC ID: DKS-MECH-2026-PORTFOLIO // REV: D
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#121620] border border-[#ff5f15]/40 text-[#ff5f15] text-xs font-mono-cad tracking-wider"
            >
              <Crosshair size={13} className="text-[#ff5f15]" />
              <span>MECHANICAL ENGINEER &bull; M.S. CANDIDATE (UEL 2026)</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tighter text-white uppercase leading-[1.02]">
                Dharani Kumar <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff5f15] via-[#ff7a38] to-[#facc15]">
                  Subban
                </span>
              </h1>
              <p className="mt-2 text-xl sm:text-2xl font-bold tracking-tight text-zinc-300 font-mono-cad">
                MECHANICAL ENGINEER
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-4"
            >
              <div className="p-4 rounded-lg bg-[#0d1017] border-l-4 border-[#ff5f15] border-y border-r border-white/5">
                <p className="text-sm sm:text-base font-semibold text-zinc-200 uppercase tracking-wide font-mono-cad">
                  Core Mandate: Process Optimization &bull; Safety Compliance &bull; Streamlined Workflows
                </p>
              </div>

              <p className="text-zinc-400 text-sm sm:text-base leading-relaxed max-w-2xl">
                Bridging rigorous analytical engineering (SolidWorks CAD, ANSYS FEA, thermodynamic balancing, ultrasonic acoustic diagnostics) with high-stakes operational execution. Proven across stadium-scale crowd safety, institutional data architectures, and lean industrial logistics.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <a
                href="#projects"
                className="px-6 py-3 rounded-md bg-[#ff5f15] text-[#050608] font-black text-sm tracking-wide font-mono-cad uppercase hover:bg-[#ff7a38] transition-all shadow-[0_0_25px_rgba(255,95,21,0.4)] flex items-center gap-2 group"
              >
                <span>EXPLORE BENTO SYSTEMS</span>
                <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </a>

              <button
                type="button"
                onClick={handleDownloadCV}
                className="px-6 py-3 rounded-md bg-[#121620] border border-white/20 text-white font-bold text-sm tracking-wide font-mono-cad uppercase hover:border-[#ff5f15] hover:text-[#ff5f15] transition-all flex items-center gap-2 cursor-pointer shadow-lg hover:shadow-[0_0_15px_rgba(255,95,21,0.25)]"
              >
                <Download size={16} className="text-[#ff5f15]" />
                <span>TECHNICAL DOSSIER / CV [PDF]</span>
              </button>

              <button
                onClick={handleCopyEmail}
                className="px-4 py-3 rounded-md bg-[#0d1017] border border-white/10 text-zinc-400 hover:text-white hover:border-white/20 transition-all text-xs font-mono-cad flex items-center gap-2"
              >
                {copiedEmail ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                <span>{copiedEmail ? 'COPIED TO CLIPBOARD' : 'COPY DIRECT EMAIL'}</span>
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-white/10 font-mono-cad text-xs"
            >
              <div className="bg-[#0d1017] p-2.5 rounded border border-white/5">
                <div className="text-[#ff5f15] font-bold text-lg">23% CUT</div>
                <div className="text-zinc-500 text-[10px]">Air Energy Leakage</div>
              </div>
              <div className="bg-[#0d1017] p-2.5 rounded border border-white/5">
                <div className="text-[#facc15] font-bold text-lg">80K+ PAX</div>
                <div className="text-zinc-500 text-[10px]">Wembley Crowd Safety</div>
              </div>
              <div className="bg-[#0d1017] p-2.5 rounded border border-white/5">
                <div className="text-white font-bold text-lg">01 / 2026</div>
                <div className="text-zinc-500 text-[10px]">M.S. Mech Target</div>
              </div>
              <div className="bg-[#0d1017] p-2.5 rounded border border-white/5">
                <div className="text-emerald-400 font-bold text-lg">100%</div>
                <div className="text-zinc-500 text-[10px]">Audit Compliance</div>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-5">
            {/* Interactive Engineering Schematic / Active Rotating Gear Assembly */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative p-6 rounded-xl bg-[#0d1017] border border-white/15 laser-border-glow shadow-2xl overflow-hidden tech-corners"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4 font-mono-cad text-xs text-zinc-400">
                <div className="flex items-center gap-2">
                  <Ruler size={14} className="text-[#ff5f15]" />
                  <span>CAD SPECIFICATION: ASSEMBLY FIG. 01</span>
                </div>
                <span className="text-[#ff5f15] bg-[#ff5f15]/10 px-2.5 py-0.5 rounded text-[10px] border border-[#ff5f15]/30 font-bold uppercase tracking-wider">
                  ACTIVE GEAR TRAIN
                </span>
              </div>

              {/* Active Multi-Gear Mechanical Assembly */}
              <ActiveGearAssembly />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ */}
      {/* 3. MODULAR BENTO GRID (WITH MECHANICAL PARALLAX EFFECTS)     */}
      {/* ------------------------------------------------------------ */}
      <section id="projects" ref={bentoRef} className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-white/10 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono-cad text-[#ff5f15] uppercase tracking-widest mb-2">
              <Layers size={14} />
              <span>Section 01 // Modular Bento Matrix</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
              Engineered Systems
            </h2>
            <p className="mt-2 text-zinc-400 text-sm max-w-xl">
              Physical engineering research, industrial diagnostic rigs, and mechanical fabrication projects executed with rigorous data validation.
            </p>
          </div>
          <div className="mt-4 md:mt-0 font-mono-cad text-xs text-zinc-500 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#ff5f15] animate-ping" />
            <span>[PARALLAX MOTION ACTIVE &bull; CLICK FOR CAD BLUEPRINT]</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">

          {/* Bento Item 1: Compressed Air Leak Detection (7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            onClick={() => setSelectedProject(PROJECTS[0])}
            className="lg:col-span-7 bg-[#0d1017] rounded-xl border border-white/15 p-6 hover:border-[#ff5f15] transition-all cursor-pointer group laser-border-glow tech-corners flex flex-col justify-between overflow-hidden relative"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <motion.div
                    style={{ y: bentoIconParallax }}
                    className="p-2.5 rounded-lg bg-[#151a24] text-[#ff5f15] border border-white/10 group-hover:border-[#ff5f15]/50 group-hover:shadow-[0_0_15px_rgba(255,95,21,0.3)] transition-all"
                  >
                    <Wind size={22} />
                  </motion.div>
                  <div>
                    <span className="text-[11px] font-mono-cad text-[#ff5f15] tracking-wider uppercase font-semibold">
                      {PROJECTS[0].code}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight group-hover:text-[#ff5f15] transition-colors">
                      {PROJECTS[0].title}
                    </h3>
                  </div>
                </div>
                <div className="p-2 rounded bg-white/5 text-zinc-400 group-hover:text-[#ff5f15] transition-colors">
                  <Maximize2 size={16} />
                </div>
              </div>

              <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                {PROJECTS[0].summary}
              </p>

              <motion.div style={{ y: bentoBadgeParallax }} className="mb-6">
                <SchematicVisual type="pneumatic" />
              </motion.div>
            </div>

            <div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4 font-mono-cad">
                {PROJECTS[0].metrics.map((m, i) => (
                  <div key={i} className="p-2.5 rounded bg-[#121620] border border-white/5">
                    <div className="text-[10px] text-zinc-500 uppercase">{m.label}</div>
                    <div className="text-sm font-bold text-white mt-0.5">{m.value}</div>
                    {m.delta && <div className="text-[10px] text-[#ff5f15]">{m.delta}</div>}
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/10">
                {PROJECTS[0].tags.map((t, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] font-mono-cad px-2.5 py-0.5 rounded bg-[#121620] text-zinc-300 border border-white/5"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Bento Item 2: Energy Efficiency in Small Industries (5 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            onClick={() => setSelectedProject(PROJECTS[1])}
            className="lg:col-span-5 bg-[#0d1017] rounded-xl border border-white/15 p-6 hover:border-[#ff5f15] transition-all cursor-pointer group laser-border-glow tech-corners flex flex-col justify-between overflow-hidden relative"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <motion.div
                    style={{ y: bentoIconParallax, rotate: bentoGearParallax }}
                    className="p-2.5 rounded-lg bg-[#151a24] text-[#facc15] border border-white/10 group-hover:border-[#facc15]/50 group-hover:shadow-[0_0_15px_rgba(250,204,21,0.3)] transition-all"
                  >
                    <Factory size={22} />
                  </motion.div>
                  <div>
                    <span className="text-[11px] font-mono-cad text-[#facc15] tracking-wider uppercase font-semibold">
                      {PROJECTS[1].code}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight group-hover:text-[#facc15] transition-colors">
                      {PROJECTS[1].title}
                    </h3>
                  </div>
                </div>
                <div className="p-2 rounded bg-white/5 text-zinc-400 group-hover:text-[#facc15] transition-colors">
                  <Maximize2 size={16} />
                </div>
              </div>

              <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                {PROJECTS[1].summary}
              </p>

              <motion.div style={{ y: bentoBadgeParallax }} className="mb-6">
                <SchematicVisual type="energy" />
              </motion.div>
            </div>

            <div>
              <div className="grid grid-cols-2 gap-2 mb-4 font-mono-cad">
                {PROJECTS[1].metrics.map((m, i) => (
                  <div key={i} className="p-2.5 rounded bg-[#121620] border border-white/5">
                    <div className="text-[10px] text-zinc-500 uppercase">{m.label}</div>
                    <div className="text-sm font-bold text-white mt-0.5">{m.value}</div>
                    {m.delta && <div className="text-[10px] text-emerald-400">{m.delta}</div>}
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/10">
                {PROJECTS[1].tags.slice(0, 3).map((t, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] font-mono-cad px-2.5 py-0.5 rounded bg-[#121620] text-zinc-300 border border-white/5"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Bento Item 3: TiO2 & ZrO2 Biodiesel Blends (6 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            onClick={() => setSelectedProject(PROJECTS[2])}
            className="lg:col-span-6 bg-[#0d1017] rounded-xl border border-white/15 p-6 hover:border-[#ff5f15] transition-all cursor-pointer group laser-border-glow tech-corners flex flex-col justify-between overflow-hidden relative"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <motion.div
                    style={{ y: bentoIconParallax }}
                    className="p-2.5 rounded-lg bg-[#151a24] text-[#ff5f15] border border-white/10 group-hover:border-[#ff5f15]/50 group-hover:shadow-[0_0_15px_rgba(255,95,21,0.3)] transition-all"
                  >
                    <Flame size={22} />
                  </motion.div>
                  <div>
                    <span className="text-[11px] font-mono-cad text-[#ff5f15] tracking-wider uppercase font-semibold">
                      {PROJECTS[2].code}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight group-hover:text-[#ff5f15] transition-colors">
                      {PROJECTS[2].title}
                    </h3>
                  </div>
                </div>
                <div className="p-2 rounded bg-white/5 text-zinc-400 group-hover:text-[#ff5f15] transition-colors">
                  <Maximize2 size={16} />
                </div>
              </div>

              <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                {PROJECTS[2].summary}
              </p>

              <motion.div style={{ y: bentoBadgeParallax }} className="mb-6">
                <SchematicVisual type="bio" />
              </motion.div>
            </div>

            <div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4 font-mono-cad">
                {PROJECTS[2].metrics.map((m, i) => (
                  <div key={i} className="p-2.5 rounded bg-[#121620] border border-white/5">
                    <div className="text-[10px] text-zinc-500 uppercase">{m.label}</div>
                    <div className="text-sm font-bold text-white mt-0.5">{m.value}</div>
                    {m.delta && <div className="text-[10px] text-[#ff5f15]">{m.delta}</div>}
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/10">
                {PROJECTS[2].tags.map((t, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] font-mono-cad px-2.5 py-0.5 rounded bg-[#121620] text-zinc-300 border border-white/5"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Bento Item 4: Go-kart BFKCT (6 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            onClick={() => setSelectedProject(PROJECTS[3])}
            className="lg:col-span-6 bg-[#0d1017] rounded-xl border border-white/15 p-6 hover:border-[#ff5f15] transition-all cursor-pointer group laser-border-glow tech-corners flex flex-col justify-between overflow-hidden relative"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <motion.div
                    style={{ y: bentoIconParallax }}
                    className="p-2.5 rounded-lg bg-[#151a24] text-[#ff5f15] border border-white/10 group-hover:border-[#ff5f15]/50 group-hover:shadow-[0_0_15px_rgba(255,95,21,0.3)] transition-all"
                  >
                    <Car size={22} />
                  </motion.div>
                  <div>
                    <span className="text-[11px] font-mono-cad text-[#ff5f15] tracking-wider uppercase font-semibold">
                      {PROJECTS[3].code}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight group-hover:text-[#ff5f15] transition-colors">
                      {PROJECTS[3].title}
                    </h3>
                  </div>
                </div>
                <div className="p-2 rounded bg-white/5 text-zinc-400 group-hover:text-[#ff5f15] transition-colors">
                  <Maximize2 size={16} />
                </div>
              </div>

              <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                {PROJECTS[3].summary}
              </p>

              <motion.div style={{ y: bentoBadgeParallax }} className="mb-6">
                <SchematicVisual type="kart" />
              </motion.div>
            </div>

            <div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4 font-mono-cad">
                {PROJECTS[3].metrics.map((m, i) => (
                  <div key={i} className="p-2.5 rounded bg-[#121620] border border-white/5">
                    <div className="text-[10px] text-zinc-500 uppercase">{m.label}</div>
                    <div className="text-sm font-bold text-white mt-0.5">{m.value}</div>
                    {m.delta && <div className="text-[10px] text-[#ff5f15]">{m.delta}</div>}
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/10">
                {PROJECTS[3].tags.map((t, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] font-mono-cad px-2.5 py-0.5 rounded bg-[#121620] text-zinc-300 border border-white/5"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ------------------------------------------------------------ */}
      {/* EDUCATION SECTION (BENTO CREDENTIAL MATRIX)                  */}
      {/* ------------------------------------------------------------ */}
      <section id="education" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/10 relative z-10">
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-mono-cad text-[#ff5f15] uppercase tracking-widest mb-2">
            <GraduationCap size={14} />
            <span>Section 02 // Academic Qualifications</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
            Education &amp; Credentials
          </h2>
          <p className="mt-2 text-zinc-400 text-sm max-w-xl">
            Formal mechanical engineering foundations spanning computational fluid dynamics, thermodynamics, machine design, and advanced research.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="p-8 rounded-xl bg-[#0d1017] border border-white/15 laser-border-glow tech-corners flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-2.5 py-1 rounded bg-[#ff5f15]/15 text-[#ff5f15] font-mono-cad text-xs font-semibold border border-[#ff5f15]/30">
                  CURRENT DEGREE PROGRAM
                </span>
                <span className="font-mono-cad text-xs text-zinc-400 flex items-center gap-1.5">
                  <Clock size={13} className="text-[#ff5f15]" />
                  EXPECTED: 01 / 2026
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Master of Science (M.S.)
              </h3>
              <div className="text-lg font-bold text-[#ff5f15] font-mono-cad mt-1">
                MECHANICAL ENGINEERING
              </div>
              <div className="text-zinc-300 font-medium text-base mt-2 flex items-center gap-2">
                <MapPin size={16} className="text-zinc-500" />
                University Of East London, United Kingdom
              </div>

              <div className="mt-6 space-y-3 text-sm text-zinc-400">
                <p>
                  Specialized curriculum focusing on advanced computational modeling, energy system sustainability, and applied research methodologies in thermodynamics and fluid systems.
                </p>
                <div className="pt-2">
                  <span className="text-xs font-mono-cad text-zinc-300 uppercase tracking-wider block mb-2 font-semibold">
                    Core Coursework &amp; Research:
                  </span>
                  <div className="flex flex-wrap gap-2 font-mono-cad text-xs">
                    <span className="px-2 py-1 rounded bg-[#121620] text-zinc-300 border border-white/5">
                      Computational Fluid Dynamics (CFD)
                    </span>
                    <span className="px-2 py-1 rounded bg-[#121620] text-zinc-300 border border-white/5">
                      Advanced Thermodynamics
                    </span>
                    <span className="px-2 py-1 rounded bg-[#121620] text-zinc-300 border border-white/5">
                      Sustainable Energy Systems
                    </span>
                    <span className="px-2 py-1 rounded bg-[#121620] text-zinc-300 border border-white/5">
                      Finite Element Methods
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono-cad text-zinc-400">
              <span>STATUS: IN PROGRESS</span>
              <span className="text-[#ff5f15] font-semibold">LONDON CAMPUS</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="p-8 rounded-xl bg-[#0d1017] border border-white/15 laser-border-glow tech-corners flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-2.5 py-1 rounded bg-emerald-500/15 text-emerald-400 font-mono-cad text-xs font-semibold border border-emerald-500/30">
                  CONFERRED DEGREE
                </span>
                <span className="font-mono-cad text-xs text-zinc-400 flex items-center gap-1.5">
                  <CheckCircle2 size={13} className="text-emerald-400" />
                  GRADUATED: 05 / 2020
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Bachelor of Engineering (B.E.)
              </h3>
              <div className="text-lg font-bold text-zinc-200 font-mono-cad mt-1">
                MECHANICAL ENGINEERING
              </div>
              <div className="text-zinc-300 font-medium text-base mt-2 flex items-center gap-2">
                <MapPin size={16} className="text-zinc-500" />
                Sathyabama University, Chennai, India
              </div>

              <div className="mt-6 space-y-3 text-sm text-zinc-400">
                <p>
                  Comprehensive 4-year technical degree completed with First Class standing. Developed fundamental mechanical design principles, machine kinematics, manufacturing processes, and materials testing.
                </p>
                <div className="pt-2">
                  <span className="text-xs font-mono-cad text-zinc-300 uppercase tracking-wider block mb-2 font-semibold">
                    Core Coursework &amp; Practicum:
                  </span>
                  <div className="flex flex-wrap gap-2 font-mono-cad text-xs">
                    <span className="px-2 py-1 rounded bg-[#121620] text-zinc-300 border border-white/5">
                      Design of Transmission Systems
                    </span>
                    <span className="px-2 py-1 rounded bg-[#121620] text-zinc-300 border border-white/5">
                      Kinematics &amp; Dynamics of Machinery
                    </span>
                    <span className="px-2 py-1 rounded bg-[#121620] text-zinc-300 border border-white/5">
                      Heat &amp; Mass Transfer
                    </span>
                    <span className="px-2 py-1 rounded bg-[#121620] text-zinc-300 border border-white/5">
                      Manufacturing Technology &amp; Metrology
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono-cad text-zinc-400">
              <span>HONORS: FIRST CLASS</span>
              <span className="text-emerald-400 font-semibold">VERIFIED CREDENTIAL</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ------------------------------------------------------------ */}
      {/* WORK HISTORY: PROCESS & LOGISTICS TRACK                      */}
      {/* ------------------------------------------------------------ */}
      <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/10 relative z-10">
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-mono-cad text-[#ff5f15] uppercase tracking-widest mb-2">
            <Workflow size={14} />
            <span>Section 03 // Operational Trajectory</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
            Work History &amp; Logistics Track
          </h2>
          <p className="mt-2 text-zinc-400 text-sm max-w-xl">
            Real-world operational execution across high-density crowd management, logistics accuracy, institutional data flow, and food safety protocols.
          </p>
        </div>

        <div className="relative pl-6 sm:pl-10 space-y-12 before:absolute before:left-[11px] sm:before:left-[15px] before:top-3 before:bottom-3 before:w-[2px] before:bg-gradient-to-b before:from-[#ff5f15] before:via-white/20 before:to-[#ff5f15]/30">
          {WORK_HISTORY.map((job, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative"
            >
              <div className="absolute -left-[30px] sm:-left-[38px] top-1.5 w-6 h-6 rounded-full bg-[#080a0f] border-2 border-[#ff5f15] flex items-center justify-center shadow-[0_0_10px_rgba(255,95,21,0.5)]">
                <div className="w-2 h-2 rounded-full bg-[#ff5f15]" />
              </div>

              <div className="p-6 sm:p-8 rounded-xl bg-[#0d1017] border border-white/15 laser-border-glow tech-corners">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4 mb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono-cad text-[#ff5f15] tracking-wider uppercase font-bold">
                        {job.type}
                      </span>
                      <span className="text-zinc-600">&bull;</span>
                      <span className="text-xs font-mono-cad text-zinc-400">{job.location}</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-1">
                      {job.role}
                    </h3>
                    <div className="text-base font-bold text-zinc-300 font-mono-cad">
                      {job.company}
                    </div>
                  </div>

                  <div className="px-3 py-1 rounded bg-[#121620] border border-white/10 text-xs font-mono-cad text-zinc-300 self-start sm:self-center font-semibold">
                    {job.timeline}
                  </div>
                </div>

                <ul className="space-y-2.5 text-sm text-zinc-400 mb-6">
                  {job.points.map((pt, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-2.5">
                      <CornerDownRight size={15} className="text-[#ff5f15] mt-1 shrink-0" />
                      <span className="leading-relaxed">{pt}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 font-mono-cad text-xs">
                  <div className="flex flex-wrap gap-1.5">
                    {job.badges.map((b, bIdx) => (
                      <span
                        key={bIdx}
                        className="px-2.5 py-1 rounded bg-[#121620] text-zinc-300 border border-white/5 text-[11px]"
                      >
                        {b}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-3 text-zinc-400">
                    <span className="text-emerald-400 font-semibold">{job.telemetry.metric1}</span>
                    <span className="text-zinc-600">|</span>
                    <span className="text-[#ff5f15] font-semibold">{job.telemetry.metric2}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------------ */}
      {/* TECHNICAL SPECIFICATIONS: SKILLS MATRIX                      */}
      {/* ------------------------------------------------------------ */}
      <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/10 relative z-10">
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-mono-cad text-[#ff5f15] uppercase tracking-widest mb-2">
            <Cpu size={14} />
            <span>Section 04 // Capability Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
            Technical Specifications &amp; Skills Matrix
          </h2>
          <p className="mt-2 text-zinc-400 text-sm max-w-xl">
            Quantitative assessment of core analytical competencies, rapid problem-solving frameworks, financial evaluation, and domain CAD/FEA utilities.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mb-8 border-b border-white/10 pb-4">
          {SKILLS_MATRIX.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeSkillCategory === cat.category;
            return (
              <button
                key={cat.category}
                onClick={() => setActiveSkillCategory(cat.category)}
                className={`px-4 py-2 rounded font-mono-cad text-xs uppercase tracking-wider flex items-center gap-2 transition-all ${
                  isActive
                    ? 'bg-[#ff5f15] text-[#050608] font-bold shadow-[0_0_15px_rgba(255,95,21,0.4)]'
                    : 'bg-[#0d1017] text-zinc-400 border border-white/10 hover:border-white/30 hover:text-white'
                }`}
              >
                <Icon size={14} />
                <span>{cat.category}</span>
              </button>
            );
          })}
        </div>

        {SKILLS_MATRIX.filter((c) => c.category === activeSkillCategory).map((cat) => (
          <motion.div
            key={cat.category}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="p-8 rounded-xl bg-[#0d1017] border border-white/15 laser-border-glow tech-corners mb-12"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-white/10">
              <div>
                <span className="text-xs font-mono-cad text-[#ff5f15] font-semibold">
                  SPECIFICATION CODE: {cat.code}
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">
                  {cat.category} Competency Architecture
                </h3>
                <p className="text-sm text-zinc-400 mt-1 max-w-2xl">{cat.summary}</p>
              </div>
              <div className="flex items-center gap-3 bg-[#121620] px-4 py-2.5 rounded border border-white/10 self-start sm:self-center">
                <span className="text-xs font-mono-cad text-zinc-400 uppercase">PROFICIENCY SCORE</span>
                <span className="text-2xl font-black text-[#ff5f15] font-mono-cad">{cat.score}%</span>
              </div>
            </div>

            <div className="space-y-5">
              {cat.items.map((item, idx) => (
                <div key={idx}>
                  <div className="flex justify-between items-center text-xs font-mono-cad mb-1.5">
                    <span className="text-zinc-200 font-semibold">{item.name}</span>
                    <span className="text-[#ff5f15] font-mono-cad font-bold">{item.level}%</span>
                  </div>
                  <div className="w-full bg-[#151a24] h-2.5 rounded-sm overflow-hidden border border-white/5">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.level}%` }}
                      transition={{ duration: 0.8, delay: idx * 0.1 }}
                      className="bg-gradient-to-r from-[#ff5f15] to-[#facc15] h-full rounded-sm"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}

        <div className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-lg font-black text-white uppercase font-mono-cad flex items-center gap-2">
              <Compass size={18} className="text-[#ff5f15]" />
              Domain Engineering &amp; Computational CAD/FEA Stack
            </h4>
            <span className="text-xs font-mono-cad text-zinc-500">6 CORE TOOLS</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {DOMAIN_ENGINEERING_TOOLS.map((tool, idx) => {
              const ToolIcon = tool.icon;
              return (
                <div
                  key={idx}
                  className="p-5 rounded-lg bg-[#0d1017] border border-white/10 hover:border-[#ff5f15]/50 transition-all group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2 rounded bg-[#121620] text-[#ff5f15] border border-white/10 group-hover:shadow-[0_0_10px_rgba(255,95,21,0.3)] transition-all">
                      <ToolIcon size={18} />
                    </div>
                    <span className="text-[10px] font-mono-cad px-2 py-0.5 rounded bg-white/5 text-zinc-400">
                      {tool.tag}
                    </span>
                  </div>
                  <div className="font-bold text-white text-base group-hover:text-[#ff5f15] transition-colors">
                    {tool.name}
                  </div>
                  <div className="text-xs text-zinc-400 font-mono-cad mt-1 leading-relaxed">
                    {tool.spec}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ */}
      {/* COMMS CONSOLE & CONTACT DIAGNOSTIC INTERFACE                */}
      {/* ------------------------------------------------------------ */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
          <div className="lg:col-span-5 space-y-6 relative z-10">
            <div className="inline-flex items-center gap-2 text-xs font-mono-cad text-[#ff5f15] uppercase tracking-widest font-semibold">
              <Terminal size={14} />
              <span>Section 05 // Direct Transmission</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
              Initialize Comms
            </h2>
            <p className="text-zinc-200 text-sm leading-relaxed">
              Available for graduate mechanical engineering roles, industrial process optimization contracts, and operational workflow advisory. Reach out directly or dispatch a transmission via the diagnostic console.
            </p>

            <div className="space-y-4 pt-2 font-mono-cad text-xs">
              <div
                onClick={handleCopyEmail}
                className="p-4 rounded-lg bg-[#0d1017] border border-white/20 hover:border-[#ff5f15] transition-all cursor-pointer group flex items-center justify-between shadow-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded bg-[#121620] text-[#ff5f15] border border-[#ff5f15]/30">
                    <Mail size={18} />
                  </div>
                  <div>
                    <div className="text-zinc-400 text-[10px] tracking-wider uppercase font-semibold">DIRECT TRANSMISSION DISPATCH</div>
                    <div className="text-white font-bold group-hover:text-[#ff5f15] transition-colors text-sm">
                      dharani.subban@engineering-mech.co.uk
                    </div>
                  </div>
                </div>
                <div className="text-zinc-400 group-hover:text-white p-1">
                  {copiedEmail ? <Check size={18} className="text-emerald-400" /> : <Copy size={18} />}
                </div>
              </div>

              <div className="p-4 rounded-lg bg-[#0d1017] border border-white/20 flex items-center gap-3 shadow-lg">
                <div className="p-2.5 rounded bg-[#121620] text-[#facc15] border border-[#facc15]/30">
                  <MapPin size={18} />
                </div>
                <div>
                  <div className="text-zinc-400 text-[10px] tracking-wider uppercase font-semibold">CURRENT BASE OF OPERATIONS</div>
                  <div className="text-white font-bold text-sm">London, United Kingdom (Open to Global Relocation)</div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-[#0d1017] border border-white/20 flex items-center gap-3 shadow-lg">
                <div className="p-2.5 rounded bg-[#121620] text-emerald-400 border border-emerald-400/30">
                  <ShieldCheck size={18} />
                </div>
                <div>
                  <div className="text-zinc-400 text-[10px] tracking-wider uppercase font-semibold">RIGHT TO WORK &amp; COMPLIANCE</div>
                  <div className="text-white font-bold text-sm">UK Full Working Rights &bull; ISO / OSHA Audited</div>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={handleDownloadCV}
                className="w-full py-4 px-6 rounded-md bg-[#121620] border-2 border-[#ff5f15] text-[#ff5f15] hover:bg-[#ff5f15] hover:text-[#050608] transition-all font-mono-cad text-xs uppercase font-bold tracking-wider flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,95,21,0.25)] hover:shadow-[0_0_25px_rgba(255,95,21,0.5)] cursor-pointer"
              >
                <Download size={18} />
                <span>DOWNLOAD COMPLETE MECHANICAL CV [PDF]</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="p-8 rounded-xl bg-[#0d1017] border border-white/15 laser-border-glow tech-corners">
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6 font-mono-cad text-xs">
                <div className="flex items-center gap-2 text-[#ff5f15]">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f15] animate-ping" />
                  <span className="font-bold">COMMS TERMINAL: PORT 8080 // ONLINE</span>
                </div>
                <div className="flex items-center gap-3 text-[10px]">
                  <span className="text-zinc-500 hidden sm:inline">256-BIT ENCRYPTION</span>
                  <span className="text-emerald-400 flex items-center gap-1 font-semibold">
                    <ShieldCheck size={12} />
                    <span>BOT SHIELD ACTIVE</span>
                  </span>
                </div>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-4">
                {/* Security Honeypot Bot Trap (Invisible to humans, traps automated scrapers) */}
                <div className="hidden" aria-hidden="true" style={{ display: 'none' }}>
                  <label htmlFor="hp_defense_token">Security Token</label>
                  <input
                    id="hp_defense_token"
                    type="text"
                    name="hp_defense_token"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                  />
                </div>

                {formError && (
                  <div className="p-3 rounded bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-mono-cad flex items-center gap-2">
                    <AlertTriangle size={14} className="shrink-0 text-rose-400" />
                    <span>{formError}</span>
                  </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono-cad text-zinc-400 uppercase tracking-wider mb-1.5">
                      IDENTIFIER / FULL NAME *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dr. Alan Turing"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded bg-[#121620] border border-white/10 text-white font-mono-cad text-xs focus:border-[#ff5f15] focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono-cad text-zinc-400 uppercase tracking-wider mb-1.5">
                      COMM CHANNEL / EMAIL *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. contact@enterprise.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded bg-[#121620] border border-white/10 text-white font-mono-cad text-xs focus:border-[#ff5f15] focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono-cad text-zinc-400 uppercase tracking-wider mb-1.5">
                    TRANSMISSION SUBJECT / PROJECT DOMAIN *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Energy Audit / Graduate Engineer Role / CAD Design Inquiry"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-2.5 rounded bg-[#121620] border border-white/10 text-white font-mono-cad text-xs focus:border-[#ff5f15] focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono-cad text-zinc-400 uppercase tracking-wider mb-1.5">
                    TECHNICAL SPECIFICATION / MESSAGE PAYLOAD *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Outline your operational challenge, project parameters, or engineering role..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 rounded bg-[#121620] border border-white/10 text-white font-mono-cad text-xs focus:border-[#ff5f15] focus:outline-none transition-colors resize-y"
                  />
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <button
                    type="submit"
                    disabled={formStatus === 'transmitting'}
                    className="px-6 py-3 rounded bg-[#ff5f15] text-[#050608] font-black text-xs font-mono-cad uppercase hover:bg-[#ff7a38] transition-all shadow-[0_0_20px_rgba(255,95,21,0.35)] flex items-center gap-2 disabled:opacity-50"
                  >
                    <Send size={14} />
                    <span>
                      {formStatus === 'transmitting'
                        ? 'TRANSMITTING PACKET...'
                        : formStatus === 'sent'
                        ? 'PACKET RECEIVED'
                        : 'DISPATCH TRANSMISSION'}
                    </span>
                  </button>

                  <div className="text-[11px] font-mono-cad text-zinc-500">
                    STATUS: {formStatus === 'transmitting' ? (
                      <span className="text-[#facc15]">ENCRYPTING...</span>
                    ) : formStatus === 'sent' ? (
                      <span className="text-emerald-400 font-bold">TRANSMISSION CONFIRMED</span>
                    ) : (
                      'READY'
                    )}
                  </div>
                </div>

                {formStatus === 'sent' && (
                  <div className="p-3 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono-cad">
                    &gt; PACKET ACKNOWLEDGED: Thank you for your inquiry. Dharani Kumar Subban will respond within 24 hours.
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ */}
      {/* FOOTER & SYSTEM SPECIFICATIONS                               */}
      {/* ------------------------------------------------------------ */}
      <footer className="border-t border-white/10 bg-[#050608] relative z-10 text-zinc-500 text-xs font-mono-cad py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3 text-zinc-400">
            <Cog size={16} className="text-[#ff5f15]" />
            <span className="text-white font-bold">DHARANI KUMAR SUBBAN</span>
            <span>&bull;</span>
            <span>MECHANICAL ENGINEER</span>
            <span>&bull;</span>
            <span className="text-zinc-500">LONDON, UK</span>
          </div>

          <div className="flex items-center gap-6">
            <a href="#projects" className="hover:text-[#ff5f15] transition-colors">
              SYSTEMS
            </a>
            <a href="#education" className="hover:text-[#ff5f15] transition-colors">
              EDUCATION
            </a>
            <a href="#experience" className="hover:text-[#ff5f15] transition-colors">
              OPERATIONS
            </a>
            <a href="#skills" className="hover:text-[#ff5f15] transition-colors">
              SKILLS
            </a>
            <a href="#contact" className="hover:text-[#ff5f15] transition-colors">
              COMMS
            </a>
          </div>

          <div>
            &copy; {new Date().getFullYear()} DKS PORTFOLIO // ALL RIGHTS RESERVED
          </div>
        </div>
      </footer>
      </motion.div>

      {/* ------------------------------------------------------------ */}
      {/* 4. INTERACTIVE CAD BLUEPRINT MODAL (Global Viewport Fixed)   */}
      {/* ------------------------------------------------------------ */}
      <AnimatePresence>
        {selectedProject && (
          <div
            className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-black/90 backdrop-blur-md overflow-y-auto"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 15 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl max-h-[88vh] overflow-y-auto bg-[#0d1017] rounded-xl border-2 border-[#ff5f15] shadow-[0_0_50px_rgba(255,95,21,0.4)] p-6 sm:p-8 tech-corners"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                <div>
                  <span className="text-xs font-mono-cad text-[#ff5f15] tracking-wider uppercase font-bold">
                    CAD BLUEPRINT DOSSIER // {selectedProject.code}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">
                    {selectedProject.title}
                  </h3>
                  <div className="text-xs font-mono-cad text-zinc-400 mt-0.5">
                    {selectedProject.subtitle}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  className="p-2.5 rounded-lg bg-white/5 hover:bg-[#ff5f15] hover:text-[#050608] text-zinc-300 hover:scale-105 transition-all cursor-pointer"
                  title="Close Blueprint Dossier"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="mb-6">
                <SchematicVisual type={selectedProject.schematicType} />
              </div>

              <div className="mb-6">
                <div className="flex items-center gap-2 text-xs font-mono-cad text-[#ff5f15] font-bold uppercase mb-3">
                  <Ruler size={14} />
                  <span>Technical Specifications &amp; Parameters</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono-cad">
                  {Object.entries(selectedProject.specs).map(([k, v], i) => (
                    <div key={i} className="p-2.5 rounded bg-[#121620] border border-white/5 flex justify-between">
                      <span className="text-zinc-400">{k}:</span>
                      <span className="text-white font-semibold">{v}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <div className="flex items-center gap-2 text-xs font-mono-cad text-[#facc15] font-bold uppercase mb-3">
                  <Workflow size={14} />
                  <span>Execution Methodology</span>
                </div>
                <ul className="space-y-2 text-sm text-zinc-300">
                  {selectedProject.methodology.map((m, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <CornerDownRight size={14} className="text-[#facc15] mt-1 shrink-0" />
                      <span className="leading-relaxed">{m}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-6">
                <div className="flex items-center gap-2 text-xs font-mono-cad text-emerald-400 font-bold uppercase mb-3">
                  <CheckCircle2 size={14} />
                  <span>Verified Engineering Deliverables</span>
                </div>
                <ul className="space-y-2 text-sm text-zinc-300">
                  {selectedProject.outcomes.map((o, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <Check size={14} className="text-emerald-400 mt-1 shrink-0" />
                      <span className="leading-relaxed">{o}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 font-mono-cad text-xs">
                <span className="text-zinc-500">SPECIFICATION DOCUMENT: ISO-CERTIFIED</span>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={handleDownloadCV}
                    className="px-4 py-2 rounded bg-[#121620] border border-[#ff5f15] text-[#ff5f15] font-bold uppercase hover:bg-[#ff5f15] hover:text-[#050608] transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <Download size={14} />
                    <span>DOWNLOAD CV [PDF]</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedProject(null)}
                    className="px-4 py-2 rounded bg-[#ff5f15] text-[#050608] font-black uppercase hover:bg-[#ff7a38] transition-all cursor-pointer shadow-[0_0_15px_rgba(255,95,21,0.3)]"
                  >
                    CLOSE BLUEPRINT
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Floating Download Confirmation Toast */}
      <AnimatePresence>
        {downloadedToast && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            className="fixed bottom-6 left-6 z-[999999] px-4 py-3 rounded-lg bg-[#0d1017] border-2 border-[#ff5f15] shadow-[0_0_30px_rgba(255,95,21,0.4)] flex items-center gap-3 font-mono-cad text-xs text-white"
          >
            <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
            <div>
              <div className="text-[10px] text-[#ff5f15] font-bold tracking-wider uppercase">
                TRANSMISSION DISPATCHED // SUCCESS
              </div>
              <div className="text-zinc-200">
                Dharani_Kumar_Subban_Mechanical_Engineer_CV.pdf downloaded
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
