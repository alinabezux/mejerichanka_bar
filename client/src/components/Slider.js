import {Carousel} from "react-bootstrap";
import music from './pictures/207002_Mud_Bars_Haus_1.jpg' ;

const Slider = () => {
    return (
        <Carousel>

            <Carousel.Item style={{'height': '500px'}}>
                <img
                    className="d-block w-100"
                    src={music}
                    alt="МЕЖИРІЧАНКА"
                />
                <Carousel.Caption>
                    <h2>МЕЖИРІЧАНКА</h2>
                </Carousel.Caption>
            </Carousel.Item>


            <Carousel.Item style={{'height': '500px'}}>
                <img
                    className="d-block w-100"
                    src={music}
                    alt="Банкети"
                />
                <Carousel.Caption>
                    <h3>Банкети</h3>
                </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item style={{'height': '500px'}}>
                <img
                    className="d-block w-100"
                    src={music}
                    alt=""
                />
                <Carousel.Caption>
                    <h3>Комплексні обіди</h3>
                </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item style={{'height': '500px'}}>
                <img
                    className="d-block w-100"
                    src={music}
                    alt="Задній двір"
                />
                <Carousel.Caption>
                    <h3>Задній двір</h3>
                </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item style={{'height': '500px'}}>
                <img
                    className="d-block w-100"
                    src={music}
                    alt="Мангал-меню"
                />
                <Carousel.Caption>
                    <h3>Мангал-меню</h3>
                </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item style={{'height': '500px'}}>
                <img
                    className="d-block w-100"
                    src={music}
                    alt="Жива музика"
                />
                <Carousel.Caption>
                    <h3>Жива музика</h3>
                </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item style={{'height': '500px'}}>
                <img
                    className="d-block w-100"
                    src={music}
                    alt="Кальянна кімната"
                />
                <Carousel.Caption>
                    <h2>Кальянна кімната</h2>
                </Carousel.Caption>
            </Carousel.Item>

        </Carousel>
    );
}

export {Slider}