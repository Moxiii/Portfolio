import {Canvas, useFrame, useLoader} from "@react-three/fiber";
import {  Text3D } from "@react-three/drei";
import {useEffect, useRef} from "react";
import * as THREE from "three";
import {FontLoader} from "three/examples/jsm/loaders/FontLoader";

function RotatingQuestionMark() {
    const font = "/fonts/DM Sans_Bold.json";
    const loadedFont = useLoader(FontLoader , font)

    const questionMarkRef = useRef<THREE.Mesh>(null);

    useFrame(() => {
        if (questionMarkRef.current) {
            questionMarkRef.current.rotation.y += 0.005;
        }
    });


    return (
        loadedFont ? (
            <mesh ref={questionMarkRef} position={[-3, 0, 0]}>
                <Text3D font={loadedFont} size={1} height={0.1}>
                    ?
                    <meshStandardMaterial color="purple" />
                </Text3D>
            </mesh>
        ) : (
            <></>
        )
    );
}

export default function QuestionMark3D() {
    return (
        <Canvas
            camera={{position: [0, 0, 5], fov: 50 }}
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                zIndex: 0,
            }}
        >

            <directionalLight intensity={1.2} position={[2, 2, 5]} />
            <ambientLight intensity={0.5} />

            <RotatingQuestionMark/>

        </Canvas>
    );
}
