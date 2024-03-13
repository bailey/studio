import React, { Suspense, useRef, useState } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import { useGLTF, PointerLockControls, PerspectiveCamera, SpotLight } from '@react-three/drei';
import { Physics, RigidBody } from "@react-three/rapier";
import Blocker from './Blocker';
import Player from './Player';

// function Box() {
//   // This reference will give us direct access to the mesh
//   const mesh = useRef();

//   // Rotate mesh every frame, this is outside of React without overhead
//   useFrame(() => {
//     mesh.current.rotation.x += 0.01;
//     mesh.current.rotation.y += 0.01;
//   });

//   return (
//     <mesh ref={mesh}>
//       <boxGeometry args={[1, 1, 1]} />
//       <meshStandardMaterial color={'orange'} />
//     </mesh>
//   );
// }


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

function Model({ modelPath, position, rotation, scale }) {
  const { scene } = useGLTF(modelPath);
  return <primitive object={scene} position={position} rotation={rotation} scale={scale} />;
}

function Column({ position }) {
  return (
    <mesh position={position}>
      <cylinderGeometry args={[0.5, 0.5, 1, 32]} />
      <meshBasicMaterial color={0x808080} />
    </mesh>
  );
}

const GalleryRoom = () => {
  const [isBlocked, setIsBlocked] = useState(true);

  const handleBlockerClick = () => {
    setIsBlocked(false);
  };

  return (
    <>
      {isBlocked && <Blocker onClick={handleBlockerClick} />}
    <Canvas>
      {/* <PerspectiveCamera makeDefault position={[2, 1.6, 10]} /> */}
      <ambientLight intensity={0.4} />
      <SpotLight position={[3, 1.5, -3.2]} angle={0.3} penumbra={1} intensity={1} castShadow />

      <Suspense>
        <Physics gravity={[0, 1, 0]} interpolation={false} colliders={true}>
          <Player position={[0, 1.6, 10]} />
        
          {/* Models */}
          <Model modelPath="/assets/models/ganon.gltf" position={[3, 1, -3]} rotation={[1.8, 0, 0]} scale={[0.5, 0.5, 0.5]} />
          <Model modelPath="/assets/models/disfroggy.glb" position={[5, 1.7, -5]} rotation={[0, 0, 0]} scale={[0.5, 0.5, 0.5]} />
          <Model modelPath="/assets/models/thisisbowie2.gltf" position={[7, 1.2, -5]} rotation={[1.5, 0, 0]} scale={[0.5, 0.5, 0.5]} />
          <Model modelPath="/assets/models/pusheen.gltf" position={[9, 1.1, -5]} rotation={[0, 0, 0]} scale={[0.5, 0.5, 0.5]} />
          <Model modelPath="/assets/models/pup.gltf" position={[11, 1.4, -5]} rotation={[0, 0, 0]} scale={[0.5, 0.5, 0.5]} />
          <Model modelPath="/assets/models/riverscene.gltf" position={[16, 0, -5]} rotation={[0, 0, 0]} scale={[0.5, 0.5, 0.5]} />

          {/* Columns */}
          <Column position={[3, 0, -3]} />
          <Column position={[5, 0, -5]} />
          <Column position={[7, 0, -5]} />
          <Column position={[9, 0, -5]} />
          <Column position={[11, 0, -5]} />
          <Column position={[13, 0, -5]} />

          <Floor />
          <PointerLockControls />
      </Physics>
      </Suspense>
    </Canvas>
    </>
  );
};


export default GalleryRoom;
