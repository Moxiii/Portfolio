import { JSX, useEffect, useState } from "react";
import { getProjects } from "../../Database/Init";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder } from "@fortawesome/free-solid-svg-icons";
import { Project } from "../../Types/ProjectType";
import "./Home.scss";
export default function Home(): JSX.Element {
  const [projects, setProjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const handleProjectClick = (project: Project) => {
    setCurrentProject(project);
    console.log("project clicked: " + project.title);
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
      {projects.map((project) => (
        <div
          key={project.id}
          className="project-folder"
          onClick={() => handleProjectClick(project)}
        >
          <div className="folder">
            <FontAwesomeIcon icon={faFolder} className="folder-icon" />
            <span className="folder-name">{project.title}</span>
          </div>
        </div>
      ))}
      {isModalOpen && currentProject && (
        <div className="project-modal">
          <div className="modal-content">
            <button className="close-btn" onClick={handleCloseModal}>
              X
            </button>
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
        </div>
      )}
    </div>
  );
}
