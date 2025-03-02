import "./Zoom.scss";
import { useRef, useState } from "react";
import { useLenis } from "lenis/react";
import { useRect } from "hamo";
import { useWindowSize } from 'react-use';

interface ZoomTextProps {
    title1: string;
    title2: string;
    text: string;
}

export default function ZoomText({ title1, text, title2 }: ZoomTextProps) {
    // Fonction de "clamp" pour limiter la valeur entre min et max
    function clamp(min: number, input: number, max: number) {
        return Math.max(min, Math.min(input, max));
    }

    // Fonction de "map" pour adapter la plage de valeurs
    function mapRange(in_min: number, in_max: number, input: number, out_min: number, out_max: number) {
        return ((input - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
    }

    const { height: windowHeight } = useWindowSize();
    const zoomRef = useRef<HTMLDivElement>(null);
    const [zoomWrapperRectRef, zoomWrapperRect] = useRect();
    const [theme, setTheme] = useState('dark');

    useLenis(({ scroll }) => {
        if (!zoomWrapperRect.top) return;

        const start = zoomWrapperRect.top + windowHeight * 0.5;
        const end = zoomWrapperRect.top + zoomWrapperRect.height - windowHeight;
        const progress = clamp(0, mapRange(start, end, scroll, 0, 1), 1);
        const center = 0.6;
        const progress1 = clamp(0, mapRange(0, center, progress, 0, 1), 1);
        const progress2 = clamp(0, mapRange(center - 0.055, 1, progress, 0, 1), 1);

        setTheme(progress2 === 1 ? 'light' : 'dark');

        if (zoomRef.current) {
            zoomRef.current.style.setProperty('--progress1', progress1.toString());
            zoomRef.current.style.setProperty('--progress2', progress2.toString());

            // Le background reste violet tant que le zoom n'est pas terminé
            if (progress1 === 1) {
                zoomRef.current.style.setProperty('background-color', 'currentColor');
            } else {
                zoomRef.current.style.removeProperty('background-color');
            }
        }
    });

    return (
        <>
            <section
                ref={(node) => {
                    zoomWrapperRectRef(node);
                    zoomRef.current = node as HTMLDivElement;
                }}
                className="zoom-section"
            >
                <div className="inner">
                    <div className="zoom">
                        <h2 className="first vh">
                            <span className="contrast">{title1}</span>
                        </h2>
                        <h2 className="text">{text}</h2>
                        <h2 className="second vh">{title2}</h2>
                    </div>
                </div>
            </section>

            <section className="next-section">
                <p>test</p>
                <p>test</p>
                <p>test</p>
                <p>test</p>
                <p>test</p>
                <p>test</p>
                <p>test</p>
                <p>test</p>
                <p>test</p>
                <p>test</p>
                <div className="a"></div>
            </section>
        </>
    );
}
