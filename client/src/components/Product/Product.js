import {Button, Card} from 'react-bootstrap';
import {basketActions} from "../../redux";
import {useDispatch} from "react-redux";
import {useEffect, useState} from "react";
import {authService} from "../../services";

const Product = ({product}) => {
    const dispatch = useDispatch();

    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const user = authService.getUser();
        if (user) {
            setUserId(user);
        }
    }, [])

    const handleAddProductToBasket = async (product) => {
        const res = await dispatch(basketActions.addToBasket({userId: userId, productId: product._id}));
        console.log(res);
        dispatch(basketActions.getBasket(userId))
    };

    return (
        <Card className="m-2" style={{width: '18rem'}}>
            <Card.Img variant="top" src={product.image}/>
            <Card.Body className="my-2">
                <Card.Title><h5>{product.title}</h5></Card.Title>
                <Card.Subtitle className="my-3"><h4>{product.price} грн.</h4></Card.Subtitle>
                <Button className="btn" variant="dark"
                        onClick={() => handleAddProductToBasket(product)}
                >Добавити в корзину</Button>
            </Card.Body>
        </Card>
    );
}

export {Product}