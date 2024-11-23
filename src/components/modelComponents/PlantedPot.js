import React, { useRef, useEffect, useState, useMemo, Suspense } from "react";
import { Html, useGLTF, useTexture } from "@react-three/drei";
export function PlantedPot(props) {
  const { plant, materials } = props;
  const { nodes } = useGLTF("/models/pot.glb");

  const plantMaterial = useTexture(plant.data.imageUrl);

  return (
    <group {...props}>
        <group>
          <mesh
            castShadow
            receiveShadow
            material={materials.color4}
            geometry={nodes.Pot1_1.geometry}
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
        </group >

          <mesh position={[0,0.74,0]} >
            <planeGeometry args={[1, 1]} />
            <meshBasicMaterial map={plantMaterial} transparent/>
          </mesh>
        
    </group>
  );
}
useGLTF.preload("/models/pot.glb");
