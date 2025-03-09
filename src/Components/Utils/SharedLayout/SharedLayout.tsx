import s from "./SharedLayout.module.scss";
import { useState, useEffect, useRef } from "react";
import { Project } from "../../Utils/Types/ProjectType.ts";
import TypedText from "../Typed/TypedText.tsx";
interface ProjectsProps {
  projects: Project[];
}
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { AnimatePresence, motion } from "framer-motion";
export default function SharedLayout({ projects }: ProjectsProps) {
  const [selectedTab, setSelectedTab] = useState<Project | null>(projects[0]);
  return (
    <div className={s.SharedLayoutContainer}>
      <nav className={s.SharedLayoutNav}>
        <ul className={s.tabsContainer}>
          {projects.map((item) => (
            <motion.li
              key={item.id}
              onClick={() => setSelectedTab(item)}
              className={s.tabs}
            >
              <motion.div
                className={s.tabButton}
                animate={{
                  color: selectedTab?.id === item.id ? "#efe07d" : "#3a2172",
                  backgroundColor:
                    selectedTab?.id === item.id ? "#3a2172" : "#efe07d",
                }}
              >
                {item.title}
                {selectedTab?.id === item.id ? (
                  <motion.div className={s.underline} layoutId="underline" />
                ) : null}
              </motion.div>
            </motion.li>
          ))}
        </ul>
      </nav>
      <main className={s.SharedLayoutMain}>
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedTab ? selectedTab.title : "empty"}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={s.content}
          >
            <TypedText
              mainTitle="Développé en : "
              project={{
                techno:
                  selectedTab?.techno.map((tech) => ({
                    name: tech.name,
                    icon: tech.icon,
                  })) || [],
              }}
            />
            <motion.div className={s.status}>
              <div className={s.statusItm}>
                <span>Fini : </span>
                <FontAwesomeIcon
                  icon={selectedTab?.ended ? faCheckCircle : faTimesCircle}
                  style={{
                    color: selectedTab?.ended ? "#1ee11e" : "red",
                    marginLeft: "5px",
                  }}
                />
              </div>
              <div className={s.statusItm}>
                <span>Deployé : </span>
                <FontAwesomeIcon
                  icon={selectedTab?.deploy ? faCheckCircle : faTimesCircle}
                  style={{
                    color: selectedTab?.deploy ? "#1ee11e" : "red",
                    marginLeft: "5px",
                  }}
                />
              </div>
            </motion.div>
            <motion.div className={s.ProjectDescription}>
              {selectedTab?.description}
            </motion.div>

            <motion.div className={s.button}>En savoir plus</motion.div>
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
