import React, { useRef } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import { useGLTF, OrbitControls, PerspectiveCamera, SpotLight } from '@react-three/drei';

function Box() {
  // This reference will give us direct access to the mesh
  const mesh = useRef();

  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => {
    mesh.current.rotation.x += 0.01;
    mesh.current.rotation.y += 0.01;
  });

  return (
    <mesh ref={mesh}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={'orange'} />
    </mesh>
  );
}

function Floor() {
  const texture = useLoader(TextureLoader, 'assets/textures/oak.png');
  texture.wrapS = texture.wrapT = 1000;
  texture.repeat.set(25, 25);
  
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
      <planeGeometry args={[100, 100]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
}

function GalleryRoom() {
  return (
    <Canvas>
      <ambientLight intensity={0.1} />
      <directionalLight color="white" position={[0, 0, 5]} />
      <Floor />
      <Box />
      <OrbitControls />
    </Canvas>
  );
}

export default GalleryRoom;
