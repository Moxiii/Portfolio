import "./About.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngular,
  faGit,
  faJs,
  faReact,
  faSass,
  faJava,
  faPython,
  faDocker,
} from "@fortawesome/free-brands-svg-icons";
import {
  faKeyboard,
  faMotorcycle,
  faCar,
  faShirt,
} from "@fortawesome/free-solid-svg-icons";
import {JSX, useState, lazy, useEffect} from "react";
import { motion } from "framer-motion";
import Dev from "../../assets/Illustration/3d-nft-icon-developer-male-illustration-min-500px.png";
import CV from "../../assets/CV/CV LAPOUGE Maxime-1.pdf"
import { LoremIpsum } from "react-lorem-ipsum";
//Lazy
const HorizontalScroll = lazy(()=>import("../../Components/Scroll/HorizontalScroll/HorizontalScroll.tsx"));
const ScrollProgress = lazy(()=>import("../../Components/Scroll/ScrollProgress/ScrollProgress.tsx"));
const TiltCard = lazy(()=>import("../../Components/TiltCard/TiltCard.tsx"));
const CustomCursor = lazy(()=>import("../../Components/Cursor/CustomCursor.tsx"));
const ParallaxText = lazy(()=>import("../../Components/Scroll/ParallaxText/ParallaxText.tsx"));
const AsideScroll = lazy(()=>import("../../Components/Scroll/AsideScroll/AsideScroll.tsx"));
const RenderPDF = lazy(()=>import("../../Components/Utils/CV/RenderPDF.tsx"))
export default function About(): JSX.Element {
  const techs = [
    { name: "React", icon: faReact, color: "#61DBFB" },
    { name: "Docker", icon: faDocker, color: "#2496ED" },
    { name: "Git", icon: faGit, color: "#181717" },
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
  const sideSkills=[
    {title:"Reseaux" , text:"Creation d'un serveur WEB ."},
    {title:"Reseaux" , text:"Creation d'un serveur WEB ."},
    {title:"Reseaux" , text:"Creation d'un serveur WEB ."},
  ]
const primaryColor : string = "#3a2172";
const secondaryColor : string = "#efe07d";
  const [selectedTech, setSelectedTech] = useState<string | null>(null);
  const [cvHtml, setCvHtml] = useState<string>("");
useEffect(()=>{
  fetch("../../assets/CV/CV LAPOUGE MAXIME-1-1.html")
      .then((response) => response.text())
      .then((data) => setCvHtml(data))
      .catch((error) => console.error("Erreur de chargement du CV :", error));
},[])
  return (
    <>
      <CustomCursor />
      <div className="about-page">
        <ScrollProgress />
        <ParallaxText
          topText={["Développement Web", "React", "Node.js", "UI/UX"]}
          centerText="Maxime Lapouge"
          subCenterText="Etudiant en informatique"
          bottomText={["Mobile", "Backend", "Design", "Performance"]}
          textColor="#E91E63"
          bgColor="#9300c5"
          length={3}
        />

        <section className="text-zone" style={{"--background-color":secondaryColor , "--text-color":primaryColor}as React.CSSProperties}>
          <div className="first-pres">
            <LoremIpsum p={1} random={true} />
            <p>
              Passionné d'informatique depuis mon plus jeune âge, je désire en
              faire mon métier !
            </p>
            <img className="illustration" src={Dev} alt="white man who dev" />
            <LoremIpsum p={1} random={true} />
            <p>Toujours d'une curiosité sans faille, je m'autoforme sur :</p>
          </div>
        </section>
        <HorizontalScroll length={techs.length} background={primaryColor}>
          {techs.map((tech, index) => (
            <motion.div
              key={index}
              className="tech-card"
              whileHover={{ scale: 1.1 }}
              onClick={() => setSelectedTech(tech.name)}
              style={{ "--icon-color": tech.color } as React.CSSProperties}
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
        <AsideScroll mainTiltedText="Egalement" background={secondaryColor} tab={sideSkills}/>


        <section className="text-zone">
          <h2>Mais aussi passioné par :</h2>
          <div className="interest-container">
            {interests.map((interest, index) => (
              <TiltCard
                key={index}
                title={interest.title}
                content={interest.content}
                icon={interest.icon}
              />
            ))}
          </div>
        </section>

        <section className=" cv-section">
          <h2>CV</h2>
          <RenderPDF pdfUrl={CV as string}/>
        </section>
      </div>
    </>
  );
}
