import {AnimatePresence, motion, usePresenceData, wrap} from "framer-motion"
import {forwardRef, SVGProps, useState, JSX} from "react"
import {faArrowLeft, faArrowRight} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import "./ImgCarrousel.scss";
interface ImgCarouselProps {
    images: { src: string, description: string }[];
}

export default function ImgCarrousel({images}: ImgCarouselProps): JSX.Element {
    const [selectedItem, setSelectedItem] = useState(0)
    const [direction, setDirection] = useState<1 | -1>(1)

    function setSlide(newDirection: 1 | -1) {
        setSelectedItem((prev) =>
            (prev + newDirection + images.length) % images.length
        );
        setDirection(newDirection)
    }

    return (
        <div className="img-carrousel-container">
            <motion.button
                initial={false}
                aria-label="Prev"
                className="carrousel-button"
                onClick={() => setSlide(-1)}
                whileFocus={{outline: `2px solid`}}
            >
                <FontAwesomeIcon icon={faArrowLeft}/>
            </motion.button>
            <AnimatePresence
                custom={direction}
                initial={false}
                mode="popLayout">
                <Slide key={selectedItem} image={images[selectedItem]} direction={direction}/>
            </AnimatePresence>
            <motion.button
                initial={false}
                aria-label="Next"
                className="carrousel-button"
                onClick={() => setSlide(1)}
                whileFocus={{outline: `2px solid`}}
            >
                <FontAwesomeIcon icon={faArrowRight}/>
            </motion.button>
        </div>
    )
}

interface SlideProps {
    image: { src: string; description: string },
    direction: number,
    key?: number
}

function Slide({image, direction, key}: SlideProps) {
    return (
        <motion.div
            className="carousel-slide"
            initial={{opacity: 0, x: direction * 100}}
            animate={{
                opacity: 1,
                x: 0,
                transition: {type: "spring", stiffness: 300, damping: 30},
            }}
            exit={{opacity: 0, x: -direction * 100}}
        >
            <img src={image.src} alt={image.description} className="carousel-image"/>
            <p className="carousel-description">{image.description}</p>
        </motion.div>
    );
}