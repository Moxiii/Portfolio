import s from "./PokemonCarousel.module.scss"
import {JSX, useState, useEffect} from "react";
import {faArrowRight , faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
export default function PokemonCarousel({images}):JSX.Element {
    const [currIndex , setCurrIndex] = useState(0);
    const intervalTime = 4000;
    useEffect(() => {
        const interval = setInterval(()=>{
            nextSlide();
        },intervalTime);
        return ()=> clearInterval(interval);
    }, []);
    const prevSlide = () => {
        setCurrIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };

    const nextSlide = () => {
        setCurrIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    };

    return (
        <div className={s.pokemonCarouselContainer}>
        <div className={s.pokemonCarouselBody}>
            <FontAwesomeIcon icon={faArrowLeft} className={s.prev} onClick={prevSlide} />
            <FontAwesomeIcon icon={faArrowRight} className={s.next} onClick={nextSlide} />
            <div className={s.pokemonCarouselSlider}>
                {images.map((img , index)=>(
                    <div key={index} className={s.SliderItem}>
                        <div className={s.Item3DFrame}>
                            <img src={img.src} alt="" className={s.carouselImage}/>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>)
}