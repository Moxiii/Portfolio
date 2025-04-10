import React, {JSX, useRef, useState} from "react";
import {
    motion,
    useMotionTemplate,
    useMotionValue,
    useSpring,
} from "framer-motion";
import Modal from "../../Modal/PopUpModal/Modal.tsx";
import "./tiltCard.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {IconProp} from '@fortawesome/fontawesome-svg-core';

const ROTATION_RANGE = 32.5;
const HALF_ROTATION_RANGE = ROTATION_RANGE / 2;

interface TiltCardProps {
    title: string;
    icon: IconProp;
    content: React.ReactNode;
}

const TiltCard: React.FC<TiltCardProps> = ({title, content, icon}) => {
    const ref = useRef<HTMLDivElement>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const xSpring = useSpring(x);
    const ySpring = useSpring(y);

    const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();
        const mouseX = (e.clientX - rect.left) * ROTATION_RANGE;
        const mouseY = (e.clientY - rect.top) * ROTATION_RANGE;

        const rX = (mouseY / rect.height - HALF_ROTATION_RANGE) * -1;
        const rY = mouseX / rect.width - HALF_ROTATION_RANGE;

        x.set(rX);
        y.set(rY);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <>
            <motion.div
                ref={ref}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onClick={() => setIsModalOpen(true)}
                style={{
                    transformStyle: "preserve-3d",
                    transform,
                }}
                className="tilt-card"
            >
                <div className="card-content">
                    <p>{title}</p>
                    <FontAwesomeIcon icon={icon}/>
                </div>
            </motion.div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onBack={() => setIsModalOpen(false)}
                title={title}
            >
                {content as JSX.Element}
            </Modal>
        </>
    );
};

export default TiltCard;
