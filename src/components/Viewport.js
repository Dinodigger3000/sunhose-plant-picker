import { Canvas, useFrame, useThree } from "@react-three/fiber";
import React, { useEffect, useRef, useState } from "react";
import { Room } from "./modelComponents/Room";
import { PerspectiveCamera } from "@react-three/drei";
import { useSpring, animated } from "@react-spring/three";
import { getCurrentTheme, subscribeToThemeChanges } from "./ColorTheme";

function Box() {
  const meshRef = useRef(null);
  const { viewport } = useThree();
  const [position, setPosition] = useState([]);
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  useFrame((state, delta) => {
    if (active) meshRef.current.rotation.x += delta;
  });
  useEffect(() => {
    var randomX = (Math.random() - 0.5) * viewport.width;
    var randomY = (Math.random() - 0.5) * viewport.height;
    setPosition([randomX, randomY, 0]);
  }, [viewport]);

  return (
    <mesh
      ref={meshRef}
      position={position}
      scale={hovered ? 1.5 : 1}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={active ? "orange" : "gray"} />
    </mesh>
  );
}

//   function AnimatedSun(props) {
//     const {profile} = props;
//     const lightRef = useRef();

//     const spring = useSpring(() => ({
//       sunPos: (profile === 4) ? [-2.16, -0.3, 2] : [0, 0, 0],
//     }),
//       [profile]);

//   useFrame(() => {
//     // Optional: Add some subtle movement to the light
//     // lightRef.current.position.y += 0.01;
//   });

//   return (
//     <animated.directionalLight
//     ref={lightRef}
//     rotation={spring.sunPos}

//     intensity={4}
//     decay={2}
//     color="#fffb00"
//     position={[-7.59, 8.84, -19.97]}
//     castShadow={true}
//     shadow-normalBias={0.1}
//     shadow-bias={0.0004}
//     shadow-radius={2}
//     shadow-mapSize={[1024, 1024]}

//     {...spring} />
//   );
// }

function Viewport(props) {
  const { profile } = props;
  const [sun, setSun] = useState(0);
  
  const [active, setActive] = useState(false);
  const { sunAngle, sunBrightness } = useSpring({
    sunAngle: active ? [-7.59, 8.84, -19.97] : [0, 20, -30],
    sunBrightness: active ? 40 : 0,
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
        active={active}
        onClick={() => {
          setActive(!active);
          console.log("clicked " + active);
        }}
      />
    </Canvas>
  );
}

export default Viewport;
