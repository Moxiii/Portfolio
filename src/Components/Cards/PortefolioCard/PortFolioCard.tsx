import s from "./PortFolioCard.module.scss"
import {motion} from "framer-motion";
import {JSX} from "react";
interface CardProps{
    title : string,
    year: Date,
    version : number;
    key:number;
}
export default function PortfolioCard({title , year , version , key }:CardProps):JSX.Element
{
    const iconHoverEffect = {
        whileHover: {
            scale: 1.1,
            y: -5,
        },
        whileTap:{
            scale:0.8
        }
    };
    return (
        <motion.div
            className={s.card}
            whileHover={iconHoverEffect.whileHover}
            transition={iconHoverEffect.whileTap}
            key={key}
        >
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
