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
    };
  };
}

export interface FolderNode {
  name: string;
  label: string;
  icon?: string;
  children: (FolderNode | PortfolioFile)[];
}


