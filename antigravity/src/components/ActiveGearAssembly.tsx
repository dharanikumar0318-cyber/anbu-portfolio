'use client';

import React, { useState, useMemo } from 'react';
import { motion, useAnimationFrame, useMotionValue } from 'framer-motion';
import { Play, Pause, RotateCw, FastForward, Sliders, Activity, Info } from 'lucide-react';

interface GearParams {
  teeth: number;
  pitchRadius: number;
}

// Generate realistic spur gear SVG path with involute trapezoidal teeth
function generateGearPath(teeth: number, pitchRadius: number): string {
  const module = (2 * pitchRadius) / teeth;
  const addendum = 0.85 * module;
  const dedendum = 1.15 * module;
  const ra = pitchRadius + addendum; // Tip radius
  const rd = pitchRadius - dedendum; // Root radius
  const dt = (2 * Math.PI) / teeth;

  const points: string[] = [];
  for (let i = 0; i < teeth; i++) {
    const angle = i * dt;
    const a0 = angle - dt * 0.28;
    const a1 = angle - dt * 0.11;
    const a2 = angle + dt * 0.11;
    const a3 = angle + dt * 0.28;

    const p0 = [rd * Math.cos(a0), rd * Math.sin(a0)];
    const p1 = [ra * Math.cos(a1), ra * Math.sin(a1)];
    const p2 = [ra * Math.cos(a2), ra * Math.sin(a2)];
    const p3 = [rd * Math.cos(a3), rd * Math.sin(a3)];

    if (i === 0) {
      points.push(`M ${p0[0].toFixed(2)} ${p0[1].toFixed(2)}`);
    } else {
      points.push(`L ${p0[0].toFixed(2)} ${p0[1].toFixed(2)}`);
    }
    points.push(`L ${p1[0].toFixed(2)} ${p1[1].toFixed(2)}`);
    points.push(`L ${p2[0].toFixed(2)} ${p2[1].toFixed(2)}`);
    points.push(`L ${p3[0].toFixed(2)} ${p3[1].toFixed(2)}`);
  }
  points.push('Z');
  return points.join(' ');
}

export default function ActiveGearAssembly() {
  const [speed, setSpeed] = useState<number>(1.0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [direction, setDirection] = useState<number>(1); // 1 = CW, -1 = CCW
  const [showCadOverlay, setShowCadOverlay] = useState<boolean>(true);

  // Geometric parameters (Module m = 6.6)
  const z1 = 20; // Main Drive Gear
  const rp1 = 66; // Pitch radius 1

  const z2 = 12; // Pinion Gear (Top-Right)
  const rp2 = 39.6; // Pitch radius 2

  const z3 = 10; // Auxiliary Gear (Bottom-Left)
  const rp3 = 33; // Pitch radius 3

  // Centers in 320x320 SVG viewport
  const cx1 = 150;
  const cy1 = 160;

  // Gear 2 placed at angle theta2 = -42 deg
  const th2Deg = -42;
  const th2Rad = (th2Deg * Math.PI) / 180;
  const d12 = rp1 + rp2; // 105.6
  const cx2 = cx1 + d12 * Math.cos(th2Rad);
  const cy2 = cy1 + d12 * Math.sin(th2Rad);

  // Gear 3 placed at angle theta3 = 148 deg
  const th3Deg = 148;
  const th3Rad = (th3Deg * Math.PI) / 180;
  const d13 = rp1 + rp3; // 99
  const cx3 = cx1 + d13 * Math.cos(th3Rad);
  const cy3 = cy1 + d13 * Math.sin(th3Rad);

  // Initial phase offsets for zero-collision tooth meshing
  const dt2Deg = 360 / z2;
  const dt3Deg = 360 / z3;
  const initialOffset2 = th2Deg + 180 - dt2Deg / 2 - (0 - th2Deg) * (z1 / z2);
  const initialOffset3 = th3Deg + 180 - dt3Deg / 2 - (0 - th3Deg) * (z1 / z3);

  // Precomputed SVG paths for all 3 gears
  const pathGear1 = useMemo(() => generateGearPath(z1, rp1), [z1, rp1]);
  const pathGear2 = useMemo(() => generateGearPath(z2, rp2), [z2, rp2]);
  const pathGear3 = useMemo(() => generateGearPath(z3, rp3), [z3, rp3]);

  // Framer Motion motion values for rotation
  const rot1 = useMotionValue(0);
  const rot2 = useMotionValue(initialOffset2);
  const rot3 = useMotionValue(initialOffset3);

  // Base rotation speed: 36 degrees per second (~6 RPM nominal)
  const baseDegPerSec = 36;

  useAnimationFrame((_, delta) => {
    if (isPaused) return;
    const deltaSeconds = delta / 1000;
    const step = deltaSeconds * baseDegPerSec * speed * direction;

    const current1 = rot1.get() + step;
    rot1.set(current1 % 360);

    // Driven gears rotate opposite to drive gear, scaled by gear ratio
    const current2 = initialOffset2 - current1 * (z1 / z2);
    rot2.set(current2 % 360);

    const current3 = initialOffset3 - current1 * (z1 / z3);
    rot3.set(current3 % 360);
  });

  // Dynamic telemetry calculations
  const nominalRpm = Math.round((baseDegPerSec / 360) * 60 * speed);
  const pinionRpm = Math.round(nominalRpm * (z1 / z2));
  const pitchVelocity = (((baseDegPerSec * (Math.PI / 180) * speed * (rp1 / 1000)) * 10).toFixed(2));

  return (
    <div className="w-full flex flex-col items-center select-none">
      {/* SVG Canvas Container */}
      <div className="relative aspect-square max-h-[350px] w-full flex items-center justify-center bg-[#07090e] rounded-lg border border-white/10 p-2 overflow-hidden shadow-inner">
        {/* Subtle CAD dense grid */}
        <div className="absolute inset-0 bg-cad-grid-dense opacity-40 pointer-events-none" />

        <svg
          viewBox="0 0 320 320"
          className="w-full h-full relative z-10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Machined Hardened Steel Radial Gradient */}
            <radialGradient id="machined-steel" cx="42%" cy="40%" r="58%">
              <stop offset="0%" stopColor="#606e87" />
              <stop offset="30%" stopColor="#374254" />
              <stop offset="65%" stopColor="#232b38" />
              <stop offset="88%" stopColor="#3f4b5e" />
              <stop offset="100%" stopColor="#1a202c" />
            </radialGradient>

            {/* Bronze / Alloy Hub Gradient */}
            <radialGradient id="hub-alloy" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#8da0c0" />
              <stop offset="45%" stopColor="#414e63" />
              <stop offset="85%" stopColor="#1a212d" />
              <stop offset="100%" stopColor="#0a0d13" />
            </radialGradient>

            {/* Safety Orange Accent Gradient for Pinion */}
            <radialGradient id="pinion-rim" cx="45%" cy="45%" r="55%">
              <stop offset="0%" stopColor="#ff8c4a" />
              <stop offset="50%" stopColor="#e04e0b" />
              <stop offset="100%" stopColor="#7a2603" />
            </radialGradient>

            {/* Glowing Mesh Spark */}
            <filter id="mesh-glow" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#ff5f15" floodOpacity="0.8" />
            </filter>
          </defs>

          {/* CAD Centerlines & Pitch Circles */}
          {showCadOverlay && (
            <g className="transition-opacity duration-300">
              {/* Line of Centers between Gear 1 and Gear 2 */}
              <line
                x1={cx1}
                y1={cy1}
                x2={cx2}
                y2={cy2}
                stroke="#ff5f15"
                strokeWidth="1"
                strokeDasharray="3 3"
                opacity="0.5"
              />
              {/* Line of Centers between Gear 1 and Gear 3 */}
              <line
                x1={cx1}
                y1={cy1}
                x2={cx3}
                y2={cy3}
                stroke="#38bdf8"
                strokeWidth="1"
                strokeDasharray="3 3"
                opacity="0.5"
              />

              {/* Pitch Circles (PCD) */}
              <circle
                cx={cx1}
                cy={cy1}
                r={rp1}
                stroke="#ff5f15"
                strokeWidth="1.2"
                strokeDasharray="4 4"
                fill="none"
                opacity="0.6"
              />
              <circle
                cx={cx2}
                cy={cy2}
                r={rp2}
                stroke="#ff5f15"
                strokeWidth="1.2"
                strokeDasharray="3 3"
                fill="none"
                opacity="0.6"
              />
              <circle
                cx={cx3}
                cy={cy3}
                r={rp3}
                stroke="#38bdf8"
                strokeWidth="1.2"
                strokeDasharray="3 3"
                fill="none"
                opacity="0.6"
              />

              {/* Pitch Point 1-2 Contact Spark */}
              <circle
                cx={(cx1 + rp1 * Math.cos(th2Rad)).toFixed(1)}
                cy={(cy1 + rp1 * Math.sin(th2Rad)).toFixed(1)}
                r="3.5"
                fill="#ff5f15"
                filter="url(#mesh-glow)"
                className="animate-pulse"
              />
              {/* Pitch Point 1-3 Contact Spark */}
              <circle
                cx={(cx1 + rp1 * Math.cos(th3Rad)).toFixed(1)}
                cy={(cy1 + rp1 * Math.sin(th3Rad)).toFixed(1)}
                r="3"
                fill="#38bdf8"
                filter="url(#mesh-glow)"
                className="animate-pulse"
              />

              {/* Pitch Diameter CAD Dimension Text */}
              <text x={cx1 - 50} y={cy1 - rp1 - 6} fill="#ff5f15" fontSize="7" fontFamily="monospace">
                Ø 132.0 mm PCD [Z=20]
              </text>
              <text x={cx2 + 10} y={cy2 - rp2} fill="#ff7a38" fontSize="7" fontFamily="monospace">
                Ø 79.2 mm PCD [Z=12]
              </text>
              <text x={cx3 - 48} y={cy3 + rp3 + 12} fill="#38bdf8" fontSize="7" fontFamily="monospace">
                Ø 66.0 mm PCD [Z=10]
              </text>
            </g>
          )}

          {/* ======================================================== */}
          {/* GEAR 1: MAIN BULL DRIVE GEAR (Z=20, CW)                  */}
          {/* ======================================================== */}
          <g transform={`translate(${cx1}, ${cy1})`}>
            <motion.g style={{ rotate: rot1, transformOrigin: '0px 0px' }}>
              {/* Precision Involute Teeth Body */}
              <path
                d={pathGear1}
                fill="url(#machined-steel)"
                stroke="#70829f"
                strokeWidth="0.8"
              />

              {/* Recessed Machined Web Face (Dark step ring) */}
              <circle cx="0" cy="0" r="50" fill="#111620" stroke="#313c4e" strokeWidth="1.8" />
              <circle cx="0" cy="0" r="48" fill="#0d111a" stroke="#1f2735" strokeWidth="1" />

              {/* 6 Circular Lightening Holes with Beveled Inner Chamfer */}
              {[0, 60, 120, 180, 240, 300].map((deg) => {
                const rad = (deg * Math.PI) / 180;
                const hx = 35 * Math.cos(rad);
                const hy = 35 * Math.sin(rad);
                return (
                  <g key={deg}>
                    <circle
                      cx={hx.toFixed(1)}
                      cy={hy.toFixed(1)}
                      r="8.5"
                      fill="#07090e"
                      stroke="#2d3748"
                      strokeWidth="1.2"
                    />
                    <circle
                      cx={hx.toFixed(1)}
                      cy={hy.toFixed(1)}
                      r="7.5"
                      fill="#050609"
                      stroke="#1a202c"
                      strokeWidth="0.6"
                    />
                  </g>
                );
              })}

              {/* Center Hub & Bronze Bearing Sleeve */}
              <circle cx="0" cy="0" r="22" fill="url(#hub-alloy)" stroke="#8da0c0" strokeWidth="1.4" />
              <circle cx="0" cy="0" r="15" fill="#141924" stroke="#ff5f15" strokeWidth="1" strokeOpacity="0.8" />

              {/* Center Bore with Standard DIN 6885 Drive Shaft Keyway */}
              <path
                d="M -9 0 A 9 9 0 0 0 9 0 A 9 9 0 0 0 2.5 -8.6 L 2.5 -12.5 L -2.5 -12.5 L -2.5 -8.6 A 9 9 0 0 0 -9 0 Z"
                fill="#030406"
                stroke="#475569"
                strokeWidth="0.8"
              />

              {/* Center Shaft Machined Retaining Pin */}
              <circle cx="0" cy="0" r="3" fill="#ff5f15" />
              <line x1="-12" y1="0" x2="12" y2="0" stroke="#ff5f15" strokeWidth="0.7" opacity="0.6" />
              <line x1="0" y1="-12" x2="0" y2="12" stroke="#ff5f15" strokeWidth="0.7" opacity="0.6" />
            </motion.g>
          </g>

          {/* ======================================================== */}
          {/* GEAR 2: PINION GEAR (Z=12, CCW, 1.67x SPEED)            */}
          {/* ======================================================== */}
          <g transform={`translate(${cx2.toFixed(1)}, ${cy2.toFixed(1)})`}>
            <motion.g style={{ rotate: rot2, transformOrigin: '0px 0px' }}>
              {/* Teeth Body */}
              <path
                d={pathGear2}
                fill="url(#machined-steel)"
                stroke="#ff7a38"
                strokeWidth="0.8"
              />

              {/* Recessed Web */}
              <circle cx="0" cy="0" r="28" fill="#111620" stroke="#ff5f15" strokeWidth="1.2" strokeOpacity="0.7" />

              {/* 4 Lightening Holes */}
              {[0, 90, 180, 270].map((deg) => {
                const rad = (deg * Math.PI) / 180;
                const hx = 18 * Math.cos(rad);
                const hy = 18 * Math.sin(rad);
                return (
                  <circle
                    key={deg}
                    cx={hx.toFixed(1)}
                    cy={hy.toFixed(1)}
                    r="5"
                    fill="#050609"
                    stroke="#ff5f15"
                    strokeWidth="0.8"
                    strokeOpacity="0.5"
                  />
                );
              })}

              {/* Hub & Shaft Bore with Keyway */}
              <circle cx="0" cy="0" r="11" fill="url(#hub-alloy)" stroke="#ff5f15" strokeWidth="1" />
              <circle cx="0" cy="0" r="6" fill="#030406" stroke="#475569" strokeWidth="0.8" />
              <rect x="-1.5" y="-8.5" width="3" height="3.5" fill="#030406" stroke="#ff5f15" strokeWidth="0.6" />
              <circle cx="0" cy="0" r="2" fill="#ff5f15" />
            </motion.g>
          </g>

          {/* ======================================================== */}
          {/* GEAR 3: AUXILIARY GEAR (Z=10, CCW, 2.0x SPEED)          */}
          {/* ======================================================== */}
          <g transform={`translate(${cx3.toFixed(1)}, ${cy3.toFixed(1)})`}>
            <motion.g style={{ rotate: rot3, transformOrigin: '0px 0px' }}>
              {/* Teeth Body */}
              <path
                d={pathGear3}
                fill="url(#machined-steel)"
                stroke="#38bdf8"
                strokeWidth="0.8"
              />

              {/* Recessed Web */}
              <circle cx="0" cy="0" r="23" fill="#111620" stroke="#38bdf8" strokeWidth="1" strokeOpacity="0.7" />

              {/* 3 Lightening Holes */}
              {[0, 120, 240].map((deg) => {
                const rad = (deg * Math.PI) / 180;
                const hx = 14 * Math.cos(rad);
                const hy = 14 * Math.sin(rad);
                return (
                  <circle
                    key={deg}
                    cx={hx.toFixed(1)}
                    cy={hy.toFixed(1)}
                    r="4"
                    fill="#050609"
                    stroke="#38bdf8"
                    strokeWidth="0.8"
                    strokeOpacity="0.5"
                  />
                );
              })}

              {/* Hub & Bore */}
              <circle cx="0" cy="0" r="9" fill="url(#hub-alloy)" stroke="#38bdf8" strokeWidth="0.9" />
              <circle cx="0" cy="0" r="5" fill="#030406" stroke="#475569" strokeWidth="0.7" />
              <rect x="-1.2" y="-7.2" width="2.4" height="3" fill="#030406" stroke="#38bdf8" strokeWidth="0.5" />
              <circle cx="0" cy="0" r="1.5" fill="#38bdf8" />
            </motion.g>
          </g>

          {/* Precision Crosshair Grid Marks */}
          <line x1="10" y1={cy1} x2="310" y2={cy1} stroke="#1e293b" strokeWidth="0.5" strokeDasharray="5 5" />
          <line x1={cx1} y1="10" x2={cx1} y2="310" stroke="#1e293b" strokeWidth="0.5" strokeDasharray="5 5" />

          {/* Corner CAD Registration Marks */}
          <path d="M 12 20 L 12 12 L 20 12" stroke="#ff5f15" strokeWidth="1.5" fill="none" opacity="0.8" />
          <path d="M 308 20 L 308 12 L 300 12" stroke="#ff5f15" strokeWidth="1.5" fill="none" opacity="0.8" />
          <path d="M 12 300 L 12 308 L 20 308" stroke="#ff5f15" strokeWidth="1.5" fill="none" opacity="0.8" />
          <path d="M 308 300 L 308 308 L 300 308" stroke="#ff5f15" strokeWidth="1.5" fill="none" opacity="0.8" />
        </svg>

        {/* Dynamic Laser Sweep Line across the Gear Mesh */}
        <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#ff5f15] to-transparent animate-laser-sweep opacity-75 pointer-events-none" />
      </div>

      {/* Mechanical Interactive Control Panel */}
      <div className="w-full mt-3 p-2.5 rounded-lg bg-[#0a0d14] border border-white/10 font-mono-cad text-xs space-y-2.5">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-2">
          {/* Play/Pause & Direction */}
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setIsPaused(!isPaused)}
              className={`p-1.5 px-2.5 rounded flex items-center gap-1.5 font-bold transition-all ${
                isPaused
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 hover:bg-emerald-500/30'
                  : 'bg-[#151a26] text-zinc-300 border border-white/10 hover:border-[#ff5f15] hover:text-[#ff5f15]'
              }`}
            >
              {isPaused ? <Play size={12} className="fill-current" /> : <Pause size={12} />}
              <span className="text-[10px]">{isPaused ? 'RUN' : 'PAUSE'}</span>
            </button>

            <button
              type="button"
              onClick={() => setDirection((d) => (d === 1 ? -1 : 1))}
              className="p-1.5 px-2 rounded bg-[#151a26] text-zinc-300 border border-white/10 hover:border-[#ff5f15] hover:text-[#ff5f15] flex items-center gap-1 transition-all"
              title="Reverse Rotation Direction"
            >
              <RotateCw size={12} className={direction === -1 ? '-scale-x-100 text-[#ff5f15]' : ''} />
              <span className="text-[10px]">{direction === 1 ? 'CW' : 'CCW'}</span>
            </button>
          </div>

          {/* Speed Presets */}
          <div className="flex items-center gap-1 bg-[#121622] p-0.5 rounded border border-white/10">
            {[0.5, 1.0, 2.5].map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => {
                  setSpeed(s);
                  setIsPaused(false);
                }}
                className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all ${
                  speed === s && !isPaused
                    ? 'bg-[#ff5f15] text-[#050608] shadow-[0_0_10px_rgba(255,95,21,0.5)]'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {s}x
              </button>
            ))}
          </div>

          {/* CAD Overlay Toggle */}
          <button
            type="button"
            onClick={() => setShowCadOverlay(!showCadOverlay)}
            className={`p-1.5 px-2 rounded flex items-center gap-1 text-[10px] font-bold transition-all ${
              showCadOverlay
                ? 'bg-[#ff5f15]/15 text-[#ff5f15] border border-[#ff5f15]/30'
                : 'bg-[#151a26] text-zinc-500 border border-white/10 hover:text-zinc-300'
            }`}
          >
            <Sliders size={11} />
            <span>CAD HUD</span>
          </button>
        </div>

        {/* Live Engineering Telemetry Readout */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[10px]">
          <div className="bg-[#121622] p-2 rounded border border-white/5">
            <div className="text-zinc-500 text-[9px] uppercase">DRIVE SPEED</div>
            <div className="text-white font-bold flex items-center gap-1">
              <span className="text-[#ff5f15]">●</span> {isPaused ? 0 : nominalRpm} RPM
            </div>
          </div>

          <div className="bg-[#121622] p-2 rounded border border-white/5">
            <div className="text-zinc-500 text-[9px] uppercase">PINION SPEED</div>
            <div className="text-white font-bold flex items-center gap-1">
              <span className="text-[#ff7a38]">●</span> {isPaused ? 0 : pinionRpm} RPM
            </div>
          </div>

          <div className="bg-[#121622] p-2 rounded border border-white/5">
            <div className="text-zinc-500 text-[9px] uppercase">PITCH VELOCITY</div>
            <div className="text-white font-bold">
              {isPaused ? '0.00' : pitchVelocity} m/s
            </div>
          </div>

          <div className="bg-[#121622] p-2 rounded border border-white/5">
            <div className="text-zinc-500 text-[9px] uppercase">MESH RATIO</div>
            <div className="text-emerald-400 font-bold">1:1.67 [STEP-UP]</div>
          </div>
        </div>

        {/* Kinematic Specification Footer */}
        <div className="flex items-center justify-between text-[9px] text-zinc-500 pt-1 border-t border-white/5">
          <div className="flex items-center gap-1">
            <Activity size={10} className="text-[#ff5f15]" />
            <span className="text-zinc-400">SPEC: 20° INVOLUTE SPUR // AISI 4140 Cr-Mo</span>
          </div>
          <div className="text-[#ff5f15] font-bold">
            {isPaused ? 'STATIC // BRAKE ON' : 'ACTIVE MESH: 98.6% EFF'}
          </div>
        </div>
      </div>
    </div>
  );
}
