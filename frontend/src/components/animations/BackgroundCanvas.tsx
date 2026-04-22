'use client';

import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function ParticleSystem() {
  const ref = useRef<THREE.Points>(null!);
  
  // Create random points for the background
  const sphere = useMemo(() => {
    const points = new Float32Array(5000 * 3);
    for (let i = 0; i < 5000; i++) {
      const r = 1.5;
      const theta = 2 * Math.PI * Math.random();
      const phi = Math.acos(2 * Math.random() - 1);
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);
      points[i * 3] = x;
      points[i * 3 + 1] = y;
      points[i * 3 + 2] = z;
    }
    return points;
  }, []);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#8b5cf6"
          size={0.005}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

function FloatingShapes() {
  const meshRef1 = useRef<THREE.Mesh>(null!);
  const meshRef2 = useRef<THREE.Mesh>(null!);
  const meshRef3 = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    meshRef1.current.rotation.x = t * 0.2;
    meshRef1.current.rotation.y = t * 0.3;
    meshRef1.current.position.y = Math.sin(t * 0.5) * 0.2;

    meshRef2.current.rotation.x = t * 0.1;
    meshRef2.current.rotation.z = t * 0.2;
    meshRef2.current.position.y = Math.cos(t * 0.4) * 0.3;

    meshRef3.current.rotation.y = t * 0.4;
    meshRef3.current.position.x = Math.sin(t * 0.3) * 0.5;
  });

  return (
    <>
      <mesh ref={meshRef1} position={[-2, 1, -2]}>
        <octahedronGeometry args={[0.5, 0]} />
        <meshStandardMaterial color="#8b5cf6" wireframe transparent opacity={0.2} />
      </mesh>
      <mesh ref={meshRef2} position={[2, -1, -3]}>
        <torusGeometry args={[0.4, 0.1, 16, 100]} />
        <meshStandardMaterial color="#6366f1" wireframe transparent opacity={0.1} />
      </mesh>
      <mesh ref={meshRef3} position={[0, -2, -1]}>
        <tetrahedronGeometry args={[0.3, 0]} />
        <meshStandardMaterial color="#a855f7" wireframe transparent opacity={0.15} />
      </mesh>
    </>
  );
}

export default function BackgroundCanvas() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return (
    <div className="fixed inset-0 -z-10 bg-[#030303]" />
  );

  return (
    <div className="fixed inset-0 -z-10 bg-[#030303]">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <ParticleSystem />
        <FloatingShapes />
      </Canvas>
    </div>
  );
}


