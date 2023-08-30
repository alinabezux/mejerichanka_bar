import {$authHost} from "./axios.service";
import {urls} from "../configs/urls";

const basketService = {
    getBasket: (userId) => $authHost.get(`${urls.basket}/${userId}`),
    addToBasket: (userId, productId) => $authHost.post(`${urls.basket}/${userId}/${productId}`),
    deleteFromBasket: (userId, productId) => $authHost.delete(`${urls.basket}/${userId}/${productId}`)
}

export {basketService}