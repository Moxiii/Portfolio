import { JSX, useEffect, useState , lazy} from "react";
import { getProjects } from "../../Components/Utils/Database/initProject.ts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder } from "@fortawesome/free-solid-svg-icons";
import { Project } from "../../Components/Utils/Types/ProjectType.ts";
import "./Home.scss";
import links from "../../Components/Utils/_const/_links.ts";
const Modal = lazy(() => import("../../Components/Modal/PopUpModal/Modal.tsx"));
const ProjectDetails = lazy(() => import("../../Components/Project/Project.tsx"));

export default function Home(): JSX.Element {
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [isProjectsModalOpen, setIsProjectsModalOpen] = useState(false);
  const [isProjectDetailModalOpen, setIsProjectDetailModalOpen] =
    useState(false);

  const handleOpenProjectsModal = () => {
    setIsProjectsModalOpen(true);
  };
  const handleCloseProjectsModal = () => {
    setIsProjectsModalOpen(false);
  };

  const handleProjectClick = (project: Project) => {
    setCurrentProject(project);
    setIsProjectsModalOpen(false);
    setIsProjectDetailModalOpen(true);
  };

  const handleCloseProjectDetailModal = () => {
    setIsProjectDetailModalOpen(false);
    setCurrentProject(null);
    setIsProjectsModalOpen(true);
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
          <h1 className="quote">Portfolio Maxime Lapouge</h1>
          <p className="sub-text">
            <a href={links.about}>
              <span className="rosy">Étudiant développeur web</span>
            </a>
          </p>
        </blockquote>
      </div>
      <div className="project-folder main-folder">
        <div className="folder" onClick={handleOpenProjectsModal}>
          <FontAwesomeIcon icon={faFolder} className="folder-icon" />
          <span className="folder-name">Projects</span>
        </div>
      </div>
      <Modal
        isOpen={isProjectsModalOpen}
        onClose={() => setIsProjectsModalOpen(false)}
        title="Liste des projets"
        onBack={() => {
          handleCloseProjectsModal();
        }}
      >
        <div className="project-list">
          {projects.map((project) => (
            <div
              key={project.id}
              className="project-folder"
              onClick={() => {
                handleProjectClick(project);
              }}
            >
              <div className="folder">
                <FontAwesomeIcon icon={faFolder} className="folder-icon" />
                <span className="folder-name">{project.title}</span>
              </div>
            </div>
          ))}
        </div>
      </Modal>
      <Modal
        isOpen={isProjectDetailModalOpen}
        onClose={() => setIsProjectDetailModalOpen(false)}
        onBack={() => {
          handleCloseProjectDetailModal();
        }}
        title={currentProject?.title}
      >
        {currentProject && <ProjectDetails project={currentProject} />}
      </Modal>
    </div>
  );
}
