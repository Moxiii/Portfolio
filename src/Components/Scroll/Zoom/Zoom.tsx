import s from "./Zoom.module.scss";
import { useRef, useState, useEffect } from "react";
import { useLenis } from "lenis/react";
import { useRect } from "hamo";
import { useWindowSize } from "react-use";
import cn from "clsx";

interface ZoomTextProps {
  title1: string;
  title2: string;
  text: string;
}

export default function ZoomText({ title1, text, title2 }: ZoomTextProps) {
  const { height: windowHeight } = useWindowSize();
  const zoomRef = useRef<HTMLDivElement>(null);
  const [zoomWrapperRectRef, zoomWrapperRect] = useRect();
  const [theme, setTheme] = useState("dark");

  function clamp(min: number, input: number, max: number): number {
    return Math.max(min, Math.min(input, max));
  }

  function mapRange(
    in_min: number,
    in_max: number,
    input: number,
    out_min: number,
    out_max: number
  ): number {
    return (
      ((input - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
    );
  }

  useLenis(({ scroll }) => {
    if (!zoomWrapperRect) {
      console.warn("zoomWrapperRect n'existe pas encore");
      return;
    }

    const start = (zoomWrapperRect.top ?? 0) + windowHeight * 0.5;
    const end =
      (zoomWrapperRect.top ?? 0) + (zoomWrapperRect.height ?? 0) - windowHeight;

    const progress = clamp(0, mapRange(start, end, scroll, 0, 1), 1);
    const center = 0.6;
    const progress1 = clamp(0, mapRange(0, center, progress, 0, 1), 1);
    const progress2 = clamp(0, mapRange(center, 1, progress, 0, 1), 1);

    setTheme(progress2 === 1 ? "light" : "dark");
    console.log("zoomRefWrapperRef:", zoomWrapperRectRef);
    console.log("zoomRefWrapper:", zoomWrapperRectRef);
    console.log("progress1:", progress1, "progress2:", progress2);

    if (zoomRef.current) {
      zoomRef.current.style.setProperty("--progress1", progress1.toString());
      zoomRef.current.style.setProperty("--progress2", progress2.toString());

      if (progress === 1) {
        zoomRef.current.style.setProperty("background-color", "currentColor");
      } else {
        zoomRef.current.style.removeProperty("background-color");
      }
    }
  });

  return (
    <section
      ref={(node) => {
        if (node) {
          zoomWrapperRectRef(node);
          zoomRef.current = node as HTMLDivElement;
        }
      }}
      className={s.zoomSection}
    >
      <div className={s.inner}>
        <div className={s.zoom}>
          <h2 className={cn(s.first, "h1 vh")}>
            <span className="contrast">{title1}</span>
          </h2>
          <h2 className={cn(s.text, "h3 vh")}>{text}</h2>
          <h2 className={cn(s.second, "h3 vh")}>{title2}</h2>
        </div>
      </div>
    </section>
  );
}
