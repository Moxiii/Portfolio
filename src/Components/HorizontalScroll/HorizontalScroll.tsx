import {JSX, useRef, useState} from "react";
import { motion} from "framer-motion";
import  "./HorizontalScroll.scss"
import { useLenis } from "lenis/react";
interface HorizontalScrollProps{
    children:React.ReactNode;
}
export default function HorizontalScroll({children }:HorizontalScrollProps):JSX.Element{
    const targetRef = useRef(null);
    const [scrollValue , setScrollValue]=useState(0)
   useLenis(({scroll})=>{
       setScrollValue(scroll)
   })
    return (

        <section
            ref={targetRef}
            className="horizontal-scroll-container"
        >
            <div className="sticky-container">
                <motion.div style={{x: `-${scrollValue * 0.4}px`,}} className="scroll-container">
                    {children}
                </motion.div>
            </div>
        </section>
    )
}