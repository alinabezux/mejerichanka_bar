import {Image} from "react-bootstrap";
import {useDispatch} from "react-redux";
import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";

import bin from '../assets/bin.png'
import binBlack from '../assets/bin_black.png'
import {authService} from "../services";

import {basketActions} from "../redux";

const ProductInBasket = ({productInBasket}) => {
    const [userId, setUserId] = useState(null);
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
        await dispatch(basketActions.deleteFromBasket({userId: userId, productId: productInBasket._id}))
        dispatch(basketActions.getBasket(userId))
    };


    return (
        <>
            <div style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
            }}>

                <Image style={{height: '70px'}} variant="top" src={productInBasket.image}/>

                <h5 className="m-2">{productInBasket.title}</h5>

                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    width: "70px"
                }}>
                    <h5>{productInBasket.price} грн.</h5>
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

export {ProductInBasket}