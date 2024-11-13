import { Canvas, useFrame, useThree } from "@react-three/fiber";
import React, { useEffect, useRef, useState } from "react";
import { Room } from "./modelComponents/Room";
import { PerspectiveCamera } from "@react-three/drei";
import { useSpring, animated } from "@react-spring/three";
import { getCurrentTheme, subscribeToThemeChanges } from "./ColorTheme";

function Viewport(props) {
  const { profile } = props;

  const { sunAngle, sunBrightness } = useSpring({
    sunAngle: (profile.lightLevel > 3) ? [-7.59, 8.84, -19.97] : [0, 20, -30],
    sunBrightness: (profile.lightLevel > 3) ? 40 : 0,
  });

  return (
    <Canvas shadows={{}}>

      <PerspectiveCamera makeDefault={true} far={100} near={0.1} fov={30} />
      <animated.directionalLight
        intensity={sunBrightness}
        position={sunAngle}
        decay={2}
        color="#fffb00"
        castShadow={true}
        shadow-normalBias={0.1}
        shadow-bias={0.0004}
        shadow-radius={2}
        shadow-mapSize={[1024, 1024]}
      />
      <pointLight
        intensity={25}
        decay={2}
        position={[0, 0.61, -2.58]}
        castShadow={true}
        shadow-radius={5}
        // shadow-blurSamples={1}
        shadow-normalBias={0.1}
        // shadow-mapSize={[1024, 1024]}
      />
      <ambientLight intensity={Math.PI/2} />
      <color args={["#ffffff"]} attach="background" />
      <Room
        profile={profile}
      />
    </Canvas>
  );
}

export default Viewport;
