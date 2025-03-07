import s from "./MobileView.module.scss";
import { JSX } from "react";
import ZoomText from "../Scroll/Zoom/Zoom.tsx";
import ScrollProgress from "../Scroll/ScrollProgress/ScrollProgress.tsx";
export default function MobileView(): JSX.Element {
  return (
    <div className={s.MobileView}>
      <ScrollProgress />
      <ZoomText
        title1={"Portefolio"}
        title2={"Maxime Lapouge"}
        text={`Étudiant\nDéveloppeur`}
      />
      <section className={s.MobilePresentation}>
        <p>test</p>
        <p>test</p>
        <p>test</p>
        <p>test</p>
        <p>test</p>
      </section>
      <section className={s.MobileProject}>
        <p>test</p>
        <p>test</p>
        <p>test</p>
        <p>test</p>
        <p>test</p>
        <p>test</p>
      </section>
    </div>
  );
}
