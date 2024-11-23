import React, { useRef, useState, useMemo, useEffect, Suspense, use } from 'react'
import { useGLTF, PerspectiveCamera, OrbitControls } from '@react-three/drei'
import { createToonMaterial } from '../../shaders/ToonMaterial';
import { createOutlineMaterial } from '../../shaders/OutlineMateral';
import { getCurrentTheme, defaultTheme, subscribeToThemeChanges } from '../ColorTheme';
import { PlantedPot } from './PlantedPot';
import { Canvas } from '@react-three/fiber';

export function Display({ topThreePlants, ...props }) {
    const { nodes } = useGLTF('/models/display.glb');
    // track current theme colors
    const [theme, setTheme] = useState(getCurrentTheme());
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
    console.log(topThreePlants);
    // set up theme change listener
    useEffect(() => {
        const unsubscribe = subscribeToThemeChanges(setTheme);
        return () => unsubscribe();
    }, []);

    if (topThreePlants.length === 0) {
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        );
    }
    return (
        <Suspense fallback={null}>

        <Canvas shadows={{}}>


            <group {...props} dispose={null}>
                <directionalLight
                    intensity={1}
                    decay={2}
                    color="#fffb00"
                    castShadow
                    position={[-7.59, 8.843, 4.482]}
                    rotation={[-0.627, 0.469, 2.158]}
                    />
                    <ambientLight intensity={0.5} />
                <PerspectiveCamera
                    makeDefault={true}
                    far={100}
                    near={0.1}
                    fov={29.395}
                    position={[0, 0.2, 0]}
                    />
                    {/* <OrbitControls /> */}
                <pointLight
                    intensity={4.791}
                    decay={2}
                    castShadow
                    position={[0, 0.613, -2.575]}
                    rotation={[-Math.PI / 2, 0, 0]}
                    />
                {(topThreePlants.length <=3) && 
                    <Suspense fallback={null} >
                        <PlantedPot plant={topThreePlants[0]} materials={materials} position={[0, 0.05, -5]} />
                        <PlantedPot plant={topThreePlants[1]} materials={materials} position={[1, 0.05, -5]} />
                        <PlantedPot plant={topThreePlants[2]} materials={materials} position={[-1, 0.05, -5]} />
                    </Suspense>
                }
                
                
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Table.geometry}
                    material={materials.color3}
                    position={[0, -0.429, -5.318]}
                    />
                <group position={[0, 1.407, -5.115]}>
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Umbrella_1.geometry}
                        material={materials.color4}
                        />
                    <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes.Umbrella_2.geometry}
                        material={materials.color2}
                        />
                </group>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Backdrop.geometry}
                    material={materials.color5}
                    position={[0, -1.065, 0]}
                    />
            </group>
        </Canvas>
                    </Suspense>)
}

useGLTF.preload('/models/display.glb')