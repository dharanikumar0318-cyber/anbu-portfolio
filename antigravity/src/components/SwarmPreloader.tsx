'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Crosshair, Terminal } from 'lucide-react';

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
      className="absolute border border-dashed rounded-md pointer-events-none z-20 overflow-visible"
    >
      <div
        className="absolute inset-0 rounded-md border-2 border-dashed opacity-85"
        style={{ borderColor: color, backgroundColor: `${color}08` }}
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

      {/* Floating Dimension Tag */}
      <motion.div
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: delay + 0.3 }}
        className="absolute -top-6 left-0 px-1.5 py-0.5 rounded text-[9px] font-mono font-bold tracking-tight text-black flex items-center gap-1 shadow-sm"
        style={{ backgroundColor: color }}
      >
        <span>{label}</span>
        <span className="opacity-75">[{dimensions}]</span>
      </motion.div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* MAIN PRELOADER GATEKEEPER COMPONENT                                */
/* ------------------------------------------------------------------ */

export default function SwarmPreloader({ onComplete }: SwarmPreloaderProps) {
  const [phase, setPhase] = useState<number>(0);
  const [typedText, setTypedText] = useState<string>('');
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
      // PHASE 0: BOOTING (0ms - 500ms)
      // ----------------------------------------------------------
      setPhase(0);
      await sleep(500);
      if (!isMountedRef.current || isSkippedRef.current) return;

      // ----------------------------------------------------------
      // PHASE 1: DRAWING BOUNDS & CURSORS ENTER (500ms - 2100ms)
      // ----------------------------------------------------------
      setPhase(1);

      cursor1Controls.start({
        x: '58vw',
        y: '46vh',
        transition: { type: 'spring', stiffness: 55, damping: 14 },
      });
      cursor3Controls.start({
        x: '92vw',
        y: '46vh',
        transition: { type: 'spring', stiffness: 55, damping: 14, delay: 0.1 },
      });
      cursor4Controls.start({
        x: '92vw',
        y: '82vh',
        transition: { type: 'spring', stiffness: 55, damping: 14, delay: 0.2 },
      });
      cursor2Controls.start({
        x: '10vw',
        y: '20vh',
        transition: { type: 'spring', stiffness: 55, damping: 14 },
      });

      await sleep(1600);
      if (!isMountedRef.current || isSkippedRef.current) return;

      // ----------------------------------------------------------
      // PHASE 2: INJECTING STRINGS / TYPING EFFECT (2100ms - 3800ms)
      // ----------------------------------------------------------
      setPhase(2);

      // Typing Agent sweeps across the title box
      cursor2Controls.start({
        x: ['10vw', '25vw', '44vw'],
        y: ['20vh', '20vh', '26vh'],
        transition: { duration: 1.5, ease: 'linear' },
      });

      // Typewriter sequence using safe async sleep loop
      const textToType = 'DHARANI KUMAR SUBBAN\nMECHANICAL ENGINEER';
      let accumulated = '';
      for (let i = 0; i < textToType.length; i++) {
        if (!isMountedRef.current || isSkippedRef.current) return;
        accumulated += textToType[i];
        setTypedText(accumulated);
        await sleep(38); // ~1.48s total typing duration
      }

      await sleep(300);
      if (!isMountedRef.current || isSkippedRef.current) return;

      // ----------------------------------------------------------
      // PHASE 3: READY / SMOOTH EXIT (3800ms - 4400ms)
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
      // PHASE 4: UNMOUNT & HANDOFF TO PORTFOLIO
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
      return { text: 'BOOTING...', progress: 10, log: 'INITIALIZING CAD MULTIPLAYER ENGINE...' };
    }
    if (phase === 1) {
      return { text: 'DRAWING BOUNDS (45%)', progress: 45, log: 'SWARM ENTERED: 4 AGENTS MAPPING BENTO GRID' };
    }
    if (phase === 2) {
      return { text: 'INJECTING STRINGS (80%)', progress: 80, log: 'INJECTING HERO SPECIFICATIONS // TYPING AGENT ACTIVE' };
    }
    return { text: 'READY (100%)', progress: 100, log: 'ASSEMBLY VERIFIED // HANDOFF TO CLIENT' };
  };

  const status = getStatusText();

  return (
    <motion.div
      key="swarm-preloader"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className="fixed inset-0 z-[9999] w-screen h-screen overflow-hidden bg-[#0A0A0A] text-white flex flex-col justify-between select-none font-mono"
    >
      {/* Precision CAD grid background during build */}
      <div className="absolute inset-0 bg-cad-grid opacity-30 pointer-events-none" />

      {/* Top Telemetry & Manual Skip Bar */}
      <div className="relative z-30 flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#050608]/80 backdrop-blur-md text-xs text-zinc-400">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-[#ff5f15]">
            <span className="w-2 h-2 rounded-full bg-[#ff5f15] animate-ping" />
            SWARM PROTOCOL ACTIVE
          </span>
          <span className="text-zinc-600">|</span>
          <span className="text-zinc-300 font-bold hidden sm:inline">{status.log}</span>
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
      <div className="relative flex-1 w-full h-full overflow-hidden p-6 sm:p-8">
        {/* ---------------------------------------------------------- */}
        {/* DRAWN WIREFRAME BOXES (Phase >= 1)                         */}
        {/* ---------------------------------------------------------- */}
        {phase >= 1 && (
          <>
            {/* Box 1: Hero Header Area (Drawn by Layout Bot) */}
            <WireframeBox
              left="8vw"
              top="12vh"
              width="50vw"
              height="34vh"
              label="HERO // CORE IDENTITY"
              dimensions="720 x 320"
              color="#FF5F15"
              delay={0.1}
              duration={0.8}
            />

            {/* Box 2: CAD Assembly Schematic (Drawn by Grid Architect) */}
            <WireframeBox
              left="62vw"
              top="12vh"
              width="30vw"
              height="34vh"
              label="CAD ASSEMBLY FIG. 01"
              dimensions="440 x 320"
              color="#FACC15"
              delay={0.25}
              duration={0.8}
            />

            {/* Box 3: Bento Item 1 - Pneumatics (Drawn by Grid Architect) */}
            <WireframeBox
              left="8vw"
              top="50vh"
              width="40vw"
              height="32vh"
              label="BENTO SYS-01 // PNEUMATICS"
              dimensions="580 x 310"
              color="#00F0FF"
              delay={0.4}
              duration={0.8}
            />

            {/* Box 4: Bento Item 2 - Thermal & FEA (Drawn by Telemetry Bot) */}
            <WireframeBox
              left="52vw"
              top="50vh"
              width="40vw"
              height="32vh"
              label="BENTO SYS-02 // THERMAL & DYNAMICS"
              dimensions="580 x 310"
              color="#A855F7"
              delay={0.55}
              duration={0.8}
            />
          </>
        )}

        {/* ---------------------------------------------------------- */}
        {/* SIMULATED TYPEWRITER CONTENT INJECTION (Phase >= 2)        */}
        {/* ---------------------------------------------------------- */}
        {phase >= 2 && (
          <div className="absolute top-[16vh] left-[10vw] z-30 pointer-events-none max-w-[46vw]">
            <div className="text-xs text-[#ff5f15] tracking-widest uppercase mb-2 flex items-center gap-1.5 font-bold">
              <Crosshair size={13} className="text-[#ff5f15]" />
              <span>MECHANICAL CANDIDATE // LIVE GENERATION</span>
            </div>
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tight leading-tight whitespace-pre-line font-sans">
              {typedText}
              <span className="inline-block w-2.5 h-6 sm:h-8 ml-1 bg-[#ff5f15] animate-pulse align-middle" />
            </h1>
          </div>
        )}

        {/* ---------------------------------------------------------- */}
        {/* THE SWARM: 4 MULTIPLAYER CURSORS (useAnimation controls)   */}
        {/* ---------------------------------------------------------- */}
        <ControlledFakeCursor
          controls={cursor1Controls}
          color="#FF5F15"
          label="Layout Bot"
          agentRole="Wireframe Lead"
          isActionActive={phase === 1}
        />
        <ControlledFakeCursor
          controls={cursor2Controls}
          color="#00F0FF"
          label="Typing Agent"
          agentRole="Copy Injector"
          isActionActive={phase === 2}
        />
        <ControlledFakeCursor
          controls={cursor3Controls}
          color="#FACC15"
          label="Grid Architect"
          agentRole="Bento Geometry"
          isActionActive={phase === 1}
        />
        <ControlledFakeCursor
          controls={cursor4Controls}
          color="#A855F7"
          label="Telemetry Bot"
          agentRole="FEA Stress Spec"
          isActionActive={phase === 1}
        />
      </div>

      {/* Bottom Status & Diagnostic Progress Bar */}
      <div className="relative z-30 px-6 py-3.5 border-t border-white/10 bg-[#050608]/90 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-zinc-400">
          <Terminal size={14} className="text-[#ff5f15]" />
          <span>SIMULATION: MULTIPLAYER AGENT REBUILD V2.4</span>
        </div>

        {/* Live Build Progress Meter */}
        <div className="flex items-center gap-3">
          <span className="text-[10px] text-zinc-400 font-bold tracking-wider uppercase">
            {status.text}
          </span>
          <div className="w-36 bg-zinc-800 h-2 rounded-full overflow-hidden border border-white/10">
            <motion.div
              initial={{ width: '10%' }}
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
