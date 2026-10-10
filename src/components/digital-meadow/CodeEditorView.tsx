"use client";

import React, { useState, useEffect } from "react";
import { PortfolioFile } from "@/types/portfolio";
import { PORTFOLIO_FILES, FILE_SEQUENCE } from "@/data/portfolioData";
import { ChevronLeft, ChevronRight, Mail } from "lucide-react";
import TextWaveReveal from "./TextWaveReveal";
import VoiceAudioPreview from "./VoiceAudioPreview";
import TerminalVideoShowcase from "./TerminalVideoShowcase";

interface CodeEditorViewProps {
  file: PortfolioFile;
  onNavigateFile: (fileId: string) => void;
  onContactClick?: () => void;
}

/**
 * Helper to render inline markdown:
 * - [label](url) -> Clickable pure text link
 * - `code` -> inline code
 * - **bold** -> strong text
 */
function renderInlineFormattedText(
  text: string,
  fileId: string,
  baseDelay: number
): React.ReactNode {
  // Regex to match [label](url)
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = linkRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      const plain = text.slice(lastIndex, match.index);
      parts.push(
        <TextWaveReveal key={`p-${lastIndex}`} triggerKey={fileId} delay={baseDelay}>
          {plain}
        </TextWaveReveal>
      );
    }
    const label = match[1];
    const rawUrl = match[2].trim();
    const isSafeUrl = /^(https?:\/\/|mailto:|tel:|\/)/i.test(rawUrl);
    const safeHref = isSafeUrl ? rawUrl : "#";
    parts.push(
      <a
        key={`a-${match.index}`}
        href={safeHref}
        target={safeHref.startsWith("http") ? "_blank" : undefined}
        rel={safeHref.startsWith("http") ? "noopener noreferrer" : undefined}
        className="text-[#cbe3b3] underline underline-offset-2 hover:text-[#f8f9e8] transition-colors cursor-pointer"
      >
        <TextWaveReveal triggerKey={fileId} delay={baseDelay + 40}>
          {label}
        </TextWaveReveal>
      </a>
    );
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push(
      <TextWaveReveal key={`p-${lastIndex}`} triggerKey={fileId} delay={baseDelay}>
        {text.slice(lastIndex)}
      </TextWaveReveal>
    );
  }

  return parts.length > 0 ? parts : (
    <TextWaveReveal triggerKey={fileId} delay={baseDelay}>
      {text}
    </TextWaveReveal>
  );
}

export default function CodeEditorView({
  file,
  onNavigateFile,
  onContactClick,
}: CodeEditorViewProps) {
  // Real-time FPS Measurement Hook
  const [fps, setFps] = useState<number>(60);
  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let animId: number;

    const measure = (now: number) => {
      frameCount++;
      const elapsed = now - lastTime;
      if (elapsed >= 500) {
        setFps(Math.round((frameCount * 1000) / elapsed));
        frameCount = 0;
        lastTime = now;
      }
      animId = requestAnimationFrame(measure);
    };

    animId = requestAnimationFrame(measure);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Real-time Page Payload Size in MB
  const [pageSizeMB, setPageSizeMB] = useState<string>("0.34 MB");
  useEffect(() => {
    const calculatePayloadSize = () => {
      if (typeof window !== "undefined" && window.performance) {
        try {
          const resources = performance.getEntriesByType("resource") as PerformanceResourceTiming[];
          let totalBytes = resources.reduce(
            (acc, r) => acc + (r.transferSize || r.encodedBodySize || 0),
            0
          );
          const nav = performance.getEntriesByType("navigation")[0] as
            | PerformanceNavigationTiming
            | undefined;
          if (nav) {
            totalBytes += nav.transferSize || nav.encodedBodySize || 0;
          }
          if (totalBytes > 25000) {
            const mb = (totalBytes / (1024 * 1024)).toFixed(2);
            setPageSizeMB(`${mb} MB`);
            return;
          }
        } catch {
          // fallback gracefully
        }
      }
      setPageSizeMB("0.38 MB");
    };

    calculatePayloadSize();
    const interval = setInterval(calculatePayloadSize, 2500);
    return () => clearInterval(interval);
  }, [file]);

  // Clean raw lines from markdown content
  const rawLines = file.content.split("\n");

  // Filter out redundant initial markdown H1 if identical to file.title
  const contentLines = rawLines.filter((l, idx) => {
    const trimmed = l.trim();
    if (idx === 0 && trimmed.startsWith("# ")) {
      return false;
    }
    return true;
  });

  // Calculate total visual lines for line numbers
  const hasMeta = file.meta && (
    file.meta.impact || 
    file.meta.timeline || 
    file.meta.stack || 
    file.meta.telephony || 
    file.meta.latency
  );
  const metaCount = hasMeta
    ? (file.meta?.impact ? 1 : 0) + 
      (file.meta?.timeline ? 1 : 0) + 
      (file.meta?.telephony ? 1 : 0) + 
      (file.meta?.latency ? 1 : 0) + 
      (file.meta?.stack ? 1 : 0) + 1
    : 0;
  const activeContentLines = 3 + metaCount + contentLines.length;
  const lineCount = Math.max(activeContentLines + 10, 32);

  // Sequential Previous / Next File Navigation
  const currentIndex = FILE_SEQUENCE.indexOf(file.id);
  const prevFileId = currentIndex > 0 ? FILE_SEQUENCE[currentIndex - 1] : null;
  const nextFileId =
    currentIndex >= 0 && currentIndex < FILE_SEQUENCE.length - 1
      ? FILE_SEQUENCE[currentIndex + 1]
      : null;
  const prevFile = prevFileId ? PORTFOLIO_FILES[prevFileId] : null;
  const nextFile = nextFileId ? PORTFOLIO_FILES[nextFileId] : null;

  // Group markdown lines into structured blocks
  const blocks: Array<
    | { type: "code"; lines: string[] }
    | { type: "section"; text: string }
    | { type: "heading"; text: string }
    | { type: "bullet"; text: string }
    | { type: "number"; num: string; text: string }
    | { type: "paragraph"; text: string }
    | { type: "empty" }
  > = [];

  let currentCodeLines: string[] | null = null;

  for (const line of contentLines) {
    const trimmed = line.trim();
    if (trimmed.startsWith("```")) {
      if (currentCodeLines !== null) {
        blocks.push({ type: "code", lines: currentCodeLines });
        currentCodeLines = null;
      } else {
        currentCodeLines = [];
      }
      continue;
    }

    if (currentCodeLines !== null) {
      currentCodeLines.push(line);
      continue;
    }

    if (!trimmed) {
      blocks.push({ type: "empty" });
    } else if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
      blocks.push({ type: "section", text: trimmed });
    } else if (trimmed.startsWith("## ")) {
      blocks.push({ type: "heading", text: trimmed.replace(/^##\s+/, "") });
    } else if (trimmed.startsWith("* ") || trimmed.startsWith("- ")) {
      blocks.push({ type: "bullet", text: trimmed.replace(/^[\*\-]\s+/, "") });
    } else if (/^\d+\.\s+/.test(trimmed)) {
      const num = trimmed.match(/^\d+\./)?.[0] || "";
      blocks.push({ type: "number", num, text: trimmed.replace(/^\d+\.\s+/, "") });
    } else {
      blocks.push({ type: "paragraph", text: trimmed });
    }
  }

  if (currentCodeLines !== null) {
    blocks.push({ type: "code", lines: currentCodeLines });
  }

  return (
    <div className="relative min-h-screen flex-1 flex flex-col font-mono text-[14px] leading-relaxed select-text">
      {/* Desktop-Only Top Breadcrumb & Minimalist Text Telemetry Bar */}
      <header className="hidden md:flex sticky top-0 z-30 items-center justify-between px-4 py-2 border-b border-[#374145] bg-[#1a2024]/90 backdrop-blur-md">
        <div className="flex items-center gap-2 text-[#adc9bc] text-[12px] truncate">
          <span className="text-[#f8f9e8] font-bold">whoax.com</span>
          <span className="text-[#6f8788]">/</span>
          <span className="text-[#839e9a]">{file.category}</span>
          <span className="text-[#6f8788]">/</span>
          <span className="text-[#cbe3b3] font-semibold truncate">{file.name}</span>
        </div>

        {/* Minimalist Performance Telemetry */}
        <div className="flex items-center gap-2 text-[11px] font-mono text-[#839e9a] select-none">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span className="text-[#adc9bc]">{fps} fps</span>
          <span className="text-[#374145]">·</span>
          <span>{pageSizeMB}</span>
        </div>
      </header>

      {/* Editor Body: Left Line Numbers + Right Responsive Flow */}
      <div className="flex-1 flex overflow-x-hidden">
        {/* Line Numbers Column (Desktop / Tablet only) */}
        <div
          aria-hidden="true"
          className="hidden sm:flex flex-col shrink-0 w-[5ch] py-6 pr-2 select-none text-right text-[#4a585c] border-r border-[#2b3337]/50 bg-[#181e22]/20 font-mono text-[13px] leading-relaxed"
        >
          {Array.from({ length: lineCount }).map((_, idx) => (
            <div key={idx} className="leading-relaxed">
              {idx < activeContentLines ? idx + 1 : "~"}
            </div>
          ))}
        </div>

        {/* Content Pane — Mobile-optimized responsive spacing */}
        <main className="flex-1 max-w-4xl px-3.5 sm:px-8 py-5 sm:py-6 pb-28 md:pb-16 text-[#f8f9e8]">
          <article className="space-y-3">
            {/* Title & Subtitle */}
            <div>
              <h1 className="text-[17px] sm:text-[20px] font-bold text-[#f8f9e8] leading-tight">
                <TextWaveReveal triggerKey={file.id} delay={0} as="span">
                  {file.title}
                </TextWaveReveal>
              </h1>

              {file.subtitle && (
                <p className="text-[13px] sm:text-[14px] text-[#adc9bc] leading-snug mt-1">
                  <TextWaveReveal triggerKey={file.id} delay={40} as="span">
                    {file.subtitle}
                  </TextWaveReveal>
                </p>
              )}
            </div>

            {/* Terminal Metadata / Spec Block */}
            {hasMeta && (
              <div className="my-2.5 p-3 border border-[#374145] bg-[#14181a] font-mono text-[12px] sm:text-[13px] leading-relaxed space-y-1">
                <div className="text-[11px] text-[#839e9a] pb-1 mb-1 border-b border-[#2b3337] flex items-center justify-between select-none">
                  <span>// FILE_SPECIFICATIONS</span>
                  <span className="text-[#cbe3b3]">SYSINFO</span>
                </div>
                {file.meta?.impact && (
                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-1">
                    <span className="text-[#839e9a] w-[95px] shrink-0 font-bold">impact    ::</span>
                    <span className="text-[#f8f9e8]">
                      <TextWaveReveal triggerKey={file.id} delay={60}>
                        {file.meta.impact}
                      </TextWaveReveal>
                    </span>
                  </div>
                )}
                {file.meta?.telephony && (
                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-1">
                    <span className="text-[#839e9a] w-[95px] shrink-0 font-bold">telephony ::</span>
                    <span className="text-[#cbe3b3]">
                      <TextWaveReveal triggerKey={file.id} delay={70}>
                        {file.meta.telephony}
                      </TextWaveReveal>
                    </span>
                  </div>
                )}
                {file.meta?.latency && (
                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-1">
                    <span className="text-[#839e9a] w-[95px] shrink-0 font-bold">latency   ::</span>
                    <span className="text-[#f8f9e8] font-bold">
                      <TextWaveReveal triggerKey={file.id} delay={80}>
                        {file.meta.latency}
                      </TextWaveReveal>
                    </span>
                  </div>
                )}
                {file.meta?.timeline && (
                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-1">
                    <span className="text-[#839e9a] w-[95px] shrink-0 font-bold">timeline  ::</span>
                    <span className="text-[#adc9bc]">
                      <TextWaveReveal triggerKey={file.id} delay={90}>
                        {file.meta.timeline}
                      </TextWaveReveal>
                    </span>
                  </div>
                )}
                {file.meta?.stack && (
                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-1">
                    <span className="text-[#839e9a] w-[95px] shrink-0 font-bold">stack     ::</span>
                    <span className="text-[#adc9bc]">
                      <TextWaveReveal triggerKey={file.id} delay={100}>
                        {file.meta.stack.join(" · ")}
                      </TextWaveReveal>
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Executive Video Dispatch Showcase (Featured on README and INTRO_VIDEO) */}
            {(file.meta?.videoPreview || file.id === "readme" || file.id === "intro-video") && (
              <TerminalVideoShowcase
                src={file.meta?.videoPreview?.src || "/portfolio-intro.mp4"}
                title={file.meta?.videoPreview?.title || "70-Second Executive Video Briefing"}
                durationSec={file.meta?.videoPreview?.durationSec || 70}
                onContactClick={onContactClick}
              />
            )}

            {/* Interactive Voice Call Audio Preview Widget */}
            {file.meta?.audioSample && (
              <VoiceAudioPreview
                callerText={file.meta.audioSample.callerText}
                agentText={file.meta.audioSample.agentText}
                durationSec={file.meta.audioSample.durationSec}
                telephonyInfo={file.meta.telephony}
              />
            )}

            {/* Structured Content Block Stream */}
            <div className="space-y-2 pt-2 text-[#d8e2dc]">
              {blocks.map((block, idx) => {
                if (block.type === "empty") {
                  return <div key={idx} className="h-2.5" />;
                }

                if (block.type === "section") {
                  const label = block.text.replace(/^\[\s*|\s*\]$/g, "");
                  return (
                    <div key={idx} className="pt-4 pb-1">
                      <span className="text-[#839e9a] font-mono">[ </span>
                      <span className="text-[#cbe3b3] font-bold uppercase tracking-wider text-[13px] font-mono">
                        <TextWaveReveal triggerKey={file.id} delay={idx * 15} as="span">
                          {label}
                        </TextWaveReveal>
                      </span>
                      <span className="text-[#839e9a] font-mono"> ]</span>
                    </div>
                  );
                }

                if (block.type === "heading") {
                  return (
                    <h2
                      key={idx}
                      className="text-[15px] font-bold text-[#cbe3b3] pt-3 tracking-wide leading-snug"
                    >
                      <TextWaveReveal triggerKey={file.id} delay={idx * 15} as="span">
                        {block.text}
                      </TextWaveReveal>
                    </h2>
                  );
                }

                if (block.type === "code") {
                  return (
                    <div
                      key={idx}
                      className="my-3 border border-[#374145] bg-[#14181a] font-mono text-[12px] sm:text-[13px]"
                    >
                      <div className="px-3 py-1 border-b border-[#2b3337] bg-[#1a2024] text-[#839e9a] text-[10px] flex items-center justify-between select-none">
                        <span>// terminal: code-stream</span>
                        <span className="text-[#6f8788]">utf-8</span>
                      </div>
                      <pre className="p-3 overflow-x-auto text-[#adc9bc] leading-relaxed whitespace-pre scrollbar-thin">
                        <code>{block.lines.join("\n")}</code>
                      </pre>
                    </div>
                  );
                }

                if (block.type === "bullet") {
                  return (
                    <div key={idx} className="flex items-start gap-2.5 py-1 leading-relaxed">
                      <span className="text-[#cbe3b3] select-none shrink-0 font-bold mt-0.5">›</span>
                      <div className="flex-1 text-[#f8f9e8] text-[13.5px] sm:text-[14px]">
                        {renderInlineFormattedText(block.text, file.id, idx * 15)}
                      </div>
                    </div>
                  );
                }

                if (block.type === "number") {
                  return (
                    <div key={idx} className="flex items-start gap-2.5 py-1 leading-relaxed">
                      <span className="text-[#cbe3b3] font-mono select-none font-bold shrink-0 mt-0.5">
                        {block.num}
                      </span>
                      <div className="flex-1 text-[#f8f9e8] text-[13.5px] sm:text-[14px]">
                        {renderInlineFormattedText(block.text, file.id, idx * 15)}
                      </div>
                    </div>
                  );
                }

                return (
                  <p key={idx} className="text-[#d8e2dc] text-[13.5px] sm:text-[14px] leading-relaxed">
                    {renderInlineFormattedText(block.text, file.id, idx * 15)}
                  </p>
                );
              })}
            </div>

            {/* Terminal Command Line Interface & File Navigation */}
            <div className="mt-8 pt-4 border-t border-[#374145] font-mono text-[12px] space-y-3">
              <div className="flex items-center gap-2 text-[#839e9a] select-none">
                <span className="text-[#cbe3b3] font-bold">whoax@term:~$</span>
                <span className="text-[#adc9bc]">cat ./nav-controls</span>
              </div>

              {/* Terminal Command Navigation Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[12px]">
                {prevFile ? (
                  <button
                    onClick={() => onNavigateFile(prevFile.id)}
                    className="p-2.5 border border-[#374145] bg-[#182023] hover:border-[#cbe3b3] hover:bg-[#20292d] text-left transition-colors cursor-pointer group"
                  >
                    <div className="text-[10px] text-[#839e9a] font-bold">$ :prev</div>
                    <div className="text-[#f8f9e8] group-hover:text-[#cbe3b3] truncate mt-0.5">
                      cat {prevFile.name}
                    </div>
                  </button>
                ) : (
                  <div className="hidden sm:block" />
                )}

                {nextFile ? (
                  <button
                    onClick={() => onNavigateFile(nextFile.id)}
                    className="p-2.5 border border-[#374145] bg-[#182023] hover:border-[#cbe3b3] hover:bg-[#20292d] text-left sm:text-right transition-colors cursor-pointer group sm:col-start-2"
                  >
                    <div className="text-[10px] text-[#cbe3b3] font-bold">$ :next</div>
                    <div className="text-[#f8f9e8] group-hover:text-[#cbe3b3] truncate mt-0.5">
                      cat {nextFile.name}
                    </div>
                  </button>
                ) : (
                  <div className="hidden sm:block" />
                )}
              </div>

              {/* Direct Contact CLI Prompt */}
              <div className="p-3 border border-[#374145] bg-[#14181b] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5">
                <div className="space-y-0.5">
                  <div className="text-[#cbe3b3] font-bold flex items-center gap-1.5 text-[12px]">
                    <span>$</span>
                    <span>./inquire-operator.sh</span>
                  </div>
                  <div className="text-[11px] text-[#839e9a]">
                    Senior engineering delivery within 24h. No sales deck.
                  </div>
                </div>

                <button
                  onClick={() => {
                    if (onContactClick) onContactClick();
                    else onNavigateFile("contact");
                  }}
                  className="w-full sm:w-auto px-4 py-2 border border-[#cbe3b3] bg-[#cbe3b3] text-[#1c2225] font-bold hover:bg-[#d9efc4] transition-colors cursor-pointer text-center text-[12px]"
                >
                  $ :contact [open contact.md]
                </button>
              </div>

              {/* Vim / Tmux Terminal Status Bar */}
              <div className="py-1 px-2 border border-[#2b3337] bg-[#121618] text-[10px] text-[#6f8788] flex flex-wrap items-center justify-between gap-2 select-none">
                <div className="flex items-center gap-2">
                  <span className="text-[#cbe3b3] font-bold">NORMAL</span>
                  <span>·</span>
                  <span className="text-[#adc9bc]">whoax.com/{file.name}</span>
                  <span>·</span>
                  <span>utf-8</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>100%</span>
                  <span>·</span>
                  <span>pts/0</span>
                </div>
              </div>
            </div>
          </article>
        </main>
      </div>
    </div>
  );
}
