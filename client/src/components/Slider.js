import {Carousel} from "react-bootstrap";

import hookah from '../assets/hookah.png'
import bbq from '../assets/bbqmenu.png'
import banket from '../assets/banket.png'
import bar from '../assets/MEJERICHANKA.png'
import lunches from '../assets/complex.png'
import outside from '../assets/zad.png'

const Slider = () => {
    return (
        <Carousel className="carousel slider">

            <Carousel.Item className="carousel-item">
                <img
                    src={bar}
                    alt="МЕЖИРІЧАНКА"
                />
            </Carousel.Item>

            <Carousel.Item>
                <img
                    src={banket}
                    alt="Банкети"
                />
            </Carousel.Item>

            <Carousel.Item>
                <img
                    src={outside}
                    alt="Задній двір"
                />
            </Carousel.Item>

            <Carousel.Item>
                <img
                    src={lunches}
                    alt="Комплексні обіди"
                />
            </Carousel.Item>


            <Carousel.Item>
                <img
                    src={bbq}
                    alt="Мангал-меню"
                />
            </Carousel.Item>

            <Carousel.Item>
                <img
                    src={hookah}
                    alt="Кальянна кімната"
                />
            </Carousel.Item>

        </Carousel>
    );
}

export {Slider}