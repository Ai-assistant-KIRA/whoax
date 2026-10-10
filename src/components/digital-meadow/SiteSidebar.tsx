"use client";

import React, { useState, useEffect } from "react";
import { FolderNode, PortfolioFile } from "@/types/portfolio";
import { NAVIGATION_TREE, PORTFOLIO_FILES } from "@/data/portfolioData";

import { 
  Folder, 
  FolderOpen, 
  FileText, 
  FileCode, 
  Terminal, 
  Sparkles, 
  Mail, 
  X,
  Compass,
  Layers,
  Cpu,
  Globe,
  PhoneCall,
  Radio,
  Play,
  Video
} from "lucide-react";

interface SiteSidebarProps {
  activeFileId: string;
  onSelectFile: (fileId: string) => void;
  mobileOpen: boolean;
  onToggleMobile: () => void;
}

const STORAGE_KEY = "whoax-nav-open:";

export default function SiteSidebar({
  activeFileId,
  onSelectFile,
  mobileOpen,
  onToggleMobile,
}: SiteSidebarProps) {
  // Folder open states
  const [openFolders, setOpenFolders] = useState<Record<string, boolean>>({
    about: true,
    capabilities: true,
    "voice-agents": true,
    projects: true,
    "field-studies": true,
  });

  // Load stored folder state from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setOpenFolders((prev) => ({ ...prev, ...JSON.parse(stored) }));
      }
    } catch (e) {
      // ignore storage error
    }
  }, []);

  const toggleFolder = (folderName: string) => {
    setOpenFolders((prev) => {
      const next = { ...prev, [folderName]: !prev[folderName] };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch (e) {}
      return next;
    });
  };

  // Keyboard navigation: j/k or arrows to cycle files
  useEffect(() => {
    const fileKeys = Object.keys(PORTFOLIO_FILES);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (["INPUT", "TEXTAREA"].includes((e.target as HTMLElement).tagName)) return;

      if (e.key === "ArrowDown" || e.key === "j") {
        e.preventDefault();
        const currentIndex = fileKeys.indexOf(activeFileId);
        const nextIndex = (currentIndex + 1) % fileKeys.length;
        onSelectFile(fileKeys[nextIndex]);
      } else if (e.key === "ArrowUp" || e.key === "k") {
        e.preventDefault();
        const currentIndex = fileKeys.indexOf(activeFileId);
        const prevIndex = (currentIndex - 1 + fileKeys.length) % fileKeys.length;
        onSelectFile(fileKeys[prevIndex]);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeFileId, onSelectFile]);

  const getFileIcon = (file: PortfolioFile) => {
    if (file.id === "intro-video" || file.icon === "Video") return <Play className="w-3.5 h-3.5 shrink-0 text-[#f5d098]" />;
    if (file.id.includes("voice")) return <PhoneCall className="w-3.5 h-3.5 shrink-0 text-[#cbe3b3]" />;
    if (file.id.includes("api") || file.id.includes("mcp")) return <Layers className="w-3.5 h-3.5 shrink-0 text-[#adc9bc]" />;
    if (file.category === "capabilities") return <Cpu className="w-3.5 h-3.5 shrink-0" />;
    if (file.category === "projects") return <Layers className="w-3.5 h-3.5 shrink-0" />;
    if (file.category === "field-studies") return <Terminal className="w-3.5 h-3.5 shrink-0" />;
    return <FileText className="w-3.5 h-3.5 shrink-0" />;
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          onClick={onToggleMobile}
          className="fixed inset-0 z-40 bg-black/85 backdrop-blur-sm md:hidden transition-opacity"
          aria-hidden="true"
        />
      )}

      {/* Main Terminal Sidebar Container */}
      <aside
        className={`fixed md:sticky top-0 left-0 z-50 h-screen w-[85vw] max-w-[320px] md:w-[300px] shrink-0 border-r border-[#374145] bg-[#161c1f] flex flex-col justify-between font-mono text-[13px] leading-[1.38rem] select-none transition-transform duration-200 md:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="flex-1 overflow-y-auto overflow-x-hidden p-2.5">
          {/* Terminal Prompt Header */}
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#2b3337]">
            <button
              onClick={() => {
                onSelectFile("readme");
                if (mobileOpen) onToggleMobile();
              }}
              className="flex items-center gap-1.5 text-[#d2bdf3] hover:text-[#f8f9e8] text-left truncate cursor-pointer"
            >
              <span className="text-[#cbe3b3] font-bold">$</span>
              <span className="text-[12px] font-bold">whoax@term:~/tree</span>
              <span className="inline-block w-1.5 h-3.5 bg-[#cbe3b3] animate-pulse ml-0.5" />
            </button>

            {/* Mobile Close Button */}
            <button
              onClick={onToggleMobile}
              className="md:hidden px-2 py-0.5 border border-[#374145] bg-[#222a2e] text-[#adc9bc] hover:text-white text-[11px] font-bold cursor-pointer"
              aria-label="Close menu"
            >
              [✕ exit]
            </button>
          </div>

          {/* Terminal File Tree */}
          <nav className="space-y-0.5 text-[13px]">
            {/* README file at top */}
            <button
              onClick={() => {
                onSelectFile("readme");
                if (mobileOpen) onToggleMobile();
              }}
              className={`w-full flex items-center gap-2 px-2 py-1 text-left transition-colors cursor-pointer ${
                activeFileId === "readme"
                  ? "bg-[#cbe3b3] text-[#1c2225] font-bold"
                  : "text-[#adc9bc] hover:bg-[#252e32]"
              }`}
            >
              <span className="text-[#839e9a] font-mono select-none">
                {activeFileId === "readme" ? ">" : " "}
              </span>
              <FileCode className="w-3.5 h-3.5 shrink-0 opacity-80" />
              <span>README.md</span>
            </button>

            {/* INTRO_VIDEO.mp4 featured below README */}
            <button
              onClick={() => {
                onSelectFile("intro-video");
                if (mobileOpen) onToggleMobile();
              }}
              className={`w-full flex items-center justify-between px-2 py-1 text-left transition-colors cursor-pointer ${
                activeFileId === "intro-video"
                  ? "bg-[#cbe3b3] text-[#1c2225] font-bold"
                  : "text-[#adc9bc] hover:bg-[#252e32]"
              }`}
            >
              <div className="flex items-center gap-2 truncate">
                <span className="text-[#839e9a] font-mono select-none">
                  {activeFileId === "intro-video" ? ">" : " "}
                </span>
                <Play className="w-3.5 h-3.5 shrink-0 text-[#f5d098]" />
                <span className="truncate">INTRO_VIDEO.mp4</span>
              </div>
              <span className={`text-[9px] px-1 py-0.5 rounded font-bold shrink-0 ${
                activeFileId === "intro-video"
                  ? "bg-[#1c2225] text-[#cbe3b3]"
                  : "border border-[#f5d098]/40 text-[#f5d098] bg-[#f5d098]/10"
              }`}>
                70s HD
              </span>
            </button>

            {/* Folder Sections */}
            {NAVIGATION_TREE.map((folder) => {
              const isOpen = openFolders[folder.name] ?? true;
              return (
                <div key={folder.name} className="pt-1">
                  {/* Folder Summary Toggle */}
                  <button
                    onClick={() => toggleFolder(folder.name)}
                    className="w-full flex items-center justify-between px-2 py-0.5 text-[#839e9a] hover:bg-[#232a2e] transition-colors cursor-pointer text-left"
                  >
                    <span className="flex items-center gap-1.5">
                      <span className="text-[#6f8788] select-none">{isOpen ? "▼" : "▶"}</span>
                      <span className="text-[#adc9bc] font-bold">{folder.label}/</span>
                    </span>
                    <span className="text-[10px] text-[#4a585c] font-mono">
                      {isOpen ? "[-]" : "[+]"}
                    </span>
                  </button>

                  {/* Folder Children */}
                  {isOpen && (
                    <div className="pl-2 border-l border-[#2b3337] ml-2.5 my-0.5 space-y-0.5">
                      {folder.children.map((item, itemIdx) => {
                        const file = item as PortfolioFile;
                        const isCurrent = activeFileId === file.id;
                        const isLast = itemIdx === folder.children.length - 1;
                        return (
                          <button
                            key={file.id}
                            onClick={() => {
                              onSelectFile(file.id);
                              if (mobileOpen) onToggleMobile();
                            }}
                            className={`w-full flex items-center gap-1.5 px-2 py-1 text-left transition-colors cursor-pointer truncate ${
                              isCurrent
                                ? "bg-[#cbe3b3] text-[#1c2225] font-bold"
                                : "text-[#adc9bc] hover:bg-[#252e32]"
                            }`}
                          >
                            <span className="text-[#4a585c] text-[11px] select-none font-mono">
                              {isLast ? "└──" : "├──"}
                            </span>
                            {getFileIcon(file)}
                            <span className="truncate">{file.name}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Direct Contact item */}
            <div className="pt-1">
              <button
                onClick={() => {
                  onSelectFile("contact");
                  if (mobileOpen) onToggleMobile();
                }}
                className={`w-full flex items-center gap-2 px-2 py-1 text-left transition-colors cursor-pointer ${
                  activeFileId === "contact"
                    ? "bg-[#cbe3b3] text-[#1c2225] font-bold"
                    : "text-[#adc9bc] hover:bg-[#252e32]"
                }`}
              >
                <span className="text-[#839e9a] font-mono select-none">
                  {activeFileId === "contact" ? ">" : " "}
                </span>
                <Mail className="w-3.5 h-3.5 shrink-0 opacity-80" />
                <span>contact.md</span>
              </button>
            </div>
          </nav>
        </div>

        {/* Footer Terminal Telemetry & Commands */}
        <div className="p-2.5 border-t border-[#2b3337] bg-[#14191c] space-y-1 text-[11px] font-mono">
          <div className="text-[#6f8788] text-[10px] pb-1 border-b border-[#232a2e] flex items-center justify-between">
            <span>WHOAX OS v2.6.4</span>
            <span className="text-[#cbe3b3]">● ONLINE</span>
          </div>

          <a
            href="mailto:reda@whoax.com"
            className="flex items-center gap-2 px-2 py-0.5 text-[#96b4aa] hover:text-[#f8f9e8] hover:bg-[#222a2e]"
          >
            <span className="text-[#cbe3b3]">$</span>
            <span className="truncate">mail reda@whoax.com</span>
          </a>

          <a
            href="https://www.linkedin.com/in/reda-alaarabi/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-2 py-0.5 text-[#96b4aa] hover:text-[#f8f9e8] hover:bg-[#222a2e]"
          >
            <span className="text-[#cbe3b3]">$</span>
            <span className="truncate">open linkedin/reda-alaarabi</span>
          </a>

          <a
            href="https://github.com/Ai-assistant-KIRA"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-2 py-0.5 text-[#96b4aa] hover:text-[#f8f9e8] hover:bg-[#222a2e]"
          >
            <span className="text-[#cbe3b3]">$</span>
            <span className="truncate">git github/Ai-assistant-KIRA</span>
          </a>

          <button
            onClick={() => {
              onSelectFile("contact");
              if (mobileOpen) onToggleMobile();
            }}
            className="w-full mt-1.5 py-1 px-2 border border-[#cbe3b3] text-[#cbe3b3] hover:bg-[#cbe3b3] hover:text-[#1c2225] font-bold text-center cursor-pointer transition-colors"
          >
            $ :hire [contact.md]
          </button>
        </div>
      </aside>
    </>
  );
}
