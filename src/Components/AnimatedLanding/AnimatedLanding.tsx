import s from "./AnimatedLandind.module.scss"
import {JSX,useState, useRef, useEffect} from "react";
import {gsap} from "gsap"
import {motion} from "framer-motion";
type AnimatedLandingProps = {
    onRevealComplete: () => void ;
}
export default function AnimatedLanding({onRevealComplete}:AnimatedLandingProps):JSX.Element{
    const [isOpen , setIsOpen] = useState(false);
    const sceneRef = useRef<HTMLDivElement>(null)
    const revealRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        if (isOpen) {
            const tl = gsap.timeline({
                defaults: { ease: "power3.inOut" },
                onComplete: onRevealComplete,
            });
            tl.set([sceneRef.current , revealRef.current],{
                backdropFilter: "blur(20px)",
            });
            tl.to(sceneRef.current, {
                duration: 1.2,
                y: "-100%"
            })
                .to(revealRef.current, {
                    duration: 2,
                    opacity: 1,
                    visibility:"visible",
                },"-=1")
                .to(revealRef.current, {
                    duration: 0.5,
                    opacity: 0,
                    visibility:"hidden"
                })
            tl.set([sceneRef.current , revealRef.current],{
                duration:1.2,
                backdropFilter: "blur(20px)",
            },"+=0.5");
            tl.to(revealRef.current ,{
                duration:0.5,
                opacity:0,
                visibility:"hidden"
            })
        }
    }, [isOpen, onRevealComplete]);
    return (
        <div className={s.AnimatedLandingcontainer}>

            <div
                ref={sceneRef}
                className={s.sceneContainer}
            >
                <h1>Bienvenu sur mon Portfolio</h1>
                <h2>me </h2>
                <button className={s.trigger} onClick={() => setIsOpen(true)}>{isOpen ? "Fermer" : "Ouvrir"}</button>
                <p>{new Date().getFullYear()}</p>
            </div>
            <motion.div
                ref={revealRef} className={s.revealContainer}
            >
            <h2>Etudiant en informatique a IPI</h2>
            </motion.div>

        </div>
    )
}