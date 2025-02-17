import { JSX, useEffect, useState } from "react";
import { getProjects } from "../../Database/Init";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder } from "@fortawesome/free-solid-svg-icons";
import "./Home.scss";
export default function Home(): JSX.Element {
  const [projects, setProjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalProject, setModalProject] = useState(null);
  const handleProjectClick = (project) => {
    setModalProject(project);
    setIsModalOpen(true); //
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); //
    setModalProject(null); //
  };
  useEffect(() => {
    const fetchProjects = async () => {
      const data: any = await getProjects();
      setProjects(data);
    };
    fetchProjects();
  });
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
    </div>
  );
}
