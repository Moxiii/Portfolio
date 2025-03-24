import {Project} from "../Utils/Types/ProjectType.ts";

export async function getProjects(): Promise<Project[]> {
  try{
    const response = await fetch("/json/projects.json");
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
    const data:Project[] = await response.json();
    return data;
  }catch(error){
    console.error("Erreur lors de la récupération des projets :", error);
    return [];
  }
  }


