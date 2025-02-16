import {JSX} from "react";
import "./Navbar.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faHome,
    faLink,
    faAddressCard,
    faListUl,
} from '@fortawesome/free-solid-svg-icons'
import {NavLink} from "react-router-dom";
export default function Navbar() : JSX.Element {
    return(
        <>
            <div className="dock-navbar">
                <div className="dock-item">
                    <NavLink exact="true" to="/">
                        <FontAwesomeIcon icon={faHome}/>
                    </NavLink>

                </div>
                <div className="dock-item">
                    <NavLink exact="true" to="/links">
                        <FontAwesomeIcon icon={faLink}/>
                    </NavLink>
                </div>

                <div className="dock-item">
                    <NavLink exact="true" to="/about">
                        <FontAwesomeIcon icon={faAddressCard}/>
                    </NavLink>
                </div>

                <div className="dock-item">
                    <NavLink exact="true" to="/todo">
                        <FontAwesomeIcon icon={faListUl}/>
                    </NavLink>
                </div>

            </div>
        </>
    )
}
