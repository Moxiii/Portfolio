import s from "./MobileView.module.scss";
import React, { JSX, useState, useEffect , lazy } from "react";

const ZoomText = lazy(() => import("../Scroll/Zoom/Zoom.tsx"));
const ScrollProgress = lazy( () => import ("../Scroll/ScrollProgress/ScrollProgress.tsx"));
const DragCloseDrawer = lazy(()=>import("../Modal/DragCloseDrawer/DragCloseDrawer.tsx"));
const  SharedLayout = lazy(()=> import("../Utils/SharedLayout/SharedLayout.tsx"));

import { Project } from "../Utils/Types/ProjectType.ts";
import { getProjects } from "../Utils/Database/InitProject.ts";
import links from "../Utils/_const/_links.ts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faServer, faNetworkWired } from "@fortawesome/free-solid-svg-icons";
import { faJs ,faLinkedin , faGithub} from "@fortawesome/free-brands-svg-icons";
import LoremIpsum from "react-lorem-ipsum";




export default function MobileView(): JSX.Element {
  const [projects, setProjects] = useState<Project[]>([]);
  const [dragCloseDrawerOpen , setDragCloseDrawerOpen ] = useState(false);
  const [openedProject , setOpenedProject] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      const data: any = await getProjects();
      setProjects(data);
    };
    fetchProjects();
  }, []);
    function getFormattedUrl(url: string) {
        return url.startsWith("http://") || url.startsWith("https://")
            ? url
            : `https://${url}`;
    }
  return (
      <div className={s.MobileView}>
          <ScrollProgress/>
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
              <LoremIpsum p={1} random={true}/>
              <p> Toujours d'une curiosité sans faille, je m'autoforme sur :</p>
              <div className={s.skillsContainer}>
                  {[
                      {
                          icon: faNetworkWired,
                          title: "Réseaux",
                          description: [
                              "Création d'un serveur WEB en cour",
                              "Git",
                              "CI / CD",
                          ],
                      },
                      {
                          icon: faJs,
                          title: "Frontend",
                          description: ["Angular ", "React", "TypeScript"],
                      },
                      {
                          icon: faServer,
                          title: "Backend",
                          description: ["API REST CRUD", "Java Spring boot ", "Python"],
                      },
                  ].map((skill, index) => (
                      <div
                          key={skill.title}
                          className={`${s.skillRow} ${index % 2 === 0 ? s.left : s.right}`}
                      >
                          <div className={s.skillText}>
                              <h3>{skill.title}</h3>
                              {skill.description.map((line, index) => (
                                  <p key={index}>{line}</p>
                              ))}
                          </div>
                          <div className={s.card}>
                              <div className={s.cardHeader}>
                                  <FontAwesomeIcon icon={skill.icon}/>
                              </div>
                          </div>
                      </div>
                  ))}
              </div>
          </section>
          <section className={s.MobileProject}>
              <h2>Mes réalisations:</h2>
              <SharedLayout projects={projects} setOpen={setDragCloseDrawerOpen} setOpenedProject={setOpenedProject}/>
              {dragCloseDrawerOpen && openedProject && (
                  <DragCloseDrawer isOpen={dragCloseDrawerOpen} setIsOpen={setDragCloseDrawerOpen}>
                      <div className={s.ProjectPresContainer}>
                          {openedProject.presentation.map((item, index) => (
                              <div key={index} className={s.ProjectPres}>
                                  <h2>{item.title}</h2>
                                  <ul>
                                      {item.list.map((listItem, subIndex) => (
                                          <li key={subIndex}>{listItem}</li>
                                      ))}
                                  </ul>
                              </div>
                          ))}
                          <div className={s.ProjectLinksContainer}>
                              {openedProject.links && openedProject.links.map((link, index) => (
                                  <div key={index} className={s.ProjectLink}>
                                      <a href={getFormattedUrl(link.url)}>{link.name}</a>

                                  </div>
                              ))}
                          </div>

                          <div className={s.ProjecImgContainer}>
                              {openedProject.img && openedProject.img.map((img, index) => (
                                  <div key={index} className={s.ProjectImage}>
                                      <img src={img.src} alt=""/>
                                  </div>
                              ))}
                          </div>

                      </div>
                  </DragCloseDrawer>
              )}
          </section>
          <section className={s.MobileContact}>
              <h2>Me contacter : </h2>
              <div className={s.Mobileform}>
                  <div className={s.ContactLinksContainer}>
                      <div className={s.contactItem}>
                          <p>LinkedIn</p>
                          <a href={links.externalLinks.linkedin} className={s.contactLink}>
                              <FontAwesomeIcon icon={faLinkedin}/>
                          </a>
                      </div>

                      <div className={s.contactItem}>
                          <p>Github </p>
                          <a href={links.externalLinks.github} className={s.contactLink}>
                              <FontAwesomeIcon icon={faGithub}/>
                          </a>
                      </div>
                  </div>

              </div>
          </section>
      </div>
  )
      ;
}
