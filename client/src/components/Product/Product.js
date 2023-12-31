import {Button, Card} from 'react-bootstrap';
import {useCallback, useEffect, useState} from "react";
import {useDispatch} from "react-redux";

import {basketActions, productsActions} from "../../redux";
import {authService} from "../../services";
import {Basket} from "../Basket";
import {ProductDetails} from "./ProductDetails";


const Product = ({product}) => {
    const dispatch = useDispatch();

    const [userId, setUserId] = useState(null);
    const [basketVisible, setBasketVisible] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        const user = authService.getUser();
        if (user) {
            setUserId(user);
        }
    }, [])


    const handleAddProductToBasket = useCallback(async (product) => {
        await dispatch(basketActions.addToBasket({userId, productId: product._id}));
        setBasketVisible(true);
        dispatch(basketActions.getBasket(userId));
    }, [userId, dispatch]);


    const handleShowDetails = useCallback((product) => {
        dispatch(productsActions.setSelectedProduct(product));
        setModalVisible(true);
    }, [dispatch]);

    return (
        <Card className="m-2" style={{width: '18rem'}}>
            <Card.Img variant="top" src={product.image}/>
            <Card.Body className="my-2">
                <Card.Title><h5>{product.title}</h5></Card.Title>
                <Card.Subtitle className="my-3"><h4>{product.price} грн.</h4></Card.Subtitle>

                <Button className="btn" variant="dark" style={{marginBottom: "10px"}}
                        onClick={() => handleAddProductToBasket(product)}
                >Добавити в корзину</Button>

                <Button className="btn" variant="outline-secondary"
                        onClick={() => handleShowDetails(product)}>Детальніше</Button>

                <Basket show={basketVisible}
                        onHide={() => setBasketVisible(false)}/>

                <ProductDetails show={modalVisible}
                                onHide={() => setModalVisible(false)}/>
            </Card.Body>
        </Card>
    );
}

export {Product};

