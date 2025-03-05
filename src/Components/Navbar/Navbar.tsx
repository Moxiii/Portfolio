import { JSX } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faAddressCard, faUser } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import "./Navbar.scss";

const iconHoverEffect = {
    whileHover: {
        scale: 1.2,
        y: -5,
    },
    whileTap:{
        scale:0.8
    }
};

export default function Navbar(): JSX.Element {
    return (
        <div className="dock-navbar">
            <div className="dock-item">
                <NavLink exact="true" to="/" data-title="Home">
                    <motion.div
                        whileHover={iconHoverEffect.whileHover}
                        transition={iconHoverEffect.whileTap}
                        className="dock-item-content"
                    >
                        <FontAwesomeIcon icon={faHome} className="icon-color"/>
                    </motion.div>
                </NavLink>
            </div>


            <div className="dock-item">
                <NavLink exact="true" to="/about" data-title="About">
                    <motion.div
                        whileHover={iconHoverEffect.whileHover}
                        whileTap={iconHoverEffect.whileTap}
                        className="dock-item-content"
                    >
                        <FontAwesomeIcon icon={faUser} className="icon-color"/>
                    </motion.div>
                </NavLink>
            </div>
            <div className="dock-item">
                <NavLink exact="true" to="/contact" data-title="Contact">
                    <motion.div
                        whileHover={iconHoverEffect.whileHover}
                        whileTap={iconHoverEffect.whileTap}
                        className="dock-item-content"
                    >
                        <FontAwesomeIcon icon={faAddressCard} className="icon-color"/>
                    </motion.div>
                </NavLink>
            </div>


        </div>
    );
}
