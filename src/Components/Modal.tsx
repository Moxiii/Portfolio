import * as React from "react";
import { motion } from "framer-motion";
import {useRef} from "react";
import {faTimes , faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ModalProps{
    isOpen: boolean;
    onClose: ()=> void;
    title?: string;
    chlidren: React.JSX.Element;
    onBack?:()=>void;
}
export default function Modal({isOpen , onClose ,onBack, title , children}:ModalProps){
    if(!isOpen) return null;
    const constraintsRef = useRef<HTMLDivElement>(null);
    return (
       <motion.div ref={constraintsRef}>
           <motion.div
               drag
               dragConstraints={constraintsRef}
               dragElastic={0.1}
               className="project-modal"
           >
               <div className="modal-header">
                   {onBack && (
                       <button className="return-btn" onClick={onBack}>
                           <FontAwesomeIcon icon={faArrowLeft} className="arrow-back" />
                       </button>
                   )}
                   {title && <h2>{title}</h2>}
                   <button className="close-btn" onClick={onClose}>
                       <FontAwesomeIcon icon={faTimes}/>
                   </button>
               </div>
               <div className="modal-content">
                   {children}
               </div>
           </motion.div>
       </motion.div>
    )

}