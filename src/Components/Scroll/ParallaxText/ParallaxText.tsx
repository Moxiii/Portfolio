import { motion, useVelocity, useTransform, useSpring, useScroll } from "framer-motion";
import {useRef, useState, useEffect, JSX} from "react";
import { FaArrowDown } from "react-icons/fa";
import s from "./ParallaxText.module.scss";

interface ParallaxTextProps {
    topText: string[];
    bottomText: string[];
    centerText?: string;
    speed?: number;
    skewFactor?: number;
    textColor?: string;
    bgColor?: string;
}

export default function ParallaxText({
                                         topText,
                                         bottomText,
                                         centerText = "",
                                         speed = 4000,
                                         skewFactor = 30,
                                         textColor = "#000",
                                         bgColor = "#fff",
                                     }: ParallaxTextProps): JSX.Element {
    const containerRef = useRef<HTMLDivElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [maxScroll, setMaxScroll] = useState(0);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    const scrollVelocity = useVelocity(scrollYProgress);
    const skewXRaw = useTransform(scrollVelocity, [-0.5, 0.5], [`${skewFactor}deg`, `-${skewFactor}deg`]);
    const skewX = useSpring(skewXRaw, { mass: 3, stiffness: 400, damping: 50 });

    const xTopRaw = useTransform(scrollYProgress, [0, 1], [0, -speed]);
    const xTop = useSpring(xTopRaw, { mass: 3, stiffness: 400, damping: 50 });

    const xBottomRaw = useTransform(scrollYProgress, [0, 1], [0, speed]);
    const xBottom = useSpring(xBottomRaw, { mass: 3, stiffness: 400, damping: 50 });
    const transformText = (text: string) => {
        return text.split("/").join(" ");
    };
    const topTextArray = topText.map(transformText);
    const bottomTextArray = bottomText.map(transformText);

    useEffect(() => {
        setMaxScroll(scrollContainerRef.current?.scrollWidth - containerRef.current?.clientWidth || 0);
    }, []);

    return (
        <section
            ref={containerRef}
            className={s.parallaxTextContainer}
            style={{ backgroundColor: bgColor }}
        >
            <div className={s.stickyContent}>
                <motion.div
                    style={{ x: xTop, color: textColor }}
                    className={s.parallaxTextTop}
                    ref={scrollContainerRef}
                >
                    {topTextArray.map((text, index) => (
                        <motion.span
                            key={`top-text-${index}`}
                            style={{
                                x: xTop,
                                display: "inline-block",
                                skewX,
                            }}
                        >
                            {text}
                        </motion.span>
                    ))}
                </motion.div>

                {centerText && <h1 className={s.centerText}>{centerText}</h1>}

                <div className={s.scrollIndicator}>
                    <motion.div
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        animate={{ y: [0, 10, 0] }}
                    >
                        <FaArrowDown size={30} color={textColor} />
                    </motion.div>
                    <p>Scroll pour explorer</p>
                </div>

                <motion.div
                    style={{ color: textColor, x: xBottom }}
                    className={s.parallaxTextBottom}
                    ref={scrollContainerRef}
                >
                    {bottomTextArray.map((text, index) => (
                        <motion.span
                            key={`bottom-text-${index}`}
                            style={{
                                display: "inline-block",
                                x: xBottom,
                                skewX,
                            }}
                        >
                            {text}
                        </motion.span>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
