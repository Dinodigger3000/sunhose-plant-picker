import React, { useRef, useEffect, useState, useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { createOutlineMaterial } from "../../shaders/OutlineMateral";
import { createToonMaterial } from "../../shaders/ToonMaterial";
import { useSpring, animated } from "@react-spring/three";
import { getCurrentTheme, subscribeToThemeChanges, defaultTheme } from "../ColorTheme";
import { Pot } from "./Pot";


// room component that creates the 3D room model
export function Room(props) {
  const { profile, plants } = props;
  const { nodes } = useGLTF("/models/room.glb");
  // track current theme colors
  const [theme, setTheme] = React.useState(getCurrentTheme());

  // memoize materials so that they don't get recreated
  const materials = useMemo(() => {
    const currentTheme = theme || defaultTheme;
    return {
      base: createToonMaterial(currentTheme.base),
      color1: createToonMaterial(currentTheme.color1),
      color2: createToonMaterial(currentTheme.color2),
      color3: createToonMaterial(currentTheme.color3),
      color4: createToonMaterial(currentTheme.color4),
      color5: createToonMaterial(currentTheme.color5),
      outline: createOutlineMaterial(0.005),
    };
  }, [theme]);

  // set up theme change listener
  useEffect(() => {
    const unsubscribe = subscribeToThemeChanges(setTheme);
    return () => unsubscribe();
  }, []);

  // render room model
  const { sunAngle: sunRotation } = useSpring({
    sunAngle: profile.lightLevel > 3 ? [0, 0, 0] : [0, 0.1, 0],
  });
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

      {/* stool */}
      <group>
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
      </group>
      {/* plant pot with rotate animation */}
      <Pot profile={props.profile} materials={materials} position={[-1, -0.87, -5]}/>
      <animated.group //sun with rotate animation
        rotation={sunRotation}
      >
        <mesh
          geometry={nodes.Sun_1.geometry}
          material={materials.color5}
          position={[-5.393, -2.919, -18.015]}
        />
        <mesh
          geometry={nodes.Sun_1.geometry}
          material={materials.outline}
          position={[-5.393, -2.919, -18.015]}
        />
        <mesh
          geometry={nodes.Sun_2.geometry}
          material={materials.color2}
          position={[-5.393, -2.919, -18.015]}
        />
        <mesh
          geometry={nodes.Sun_2.geometry}
          material={materials.outline}
          position={[-5.393, -2.919, -18.015]}
        />
      </animated.group>
      <group position={[0, 0, -20]}>
        <mesh geometry={nodes.Hill_1.geometry} material={materials.color4} />
        <mesh geometry={nodes.Hill_1.geometry} material={materials.outline} />
        <mesh geometry={nodes.Hill_2.geometry} material={materials.color3} />
        <mesh geometry={nodes.Hill_2.geometry} material={materials.outline} />
      </group>
    </group>
  );
}

useGLTF.preload("/models/room.glb");
