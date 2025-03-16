import s from "./PortFolioCard.module.scss"
import {motion} from "framer-motion";
import {JSX} from "react";
interface CardProps{
    title : string,
    year: Date,
    version : number;
}
export default function PortfolioCard({title , year , version }:CardProps):JSX.Element
{
    return (
        <motion.div className={s.card}>
            <div className={s.cardHeader}>
                <span>V:{version}</span>
            </div>
            <div className={s.cardBody}>
                <span>{title}</span>
            </div>
            <div className={s.cardFooter}>
                <span>{year} ans</span>
            </div>
        </motion.div>
    )
}
