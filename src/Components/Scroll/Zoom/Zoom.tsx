import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLenis } from "lenis/react";
import { useWindowSize } from "react-use";
import cn from "clsx";
import s from "./Zoom.module.scss";
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
      setTheme(progress2 === 1 ? "dark" : "light");
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
    <section ref={containerRef} className={s.solution}>
      <div className={s.inner} ref={scrollContainerRef}>
        <div className={s.zoom}>
          <h2 className={cn(s.first, "h1 vh")}>
            <span className={s.contrast}>{title1}</span>
            <br /> {title2}
          </h2>
          <h2 className={cn(s.center, "h3 vh")}>
            {" "}
            {text.split("\n").map((line, index) => (
              <React.Fragment key={index}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </h2>
          <h2 className={cn(s.second, "h1 vh")}>Scroll down</h2>
        </div>
      </div>
    </section>
  );
}
