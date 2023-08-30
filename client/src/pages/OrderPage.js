import {Button, Col, Container, FloatingLabel, Form, InputGroup, Row} from "react-bootstrap";
import {ProductInBasket} from "../components/ProductInBasket";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {authService} from "../services";
import {basketActions} from "../redux";
import {useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";
import {productValidator} from "../validators";

const OrderPage = () => {
    const dispatch = useDispatch();
    const {basket} = useSelector(state => state.basketReducer);

    const [userId, setUserId] = useState(null);

    const {register, handleSubmit, reset, setValue, formState: {errors}} = useForm({
        defaultValues: {
            title: '',
            price: 0,
        },
        resolver: joiResolver(productValidator.newProductValidator),
        mode: 'all'
    });

    const [deliveryMethod, setDeliveryMethod] = useState('')

    const handleDeliveryChange = (e) => {
        setDeliveryMethod(e.target.value);
    };

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


    const totalPrice = basket.reduce((total, productInBasket) => {
        return total + productInBasket.price;
    }, 0);


    return (
        <Container>
            <Row>
                <Col style={{marginTop: "50px"}}>
                    <Container style={{paddingBottom: "15px"}}>
                        <h2>Оформлення замовлення</h2>
                        <hr/>
                    </Container>
                    <Container style={{paddingBottom: "15px"}}>
                        <Row>
                            <Col md="auto">
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
                                    }}><h5>1</h5>
                                </div>
                            </Col>
                            <Col>
                                <h2>Ваші дані</h2>
                            </Col>
                        </Row>
                        <Form>
                            <FloatingLabel
                                controlId="1"
                                label="Ваше ім'я"
                                className="mb-3"
                            >
                                <Form.Control className="mb-3"
                                              type="text"
                                              placeholder="Ваше ім'я"
                                              {...register('title', {required: true})}
                                />
                            </FloatingLabel>
                            <FloatingLabel
                                controlId="2"
                                label="Ваше прізвище"
                                className="mb-3"
                            >
                                <Form.Control className="mb-3"
                                              type="text"
                                              placeholder="Ваше прізвище"
                                              {...register('title', {required: true})}
                                />
                            </FloatingLabel>
                            <InputGroup>
                                <InputGroup.Text className="mb-3">+380</InputGroup.Text>
                                <Form.Control className="mb-3"
                                              type="text"
                                              placeholder="Номер телефону"
                                              {...register('title', {required: true})}
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
                                              {...register('title', {required: true})}
                                />
                            </FloatingLabel>
                        </Form>
                    </Container>
                    <Container style={{paddingBottom: "15px"}}>
                        <Row>
                            <Col md="auto">
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
                            <Col>
                                <h2>Доставка</h2>
                            </Col>
                        </Row>
                        <Form>
                            <Form.Select className="mb-3" onChange={handleDeliveryChange}>
                                <option>Спосіб доставки</option>
                                <option value="1">Самовивіз</option>
                                <option value="2">Доставка кур'єром</option>
                            </Form.Select>

                            {deliveryMethod === '2' &&
                                <div>
                                    <Form.Select className="mb-3">
                                        <option>Населений пункт</option>
                                        <option value="1">с.Межиріччя</option>
                                        <option value="2">смт Гірник</option>
                                        <option value="3">с.Сілець</option>
                                        <option value="4">м.Червоноград</option>
                                        <option value="5">м.Соснівка</option>
                                    </Form.Select>

                                    <FloatingLabel
                                        controlId="4vuk"
                                        label="Вулиця, номер будинку"
                                        className="mb-3"
                                    >
                                        <Form.Control className="mb-3"
                                                      type="text"
                                                      placeholder="Вулиця, номер будинку"
                                                      {...register('title', {required: true})}
                                        />

                                    </FloatingLabel>
                                </div>
                            }
                        </Form>
                    </Container>
                </Col>
                <Col style={{marginTop: "50px"}}>
                    <Container style={{
                        width: "70%",
                        display: "flex",
                        flexDirection: "column",
                        backgroundColor: "#f5f5f1",
                        padding: "30px"
                    }}>
                        <Col style={{paddingBottom: "15px"}}>
                            <h2>Ваше замовлення</h2>
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
                            <div style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between"
                            }}>
                                <h5>Вартість доставки:</h5>
                                <h5><b>50 грн.</b></h5>
                            </div>
                            <hr/>
                            <div style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between"
                            }}>
                                <h5>Загалом:</h5>
                                <h5><b>{totalPrice + 50} грн.</b></h5>
                            </div>

                            <Button variant="light" style={{marginTop: "10px"}} href="/order" className="m-md-auto">Оформити
                                замовлення</Button>
                        </Col>
                    </Container>
                </Col>
            </Row>


        </Container>
    );
}

export {OrderPage}