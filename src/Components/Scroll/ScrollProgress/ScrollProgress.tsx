import "./ScrollProgress.scss"
import {JSX, useState} from "react";
import {motion} from "framer-motion";
import {useLenis} from "lenis/react"
export default function ScrollProgress():JSX.Element{
    const [progress , setProgress] = useState(0)
    useLenis((({scroll , limit})=>{
        setProgress(scroll/limit)
    }))
    return (
        <motion.div
        className="scroll-progress-bar"
            style={{
                scaleX : progress,
                transformOrigin:"left",
            }}
        />
    )
}