import  {JSX, useRef} from "react";
import {useScroll, useTransform,motion} from "framer-motion";
import  "./HorizontalScroll.scss"

interface HorizontalScrollProps{
    children:React.ReactNode;
}
export default function HorizontalScroll({children }:HorizontalScrollProps):JSX.Element{
    const targetRef = useRef(null);
    const {scrollYProgress} = useScroll({
        target:targetRef,
    })
    const x = useTransform(scrollYProgress,[0,1],["0%","-45%"])
    return (
        <section
            ref={targetRef}
            className="horizontal-scroll-container"
        >
            <div className="sticky-container">
                <motion.div style={{x}} className="scroll-container">
                    {children}
                </motion.div>
            </div>
        </section>
    )
}