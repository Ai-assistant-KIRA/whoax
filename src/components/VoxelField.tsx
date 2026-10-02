"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const COUNT = 280;
const BOUNDS = { x: 9, y: 5.5 };
const REPULSION_RADIUS = 2.2;

type Voxel = {
  x: number;
  y: number;
  z: number;
  drift: number;
  phase: number;
  spin: number;
  scale: number;
  ox: number;
  oy: number;
};

function Voxels() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  // Refs, not useMemo: both objects are mutated every frame inside useFrame.
  const dummyRef = useRef<THREE.Object3D | null>(null);
  const voxelsRef = useRef<Voxel[] | null>(null);
  if (dummyRef.current === null) dummyRef.current = new THREE.Object3D();
  if (voxelsRef.current === null) {
    voxelsRef.current = Array.from({ length: COUNT }, () => ({
      x: THREE.MathUtils.randFloatSpread(BOUNDS.x * 2),
      y: THREE.MathUtils.randFloatSpread(BOUNDS.y * 2),
      z: THREE.MathUtils.randFloat(-2.5, 0.5),
      drift: THREE.MathUtils.randFloat(0.06, 0.24),
      phase: THREE.MathUtils.randFloat(0, Math.PI * 2),
      spin: THREE.MathUtils.randFloat(0.02, 0.12),
      scale: THREE.MathUtils.randFloat(0.5, 1.4),
      ox: 0,
      oy: 0,
    }));
  }

  useFrame((state, delta) => {
    const mesh = meshRef.current;
    const dummy = dummyRef.current;
    const voxels = voxelsRef.current;
    if (!mesh || !dummy || !voxels) return;
    const t = state.clock.elapsedTime;
    // Cursor position projected onto the field plane.
    const px = (state.pointer.x * state.viewport.width) / 2;
    const py = (state.pointer.y * state.viewport.height) / 2;
    const blend = Math.min(1, delta * 4);

    for (let i = 0; i < COUNT; i++) {
      const v = voxels[i];
      v.y += v.drift * delta;
      if (v.y > BOUNDS.y) v.y = -BOUNDS.y;

      const bx = v.x + Math.sin(t * 0.15 + v.phase) * 0.4;

      // Gentle cursor repulsion.
      let tx = 0;
      let ty = 0;
      const dx = bx - px;
      const dy = v.y - py;
      const d2 = dx * dx + dy * dy;
      if (d2 < REPULSION_RADIUS * REPULSION_RADIUS) {
        const d = Math.sqrt(d2) || 0.001;
        const force = (1 - d / REPULSION_RADIUS) * 0.9;
        tx = (dx / d) * force;
        ty = (dy / d) * force;
      }
      v.ox += (tx - v.ox) * blend;
      v.oy += (ty - v.oy) * blend;

      dummy.position.set(bx + v.ox, v.y + v.oy, v.z);
      dummy.rotation.set(t * v.spin + v.phase, t * v.spin * 0.7, 0);
      dummy.scale.setScalar(v.scale);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[undefined, undefined, COUNT]}
      frustumCulled={false}
    >
      <boxGeometry args={[0.09, 0.09, 0.09]} />
      <meshBasicMaterial
        color="#9a9ea6"
        transparent
        opacity={0.28}
        depthWrite={false}
      />
    </instancedMesh>
  );
}

export default function VoxelField() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(true);
  const [tabVisible, setTabVisible] = useState(true);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0 },
    );
    io.observe(el);
    const onVisibility = () => setTabVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  const running = inView && tabVisible;

  return (
    <div ref={rootRef} className="h-full w-full">
      <Canvas
        frameloop={running ? "always" : "never"}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}
        camera={{ position: [0, 0, 7], fov: 45 }}
      >
        <Voxels />
      </Canvas>
    </div>
  );
}
