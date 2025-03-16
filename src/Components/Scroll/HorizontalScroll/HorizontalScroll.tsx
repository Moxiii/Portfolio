import { JSX, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import "./HorizontalScroll.scss";
import { useLenis } from "lenis/react";
interface HorizontalScrollProps {
  children: React.ReactNode;
  background?: string;
  length?: number;
  gap?:string;
  padding?:string;
}
export default function HorizontalScroll({
  children,
  background,
  length = 8,
    gap,
    padding,
}: HorizontalScrollProps): JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollValue, setScrollValue] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);

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
      className="horizontal-scroll-container"
      style={
        {
          "--bg-color": background,
          "--length": length?.toString(),
          "--gap":gap,
          "--padding":padding,
        } as React.CSSProperties
      }
    >
      <div className="sticky-container" ref={scrollContainerRef}>
        <motion.div
          style={{ x: `-${scrollValue * maxScroll * 1}px` }}
          className="scroll-container"
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
}
