import {Carousel} from "react-bootstrap";
import music from './pictures/жива музика.png' ;
import hookah from './pictures/кальян.png'
import bbq from './pictures/мангал-меню.png'
import banket from './pictures/банкети.png'
import bar from './pictures/MEJERICHANKA.png'
import lunches from './pictures/комплексні обіди.png'
import outside from './pictures/задній двір.png'

const Slider = () => {
    return (
        <Carousel className="carousel" >

            <Carousel.Item>
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
                    src={lunches}
                    alt="Комплексні обіди"
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
                    src={bbq}
                    alt="Мангал-меню"
                />
            </Carousel.Item>

            <Carousel.Item>
                <img
                    src={music}
                    alt="Жива музика"
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