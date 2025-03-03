import s from "./cursor.module.scss"
import cn from 'clsx'
import {JSX, useRef, useState, useCallback, useEffect} from "react";
import gsap from 'gsap'
export default function CustomCursor():JSX.Element{
    const cursor = useRef<HTMLDivElement | null>(null);
    const [isGrab, setIsGrab] = useState(false)
    const [isPointer, setIsPointer] = useState(false)
    const [hasMoved , setHasMoved] = useState(false);
    const onMouseMove = useCallback(
        ({clientX,clientY} : MouseEvent) =>{
            gsap.to(cursor.current , {
                x : clientX , y: clientY ,
                duration : hasMoved ? 0.5 : 0 ,
                ease : `expo.out`,
            })
            setHasMoved(true)
        },[hasMoved]
    )
    useEffect(()=>{
        window.addEventListener('mousemove' , onMouseMove , false)
        return ()=>{
            window.removeEventListener('mousemove' , onMouseMove , false)
        }
    })
    useEffect(() => {
        window.addEventListener("mousemove", onMouseMove);
        return () => window.removeEventListener("mousemove", onMouseMove);
    }, [onMouseMove]);

    useEffect(() => {
        const elements = document.querySelectorAll(
            "button, a, input, label, [data-cursor='pointer']"
        );

        const onMouseEnter = () => setIsGrab(true);
        const onMouseLeave = () => setIsGrab(false);

        elements.forEach((el) => {
            el.addEventListener("mouseenter", onMouseEnter);
            el.addEventListener("mouseleave", onMouseLeave);
        });

        return () => {
            elements.forEach((el) => {
                el.removeEventListener("mouseenter", onMouseEnter);
                el.removeEventListener("mouseleave", onMouseLeave);
            });
        };
    }, []);

    useEffect(() => {
        window.addEventListener("mousemove", onMouseMove);
        return () => window.removeEventListener("mousemove", onMouseMove);
    }, [onMouseMove]);

    useEffect(() => {
        const elements = document.querySelectorAll(
            "button, a, input, label, [data-cursor='pointer']"
        );

        const onMouseEnter = () => setIsPointer(true);
        const onMouseLeave = () => setIsPointer(false);

        elements.forEach((el) => {
            el.addEventListener("mouseenter", onMouseEnter);
            el.addEventListener("mouseleave", onMouseLeave);
        });

        return () => {
            elements.forEach((el) => {
                el.removeEventListener("mouseenter", onMouseEnter);
                el.removeEventListener("mouseleave", onMouseLeave);
            });
        };
    }, []);
    return (
        <div style={{opacity:hasMoved ? 1:0 }} className={s.cursorContainer}>
            <div ref={cursor}>
                <div className={cn(s.cursor , { [s.grab]: isGrab , [s.pointer]: isPointer})}></div>
            </div>
        </div>
    )
}