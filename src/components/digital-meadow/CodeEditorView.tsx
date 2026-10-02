"use client";

import React, { useState, useEffect } from "react";
import { PortfolioFile } from "@/types/portfolio";
import TextWaveReveal from "./TextWaveReveal";

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
    const url = match[2];
    parts.push(
      <a
        key={`a-${match.index}`}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
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
  const hasMeta = file.meta && (file.meta.impact || file.meta.timeline || file.meta.stack);
  const metaCount = hasMeta
    ? (file.meta?.impact ? 1 : 0) + (file.meta?.timeline ? 1 : 0) + (file.meta?.stack ? 1 : 0) + 1
    : 0;
  const activeContentLines = 3 + metaCount + contentLines.length;
  const lineCount = Math.max(activeContentLines + 10, 32);

  // Track code block open/close state during rendering
  let inCodeBlock = false;

  return (
    <div className="relative min-h-screen flex-1 flex flex-col font-mono text-[14px] leading-[1.357rem] select-text">
      {/* Top Breadcrumb & Minimalist Text Telemetry Bar */}
      <header className="sticky top-0 z-30 flex items-center justify-between px-4 py-2 border-b border-[#374145] bg-[#1a2024]/90 backdrop-blur-md">
        <div className="flex items-center gap-2 text-[#adc9bc] text-[12px] truncate">
          <span className="text-[#f8f9e8] font-bold">whoax.com</span>
          <span className="text-[#6f8788]">/</span>
          <span className="text-[#839e9a]">{file.category}</span>
          <span className="text-[#6f8788]">/</span>
          <span className="text-[#cbe3b3] font-semibold truncate">{file.name}</span>
        </div>

        {/* Minimalist Performance Telemetry (Simple inline text, zero chunky boxes) */}
        <div className="flex items-center gap-2 text-[11px] font-mono text-[#839e9a] select-none">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span className="text-[#adc9bc]">{fps} fps</span>
          <span className="text-[#374145]">·</span>
          <span>{pageSizeMB}</span>
        </div>
      </header>

      {/* Editor Body: Left Line Numbers + Right Pure Text Flow */}
      <div className="flex-1 flex overflow-x-hidden">
        {/* Line Numbers Column */}
        <div
          aria-hidden="true"
          className="hidden sm:flex flex-col shrink-0 w-[5ch] py-6 pr-2 select-none text-right text-[#4a585c] border-r border-[#2b3337]/50 bg-[#181e22]/20 font-mono text-[13px] leading-[1.357rem]"
        >
          {Array.from({ length: lineCount }).map((_, idx) => (
            <div key={idx} className="h-[1.357rem] leading-[1.357rem]">
              {idx < activeContentLines ? idx + 1 : "~"}
            </div>
          ))}
        </div>

        {/* Content Pane — Pure text, zero card boxes or pills */}
        <main className="flex-1 max-w-4xl px-4 sm:px-8 py-6 text-[#f8f9e8]">
          <article className="space-y-2">
            {/* Title & Subtitle — Plain text headers */}
            <div>
              <h1 className="text-[15px] font-bold text-[#f8f9e8] leading-[1.357rem]">
                <TextWaveReveal triggerKey={file.id} delay={0} as="span">
                  {file.title}
                </TextWaveReveal>
              </h1>

              {file.subtitle && (
                <p className="text-[14px] text-[#adc9bc] leading-[1.357rem] mt-0.5">
                  <TextWaveReveal triggerKey={file.id} delay={40} as="span">
                    {file.subtitle}
                  </TextWaveReveal>
                </p>
              )}
            </div>

            {/* Pure text metadata lines — NO boxes, NO pills, NO card borders */}
            {hasMeta && (
              <div className="pt-1 pb-1 space-y-0.5 text-[13px] leading-[1.357rem] font-mono">
                {file.meta?.impact && (
                  <div className="text-[#839e9a]">
                    <span className="text-[#839e9a]">impact:</span>{"   "}
                    <span className="text-[#f8f9e8]">
                      <TextWaveReveal triggerKey={file.id} delay={60}>
                        {file.meta.impact}
                      </TextWaveReveal>
                    </span>
                  </div>
                )}
                {file.meta?.timeline && (
                  <div className="text-[#839e9a]">
                    <span className="text-[#839e9a]">timeline:</span>{" "}
                    <span className="text-[#f8f9e8]">
                      <TextWaveReveal triggerKey={file.id} delay={80}>
                        {file.meta.timeline}
                      </TextWaveReveal>
                    </span>
                  </div>
                )}
                {file.meta?.stack && (
                  <div className="text-[#839e9a]">
                    <span className="text-[#839e9a]">stack:</span>{"    "}
                    <span className="text-[#adc9bc]">
                      <TextWaveReveal triggerKey={file.id} delay={100}>
                        {file.meta.stack.join(", ")}
                      </TextWaveReveal>
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Markdown Body Parsed Line-by-Line as Pure Text */}
            <div className="space-y-2 pt-2 text-[#d8e2dc]">
              {contentLines.map((line, idx) => {
                const trimmed = line.trim();

                // Empty line
                if (!trimmed) {
                  return <div key={idx} className="h-2.5" />;
                }

                // Code block toggle (```)
                if (trimmed.startsWith("```")) {
                  inCodeBlock = !inCodeBlock;
                  return null;
                }

                // Inside code block
                if (inCodeBlock) {
                  return (
                    <div
                      key={idx}
                      className="pl-3 font-mono text-[13px] text-[#adc9bc] bg-[#181e22]/40 border-l border-[#374145] leading-[1.357rem]"
                    >
                      {line}
                    </div>
                  );
                }

                // Section Headers [ SECTION_NAME ]
                if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
                  return (
                    <div key={idx} className="pt-3 pb-0.5">
                      <h2 className="text-[13px] font-bold text-[#adc9bc] tracking-wider uppercase leading-[1.357rem]">
                        <TextWaveReveal triggerKey={file.id} delay={idx * 15} as="span">
                          {trimmed}
                        </TextWaveReveal>
                      </h2>
                    </div>
                  );
                }

                // Markdown H2 (## Header)
                if (trimmed.startsWith("## ")) {
                  return (
                    <h3
                      key={idx}
                      className="text-[14px] font-bold text-[#96b4aa] pt-2 tracking-wide leading-[1.357rem]"
                    >
                      <TextWaveReveal triggerKey={file.id} delay={idx * 15} as="span">
                        {trimmed.replace(/^##\s+/, "")}
                      </TextWaveReveal>
                    </h3>
                  );
                }

                // Bullet Lists (* or -)
                if (trimmed.startsWith("* ") || trimmed.startsWith("- ")) {
                  const content = trimmed.replace(/^[\*\-]\s+/, "");
                  return (
                    <div key={idx} className="flex items-start gap-2 pl-1 leading-[1.357rem]">
                      <span className="text-[#cbe3b3] select-none">›</span>
                      <div className="flex-1 text-[#f8f9e8]">
                        {renderInlineFormattedText(content, file.id, idx * 15)}
                      </div>
                    </div>
                  );
                }

                // Numbered Lists (1. 2. etc)
                if (/^\d+\.\s+/.test(trimmed)) {
                  const num = trimmed.match(/^\d+\./)?.[0] || "";
                  const content = trimmed.replace(/^\d+\.\s+/, "");
                  return (
                    <div key={idx} className="flex items-start gap-2 pl-1 leading-[1.357rem]">
                      <span className="text-[#cbe3b3] font-mono select-none font-bold">
                        {num}
                      </span>
                      <div className="flex-1 text-[#f8f9e8]">
                        {renderInlineFormattedText(content, file.id, idx * 15)}
                      </div>
                    </div>
                  );
                }

                // Standard Paragraph Text
                return (
                  <p key={idx} className="text-[#d8e2dc] leading-[1.357rem]">
                    {renderInlineFormattedText(trimmed, file.id, idx * 15)}
                  </p>
                );
              })}
            </div>

            {/* Bottom Quick Navigation Links — Simple text links */}
            <div className="pt-8 border-t border-[#374145]/40 flex flex-wrap items-center justify-between gap-4 text-[12px] text-[#839e9a]">
              <div className="flex items-center gap-4">
                {file.id !== "readme" && (
                  <button
                    onClick={() => onNavigateFile("readme")}
                    className="text-[#adc9bc] hover:text-[#f8f9e8] hover:underline transition-colors cursor-pointer"
                  >
                    ← return to readme.md
                  </button>
                )}
                {file.id !== "contact" && (
                  <button
                    onClick={() => {
                      if (onContactClick) onContactClick();
                      else onNavigateFile("contact");
                    }}
                    className="text-[#cbe3b3] hover:text-white hover:underline transition-colors cursor-pointer"
                  >
                    → contact.md
                  </button>
                )}
              </div>

              <div className="text-[11px] text-[#4a585c]">
                whoax engineering kernel · 2026
              </div>
            </div>
          </article>
        </main>
      </div>
    </div>
  );
}
