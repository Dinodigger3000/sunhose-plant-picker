import { Canvas, useFrame, useThree } from "@react-three/fiber";
import React, { useEffect, useRef, useState } from "react";
import { Room } from "./modelComponents/Room";
import { PerspectiveCamera } from "@react-three/drei";
function Box() {
    // Makes a cube that has a random position and can be clicked to toggle a rotation animation.
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

function Viewport() {
  return (
    <Canvas shadows={{}} >
      {/* <PerspectiveCamera
        makeDefault={true}
        // far={100}
        // near={0.1}
        // fov={35.115}
        position={[2.8, 1.2, -2.9]}
        rotation={[0, Math.PI, 0]}
      /> */}

      <PerspectiveCamera
        makeDefault={true}
        far={100}
        near={0.1}
        fov={30}
      />
      <directionalLight
        intensity={4}
        decay={2}
        color="#fffb00"
        position={[-7.59, 8.84, -19.97]}
        rotation={[-2.16, -0.3, 2]}
        castShadow={true}
        shadow-normalBias={0.1}
        shadow-bias={0.0004}
        shadow-radius={2}
        shadow-mapSize={[1024, 1024]}

      />
      <pointLight
        intensity={4.05}
        decay={2}
        position={[0, 0.61, -2.58]}
        castShadow={true}
        shadow-radius={5}
        
        // shadow-blurSamples={1}
        shadow-normalBias={0.1}
        // shadow-mapSize={[1024, 1024]}
      />
      <ambientLight intensity={1} />
      <color args={['#c4fffd']} attach="background" />
      <Room />
    </Canvas>
  );
}

export default Viewport;