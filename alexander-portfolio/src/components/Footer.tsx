'use client';

import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full bg-[#050505] overflow-hidden pb-0">
      <div className="relative w-full select-none pointer-events-none">
        <h2 className="text-[16.8vw] font-black leading-[0.7] tracking-tighter text-[#888] text-center whitespace-nowrap px-0"
          style={{
            maskImage: 'linear-gradient(to top, transparent 0%, rgba(0,0,0,0.5) 15%, black 40%)',
            WebkitMaskImage: 'linear-gradient(to top, transparent 0%, rgba(0,0,0,0.5) 15%, black 40%)'
          }}
        >
          ALEXANDER
        </h2>

        {/* Volumetric shadow fall-off (uses box-shadow engines for total smoothness) */}
        <div
          className="absolute inset-x-0 bottom-[-10%] h-[120%] pointer-events-none z-10 blur-[48px]"
          style={{
            boxShadow: `
              0 -40px 120px 80px #050505,
              0 -10px 60px 40px #050505,
              0 20px 40px 20px #050505
            `,
            filter: 'url(#footer-dither-noise)'
          }}
        />
      </div>

      {/* High-frequency grain filter to break gradient banding */}
      <svg className="hidden">
        <filter id="footer-dither-noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.04 0" />
          <feBlend mode="multiply" in="SourceGraphic" />
        </filter>
      </svg>
    </footer>
  );
}
