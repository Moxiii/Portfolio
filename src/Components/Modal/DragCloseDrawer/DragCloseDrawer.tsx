import s from "./DragCloseDrawer.module.scss";
import {
  motion,
  useDragControls,
  useMotionValue,
  useAnimate,
} from "framer-motion";
import React, { useRef } from "react";
import { useMeasure } from "react-use";
interface ModalPopUpProps {
  isOpen: boolean;
  children: React.JSX.Element;
  setIsOpen: boolean;
}
export default function DragCloseDrawer({
  isOpen,
  setIsOpen,
  children,
}: ModalPopUpProps) {
  const [scope, animate] = useAnimate();
  const [drawerRef, { height }] = useMeasure();
  const y = useMotionValue(0);
  const controls = useDragControls();
  const handleClose = async () => {
    animate(scope.current, {
      opacity: [1, 0],
    });
    const yStart = typeof y.get() === "number" ? y.get() : 0;
    await animate("#drawer", {
      y: [yStart, height],
    });
    setIsOpen(false);
  };

  return (

      <>

        {isOpen && (

            <motion.div

                ref={scope}

                initial={{ opacity: 0 }}

                animate={{ opacity: 1 }}

                onClick={handleClose}

                className={s.DragCloseDrawerContainer}

            >

              <motion.div

                  id="drawer"

                  ref={drawerRef}

                  onClick={(e) => e.stopPropagation()}

                  initial={{ y: "100%" }}

                  animate={{ y: "0%" }}

                  transition={{

                    ease: "easeInOut",

                  }}

                  className={s.DragCloseDrawerControls}

                  style={{ y }}

                  drag="y"

                  dragControls={controls}

                  onDragEnd={() => {

                    if (y.get() >= 100) {

                      handleClose();

                    }

                  }}

                  dragListener={false}

                  dragConstraints={{

                    top: 0,

                    bottom: 0,

                  }}

                  dragElastic={{

                    top: 0,

                    bottom: 0.5,

                  }}

              >

                <div className={s.DragCloseDrawerHeader}>

                  <button

                      onPointerDown={(e) => {

                        controls.start(e);

                      }}

                      className={s.DragCloseDrawerHeaderButton}

                  ></button>

                </div>

                <div className={s.DragCloseDrawerContent}>

                  {children}

                </div>

              </motion.div>

            </motion.div>

        )}

      </>
  );
}
