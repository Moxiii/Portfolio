import "./About.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngular, faGithub, faJs, faReact, faSass, faJava, faPython, faDocker } from "@fortawesome/free-brands-svg-icons";
import { JSX, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useLenis } from "lenis/react";
import { gsap } from "gsap";
import Dev from "../../assets/Illustration/3d-nft-icon-developer-male-illustration.png";

export default function About(): JSX.Element {
    const techs = [
        { name: "React", icon: faReact },
        { name: "Docker", icon: faDocker },
        { name: "GitHub", icon: faGithub },
        { name: "JavaScript", icon: faJs },
        { name: "Sass", icon: faSass },
        { name: "Java", icon: faJava },
        { name: "Python", icon: faPython },
        { name: "Angular", icon: faAngular },
    ];
    const containerRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);
    const progressBarRef = useRef<HTMLDivElement>(null);
    const [selectedTech, setSelectedTech] = useState<string | null>(null);
    const [progress, setProgress] = useState(0);


    useLenis(({ scroll }) => {
        if (!containerRef.current || !cardsRef.current || !progressBarRef) return;

        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const progress = Math.min(scroll / maxScroll, 1);
        setProgress(progress);


        gsap.to(cardsRef.current, {
            x: `-${progress * (techs.length - 1) * 100}vw`,
            ease: "power2.out",
            duration: 0.5,
        });

        gsap.to(progressBarRef.current, {
            scaleX: progress,
            transformOrigin: "left",
            ease: "none",
            duration: 0.2,
        });
    });

    return (
        <div className="about-page">
            <div className="progress-bar" ref={progressBarRef} />
            <section className="about-landing">
                <div className="text-zone">
                    <h2>Presentation</h2>
                    <p>Passionné d'informatique depuis mon plus jeune âge, aujourd'hui cela devient mon métier !</p>
                    <img className="illustration" src={Dev} alt="white man who dev" />
                    <p>Toujours d'une curiosité sans faille, je m'autoforme sur :</p>
                </div>
            </section>

            <section className="tech-container" ref={containerRef}>
                <div className="tech-pres">
                    <motion.div
                        className="tech-group"
                        ref={cardsRef}
                        transition={{ type: "spring", stiffness: 100, damping: 25 }}
                    >
                        {techs.map((tech, index) => (
                            <motion.div
                                key={index}
                                className="tech-card"
                                whileHover={{ scale: 1.1 }}
                            >
                                <FontAwesomeIcon icon={tech.icon} className="tech-icon" />
                                <h3>{tech.name}</h3>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>


            {selectedTech && (
                <div className="tech-popup" onClick={() => setSelectedTech(null)}>
                    <div className="popup-content">
                        <h2>{selectedTech}</h2>
                        <p>Plus d'infos sur {selectedTech}...</p>
                        <button onClick={() => setSelectedTech(null)}>Fermer</button>
                    </div>
                </div>
            )}

            <section className="text-zone">
                <p>Passionné d'informatique depuis mon plus jeune âge, aujourd'hui cela devient mon métier !</p>
                <img className="illustration" src={Dev} alt="white man who dev" />
                <p>Toujours d'une curiosité sans faille, je m'autoforme sur :</p>
            </section>
        </div>
    );
}
