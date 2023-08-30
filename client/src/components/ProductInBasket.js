import {Button, Image} from "react-bootstrap";
import bin from '../assets/bin.png'
import {basketActions} from "../redux";
import {useDispatch} from "react-redux";
import {useEffect, useState} from "react";
import {authService} from "../services";


const ProductInBasket = ({productInBasket}) => {
    const [userId, setUserId] = useState(null);
    const dispatch = useDispatch();

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
                margin: "6px 0"
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
                    <img style={{width: '18px', marginTop: "20px"}} src={bin} alt="bin"
                         onClick={() => handleDeleteProductInBasket(productInBasket)}/>
                </div>
            </div>
            <hr/>
        </>
    );
}

export {ProductInBasket}