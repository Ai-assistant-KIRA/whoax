"use client";

import React, { useState, useCallback } from "react";
import Ascii404Background from "./Ascii404Background";
import SiteSidebar from "./SiteSidebar";
import CodeEditorView from "./CodeEditorView";
import { PORTFOLIO_FILES } from "@/data/portfolioData";

export default function DigitalMeadowPortfolio() {
  const [activeFileId, setActiveFileId] = useState<string>("readme");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSelectFile = useCallback((fileId: string) => {
    if (!PORTFOLIO_FILES[fileId]) return;
    setActiveFileId(fileId);
  }, []);

  const currentFile = PORTFOLIO_FILES[activeFileId] || PORTFOLIO_FILES["readme"];

  return (
    <div className="relative min-h-screen text-[var(--color-text,#f8f9e8)] overflow-x-hidden font-mono antialiased">
      {/* ASCII Generative Matrix Engine (Background) */}
      <Ascii404Background />

      {/* Mobile Top Navigation Header */}
      <div className="md:hidden sticky top-0 z-40 flex items-center justify-between px-3 py-2 border-b border-[#374145] bg-[#1c2225]/95 backdrop-blur-md">
        <button
          onClick={() => handleSelectFile("readme")}
          className="text-xs font-bold text-[#cbe3b3]"
        >
          whoax.com // TERMINAL
        </button>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="px-2.5 py-1 text-xs rounded border border-[#374145] bg-[#2b3337] text-[#f8f9e8]"
        >
          Menu {mobileMenuOpen ? "[-]" : "[+]"}
        </button>
      </div>

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
    </div>
  );
}
