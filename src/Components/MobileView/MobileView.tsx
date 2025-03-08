import s from "./MobileView.module.scss";
import { JSX, useState, useEffect } from "react";
import ZoomText from "../Scroll/Zoom/Zoom.tsx";
import ScrollProgress from "../Scroll/ScrollProgress/ScrollProgress.tsx";
import Dev from "../../assets/Illustration/3d-nft-icon-developer-male-illustration-min-500px.png";
import SharedLayout from "../Utils/SharedLayout/SharedLayout.tsx";
import { Project } from "../Utils/Types/ProjectType.ts";
import { getProjects } from "../Utils/Database/InitProject.ts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faServer, faNetworkWired } from "@fortawesome/free-solid-svg-icons";
import { faJs } from "@fortawesome/free-brands-svg-icons";
import { motion } from "framer-motion";
export default function MobileView(): JSX.Element {
  const [projects, setProjects] = useState<Project[]>([]);
  useEffect(() => {
    const fetchProjects = async () => {
      const data: any = await getProjects();
      setProjects(data);
    };
    fetchProjects();
  }, []);
  return (
    <div className={s.MobileView}>
      <ScrollProgress />
      <ZoomText
        title1={"Portfolio"}
        title2={"Maxime Lapouge"}
        text={`Étudiant\nDéveloppeur\nIPI ${new Date().getFullYear()}`}
      />
      <section className={s.MobilePresentation}>
        <h2>A propos de moi </h2>
        <p>
          Passionné d'informatique depuis mon plus jeune âge, je désire en faire
          mon métier !
        </p>
        <img src={Dev} alt="Développeur" className={s.illustration} />
        <p> Toujours d'une curiosité sans faille, je m'autoforme sur :</p>
        <div className={s.skillsContainer}>
          {[
            {
              icon: faNetworkWired,
              title: "Réseaux",
              description:
                "Configuration et gestion des réseaux informatiques.",
            },
            {
              icon: faJs,
              title: "Frontend",
              description: "Développement d'interfaces modernes et dynamiques.",
            },
            {
              icon: faServer,
              title: "Backend",
              description: "Création et gestion d'APIs performantes.",
            },
          ].map((skill, index) => (
            <div
              key={skill.title}
              className={`${s.skillRow} ${index % 2 === 0 ? s.left : s.right}`}
            >
              <div className={s.skillText}>
                <h3>{skill.title}</h3>
                <p>{skill.description}</p>
              </div>
              <div className={s.card}>
                <div className={s.cardHeader}>
                  <FontAwesomeIcon icon={skill.icon} />
                </div>
                <div className={s.cardContent}>{skill.title}</div>
                <motion.div className={s.underline} />
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className={s.MobileProject}>
        <h2>Mes réalisations:</h2>
        <SharedLayout projects={projects} />
      </section>
      <section className={s.MobileContact}>
        <h2>Me contacter : </h2>
      </section>
    </div>
  );
}
