import React, { useRef, useEffect, useState, useMemo } from "react";
import { useGLTF, useTexture } from "@react-three/drei";
import { useSpring, animated } from "@react-spring/three";
import * as THREE from "three";
export function Pot(props) {
  const { profile, materials } = props;
  const { nodes } = useGLTF("/models/pot.glb");

  const { potRotation } = useSpring({
    potRotation: profile.budget > 25 ? [0, Math.PI, 0] : [0, 0, 0],
  });
  const plantMaterial = useTexture("/textures/laceleaf.png");

  return (
    <group group {...props}>
      <animated.group position={[-1, -0.87, -5]} rotation={potRotation}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Pot1_1.geometry}
          material={materials.color4}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Pot1_1.geometry}
          material={materials.outline}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Pot1_2.geometry}
          material={materials.color2}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Pot1_2.geometry}
          material={materials.outline}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Pot1_3.geometry}
          material={materials.color2}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Pot1_3.geometry}
          material={materials.outline}
        />
      </animated.group>
      <mesh position={[-1, -0.16, -5]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial transparent map={plantMaterial}/>
      </mesh>
    </group>
  );
}
useGLTF.preload("/models/pot.glb");
