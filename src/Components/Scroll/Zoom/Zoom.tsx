import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLenis } from "lenis/react";
import { useWindowSize } from "react-use";
import "./Zoom.scss";

interface ZoomTextProps {
  title1: string;
  title2: string;
  text: string;
}

export default function ZoomText({ title1, text, title2 }: ZoomTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { height: windowHeight } = useWindowSize();
  const [theme, setTheme] = useState("light");
  const [scrollValue, setScrollValue] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);
  //setTheme(scrollValue === 1 ? "dark" : "light");
  function clamp(min, input, max) {
    return Math.max(min, Math.min(input, max));
  }

  function mapRange(in_min, in_max, input, out_min, out_max) {
    return (
      ((input - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
    );
  }

  useLenis(({ scroll }) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const scrollHeight = containerRef.current.clientHeight;
      const start = rect.top + windowHeight * 0.5;
      const end = rect.top + scrollHeight - windowHeight;

      const progress = clamp(0, mapRange(start, end, scroll, 0, 1), 1);
      const center = 0.6;
      const progress1 = clamp(0, mapRange(0, center, progress, 0, 1), 1);
      const progress2 = clamp(
        0,
        mapRange(center - 0.055, 1, progress, 0, 1),
        1
      );
      containerRef.current.style.setProperty("--progress1", progress1);
      containerRef.current.style.setProperty("--progress2", progress2);
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
    <section ref={containerRef} className="zoom-scroll-container">
      <div className="zoom-sticky-container" ref={scrollContainerRef}>
        <div className="zoom-scroll-inside">
          <motion.h2
            className="first"
            style={{
              opacity: 1 - scrollValue,
              y: `-${scrollValue * 50}vh`,
            }}
          >
            {title1}
          </motion.h2>

          <motion.span
            className="center contrast"
            style={{
              opacity: clamp(0, 1 - Math.abs(scrollValue - 0.5) * 2, 1),
              scale: 1 + scrollValue * 5,
            }}
          >
            {text}
          </motion.span>

          <motion.h2
            className="second"
            style={{
              opacity: 1 - scrollValue,
              y: `${scrollValue * 50}vh`,
            }}
          >
            {title2}
          </motion.h2>
        </div>
      </div>
    </section>
  );
}
