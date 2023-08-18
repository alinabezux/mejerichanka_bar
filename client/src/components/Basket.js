import {Button, Container, Offcanvas} from "react-bootstrap";
import basket from "../assets/backet.png";

const Basket = ({show, onHide}) => {
    return (
        <Offcanvas show={show} onHide={onHide} placement="end" data-bs-theme="dark">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Корзина
                </Offcanvas.Title>

            </Offcanvas.Header>
            <hr/>
            <Offcanvas.Body>
                {/*<Container style={{*/}
                {/*    height: "100%",*/}
                {/*    display: "flex",*/}
                {/*    flexDirection: "column",*/}
                {/*    alignItems: "center",*/}
                {/*    justifyContent: "center"*/}
                {/*}}>*/}
                {/*    Ваша корзина порожня.*/}
                {/*    <img style={{margin: "20px"}} src={basket} alt="basket"/>*/}
                {/*</Container>*/}

                <Container style={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center"
                }}>
                    Увійдіть у систему, щоб зберігати та переглядати товари у своїй корзині.
                    <img style={{margin: "20px"}} src={basket} alt="basket"/>
                    <Button style={{margin: "20px"}} variant="light" href={'/logIn'}>Увійти / Зареєструватись</Button>
                </Container>


            </Offcanvas.Body>
        </Offcanvas>
    );
}

export {Basket}