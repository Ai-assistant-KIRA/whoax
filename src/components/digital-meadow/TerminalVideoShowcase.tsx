"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  RotateCcw,
  Sparkles,
  ShieldCheck,
  Radio,
  Clock
} from "lucide-react";

interface Chapter {
  label: string;
  sub: string;
  timeSec: number;
}

const CHAPTERS: Chapter[] = [
  { label: "01 // AUDIT", sub: "Revenue Leaks", timeSec: 0 },
  { label: "02 // IDENTITY", sub: "7-Year Track", timeSec: 8 },
  { label: "03 // DIFF", sub: "Agency vs Custom", timeSec: 17 },
  { label: "04 // SCALE", sub: "High-Traffic Stores", timeSec: 27 },
  { label: "05 // AI VOIP", sub: "24/7 Lead Capture", timeSec: 37 },
  { label: "06 // PROOF", sub: "42+ Systems", timeSec: 46 },
  { label: "07 // MOAT", sub: "Authentic Code", timeSec: 54 },
  { label: "08 // DISPATCH", sub: "Direct Contact", timeSec: 62 },
];

interface TerminalVideoShowcaseProps {
  src?: string;
  title?: string;
  subtitle?: string;
  durationSec?: number;
  onContactClick?: () => void;
}

export default function TerminalVideoShowcase({
  src = "/portfolio-intro.mp4",
  title = "70-Second Executive Video Briefing",
  subtitle = "How I engineer bespoke digital platforms that scale revenue & dominate markets.",
  durationSec = 70,
  onContactClick,
}: TerminalVideoShowcaseProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(durationSec);
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  // Update time and active chapter
  const handleTimeUpdate = useCallback(() => {
    if (!videoRef.current) return;
    const cur = videoRef.current.currentTime;
    setCurrentTime(cur);

    // Find active chapter
    let activeIdx = 0;
    for (let i = CHAPTERS.length - 1; i >= 0; i--) {
      if (cur >= CHAPTERS[i].timeSec) {
        activeIdx = i;
        break;
      }
    }
    setActiveChapterIndex(activeIdx);
  }, []);

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration || durationSec);
    }
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
        setHasStarted(true);
      }).catch(() => {
        // Fallback with muted autoplay if browser blocks audio
        if (videoRef.current) {
          videoRef.current.muted = true;
          setIsMuted(true);
          videoRef.current.play();
          setIsPlaying(true);
          setHasStarted(true);
        }
      });
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const seekToChapter = (timeSec: number) => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = timeSec;
    if (!isPlaying) {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
        setHasStarted(true);
      }).catch(() => {});
    }
  };

  const handleScrub = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (!videoRef.current) return;
    videoRef.current.currentTime = time;
    setCurrentTime(time);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      containerRef.current.requestFullscreen().catch(() => {});
    }
  };

  const formatTime = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const secs = Math.floor(sec % 60);
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div
      ref={containerRef}
      className="my-5 border border-[#374145] bg-[#14181a] shadow-2xl rounded-sm overflow-hidden font-mono"
    >
      {/* Terminal Window Header Bar */}
      <div className="flex items-center justify-between px-3 py-2 bg-[#1c2225] border-b border-[#374145] text-[11px] sm:text-[12px]">
        <div className="flex items-center gap-2 min-w-0">
          {/* Traffic light window controls */}
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="w-2.5 h-2.5 rounded-full bg-[#f57f82] inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#f5d098] inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#cbe3b3] inline-block" />
          </div>

          <span className="text-[#839e9a] font-bold select-none ml-1 hidden sm:inline">
            WHOAX_MEDIA_DISPATCH //
          </span>
          <span className="text-[#f8f9e8] font-bold truncate">
            INTRO_VIDEO.mp4
          </span>
          <span className="hidden md:inline text-[10px] px-1.5 py-0.2 rounded border border-[#cbe3b3]/40 text-[#cbe3b3] bg-[#cbe3b3]/10 font-bold shrink-0">
            1080P · 30 FPS · H.264
          </span>
        </div>

        {/* Live Playback State & Audio Status */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="flex items-center gap-1 text-[#839e9a] text-[11px]">
            <Radio className={`w-3 h-3 ${isPlaying ? "text-[#cbe3b3] animate-pulse" : "text-[#839e9a]"}`} />
            <span className="hidden sm:inline font-mono">{formatTime(currentTime)} / {formatTime(duration)}</span>
          </div>

          <button
            onClick={toggleMute}
            className={`px-1.5 py-0.5 border text-[10px] font-bold cursor-pointer transition-colors ${
              isMuted
                ? "border-[#f57f82]/50 text-[#f57f82] bg-[#f57f82]/10"
                : "border-[#cbe3b3]/50 text-[#cbe3b3] bg-[#cbe3b3]/10"
            }`}
            title={isMuted ? "Unmute audio" : "Mute audio"}
          >
            {isMuted ? "[MUTED]" : "[STEREO ON]"}
          </button>
        </div>
      </div>

      {/* Main Video Screen Container */}
      <div className="relative aspect-video w-full bg-[#0a0d0e] group overflow-hidden select-none">
        <video
          ref={videoRef}
          src={src}
          playsInline
          preload="metadata"
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onClick={togglePlay}
          className="w-full h-full object-contain cursor-pointer"
        />

        {/* Center Play Overlay when paused */}
        {!isPlaying && (
          <div
            onClick={togglePlay}
            className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 backdrop-blur-[2px] transition-all cursor-pointer group-hover:bg-black/40"
          >
            <div className="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-[#cbe3b3] bg-[#1c2225]/90 text-[#cbe3b3] shadow-[0_0_30px_rgba(203,227,179,0.35)] transition-transform group-hover:scale-105">
              <Play className="w-8 h-8 sm:w-10 sm:h-10 ml-1 fill-[#cbe3b3]" />
            </div>

            <div className="mt-4 text-center px-4">
              <div className="text-[14px] sm:text-[16px] font-bold text-[#f8f9e8] tracking-wide">
                {title}
              </div>
              <div className="text-[11px] sm:text-[12px] text-[#adc9bc] mt-1">
                70-second high-impact briefing · Click anywhere to play with sound
              </div>
            </div>
          </div>
        )}

        {/* CRT Scanline Grid Overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage:
              "linear-gradient(rgba(18, 24, 27, 0) 50%, rgba(0, 0, 0, 0.45) 50%)",
            backgroundSize: "100% 4px",
          }}
        />

        {/* Floating Mini Controls Bar (appears on hover or when playing) */}
        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/90 via-black/60 to-transparent flex flex-col gap-2 opacity-95 group-hover:opacity-100 transition-opacity">
          {/* Seek Bar */}
          <div className="relative w-full flex items-center">
            <input
              type="range"
              min="0"
              max={duration || 70}
              step="0.1"
              value={currentTime}
              onChange={handleScrub}
              className="w-full h-1.5 bg-[#2b3337] appearance-none rounded cursor-pointer accent-[#cbe3b3]"
              aria-label="Video scrubber"
            />
          </div>

          <div className="flex items-center justify-between text-[12px]">
            <div className="flex items-center gap-3">
              <button
                onClick={togglePlay}
                className="text-[#f8f9e8] hover:text-[#cbe3b3] transition-colors cursor-pointer"
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
              </button>

              <button
                onClick={toggleMute}
                className="text-[#adc9bc] hover:text-[#f8f9e8] transition-colors cursor-pointer"
                aria-label={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>

              <span className="text-[#839e9a] text-[11px] font-mono">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] text-[#cbe3b3] font-bold hidden sm:inline">
                {CHAPTERS[activeChapterIndex]?.label}
              </span>

              <button
                onClick={toggleFullscreen}
                className="text-[#adc9bc] hover:text-[#f8f9e8] transition-colors cursor-pointer"
                aria-label="Fullscreen"
                title="Fullscreen"
              >
                <Maximize className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Terminal Chapter Bar */}
      <div className="p-2.5 sm:p-3 bg-[#171d20] border-t border-[#374145] overflow-hidden">
        <div className="flex items-center justify-between text-[11px] text-[#839e9a] pb-2 mb-2 border-b border-[#263034] select-none min-w-0">
          <span className="flex items-center gap-1.5 font-bold text-[#adc9bc] truncate">
            <Clock className="w-3.5 h-3.5 text-[#cbe3b3] shrink-0" />
            <span>INTERACTIVE_CHAPTER_SELECT ::</span>
          </span>
          <span className="text-[#cbe3b3] shrink-0 text-right">JUMP TO SCENE →</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 w-full">
          {CHAPTERS.map((chap, idx) => {
            const isActive = activeChapterIndex === idx;
            return (
              <button
                key={chap.label}
                onClick={() => seekToChapter(chap.timeSec)}
                className={`p-1.5 text-left border rounded-sm transition-all cursor-pointer min-w-0 ${
                  isActive
                    ? "border-[#cbe3b3] bg-[#cbe3b3]/15 text-[#f8f9e8]"
                    : "border-[#2b3337] bg-[#1a2024]/60 text-[#839e9a] hover:border-[#4a585c] hover:text-[#adc9bc] hover:bg-[#20272b]"
                }`}
              >
                <div className="flex items-center justify-between gap-1">
                  <span className={`text-[10px] font-bold truncate ${isActive ? "text-[#cbe3b3]" : "text-[#839e9a]"}`}>
                    {chap.label}
                  </span>
                  <span className="text-[9px] text-[#6f8788] shrink-0">
                    {formatTime(chap.timeSec)}
                  </span>
                </div>
                <div className="text-[11px] font-semibold text-[#f8f9e8] truncate mt-0.5">
                  {chap.sub}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Strategic Call to Action Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-3 py-2.5 bg-[#14181a] border-t border-[#374145] text-[12px] overflow-hidden">
        <div className="text-[#adc9bc]">
          <span className="text-[#cbe3b3] font-bold">READY TO SCALE?</span> Senior engineering execution with zero agency overhead.
        </div>

        <div className="flex items-center gap-2">
          {onContactClick && (
            <button
              onClick={onContactClick}
              className="px-2.5 py-1 border border-[#cbe3b3] bg-[#cbe3b3] text-[#1c2225] font-bold text-[11px] hover:bg-[#dbe6af] transition-colors cursor-pointer"
            >
              :dispatch_inquiry →
            </button>
          )}

          <a
            href="mailto:reda@whoax.com"
            className="px-2.5 py-1 border border-[#374145] bg-[#1c2225] text-[#f8f9e8] font-bold text-[11px] hover:border-[#cbe3b3] transition-colors cursor-pointer"
          >
            reda@whoax.com
          </a>
        </div>
      </div>
    </div>
  );
}
