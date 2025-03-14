import { useLenis } from "lenis/react";
import cn from "clsx";
import React, { JSX, useRef } from "react";
import s from "./AsideScroll.module.scss";
import { motion } from "framer-motion";

interface Tab {
  title: string;
  text: string;
}

interface AsideScrollProps {
  mainTiltedText: string;
  background?: string;
  tab: Tab[];
}

const asideVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function AsideScroll({
  tab,
  mainTiltedText,
  background,
}: AsideScrollProps): JSX.Element {
  const sectionRef = useRef<HTMLDivElement>(null);

  useLenis(({ scroll }) => {
    if (sectionRef.current) {
      const rect = sectionRef.current.getBoundingClientRect();
      const scrollHeight = sectionRef.current.clientHeight;

      if (rect.top < 0 && rect.bottom > 0) {
        const progress = Math.abs(rect.top / (rect.bottom - rect.top));
        sectionRef.current.style.setProperty("--progress", progress.toString());
      }
    }
  });

  return (
    <section
      ref={sectionRef}
      className={cn(s.asideScroll)}
      style={{ "--bg-color": background } as React.CSSProperties}
      data-lenis-scroll-snap-align="start"
    >

      <div className={cn(s.layoutGrid)}>
        <h2 className={cn(s.sticky, "h2")}>{mainTiltedText}</h2>
        <aside className={cn(s.asideContainer)}>
          {tab.map((item, index) => (
              <motion.div
                  key={index}
                  className={cn(s.asideChilds)}
                  variants={asideVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ amount: 0.3}}
              >
                <h3 className={cn(s.title, "h4")}>{item.title}</h3>
                <p className={cn(s.text, "p")}>{item.text}</p>
              </motion.div>
          ))}
        </aside>
      </div>
    </section>
  );
}
