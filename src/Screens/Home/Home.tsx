import {JSX} from "react";
import {faFolder} from "@fortawesome/free-solid-svg-icons";
import "./Home.scss"
export default function Home() : JSX.Element   {
    return (
        <div className="landing-container">
            <div className="quote-box">
                <blockquote className="quote-text">
                    <h1 className="quote">Portefolio</h1>
                    <p className="author">
                        <small>By <span className="rosy">moxi</span></small>
                    </p>
                </blockquote>
            </div>
        </div>
    );
}