import {JSX, useEffect, useRef, useState} from "react";
import "./Project.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import {Typed} from "react-typed";
import { Project } from "../../Types/ProjectType";
import {faAngular, faJava, faJs, faPython, faReact, faSass} from "@fortawesome/free-brands-svg-icons";
interface ProjectCardProps{
    project: Project;
    getFormattedUrl : ( url:string ) => string;
    getTechIcon : ( techName:string ) => any;
    
}
const iconMap: { [key: string]: any } = {
    react: faReact,
    "react native": faReact,
    java: faJava,
    python: faPython,
    javascript: faJs,
    sass: faSass,
    angular: faAngular,
};

export default function ProjectDetails({project  }:ProjectCardProps){
    const typedElement = useRef<HTMLSpanElement>(null);
    const typedInstance = useRef<any>(null);
    const [currentIcon, setCurrentIcon] = useState<any>(null);

    function getTechIcon(techName: string) {
        const normalized = techName.toLowerCase().trim();
        return iconMap[normalized] || null;
    }
    function getFormattedUrl(url: string) {
        return url.startsWith("http://") || url.startsWith("https://")
            ? url
            : `https://${url}`;
    }
    useEffect(() => {
        if (project && typedElement.current) {
            const techNames = project.techno.map((tech) => tech.name);
            const options = {
                strings: techNames,
                typeSpeed: 75,
                backSpeed: 100,
                loop: true,
                backDelay: 200,
                preStringTyped: (index: number) => {
                    const tech = project.techno[index % techNames.length];
                    setCurrentIcon(getTechIcon(tech?.name));
                },
            };
            typedInstance.current = new Typed(typedElement.current, options);
            return () => {
                typedInstance.current.destroy();
            };
        }
    }, [project]);
    return (
        <div className="project-detail">
            <p>{project.description}</p>
            <div>
                <p>
                    Développé en : <span ref={typedElement} style={{fontWeight: "bold"}}></span>
                    {currentIcon && (
                        <FontAwesomeIcon
                            icon={currentIcon}
                            style={{marginRight: "5px", fontSize: "150%"}}
                        />
                    )}

                </p>
            </div>
            {project && (
                <div className="project-status">
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
                    <div className="status-item">
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
            <div>
                <h3>Links:</h3>
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
        </div>
    )
}