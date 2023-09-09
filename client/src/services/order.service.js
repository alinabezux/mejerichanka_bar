import {$authHost} from "./axios.service";
import {urls} from "../configs/urls";

const orderService = {
    createOrder: (userId, order) => $authHost.post(`${urls.order}/${userId}`, {order}),
    getAllOrders: () => $authHost.get(urls.order),
    updateOrderStatus: (orderId, status) => $authHost.patch(`${urls.order}/${orderId}`, {status})
}

export {orderService}