"use client";

import React, { useState, useCallback, useEffect } from "react";
import dynamic from "next/dynamic";
import SiteSidebar from "./SiteSidebar";
import CodeEditorView from "./CodeEditorView";
import { PORTFOLIO_FILES, FILE_SEQUENCE } from "@/data/portfolioData";
import { Box, Terminal, Menu, Mail, Layers } from "lucide-react";

// Client-only dynamic imports for canvas rendering engines
const CyberMeadow3D = dynamic(() => import("./CyberMeadow3D"), { ssr: false });
const Ascii404Background = dynamic(() => import("./Ascii404Background"), { ssr: false });

const BG_MODE_KEY = "whoax-bg-engine-mode";

export default function DigitalMeadowPortfolio() {
  const [activeFileId, setActiveFileId] = useState<string>("readme");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [bgMode, setBgMode] = useState<"3d" | "ascii">("3d");

  // Load saved visual mode preference
  useEffect(() => {
    try {
      const saved = localStorage.getItem(BG_MODE_KEY);
      if (saved === "ascii" || saved === "3d") {
        setBgMode(saved);
      }
    } catch {}
  }, []);

  const switchBgMode = (mode: "3d" | "ascii") => {
    setBgMode(mode);
    try {
      localStorage.setItem(BG_MODE_KEY, mode);
    } catch {}
  };

  const handleSelectFile = useCallback((fileId: string) => {
    if (!PORTFOLIO_FILES[fileId]) return;
    setActiveFileId(fileId);
  }, []);

  const currentFile = PORTFOLIO_FILES[activeFileId] || PORTFOLIO_FILES["readme"];

  // Sequence navigation for mobile header pager
  const currentIndex = FILE_SEQUENCE.indexOf(activeFileId);
  const prevFileId = currentIndex > 0 ? FILE_SEQUENCE[currentIndex - 1] : null;
  const nextFileId =
    currentIndex >= 0 && currentIndex < FILE_SEQUENCE.length - 1
      ? FILE_SEQUENCE[currentIndex + 1]
      : null;

  return (
    <div className="relative min-h-screen text-[var(--color-text,#f8f9e8)] overflow-x-hidden font-mono antialiased selection:bg-[#cbe3b3] selection:text-[#1c2225]">
      {/* Background Visual Engine (3D WebGL Meadow or Generative ASCII) */}
      {bgMode === "3d" ? (
        <CyberMeadow3D showScanlines={true} />
      ) : (
        <Ascii404Background showScanlines={true} />
      )}

      {/* Terminal Mobile Shell Header */}
      <header className="md:hidden sticky top-0 z-40 flex items-center justify-between px-2.5 py-2 border-b border-[#374145] bg-[#161c1f]/95 backdrop-blur-md font-mono text-[12px]">
        {/* Left: Open Mobile Terminal Tree + Quick Pager */}
        <div className="flex items-center gap-1.5 min-w-0">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="flex items-center gap-1 px-2 py-1 border border-[#374145] bg-[#1c2225] text-[#cbe3b3] font-bold active:bg-[#283236] cursor-pointer shrink-0"
            aria-label="Open file explorer"
          >
            <span>$</span>
            <span>tree</span>
          </button>

          {/* Mobile Terminal Pager Controls */}
          <div className="flex items-center border border-[#374145] bg-[#1c2225] shrink-0 text-[11px]">
            <button
              onClick={() => prevFileId && handleSelectFile(prevFileId)}
              disabled={!prevFileId}
              className="px-1.5 py-0.5 text-[#839e9a] hover:text-[#f8f9e8] disabled:opacity-25 cursor-pointer disabled:cursor-not-allowed font-bold"
              title="Previous file"
              aria-label="Previous file"
            >
              ‹
            </button>
            <span className="text-[#374145] select-none">|</span>
            <button
              onClick={() => nextFileId && handleSelectFile(nextFileId)}
              disabled={!nextFileId}
              className="px-1.5 py-0.5 text-[#cbe3b3] hover:text-[#f8f9e8] disabled:opacity-25 cursor-pointer disabled:cursor-not-allowed font-bold"
              title="Next file"
              aria-label="Next file"
            >
              ›
            </button>
          </div>

          <span className="text-[#839e9a] hidden sm:inline select-none">~/</span>
          <span className="text-[#f8f9e8] font-bold truncate max-w-[110px] text-[11px]">{currentFile.name}</span>
        </div>

        {/* Right: Mode Switcher & Quick Contact Command */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={() => switchBgMode(bgMode === "3d" ? "ascii" : "3d")}
            className="px-2 py-1 border border-[#374145] bg-[#1c2225] text-[#adc9bc] text-[10px] font-bold hover:text-[#f8f9e8] cursor-pointer"
            title={`Switch to ${bgMode === "3d" ? "ASCII Matrix" : "3D Meadow"}`}
          >
            [{bgMode === "3d" ? "3D" : "ASCII"}]
          </button>

          <button
            onClick={() => handleSelectFile("contact")}
            className="px-2 py-1 border border-[#cbe3b3] bg-[#cbe3b3] text-[#1c2225] text-[11px] font-bold cursor-pointer"
          >
            :contact
          </button>
        </div>
      </header>

      {/* Main Two-Column Layout */}
      <div className="relative z-10 flex min-h-screen">
        {/* Left Interactive Tree Sidebar */}
        <SiteSidebar
          activeFileId={activeFileId}
          onSelectFile={handleSelectFile}
          mobileOpen={mobileMenuOpen}
          onToggleMobile={() => setMobileMenuOpen(!mobileMenuOpen)}
        />

        {/* Right Code Editor Stage */}
        <div className="flex-1 min-w-0 border-l border-[#374145]/40 bg-[#1c2225]/85 backdrop-blur-md shadow-2xl">
          <CodeEditorView
            file={currentFile}
            onNavigateFile={handleSelectFile}
            onContactClick={() => handleSelectFile("contact")}
          />
        </div>
      </div>

      {/* Terminal Engine Selector */}
      <aside aria-label="Visual Engine Switcher" className="hidden md:flex fixed bottom-3 right-4 z-50 items-center gap-1 p-1 border border-[#374145] bg-[#181e22]/95 backdrop-blur-md font-mono text-[11px]">
        <span className="px-2 text-[10px] text-[#6f8788] select-none">ENGINE:</span>
        <button
          onClick={() => switchBgMode("3d")}
          title="Switch to 3D WebGL Cyber Meadow"
          className={`px-2.5 py-1 transition-all cursor-pointer font-bold ${
            bgMode === "3d"
              ? "bg-[#cbe3b3] text-[#1c2225]"
              : "text-[#839e9a] hover:text-[#f8f9e8] hover:bg-[#232a2e]"
          }`}
        >
          [ 3D_MEADOW ]
        </button>
        <button
          onClick={() => switchBgMode("ascii")}
          title="Switch to retro ASCII Matrix grid"
          className={`px-2.5 py-1 transition-all cursor-pointer font-bold ${
            bgMode === "ascii"
              ? "bg-[#cbe3b3] text-[#1c2225]"
              : "text-[#839e9a] hover:text-[#f8f9e8] hover:bg-[#232a2e]"
          }`}
        >
          [ ASCII_GRID ]
        </button>
      </aside>
    </div>
  );
}
