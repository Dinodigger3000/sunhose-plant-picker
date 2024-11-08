import React, { useRef, useEffect, useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { createOutlineMaterial } from "../../shaders/OutlineMateral";
import { getCurrentTheme, subscribeToThemeChanges } from "../ColorTheme";

// load the toon gradient texture once at site startup
const gradientMap = new THREE.TextureLoader().load(
  "/textures/fourTone.jpg",
  function (texture) {
    texture.minFilter = texture.magFilter = THREE.NearestFilter;
  }
);

// create toon materials with consistent settings
const createToonMaterial = (color) => {
  return new THREE.MeshToonMaterial({
    color: color,
    gradientMap: gradientMap,
  });
};

// room component that creates the 3D room model
export function Room(props) {
  const { nodes } = useGLTF("/models/room.glb");
  // track current theme colors
  const [theme, setTheme] = React.useState(getCurrentTheme());

  // memoize materials so that they don't get recreated
  const materials = useMemo(() => {
    return {
      base: createToonMaterial(theme.base),
      color1: createToonMaterial(theme.color1),
      color2: createToonMaterial(theme.color2),
      color3: createToonMaterial(theme.color3),
      color4: createToonMaterial(theme.color4),
      color5: createToonMaterial(theme.color5),
      outline: createOutlineMaterial(0.005), // create outline effect material
    };
  }, [theme]);

  // set up theme change listener
  useEffect(() => {
    const unsubscribe = subscribeToThemeChanges(setTheme);
    return () => unsubscribe();
  }, []);

  // render room model
  return (
    <group {...props} dispose={null}>
      {/* main room structure */}
      <group position={[2.5, -1.29, -5.572]} rotation={[Math.PI, 0, Math.PI]}>
        {/* wall sections */}
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Walls.geometry}
          material={materials.color5}
        />
        <mesh
          castShadow={true}
          receiveShadow={true}
          geometry={nodes.Walls_1.geometry}
          material={materials.color5}
        />
        <mesh
          castShadow={true}
          receiveShadow={true}
          geometry={nodes.Walls_2.geometry}
          material={materials.color5}
        />
        <mesh
          castShadow={true}
          receiveShadow={true}
          geometry={nodes.Baseboard.geometry}
          material={materials.color2}
        />
        <group position={[3.862, 0.66, 0]}>
          <mesh
            castShadow={true}
            receiveShadow={true}
            geometry={nodes.Window_1.geometry}
            material={materials.color2}
          />
          <mesh
            castShadow={true}
            receiveShadow={true}
            geometry={nodes.Window_1.geometry}
            material={materials.outline}
          />
          <mesh
            castShadow={true}
            receiveShadow={true}
            geometry={nodes.Window_2.geometry}
            material={materials.color2}
          />
          <mesh
            castShadow={true}
            receiveShadow={true}
            geometry={nodes.Window_2.geometry}
            material={materials.outline}
          />
        </group>
      </group>

      {/* pot and stool */}
      <mesh
        castShadow={true}
        receiveShadow={true}
        geometry={nodes.Stool.geometry}
        material={materials.color2}
        position={[-1, -1.247, -5]}
      />
      <mesh
        castShadow={true}
        receiveShadow={true}
        geometry={nodes.Stool.geometry}
        material={materials.outline}
        position={[-1, -1.247, -5]}
      />
      <group position={[-1, -0.87, -5]}>
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
      </group>
    </group>
  );
}

useGLTF.preload("/models/room.glb");
