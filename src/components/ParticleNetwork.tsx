import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  Icosahedron,
  MeshDistortMaterial,
  Torus,
} from "@react-three/drei";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import * as THREE from "three";

const ACCENT = "#22d3ee";
const ACCENT_SOFT = "#67e8f9";
const ACCENT_DEEP = "#0891b2";

interface FieldProps {
  count: number;
  radius: number;
  connectDistance: number;
  interactive: boolean;
}

/**
 * A rotating cloud of points with dynamically drawn connecting lines between
 * nearby nodes. Nodes drift, bounce inside a sphere, and are gently pushed
 * away from the pointer for an interactive "force field" feel.
 */
function ParticleField({
  count,
  radius,
  connectDistance,
  interactive,
}: FieldProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const groupRef = useRef<THREE.Group>(null);
  const pointer3D = useRef(new THREE.Vector3());

  const { positions, velocities } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = radius * Math.cbrt(Math.random());
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
      velocities[i * 3] = (Math.random() - 0.5) * 0.02;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.02;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.02;
    }
    return { positions, velocities };
  }, [count, radius]);

  const maxLineVertices = count * 6;
  const linePositions = useMemo(
    () => new Float32Array(maxLineVertices * 3),
    [maxLineVertices]
  );

  useFrame((state, delta) => {
    const pts = pointsRef.current;
    if (!pts) return;
    const dt = Math.min(delta, 0.05);

    const posAttr = pts.geometry.attributes.position as THREE.BufferAttribute;
    const arr = posAttr.array as Float32Array;

    // Project the pointer onto the z=0 plane in this group's local space.
    if (interactive && groupRef.current) {
      pointer3D.current
        .set(state.pointer.x, state.pointer.y, 0.5)
        .unproject(state.camera);
      groupRef.current.worldToLocal(pointer3D.current);
    }
    const px = pointer3D.current.x;
    const py = pointer3D.current.y;
    const pz = pointer3D.current.z;
    const repelRadius = 2.2;
    const repelSq = repelRadius * repelRadius;

    for (let i = 0; i < count; i++) {
      const ix = i * 3;
      arr[ix] += velocities[ix] * dt * 6;
      arr[ix + 1] += velocities[ix + 1] * dt * 6;
      arr[ix + 2] += velocities[ix + 2] * dt * 6;

      const x = arr[ix];
      const y = arr[ix + 1];
      const z = arr[ix + 2];

      // Pointer repulsion.
      if (interactive) {
        const dx = x - px;
        const dy = y - py;
        const dz = z - pz;
        const dSq = dx * dx + dy * dy + dz * dz;
        if (dSq < repelSq && dSq > 0.0001) {
          const force = (1 - dSq / repelSq) * dt * 2.2;
          const inv = 1 / Math.sqrt(dSq);
          arr[ix] += dx * inv * force;
          arr[ix + 1] += dy * inv * force;
          arr[ix + 2] += dz * inv * force;
        }
      }

      const dist = Math.sqrt(x * x + y * y + z * z);
      if (dist > radius) {
        velocities[ix] *= -1;
        velocities[ix + 1] *= -1;
        velocities[ix + 2] *= -1;
        const pull = radius / dist;
        arr[ix] *= pull;
        arr[ix + 1] *= pull;
        arr[ix + 2] *= pull;
      }
    }
    posAttr.needsUpdate = true;

    const lines = linesRef.current;
    if (lines) {
      const lineAttr = lines.geometry.attributes
        .position as THREE.BufferAttribute;
      const lineArr = lineAttr.array as Float32Array;
      let v = 0;
      const maxV = maxLineVertices;
      const connectSq = connectDistance * connectDistance;

      for (let i = 0; i < count && v < maxV; i++) {
        const ix = i * 3;
        for (let j = i + 1; j < count && v < maxV; j++) {
          const jx = j * 3;
          const dx = arr[ix] - arr[jx];
          const dy = arr[ix + 1] - arr[jx + 1];
          const dz = arr[ix + 2] - arr[jx + 2];
          const dSq = dx * dx + dy * dy + dz * dz;
          if (dSq < connectSq) {
            lineArr[v * 3] = arr[ix];
            lineArr[v * 3 + 1] = arr[ix + 1];
            lineArr[v * 3 + 2] = arr[ix + 2];
            v++;
            lineArr[v * 3] = arr[jx];
            lineArr[v * 3 + 1] = arr[jx + 1];
            lineArr[v * 3 + 2] = arr[jx + 2];
            v++;
          }
        }
      }
      lines.geometry.setDrawRange(0, v);
      lineAttr.needsUpdate = true;
    }

    if (groupRef.current) {
      groupRef.current.rotation.y += dt * 0.05;
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        state.pointer.y * 0.2,
        0.04
      );
      groupRef.current.rotation.z = THREE.MathUtils.lerp(
        groupRef.current.rotation.z,
        state.pointer.x * 0.2,
        0.04
      );
    }
  });

  return (
    <group ref={groupRef}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
            count={count}
          />
        </bufferGeometry>
        <pointsMaterial
          color={ACCENT_SOFT}
          size={0.08}
          sizeAttenuation
          transparent
          opacity={0.9}
          depthWrite={false}
        />
      </points>

      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
            count={maxLineVertices}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color={ACCENT}
          transparent
          opacity={0.18}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
}

/** Glowing, slowly morphing core sphere at the centre of the field. */
function CoreSphere({ distort }: { distort: boolean }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.08;
  });
  return (
    <mesh ref={ref} scale={1.6}>
      <icosahedronGeometry args={[1, 12]} />
      <MeshDistortMaterial
        color={ACCENT_DEEP}
        emissive={ACCENT}
        emissiveIntensity={0.35}
        roughness={0.25}
        metalness={0.6}
        distort={distort ? 0.35 : 0}
        speed={1.6}
        transparent
        opacity={0.9}
      />
    </mesh>
  );
}

/** A wireframe shape that floats and bobs — DevOps / cluster topology vibe. */
function FloatingShape({
  position,
  kind,
}: {
  position: [number, number, number];
  kind: "torus" | "ico" | "box";
}) {
  const material = (
    <meshStandardMaterial
      color={ACCENT_SOFT}
      emissive={ACCENT}
      emissiveIntensity={0.4}
      wireframe
      transparent
      opacity={0.55}
    />
  );
  return (
    <Float
      speed={2}
      rotationIntensity={1.4}
      floatIntensity={1.6}
      position={position}
    >
      {kind === "torus" && <Torus args={[0.5, 0.18, 16, 40]}>{material}</Torus>}
      {kind === "ico" && <Icosahedron args={[0.55, 0]}>{material}</Icosahedron>}
      {kind === "box" && (
        <mesh>
          <boxGeometry args={[0.7, 0.7, 0.7]} />
          {material}
        </mesh>
      )}
    </Float>
  );
}

interface ParticleNetworkProps {
  /** Lower-spec devices get fewer particles, no distortion and no bloom. */
  highEnd?: boolean;
  /** Disable pointer-driven interaction (touch devices). */
  interactive?: boolean;
}

export default function ParticleNetwork({
  highEnd = true,
  interactive = true,
}: ParticleNetworkProps) {
  const count = highEnd ? 70 : 40;

  return (
    <Canvas
      camera={{ position: [0, 0, 9], fov: 60 }}
      dpr={highEnd ? [1, 1.5] : [1, 1.2]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ position: "absolute", inset: 0 }}
    >
      <ambientLight intensity={0.6} />
      <pointLight position={[6, 6, 6]} intensity={40} color={ACCENT_SOFT} />
      <pointLight position={[-6, -4, 4]} intensity={25} color={ACCENT} />

      <CoreSphere distort={highEnd} />

      <FloatingShape position={[-3.6, 1.8, -1]} kind="torus" />
      <FloatingShape position={[3.8, -1.4, -0.5]} kind="ico" />
      <FloatingShape position={[2.6, 2.4, -2]} kind="box" />
      {highEnd && <FloatingShape position={[-3.2, -2.2, -1.5]} kind="ico" />}

      <ParticleField
        count={count}
        radius={5.5}
        connectDistance={2.1}
        interactive={interactive}
      />

      {highEnd && (
        <EffectComposer>
          <Bloom
            intensity={0.6}
            luminanceThreshold={0.3}
            luminanceSmoothing={0.9}
            mipmapBlur
          />
        </EffectComposer>
      )}
    </Canvas>
  );
}
