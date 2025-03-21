import s from "./BubbleText.module.scss";
import React, { JSX } from "react";
interface BubbleTextProps {
  text: string;
  color?: string;
  size?: number;
}
export default function BubbleText({
  text,
  color = "#000",
  size = 1200,
}: BubbleTextProps): JSX.Element {
  return (
    <div
      className={s.bubbleContainer}
      style={{ "--color": color, "--size": size } as React.CSSProperties}
    >
      <p className={s.bubbleText}>
        {text.split("").map((child, index) => (
          <span className={s.hoverText} key={index}>
            {child}
          </span>
        ))}
      </p>
    </div>
  );
}
