import s from "./SharedLayout.module.scss";
import { useState, useEffect } from "react";
import { Project } from "../../Utils/Types/ProjectType.ts";
interface ProjectsProps {
  projects: Project[];
}
import { AnimatePresence, motion } from "framer-motion";
export default function SharedLayout({ projects }: ProjectsProps) {
  const [selectedTab, setSelectedTab] = useState<Project | null>(null);

  useEffect(() => {
    if (projects.length > 0) {
      setSelectedTab(projects[0]);
      document.documentElement.style.setProperty(
        "--project-length",
        projects.length.toString()
      );
    }
  }, [projects]);

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
            {selectedTab?.description}
            <motion.div className={s.button}>En savoir plus</motion.div>
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
