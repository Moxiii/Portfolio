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
        if(isOpen){
            gsap.to(sceneRef.current,{
                duration: 0.8,
                height:"100%",
                top:"0%",
                left:"0%",
                ease:"power3.inOut",
                onComplete:()=>{
                    gsap.to(revealRef.current,{
                        duration:1.8,
                        width:"100%",
                        top:"30%",
                        ease:"power3.inOut",
                    });
                    gsap.to(sceneRef.current,{
                        duration: 0.8,
                        top: "-70%",
                        ease: "power3.inOut",
                        onComplete: onRevealComplete,
                    })
                }
            })
        }else{
            gsap.to(revealRef.current,{
                duration: 1.2,
                top: "100%",
                width: "100%",
                ease: "power3.inOut",
                onComplete:()=>{
                    gsap.to(sceneRef.current,{
                        duration: 0.8,
                        height: "100%",
                        width: "100%",
                        ease: "power3.inOut",
                    })
                }
            })
        }
    }, [isOpen]);
    return (
        <div className={s.AnimatedLandingcontainer}>
            <button className={s.trigger} onClick={()=>setIsOpen(true)} >{isOpen ? "Fermer" : "Ouvrir"}</button>
            <div
                ref={sceneRef}
                className={s.sceneContainer}
            >
                <h1>Portfolio</h1>
                <p>{new Date().getFullYear()}</p>
                <h2>Me</h2>
            </div>
            <motion.div
          ref={revealRef} className={s.revealContainer}
          >

          </motion.div>

        </div>
    )
}