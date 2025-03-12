import "./Loading.scss";
import { JSX, useCallback, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

export default function LoadingScreen(): JSX.Element {
    const { mouse } = useThree();
    const cameraParams = {
        fov: 20,
        aspect: 2,
        near: 20,
        far: 500,
        x: 0,
        y: 2,
        z: 14,
    };
    const city = useRef(new THREE.Object3D());
    const smoke = useRef(new THREE.Object3D());
    const town = useRef(new THREE.Object3D());
    const BACKGROUND = 0xF02050;


    const mathRandom = useCallback((num = 8) => -Math.random() * num + Math.random() * num, []);


    const BUILDINGS = useMemo(() => {
        return [...Array(100)].map(() => ({
            position: [Math.random() * 10 - 5, 0, Math.random() * 10 - 5],
            scale: [Math.random() * 1.5, Math.random() * 4 + 1, Math.random() * 1.5],
        }));
    }, []);

    const PARTICLES = useMemo(() => {
        return [...Array(300)].map(() => ({
            position: [mathRandom(5), mathRandom(5), mathRandom(5)],
        }));
    }, []);


    useFrame(() => {
        if (city.current) {
            city.current.rotation.y += 0.01;
        }
        if (smoke.current) {
            smoke.current.rotation.y += 0.01;
        }
    });

    useFrame(() => {
        city.current.rotation.y += mouse.x * 0.1;
    });

    return (
        <Canvas
            camera={{
                position: [cameraParams.x, cameraParams.y, cameraParams.z],
                fov: cameraParams.fov,
                near: cameraParams.near,
                far: cameraParams.far,
            }}
        >
            <ambientLight intensity={4} />
            <pointLight position={[0, 6, 0]} intensity={0.5} />
            <color attach="background" args={[BACKGROUND]} />
            <fog attach="fog" args={[BACKGROUND, 10, 16]} />

            <group ref={city}>
                {BUILDINGS.map((b, i) => (
                    <mesh key={i} position={b.position} scale={b.scale}>
                        <boxGeometry args={[1, 1, 1]} />
                        <meshStandardMaterial color="black" />
                    </mesh>
                ))}
            </group>

            <group ref={smoke}>
                {PARTICLES.map((p, i) => (
                    <mesh key={i} position={p.position}>
                        <circleGeometry args={[0.01, 3]} />
                        <meshToonMaterial color={"yellow"} />
                    </mesh>
                ))}
            </group>


            <group ref={town}>
                <mesh />
            </group>
        </Canvas>
    );
}
