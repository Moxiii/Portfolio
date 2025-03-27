import {JSX, useState, lazy} from "react";
import("./About.scss")
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

import { motion } from "framer-motion";

import CV from "../../assets/CV/CV LAPOUGE Maxime-1.pdf"

//Lazy
const HorizontalScroll = lazy(()=>import("../../Components/Scroll/HorizontalScroll/HorizontalScroll.tsx"));
const ScrollProgress = lazy(()=>import("../../Components/Scroll/ScrollProgress/ScrollProgress.tsx"));
const TiltCard = lazy(()=>import("../../Components/Cards/TiltCard/TiltCard.tsx"));
const CustomCursor = lazy(()=>import("../../Components/Cursor/CustomCursor.tsx"));
const ParallaxText = lazy(()=>import("../../Components/Scroll/ParallaxText/ParallaxText.tsx"));
const AsideScroll = lazy(()=>import("../../Components/Scroll/AsideScroll/AsideScroll.tsx"));
const RenderPDF = lazy(()=>import("../../Components/Utils/CV/RenderPDF.tsx"))
const PopUpModal = lazy(()=>import("../../Components/Modal/PopUpModal/Modal.tsx"))

export default function About(): JSX.Element {
  const [isTechModalOpen, setIsTechModalOpen] = useState(false);

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
      content: <div className="tilt-card-content">
        <p>Création de clavier Custom : </p>
       <p>Neo 65</p>
          <ul>
            <li>- vertex v1 </li>
            <li>- Keycaps replica night sakura</li>
          </ul>
          <p>NEO ERGO</p>
          <ul><li>- Durock white lotus</li> <li>- Keycap BOW  aliexpress</li></ul>

      </div>,
      icon: faKeyboard,
    },
    {
      title: "Sport automobile",
      content:
          <div className="tilt-card-content">
            <p>Suivis de la scene WRC</p>
          </div>,
      icon: faCar,
    },
    {
      title: "Moto",
      content: <div className="tilt-card-content">
        <p>Passionné de moto et de balades sur route.</p>
        <p>Passage du permis A2 en cours</p>
      </div>,
        icon: faMotorcycle,
        },
        {
      title: "Mode de seconde main",
          content: <div className="tilt-card-content">
            <p>Fan de vetement vintage.</p>
            <p>Utilisation de Vinted et passage en fripperie</p>
            <p>Ce qui a motiver la creation de "Hera" pour faire un outils de recherche pour vetements de 'collection'</p>
      </div>,
        icon: faShirt,
        },
        ];
        const sideSkills=[
    {title:"Reseaux" , text:"Creation d'un serveur WEB avec Ubuntu Serveur (en cour) ."},
    {title:"Android" , text:"Application Android de gestion en cour \n pour plus de détails voir le projet LYRA ."},
    {title:"LLM" , text:`Auto hebergement de model tel que : \n - Mistral 7b \n - Falcon 7b `},
  ]
const primaryColor : string = "#5d1867";
const secondaryColor : string = "#ffc731";

  const techDescriptions: Record<string, { reason: string; project: string; learnings: string }> = {
    React: {
      reason: "J'ai choisi React pour sa flexibilité et la rapidité du développement des interfaces interactives.",
      project: "Utilisé dans mon portfolio et Lyra (projet de gestion de temps).",
      learnings: "J'ai appris la gestion d'état avec Redux et l'optimisation des performances avec React.memo.",
    },
    Docker: {
      reason: "Pour déployer dans le futur mes sites sur mon serveur web locale plus simplement",
      project: "Utilisé pour conteneuriser mes applications HERA et LYRA afin de condenser BACKEND - FRONTEND - SCRAPPING - BDD etc",
      learnings: "J'ai appris à écrire des Dockerfiles et à orchestrer plusieurs services avec Docker Compose.",
    },
    Git: {
      reason: "Indispensable pour la gestion de version et le travail collaboratif.",
      project: "Utilisé dans tous mes projets pour suivre les versions et collaborer avec d'autres développeurs.",
      learnings: "J'ai appris à créer des branches, à résoudre des conflits et à utiliser les Pull Requests.",
    },
    JavaScript: {
      reason: "Pour experimenté le WEBGL et les page dynamique pour ce rapprocher du creative web. \n",
      project: "Utilisé dans mon portfolio et mes projets frontend.",
      learnings: "En cour d'apprentissage de lib frontend comme Three.js , framer motion , gsap , lenis ... ",
    },
    Sass: {
      reason: "Stylisation du css plus simple et plus comprehensible.",
      project: "Utilisé dans mon portfolio et mes projets frontend.",
      learnings: "Constanste , sass:math ,sass:map ...",
    },
    Java: {
      reason: "Langage back robuste",
      project: "Utilisé pour LYRA , HERA et d'autre futur projet.",
      learnings: "Gestion JWT , cache Redis , BDD Mongo et JDBC etc ",
    },
    Python: {
      reason: "Langage de scripting et back end  ",
      project: "Utilisé pour HERA dans la partie scrapping",
      learnings: "Scrapp avec Playwright et asynchronisme  + Django",
    },
    Angular: {
      reason: "Langage fondamental du web, permettant d'ajouter du dynamisme aux sites.",
      project: "Utilisé pour le projet HERA.",
      learnings: "En cour d'apprentissage",
    },
  };
const roseVif : string = "#E91E63";
const roseMagenta:string= "#C2185B";
  const [selectedTech, setSelectedTech] = useState<string | null>(null);
  const handleTechClick = (techName:string)=>{
    setSelectedTech(techName);
    setIsTechModalOpen(true)
  }
  return (
    <>
      <CustomCursor />
      <div className="about-page">
        <ScrollProgress />
        <ParallaxText
          topText={["Développement Web", "React", "Typescript", "UI/UX"]}
          centerText="Maxime LAPOUGE"
          subCenterText="Etudiant en informatique"
          bottomText={["Mobile", "Backend", "Design", "Performance" , "WEBGL"]}
          textColor={secondaryColor}
          bgColor={primaryColor}
          length={3}
        />

        <section className="text-zone" style={{"--background-color":roseMagenta , "--text-color":secondaryColor}as React.CSSProperties}>
          <div className="first-pres">

            <h2>Passioné depuis le plus jeune age</h2>
            <div className="text-container">
              <p>
                A 5 ans la premiere manette de NES dans les mains , 8 ans plus tard je découvre la programmation avec
                python .
              </p>
              <p>Malheureusement en manque d'idée il aura fallu attendre encore quasiment 10 ans pour que je me relance
                dans l'aventure du développement.</p>
            </div>
            <h2>Ce que je souhaite faire dans le futur : </h2>
            <div className="text-container">
              <p>Un de mes objectifs principaux étant de me retrouver dans 5 ans dans les presentation des Awwwards.</p>
              <p>Ou du moins pouvoir experimenté pleinement de creative web / WEBGL</p>
            </div>
            <h2>Comment je compte y parvenir : </h2>
            <div className="text-container">
              <p>En recherchant des experience professionnelles enrichissantes</p>
              <p>En suivant la formation de ThreeJS journey</p>

            </div>
            <h3 className="subPres">Sans oublié de m'autoformer sur :</h3>
          </div>
        </section>
        <HorizontalScroll length={techs.length} background={primaryColor}>
          {techs.map((tech, index) => (
              <motion.div
                  key={index}
                  className="tech-card"
                  whileHover={{scale: 1.1}}
                  onClick={() => handleTechClick(tech.name)}
                  style={{"--icon-color": tech.color} as React.CSSProperties}
              >
                <FontAwesomeIcon icon={tech.icon} className="tech-icon"/>
                <h3>{tech.name}</h3>
              </motion.div>
          ))}
        </HorizontalScroll>

        {selectedTech && isTechModalOpen && (
            <PopUpModal
                isOpen={isTechModalOpen}
                onClose={() => setIsTechModalOpen(false)}
                onBack={() => setIsTechModalOpen(false)}
                title={selectedTech}>
              {techDescriptions[selectedTech] ? (
                    <div className="tech-description">
                      <div className="tech-description-itm">
                        <h3>Pourquoi cette technologie ? </h3>
                        <p>{techDescriptions[selectedTech].reason}</p>
                      </div>
                      <div className="tech-description-itm">
                        <h3>Utilisé dans quel projet ? </h3>
                        <p>{techDescriptions[selectedTech].project}</p>
                      </div>
                      <div className="tech-description-itm">
                        <h3>Ce que j'ai appris : </h3>
                        <p>{techDescriptions[selectedTech].learnings}</p>
                      </div>

                    </div>
                ) : (<p>Aucune description disponible</p>)}

          </PopUpModal>
        )}
        <AsideScroll mainTiltedText="Egalement" tab={sideSkills}/>


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

        <section className=" cv-section" style={{"--background-color":roseMagenta }as React.CSSProperties} >
          <h2>CV</h2>
          <RenderPDF pdfUrl={CV as string}/>
          <a href={CV as string} download="CV Maxime Lapouge" rel="noopener noreferrer">
            <button className="cv-button" > Télecharger le cv </button>  </a>
        </section>
      </div>
    </>
  );
}
