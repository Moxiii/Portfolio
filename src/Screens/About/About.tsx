import "./About.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngular, faGithub, faJs, faReact, faSass, faJava, faPython, faDocker } from "@fortawesome/free-brands-svg-icons";
import { JSX, useRef, useState } from "react";
import { motion } from "framer-motion";
import Dev from "../../assets/Illustration/3d-nft-icon-developer-male-illustration-min-500px.png";
import HorizontalScroll from "../../Components/HorizontalScroll/HorizontalScroll.tsx";

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
    const progressBarRef = useRef<HTMLDivElement>(null);
    const [selectedTech, setSelectedTech] = useState<string | null>(null);





    return (
        <div className="about-page">
            <section className="about-landing">
                <div className="text-zone">
                    <h2>Présentation</h2>
                    <p>Passionné d'informatique depuis mon plus jeune âge, aujourd'hui cela devient mon métier !</p>
                    <img className="illustration" src={Dev} alt="white man who dev" />
                    <p>Toujours d'une curiosité sans faille, je m'autoforme sur :</p>
                </div>
            </section>

            <HorizontalScroll>

                    {techs.map((tech , index)=>(
                        <motion.div
                            key={index}
                            className="tech-card"
                            whileHover={{scale:1.1}}
                            onClick={()=>setSelectedTech(tech.name)}
                        >
                            <FontAwesomeIcon icon={tech.icon} className="tech-icon" />
                            <h3>{tech.name}</h3>
                        </motion.div>
                    ))}


            </HorizontalScroll>


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
