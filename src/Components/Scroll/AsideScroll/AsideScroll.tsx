import { useLenis } from "lenis/react";
import cn from "clsx";
import React,{ JSX, ReactElement, ReactNode, useRef } from "react";
import s from "./AsideScroll.module.scss";

interface AsideScrollProps {
  mainTiltedText: string;
  children: ReactNode;
  background?:string;
}

export default function AsideScroll({
                                      children,
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

  const renderChildren = (children: ReactNode) => {
    return (Array.isArray(children) ? children : [children]).map(
        (child, index) => {
          if (
              React.isValidElement(child) &&
              child.type === "h3"
          ) {
            return React.cloneElement(child as ReactElement, {
              className: cn(child.props.className, "h4"),
              key: index,
            });
          }
          return child;
        }
    );
  };

  return (
      <section ref={sectionRef} >
          <div className="aside-scroll" style={{"--bg-color":background}as React.CSSProperties}>
              <div className="layout-grid">
                  <h2 className={cn(s.sticky, "h2")}> {mainTiltedText} </h2>
                  <aside className={s.asideContainer}>
                      <div className={s.asideChilds}>{renderChildren(children)}</div>
                  </aside>
              </div>
          </div>

      </section>
  );
}
