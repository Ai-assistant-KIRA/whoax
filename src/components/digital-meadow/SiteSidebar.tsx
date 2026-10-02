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
  Globe
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
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
        />
      )}

      {/* Main Sidebar Container */}
      <aside
        className={`fixed md:sticky top-0 left-0 z-50 h-screen w-[320px] md:w-[300px] shrink-0 border-r border-[var(--color-surface2,#374145)] bg-[var(--color-base,#1c2225)]/95 backdrop-blur-md flex flex-col justify-between font-mono text-[13px] leading-[1.38rem] select-none transition-transform duration-300 md:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="flex-1 overflow-y-auto overflow-x-hidden p-2.5">
          {/* Working Directory Header */}
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-[var(--color-surface1,#2b3337)]">
            <button
              onClick={() => onSelectFile("readme")}
              className="flex items-center gap-1.5 text-[var(--color-purple,#d2bdf3)] hover:text-[var(--color-text,#f8f9e8)] text-left truncate w-full cursor-pointer"
            >
              <Terminal className="w-3.5 h-3.5 shrink-0 text-[var(--color-purple,#d2bdf3)]" />
              <span className="truncate">Documents/whoax/growth-eng</span>
            </button>
            <button
              onClick={onToggleMobile}
              className="md:hidden text-[var(--color-overlay2,#6f8788)] hover:text-white px-2 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Navigation Tree */}
          <nav className="space-y-0.5">
            {/* README file at top */}
            <button
              onClick={() => {
                onSelectFile("readme");
                if (mobileOpen) onToggleMobile();
              }}
              className={`w-full flex items-center gap-2 px-2 py-1 rounded text-left transition-colors cursor-pointer ${
                activeFileId === "readme"
                  ? "bg-[var(--color-green,#cbe3b3)] text-[var(--color-base,#1c2225)] font-semibold"
                  : "text-[var(--color-subtext2,#adc9bc)] hover:bg-[var(--color-surface2,#374145)]"
              }`}
            >
              <FileCode className="w-3.5 h-3.5 shrink-0 opacity-80" />
              <span>README.md</span>
            </button>

            {/* Folder Sections */}
            {NAVIGATION_TREE.map((folder) => {
              const isOpen = openFolders[folder.name] ?? true;
              return (
                <div key={folder.name} className="pt-1">
                  {/* Folder Summary Toggle */}
                  <button
                    onClick={() => toggleFolder(folder.name)}
                    className="w-full flex items-center justify-between px-2 py-0.5 text-[var(--color-subtext0,#839e9a)] hover:bg-[var(--color-surface2,#374145)] rounded transition-colors cursor-pointer text-left"
                  >
                    <span className="flex items-center gap-2">
                      {isOpen ? (
                        <FolderOpen className="w-3.5 h-3.5 text-[var(--color-overlay2,#6f8788)]" />
                      ) : (
                        <Folder className="w-3.5 h-3.5 text-[var(--color-overlay2,#6f8788)]" />
                      )}
                      <span>{folder.label}</span>
                    </span>
                    <span className="text-[10px] text-[var(--color-overlay0,#4a585c)]">
                      {isOpen ? "[-]" : "[+]"}
                    </span>
                  </button>

                  {/* Folder Children */}
                  {isOpen && (
                    <div className="pl-3.5 space-y-0.5 border-l border-[var(--color-surface1,#2b3337)] ml-3 my-0.5">
                      {folder.children.map((item) => {
                        const file = item as PortfolioFile;
                        const isCurrent = activeFileId === file.id;
                        return (
                          <button
                            key={file.id}
                            onClick={() => {
                              onSelectFile(file.id);
                              if (mobileOpen) onToggleMobile();
                            }}
                            className={`w-full flex items-center gap-2 px-2 py-1 rounded text-left transition-colors cursor-pointer truncate ${
                              isCurrent
                                ? "bg-[var(--color-green,#cbe3b3)] text-[var(--color-base,#1c2225)] font-semibold"
                                : "text-[var(--color-subtext2,#adc9bc)] hover:bg-[var(--color-surface2,#374145)]"
                            }`}
                          >
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
            <div className="pt-2">
              <button
                onClick={() => {
                  onSelectFile("contact");
                  if (mobileOpen) onToggleMobile();
                }}
                className={`w-full flex items-center gap-2 px-2 py-1 rounded text-left transition-colors cursor-pointer ${
                  activeFileId === "contact"
                    ? "bg-[var(--color-green,#cbe3b3)] text-[var(--color-base,#1c2225)] font-semibold"
                    : "text-[var(--color-subtext2,#adc9bc)] hover:bg-[var(--color-surface2,#374145)]"
                }`}
              >
                <Mail className="w-3.5 h-3.5 shrink-0 opacity-80" />
                <span>contact.md</span>
              </button>
            </div>
          </nav>
        </div>

        {/* Footer External Links */}
        <div className="p-3 border-t border-[var(--color-surface1,#2b3337)] bg-[var(--color-base,#1c2225)] space-y-1 text-[12px]">
          <a
            href="mailto:reda@whoax.com"
            className="flex items-center gap-2 px-2 py-0.5 text-[var(--color-subtext1,#96b4aa)] hover:text-[var(--color-text,#f8f9e8)] hover:bg-[var(--color-surface1,#2b3337)] rounded"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>email: reda@whoax.com</span>
          </a>
          <a
            href="https://www.linkedin.com/in/reda-alaarabi/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-2 py-0.5 text-[var(--color-subtext1,#96b4aa)] hover:text-[var(--color-text,#f8f9e8)] hover:bg-[var(--color-surface1,#2b3337)] rounded"
          >
            <svg className="w-3.5 h-3.5 fill-current shrink-0" viewBox="0 0 24 24">
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.62 1.62 0 0 0-1.63 1.62c0 .9.73 1.63 1.63 1.63a1.63 1.63 0 0 0 1.63-1.63c0-.89-.73-1.62-1.63-1.62Z" />
            </svg>
            <span>linkedin / reda-alaarabi</span>
          </a>
          <a
            href="https://github.com/Ai-assistant-KIRA"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-2 py-0.5 text-[var(--color-subtext1,#96b4aa)] hover:text-[var(--color-text,#f8f9e8)] hover:bg-[var(--color-surface1,#2b3337)] rounded"
          >
            <svg className="w-3.5 h-3.5 fill-current shrink-0" viewBox="0 0 24 24">
              <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2Z" />
            </svg>
            <span>github / Ai-assistant-KIRA</span>
          </a>

          <div className="pt-2 text-[10px] text-[var(--color-overlay0,#4a585c)] flex items-center justify-between">
            <span>WHOAX OS v2.6.4</span>
            <span className="text-[var(--color-green,#cbe3b3)]">● ONLINE</span>
          </div>
        </div>
      </aside>
    </>
  );
}
