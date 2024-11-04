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
  const outlineMaterial = createOutlineMaterial(0.01);

  return (
    <group {...props} dispose={null}>
      <directionalLight
        intensity={2}
        decay={2}
        color="#ffffff"
        position={[-7.59, 8.84, -19.97]}
        rotation={[-2.16, -0.3, 2]}
      />
      <directionalLight intensity={1.5} position={[5, 5, -10]} />
      <ambientLight intensity={0} />

      {/* sun spotlight */}
      <spotLight
        intensity={1.5}
        angle={0.3}
        penumbra={0.5}
        position={[3.9, 5, 0]}
        castShadow
        color="#ffffff"
      />

      <PerspectiveCamera makeDefault={true} far={100} near={0.1} />

      {/* Room Structure */}
      <group position={[2.5, -1.29, -5.57]} rotation={[Math.PI, 0, Math.PI]}>
        <mesh geometry={nodes.temp.geometry} material={toonMaterial} />
        <mesh geometry={nodes.temp_1.geometry} material={toonMaterial} />
        <mesh geometry={nodes.temp_2.geometry} material={toonMaterial} />
        <mesh geometry={nodes.Baseboard.geometry} material={toonMaterial} />

        {/* Outline for Room Structure */}
        <mesh geometry={nodes.temp.geometry} material={outlineMaterial} />
        <mesh geometry={nodes.temp_1.geometry} material={outlineMaterial} />
        <mesh geometry={nodes.temp_2.geometry} material={outlineMaterial} />
        <mesh geometry={nodes.Baseboard.geometry} material={outlineMaterial} />

        {/* Window Group */}
        <group position={[3.86, 0.66, 0]}>
          <mesh geometry={nodes.Window_1.geometry} material={toonMaterial} />
          <mesh geometry={nodes.Window_2.geometry} material={toonMaterial} />

          {/* Outlines for Window */}
          <mesh geometry={nodes.Window_1.geometry} material={outlineMaterial} />
          <mesh geometry={nodes.Window_2.geometry} material={outlineMaterial} />
        </group>
      </group>

      {/* Stool*/}
      <group>
        <mesh
          geometry={nodes.Cylinder.geometry}
          material={toonMaterial}
          position={[-1, -1.26, -5]}
        />
        {/* Outline for Stool */}
        <mesh
          geometry={nodes.Cylinder.geometry}
          material={outlineMaterial}
          position={[-1, -1.26, -5]}
        />
      </group>

      {/* Pot with outline */}
      <group position={[-1, -0.89, -5]}>
        <mesh geometry={nodes.Mesh.geometry} material={toonMaterial} />
        <mesh geometry={nodes.Mesh_1.geometry} material={toonMaterial} />

        {/* Outline for Pot */}
        <mesh geometry={nodes.Mesh.geometry} material={outlineMaterial} />
        <mesh geometry={nodes.Mesh_1.geometry} material={outlineMaterial} />
      </group>
    </group>
  );
}

useGLTF.preload("/models/room.glb");
