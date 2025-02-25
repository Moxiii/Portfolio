import { JSX, useEffect, useState, useRef } from "react";
import { getProjects } from "../../Database/Init";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder, faArrowLeft, faCheckCircle, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { faJava, faReact, faPython, faJs, faSass, faAngular } from '@fortawesome/free-brands-svg-icons';
import { Project } from "../../Types/ProjectType";
import "./Home.scss";
import { motion } from "framer-motion";
import { Typed } from "react-typed";

const iconMap: { [key: string]: any } = {
  react: faReact,
  "react native": faReact,
  java: faJava,
  python: faPython,
  javascript: faJs,
  sass: faSass,
  angular: faAngular,
};

export default function Home(): JSX.Element {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const constraintsRef = useRef<HTMLDivElement>(null);
  const typedElement = useRef<HTMLSpanElement>(null);
  const typedInstance = useRef<any>(null);
  const [currentIcon, setCurrentIcon] = useState<any>(null);

  const handleOpenProjects = () => {
    setIsModalOpen(true);
    setCurrentProject(null);
  };

  const handleProjectClick = (project: Project) => {
    setCurrentProject(project);
    setIsModalOpen(true);
  };

  function getFormattedUrl(url: string) {
    return url.startsWith("http://") || url.startsWith("https://")
        ? url
        : `https://${url}`;
  }

  function getTechIcon(techName: string) {
    const normalized = techName.toLowerCase().trim();
    return iconMap[normalized] || null;
  }

  function capitalize(word: string) {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentProject(null);
  };

  useEffect(() => {
    const fetchProjects = async () => {
      const data: any = await getProjects();
      setProjects(data);
    };
    fetchProjects();
  }, []);

  useEffect(() => {
    if (currentProject && typedElement.current) {
      const techNames = currentProject.techno.map((tech) => tech.name);
      const options = {
        strings: techNames,
        typeSpeed: 75,
        backSpeed: 100,
        loop: true,
        backDelay: 200,
        preStringTyped: (index: number) => {
          const tech = currentProject.techno[index % techNames.length];
          setCurrentIcon(getTechIcon(tech?.name));
        },
      };
      typedInstance.current = new Typed(typedElement.current, options);
      return () => {
        typedInstance.current.destroy();
      };
    }
  }, [currentProject]);

  return (
      <div className="landing-container">
        <div className="quote-box">
          <blockquote className="quote-text">
            <h1 className="quote">Simple Portefolio</h1>
            <p className="author">
              <small>
                By <span className="rosy">moxi</span>
              </small>
            </p>
          </blockquote>
        </div>
        <div className="project-folder">
          <div className="folder" onClick={handleOpenProjects}>
            <FontAwesomeIcon icon={faFolder} className="folder-icon" />
            <span className="folder-name">Projects</span>
          </div>
        </div>
        {isModalOpen && (
            <motion.div ref={constraintsRef}>
              <motion.div
                  drag
                  dragConstraints={constraintsRef}
                  dragElastic={0.1}
                  className="project-modal"
              >
                <div className="modal-header">
                  {currentProject !== null && (
                      <button
                          className="return-btn"
                          onClick={() => setCurrentProject(null)}
                      >
                        <FontAwesomeIcon icon={faArrowLeft} className="arrow-back" />
                      </button>
                  )}
                  <h2>{currentProject?.title}</h2>
                  <button className="close-btn" onClick={handleCloseModal}>
                    X
                  </button>
                </div>
                <div className="modal-content">
                  {currentProject === null ? (
                      <div className="project-list">
                        <h2>Liste des projets</h2>
                        {projects.map((project) => (
                            <div
                                key={project.id}
                                className="project-folder"
                                onClick={() => handleProjectClick(project)}
                            >
                              <div className="folder">
                                <FontAwesomeIcon
                                    icon={faFolder}
                                    className="folder-icon"
                                />
                                <span className="folder-name">{project.title}</span>
                              </div>
                            </div>
                        ))}
                      </div>
                  ) : (
                      <div className="project-detail">
                        <p>{currentProject.description}</p>
                        <div>
                          <p>
                            Développé en : <span ref={typedElement} style={{fontWeight: "bold"}}></span>
                            {currentIcon && (
                                <FontAwesomeIcon
                                    icon={currentIcon}
                                    style={{marginRight: "5px", fontSize: "150%"}}
                                />
                            )}

                          </p>
                        </div>
                        {currentProject && (
                            <div className="project-status">
                              <div className="status-item">
                                <span>Fini : </span>
                                <FontAwesomeIcon
                                    icon={currentProject.ended ? faCheckCircle : faTimesCircle}
                                    style={{
                                      color: currentProject.ended ? "#1ee11e" : "red",
                                      marginLeft: "5px",
                                    }}
                                />
                              </div>
                              <div className="status-item">
                                <span>Deployer : </span>
                                <FontAwesomeIcon
                                    icon={currentProject.deploy ? faCheckCircle : faTimesCircle}
                                    style={{
                                      color: currentProject.deploy ? "#1ee11e" : "red",
                                      marginLeft: "5px",
                                    }}
                                />
                              </div>
                            </div>
                        )}
                        <div>
                          <h3>Links:</h3>
                          <ul>
                            {currentProject.links?.map((link, index) => (
                                <div key={index}>
                                  <a
                                      href={getFormattedUrl(link.url)}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                  >
                                    <li>{link.name}</li>
                                  </a>
                                </div>
                            ))}
                          </ul>
                        </div>
                      </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
        )}
      </div>
  );
}
