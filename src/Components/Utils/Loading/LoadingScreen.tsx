import s from "./Loading.module.scss";
import { JSX } from "react";
import Loader from 'react-loaders'

export default function LoadingScreen(): JSX.Element {


    return (
        <div className={s.LoadingContainer}>
            <Loader type="pacman" active/>

        </div>);
}
