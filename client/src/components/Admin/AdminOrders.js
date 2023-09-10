import {Table} from "react-bootstrap";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import {orderActions} from "../../redux";
import AdminOrderItem from "./AdminOrderItem";

const AdminOrders = () => {
    const dispatch = useDispatch();
    const {orders, selectedOrder} = useSelector(state => state.orderReducer);

    const handleSetUpdateOrder = (order) => {
        dispatch(orderActions.setSelectedOrder(order));
    };

    useEffect(() => {
        dispatch(orderActions.getAllOrders());
    }, [dispatch]);

    const submit = async (status) => {
        if (status) {
            await dispatch(orderActions.updateOrderStatus({
                    orderId: selectedOrder._id,
                    status,
                })
            );

            await dispatch(orderActions.getAllOrders());
        }
    };

    return (
        <Table
            style={{fontFamily: "'Nunito', sans-serif", fontSize: "20px"}}
            bordered
            hover
        >
            <thead>
            <tr style={{backgroundColor: "darkgray"}}>
                <th>Клієнт</th>
                <th>Замовлення</th>
                <th>Сума</th>
                <th>Адреса доставки</th>
                <th>Статус</th>
            </tr>
            </thead>
            <tbody>
            {orders.map((order, index) => (
                <AdminOrderItem
                    key={`${order._id}-${index}`}
                    order={order}
                    submit={submit}
                    setUpdateOrder={handleSetUpdateOrder}
                />
            ))}
            </tbody>
        </Table>
    );
};

export {AdminOrders};
