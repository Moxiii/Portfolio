import s from "./OlderPortfolio.module.scss"
import {JSX} from "react";
interface olderPortfolioProps  {
    id:number;
}
export default function olderPortfolio({id}:olderPortfolioProps):JSX.Element{
    return (
        <div className={s.portFolioContainer}>
        </div>
    )
}