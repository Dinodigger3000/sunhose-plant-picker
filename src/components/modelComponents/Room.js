/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from 'react'
import { useGLTF, PerspectiveCamera, OrbitControls } from '@react-three/drei'

export function Room(props) {
  const { nodes, materials } = useGLTF('/models/room.glb')
  return (
    <group {...props} dispose={null}>
      <directionalLight
        intensity={2}
        decay={2}
        color="#fffb00"
        position={[-7.59, 8.84, -19.97]}
        rotation={[-2.16, -0.3, 2]}
      />
      <PerspectiveCamera makeDefault={true} far={100} near={0.1}/>
      <group position={[2.5, -1.29, -5.57]} rotation={[Math.PI, 0, Math.PI]}>
        <mesh castShadow receiveShadow geometry={nodes.temp.geometry} material={materials.Floor} />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.temp_1.geometry}
          material={materials.Ceiling}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.temp_2.geometry}
          material={materials.Wallpaper}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Baseboard.geometry}
          material={materials.Baseboards}
        />
        <group position={[3.86, 0.66, 0]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Window_1.geometry}
            material={materials.Marble}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Window_2.geometry}
            material={materials.Baseboards}
          />
        </group>
      </group>
      <pointLight
        intensity={20.05}
        decay={2}
        position={[0, 0.61, -2.58]}
        rotation={[-Math.PI / 2, 0, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder.geometry}
        material={materials.Stool}
        position={[-1, -1.26, -5]}
      />
      <group position={[-1, -0.89, -5]}>
        <mesh castShadow receiveShadow geometry={nodes.Mesh.geometry} material={materials.Pot1} />
        <mesh castShadow receiveShadow geometry={nodes.Mesh_1.geometry} material={materials.Soil} />
      </group>
    </group>
  )
}

useGLTF.preload('/models/room.glb')

