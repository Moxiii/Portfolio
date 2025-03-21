import "./Project.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { Project } from "../Utils/Types/ProjectType.ts";
import ImgCarrousel from "../Carrousel/FramerImgCarrousel/ImgCarrousel.tsx";

import TypedText from "../Utils/Typed/TypedText.tsx";
import {JSX} from "react";
interface ProjectCardProps {
  project: Project;
  getFormattedUrl?: (url: string) => string;
  getTechIcon?: (techName: string) => any;
}

export default function ProjectDetails({ project }: ProjectCardProps) :JSX.Element {
  function getFormattedUrl(url: string) {
    return url.startsWith("http://") || url.startsWith("https://")
      ? url
      : `https://${url}`;
  }

  return (
    <div className="project-detail">
      <div className="project-tech project">
        <TypedText
          mainTitle="Développé en "
          project={{
            techno: project.techno.map((tech) => ({
              name: tech.name,
              icon: tech.icon,
            })),
          }}
        />
      </div>
      <div className="project-desc project">
        <p>{project.description}</p>
      </div>

      {project && (
        <div className="project-status project">
          <div className="status-item">
            <span>Fini : </span>
            <FontAwesomeIcon
              icon={project.ended ? faCheckCircle : faTimesCircle}
              style={{
                color: project.ended ? "#1ee11e" : "red",
                marginLeft: "5px",
              }}
            />
          </div>
          <div className="status-item project">
            <span>Deployer : </span>
            <FontAwesomeIcon
              icon={project.deploy ? faCheckCircle : faTimesCircle}
              style={{
                color: project.deploy ? "#1ee11e" : "red",
                marginLeft: "5px",
              }}
            />
          </div>
        </div>
      )}
      {project?.img && (
        <div className="project-img project">
          <ImgCarrousel
            images={project.img.map((img: any) => ({
              src: img.src,
              description: img.description || "",
            }))}
          />
        </div>
      )}

      <div className="project-links project">
        <ul>
          {project.links?.map((link, index) => (
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
      <div className="project-pres project">
        <ul>
          {project.presentation?.map((pres, index) => (
            <div key={index} className="project-pres-content">
              <h3 className="project-pres-title">{pres.title}</h3>
              <ul className="project-pres-desc">
                {pres.list?.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </ul>
      </div>
        <div className="project">
            <p>lorem</p><p>lorem</p><p>lorem</p><p>lorem</p><p>lorem</p><p>lorem</p><p>lorem</p><p>lorem</p><p>lorem</p>
            <p>lorem</p>
        </div>

    </div>
  );
}
