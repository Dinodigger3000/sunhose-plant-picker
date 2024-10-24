/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from 'react'
import { useGLTF, PerspectiveCamera, OrbitControls } from '@react-three/drei'

export function Room(props) {
  const { nodes, materials } = useGLTF('/models/room.glb')
  return (
    <group {...props} dispose={null}>
      <pointLight
        intensity={51.413}
        decay={3}
        position={[4.076, 5.904, -1.005]}
        rotation={[-1.839, 0.602, 1.932]}
      />
      <PerspectiveCamera
        makeDefault={true}
        far={100}
        near={0.1}
        fov={35.115}
        position={[2.596, 1.185, -3.629]}
        rotation={[3.122, 0, Math.PI]}
      />
      <mesh castShadow receiveShadow geometry={nodes.Room.geometry} material={nodes.Room.material}>
        <OrbitControls />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Baseboard.geometry}
          material={nodes.Baseboard.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Ceiling.geometry}
          material={nodes.Ceiling.material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Floor.geometry}
          material={nodes.Floor.material}
        />
      </mesh>
      <group position={[3.862, 0.66, 0]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Window_1.geometry}
          material={materials.Wood}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Window_2.geometry}
          material={materials.Plastic}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Window_3.geometry}
          material={materials.Marble}
        />
      </group>
    </group>
  )
}

useGLTF.preload('/models/room.glb')

