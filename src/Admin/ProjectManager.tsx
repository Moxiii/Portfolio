import { JSX, useEffect, useState } from "react";
import {
  addProject,
  getProjects,
  deleteProject,
  updateProject,
} from "../Database/Init.ts";
import { v4 as uuidv4 } from "uuid";
import { Project } from "../Types/ProjectType.ts";

export default function ProjectManager(): JSX.Element {
  const [projects, setProjects] = useState<Project[]>([]);
  const [newProject, setNewProject] = useState<Partial<Project>>({
    title: "",
    description: "",
    techno: [{ name: "" }],
    ended: false,
    deploy: false,
    links: [{ name: "", url: "" }],
    img: [],
  });
  const [isEditing, setIsEditing] = useState(false); // Pour distinguer ajout / modification

  async function loadProjects() {
    const data: any = await getProjects();
    setProjects(data);
  }

  async function handleDelete(id: string) {
    await deleteProject(id);
    loadProjects();
  }

  async function handleAddProject() {
    // Vérification des champs obligatoires
    if (!newProject.title || !newProject.description) return;

    // Filtrer les tableaux pour ne garder que les valeurs non vides
    const filteredTechno = (newProject.techno || []).filter(
        (tech) => tech.name.trim() !== ""
    );
    const filteredLinks = (newProject.links || []).filter(
        (link) =>
            link.name.trim() !== "" &&
            link.url.trim() !== ""
    );

    // Si on est en mode ajout
    if (!isEditing) {
      const projectToAdd: Project = {
        id: uuidv4(),
        title: newProject.title,
        description: newProject.description,
        presentation: [],
        techno: filteredTechno,
        ended: newProject.ended || false,
        deploy: newProject.deploy || false,
        links: filteredLinks,
        img: newProject.img || [],
      };
      await addProject(projectToAdd);
    } else {
      const projectToUpdate: Project = {
        id: newProject.id!,
        title: newProject.title,
        description: newProject.description,
        presentation: newProject.presentation || [],
        techno: filteredTechno,
        ended: newProject.ended || false,
        deploy: newProject.deploy || false,
        links: filteredLinks,
        img: newProject.img || [],
      };
      await updateProject(newProject.id as any, projectToUpdate);
      setIsEditing(false);
    }
    setNewProject({
      title: "",
      description: "",
      techno: [{ name: "" }],
      ended: false,
      deploy: false,
      links: [{ name: "", url: "" }],
      img: [],
    });
    loadProjects();
  }


  function handleLinkNameChange(
      e: React.ChangeEvent<HTMLInputElement>,
      index: number
  ) {
    const newLinks = [...(newProject.links || [])];
    newLinks[index] = { ...newLinks[index], name: e.target.value };
    if (e.target.value && index === newLinks.length - 1) {
      newLinks.push({ name: "", url: "" });
    }
    setNewProject({ ...newProject, links: newLinks });
  }

  function handleLinkUrlChange(
      e: React.ChangeEvent<HTMLInputElement>,
      index: number
  ) {
    const newLinks = [...(newProject.links || [])];
    newLinks[index] = { ...newLinks[index], url: e.target.value };
    setNewProject({ ...newProject, links: newLinks });
  }

  function handleAddTechno(
      e: React.ChangeEvent<HTMLInputElement>,
      index: number
  ) {
    const newTechno = [...(newProject.techno || [])];
    newTechno[index] = { name: e.target.value };
    if (e.target.value && index === newTechno.length - 1) {
      newTechno.push({ name: "" });
    }
    setNewProject({ ...newProject, techno: newTechno });
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

  function handleEditProject(project: Project) {
    setNewProject(project);
    setIsEditing(true);
  }

  useEffect(() => {
    loadProjects();
  }, []);

  return (
      <div className="project-manager">
        <h2>📌 Mes Projets</h2>
        <div className="project-form">
          <input
              type="text"
              placeholder="Titre"
              value={newProject.title}
              onChange={(e) =>
                  setNewProject({ ...newProject, title: e.target.value })
              }
          />
          <textarea
              placeholder="Description"
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
                </div>
            ))}
          </div>
          <div>
            <h3>Links</h3>
            {newProject.links?.map((link, index) => (
                <div key={index}>
                  <input
                      type="text"
                      placeholder="Link URL"
                      value={link.url}
                      onChange={(e) => handleLinkUrlChange(e, index)}
                  />
                  <input
                      type="text"
                      placeholder="Link name"
                      value={link.name}
                      onChange={(e) => handleLinkNameChange(e, index)}
                  />
                </div>
            ))}
          </div>
          <button onClick={handleAddProject}>
            {isEditing ? "Mettre à jour le projet" : "Ajouter un projet"}
          </button>
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
                <button onClick={() => handleEditProject(project)}>
                  Modifier
                </button>
              </li>
          ))}
        </ul>
      </div>
  );
}
