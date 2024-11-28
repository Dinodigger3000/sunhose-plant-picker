import React, { useRef, useEffect, useState, useMemo } from "react";
import { useGLTF, useTexture } from "@react-three/drei";
import { useSpring, animated, useChain, useSprings } from "@react-spring/three";
import * as THREE from "three";
export function Pot(props) {
  const { profile, materials } = props;
  const { nodes } = useGLTF("/models/pot.glb");

  const { potRotation } = useSpring({
    potRotation: profile.budget > 25 ? [0, Math.PI, 0] : [0, 0, 0]
  });
  const { heart1Pos, heart2Pos, heart3Pos } = useSpring({
    from: { heart1Pos: [0.249, 0.586, 0], heart2Pos: [0, 0, 0], heart3Pos: [0, 0, 0] },
    to: [
      { heart3Pos: profile.careLevel > 1 ? [0.156, 1.093, 0] : [0, 0, 0] },
      { heart2Pos: profile.careLevel > 1 ? [-0.293, 0.713, 0] : [0, 0, 0] },
      { heart1Pos: profile.careLevel > 0 ? [0.249, 0.586, 0] : [0, 0, 0] },
    ],
    config: { duration: 200}
  })
  const plantMaterial = useTexture("/textures/laceleaf.png");

  return (
    <group group {...props}>
      <animated.group rotation={potRotation}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Pot1_1.geometry}
          material={materials.color4}
        />
        <mesh
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
          geometry={nodes.Pot1_3.geometry}
          material={materials.outline}
        />
      </animated.group>
      {/* Hearts */}
      <animated.group position={heart1Pos}>
        <mesh
          geometry={nodes.Heart.geometry}
          material={materials.color3}
        />
        <mesh
          geometry={nodes.Heart.geometry}
          material={materials.outline}
        />
      </animated.group>
      <animated.group position={heart2Pos} >
        <mesh
          geometry={nodes.Heart001.geometry}
          material={materials.color3}
          scale={1.232}
        />
        <mesh
          geometry={nodes.Heart001.geometry}
          material={materials.outline}
          scale={1.232}
        />
      </animated.group>
      <animated.group position={heart3Pos} >
        <mesh
          geometry={nodes.Heart002.geometry}
          material={materials.color3}
        />
        <mesh
          geometry={nodes.Heart002.geometry}
          material={materials.outline}
        />
      </animated.group>
      {/* Plant image frame */}
      <mesh position={[0, 0.74, 0]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial transparent map={plantMaterial} />
      </mesh>
    </group>
  );
}
useGLTF.preload("/models/pot.glb");
