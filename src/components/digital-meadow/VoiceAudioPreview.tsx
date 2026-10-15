"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { PhoneCall, PhoneOff, AlertCircle, Mic, Send, Zap } from "lucide-react";
import { VOICE_SYSTEM_PROMPT } from "@/lib/voiceAgentContext";

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

// Voice and turn-taking settings. Tune here, not inside the call flow.
const VOICE_MODEL = "flux-cole-en"; // Deepgram Flux TTS: young American male, friendly and energetic
const VOICE_EXPRESSIVITY = 1; // -2 calm .. 2 animated; 1 = upbeat. Beta: Deepgram only validates 0, so listen for glitches
const VOICE_SPEED = 1.05;
const GREETING = "Hey! You've reached Reda's assistant. What can I tell you about his work?";
const LISTEN_KEYTERMS = ["whoax", "Reda", "Alaarabi", "Foody", "Shopify", "WooCommerce", "MCP", "Next.js"];

// Near-field speaker gate. The caller sits close to the mic, so their voice is
// clearly louder than the room. Audio below the gate is sent as silence, which
// keeps TV, other people and the assistant's own echo away from the model.
const GATE_RATIO_IDLE = 2.8; // caller must be this many times louder than the room
const GATE_RATIO_AGENT_TALKING = 5; // stricter while the assistant talks, so its echo can't open the gate
const GATE_MIN_RMS_IDLE = 0.02; // about -34 dBFS; a voice across the room sits below this
const GATE_MIN_RMS_AGENT_TALKING = 0.04;
const GATE_HANGOVER_MS = 450; // keep the gate open through short gaps between words
const GATE_PREROLL_FRAMES = 2; // resend ~170 ms before onset so first syllables aren't clipped

const stripEmoji = (text: string) =>
  text
    .replace(/\p{Extended_Pictographic}|\uFE0F|\u200D/gu, "")
    .replace(/\s{2,}/g, " ")
    .trim();

const words = (text: string) => text.toLowerCase().match(/[a-z0-9']+/g) ?? [];

/** True when a "caller" line is really the assistant's own voice picked up by the mic. */
const isEchoOf = (userText: string, agentText: string) => {
  const heard = words(userText);
  if (heard.length < 3 || !agentText) return false;
  const spoken = new Set(words(agentText));
  const overlap = heard.filter((w) => spoken.has(w)).length / heard.length;
  return overlap >= 0.7;
};

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

  // Speaker gate and transcript refs
  const noiseFloorRef = useRef<number>(0.003);
  const gateOpenUntilRef = useRef<number>(0);
  const gateWasOpenRef = useRef<boolean>(false);
  const preRollRef = useRef<ArrayBuffer[]>([]);
  const lastAgentTextRef = useRef<string>("");
  const elapsedSecRef = useRef<number>(0);

  // No API key ever ships to the browser. The call fetches a 30-second Deepgram
  // token from a small server (see voice-token-worker/) that holds the real key.
  const tokenUrl = process.env.NEXT_PUBLIC_VOICE_TOKEN_URL;

  const fetchVoiceToken = async (): Promise<string> => {
    if (!tokenUrl) throw new Error("offline");
    const res = await fetch(tokenUrl, { method: "POST" });
    if (!res.ok) throw new Error(res.status === 429 ? "busy" : "offline");
    const body = (await res.json()) as { access_token?: string };
    if (!body.access_token) throw new Error("offline");
    return body.access_token;
  };

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
    if (!tokenUrl) {
      setErrorMessage("The voice assistant is offline right now. Email reda@whoax.com instead.");
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
    noiseFloorRef.current = 0.003;
    gateOpenUntilRef.current = 0;
    gateWasOpenRef.current = false;
    preRollRef.current = [];
    lastAgentTextRef.current = "";
    elapsedSecRef.current = 0;

    try {
      // 1. Microphone with the browser's call-grade processing. Echo cancellation
      // stops the assistant hearing itself; noise suppression and the speaker
      // gate below keep room noise out. Auto-gain stays OFF: it lifts distant
      // voices up to the caller's level, which defeats the speaker gate.
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          channelCount: 1,
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: false,
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

      // Playback AudioContext (24kHz linear16 from Deepgram Flux TTS)
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

      // 3. Connect to Deepgram Voice Agent with a short-lived token
      let token: string;
      try {
        token = await fetchVoiceToken();
      } catch (e) {
        setCallStatus("error");
        setErrorMessage(
          e instanceof Error && e.message === "busy"
            ? "The assistant is busy right now. Try again in a minute, or email reda@whoax.com."
            : "The voice assistant is offline right now. Email reda@whoax.com instead."
        );
        endCall();
        return;
      }
      const wsUrl = "wss://agent.deepgram.com/v1/agent/converse";
      const ws = new WebSocket(wsUrl, ["bearer", token]);
      ws.binaryType = "arraybuffer";
      wsRef.current = ws;

      // Turn-taking is owned by Flux's semantic end-of-turn model, not by a
      // client silence timer: it waits through "um" and mid-sentence pauses and
      // answers once the caller has actually finished.
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
          greeting: GREETING,
          listen: {
            provider: {
              type: "deepgram",
              model: "flux-general-en",
              version: "v2",
              keyterms: LISTEN_KEYTERMS,
              eot_threshold: 0.75, // confidence needed before the assistant replies
              // No eager_eot_threshold: speculative drafts double LLM calls per turn.
              eot_timeout_ms: 3500, // reply anyway after this long without more speech
            },
          },
          think: {
            // Deepgram-hosted LLM: no third-party key has to be sent from the browser.
            provider: {
              type: "open_ai",
              model: "gpt-4.1-mini",
              temperature: 0.6,
            },
            prompt: VOICE_SYSTEM_PROMPT,
          },
          speak: {
            provider: {
              type: "deepgram",
              version: "v2",
              model: VOICE_MODEL,
              speed: VOICE_SPEED,
              expressivity: VOICE_EXPRESSIVITY,
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
          elapsedSecRef.current += 1;
          setCallDuration(elapsedSecRef.current);
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

          // Track the room's ambient level: drops quickly, rises slowly, so a
          // long sentence from the caller doesn't get mistaken for room noise.
          const floor = noiseFloorRef.current;
          const nextFloor = rms < floor ? floor * 0.9 + rms * 0.1 : floor * 0.995 + rms * 0.005;
          noiseFloorRef.current = Math.min(0.05, Math.max(0.0015, nextFloor));

          const ratio = agentSpeaking ? GATE_RATIO_AGENT_TALKING : GATE_RATIO_IDLE;
          const minRms = agentSpeaking ? GATE_MIN_RMS_AGENT_TALKING : GATE_MIN_RMS_IDLE;
          const isPrimarySpeech = rms > Math.max(noiseFloorRef.current * ratio, minRms);

          const now = performance.now();
          if (isPrimarySpeech) gateOpenUntilRef.current = now + GATE_HANGOVER_MS;
          const gateOpen = now < gateOpenUntilRef.current;

          if (isPrimarySpeech !== isUserSpeakingRef.current) {
            isUserSpeakingRef.current = isPrimarySpeech;
            setIsUserSpeaking(isPrimarySpeech);
          }

          const ws = wsRef.current;
          if (!ws) return;
          if (gateOpen) {
            // Gate just opened: send the buffered lead-in first so the start of
            // the word reaches the model.
            if (!gateWasOpenRef.current) {
              preRollRef.current.forEach((buf) => ws.send(buf));
              preRollRef.current = [];
            }
            ws.send(pcm16.buffer);
          } else {
            preRollRef.current.push(pcm16.buffer);
            if (preRollRef.current.length > GATE_PREROLL_FRAMES) preRollRef.current.shift();
            // Send silence of the same length so the stream's clock keeps running.
            ws.send(new Int16Array(pcm16.length).buffer);
          }
          gateWasOpenRef.current = gateOpen;
          // Barge-in is not decided here. A loud noise or a voice in the room
          // must not cut the assistant off; Deepgram only reports
          // UserStartedSpeaking for real speech, and that stops playback below.
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
            const isAgent = data.role === "assistant";
            const text = stripEmoji(String(data.content ?? ""));
            if (!text) return;
            if (isAgent) {
              lastAgentTextRef.current = text;
            } else if (isEchoOf(text, lastAgentTextRef.current)) {
              // The mic picked up the assistant's own voice. Don't show it as the caller.
              return;
            }
            setTranscript((prev) => [
              ...prev,
              { role: isAgent ? "agent" : "user", text, time: formatTime(elapsedSecRef.current) },
            ]);
          } else if (data.type === "Error") {
            setErrorMessage(data.description || "The assistant hit a problem. Try the call again, or email reda@whoax.com.");
          }
        } catch (e) {}
      };

      ws.onerror = () => {
        setCallStatus("error");
        setErrorMessage("Couldn't connect. Check your internet connection and try again.");
      };

      ws.onclose = () => {
        endCall();
      };
    } catch (err: unknown) {
      setCallStatus("error");
      let msg = "Your microphone didn't start. Try again.";
      if (err instanceof DOMException) {
        if (err.name === "NotAllowedError" || err.name === "PermissionDeniedError") {
          msg =
            "Microphone access is blocked. Allow it from the lock or camera icon in the address bar, then call again.";
        } else if (err.name === "NotFoundError" || err.name === "DevicesNotFoundError") {
          msg = "No microphone found. Plug one in or switch devices, then call again.";
        } else if (err.name === "NotReadableError" || err.name === "TrackStartError") {
          msg = "Another app is using your microphone. Close it, then call again.";
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
                ? "bg-[#cbe3b3] animate-pulse"
                : callStatus === "thinking"
                ? "bg-[#b3e3ca] animate-ping"
                : isUserSpeaking
                ? "bg-[#dbe6af] animate-pulse"
                : callStatus === "listening"
                ? "bg-[#f5d098] animate-pulse"
                : callStatus === "connecting"
                ? "bg-[#d2bdf3] animate-ping"
                : "bg-[#6f8788]"
            }`}
          />
          <span className="text-[#cbe3b3] uppercase font-bold tracking-wider truncate">
            {callStatus === "speaking"
              ? "ASSISTANT TALKING"
              : callStatus === "thinking"
              ? "THINKING…"
              : isUserSpeaking
              ? "YOU'RE TALKING"
              : callStatus === "listening"
              ? "LISTENING"
              : callStatus === "connecting"
              ? "CONNECTING…"
              : "READY"}
          </span>

          {/* Live Mic Activity VU Indicator */}
          {isCallActive && (
            <span
              className={`ml-1.5 px-1.5 py-0.5 text-[10px] shrink-0 flex items-center gap-1 border ${
                isUserSpeaking || micLevel > 15
                  ? "bg-[#cbe3b3]/10 text-[#cbe3b3] border-[#cbe3b3]/40"
                  : "bg-[#14181a] text-[#839e9a] border-[#2b3337]"
              }`}
            >
              <Mic
                className={`w-3 h-3 shrink-0 ${
                  isUserSpeaking || micLevel > 15 ? "text-[#cbe3b3] animate-pulse" : ""
                }`}
              />
              <span className="truncate">{isUserSpeaking ? "SPEAKING" : micLevel > 15 ? "HEARD YOU" : "LISTENING"}</span>
            </span>
          )}
        </div>

        <div className="text-[#839e9a] text-[10px] shrink-0 text-right">
          {isCallActive ? (
            <span className="text-[#cbe3b3] font-semibold">{formatTime(callDuration)}</span>
          ) : (
            <span className="hidden sm:inline text-[#6f8788]">AI PHONE DEMO</span>
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
                  ? "#b3e3ca"
                  : isUserSpeaking
                  ? "#dbe6af"
                  : micLevel > 15
                  ? "#f5d098"
                  : "#f8f9e8"
                : "#374145",
              opacity: isCallActive ? 0.95 : 0.35,
            }}
          />
        ))}
      </div>

      {/* Error Alert */}
      {errorMessage && (
        <div className="mb-4 p-3 bg-[#f57f82]/10 border border-[#f57f82]/40 text-[#f8d4d5] text-[12px] flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-[#f57f82] shrink-0 mt-0.5" />
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
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 text-[12px] font-bold bg-[#f57f82] hover:bg-[#f79a9c] text-[#1c2225] border border-[#f57f82] cursor-pointer"
              >
                <PhoneOff className="w-3.5 h-3.5" />
                <span>$ hang up</span>
              </button>

              <button
                onClick={triggerForceEndTurn}
                title="Ask the assistant to answer now"
                className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-3 py-2 text-[12px] font-semibold bg-[#1e272b] hover:bg-[#283439] text-[#cbe3b3] border border-[#3b4c53] cursor-pointer"
              >
                <Zap className="w-3.5 h-3.5 text-[#f5d098] fill-[#f5d098]" />
                <span>[ answer now ]</span>
              </button>
            </>
          ) : (
            <button
              onClick={startCall}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 text-[12px] font-bold bg-[#cbe3b3] hover:bg-[#d8eec2] text-[#1c2225] border border-[#cbe3b3] cursor-pointer"
            >
              <PhoneCall className="w-3.5 h-3.5 fill-current" />
              <span>$ call my AI assistant</span>
            </button>
          )}
        </div>

        <div className="text-[11px] text-[#839e9a] text-left sm:text-right font-mono truncate">
          {isCallActive
            ? "Just talk. It answers once you've finished."
            : "Uses your microphone. Free, no sign-up."}
        </div>
      </div>

      {/* In-Call Text Input Fallback */}
      {isCallActive && (
        <form onSubmit={sendTextMessage} className="mb-3 flex items-center gap-2">
          <input
            type="text"
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            placeholder="Or type a question and press Enter"
            aria-label="Type a question for the assistant"
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
          <span>{"// transcript"}</span>
          <span>live</span>
        </div>
        {transcript.length === 0 ? (
          <div className="text-[#6f8788]">
            Press &quot;call my AI assistant&quot; and ask it about my work: websites, online stores, phone assistants or anything on this site. It&apos;s the same kind of assistant I build for clients.
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
