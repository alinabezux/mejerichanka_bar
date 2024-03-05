import {Alert, Button, Modal, Image} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {useCallback, useEffect, useState} from "react";

import {basketActions} from "../../redux";
import {authService} from "../../services";
import {Basket} from "../Basket";

const ProductDetails = ({show, onHide}) => {
    const dispatch = useDispatch();
    const {selectedProduct, error} = useSelector(state => state.productsReducer);

    const [basketVisible, setBasketVisible] = useState(false);
    const [userId, setUserId] = useState(null);

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

    return (
        <>
            <Modal className="product-info" show={show}
                   onHide={onHide} centered>

                {(error && <Alert style={{marginTop: "15px"}} variant={"danger"}>{error.message}</Alert>)}
                <Modal.Header style={{borderBottom: "none"}} closeButton>
                </Modal.Header>
                <Modal.Body style={{
                    display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"
                }}>
                    <Image src={selectedProduct.image} style={{width: "300px", marginBottom: "15px"}} rounded/>
                    <h2>{selectedProduct.title}</h2>
                    <p style={{color: "black", fontSize: "16px"}}>
                        {selectedProduct.info}
                    </p>
                    <h3 style={{width: "50%", textAlign: "center"}}>
                        <hr/>
                        {selectedProduct.price} грн.
                    </h3>
                    <br/>
                    <Button className="btn" variant="dark" style={{marginBottom: "10px"}}
                            onClick={() => handleAddProductToBasket(selectedProduct)}
                    >Добавити в корзину</Button>
                </Modal.Body>
            </Modal>
            <Basket show={basketVisible}
                    onHide={() => setBasketVisible(false)}/>
        </>
    );
}

export {ProductDetails}