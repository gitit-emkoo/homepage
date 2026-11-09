"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Cloud,
  ContactShadows,
  Environment,
  Float,
  Lightformer,
  MeshTransmissionMaterial,
} from "@react-three/drei";
import { Suspense, useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import type { Group } from "three";

const SKY = "#3f9feb";

/** KWCC logo path: ∞ (lemniscate). z separates the crossing so strands pass over/under. */
function infinityPoint(t: number, scale: number, sep: number, target: THREE.Vector3) {
  const a = t * Math.PI * 2;
  const s = Math.sin(a);
  const c = Math.cos(a);
  const d = 1 + s * s;
  return target.set((scale * c) / d, (scale * s * c) / d, sep * s);
}

function parallelTransport(normal: THREE.Vector3, t0: THREE.Vector3, t1: THREE.Vector3) {
  const axis = new THREE.Vector3().crossVectors(t0, t1);
  const sin = axis.length();
  const cos = THREE.MathUtils.clamp(t0.dot(t1), -1, 1);
  const out = normal.clone();
  if (sin > 1e-8) {
    out.applyAxisAngle(axis.multiplyScalar(1 / sin), Math.atan2(sin, cos));
  } else if (cos < 0) {
    const spinAxis =
      Math.abs(t0.x) < 0.9
        ? new THREE.Vector3().crossVectors(t0, new THREE.Vector3(1, 0, 0)).normalize()
        : new THREE.Vector3().crossVectors(t0, new THREE.Vector3(0, 1, 0)).normalize();
    out.applyAxisAngle(spinAxis, Math.PI);
  }
  out.addScaledVector(t1, -out.dot(t1));
  if (out.lengthSq() < 1e-10) {
    const fb = Math.abs(t1.y) < 0.9 ? new THREE.Vector3(0, 1, 0) : new THREE.Vector3(1, 0, 0);
    out.copy(fb).cross(t1);
  }
  return out.normalize();
}

/**
 * Logo-style Möbius ∞ ribbon:
 * figure-8 path + half-twist + depth split at the crossing (no self-intersection).
 */
function createLogoMobiusInfinity({
  scale = 1.9,
  sep = 0.58,
  width = 0.5,
  thickness = 0.22,
  segments = 512,
}: {
  scale?: number;
  sep?: number;
  width?: number;
  thickness?: number;
  segments?: number;
} = {}) {
  const N = segments;
  const hw = width * 0.5;
  const ht = thickness * 0.5;

  const points: THREE.Vector3[] = [];
  for (let i = 0; i < N; i += 1) {
    points.push(infinityPoint(i / N, scale, sep, new THREE.Vector3()));
  }

  const tangents: THREE.Vector3[] = [];
  for (let i = 0; i < N; i += 1) {
    const t = points[(i + 1) % N].clone().sub(points[(i - 1 + N) % N]);
    if (t.lengthSq() < 1e-10) t.set(1, 0, 0);
    else t.normalize();
    tangents.push(t);
  }

  const normals: THREE.Vector3[] = [];
  const n0 = new THREE.Vector3(0, 0, 1).cross(tangents[0]);
  if (n0.lengthSq() < 1e-8) n0.set(0, 1, 0).cross(tangents[0]);
  n0.normalize();
  normals.push(n0);
  for (let i = 0; i < N - 1; i += 1) {
    normals.push(parallelTransport(normals[i], tangents[i], tangents[i + 1]));
  }

  const nBack = parallelTransport(normals[N - 1], tangents[N - 1], tangents[0]);
  const holonomy = Math.atan2(
    new THREE.Vector3().crossVectors(n0, nBack).dot(tangents[0]),
    n0.dot(nBack),
  );

  const positions: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];
  const side = new THREE.Vector3();
  const up = new THREE.Vector3();
  const binormal = new THREE.Vector3();
  const corner = new THREE.Vector3();
  const offsets: [number, number][] = [
    [-hw, -ht],
    [hw, -ht],
    [hw, ht],
    [-hw, ht],
  ];

  for (let i = 0; i < N; i += 1) {
    const t = i / N;
    // Half-twist for Möbius character + cancel closed-curve frame drift
    const twist = Math.PI * t - holonomy * t;
    const cos = Math.cos(twist);
    const sin = Math.sin(twist);
    binormal.crossVectors(tangents[i], normals[i]).normalize();
    side.copy(normals[i]).multiplyScalar(cos).addScaledVector(binormal, sin);
    up.copy(normals[i]).multiplyScalar(-sin).addScaledVector(binormal, cos);

    for (let k = 0; k < 4; k += 1) {
      const [sw, su] = offsets[k];
      corner.copy(points[i]).addScaledVector(side, sw).addScaledVector(up, su);
      positions.push(corner.x, corner.y, corner.z);
      uvs.push(t, k / 3);
    }
  }

  // Möbius half-twist weld: last cross-section = first cross-section with v → -v
  const flip = [2, 3, 0, 1];
  const baseLast = (N - 1) * 4;
  for (let k = 0; k < 4; k += 1) {
    const src = flip[k] * 3;
    const dst = (baseLast + k) * 3;
    positions[dst] = positions[src];
    positions[dst + 1] = positions[src + 1];
    positions[dst + 2] = positions[src + 2];
  }

  // Bridge rings 0→1→…→N-2→N-1 (N-1 already coincides with flipped start)
  for (let i = 0; i < N - 1; i += 1) {
    const a = i * 4;
    const b = (i + 1) * 4;
    const sides: [number, number, number, number][] = [
      [0, 1, 1, 0],
      [1, 2, 2, 1],
      [2, 3, 3, 2],
      [3, 0, 0, 3],
    ];
    for (const [a0, a1, b1, b0] of sides) {
      indices.push(a + a0, a + a1, b + b1, a + a0, b + b1, b + b0);
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  geometry.computeBoundingSphere();
  return geometry;
}

function SkyDome() {
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        side: THREE.BackSide,
        depthWrite: false,
        uniforms: {
          topColor: { value: new THREE.Color("#2b8fe0") },
          midColor: { value: new THREE.Color("#49a8ec") },
          bottomColor: { value: new THREE.Color("#6bbcff") },
        },
        vertexShader: `
          varying vec3 vWorldPosition;
          void main() {
            vec4 worldPosition = modelMatrix * vec4(position, 1.0);
            vWorldPosition = worldPosition.xyz;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform vec3 topColor;
          uniform vec3 midColor;
          uniform vec3 bottomColor;
          varying vec3 vWorldPosition;
          void main() {
            float h = normalize(vWorldPosition).y;
            float t = clamp(h * 0.75 + 0.35, 0.0, 1.0);
            vec3 col = mix(bottomColor, midColor, smoothstep(0.0, 0.55, t));
            col = mix(col, topColor, smoothstep(0.4, 1.0, t));
            gl_FragColor = vec4(col, 1.0);
          }
        `,
      }),
    [],
  );

  return (
    <mesh scale={90}>
      <sphereGeometry args={[1, 32, 16]} />
      <primitive object={material} attach="material" />
    </mesh>
  );
}

function GlassMobius() {
  const group = useRef<Group>(null);
  const { gl } = useThree();
  const drag = useRef({
    active: false,
    prevX: 0,
    prevY: 0,
    velY: 0.14,
    velX: 0,
    idleDir: 1,
  });

  const geometry = useMemo(
    () =>
      createLogoMobiusInfinity({
        scale: 1.9,
        sep: 0.58,
        width: 0.5,
        thickness: 0.22,
        segments: 512,
      }),
    [],
  );

  useEffect(() => {
    const el = gl.domElement;
    el.style.cursor = "grab";
    el.style.touchAction = "none";

    const onDown = (event: PointerEvent) => {
      drag.current.active = true;
      drag.current.prevX = event.clientX;
      drag.current.prevY = event.clientY;
      drag.current.velX = 0;
      drag.current.velY = 0;
      el.style.cursor = "grabbing";
      el.setPointerCapture(event.pointerId);
    };

    const onMove = (event: PointerEvent) => {
      if (!drag.current.active || !group.current) return;
      const dx = event.clientX - drag.current.prevX;
      const dy = event.clientY - drag.current.prevY;
      drag.current.prevX = event.clientX;
      drag.current.prevY = event.clientY;
      const rotY = dx * 0.01;
      const rotX = dy * 0.01;
      group.current.rotation.y += rotY;
      group.current.rotation.x += rotX;
      drag.current.velY = rotY * 60;
      drag.current.velX = rotX * 60;
      if (Math.abs(rotY) > 0.0001) drag.current.idleDir = Math.sign(rotY);
    };

    const onUp = (event: PointerEvent) => {
      drag.current.active = false;
      el.style.cursor = "grab";
      try {
        el.releasePointerCapture(event.pointerId);
      } catch {
        /* already released */
      }
    };

    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerup", onUp);
    el.addEventListener("pointercancel", onUp);
    return () => {
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointercancel", onUp);
    };
  }, [gl]);

  useFrame((_, delta) => {
    if (!group.current || drag.current.active) return;
    // inertia from last drag, then settle into a gentle idle spin
    group.current.rotation.y += drag.current.velY * delta;
    group.current.rotation.x += drag.current.velX * delta;
    drag.current.velY *= 0.96;
    drag.current.velX *= 0.96;
    if (Math.abs(drag.current.velY) < 0.02) {
      drag.current.velY = drag.current.idleDir * 0.14;
    }
    if (Math.abs(drag.current.velX) < 0.01) drag.current.velX *= 0.9;
    group.current.rotation.x *= 0.995;
  });

  return (
    <group ref={group} rotation={[0.4, 0.55, -0.15]} scale={1.12}>
      <Float speed={1.05} rotationIntensity={0.12} floatIntensity={0.28}>
        <mesh geometry={geometry} castShadow>
          <MeshTransmissionMaterial
            backside
            samples={10}
            resolution={640}
            transmission={1}
            roughness={0.04}
            thickness={0.55}
            ior={1.42}
            chromaticAberration={0.015}
            anisotropy={0.04}
            distortion={0.05}
            distortionScale={0.12}
            temporalDistortion={0.03}
            color="#ffffff"
            attenuationColor="#ffffff"
            attenuationDistance={6}
          />
        </mesh>
      </Float>
    </group>
  );
}

function Scene() {
  return (
    <>
      <color attach="background" args={[SKY]} />
      <SkyDome />

      <ambientLight intensity={0.95} />
      <directionalLight position={[6, 12, 3]} intensity={1.8} color="#ffffff" castShadow />
      <directionalLight position={[-5, 3, -2]} intensity={0.45} color="#d7ecff" />

      {/* Natural cloud shapes — keep sparse so blue sky remains dominant */}
      <Cloud
        seed={2}
        position={[-5.2, 3.0, -7]}
        opacity={0.55}
        speed={0.1}
        segments={18}
        bounds={[5, 1.4, 1]}
        volume={3}
        color="#ffffff"
      />
      <Cloud
        seed={7}
        position={[4.8, 2.2, -8]}
        opacity={0.45}
        speed={0.08}
        segments={16}
        bounds={[6, 1.2, 1]}
        volume={2.4}
        color="#ffffff"
      />
      <Cloud
        seed={4}
        position={[0.6, 3.8, -9]}
        opacity={0.35}
        speed={0.06}
        segments={14}
        bounds={[6.5, 1.3, 1]}
        volume={2.2}
        color="#ffffff"
      />

      <Suspense fallback={null}>
        <Environment resolution={256}>
          <Lightformer intensity={2.8} position={[0, 5, -3]} scale={[12, 12, 1]} form="ring" color="#ffffff" />
          <Lightformer intensity={1.6} position={[0, 7, 4]} scale={[10, 4, 1]} color="#8ec8ff" />
          <Lightformer intensity={1} position={[7, 2, 2]} scale={[3, 6, 1]} color="#ffffff" />
        </Environment>
        <GlassMobius />
      </Suspense>

      <ContactShadows
        position={[0, -1.75, 0]}
        opacity={0.16}
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
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: "high-performance",
          toneMapping: THREE.NoToneMapping,
          outputColorSpace: THREE.SRGBColorSpace,
        }}
        onCreated={({ gl, scene }) => {
          gl.setClearColor(SKY, 1);
          scene.background = new THREE.Color(SKY);
        }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
