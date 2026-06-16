import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const ACCENT = "#22d3ee";
const ACCENT_SOFT = "#67e8f9";

interface FieldProps {
  count: number;
  radius: number;
  connectDistance: number;
}

/**
 * A rotating cloud of points with dynamically drawn connecting lines
 * between nearby nodes — a "particle network" reminiscent of cloud /
 * cluster topologies.
 */
function ParticleField({ count, radius, connectDistance }: FieldProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const groupRef = useRef<THREE.Group>(null);

  // Stable random positions + per-node drift velocity.
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

  // Pre-allocate a line buffer large enough for the expected connections.
  const maxLineVertices = count * 6;
  const linePositions = useMemo(
    () => new Float32Array(maxLineVertices * 3),
    [maxLineVertices]
  );

  useFrame((state, delta) => {
    const pts = pointsRef.current;
    if (!pts) return;

    const posAttr = pts.geometry.attributes.position as THREE.BufferAttribute;
    const arr = posAttr.array as Float32Array;

    // Drift each node and softly bounce it back toward the sphere.
    for (let i = 0; i < count; i++) {
      const ix = i * 3;
      arr[ix] += velocities[ix] * delta * 6;
      arr[ix + 1] += velocities[ix + 1] * delta * 6;
      arr[ix + 2] += velocities[ix + 2] * delta * 6;

      const x = arr[ix];
      const y = arr[ix + 1];
      const z = arr[ix + 2];
      const dist = Math.sqrt(x * x + y * y + z * z);
      if (dist > radius) {
        velocities[ix] *= -1;
        velocities[ix + 1] *= -1;
        velocities[ix + 2] *= -1;
      }
    }
    posAttr.needsUpdate = true;

    // Rebuild connecting lines for nearby nodes.
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

    // Gentle whole-field rotation + subtle parallax toward the pointer.
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.05;
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

export default function ParticleNetwork() {
  return (
    <Canvas
      camera={{ position: [0, 0, 9], fov: 60 }}
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true }}
      style={{ position: "absolute", inset: 0 }}
    >
      <ambientLight intensity={0.6} />
      <ParticleField count={90} radius={5.5} connectDistance={2.1} />
    </Canvas>
  );
}
