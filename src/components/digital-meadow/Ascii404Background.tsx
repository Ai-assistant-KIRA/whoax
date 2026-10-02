"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";

interface Ascii404BackgroundProps {
  onGlitchInteraction?: () => void;
  videoSrc?: string;
  showScanlines?: boolean;
}

interface Drop {
  x: number;
  y: number;
  speed: number;
  length: number;
  chars: string[];
  headChar: string;
}

// Clean matrix cyber glyphs without "404"
const GLYPHS = ["X", "A", "I", "/", "|", "\\", "_", "~", "•", "#", "{", "}", "1", "0", "+", "*", "%"];

export default function Ascii404Background({
  onGlitchInteraction,
  videoSrc,
  showScanlines = true,
}: Ascii404BackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [glitchActive, setGlitchActive] = useState(false);
  const [crtEnabled, setCrtEnabled] = useState(showScanlines);

  const mousePos = useRef<{ x: number; y: number; active: boolean; radius: number }>({
    x: -9999,
    y: -9999,
    active: false,
    radius: 140,
  });

  const dropsRef = useRef<Drop[]>([]);
  const frameId = useRef<number>(0);

  // Initialize and run Canvas ASCII Generative Matrix Engine
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const charSize = 14;
    let cols = Math.floor(width / charSize);
    let rows = Math.floor(height / charSize);

    // Initialize drops
    const initDrops = () => {
      dropsRef.current = [];
      for (let i = 0; i < cols; i++) {
        dropsRef.current.push({
          x: i,
          y: Math.random() * -rows,
          speed: 0.25 + Math.random() * 0.45,
          length: Math.floor(5 + Math.random() * 14),
          chars: Array.from({ length: 18 }, () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)]),
          headChar: Math.random() > 0.5 ? "1" : "0",
        });
      }
    };

    initDrops();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      cols = Math.floor(width / charSize);
      rows = Math.floor(height / charSize);
      initDrops();
    };

    window.addEventListener("resize", handleResize);

    const render = () => {
      // Background clear
      ctx.fillStyle = "#171c1f";
      ctx.fillRect(0, 0, width, height);

      ctx.font = `${charSize}px "SF Mono", "Fira Code", Consolas, monospace`;
      ctx.textBaseline = "top";

      const mx = mousePos.current.x;
      const my = mousePos.current.y;
      const mRadius = mousePos.current.radius;

      // Render falling drops
      const drops = dropsRef.current;
      for (let i = 0; i < drops.length; i++) {
        const drop = drops[i];
        drop.y += drop.speed;

        if (drop.y > rows + drop.length) {
          drop.y = -drop.length;
          drop.speed = 0.25 + Math.random() * 0.45;
          drop.headChar = Math.random() > 0.5 ? "1" : "0";
        }

        const screenX = drop.x * charSize;
        const currentY = Math.floor(drop.y);

        for (let j = 0; j < drop.length; j++) {
          const charRow = currentY - j;
          if (charRow < 0 || charRow >= rows) continue;

          const screenY = charRow * charSize;

          // Check mouse ripple interaction
          const distToMouse = Math.hypot(screenX - mx, screenY - my);
          const isNearMouse = distToMouse < mRadius;

          let displayChar = drop.chars[j % drop.chars.length];
          if (Math.random() < 0.04) {
            displayChar = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
            drop.chars[j % drop.chars.length] = displayChar;
          }

          if (j === 0) {
            // Head character
            if (isNearMouse) {
              ctx.fillStyle = "#f57f82"; // Signal coral near pointer
            } else {
              ctx.fillStyle = "#cbe3b3"; // Mint green head
            }
            displayChar = drop.headChar;
          } else {
            // Tail characters with gradient opacity
            const alpha = Math.max(0.04, (1 - j / drop.length) * 0.32);
            if (isNearMouse) {
              ctx.fillStyle = `rgba(247, 161, 130, ${alpha * 1.8})`;
            } else {
              ctx.fillStyle = `rgba(131, 158, 154, ${alpha})`;
            }
          }

          ctx.fillText(displayChar, screenX, screenY);
        }
      }

      frameId.current = requestAnimationFrame(render);
    };

    frameId.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frameId.current);
      window.removeEventListener("resize", handleResize);
    };
  }, [glitchActive]);

  // Handle pointer tracking
  const handlePointerMove = (e: React.PointerEvent) => {
    mousePos.current.x = e.clientX;
    mousePos.current.y = e.clientY;
    mousePos.current.active = true;

    if (onGlitchInteraction && Math.random() < 0.05) {
      onGlitchInteraction();
    }
  };

  const handlePointerLeave = () => {
    mousePos.current.x = -9999;
    mousePos.current.y = -9999;
    mousePos.current.active = false;
  };

  const triggerGlitchPulse = useCallback(() => {
    setGlitchActive(true);
    if (onGlitchInteraction) onGlitchInteraction();
    setTimeout(() => setGlitchActive(false), 380);
  }, [onGlitchInteraction]);

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onClick={triggerGlitchPulse}
      className="fixed inset-0 z-0 overflow-hidden select-none pointer-events-auto bg-[#171c1f]"
    >
      {/* Optional Video Backdrop Layer */}
      {videoSrc && (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none mix-blend-screen filter grayscale contrast-125"
          src={videoSrc}
        />
      )}

      {/* Main ASCII Canvas */}
      <canvas
        ref={canvasRef}
        className={`w-full h-full block transition-opacity duration-300 ${
          glitchActive ? "filter invert-[0.1] contrast-150" : ""
        }`}
      />

      {/* CRT Scanline & Vignette Overlay */}
      {crtEnabled && (
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage:
              "linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.4) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.02), rgba(0, 255, 0, 0.01), rgba(0, 0, 255, 0.02))",
            backgroundSize: "100% 3px, 6px 100%",
          }}
        />
      )}

      {/* Top right subtle status pill */}
      <div className="absolute top-2 right-4 flex items-center gap-3 text-[11px] font-mono text-[#839e9a] bg-[#1c2225]/80 backdrop-blur-sm px-2.5 py-1 rounded border border-[#374145] z-20 pointer-events-auto">
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          SYSTEM MATRIX
        </span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setCrtEnabled(!crtEnabled);
          }}
          className="hover:text-[#f8f9e8] transition-colors cursor-pointer"
        >
          CRT: {crtEnabled ? "[ON]" : "[OFF]"}
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            triggerGlitchPulse();
          }}
          className="hover:text-red-400 transition-colors cursor-pointer text-amber-300"
        >
          [GLITCH]
        </button>
      </div>
    </div>
  );
}
