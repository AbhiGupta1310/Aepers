"use client";

import React from "react";

export default function AnimatedWaves() {
  const lineCount = 15;

  return (
    <div className="animated-waves-bg" aria-hidden="true">
      <svg width="100%" height="100%" viewBox="0 0 1440 600" preserveAspectRatio="none">
        <defs>
          <linearGradient id="grad-orange" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FF7A35" stopOpacity="0.15" />
            <stop offset="50%" stopColor="#F56211" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#FF9A5C" stopOpacity="0.15" />
          </linearGradient>
          <linearGradient id="grad-purple" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#A855F7" stopOpacity="0.12" />
            <stop offset="50%" stopColor="#EC4899" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.12" />
          </linearGradient>
          
          <filter id="wave-shadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#F56211" floodOpacity="0.04" />
          </filter>
        </defs>

        {/* Ribbon 1: Orange/Pink ribbon (flowing to the right) */}
        <g className="wave-group wave-group-1" filter="url(#wave-shadow)">
          {Array.from({ length: lineCount }).map((_, idx) => {
            const yOffset = idx * 6;
            const ampOffset = Math.sin(idx * 0.4) * 15;
            // Generate path string for double viewport width for seamless looping
            const path = generateWavePath(2880, 260 + yOffset, 65 + ampOffset, 960);
            return (
              <path
                key={`orange-${idx}`}
                d={path}
                fill="none"
                stroke="url(#grad-orange)"
                strokeWidth={1.5 + idx * 0.12}
                className="wave-path-anim"
                style={{
                  animationDuration: "24s",
                  animationDelay: `${idx * -0.2}s`
                }}
              />
            );
          })}
        </g>

        {/* Ribbon 2: Purple/Pink ribbon (flowing slightly offset) */}
        <g className="wave-group wave-group-2">
          {Array.from({ length: lineCount }).map((_, idx) => {
            const yOffset = idx * 5;
            const ampOffset = Math.cos(idx * 0.3) * 18;
            // Opposite wave phase for overlap contrast
            const path = generateWavePath(2880, 310 - yOffset, -55 - ampOffset, 1100);
            return (
              <path
                key={`purple-${idx}`}
                d={path}
                fill="none"
                stroke="url(#grad-purple)"
                strokeWidth={1.2 + idx * 0.1}
                className="wave-path-anim"
                style={{
                  animationDuration: "30s",
                  animationDelay: `${idx * -0.25}s`
                }}
              />
            );
          })}
        </g>
      </svg>
    </div>
  );
}

// Generate wave path mathematically
function generateWavePath(width: number, startY: number, amplitude: number, waveLength: number) {
  let path = `M 0 ${startY}`;
  const halfLength = waveLength / 2;
  const pointsCount = Math.ceil(width / halfLength);

  for (let i = 1; i <= pointsCount; i++) {
    const x = i * halfLength;
    const isEven = i % 2 === 0;
    const y = startY + (isEven ? amplitude : -amplitude);
    
    // Bezier control points for organic sine wave
    const prevX = (i - 1) * halfLength;
    const cp1x = prevX + halfLength / 2;
    const cp1y = isEven ? startY - amplitude : startY + amplitude;
    const cp2x = cp1x;
    const cp2y = y;

    path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${x} ${y}`;
  }
  return path;
}
