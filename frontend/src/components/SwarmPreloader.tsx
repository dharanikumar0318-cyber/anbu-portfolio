'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import {
  Crosshair,
  Terminal,
  Wind,
  Factory,
  Flame,
  Car,
  GraduationCap,
  Briefcase,
  CheckCircle2,
  Cpu,
  Layers,
  Activity,
  Ruler,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/* TYPES & PROPS                                                      */
/* ------------------------------------------------------------------ */

interface SwarmPreloaderProps {
  onComplete: () => void;
}

interface ControlledFakeCursorProps {
  controls: ReturnType<typeof useAnimation>;
  color: string;
  label: string;
  agentRole: string;
  isActionActive?: boolean;
}

interface WireframeBoxProps {
  left: string;
  top: string;
  width: string;
  height: string;
  label: string;
  dimensions: string;
  color?: string;
  delay?: number;
  duration?: number;
  statusBadge?: string;
  children?: React.ReactNode;
}

/* ------------------------------------------------------------------ */
/* HELPER: ASYNC SLEEP FUNCTION                                       */
/* ------------------------------------------------------------------ */

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/* ------------------------------------------------------------------ */
/* COMPONENT: CONTROLLED FAKE MULTIPLAYER CURSOR                      */
/* Uses Framer Motion's useAnimation controls for direct GPU control  */
/* ------------------------------------------------------------------ */

export function ControlledFakeCursor({
  controls,
  color,
  label,
  agentRole,
  isActionActive = false,
}: ControlledFakeCursorProps) {
  return (
    <motion.div
      animate={controls}
      className="absolute top-0 left-0 pointer-events-none z-50 transform -translate-x-1 -translate-y-1 select-none flex flex-col items-start"
    >
      {/* Standard Vector Arrow Cursor */}
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
      >
        <path
          d="M4.5 3.5L18.5 13.5L12 14.5L9.5 20.5L6.5 19.5L9 13.5L4.5 3.5Z"
          fill={color}
          stroke="#000000"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>

      {/* Figma Multiplayer Name Pill */}
      <motion.div
        animate={{ scale: isActionActive ? 1.08 : 1 }}
        transition={{ type: 'spring', damping: 15 }}
        style={{ backgroundColor: color }}
        className="ml-4 -mt-1 px-2 py-0.5 rounded-md text-[10px] font-mono font-bold text-black flex items-center gap-1.5 shadow-[0_4px_12px_rgba(0,0,0,0.6)] border border-black/30 whitespace-nowrap"
      >
        <span>{label}</span>
        <span className="text-[9px] opacity-75 font-normal hidden sm:inline">[{agentRole}]</span>
        {isActionActive && (
          <span className="w-1.5 h-1.5 rounded-full bg-black animate-ping" />
        )}
      </motion.div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* COMPONENT: DRAWN WIREFRAME / BENTO BOUNDING BOX                    */
/* ------------------------------------------------------------------ */

export function WireframeBox({
  left,
  top,
  width,
  height,
  label,
  dimensions,
  color = '#00F0FF',
  delay = 0,
  duration = 0.8,
  statusBadge = 'COMPILING',
  children,
}: WireframeBoxProps) {
  return (
    <motion.div
      initial={{ width: 0, height: 0, opacity: 0 }}
      animate={{
        width,
        height,
        opacity: [0, 1, 1],
      }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{ left, top }}
      className="absolute border border-dashed rounded-md pointer-events-none z-20 overflow-hidden bg-[#0d1017]/85 backdrop-blur-xs flex flex-col justify-between p-3.5"
    >
      <div
        className="absolute inset-0 rounded-md border border-dashed opacity-75 pointer-events-none"
        style={{ borderColor: color, backgroundColor: `${color}06` }}
      />

      {/* 4 Corner Resize Handles (Figma style square nodes) */}
      <div
        className="absolute -top-1 -left-1 w-2 h-2 rounded-[1px] border border-black"
        style={{ backgroundColor: color }}
      />
      <div
        className="absolute -top-1 -right-1 w-2 h-2 rounded-[1px] border border-black"
        style={{ backgroundColor: color }}
      />
      <div
        className="absolute -bottom-1 -left-1 w-2 h-2 rounded-[1px] border border-black"
        style={{ backgroundColor: color }}
      />
      <div
        className="absolute -bottom-1 -right-1 w-2 h-2 rounded-[1px] border border-black"
        style={{ backgroundColor: color }}
      />

      {/* Floating Dimension Tag & Status Pill */}
      <motion.div
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: delay + 0.3 }}
        className="absolute -top-6 left-0 flex items-center gap-1.5"
      >
        <div
          className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold tracking-tight text-black flex items-center gap-1 shadow-sm"
          style={{ backgroundColor: color }}
        >
          <span>{label}</span>
          <span className="opacity-75">[{dimensions}]</span>
        </div>
        <span className="px-1.5 py-0.2 rounded bg-black/70 border border-white/20 text-[8px] font-mono text-zinc-300">
          {statusBadge}
        </span>
      </motion.div>

      {/* Internal Component Wireframe Content */}
      <div className="relative z-10 w-full h-full flex flex-col justify-between">
        {children}
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* MAIN PRELOADER GATEKEEPER COMPONENT                                */
/* ------------------------------------------------------------------ */

export default function SwarmPreloader({ onComplete }: SwarmPreloaderProps) {
  const [phase, setPhase] = useState<number>(0);
  const [typedTitle, setTypedTitle] = useState<string>('');
  const [typedSubtitle, setTypedSubtitle] = useState<string>('');
  const [isExiting, setIsExiting] = useState<boolean>(false);

  const isMountedRef = useRef<boolean>(true);
  const isSkippedRef = useRef<boolean>(false);

  // Framer Motion controls for the 4 multiplayer cursors
  const cursor1Controls = useAnimation(); // Layout Bot (Safety Orange #FF5F15)
  const cursor2Controls = useAnimation(); // Typing Agent (Neon Cyan #00F0FF)
  const cursor3Controls = useAnimation(); // Grid Architect (Bright Yellow #FACC15)
  const cursor4Controls = useAnimation(); // Telemetry Bot (Process Purple #A855F7)

  // Master Timeline Coordinator: Single strict useEffect with []
  useEffect(() => {
    isMountedRef.current = true;
    isSkippedRef.current = false;

    // 1. Initialize cursor positions off-screen
    cursor1Controls.set({ x: '-15vw', y: '-15vh', opacity: 1 });
    cursor2Controls.set({ x: '-20vw', y: '25vh', opacity: 1 });
    cursor3Controls.set({ x: '115vw', y: '-10vh', opacity: 1 });
    cursor4Controls.set({ x: '115vw', y: '75vh', opacity: 1 });

    const runTimeline = async () => {
      // ----------------------------------------------------------
      // PHASE 0: BOOTING & REPOSITORY INITIALIZATION (0ms - 450ms)
      // ----------------------------------------------------------
      setPhase(0);
      await sleep(450);
      if (!isMountedRef.current || isSkippedRef.current) return;

      // ----------------------------------------------------------
      // PHASE 1: DRAWING BENTO GRID & MOUNTING 4x SYSTEMS (450ms - 1900ms)
      // ----------------------------------------------------------
      setPhase(1);

      cursor1Controls.start({
        x: '56vw',
        y: '38vh',
        transition: { type: 'spring', stiffness: 50, damping: 14 },
      });
      cursor3Controls.start({
        x: '78vw',
        y: '65vh',
        transition: { type: 'spring', stiffness: 50, damping: 14, delay: 0.1 },
      });
      cursor4Controls.start({
        x: '88vw',
        y: '85vh',
        transition: { type: 'spring', stiffness: 50, damping: 14, delay: 0.2 },
      });
      cursor2Controls.start({
        x: '8vw',
        y: '16vh',
        transition: { type: 'spring', stiffness: 50, damping: 14 },
      });

      await sleep(1450);
      if (!isMountedRef.current || isSkippedRef.current) return;

      // ----------------------------------------------------------
      // PHASE 2: INJECTING HERO SPECIFICATIONS & TYPING (1900ms - 3600ms)
      // ----------------------------------------------------------
      setPhase(2);

      // Typing Agent sweeps across the title box
      cursor2Controls.start({
        x: ['8vw', '24vw', '42vw'],
        y: ['16vh', '16vh', '22vh'],
        transition: { duration: 1.5, ease: 'linear' },
      });

      // Typewriter sequence for Hero headline
      const fullTitle = 'DHARANI KUMAR SUBBAN';
      let titleAcc = '';
      for (let i = 0; i < fullTitle.length; i++) {
        if (!isMountedRef.current || isSkippedRef.current) return;
        titleAcc += fullTitle[i];
        setTypedTitle(titleAcc);
        await sleep(35);
      }

      const fullSubtitle = 'MECHANICAL ENGINEER // SYSTEMS OPTIMIZATION';
      let subAcc = '';
      for (let i = 0; i < fullSubtitle.length; i++) {
        if (!isMountedRef.current || isSkippedRef.current) return;
        subAcc += fullSubtitle[i];
        setTypedSubtitle(subAcc);
        await sleep(22);
      }

      await sleep(250);
      if (!isMountedRef.current || isSkippedRef.current) return;

      // ----------------------------------------------------------
      // PHASE 3: ALL MODULES PRELOADED & AUDITED (3600ms - 4200ms)
      // ----------------------------------------------------------
      setPhase(3);
      setIsExiting(true);

      // Smoothly animate cursors off the screen
      await Promise.all([
        cursor1Controls.start({
          x: '120vw',
          y: '-20vh',
          opacity: 0,
          transition: { duration: 0.5, ease: 'easeInOut' },
        }),
        cursor2Controls.start({
          x: '-30vw',
          y: '120vh',
          opacity: 0,
          transition: { duration: 0.5, ease: 'easeInOut' },
        }),
        cursor3Controls.start({
          x: '120vw',
          y: '120vh',
          opacity: 0,
          transition: { duration: 0.5, ease: 'easeInOut' },
        }),
        cursor4Controls.start({
          x: '120vw',
          y: '-20vh',
          opacity: 0,
          transition: { duration: 0.5, ease: 'easeInOut' },
        }),
      ]);

      await sleep(150);
      if (!isMountedRef.current || isSkippedRef.current) return;

      // ----------------------------------------------------------
      // PHASE 4: HANDOFF TO FULLY LOADED PORTFOLIO
      // ----------------------------------------------------------
      onComplete();
    };

    runTimeline();

    return () => {
      isMountedRef.current = false;
    };
  }, []); // Strict empty dependency array!

  // Instant Manual Skip Handler
  const handleSkip = () => {
    if (isSkippedRef.current) return;
    isSkippedRef.current = true;
    setPhase(3);
    setIsExiting(true);

    Promise.all([
      cursor1Controls.start({ x: '120vw', opacity: 0, transition: { duration: 0.25 } }),
      cursor2Controls.start({ x: '-30vw', opacity: 0, transition: { duration: 0.25 } }),
      cursor3Controls.start({ x: '120vw', opacity: 0, transition: { duration: 0.25 } }),
      cursor4Controls.start({ x: '120vw', opacity: 0, transition: { duration: 0.25 } }),
    ]);
    setTimeout(onComplete, 250);
  };

  // Keyboard Escape listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleSkip();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Derived Telemetry Status Readout
  const getStatusText = () => {
    if (phase === 0) {
      return {
        text: 'BOOTING...',
        progress: 15,
        log: 'INITIALIZING CAD PRELOAD ENGINE // MOUNTING PORTFOLIO DOM',
      };
    }
    if (phase === 1) {
      return {
        text: 'MAPPING BENTO GRID (45%)',
        log: 'PRELOADING 4x PHYSICAL SYSTEMS: SYS-01 TO SYS-04 VERIFIED',
        progress: 45,
      };
    }
    if (phase === 2) {
      return {
        text: 'INJECTING CREDENTIALS (80%)',
        log: 'INJECTING HERO SPECIFICATIONS // UEL M.S. & SATHYABAMA B.E. AUDITED',
        progress: 80,
      };
    }
    return {
      text: 'PORTFOLIO READY (100%)',
      log: 'ALL 6 REPOSITORIES PRELOADED // HANDOFF TO CLIENT',
      progress: 100,
    };
  };

  const status = getStatusText();

  return (
    <motion.div
      key="swarm-preloader"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
      className="fixed inset-0 z-[9999] w-screen h-screen overflow-hidden bg-[#080a0f]/92 backdrop-blur-md text-white flex flex-col justify-between select-none font-mono"
    >
      {/* Precision CAD grid background during build */}
      <div className="absolute inset-0 bg-cad-grid opacity-35 pointer-events-none" />

      {/* Top Telemetry & Manual Skip Bar */}
      <div className="relative z-30 flex items-center justify-between px-6 py-3.5 border-b border-white/10 bg-[#050608]/90 backdrop-blur-md text-xs text-zinc-400">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-[#ff5f15] font-bold">
            <span className="w-2 h-2 rounded-full bg-[#ff5f15] animate-ping" />
            SWARM ARCHITECT PROTOCOL
          </span>
          <span className="text-zinc-600">|</span>
          <span className="text-zinc-300 font-bold hidden md:inline">{status.log}</span>
        </div>

        {/* Component Checklist Badges */}
        <div className="hidden lg:flex items-center gap-2 text-[10px] text-zinc-400 font-mono">
          <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-emerald-400 font-bold">
            ✓ HERO
          </span>
          <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-emerald-400 font-bold">
            ✓ 4x BENTO
          </span>
          <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-emerald-400 font-bold">
            ✓ EDUCATION
          </span>
          <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-emerald-400 font-bold">
            ✓ OPERATIONS
          </span>
          <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-emerald-400 font-bold">
            ✓ SKILLS
          </span>
        </div>

        <button
          onClick={handleSkip}
          className="px-3 py-1.5 rounded bg-[#121620] hover:bg-[#ff5f15] hover:text-[#050608] text-zinc-300 border border-white/20 transition-all text-[11px] font-bold flex items-center gap-1.5 group cursor-pointer"
        >
          <span>SKIP BUILD</span>
          <span className="text-[9px] px-1 py-0.5 rounded bg-black/40 text-zinc-400 group-hover:text-black">
            ESC
          </span>
        </button>
      </div>

      {/* Main Interactive Grid Build Canvas */}
      <div className="relative flex-1 w-full h-full overflow-hidden p-4 sm:p-6 lg:p-8">

        {/* ---------------------------------------------------------- */}
        {/* COMPONENT 1: HERO // CORE IDENTITY (Phase >= 1)            */}
        {/* ---------------------------------------------------------- */}
        {phase >= 1 && (
          <WireframeBox
            left="5vw"
            top="7vh"
            width="52vw"
            height="33vh"
            label="HERO // CORE CANDIDATE IDENTITY"
            dimensions="780 x 320"
            color="#FF5F15"
            delay={0.1}
            duration={0.7}
            statusBadge={phase >= 2 ? 'VERIFIED // LOADED' : 'COMPILING'}
          >
            <div className="h-full flex flex-col justify-between">
              <div>
                <div className="text-[10px] text-[#ff5f15] tracking-widest uppercase mb-1 flex items-center gap-1.5 font-bold">
                  <Crosshair size={12} className="text-[#ff5f15]" />
                  <span>MECHANICAL SYSTEMS CANDIDATE // ISO 11011 AUDITED</span>
                </div>

                <h1 className="text-xl sm:text-3xl md:text-4xl font-black text-white uppercase tracking-tight leading-tight font-sans">
                  {typedTitle || 'DHARANI KUMAR SUBBAN'}
                  {phase === 2 && !typedSubtitle && (
                    <span className="inline-block w-2 h-5 sm:h-7 ml-1 bg-[#ff5f15] animate-pulse align-middle" />
                  )}
                </h1>

                <div className="mt-1 text-xs sm:text-sm font-mono text-[#facc15] font-semibold">
                  &gt; {typedSubtitle || 'MECHANICAL ENGINEER // SYSTEMS OPTIMIZATION'}
                  {phase === 2 && typedSubtitle && (
                    <span className="inline-block w-1.5 h-4 ml-1 bg-[#facc15] animate-pulse align-middle" />
                  )}
                </div>
              </div>

              <div className="pt-2 border-t border-white/10 flex flex-wrap items-center gap-2 text-[10px] text-zinc-400 font-mono">
                <span className="px-2 py-0.5 rounded bg-[#ff5f15]/15 text-[#ff5f15] border border-[#ff5f15]/30">
                  UEL M.S. MECH ENG (01/2026)
                </span>
                <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-zinc-300">
                  SATHYABAMA B.E. (05/2020)
                </span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  PROCESS OPTIMIZATION &amp; H&amp;S COMPLIANCE
                </span>
              </div>
            </div>
          </WireframeBox>
        )}

        {/* ---------------------------------------------------------- */}
        {/* COMPONENT 2: CAD SCHEMATIC WIREFRAME                       */}
        {/* ---------------------------------------------------------- */}
        {phase >= 1 && (
          <WireframeBox
            left="60vw"
            top="7vh"
            width="35vw"
            height="33vh"
            label="CAD ASSEMBLY FIG. 01 // SOLIDWORKS 3D"
            dimensions="520 x 320"
            color="#FACC15"
            delay={0.25}
            duration={0.7}
            statusBadge="CAD RENDER READY"
          >
            <div className="h-full flex flex-col justify-between font-mono text-[10px]">
              <div className="flex items-center justify-between text-zinc-400 border-b border-white/5 pb-1">
                <span>MULTI-BODY KINEMATICS</span>
                <span className="text-[#facc15]">STATUS: SYNCHRONIZED</span>
              </div>

              <div className="relative flex-1 my-2 flex items-center justify-center">
                <div className="w-24 h-24 rounded-full border border-dashed border-[#facc15]/40 flex items-center justify-center animate-[spin_20s_linear_infinite]">
                  <div className="w-16 h-16 rounded-full border border-dashed border-[#00f0ff]/50 flex items-center justify-center animate-[spin_10s_linear_infinite_reverse]">
                    <Activity size={24} className="text-[#ff5f15]" />
                  </div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-full h-px bg-white/10" />
                  <div className="h-full w-px bg-white/10 absolute" />
                </div>
              </div>

              <div className="flex items-center justify-between text-[9px] text-zinc-500">
                <span>ROTATIONAL RPM: NOMINAL</span>
                <span>FEA MESH: 24,180 NODES</span>
              </div>
            </div>
          </WireframeBox>
        )}

        {/* ---------------------------------------------------------- */}
        {/* COMPONENT 3: 4x BENTO GRID PHYSICAL SYSTEMS                */}
        {/* ---------------------------------------------------------- */}
        {phase >= 1 && (
          <>
            {/* System 1: Compressed Air */}
            <WireframeBox
              left="5vw"
              top="43vh"
              width="21vw"
              height="25vh"
              label="SYS-01 // PNEUMATICS"
              dimensions="320 x 240"
              color="#00F0FF"
              delay={0.4}
              duration={0.7}
              statusBadge="-23% WASTE CUT"
            >
              <div className="flex flex-col justify-between h-full font-mono text-xs">
                <div className="flex items-center justify-between">
                  <div className="p-1 rounded bg-[#00f0ff]/10 text-[#00f0ff]">
                    <Wind size={16} />
                  </div>
                  <span className="text-[9px] text-zinc-500">ISO 11011</span>
                </div>
                <div>
                  <h4 className="font-bold text-white text-xs leading-tight">
                    Compressed Air Leak Detection &amp; Reduction
                  </h4>
                  <p className="text-[10px] text-zinc-400 mt-1 line-clamp-2">
                    Ultrasonic acoustic diagnostics across 450m factory distribution network.
                  </p>
                </div>
                <div className="text-[9px] text-[#00f0ff] font-bold">
                  DELTA: -23% kWh // £14,200/yr RECOVERY
                </div>
              </div>
            </WireframeBox>

            {/* System 2: Energy Efficiency */}
            <WireframeBox
              left="28vw"
              top="43vh"
              width="21vw"
              height="25vh"
              label="SYS-02 // THERMAL & POWER"
              dimensions="320 x 240"
              color="#FACC15"
              delay={0.5}
              duration={0.7}
              statusBadge="PF 0.76 → 0.94"
            >
              <div className="flex flex-col justify-between h-full font-mono text-xs">
                <div className="flex items-center justify-between">
                  <div className="p-1 rounded bg-[#facc15]/10 text-[#facc15]">
                    <Factory size={16} />
                  </div>
                  <span className="text-[9px] text-zinc-500">OPEX AUDITING</span>
                </div>
                <div>
                  <h4 className="font-bold text-white text-xs leading-tight">
                    Small-Scale Industrial Energy Auditing
                  </h4>
                  <p className="text-[10px] text-zinc-400 mt-1 line-clamp-2">
                    Motor power factor lift, boiler waste-heat economizers &amp; thermal insulation.
                  </p>
                </div>
                <div className="text-[9px] text-[#facc15] font-bold">
                  PAYBACK: 8.4 MOS // -31% THERMAL LOSS
                </div>
              </div>
            </WireframeBox>

            {/* System 3: Biodiesel Nano-Blends */}
            <WireframeBox
              left="51vw"
              top="43vh"
              width="21vw"
              height="25vh"
              label="SYS-03 // COMBUSTION & BIOFUEL"
              dimensions="320 x 240"
              color="#FF5F15"
              delay={0.6}
              duration={0.7}
              statusBadge="-18% NOx"
            >
              <div className="flex flex-col justify-between h-full font-mono text-xs">
                <div className="flex items-center justify-between">
                  <div className="p-1 rounded bg-[#ff5f15]/10 text-[#ff5f15]">
                    <Flame size={16} />
                  </div>
                  <span className="text-[9px] text-zinc-500">CI ENGINE TEST</span>
                </div>
                <div>
                  <h4 className="font-bold text-white text-xs leading-tight">
                    Impact of TiO2 &amp; ZrO2 Biodiesel Blends
                  </h4>
                  <p className="text-[10px] text-zinc-400 mt-1 line-clamp-2">
                    Nanoparticle ultrasonication to boost thermal efficiency &amp; slash emissions.
                  </p>
                </div>
                <div className="text-[9px] text-[#ff5f15] font-bold">
                  BTE LIFT: +4.2% // SMOKE REDUCTION: -24%
                </div>
              </div>
            </WireframeBox>

            {/* System 4: Go-kart Chassis */}
            <WireframeBox
              left="74vw"
              top="43vh"
              width="21vw"
              height="25vh"
              label="SYS-04 // CHASSIS & POWERTRAIN"
              dimensions="320 x 240"
              color="#A855F7"
              delay={0.7}
              duration={0.7}
              statusBadge="1.85 SF"
            >
              <div className="flex flex-col justify-between h-full font-mono text-xs">
                <div className="flex items-center justify-between">
                  <div className="p-1 rounded bg-[#a855f7]/10 text-[#a855f7]">
                    <Car size={16} />
                  </div>
                  <span className="text-[9px] text-zinc-500">BFKCT RACING</span>
                </div>
                <div>
                  <h4 className="font-bold text-white text-xs leading-tight">
                    Go-kart (BFKCT) Spaceframe Chassis
                  </h4>
                  <p className="text-[10px] text-zinc-400 mt-1 line-clamp-2">
                    AISI 4130 tubular chassis design, torsional stiffness &amp; powertrain integration.
                  </p>
                </div>
                <div className="text-[9px] text-[#a855f7] font-bold">
                  KERB MASS: 142 KG // CRASH SAFETY VERIFIED
                </div>
              </div>
            </WireframeBox>
          </>
        )}

        {/* ---------------------------------------------------------- */}
        {/* COMPONENT 4: OPERATIONS & SKILLS SPECIFICATION DOCK        */}
        {/* ---------------------------------------------------------- */}
        {phase >= 1 && (
          <WireframeBox
            left="5vw"
            top="71vh"
            width="90vw"
            height="15vh"
            label="OPERATIONS REPOSITORY &amp; TECHNICAL SKILLS MATRIX"
            dimensions="1360 x 140"
            color="#38BDF8"
            delay={0.8}
            duration={0.7}
            statusBadge="ALL CREDENTIALS LOADED"
          >
            <div className="flex flex-col justify-between h-full font-mono text-xs">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/5 pb-1">
                <div className="flex items-center gap-2 text-zinc-300 text-[11px]">
                  <GraduationCap size={14} className="text-[#ff5f15]" />
                  <span>EDUCATION: University of East London (M.S. 2026) · Sathyabama University (B.E. 2020)</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-400 text-[10px]">
                  <Briefcase size={12} className="text-[#38bdf8]" />
                  <span>HISTORY: Sainsbury's · Wembley Gryphon · Santosh Univ · KFC</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-[10px]">
                <div className="flex items-center gap-2">
                  <span className="text-zinc-500">CORE COMPETENCIES:</span>
                  <span className="px-1.5 py-0.5 rounded bg-white/5 text-[#ff5f15] border border-[#ff5f15]/30">DATA ANALYSIS</span>
                  <span className="px-1.5 py-0.5 rounded bg-white/5 text-[#facc15] border border-[#facc15]/30">PROBLEM SOLVING</span>
                  <span className="px-1.5 py-0.5 rounded bg-white/5 text-[#00f0ff] border border-[#00f0ff]/30">TIME MANAGEMENT</span>
                  <span className="px-1.5 py-0.5 rounded bg-white/5 text-emerald-400 border border-emerald-400/30">FINANCIAL ACUMEN</span>
                  <span className="px-1.5 py-0.5 rounded bg-white/5 text-purple-400 border border-purple-400/30">TEAMWORK</span>
                </div>

                <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                  <CheckCircle2 size={13} />
                  <span>CAD BLUEPRINT DOSSIER &amp; COMMS PRELOADED</span>
                </div>
              </div>
            </div>
          </WireframeBox>
        )}

        {/* ---------------------------------------------------------- */}
        {/* THE SWARM: 4 MULTIPLAYER CURSORS (useAnimation controls)   */}
        {/* ---------------------------------------------------------- */}
        <ControlledFakeCursor
          controls={cursor1Controls}
          color="#FF5F15"
          label="Layout Bot"
          agentRole="Hero Wireframe"
          isActionActive={phase === 1}
        />
        <ControlledFakeCursor
          controls={cursor2Controls}
          color="#00F0FF"
          label="Typing Agent"
          agentRole="Headline Injector"
          isActionActive={phase === 2}
        />
        <ControlledFakeCursor
          controls={cursor3Controls}
          color="#FACC15"
          label="Grid Architect"
          agentRole="Bento Systems"
          isActionActive={phase === 1}
        />
        <ControlledFakeCursor
          controls={cursor4Controls}
          color="#A855F7"
          label="Telemetry Bot"
          agentRole="Operations Audit"
          isActionActive={phase === 1}
        />
      </div>

      {/* Bottom Status & Diagnostic Progress Bar */}
      <div className="relative z-30 px-6 py-3 border-t border-white/10 bg-[#050608]/90 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono">
        <div className="flex items-center gap-2 text-zinc-400">
          <Terminal size={14} className="text-[#ff5f15]" />
          <span>SIMULATION: MULTIPLAYER AGENT REBUILD V2.4 // FULL PORTFOLIO PRELOAD</span>
        </div>

        {/* Live Build Progress Meter */}
        <div className="flex items-center gap-3">
          <span className="text-[10px] text-zinc-400 font-bold tracking-wider uppercase">
            {status.text}
          </span>
          <div className="w-36 bg-zinc-800 h-2 rounded-full overflow-hidden border border-white/10">
            <motion.div
              initial={{ width: '15%' }}
              animate={{ width: `${status.progress}%` }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="bg-gradient-to-r from-[#ff5f15] via-[#facc15] to-[#00f0ff] h-full"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
