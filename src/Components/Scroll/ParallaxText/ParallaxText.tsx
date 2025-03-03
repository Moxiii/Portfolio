import s from "./ParallaxText.module.scss"
import {JSX, useEffect, useRef, useState} from "react";
import {motion, useVelocity, useTransform, useSpring, useMotionValue} from "framer-motion";
import {useLenis} from "lenis/react";
import {FaArrowDown} from "react-icons/fa";
import BubbleText from "../../BubbleText";
interface ParallaxTextProps{
    topText:string;
    bottomText:string;
    centerText?:string;
    speed?:number;
    skewFactor?: number ;
    textColor?: string ;
    bgColor?: string ;
}
export default function ParallaxText({
                                           topText,
                                           bottomText,
                                           centerText = "",
                                           speed = 4000,
                                           skewFactor = 30,
                                           textColor = "#000",
                                           bgColor = "#fff",}:ParallaxTextProps):JSX.Element{
    const containerRef = useRef<HTMLDivElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const scrollValue = useMotionValue(0);
    const maxScroll = useMotionValue(0);

    useLenis(({ scroll }) => {
        scrollValue.set(scroll - maxScroll.get());
    });

    useEffect(() => {
        if (scrollContainerRef.current && containerRef.current) {
            maxScroll.set(scrollContainerRef.current.scrollWidth - containerRef.current.clientWidth);
        }
    }, []);
    const scrollVelocity = useVelocity(scrollValue)
    const skewXRaw = useTransform(scrollVelocity, [-0.5, 0.5], [`${skewFactor}deg`, `-${skewFactor}deg`]);
    const skewX = useSpring(skewXRaw, { mass: 3, stiffness: 400, damping: 50 });
    const xTop = useSpring(useTransform(scrollValue, [0, 1], [0, -speed]), { mass: 3, stiffness: 400, damping: 50 });
    const xBottom = useSpring(useTransform(scrollValue, [0, 1], [0, speed]), { mass: 3, stiffness: 400, damping: 50 });
    return (
        <section
            ref={containerRef}
            className={s.parallaxTextContainer}
            style={{ backgroundColor: bgColor }}>
            <div className={s.stickyContent}>
                <motion.p
                    style={{ skewX, x: xTop, color: textColor }}
                    className={s.parallaxTextTop}
                >
                    {topText}
                </motion.p>
                {centerText && <h1 className={s.centerText}>{centerText}</h1>}
                <div className={s.scrollIndicator}>
                    <motion.div
                        transition={{duration: 1.5, repeat: Infinity, ease: "easeInOut"}}
                        animate={{y: [0,  10 , 0]}}
                    >
                        <FaArrowDown size={30} color={textColor}/>

                    </motion.div>
                    <BubbleText text={"Scroll pour explorer"}/>
                </div>

                <motion.p
                    style={{skewX, x: xBottom, color: textColor}}
                    className={s.parallaxTextBottom}
                >
                    {bottomText}
                </motion.p>
            </div>
        </section>
    )
}