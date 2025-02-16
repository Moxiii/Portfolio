import {JSX} from "react";
import "./Home.scss"
export default function Home() : JSX.Element   {
    return (
        <div className="landing-container">
            <div className="quote-box">
                <blockquote className="quote-text">
                    <h1 className="quote">An aestetic TODO</h1>
                    <p className="author">
                        <small>By moxi</small>
                    </p>
                </blockquote>
            </div>
        </div>
    );
}