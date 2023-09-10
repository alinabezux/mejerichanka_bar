import {Button, Col, Container, FloatingLabel, Form, InputGroup, Row} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";

import {ProductInBasket} from "../components/ProductInBasket";

import {authService} from "../services";
import {basketActions, orderActions} from "../redux";


const OrderPage = () => {
    const dispatch = useDispatch();
    const {basket} = useSelector(state => state.basketReducer);

    const [userId, setUserId] = useState(null);
    const [shipping, setShipping] = useState('')
    const [city, setCity] = useState('')

    const navigate = useNavigate();
    const {register, handleSubmit, reset} = useForm();


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


    const isCurier = shipping === "Доставка кур'єром";

    const handleCreateOrder = async (data) => {
        await dispatch(orderActions.createOrder({
            userId: userId, order: {
                firstName: data.firstName,
                lastName: data.lastName,
                number: data.number,
                email: data.email,
                shipping: shipping,
                city: city,
                address: data.address,
            }
        }))
        reset();
        setShipping('');
        setCity('');
        navigate('/');
    };

    const totalPrice = basket.reduce((total, productInBasket) => {
        return total + productInBasket.price;
    }, 0);


    return (
        <Container>
            <Row>
                <Col style={{marginTop: "50px"}}>
                    <Container style={{paddingBottom: "15px"}}>
                        <h2 className="order-title">Оформлення замовлення</h2>
                        <hr/>
                    </Container>

                    <Form onSubmit={handleSubmit(handleCreateOrder)}>
                        <Container style={{paddingBottom: "15px"}}>
                            <Row>
                                <Col className="heading  col-2">
                                    <div
                                        style={{
                                            backgroundColor: "black",
                                            width: "35px",
                                            height: "35px",
                                            borderRadius: "50%",
                                            color: "white",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            paddingTop: "8px"
                                        }}
                                    ><h5>1</h5>
                                    </div>
                                </Col>
                                <Col className="col-8">
                                    <h2>Ваші дані</h2>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <FloatingLabel
                                        controlId="1"
                                        label="Ваше ім'я"
                                        className="mb-3"
                                    >
                                        <Form.Control className="mb-3"
                                                      type="text"
                                                      placeholder="Ваше ім'я"
                                                      {...register('firstName', {required: true})}
                                        />
                                    </FloatingLabel>
                                </Col>
                                <Col>
                                    <FloatingLabel
                                        controlId="2"
                                        label="Ваше прізвище"
                                        className="mb-3"
                                    >
                                        <Form.Control className="mb-3"
                                                      type="text"
                                                      placeholder="Ваше прізвище"
                                                      {...register('lastName', {required: true})}
                                        />
                                    </FloatingLabel>
                                </Col>
                            </Row>
                            <InputGroup>
                                <InputGroup.Text className="mb-3">+380</InputGroup.Text>
                                <Form.Control className="mb-3"
                                              type="text"
                                              placeholder="Номер телефону"
                                              {...register('number', {required: true})}
                                />
                            </InputGroup>
                            <FloatingLabel
                                controlId="3"
                                label="Email"
                                className="mb-3"
                            >
                                <Form.Control className="mb-3"
                                              type="text"
                                              placeholder="Email"
                                              {...register('email', {required: true})}
                                />
                            </FloatingLabel>
                        </Container>
                        <Container style={{paddingBottom: "15px"}}>
                            <Row>
                                <Col className="heading  col-2">
                                    <div
                                        style={{
                                            backgroundColor: "black",
                                            width: "35px",
                                            height: "35px",
                                            borderRadius: "50%",
                                            color: "white",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            paddingTop: "8px"
                                        }}><h5>2</h5>
                                    </div>
                                </Col>
                                <Col className="col-8">
                                    <h2>Доставка</h2>
                                </Col>
                            </Row>
                            <Form.Select className="mb-3" value={shipping}
                                         onChange={(e) => setShipping(e.target.value)}>
                                <option>Спосіб доставки</option>
                                <option value="Самовивіз">Самовивіз</option>
                                <option value="Доставка кур'єром">Доставка кур'єром</option>
                            </Form.Select>

                            {isCurier &&
                                <Row className="shipping">
                                    <Col>
                                        <FloatingLabel label="Населений пункт">
                                            <Form.Select className="mb-3" value={city}
                                                         onChange={(e) => setCity(e.target.value)}>
                                                <option>Населений пункт</option>
                                                <option value="с.Межиріччя">с.Межиріччя</option>
                                                <option value="смт Гірник">смт Гірник</option>
                                                <option value="с.Сілець">с.Сілець</option>
                                                <option value="м.Червоноград">м.Червоноград</option>
                                                <option value="м.Соснівка">м.Соснівка</option>
                                            </Form.Select>
                                        </FloatingLabel>
                                    </Col>
                                    <Col>
                                        <FloatingLabel
                                            controlId="4vuk"
                                            label="Вулиця, номер будинку"
                                            className="mb-3"
                                        >
                                            <Form.Control className="mb-3"
                                                          type="text"
                                                          placeholder="Вулиця, номер будинку"
                                                          {...register('address', {required: true})}
                                            />
                                        </FloatingLabel>
                                    </Col>
                                </Row>
                            }
                        </Container>
                        <Button type='submit' variant="light" style={{marginTop: "10px"}} className="m-md-auto">Оформити
                            замовлення</Button>
                    </Form>
                </Col>

                <Col style={{marginTop: "40px"}}>
                    <Container className="receipt">
                        <Col style={{paddingBottom: "15px"}}>
                            <h2 className="order-title">Ваше замовлення</h2>
                            <hr/>
                        </Col>
                        <Col style={{
                            display: "flex",
                            flexDirection: "column",
                        }}>
                            {
                                basket.map(productInBasket =>
                                    <ProductInBasket key={productInBasket._id}
                                                     productInBasket={productInBasket}/>)
                            }
                            <div style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between"
                            }}>
                                <h5>Товарів на суму:</h5>
                                <h5><b>{totalPrice} грн.</b></h5>
                            </div>

                            {isCurier ?
                                <div style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-between"
                                }}>
                                    <h5>Вартість доставки:</h5>
                                    <h5><b>50 грн.</b></h5>
                                </div> : null
                            }
                            <hr/>
                            {isCurier ?
                                <div style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-between"
                                }}>
                                    <h5>Загалом:</h5>
                                    <h5><b>{totalPrice + 50} грн.</b></h5>
                                </div>
                                :
                                <div style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-between"
                                }}>
                                    <h5>Загалом:</h5>
                                    <h5><b>{totalPrice} грн.</b></h5>
                                </div>
                            }
                        </Col>
                    </Container>
                </Col>
            </Row>
        </Container>
    );
}

export {OrderPage}