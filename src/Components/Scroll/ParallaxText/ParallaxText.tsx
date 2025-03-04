import { JSX, useEffect, useRef, useState } from "react";
import { useLenis } from "lenis/react";
import { FaArrowDown } from "react-icons/fa";
import s from "./ParallaxText.module.scss";
import { motion } from "framer-motion";
import BubbleText from "../../BubbleText";
interface ParallaxTextProps {
  topText: string[];
  bottomText: string[];
  centerText?: string;
  subCenterText?: string;
  length?: number;
  textColor?: string;
  bgColor?: string;
}

export default function ParallaxText({
  topText,
  bottomText,
  centerText = "",
  textColor = "#000",
  bgColor = "#fff",
  length = 5,
  subCenterText = "",
}: ParallaxTextProps): JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollValue, setScrollValue] = useState(0);
  const [maxScroll, setMaxScroll] = useState(1);
  const createRepeatingText = (textArray: string[], repeatCount: number) => {
    const repeatedText = Array(repeatCount).fill(textArray).flat();
    return repeatedText.map((text, index) => (
      <span key={`repeated-text-${index}`} className={s.spanText}>
        {text}
      </span>
    ));
  };
  useLenis(({ scroll }) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const scrollHeight = containerRef.current.clientHeight;
      const maxScrollInside = scrollHeight - window.innerHeight;
      if (rect.top < 0 && rect.bottom > 0) {
        const normalizedScroll = Math.max(
          0,
          Math.min(-rect.top / maxScrollInside, 1)
        );
        setScrollValue(normalizedScroll);
      }
    }
  });

  useEffect(() => {
    setMaxScroll(
      scrollContainerRef.current.scrollWidth - containerRef.current.clientWidth
    );
  }, []);

  return (
    <section
      ref={containerRef}
      className={s.parallaxTextContainer}
      style={
        {
          backgroundColor: bgColor,
          "--length": length?.toString(),
          "--text-color": textColor,
        } as React.CSSProperties
      }
    >
      <div className={s.stickyContent} ref={scrollContainerRef}>
        <motion.div
          style={{ x: `-${(scrollValue * maxScroll * 0.5) % maxScroll}px` }}
          className={s.parallaxTextTop}
        >
          {createRepeatingText(topText, 3)}
        </motion.div>
        <div className={s.centerTextContainer}>
          {centerText && <h1 className={s.centerTitle}>{centerText}</h1>}
          {subCenterText && <BubbleText text={subCenterText} />}
        </div>

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
          style={{ x: `${(scrollValue * maxScroll * 0.5) % maxScroll}px` }}
          className={s.parallaxTextBottom}
        >
          {createRepeatingText(bottomText, 3)}
        </motion.div>
      </div>
    </section>
  );
}
