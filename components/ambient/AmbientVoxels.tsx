"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const COUNT = 280;
const REPULSION_RADIUS_SQ = 2.2;

type Seed = { x: number; y: number; z: number; speed: number; phase: number };

function VoxelField({
  pointer,
}: {
  pointer: React.MutableRefObject<{ x: number; y: number }>;
}) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const seeds = useMemo<Seed[]>(
    () =>
      Array.from({ length: COUNT }, () => ({
        x: (Math.random() - 0.5) * 11,
        y: (Math.random() - 0.5) * 7,
        z: (Math.random() - 0.5) * 3,
        speed: 0.05 + Math.random() * 0.12,
        phase: Math.random() * Math.PI * 2,
      })),
    []
  );

  useFrame((state) => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const t = state.clock.elapsedTime;
    const px = pointer.current.x * 5.5;
    const py = pointer.current.y * 3.5;

    for (let i = 0; i < COUNT; i++) {
      const s = seeds[i];
      let x = s.x + Math.sin(t * s.speed + s.phase) * 0.45;
      let y = s.y + Math.cos(t * s.speed * 0.8 + s.phase) * 0.35;
      const dx = x - px;
      const dy = y - py;
      const d2 = dx * dx + dy * dy;
      if (d2 < REPULSION_RADIUS_SQ && d2 > 0.0001) {
        const force = ((REPULSION_RADIUS_SQ - d2) / REPULSION_RADIUS_SQ) * 0.55;
        x += dx * force;
        y += dy * force;
      }
      dummy.position.set(x, y, s.z);
      dummy.rotation.set(t * s.speed * 0.5 + s.phase, t * s.speed * 0.3, 0);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, COUNT]} frustumCulled={false}>
      <boxGeometry args={[0.07, 0.07, 0.07]} />
      <meshBasicMaterial color="#9A9EA6" transparent opacity={0.28} />
    </instancedMesh>
  );
}

/**
 * Ambient voxel layer — quiet, no bloom, no spectacle.
 * Mounted only after the hero handoff (desktop, motion allowed).
 */
export default function AmbientVoxels() {
  const rootRef = useRef<HTMLDivElement>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const [inView, setInView] = useState(true);
  const [pageVisible, setPageVisible] = useState(true);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    const onVisibility = () => setPageVisible(!document.hidden);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);

    const observer = new IntersectionObserver(([entry]) =>
      setInView(entry.isIntersecting)
    );
    if (rootRef.current) observer.observe(rootRef.current);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("visibilitychange", onVisibility);
      observer.disconnect();
    };
  }, []);

  const active = inView && pageVisible;

  return (
    <div ref={rootRef} className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
      <Canvas
        frameloop={active ? "always" : "never"}
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 6], fov: 50 }}
        gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
      >
        <VoxelField pointer={pointer} />
      </Canvas>
    </div>
  );
}
