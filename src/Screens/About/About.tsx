import "./About.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngular, faGithub, faJs, faReact, faSass, faJava, faPython, faDocker } from "@fortawesome/free-brands-svg-icons";
import {faKeyboard , faMotorcycle , faCar , faShirt} from "@fortawesome/free-solid-svg-icons";
import { JSX, useState } from "react";
import { motion } from "framer-motion";
import Dev from "../../assets/Illustration/3d-nft-icon-developer-male-illustration-min-500px.png";
import HorizontalScroll from "../../Components/Scroll/HorizontalScroll/HorizontalScroll.tsx";
import ScrollProgress from "../../Components/Scroll/ScrollProgress/ScrollProgress.tsx";
import CV from "../../assets/CV/CV LAPOUGE Maxime-1.pdf"
import TiltCard from "../../Components/TiltCard/TiltCard.tsx";
import CustomCursor from "../../Components/Cursor/CustomCursor.tsx";
import ParallaxText from "../../Components/Scroll/ParallaxText/ParallaxText.tsx";


export default function About(): JSX.Element {
    const techs = [
        { name: "React", icon: faReact, color: "#61DBFB" },
        { name: "Docker", icon: faDocker, color: "#2496ED" },
        { name: "GitHub", icon: faGithub, color: "#181717" },
        { name: "JavaScript", icon: faJs, color: "#F7DF1E" },
        { name: "Sass", icon: faSass, color: "#CD6799" },
        { name: "Java", icon: faJava, color: "#007396" },
        { name: "Python", icon: faPython, color: "#306998" },
        { name: "Angular", icon: faAngular, color: "#DD0031" },
    ];
    const interests = [
        {
            title: "Clavier custom",
            content: <p>J'adore modder et créer des claviers mécaniques.</p>,
            icon: faKeyboard,
        },
        {
            title: "Sport automobile",
            content: <p>Je démonte et répare des moteurs.</p>,
            icon: faCar,
        },
        {
            title: "Moto",
            content: <p>Passionné de moto et de balades sur route.</p>,
            icon: faMotorcycle,
        },
        {
            title: "Mode de seconde main",
            content: <p>Fan de thrift shopping et vintage.</p>,
            icon: faShirt,
        },
    ];


    const [selectedTech, setSelectedTech] = useState<string | null>(null);

    return (
        <>
        <CustomCursor/>
        <div className="about-page">
            <ScrollProgress/>
                <ParallaxText
                    topText="Développement Web - React - Node.js - UI/UX"
                    centerText="Bienvenue sur mon portfolio"
                    bottomText="Mobile - Backend - Design - Performance"
                    speed={3000}
                    skewFactor={20}
                    textColor="#E91E63"
                    bgColor="#9300c5"
                />

            <section className="text-zone">
                <div className="first-pres">
                    <p>Passionné d'informatique depuis mon plus jeune âge, je désire en faire mon métier !</p>
                    <img className="illustration" src={Dev} alt="white man who dev"/>
                    <p>Toujours d'une curiosité sans faille, je m'autoforme sur :</p>
                </div>
            </section>
            <HorizontalScroll length={techs.length - 1.5}>

                {techs.map((tech, index) => (
                    <motion.div
                        key={index}
                        className="tech-card"
                        whileHover={{scale: 1.1}}
                        onClick={() => setSelectedTech(tech.name)}
                            style={{'--icon-color' : tech.color} as React.CSSProperties}
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
                <h2>Mais aussi passioné par :</h2>
                <div className="interest-container">
                    {interests.map((interest, index) => (
                        <TiltCard key={index} title={interest.title} content={interest.content}  icon={interest.icon}/>
                    ))}
                </div>

            </section>

            <section className="text-zone cv-section">
                <h2>CV</h2>
                <iframe src={CV} className="CV" frameborder="0"></iframe>
            </section>
        </div>
        </>
    );

}
