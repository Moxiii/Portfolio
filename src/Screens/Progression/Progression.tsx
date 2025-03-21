import s from "./Progression.module.scss"
import {JSX, lazy, useState} from "react";

import QuestionMark3D from "../../Components/THREE/QuestionMark/Question.tsx";
import Modal from "../../Components/Modal/PopUpModal/Modal.tsx";

const HorizontalScroll = lazy(()=>import("../../Components/Scroll/HorizontalScroll/HorizontalScroll.tsx"))
const ScrollProgress = lazy(()=>import("../../Components/Scroll/ScrollProgress/ScrollProgress.tsx"))
const PortfolioCard  = lazy(()=>import("../../Components/Cards/PortefolioCard/PortFolioCard.tsx"))

const now = new Date().getFullYear();
export default function Progression():JSX.Element{
    const [selectedPortfolio , setSelectedPortfolio] = useState(null);
    const [isModalOpen , setIsModalOpen] = useState(false);
    const portfolios = [
        { version: 1, title: "Portfolio v1", age: new Date(2021, 0, 1), url: "/Portfolio-2021/index.html" },
        { version: 2, title: "Portfolio v2", age: new Date(2022, 0, 1), url: "/Portfolio-2022/index.html" },
        { version: 3, title: "Portfolio v3", age: new Date(2024, 0, 1), url: "/Portfolio-2024/index.html" },
    ];
const handlePortfolioCLick = (portfolio) =>{
    setSelectedPortfolio(portfolio);
    setIsModalOpen(true)
}
const handleCloseModal = ()=>{
    setIsModalOpen(false);
    setSelectedPortfolio(null)
}

    const getAge = (date:Date)=> now -  date.getFullYear() ;
    return (
        <div className={s.progressionPage}>
     <ScrollProgress/>
            <div className={s.title}>
                <h1>Mes anciennes réalisations :</h1>
            </div>

            <HorizontalScroll length={ 3} background={"#3a2172"} gap={"50rem"} padding={"20rem"}>
                    {portfolios.map((portfolio , index)=>(
                        <div onClick={()=>handlePortfolioCLick(portfolio)} className={s.PortefolioCard}>
                        <PortfolioCard
                            key={index}
                            title={portfolio.title}
                            year={getAge(portfolio.age)}
                            version={portfolio.version}

                        /></div>
                    ))}
            </HorizontalScroll>
            {isModalOpen && selectedPortfolio &&(
                <Modal
                    isOpen={isModalOpen}
                    onClose={() => setSelectedPortfolio(null)}
                    title={selectedPortfolio.title}
                    onBack={() => {
                        handleCloseModal();
                    }}
                >
                    <iframe src={selectedPortfolio.url} width="100%" height="100%" frameBorder="0" className={s.PortfolioIframe}/>
                </Modal>
            )}
            <section className={s.interrogationContainer}>
                <h2 style={{fontSize:"3rem"}}>Le futur ? </h2>
                <QuestionMark3D text="Apprentissage de THREE JS pour proposer un portfolio interractif"/>
            </section>
        </div>
    )
}