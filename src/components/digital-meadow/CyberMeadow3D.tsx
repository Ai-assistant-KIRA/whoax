"use client";

import React, { useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const VOXEL_COUNT = 320;
const BOUNDS = { x: 10, y: 6.5, z: 4 };
const REPULSION_RADIUS = 2.8;

interface VoxelData {
  x: number;
  y: number;
  z: number;
  driftX: number;
  driftY: number;
  phase: number;
  spin: number;
  baseScale: number;
  colorType: 0 | 1 | 2; // 0 = obsidian slate, 1 = moss green, 2 = bright lime
  ox: number;
  oy: number;
}

// Interactive 3D Meadow Voxels + Wave Geometry
function MeadowScene() {
  const { viewport } = useThree();
  const instancedRef = useRef<THREE.InstancedMesh>(null);
  const terrainRef = useRef<THREE.Mesh>(null);
  const dummyRef = useRef<THREE.Object3D | null>(null);
  const voxelsRef = useRef<VoxelData[] | null>(null);

  // Audio reactivity tracking ref
  const audioEnergyRef = useRef<number>(0);
  const shockwavesRef = useRef<{ x: number; y: number; progress: number; strength: number }[]>([]);

  if (dummyRef.current === null) {
    dummyRef.current = new THREE.Object3D();
  }

  // Generate initial voxel positions and kinetic traits
  if (voxelsRef.current === null) {
    voxelsRef.current = Array.from({ length: VOXEL_COUNT }, () => ({
      x: THREE.MathUtils.randFloatSpread(BOUNDS.x * 2.2),
      y: THREE.MathUtils.randFloatSpread(BOUNDS.y * 2.2),
      z: THREE.MathUtils.randFloat(-3.2, 0.8),
      driftX: THREE.MathUtils.randFloat(-0.04, 0.04),
      driftY: THREE.MathUtils.randFloat(0.08, 0.28),
      phase: THREE.MathUtils.randFloat(0, Math.PI * 2),
      spin: THREE.MathUtils.randFloat(0.04, 0.16),
      baseScale: THREE.MathUtils.randFloat(0.55, 1.35),
      colorType: Math.random() > 0.65 ? 2 : Math.random() > 0.35 ? 1 : 0,
      ox: 0,
      oy: 0,
    }));
  }

  // Setup per-instance colors on mount
  useEffect(() => {
    const mesh = instancedRef.current;
    const voxels = voxelsRef.current;
    if (!mesh || !voxels) return;

    const colObsidian = new THREE.Color("#4a5759");
    const colMoss = new THREE.Color("#cbe3b3");
    const colLime = new THREE.Color("#a3e635");

    for (let i = 0; i < VOXEL_COUNT; i++) {
      const v = voxels[i];
      const c = v.colorType === 2 ? colLime : v.colorType === 1 ? colMoss : colObsidian;
      mesh.setColorAt(i, c);
    }
    if (mesh.instanceColor) {
      mesh.instanceColor.needsUpdate = true;
    }
  }, []);

  // Listen for audio energy broadcasts from Voice Agent
  useEffect(() => {
    const handleAudio = (e: Event) => {
      const custom = e as CustomEvent<{ level?: number; isSpeaking?: boolean }>;
      if (custom.detail) {
        const target = Math.min(1, (custom.detail.level || 0) / 75);
        audioEnergyRef.current = target;
      }
    };

    const handleClick = (e: MouseEvent) => {
      // Create a gravitational click shockwave in normalized 3D viewport coords
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = -(e.clientY / window.innerHeight) * 2 + 1;
      const wx = (nx * viewport.width) / 2;
      const wy = (ny * viewport.height) / 2;

      shockwavesRef.current.push({
        x: wx,
        y: wy,
        progress: 0,
        strength: 2.2,
      });
    };

    window.addEventListener("whoax-audio-energy", handleAudio);
    window.addEventListener("pointerdown", handleClick);

    return () => {
      window.removeEventListener("whoax-audio-energy", handleAudio);
      window.removeEventListener("pointerdown", handleClick);
    };
  }, [viewport.width, viewport.height]);

  // Main 60 FPS WebGL Animation Loop
  useFrame((state, delta) => {
    const mesh = instancedRef.current;
    const dummy = dummyRef.current;
    const voxels = voxelsRef.current;
    if (!mesh || !dummy || !voxels) return;

    // Cap delta to prevent huge jumps when tab loses focus
    const dt = Math.min(delta, 0.05);
    const t = state.clock.elapsedTime;

    // Decay audio energy smoothly
    audioEnergyRef.current *= Math.exp(-dt * 4.5);
    const audioBoost = audioEnergyRef.current;

    // Project mouse cursor into 3D world coordinates
    const px = (state.pointer.x * state.viewport.width) / 2;
    const py = (state.pointer.y * state.viewport.height) / 2;
    const blend = Math.min(1, dt * 5);

    // Update active click shockwaves
    const shocks = shockwavesRef.current;
    for (let s = shocks.length - 1; s >= 0; s--) {
      shocks[s].progress += dt * 4;
      shocks[s].strength *= Math.exp(-dt * 3);
      if (shocks[s].progress > 8 || shocks[s].strength < 0.05) {
        shocks.splice(s, 1);
      }
    }

    // Update each 3D Voxel
    for (let i = 0; i < VOXEL_COUNT; i++) {
      const v = voxels[i];

      // Organic upward drift & horizontal swaying
      v.y += (v.driftY + audioBoost * 0.4) * dt;
      v.x += v.driftX * dt;

      // Wrap around bounds seamlessly
      if (v.y > BOUNDS.y) v.y = -BOUNDS.y;
      if (v.x > BOUNDS.x) v.x = -BOUNDS.x;
      if (v.x < -BOUNDS.x) v.x = BOUNDS.x;

      const bx = v.x + Math.sin(t * 0.25 + v.phase) * 0.35;
      const by = v.y + Math.cos(t * 0.2 + v.phase) * 0.2;

      // Cursor Gravitational Repulsion Physics
      let tx = 0;
      let ty = 0;
      const dx = bx - px;
      const dy = by - py;
      const distSq = dx * dx + dy * dy;

      if (distSq < REPULSION_RADIUS * REPULSION_RADIUS) {
        const dist = Math.sqrt(distSq) || 0.001;
        const force = (1 - dist / REPULSION_RADIUS) * (1.2 + audioBoost * 0.8);
        tx = (dx / dist) * force;
        ty = (dy / dist) * force;
      }

      // Add shockwave pulses
      for (let s = 0; s < shocks.length; s++) {
        const shk = shocks[s];
        const sdx = bx - shk.x;
        const sdy = by - shk.y;
        const sDist = Math.sqrt(sdx * sdx + sdy * sdy);
        const waveFront = Math.abs(sDist - shk.progress);
        if (waveFront < 1.2) {
          const sForce = (1 - waveFront / 1.2) * shk.strength * 0.8;
          tx += (sdx / (sDist || 1)) * sForce;
          ty += (sdy / (sDist || 1)) * sForce;
        }
      }

      v.ox += (tx - v.ox) * blend;
      v.oy += (ty - v.oy) * blend;

      // Kinetic Scale Pulse reacting to voice and motion
      const currentScale = v.baseScale * (1 + audioBoost * 0.8 + Math.sin(t * 1.5 + v.phase) * 0.12);

      dummy.position.set(bx + v.ox, by + v.oy, v.z);
      dummy.rotation.set(
        t * v.spin + v.phase,
        t * v.spin * 0.8 + (audioBoost * 2),
        t * v.spin * 0.5
      );
      dummy.scale.setScalar(currentScale);
      dummy.updateMatrix();

      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;

    // Undulating Meadow Topography Wireframe
    const terrain = terrainRef.current;
    if (terrain && terrain.geometry) {
      const pos = terrain.geometry.attributes.position;
      const count = pos.count;
      for (let j = 0; j < count; j++) {
        const vx = pos.getX(j);
        const vy = pos.getY(j);
        // Harmonic wave equations
        const wave =
          Math.sin(vx * 0.35 + t * 0.8) * 0.35 +
          Math.cos(vy * 0.45 + t * 0.6) * 0.25 +
          (audioBoost * Math.sin(vx * 0.8 + vy * 0.8) * 0.5);

        pos.setZ(j, wave);
      }
      pos.needsUpdate = true;
    }
  });

  return (
    <>
      {/* 3D Atmospheric Depth Fog */}
      <fog attach="fog" args={["#171c1f", 5, 14]} />

      {/* Subtle Ambient & Directional Cyber Lighting */}
      <ambientLight intensity={0.65} />
      <directionalLight position={[4, 6, 5]} intensity={0.8} color="#cbe3b3" />
      <pointLight position={[-4, -3, 2]} intensity={0.5} color="#a3e635" />

      {/* Floating Interactive 3D Cyber Spores */}
      <instancedMesh
        ref={instancedRef}
        args={[undefined, undefined, VOXEL_COUNT]}
        frustumCulled={false}
      >
        <boxGeometry args={[0.08, 0.08, 0.08]} />
        <meshStandardMaterial
          roughness={0.3}
          metalness={0.7}
          transparent
          opacity={0.45}
          depthWrite={false}
        />
      </instancedMesh>

      {/* Undulating Meadow Terrain Wireframe */}
      <mesh
        ref={terrainRef}
        position={[0, -2.8, -1.5]}
        rotation={[-Math.PI / 2.3, 0, 0]}
      >
        <planeGeometry args={[26, 18, 38, 28]} />
        <meshBasicMaterial
          color="#cbe3b3"
          wireframe
          transparent
          opacity={0.09}
        />
      </mesh>
    </>
  );
}

interface CyberMeadow3DProps {
  showScanlines?: boolean;
}

export default function CyberMeadow3D({ showScanlines = true }: CyberMeadow3DProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="fixed inset-0 pointer-events-none z-0 bg-[#171c1f]" />
    );
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#171c1f]">
      {/* Three.js R3F WebGL Canvas */}
      <Canvas
        camera={{ position: [0, 0, 7.5], fov: 48 }}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 1.5]}
      >
        <MeadowScene />
      </Canvas>

      {/* CRT Scanline Overlay Texture */}
      {showScanlines && (
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(17,22,25,0.45)_100%)] opacity-80"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, rgba(203,227,179,0.015) 0px, rgba(203,227,179,0.015) 1px, transparent 1px, transparent 3px)",
          }}
        />
      )}
    </div>
  );
}
