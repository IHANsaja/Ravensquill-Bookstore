import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { GandalfModel } from '../components/gandalfModel';
import Loader from '../components/modelLoader';

export default function GandalfScene() {
  return (
    <Canvas
      shadows
      camera={{ position: [8, 1, 10], fov: 50 }}
      className='w-full h-full bg-transparent absolute top-20'
    >
      <ambientLight intensity={0.3} />
      <directionalLight
        position={[5, 10, 7]}
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={0.5}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -5.1, 0]} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <shadowMaterial opacity={0.4} />
      </mesh>

      <Suspense fallback={<Loader />}>
        <GandalfModel position={[0, -5, -2]} scale={[1, 1, 1]} />
        <Environment preset="sunset" />
      </Suspense>

      <OrbitControls enablePan={false} enableZoom={false} enableRotate />
    </Canvas>
  );
}
