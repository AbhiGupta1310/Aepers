"use client";

import React, { useEffect, useState } from "react";

const STATUS_TEXTS = [
  "Initializing Aepers AI...",
  "Loading voice synthesizer...",
  "Calibrating audio response models...",
  "Synchronizing workflow automation database...",
  "Ready!",
];

const lerp = (a: number[], b: number[], t: number) => [
  a[0] + (b[0] - a[0]) * t,
  a[1] + (b[1] - a[1]) * t,
];

// Flawlessly constrained Bezier curves for a perfect "A" shape
// Outer bounds
const OUTER_BL = [80, 400];
const OUTER_APEX = [200, 80];
const OUTER_BR = [320, 400];
const OUTER_CROSS_APEX = [200, 260];

// Inner bounds (nested perfectly)
const INNER_BL = [120, 360];
const INNER_APEX = [200, 140];
const INNER_BR = [280, 360];
const INNER_CROSS_APEX = [200, 280];

// SEGMENT 1: Left Leg
const getLeftLeg = (t: number) => {
  const start = lerp(OUTER_BL, INNER_BL, t);
  const cp1 = lerp([120, 300], [150, 285], t);
  const cp2 = lerp([160, 80], [170, 140], t);
  const end = lerp(OUTER_APEX, INNER_APEX, t);
  return `M ${start[0]},${start[1]} C ${cp1[0]},${cp1[1]} ${cp2[0]},${cp2[1]} ${end[0]},${end[1]}`;
};

// SEGMENT 2: Right Leg
const getRightLeg = (t: number) => {
  const start = lerp(OUTER_APEX, INNER_APEX, t);
  const cp1 = lerp([240, 80], [230, 140], t);
  const cp2 = lerp([280, 300], [250, 260], t);
  const end = lerp(OUTER_BR, INNER_BR, t);
  return `M ${start[0]},${start[1]} C ${cp1[0]},${cp1[1]} ${cp2[0]},${cp2[1]} ${end[0]},${end[1]}`;
};

// SEGMENT 3: Crossbar (Loops around and sweeps across)
const getCrossbar = (t: number) => {
  const start = lerp(OUTER_BR, INNER_BR, t);
  const c3_cp1 = lerp([360, 500], [310, 460], t);
  const c3_cp2 = lerp([300, 260], [260, 280], t);
  const crossbar_apex = lerp(OUTER_CROSS_APEX, INNER_CROSS_APEX, t);

  const c4_cp1 = lerp([100, 260], [140, 280], t);
  const c4_cp2 = lerp([40, 500], [90, 460], t);
  const end = lerp(OUTER_BL, INNER_BL, t);

  return `M ${start[0]},${start[1]} C ${c3_cp1[0]},${c3_cp1[1]} ${c3_cp2[0]},${c3_cp2[1]} ${crossbar_apex[0]},${crossbar_apex[1]} C ${c4_cp1[0]},${c4_cp1[1]} ${c4_cp2[0]},${c4_cp2[1]} ${end[0]},${end[1]}`;
};

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [statusIdx, setStatusIdx] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);

  const lineCount = 15; // Matches AnimatedWaves exactly

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        // Slower, organic loading increments (1 or 2)
        const increment = Math.random() < 1.7 ? 2 : 1;
        return Math.min(prev + increment, 100);
      });
    }, 90);

    return () => clearInterval(progressInterval);
  }, []);

  useEffect(() => {
    if (progress < 25) setStatusIdx(0);
    else if (progress < 55) setStatusIdx(1);
    else if (progress < 80) setStatusIdx(2);
    else if (progress < 99) setStatusIdx(3);
    else setStatusIdx(4);

    if (progress === 100) {
      const delayTimer = setTimeout(() => {
        setIsFinished(true);
        document.body.style.overflow = "";
        const removeTimer = setTimeout(() => setShouldRender(false), 1000);
        return () => clearTimeout(removeTimer);
      }, 1000); // 1.0s delay allows the final threads of the crossbar to draw completely before fading
      return () => clearTimeout(delayTimer);
    }
  }, [progress]);

  if (!shouldRender) return null;

  return (
    <div className={`loading-screen ${isFinished ? "loaded" : ""}`} aria-hidden="true">
      <div className="loader-container">
        <div className="loader-logo-wrapper">
          <svg
            viewBox="0 0 400 520"
            className="loader-logo-svg"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              {/* Exact wave gradients from AnimatedWaves */}
              <linearGradient id="loader-grad-orange" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FF7A35" />
                <stop offset="50%" stopColor="#F56211" />
                <stop offset="100%" stopColor="#FF9A5C" />
              </linearGradient>
              <linearGradient id="loader-grad-purple" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#A855F7" />
                <stop offset="50%" stopColor="#EC4899" />
                <stop offset="100%" stopColor="#8B5CF6" />
              </linearGradient>

              <filter id="loader-glow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#F56211" floodOpacity="0.15" />
              </filter>
            </defs>

            <g filter="url(#loader-glow)">
              {/* Back Layer: Left Leg */}
              <g className="logo-layer-back">
                {Array.from({ length: lineCount }).map((_, idx) => {
                  const t = idx / (lineCount - 1);
                  const isPurple = idx % 3 === 0;
                  return (
                    <path
                      key={`left-${idx}`}
                      d={getLeftLeg(t)}
                      fill="none"
                      stroke={isPurple ? "url(#loader-grad-purple)" : "url(#loader-grad-orange)"}
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="loading-path"
                      style={{ animationDelay: `${idx * 0.08}s` }}
                    />
                  );
                })}
              </g>

              {/* Middle Layer: Crossbar */}
              <g className="logo-layer-middle">
                {Array.from({ length: lineCount }).map((_, idx) => {
                  const t = idx / (lineCount - 1);
                  const isPurple = idx % 3 === 0;
                  return (
                    <path
                      key={`crossbar-${idx}`}
                      d={getCrossbar(t)}
                      fill="none"
                      stroke={isPurple ? "url(#loader-grad-purple)" : "url(#loader-grad-orange)"}
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="loading-path"
                      style={{ animationDelay: `${3.6 + idx * 0.08}s` }}
                    />
                  );
                })}
              </g>

              {/* Front Layer: Right Leg */}
              <g className="logo-layer-front">
                {Array.from({ length: lineCount }).map((_, idx) => {
                  const t = idx / (lineCount - 1);
                  const isPurple = idx % 3 === 0;
                  return (
                    <path
                      key={`right-${idx}`}
                      d={getRightLeg(t)}
                      fill="none"
                      stroke={isPurple ? "url(#loader-grad-purple)" : "url(#loader-grad-orange)"}
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="loading-path"
                      style={{ animationDelay: `${1.8 + idx * 0.08}s` }}
                    />
                  );
                })}
              </g>
            </g>
          </svg>
        </div>

        <div className="loader-info">
          <div className="loader-progress">
            <span className="loader-number">{progress}</span>
            <span className="loader-percent">%</span>
          </div>
          <div className="loader-status">{STATUS_TEXTS[statusIdx]}</div>
        </div>
      </div>
    </div>
  );
}
