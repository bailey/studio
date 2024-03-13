import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { Physics, RigidBody, CuboidCollider } from "@react-three/rapier";

function Player({ position }) {
    // Ref to access the RigidBody in useFrame for updating position based on input
    const playerRef = useRef();
  
    // Movement state
    const [movement, setMovement] = useState({
      forward: false,
      backward: false,
      left: false,
      right: false,
    });
  
    // Update movement state based on key events
    useEffect(() => {
      const handleKeyDown = (e) => {
        if (e.key === 'w') setMovement((m) => ({ ...m, forward: true }));
        if (e.key === 's') setMovement((m) => ({ ...m, backward: true }));
        if (e.key === 'a') setMovement((m) => ({ ...m, left: true }));
        if (e.key === 'd') setMovement((m) => ({ ...m, right: true }));
      };
  
      const handleKeyUp = (e) => {
        if (e.key === 'w') setMovement((m) => ({ ...m, forward: false }));
        if (e.key === 's') setMovement((m) => ({ ...m, backward: false }));
        if (e.key === 'a') setMovement((m) => ({ ...m, left: false }));
        if (e.key === 'd') setMovement((m) => ({ ...m, right: false }));
      };
  
      window.addEventListener('keydown', handleKeyDown);
      window.addEventListener('keyup', handleKeyUp);
  
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        window.removeEventListener('keyup', handleKeyUp);
      };
    }, []);
  
    // Apply forces or set velocity based on the movement state
    useFrame(() => {
      if (!playerRef.current) return;
      
      const body = playerRef.current;
      let velocity = { x: 0, z: 0 };
      const speed = 5; // Adjust speed as needed
  
      if (movement.forward) velocity.z -= speed;
      if (movement.backward) velocity.z += speed;
      if (movement.left) velocity.x -= speed;
      if (movement.right) velocity.x += speed;
  
      body.setLinvel({ x: velocity.x, y: body.linvel().y, z: velocity.z }, true);
    });
  
    return (
      <RigidBody ref={playerRef} position={position} type="dynamic">
        {/* <CuboidCollider args={[0.5, 0.5, 0.5]} /> */}
      </RigidBody>
    );
  }
  
  export default Player;