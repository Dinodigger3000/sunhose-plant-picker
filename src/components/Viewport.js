import { Canvas, useFrame, useThree } from "@react-three/fiber";
import React, { useEffect, useRef, useState } from "react";
import { Room } from "./modelComponents/Room";
import { Stool } from "./modelComponents/Stool";
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
    <Canvas>
      <PerspectiveCamera
        makeDefault={true}
        // far={100}
        // near={0.1}
        // fov={35.115}
        position={[2.8, 1.2, -2.9]}
        rotation={[0, Math.PI, 0]}
      />
      {/* <ambientLight intensity={Math.PI / 2} /> */}
      <color args={['#c4fffd']} attach="background" />
      <ambientLight />
      <pointLight position={[0, 10, -10]} decay={0} intensity={Math.PI / 2} />
          {/* add four boxes to the canvas. It uses the Box() function we defined above. */}
          {/* <Box />
          <Box />
          <Box />
          <Box /> */}
          <Room />
          <Stool position={[1.5, -1, 3]} />
        </Canvas>
    );
}

export default Viewport;