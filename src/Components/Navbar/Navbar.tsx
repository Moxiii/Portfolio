import { JSX } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faLink, faAddressCard, faListUl } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import "./Navbar.scss";

const iconHoverEffect = {
    whileHover: {
        scale: 1.2,
        y: -5,
    },
    transition: {
        type: "spring",
        stiffness: 400,
        damping: 15,
        duration: 0.3
    }
};

export default function Navbar(): JSX.Element {
    return (
        <div className="dock-navbar">
            <div className="dock-item">
                <NavLink exact="true" to="/" data-title="Home">
                    <motion.div
                        whileHover={iconHoverEffect.whileHover}
                        transition={iconHoverEffect.transition}
                        className="dock-item-content"
                    >
                        <FontAwesomeIcon icon={faHome} className="icon-color" />
                    </motion.div>
                </NavLink>
            </div>

            <div className="dock-item">
                <NavLink exact="true" to="/links" data-title="Links">
                    <motion.div
                        whileHover={iconHoverEffect.whileHover}
                        transition={iconHoverEffect.transition}
                        className="dock-item-content"
                    >
                        <FontAwesomeIcon icon={faLink} className="icon-color" />
                    </motion.div>
                </NavLink>
            </div>

            <div className="dock-item">
                <NavLink exact="true" to="/about" data-title="About">
                    <motion.div
                        whileHover={iconHoverEffect.whileHover}
                        transition={iconHoverEffect.transition}
                        className="dock-item-content"
                    >
                        <FontAwesomeIcon icon={faAddressCard} className="icon-color" />
                    </motion.div>
                </NavLink>
            </div>

            <div className="dock-item">
                <NavLink exact="true" to="/todo" data-title="Todo">
                    <motion.div
                        whileHover={iconHoverEffect.whileHover}
                        transition={iconHoverEffect.transition}
                        className="dock-item-content"
                    >
                        <FontAwesomeIcon icon={faListUl} className="icon-color" />
                    </motion.div>
                </NavLink>
            </div>
        </div>
    );
}
