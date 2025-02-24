import { JSX, useEffect, useState, useRef } from "react";
import { getProjects } from "../../Database/Init";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Project } from "../../Types/ProjectType";
import "./Home.scss";
import { motion } from "framer-motion";
export default function Home(): JSX.Element {
  const [projects, setProjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const constraintsRef = useRef<HTMLDivElement>(null);
  const handleOpenProjects = () => {
    setIsModalOpen(true);
    setCurrentProject(null);
  };
  const handleProjectClick = (project: Project) => {
    setCurrentProject(project);
    setIsModalOpen(true);
  };

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
            <div className="modal-content">
              <button className="close-btn" onClick={handleCloseModal}>
                X
              </button>
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
                  <div
                    className="return-btn"
                    onClick={() => setCurrentProject(null)}
                  >
                    <FontAwesomeIcon
                      icon={faArrowLeft}
                      className="arrow-back"
                    />
                  </div>
                  <h2>{currentProject.title}</h2>
                  <p>{currentProject.description}</p>
                  <div>
                    <h3>Technologies: </h3>
                    <ul>
                      {currentProject.techno?.map((tech, index) => (
                        <li key={index}>{tech.name}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3>Links:</h3>
                    <ul>
                      {currentProject.links?.map((link, index) => (
                        <a href={link.url}>
                          <li key={index}>{link.name}</li>
                        </a>
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
