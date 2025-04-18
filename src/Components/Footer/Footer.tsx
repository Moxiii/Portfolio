import s from "./Footer.module.scss"
import {JSX} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLinkedin , faGithub} from "@fortawesome/free-brands-svg-icons";
import {motion} from "framer-motion";
import links from "../Utils/_const/_links.ts"
export default function Footer():JSX.Element{

    return (
        <footer className={s.footerContainer}>
            <div className={s.footerItems}>
                <motion.a
                    href={links.externalLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{scale: 1.2}}
                    whileTap={{scale: 0.9}}
                    className={s.footerIcon}
                >
                    <FontAwesomeIcon icon={faLinkedin}/>
                </motion.a>
                <div className={s.legalMention}>
                    <p>© {new Date().getFullYear()} Lapouge Maxime. Tous droits réservés.</p>
                </div>
                <motion.a
                    href={links.externalLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{scale: 1.2}}
                    whileTap={{scale: 0.9}}
                    className={s.footerIcon}
                >
                    <FontAwesomeIcon icon={faGithub}/>
                </motion.a>
            </div>
        </footer>
    )
}