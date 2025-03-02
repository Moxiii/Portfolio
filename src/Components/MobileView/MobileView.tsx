import "./MobileView.scss"
import {JSX} from "react";
import ZoomText from "../Scroll/Zoom/Zoom.tsx";
import ScrollProgress from "../Scroll/ScrollProgress/ScrollProgress.tsx";
export default function MobileView() : JSX.Element{
    return (
        <>
        <ScrollProgress/>
            <ZoomText
                title1={"Portefolio"}
                title2={"Maxime Lapouge"}
                text={`Etudiant Developpeur`}
            />
        </>
    )

}