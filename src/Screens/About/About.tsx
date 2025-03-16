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
import Dev from "../../assets/Illustration/3d-nft-icon-developer-male-illustration-min-500px.png";
import CV from "../../assets/CV/CV LAPOUGE Maxime-1.pdf"
import { LoremIpsum } from "react-lorem-ipsum";
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
    {title:"Reseaux" , text:"Creation d'un serveur WEB avec Ubuntu Serveur (en cour) ."},
    {title:"Android" , text:"Application Android de gestion en cour \n pour plus de détails voir le projet LYRA ."},
    {title:"LLM" , text:`Auto hebergement de model tel que : \n - Mistral 7b \n - Falcon 7b `},
  ]
const primaryColor : string = "#3a2172";
const secondaryColor : string = "#efe07d";

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
      reason: "Langage fondamental du web, permettant d'ajouter du dynamisme aux sites.",
      project: "Utilisé pour LYRA , HERA et d'autre futur projet.",
      learnings: "Gestion JWT , cache Redis , BDD Mongo et JDBC etc ",
    },
    Python: {
      reason: "Langage fondamental du web, permettant d'ajouter du dynamisme aux sites.",
      project: "Utilisé pour HERA dans la partie scrapping",
      learnings: "Scrapp avec Playwright et asynchronisme ",
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
          topText={["Développement Web", "React", "Node.js", "UI/UX"]}
          centerText="Maxime Lapouge"
          subCenterText="Etudiant en informatique"
          bottomText={["Mobile", "Backend", "Design", "Performance"]}
          textColor="#E91E63"
          bgColor={primaryColor}
          length={3}
        />

        <section className="text-zone" style={{"--background-color":roseMagenta , "--text-color":secondaryColor}as React.CSSProperties}>
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
              onClick={() => handleTechClick(tech.name)}
              style={{ "--icon-color": tech.color } as React.CSSProperties}
            >
              <FontAwesomeIcon icon={tech.icon} className="tech-icon" />
              <h3>{tech.name}</h3>
            </motion.div>
          ))}
        </HorizontalScroll>

        {selectedTech && isTechModalOpen &&(
          <PopUpModal
              isOpen={isTechModalOpen}
              onClose={()=>setIsTechModalOpen(false)}
              onBack={()=>setIsTechModalOpen(false)}
              title={selectedTech}>
              <div>
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
              </div>

          </PopUpModal>
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

        <section className=" cv-section" style={{"--background-color":roseMagenta }as React.CSSProperties} >
          <h2>CV</h2>
          <RenderPDF pdfUrl={CV as string}/>
          <button> Télecharger le cv </button>
        </section>
      </div>
    </>
  );
}
