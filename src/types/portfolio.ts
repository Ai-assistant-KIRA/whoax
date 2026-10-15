export type FileType = "markdown" | "code" | "external" | "canvas" | "contact";

export interface PortfolioFile {
  id: string;
  name: string;
  path: string;
  icon: string;
  category: "about" | "capabilities" | "voice-agents" | "projects" | "field-studies" | "root";
  title: string;
  subtitle?: string;
  lastUpdated?: string;
  tags?: string[];
  content: string;
  codeSnippet?: string;
  meta?: {
    client?: string;
    timeline?: string;
    impact?: string;
    stack?: string[];
    liveUrl?: string;
    payrollSaved?: string;
    rolesReplaced?: string;
    latency?: string;
    telephony?: string;
    audioSample?: {
      callerText: string;
      agentText: string;
      durationSec: number;
    };
    videoPreview?: {
      src: string;
      title: string;
      durationSec: number;
      /** Label shown in the player's title bar. Defaults to INTRO_VIDEO.mp4. */
      fileName?: string;
      /** Still frame shown before playback starts. */
      poster?: string;
      /** One line under the play button. */
      note?: string;
      /** Scene markers for the chapter bar. Defaults to the intro film's chapters. */
      chapters?: VideoChapter[];
      /** Decorative CRT scanlines over the picture. Defaults to on. */
      scanlines?: boolean;
    };
    /** Product screenshots. The first entry renders full width as the lead image. */
    gallery?: GalleryShot[];
  };
}

export interface VideoChapter {
  label: string;
  sub: string;
  timeSec: number;
}

export interface GalleryShot {
  /** Full-size image (also the click-through target). */
  src: string;
  /** Smaller variant for narrow slots, used in srcSet. */
  srcSmall?: string;
  width: number;
  height: number;
  alt: string;
  /** Short file-style label, e.g. "home". */
  label: string;
  caption: string;
}

export interface FolderNode {
  name: string;
  label: string;
  icon?: string;
  children: (FolderNode | PortfolioFile)[];
}


