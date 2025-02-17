import { JSX, useEffect, useState } from "react";
import {
  addProject,
  getProjects,
  deleteProject,
  updateProject,
} from "../Database/Init.ts";
import { v4 as uuidv4 } from "uuid";
interface Project {
  id: string;
  title: string;
  description: string;
  presentation: (string | { titre: string } | { liste: string[] })[];
  techno: { name: string; icon: string }[];
  ended: boolean;
  deploy: boolean;
  links: { name: string; url: string }[];
  img: {
    isMock: boolean;
    src: string;
  }[];
}
export default function ProjectManager(): JSX.Element {
  const [projects, setProjects] = useState<Project[]>([]);
  const [newProject, setNewProject] = useState<Partial<Project>>({
    title: "",
    description: "",
    techno: [{ name: "", icon: "" }],
    ended: false,
    deploy: false,
    links: [{ name: "", url: "" }],
    img: [],
  });

  async function loadProjects() {
    const data: any = await getProjects();
    setProjects(data);
  }
  async function handleDelete(id: string) {
    await deleteProject(id);
    loadProjects();
  }
  async function handleAddProject() {
    if (!newProject.title || !newProject.description) return;

    const projectToAdd: Project = {
      id: uuidv4(),
      title: newProject.title,
      description: newProject.description,
      presentation: [],
      techno: newProject.techno || [],
      ended: newProject.ended || false,
      deploy: newProject.deploy || false,
      links: newProject.links || [],
      img: newProject.img || [],
    };
    await addProject(projectToAdd);
    setNewProject({
      title: "",
      description: "",
      techno: [],
      ended: false,
      deploy: false,
      links: [],
      img: [],
    });
    loadProjects();
  }
  async function handleUpdateProject(
    id: number,
    updatedData: Partial<{ title: string; description: string; image: string }>
  ) {
    await updateProject(id, updatedData);
    loadProjects();
  }
  function handleAddTechno(
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) {
    const newTechno = [...(newProject.techno || [])];
    newTechno[index] = { name: e.target.value, icon: "" };
    if (e.target.value && index === newTechno.length - 1) {
      newTechno.push({ name: "", icon: "" });
    }
    setNewProject({ ...newProject, techno: newTechno });
  }
  function handleAddLinks(
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) {
    const newLinks = [...(newProject.links || [])];
    newLinks[index] = { name: e.target.value, url: "" };
    if (e.target.value && index === newLinks.length - 1) {
      newLinks.push({ name: "", url: "" });
    }
    setNewProject({ ...newProject, links: newLinks });
  }
  function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      const newImages = filesArray.map((file) => ({
        isMock: false,
        src: URL.createObjectURL(file),
      }));
      setNewProject({
        ...newProject,
        img: [...(newProject.img || []), ...newImages],
      });
    }
  }
  useEffect(() => {
    loadProjects();
  }, []);
  return (
    <>
      <div className="project-manager">
        <h2>📌 Mes Projets</h2>
        <div className="project-form">
          <input
            type="text"
            placeholder={"Titre"}
            value={newProject.title}
            onChange={(e) =>
              setNewProject({ ...newProject, title: e.target.value })
            }
          />
          <textarea
            placeholder={"Description"}
            value={newProject.description}
            onChange={(e) =>
              setNewProject({ ...newProject, description: e.target.value })
            }
          />
          <input type="file" multiple onChange={handleImageUpload} />
          <div>
            <h3>Technologies</h3>
            {newProject.techno?.map((techno, index) => (
              <div key={index}>
                <input
                  type="text"
                  placeholder="Technology name"
                  value={techno.name}
                  onChange={(e) => handleAddTechno(e, index)}
                />
                <input
                  type="text"
                  placeholder="Technology icon"
                  value={techno.icon}
                  onChange={(e) => handleAddTechno(e, index)}
                />
              </div>
            ))}
          </div>
          <div>
            <h3>Links</h3>
            {newProject.links?.map((link, index) => (
              <div key={index}>
                <input
                  type="text"
                  placeholder="Link url"
                  value={link.url}
                  onChange={(e) => handleAddLinks(e, index)}
                />
                <input
                  type="text"
                  placeholder="Link name"
                  value={link.name}
                  onChange={(e) => handleAddLinks(e, index)}
                />
              </div>
            ))}
          </div>
          <button onClick={handleAddProject}>Ajouter un projet</button>
        </div>
        <ul className="project-list">
          {projects.map((project) => (
            <li key={project.id} className="project-item">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              {project.img && project.img.length > 0 && (
                <img src={project.img[0].src} alt={project.title} />
              )}
              <button onClick={() => handleDelete(project.id)}>
                Supprimer
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
