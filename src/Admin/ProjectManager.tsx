import { JSX, useEffect, useState } from "react";
import {
  addProject,
  getProjects,
  deleteProject,
  updateProject,
} from "../Database/InitProject.ts";
import { v4 as uuidv4 } from "uuid";
import { Project } from "../Types/ProjectType.ts";
import ImgCarrousel from "../Components/Carrousel/FramerImgCarrousel/ImgCarrousel.tsx";
export default function ProjectManager(): JSX.Element {
  const [projects, setProjects] = useState<Project[]>([]);
  const [newProject, setNewProject] = useState<Partial<Project>>({
    title: "",
    description: "",
    presentation: [{ title: "", list: [] }],
    techno: [{ name: "" }],
    ended: false,
    deploy: false,
    links: [{ name: "", url: "" }],
    img: [],
  });
  const [isEditing, setIsEditing] = useState(false);

  async function loadProjects() {
    const data: any = await getProjects();
    setProjects(data);
  }

  async function handleDelete(id: string) {
    await deleteProject(id);
    loadProjects();
  }


  async function handleSaveProject() {

    if (!newProject.title || !newProject.description) return;

    const filteredTechno = (newProject.techno || []).filter(
        (tech) => tech.name.trim() !== ""
    );
    const filteredLinks = (newProject.links || []).filter(
        (link) =>
            link.name.trim() !== "" &&
            link.url.trim() !== ""
    );
    const filteredPresentation = (newProject.presentation || []).filter((item)=>item !== "");
    const projectData: {
      presentation: (string | { title: string; list: string[] })[];
      img: { src: string }[];
      techno: { name: string }[];
      ended: boolean;
      description: string;
      links: { name: string; url: string }[];
      id: string | Uint8Array<ArrayBufferLike>;
      title: string;
      deploy: boolean
    } = {
      id: isEditing ? newProject.id! : uuidv4(),
      title: newProject.title,
      description: newProject.description,
      presentation: filteredPresentation,
      techno: filteredTechno,
      ended: newProject.ended || false,
      deploy: newProject.deploy || false,
      links: filteredLinks,
      img: newProject.img || [],
    };

    if (isEditing) {

      await updateProject(newProject.id! , projectData);
      setIsEditing(false)
    } else {
      await addProject(projectData)
    }
    setNewProject({
      title: "",
      description: "",
      presentation:[{title:"" , list:[]}],
      techno: [{ name: "" }],
      ended: false,
      deploy: false,
      links: [{ name: "", url: "" }],
      img: [{src:""}],
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
  function handleInputChange(field: keyof Project, value: boolean) {
    setNewProject({ ...newProject, [field]: value });
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
  function handlePresentationTitleChange(
      e: React.ChangeEvent<HTMLInputElement>,
      index: number
  ) {
    const newPresentation = [...(newProject.presentation || [])];
    newPresentation[index] = {
      ...newPresentation[index],
      title: e.target.value
    };
    if (e.target.value && index === newPresentation.length - 1) {
      newPresentation.push({ title: "", list: [] });
    }

    setNewProject({ ...newProject, presentation: newPresentation });
  }
  function handlePresentationListChange(
      e: React.ChangeEvent<HTMLTextAreaElement>,
      index: number
  ) {
    const newPresentation = [...(newProject.presentation || [])];
    newPresentation[index] = {
      ...newPresentation[index],
      list: e.target.value.split("\n")
    };

    setNewProject({ ...newProject, presentation: newPresentation });
  }
  function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      const newImages = filesArray.map((file) => ({
        src: URL.createObjectURL(file),
        description : file.name,
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
          <div>

            <div>
              <h3>Présentation</h3>
              {newProject.presentation?.map((presentation, index) => (
                  <div key={index}>
                    <input
                        type="text"
                        placeholder="Titre"
                        value={typeof presentation === "string" ? presentation : presentation?.title || ""}
                        onChange={(e) => handlePresentationTitleChange(e , index)}
                    />

                    <textarea
                        placeholder="Détails (séparez les points par des retours à la ligne)"
                        value={typeof presentation === "string" ? presentation : presentation?.list?.join("\n") || ""}
                        onChange={(e) =>
                            handlePresentationListChange(e , index)
                        }
                    />
                  </div>
              ))}
            </div>

            <h3>Technologies</h3>
            {newProject.techno?.map((techno, index) => (
                <div key={index}>
                  <input
                      type="text"
                      placeholder="Technology name"
                      value={techno.name}
                      onChange={(e) =>  handleAddTechno(e, index)}
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
          <div>
            <label>
              <input
                  type="checkbox"
                  checked={newProject.ended}
                  onChange={(e) => handleInputChange("ended", e.target.checked)}
              />
              Projet terminé
            </label>
            <label>
              <input
                  type="checkbox"
                  checked={newProject.deploy}
                  onChange={(e) => handleInputChange("deploy", e.target.checked)}
              />
              Projet déployé
            </label>
          </div>
          <input type="file" multiple onChange={handleImageUpload}/>
          <button onClick={handleSaveProject}>
            {isEditing ? "Mettre à jour le projet" : "Ajouter un projet"}
          </button>
        </div>
        <ul className="project-list">
          {projects.map((project) => (
              <li key={project.id} className="project-item">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                {project.img && project.img.length > 0 && (
                  <ImgCarrousel images={project.img.map((img:any)=>({
                      src:img.src,
                      description:img.description || ""
                    }))}/>
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
