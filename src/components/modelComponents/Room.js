import React, { useRef, useEffect } from "react";
import { useGLTF, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import { createOutlineMaterial } from "../../shaders/OutlineMateral";

export function Room(props) {
  const { nodes, materials } = useGLTF("/models/room.glb");

  // Create Toon Material
  const toonMaterial = new THREE.MeshToonMaterial({
    color: "#ffffff",
    gradientMap: new THREE.TextureLoader().load(
      "/textures/fourTone.jpg",
      function (texture) {
        texture.minFilter = texture.magFilter = THREE.NearestFilter;
      }
    ),
  });

  // Create Outline Material
  const outlineMaterial = createOutlineMaterial(0.005);

  return (
    <group {...props} dispose={null}>
      {/* <OrbitControls /> */}
      <group position={[2.5, -1.29, -5.572]} rotation={[Math.PI, 0, Math.PI]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Walls.geometry}
          material={toonMaterial}
        />
        <mesh
          castShadow={true}
          receiveShadow={true}
          geometry={nodes.Walls_1.geometry}
          material={toonMaterial}
        />
        <mesh
          castShadow={true}
          receiveShadow={true}
          geometry={nodes.Walls_2.geometry}
          material={toonMaterial}
        />
        <mesh
          castShadow={true}
          receiveShadow={true}
          geometry={nodes.Baseboard.geometry}
          material={toonMaterial}
        />
        <group position={[3.862, 0.66, 0]}>
          <mesh
            castShadow={true}
            receiveShadow={true}
            geometry={nodes.Window_1.geometry}
            material={toonMaterial}
          />
          <mesh
            castShadow={true}
            receiveShadow={true}
            geometry={nodes.Window_1.geometry}
            material={outlineMaterial}
          />
          <mesh
            castShadow={true}
            receiveShadow={true}
            geometry={nodes.Window_2.geometry}
            material={toonMaterial}
          />
          <mesh
            castShadow={true}
            receiveShadow={true}
            geometry={nodes.Window_2.geometry}
            material={outlineMaterial}
          />
        </group>
      </group>
      <mesh
        castShadow={true}
        receiveShadow={true}
        geometry={nodes.Stool.geometry}
        material={toonMaterial}
        position={[-1, -1.257, -5]}
      />
      <mesh
        castShadow={true}
        receiveShadow={true}
        geometry={nodes.Stool.geometry}
        material={outlineMaterial}
        position={[-1, -1.257, -5]}
      />
      <group position={[-1, -0.889, -5]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Pot1_1.geometry}
          material={toonMaterial}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Pot1_1.geometry}
          material={outlineMaterial}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/models/room.glb");
