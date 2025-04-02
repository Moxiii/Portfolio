import "./Project.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faCheckCircle,
    faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import {Project} from "../Utils/Types/ProjectType.ts";
import SlideInfiniteCarousel from "../Carrousel/SlideInfiniteCarousel/SlideInfiniteCarousel.tsx";

import TypedText from "../Utils/Typed/TypedText.tsx";
import {JSX} from "react";

interface ProjectCardProps {
    project: Project;
    getFormattedUrl?: (url: string) => string;
    getTechIcon?: (techName: string) => any;
}

export default function ProjectDetails({project}: ProjectCardProps): JSX.Element {
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
                        techno: project.technologies.map((tech) => ({
                            name: tech.name,
                            icon: tech.icon,
                        })),
                    }}
                />
            </div>
            <div className="project-desc project">
                {Array.isArray(project.description) && project.description.map((line, index) => (
                    <p key={index}>{line}</p>
                ))}
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
                    <SlideInfiniteCarousel
                        images={project.img}
                    />
                </div>
            )}

            <div className="project-links project">
                <ul>
                    {project.links?.map((link, index) => (

                        <a
                            href={getFormattedUrl(link.url)}
                            target="_blank"
                            rel="noopener noreferrer"
                            key={index}
                        >
                            <li>{link.name}</li>
                        </a>
                    ))}
                </ul>
            </div>
            <div className="project-pres project">
                {project.presentation?.map((item, index) => {
                    if (typeof item === "string") {
                        return <p key={index} className="project-pres-content">{item}</p>;
                    } else if (item.title) {
                        return <h3 key={index} className="project-pres-title">{item.title}</h3>;
                    } else if (item.list) {
                        return (
                            <ul key={index} className="project-pres-list">
                                {item.list.map((listItem, i) => (
                                    <li key={i}>{listItem}</li>
                                ))}
                            </ul>
                        );
                    }
                    return null;
                })}
            </div>


        </div>
    );
}
