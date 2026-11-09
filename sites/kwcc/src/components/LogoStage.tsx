"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import {
  Cloud,
  ContactShadows,
  Environment,
  Float,
  Lightformer,
  MeshTransmissionMaterial,
  Sky,
} from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";
import type { Group } from "three";

/** Lemniscate path with a Möbius-like twist for the glass tube. */
function createMobiusInfinityCurve(scale = 1.55) {
  const points: THREE.Vector3[] = [];
  const segments = 220;
  for (let i = 0; i <= segments; i += 1) {
    const t = i / segments;
    const a = t * Math.PI * 2;
    const s = Math.sin(a);
    const c = Math.cos(a);
    const denom = 1 + s * s;
    points.push(
      new THREE.Vector3(
        (scale * c) / denom,
        (scale * s * c) / denom,
        0.32 * scale * Math.sin(a) * Math.cos(a),
      ),
    );
  }
  return new THREE.CatmullRomCurve3(points, true, "catmullrom", 0.35);
}

function GlassMobius() {
  const group = useRef<Group>(null);
  const geometry = useMemo(() => {
    const curve = createMobiusInfinityCurve(1.75);
    return new THREE.TubeGeometry(curve, 360, 0.24, 56, true);
  }, []);

  useFrame((_, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.16;
    group.current.rotation.x = Math.sin(performance.now() * 0.00035) * 0.1;
  });

  return (
    <Float speed={1.15} rotationIntensity={0.2} floatIntensity={0.4}>
      <group ref={group} rotation={[0.4, 0.65, -0.18]} scale={1.2}>
        <mesh geometry={geometry} castShadow>
          <MeshTransmissionMaterial
            backside
            samples={10}
            resolution={768}
            transmission={1}
            roughness={0.05}
            thickness={1.55}
            ior={1.52}
            chromaticAberration={0.045}
            anisotropy={0.18}
            distortion={0.15}
            distortionScale={0.3}
            temporalDistortion={0.1}
            color="#f4fbff"
            attenuationColor="#9fd0ff"
            attenuationDistance={1.05}
          />
        </mesh>
      </group>
    </Float>
  );
}

function Scene() {
  return (
    <>
      <Sky
        distance={450000}
        sunPosition={[8, 3.2, -4]}
        inclination={0.48}
        azimuth={0.22}
        mieCoefficient={0.004}
        mieDirectionalG={0.8}
        rayleigh={1.8}
        turbidity={3.2}
      />
      <fog attach="fog" args={["#7ebef0", 10, 28]} />
      <ambientLight intensity={0.65} />
      <directionalLight position={[7, 9, 3]} intensity={1.55} castShadow />
      <directionalLight position={[-5, 2, -2]} intensity={0.4} color="#c7e7ff" />

      <Cloud
        seed={2}
        position={[-4.5, 2.4, -6]}
        opacity={0.45}
        speed={0.12}
        segments={18}
        bounds={[5, 1.4, 1]}
        volume={3}
        color="#ffffff"
      />
      <Cloud
        seed={7}
        position={[4.2, -0.8, -7]}
        opacity={0.35}
        speed={0.08}
        segments={16}
        bounds={[6, 1.2, 1]}
        volume={2.4}
        color="#ffffff"
      />

      <Suspense fallback={null}>
        <Environment resolution={256}>
          <Lightformer
            intensity={2.4}
            position={[0, 5, -5]}
            scale={[10, 10, 1]}
            form="ring"
            color="#ffffff"
          />
          <Lightformer intensity={1.5} position={[6, 1, 2]} scale={[5, 5, 1]} color="#9ad0ff" />
          <Lightformer intensity={0.9} position={[-5, -1, 3]} scale={[3, 3, 1]} color="#fff2d4" />
        </Environment>
        <GlassMobius />
      </Suspense>

      <ContactShadows
        position={[0, -1.75, 0]}
        opacity={0.22}
        scale={14}
        blur={2.8}
        far={4.5}
        color="#1a4a78"
      />
    </>
  );
}

type LogoStageProps = {
  className?: string;
};

export default function LogoStage({ className }: LogoStageProps) {
  return (
    <div className={className}>
      <Canvas
        className="logo-stage__canvas"
        dpr={[1, 1.75]}
        camera={{ position: [0, 0.15, 5.1], fov: 40 }}
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
