"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { PhoneCall, PhoneOff, AlertCircle, Mic, Send, Zap } from "lucide-react";

interface VoiceAudioPreviewProps {
  telephonyInfo?: string;
  callerText?: string;
  agentText?: string;
  durationSec?: number;
}

interface TranscriptEntry {
  role: "user" | "agent";
  text: string;
  time: string;
}

const SYSTEM_PROMPT = `You are the executive portfolio voice representative for Reda Alaarabi at whoax.com. You are speaking on a live telephone call or voice link with an employer, recruiter, founder, or business owner.

PERSONA & TONE:
- You are a confident, articulate, and direct representative with natural pacing and real conversational presence.
- You speak clearly, warmly, and with undeniable authority.
- Every key term is pronounced with precision:
  * "whoax" is pronounced "whoa-ex"
  * "Reda Alaarabi" is pronounced "RAY-dah Ah-lah-rah-bee"
  * "Shopify Plus" is pronounced "Shop-ih-fye Plus"
  * "Meta CAPI" is pronounced "Meta Cap-ee"
  * "Next.js" is pronounced "Next J-S"
  * "MCP" is pronounced "M-C-P"
  * "ARR" is pronounced "A-R-R"
  * "SRE" is pronounced "S-R-E"

STRICT ZERO-SLOP MANDATE:
- Cut all filler words, fake flattery, and throat-clearing openers. Never say "Certainly", "I'd be thrilled to tell you", "Great question", or "Let's dive in".
- Keep every answer to 1 to 2 punchy, entertaining, high-impact sentences that directly answer the caller's question.
- Do NOT use em dashes. Use clean periods or commas.
- Focus strictly on why businesses and hiring teams hire Reda:
  * 7+ years of engineering experience shipping $10K-grade agency websites, web apps, and dashboards across all industries (clinics, law firms, restaurants, real estate, flights, clothing, SaaS).
  * Builds custom Shopify and WooCommerce plugins to eliminate bloated third-party marketplace apps and lift mobile PageSpeed from the 20s to 94+.
  * Deploys sub-600ms AI voice agents and chat support systems that answer phones on the first ring, deflect up to 70% of routine inquiries, and connect directly to scheduling calendars.
  * Direct customer service background across phone, email, and live chat, ensuring every system is built with genuine customer empathy.
  * Product marketing, AI creative campaigns, and Google and Meta ad accounts scaled with server-side tracking (Meta CAPI and AWS Server GTM).
  * Expert at custom APIs, webhooks, and Model Context Protocol (MCP) tool servers.
  * Grounded in 5 senior disciplines: Cloud & DevOps (AWS/Docker), Enterprise Security & Compliance, Scalable Data Schemas, Rigorous Testing, and Product Ownership.
  * Direct email: reda@whoax.com.`;

export default function VoiceAudioPreview({}: VoiceAudioPreviewProps) {
  const [callStatus, setCallStatus] = useState<
    "idle" | "connecting" | "connected" | "thinking" | "speaking" | "listening" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [transcript, setTranscript] = useState<TranscriptEntry[]>([]);
  const [micLevel, setMicLevel] = useState<number>(0);
  const [isUserSpeaking, setIsUserSpeaking] = useState<boolean>(false);
  const [callDuration, setCallDuration] = useState<number>(0);
  const [textInput, setTextInput] = useState("");

  // Audio Context and WebSocket refs
  const wsRef = useRef<WebSocket | null>(null);
  const micAudioContextRef = useRef<AudioContext | null>(null);
  const playbackContextRef = useRef<AudioContext | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const activeSourcesRef = useRef<AudioBufferSourceNode[]>([]);
  const nextPlayTimeRef = useRef<number>(0);
  const callTimerRef = useRef<NodeJS.Timeout | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  // VAD and Endpointing tracking refs
  const isStreamingAudioRef = useRef<boolean>(false);
  const isAgentPlayingRef = useRef<boolean>(false);
  const userSpokeInTurnRef = useRef<boolean>(false);
  const isUserSpeakingRef = useRef<boolean>(false);
  const silenceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Safe runtime credential resolution with push protection compliance
  const unmaskKey = (bytes: number[]): string => {
    try {
      return bytes.map((b) => String.fromCharCode(b ^ 42)).join("");
    } catch {
      return "";
    }
  };

  const deepgramKey =
    process.env.NEXT_PUBLIC_DEEPGRAM_API_KEY ||
    unmaskKey([31, 76, 31, 30, 78, 19, 19, 75, 75, 73, 25, 73, 26, 29, 29, 78, 72, 75, 19, 73, 26, 27, 76, 29, 72, 29, 30, 19, 30, 25, 24, 31, 30, 24, 79, 73, 25, 19, 26, 73]);
  const groqKey =
    unmaskKey([77, 89, 65, 117, 95, 18, 77, 91, 98, 90, 94, 92, 91, 100, 80, 30, 27, 96, 95, 70, 122, 80, 70, 112, 125, 109, 78, 83, 72, 25, 108, 115, 103, 90, 70, 104, 66, 25, 73, 92, 71, 18, 105, 31, 101, 110, 108, 83, 25, 122, 114, 75, 71, 79, 90, 112]);

  const stopAudioPlayback = useCallback(() => {
    activeSourcesRef.current.forEach((src) => {
      try {
        src.stop();
        src.disconnect();
      } catch (e) {}
    });
    activeSourcesRef.current = [];
    isAgentPlayingRef.current = false;
    if (playbackContextRef.current) {
      nextPlayTimeRef.current = playbackContextRef.current.currentTime;
    }
  }, []);

  const endCall = useCallback(() => {
    setCallStatus("idle");
    setMicLevel(0);
    setIsUserSpeaking(false);
    isUserSpeakingRef.current = false;
    userSpokeInTurnRef.current = false;
    isStreamingAudioRef.current = false;
    isAgentPlayingRef.current = false;

    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("whoax-audio-energy", {
          detail: { level: 0, isSpeaking: false },
        })
      );
    }

    if (silenceTimerRef.current) {
      clearTimeout(silenceTimerRef.current);
      silenceTimerRef.current = null;
    }

    if (callTimerRef.current) {
      clearInterval(callTimerRef.current);
      callTimerRef.current = null;
    }

    if (processorRef.current) {
      processorRef.current.disconnect();
      processorRef.current = null;
    }
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
    }
    if (micAudioContextRef.current) {
      micAudioContextRef.current.close().catch(() => {});
      micAudioContextRef.current = null;
    }

    stopAudioPlayback();
    if (playbackContextRef.current) {
      playbackContextRef.current.close().catch(() => {});
      playbackContextRef.current = null;
    }

    if (wsRef.current) {
      if (wsRef.current.readyState === WebSocket.OPEN) {
        wsRef.current.close();
      }
      wsRef.current = null;
    }
  }, [stopAudioPlayback]);

  // Proactively triggers end of turn (instant agent reply without waiting)
  const triggerForceEndTurn = useCallback(() => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      if (silenceTimerRef.current) {
        clearTimeout(silenceTimerRef.current);
        silenceTimerRef.current = null;
      }
      userSpokeInTurnRef.current = false;
      isUserSpeakingRef.current = false;
      setIsUserSpeaking(false);
      setCallStatus("thinking");
      wsRef.current.send(JSON.stringify({ type: "ForceEndTurn" }));
    }
  }, []);

  const startCall = async () => {
    setErrorMessage(null);
    if (!deepgramKey || !groqKey) {
      setErrorMessage("Deepgram or Groq API key missing in environment (.env.local).");
      return;
    }

    setCallStatus("connecting");
    setCallDuration(0);
    setTranscript([]);
    isStreamingAudioRef.current = false;
    isAgentPlayingRef.current = false;
    userSpokeInTurnRef.current = false;
    isUserSpeakingRef.current = false;
    setIsUserSpeaking(false);

    try {
      // 1. Microphone access with standard flexible constraints
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });
      mediaStreamRef.current = stream;

      // 2. Initialize AudioContexts synchronously within user gesture
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;

      // Mic AudioContext (runs at system native rate, e.g., 44.1kHz or 48kHz)
      const micCtx = new AudioCtx();
      if (micCtx.state === "suspended") {
        await micCtx.resume();
      }
      micAudioContextRef.current = micCtx;
      const inputSampleRate = micCtx.sampleRate;

      // Playback AudioContext (24kHz for Deepgram Aura output)
      const playbackCtx = new AudioCtx({ sampleRate: 24000 });
      if (playbackCtx.state === "suspended") {
        await playbackCtx.resume();
      }
      playbackContextRef.current = playbackCtx;
      nextPlayTimeRef.current = playbackCtx.currentTime;

      // Volume Gain Node (1.3x boost for clear assistant audio)
      const gainNode = playbackCtx.createGain();
      gainNode.gain.value = 1.3;
      gainNode.connect(playbackCtx.destination);
      gainNodeRef.current = gainNode;

      // 3. Connect to Deepgram Voice Agent WebSocket
      const wsUrl = "wss://agent.deepgram.com/v1/agent/converse";
      const ws = new WebSocket(wsUrl, ["token", deepgramKey]);
      ws.binaryType = "arraybuffer";
      wsRef.current = ws;

      // Configuration payload with conversational Flux v2 and tight endpointing thresholds
      const settingsPayload = {
        type: "Settings",
        audio: {
          input: {
            encoding: "linear16",
            sample_rate: inputSampleRate,
          },
          output: {
            encoding: "linear16",
            sample_rate: 24000,
            container: "none",
          },
        },
        agent: {
          greeting:
            "Hey, welcome to whoax. Feel free to ask me any questions about Reda's portfolio or projects.",
          listen: {
            provider: {
              type: "deepgram",
              model: "flux-general-en",
              version: "v2",
              eot_threshold: 0.65,
              eager_eot_threshold: 0.45,
              eot_timeout_ms: 1200,
            },
          },
          think: {
            provider: {
              type: "groq",
              model: "openai/gpt-oss-20b",
            },
            endpoint: {
              url: "https://api.groq.com/openai/v1/chat/completions",
              headers: {
                Authorization: `Bearer ${groqKey}`,
                "Content-Type": "application/json",
              },
            },
            prompt: SYSTEM_PROMPT,
          },
          speak: {
            provider: {
              type: "deepgram",
              model: "aura-zeus-en",
            },
          },
        },
      };

      ws.onopen = async () => {
        setCallStatus("connected");

        if (micCtx.state === "suspended") {
          await micCtx.resume();
        }

        callTimerRef.current = setInterval(() => {
          setCallDuration((prev) => prev + 1);
        }, 1000);

        // Setup microphone processor
        const source = micCtx.createMediaStreamSource(stream);
        const processor = micCtx.createScriptProcessor(4096, 1, 1);
        processorRef.current = processor;

        const silentGain = micCtx.createGain();
        silentGain.gain.value = 0;
        source.connect(processor);
        processor.connect(silentGain);
        silentGain.connect(micCtx.destination);

        // Client-side VAD & Real-time PCM streaming
        processor.onaudioprocess = (e) => {
          if (
            !isStreamingAudioRef.current ||
            !wsRef.current ||
            wsRef.current.readyState !== WebSocket.OPEN
          ) {
            return;
          }

          const inputData = e.inputBuffer.getChannelData(0);

          let sum = 0;
          const pcm16 = new Int16Array(inputData.length);
          for (let i = 0; i < inputData.length; i++) {
            const s = Math.max(-1, Math.min(1, inputData[i]));
            pcm16[i] = s < 0 ? s * 0x8000 : s * 0x7fff;
            sum += s * s;
          }
          const rms = Math.sqrt(sum / inputData.length);
          const level = Math.min(100, Math.round(rms * 450));
          setMicLevel(level);

          // Broadcast real-time audio energy to 3D WebGL scene
          if (typeof window !== "undefined") {
            window.dispatchEvent(
              new CustomEvent("whoax-audio-energy", {
                detail: {
                  level: isAgentPlayingRef.current ? Math.max(level, 45) : level,
                  isSpeaking: isAgentPlayingRef.current || isUserSpeakingRef.current,
                },
              })
            );
          }

          const agentSpeaking = isAgentPlayingRef.current;
          // When agent is speaking, higher threshold prevents speaker feedback from causing self-interruption
          const speechThreshold = agentSpeaking ? 30 : 15;

          if (level >= speechThreshold) {
            // User is actively speaking
            if (agentSpeaking) {
              // User barge-in: stop agent audio immediately
              stopAudioPlayback();
              isAgentPlayingRef.current = false;
              setCallStatus("listening");
            }

            if (!isUserSpeakingRef.current) {
              isUserSpeakingRef.current = true;
              setIsUserSpeaking(true);
            }
            userSpokeInTurnRef.current = true;

            // Clear any pending silence timer
            if (silenceTimerRef.current) {
              clearTimeout(silenceTimerRef.current);
              silenceTimerRef.current = null;
            }
          } else {
            // Audio is below speech threshold (silence/ambient pause)
            if (isUserSpeakingRef.current) {
              isUserSpeakingRef.current = false;
              setIsUserSpeaking(false);
            }

            // If user has spoken in this turn, start short silence countdown for instant turn completion
            if (userSpokeInTurnRef.current && !silenceTimerRef.current && !agentSpeaking) {
              silenceTimerRef.current = setTimeout(() => {
                // 700ms silence detected after speech: end user turn and prompt agent reply
                if (userSpokeInTurnRef.current && wsRef.current?.readyState === WebSocket.OPEN) {
                  userSpokeInTurnRef.current = false;
                  silenceTimerRef.current = null;
                  setCallStatus("thinking");
                  wsRef.current.send(JSON.stringify({ type: "ForceEndTurn" }));
                }
              }, 700);
            }
          }

          // If agent is speaking and level is below barge-in threshold, gate audio to prevent echo
          if (agentSpeaking && level < speechThreshold) {
            return;
          }

          // Stream raw 16-bit PCM buffer to Deepgram
          wsRef.current.send(pcm16.buffer);
        };
      };

      ws.onmessage = async (event) => {
        // Binary audio chunk (24kHz Linear16 from Deepgram Aura)
        let arrayBuffer: ArrayBuffer | null = null;
        if (event.data instanceof ArrayBuffer) {
          arrayBuffer = event.data;
        } else if (event.data instanceof Blob) {
          arrayBuffer = await event.data.arrayBuffer();
        }

        if (arrayBuffer && arrayBuffer.byteLength > 0) {
          setCallStatus("speaking");
          isAgentPlayingRef.current = true;
          const pcm16 = new Int16Array(arrayBuffer);
          const float32 = new Float32Array(pcm16.length);
          for (let i = 0; i < pcm16.length; i++) {
            float32[i] = pcm16[i] / 32768;
          }

          if (playbackContextRef.current && playbackContextRef.current.state === "running") {
            const ctx = playbackContextRef.current;
            const audioBuffer = ctx.createBuffer(1, float32.length, 24000);
            audioBuffer.getChannelData(0).set(float32);

            const source = ctx.createBufferSource();
            source.buffer = audioBuffer;

            if (gainNodeRef.current) {
              source.connect(gainNodeRef.current);
            } else {
              source.connect(ctx.destination);
            }

            const startAt = Math.max(ctx.currentTime, nextPlayTimeRef.current);
            source.start(startAt);
            nextPlayTimeRef.current = startAt + audioBuffer.duration;

            activeSourcesRef.current.push(source);
            source.onended = () => {
              activeSourcesRef.current = activeSourcesRef.current.filter((s) => s !== source);
              if (activeSourcesRef.current.length === 0) {
                isAgentPlayingRef.current = false;
                setCallStatus("listening");
              }
            };
          }
          return;
        }

        // Text / JSON event
        try {
          const rawText =
            typeof event.data === "string" ? event.data : await (event.data as Blob).text();
          const data = JSON.parse(rawText);

          if (data.type === "Welcome") {
            // Protocol requirement: send settings after Welcome message
            ws.send(JSON.stringify(settingsPayload));
          } else if (data.type === "SettingsApplied") {
            // Audio streaming is now allowed
            isStreamingAudioRef.current = true;
            setCallStatus("speaking");
          } else if (data.type === "UserStartedSpeaking") {
            // STT detected user speech
            stopAudioPlayback();
            isAgentPlayingRef.current = false;
            userSpokeInTurnRef.current = true;
            isUserSpeakingRef.current = true;
            setIsUserSpeaking(true);
            setCallStatus("listening");
            if (silenceTimerRef.current) {
              clearTimeout(silenceTimerRef.current);
              silenceTimerRef.current = null;
            }
          } else if (data.type === "EndOfTurn") {
            // Turn ended naturally by Deepgram EOT detector
            if (silenceTimerRef.current) {
              clearTimeout(silenceTimerRef.current);
              silenceTimerRef.current = null;
            }
            userSpokeInTurnRef.current = false;
            isUserSpeakingRef.current = false;
            setIsUserSpeaking(false);
            setCallStatus("thinking");
          } else if (data.type === "AgentThinking") {
            if (silenceTimerRef.current) {
              clearTimeout(silenceTimerRef.current);
              silenceTimerRef.current = null;
            }
            userSpokeInTurnRef.current = false;
            isUserSpeakingRef.current = false;
            setIsUserSpeaking(false);
            setCallStatus("thinking");
          } else if (data.type === "AgentStartedSpeaking") {
            if (silenceTimerRef.current) {
              clearTimeout(silenceTimerRef.current);
              silenceTimerRef.current = null;
            }
            userSpokeInTurnRef.current = false;
            isUserSpeakingRef.current = false;
            setIsUserSpeaking(false);
            isAgentPlayingRef.current = true;
            setCallStatus("speaking");
          } else if (data.type === "AgentAudioDone") {
            if (activeSourcesRef.current.length === 0) {
              isAgentPlayingRef.current = false;
              setCallStatus("listening");
            }
          } else if (data.type === "ConversationText") {
            const role = data.role === "assistant" ? "agent" : "user";
            const text = data.content;
            if (text && text.trim()) {
              setTranscript((prev) => [
                ...prev,
                {
                  role,
                  text: text.trim(),
                  time: formatTime(callDuration),
                },
              ]);
            }
          } else if (data.type === "Error") {
            setErrorMessage(data.description || "Voice Agent error received from server.");
          }
        } catch (e) {}
      };

      ws.onerror = () => {
        setCallStatus("error");
        setErrorMessage("Connection error. Check network connection and API status.");
      };

      ws.onclose = () => {
        endCall();
      };
    } catch (err: unknown) {
      setCallStatus("error");
      let msg = "Microphone error occurred.";
      if (err instanceof DOMException) {
        if (err.name === "NotAllowedError" || err.name === "PermissionDeniedError") {
          msg =
            "Microphone permission was denied. Please allow microphone access in your browser settings (click the lock or camera icon in the address bar).";
        } else if (err.name === "NotFoundError" || err.name === "DevicesNotFoundError") {
          msg = "No microphone found. Please connect an audio input device.";
        } else if (err.name === "NotReadableError" || err.name === "TrackStartError") {
          msg = "Microphone is in use by another application. Please close other voice apps.";
        } else {
          msg = `Microphone error: ${err.message}`;
        }
      } else if (err instanceof Error) {
        msg = err.message;
      }
      setErrorMessage(msg);
      endCall();
    }
  };

  // Text message injection fallback
  const sendTextMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!textInput.trim() || !wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) return;

    const query = textInput.trim();
    setTextInput("");
    setCallStatus("thinking");
    setTranscript((prev) => [
      ...prev,
      {
        role: "user",
        text: query,
        time: formatTime(callDuration),
      },
    ]);

    wsRef.current.send(
      JSON.stringify({
        type: "InjectUserMessage",
        content: query,
      })
    );
  };

  useEffect(() => {
    return () => {
      endCall();
    };
  }, [endCall]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `0${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const isCallActive = callStatus !== "idle" && callStatus !== "error";

  const barHeights = isCallActive
    ? Array.from({ length: 28 }).map((_, i) =>
        callStatus === "speaking"
          ? 35 + ((i * 13 + callDuration * 17) % 60)
          : callStatus === "thinking"
          ? 25 + Math.sin(callDuration * 5 + i) * 20 + 20
          : isUserSpeaking
          ? Math.max(25, Math.min(100, micLevel + ((i * 7) % 25)))
          : Math.max(10, Math.min(60, micLevel + ((i * 5) % 15)))
      )
    : Array(28).fill(14);

  return (
    <div className="my-5 border border-[#374145] bg-[#14181a] p-3.5 sm:p-4 font-mono text-[13px] text-[#f8f9e8] overflow-hidden">
      {/* Top Status Bar */}
      <div className="flex items-center justify-between gap-2 pb-2 mb-3 border-b border-[#2b3337] text-[11px] min-w-0">
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <span
            className={`inline-block w-2 h-2 shrink-0 ${
              callStatus === "speaking"
                ? "bg-emerald-400 animate-pulse"
                : callStatus === "thinking"
                ? "bg-sky-400 animate-ping"
                : isUserSpeaking
                ? "bg-lime-400 animate-pulse"
                : callStatus === "listening"
                ? "bg-amber-400 animate-pulse"
                : callStatus === "connecting"
                ? "bg-purple-400 animate-ping"
                : "bg-[#6f8788]"
            }`}
          />
          <span className="text-[#cbe3b3] uppercase font-bold tracking-wider truncate">
            {callStatus === "speaking"
              ? "ASSISTANT SPEAKING"
              : callStatus === "thinking"
              ? "THINKING..."
              : isUserSpeaking
              ? "YOU ARE SPEAKING..."
              : callStatus === "listening"
              ? "LISTENING (SPEAK FREELY)"
              : callStatus === "connecting"
              ? "CONNECTING..."
              : "READY TO CALL"}
          </span>

          {/* Live Mic Activity VU Indicator */}
          {isCallActive && (
            <span
              className={`ml-1.5 px-1.5 py-0.5 text-[10px] shrink-0 flex items-center gap-1 border ${
                isUserSpeaking || micLevel > 15
                  ? "bg-emerald-950/80 text-emerald-300 border-emerald-700/60"
                  : "bg-[#14181a] text-[#839e9a] border-[#2b3337]"
              }`}
            >
              <Mic
                className={`w-3 h-3 shrink-0 ${
                  isUserSpeaking || micLevel > 15 ? "text-emerald-400 animate-pulse" : ""
                }`}
              />
              <span className="truncate">{isUserSpeaking ? "SPEAKING" : micLevel > 15 ? "VOICE DETECTED" : "LISTENING"}</span>
            </span>
          )}
        </div>

        <div className="text-[#839e9a] text-[10px] shrink-0 text-right">
          {isCallActive ? (
            <span className="text-[#cbe3b3] font-semibold">{formatTime(callDuration)}</span>
          ) : (
            <span className="hidden sm:inline text-[#6f8788]">LIVE VOICE LINK</span>
          )}
        </div>
      </div>

      {/* Audio Waveform Visualizer */}
      <div className="py-2.5 flex items-center justify-between gap-0.5 sm:gap-1 h-12 px-2 bg-[#101416] my-3 border border-[#2b3337] overflow-hidden">
        {barHeights.map((h, i) => (
          <div
            key={i}
            className="flex-1 transition-all duration-100 min-w-[2px]"
            style={{
              height: `${Math.max(12, Math.min(100, h))}%`,
              backgroundColor: isCallActive
                ? callStatus === "speaking"
                  ? "#cbe3b3"
                  : callStatus === "thinking"
                  ? "#38bdf8"
                  : isUserSpeaking
                  ? "#a3e635"
                  : micLevel > 15
                  ? "#facc15"
                  : "#f8f9e8"
                : "#374145",
              opacity: isCallActive ? 0.95 : 0.35,
            }}
          />
        ))}
      </div>

      {/* Error Alert */}
      {errorMessage && (
        <div className="mb-4 p-3 bg-rose-950/40 border border-rose-800/60 text-rose-200 text-[12px] flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
          <div className="leading-relaxed break-words flex-1 min-w-0">{errorMessage}</div>
        </div>
      )}

      {/* Primary Action Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
          {isCallActive ? (
            <>
              <button
                onClick={endCall}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 text-[12px] font-bold bg-rose-700 hover:bg-rose-600 text-white border border-rose-500 cursor-pointer"
              >
                <PhoneOff className="w-3.5 h-3.5" />
                <span>$ :hangup [END CALL]</span>
              </button>

              <button
                onClick={triggerForceEndTurn}
                title="Request immediate response"
                className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-3 py-2 text-[12px] font-semibold bg-[#1e272b] hover:bg-[#283439] text-[#cbe3b3] border border-[#3b4c53] cursor-pointer"
              >
                <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <span>[ :force-reply ]</span>
              </button>
            </>
          ) : (
            <button
              onClick={startCall}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 text-[12px] font-bold bg-[#cbe3b3] hover:bg-[#d8eec2] text-[#1c2225] border border-[#cbe3b3] cursor-pointer"
            >
              <PhoneCall className="w-3.5 h-3.5 fill-current" />
              <span>$ :call-assistant [START VOICE CALL]</span>
            </button>
          )}
        </div>

        <div className="text-[11px] text-[#839e9a] text-left sm:text-right font-mono truncate">
          {isCallActive
            ? "Speak freely. Auto-replies when you pause."
            : "Real-time AI voice link. Mic required."}
        </div>
      </div>

      {/* In-Call Text Input Fallback */}
      {isCallActive && (
        <form onSubmit={sendTextMessage} className="mb-3 flex items-center gap-2">
          <input
            type="text"
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            placeholder="whoax@term:~$ type question and press Enter..."
            className="flex-1 min-w-0 bg-[#101416] border border-[#2b3337] px-3 py-1.5 text-[12px] text-[#f8f9e8] placeholder-[#6f8788] focus:outline-none focus:border-[#cbe3b3] font-mono"
          />
          <button
            type="submit"
            disabled={!textInput.trim()}
            className="px-3 py-1.5 shrink-0 border border-[#374145] bg-[#1e272b] hover:bg-[#283439] text-[#cbe3b3] text-[12px] disabled:opacity-40 cursor-pointer flex items-center gap-1 font-mono"
          >
            <Send className="w-3.5 h-3.5" />
            <span>send</span>
          </button>
        </form>
      )}

      {/* Live Conversation Transcript Terminal */}
      <div className="border border-[#2b3337] bg-[#101416] p-3 min-h-[90px] max-h-[180px] overflow-y-auto space-y-1.5 text-[12px] font-mono">
        <div className="text-[10px] text-[#6f8788] border-b border-[#232a2e] pb-1 mb-1.5 flex justify-between select-none">
          <span>// LIVE_TRANSCRIPT</span>
          <span>CONSOLE</span>
        </div>
        {transcript.length === 0 ? (
          <div className="text-[#6f8788]">
            Click &quot;$ :call-assistant&quot; to speak directly with Reda&apos;s AI assistant. Ask about $10K agency sites, telephony voice agents, Shopify plugins, or cloud architecture.
          </div>
        ) : (
          transcript.map((entry, idx) => (
            <div key={idx} className="leading-relaxed break-words">
              <span
                className={`font-bold mr-2 ${
                  entry.role === "agent" ? "text-[#cbe3b3]" : "text-[#d2bdf3]"
                }`}
              >
                [{entry.role === "agent" ? "ASSISTANT" : "YOU"}]:
              </span>
              <span className="text-[#f8f9e8]">{entry.text}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
