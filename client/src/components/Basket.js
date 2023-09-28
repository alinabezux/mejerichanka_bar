import {Button, Container, Offcanvas} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useMemo, useState} from "react";

import basketph from '../assets/backet.png'
import {authActions, basketActions} from "../redux";
import {authService} from "../services";
import {ProductInBasket} from "./ProductInBasket";

const Basket = ({show, onHide}) => {
    const dispatch = useDispatch();
    const {basket} = useSelector(state => state.basketReducer);

    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const user = authService.getUser();
        if (user) {
            setUserId(user);
        }
    }, []);


    useEffect(() => {
        if (userId) {
            dispatch(basketActions.getBasket(userId));
        }
    }, [dispatch, userId]);

    const totalPrice = useMemo(() => {
        return basket.reduce((total, productInBasket) => {
            return total + productInBasket.price * productInBasket.quantity;
        }, 0);
    }, [basket]);

    const handleLogOut = async () => {
        const accessToken = authService.getAccessToken();
        await dispatch(authActions.logOut({access: accessToken}))
        setUserId(null)
        window.location.reload()
    };


    return (
        <Offcanvas show={show} onHide={onHide} className="basket" placement="end" data-bs-theme="dark">
            <Offcanvas.Header closeButton>
                <div style={{display: "flex", alignItems: "center"}}>
                    <Offcanvas.Title><h3 style={{marginRight: "15px"}}>Корзина</h3></Offcanvas.Title>
                    {userId ? <Button variant={"light"} onClick={() => handleLogOut()}>Вийти</Button> : null}
                </div>
            </Offcanvas.Header>
            <Offcanvas.Body>
                {/*якщо зареєстрований*/}
                {userId !== null ?
                    <Container>
                        {basket.length !== 0 ?
                            //якщо є продукти
                            <Container style={{
                                display: "flex",
                                flexDirection: "column",
                            }}>
                                {basket.map(productInBasket =>
                                    <ProductInBasket key={productInBasket._id}
                                                     productInBasket={productInBasket}/>)
                                }
                                <div style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-between"
                                }}>
                                    <h5>Разом до сплати:</h5>
                                    <h5><b>{totalPrice} грн.</b></h5>
                                </div>
                                <Button variant="light" style={{marginTop: "10px"}} href="/order">Оформити
                                    замовлення</Button>
                            </Container>
                            :
                            <Container
                                style={{
                                    paddingTop: "150px",
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center"
                                }}>
                                <h5>
                                    Ваша корзина порожня.
                                </h5>
                                <img style={{margin: "20px"}} src={basketph} alt="basket"/>
                            </Container>
                        }
                    </Container>
                    :
                    <Container style={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        textAlign: "center"
                    }}>
                        Увійдіть у систему, щоб зберігати та переглядати товари у своїй корзині.
                        <img style={{margin: "20px"}} src={basketph} alt="basket"/>
                        <Button style={{margin: "20px"}} variant="light" href={'/logIn'}>
                            Увійти / Зареєструватись
                        </Button>
                    </Container>
                }
            </Offcanvas.Body>
        </Offcanvas>
    );
}

export {Basket}