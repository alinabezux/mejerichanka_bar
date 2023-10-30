import {Button, Col, Container, Image, Row} from "react-bootstrap";
import {useDispatch} from "react-redux";
import {useCallback, useEffect, useState} from "react";
import {useLocation} from "react-router-dom";

import bin from '../assets/bin.png'
import binBlack from '../assets/bin_black.png'
import {authService} from "../services";

import {basketActions} from "../redux";

const ProductInBasket = ({productInBasket}) => {
    const [userId, setUserId] = useState(null);
    const [quantity, setQuantity] = useState(productInBasket.quantity);

    const dispatch = useDispatch();
    const location = useLocation();

    const isOrder = location.pathname.includes('/order');

    useEffect(() => {
        const user = authService.getUser();
        if (user) {
            setUserId(user);
        }
    }, [])

    const handleDeleteProductInBasket = async (productInBasket) => {
        await dispatch(basketActions.deleteFromBasket({userId, productId: productInBasket._id}))
        dispatch(basketActions.getBasket(userId))
    };
    const increaseQuantity = () => {
        const newQuantity = quantity + 1;
        setQuantity(newQuantity);
        updateQuantityInBasket(newQuantity);
    };

    const decreaseQuantity = () => {
        if (quantity > 1) {
            const newQuantity = quantity - 1;
            setQuantity(newQuantity);
            updateQuantityInBasket(newQuantity);
        } else {
            handleDeleteProductInBasket(productInBasket);
        }
    }

    const updateQuantityInBasket = useCallback(async (newQuantity) => {
        await dispatch(basketActions.updateProductInBasketQuantity({
            userId: userId,
            productId: productInBasket._id,
            quantity: newQuantity
        }))
        dispatch(basketActions.getBasket(userId));
    }, [dispatch, productInBasket._id, userId])


    return (
        <>
            <div style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
            }}>

                <Image style={{height: '70px'}} variant="top" src={productInBasket.image}/>
                <Container className="col-5">
                    <Col>
                        <Row><h5 className="m-2">{productInBasket.title}</h5></Row>
                        <div style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-around",
                            alignItems: "center"
                        }}>
                            <Button style={{backgroundColor: "dimgrey"}} onClick={decreaseQuantity}>-</Button>
                            <h5>{productInBasket.quantity}</h5>
                            <Button style={{backgroundColor: "dimgrey"}}
                                    onClick={increaseQuantity}>+</Button>
                        </div>
                    </Col>
                </Container>

                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    width: "70px"
                }}>
                    <h5>{productInBasket.price * productInBasket.quantity} грн.</h5>
                    {isOrder ?
                        <img style={{width: '18px', marginTop: "10px"}} src={binBlack} alt="bin"
                             onClick={() => handleDeleteProductInBasket(productInBasket)}/>
                        : <img style={{width: '18px', marginTop: "10px"}} src={bin} alt="bin"
                               onClick={() => handleDeleteProductInBasket(productInBasket)}/>
                    }

                </div>
            </div>
            <hr/>
        </>
    );
}

export
{
    ProductInBasket
}