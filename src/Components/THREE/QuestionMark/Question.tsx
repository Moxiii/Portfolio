import {Canvas, useFrame} from "@react-three/fiber";
import {  Text3D } from "@react-three/drei";
import {useEffect, useRef, useState} from "react";
import * as THREE from "three";


function RotatingQuestionMark() {
    const [position, setPosition] = useState<[number, number, number]>([0, 0, 0]);

    const questionMarkRef = useRef<THREE.Mesh>(null);
    useEffect(() => {
        const width = questionMarkRef.current.geometry.boundingBox?.max.x || 0;
        setPosition([-(width/2) , 0 ,3])
    }, []);
    useFrame(() => {
        if (questionMarkRef.current) {
            questionMarkRef.current.rotation.y += 0.009;

        }
    });


    return (


                <Text3D
                    ref={questionMarkRef}
                    font="/fonts/DM_Sans_Regular.json"
                    size={1}
                    height={0.1}
                    curveSegments={12}
                    bevelEnabled
                    bevelThickness={0.02}
                    bevelSize={0.02}
                    bevelOffset={0}
                    bevelSegments={5}
                    position={position}

                >
                    ?
                    <meshStandardMaterial color="#cf87ff" />
                </Text3D>

    );
}

export default function QuestionMark3D({text}:{text:string}) {
    return (
        <div style={{ position: "relative", width: "100%", height: "60%" }}>
        <Canvas
            camera={{position: [0, 0, -3], fov: 60 }}
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                zIndex: 0,
            }}
        >

            <directionalLight intensity={1.2} position={[0, 0, 5]} />
            <ambientLight intensity={2} />

            <RotatingQuestionMark/>

        </Canvas>
    {text && (
        <div
            style={{
                marginTop:"5%",
                position: "relative",
                display:"flex",
                justifyContent:"center",
                alignItems:"center",
                flexDirection:"column",
                fontSize: "2rem",
                zIndex: 10,
            }}
        >
            {text}
        </div>
    )}</div>
    );
}