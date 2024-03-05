import {Container, Table} from "react-bootstrap";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import {orderActions} from "../../redux";
import AdminOrderItem from "./AdminOrderItem";
import Pagination from "react-bootstrap/Pagination";
import generatePagination from "../Pagination";

const AdminOrders = () => {
    const dispatch = useDispatch();
    const {orders, selectedOrder, currentPageOrders, totalPagesOrders} = useSelector(state => state.orderReducer);

    const handleSetCurrentPageOrders = async (pageNumber) => {
        dispatch(orderActions.setCurrentPageOrders(pageNumber));
    }

    const paginationItemsOrders = generatePagination(totalPagesOrders, currentPageOrders, handleSetCurrentPageOrders);


    const handleSetUpdateOrder = (order) => {
        dispatch(orderActions.setSelectedOrder(order));
    };

    useEffect(() => {
        dispatch(orderActions.getAllOrders({page: currentPageOrders, isGettingAll: false}));
    }, [dispatch, currentPageOrders]);

    const submit = async (status) => {
        if (status) {
            await dispatch(orderActions.updateOrderStatus({
                    orderId: selectedOrder._id,
                    status,
                })
            );
            await dispatch(orderActions.getAllOrders({page: currentPageOrders, isGettingAll: false}));
        }
    };

    return (
        <Container>
            <Table
                style={{fontFamily: "'Nunito', sans-serif", fontWeight: "normal"}}
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
                {orders.slice().reverse().map((order, index) => (
                    <AdminOrderItem
                        key={`${order._id}-${index}`}
                        order={order}
                        submit={submit}
                        setUpdateOrder={handleSetUpdateOrder}
                    />
                ))}
                </tbody>
            </Table>
            <Pagination style={{display: "flex", justifyContent: "center"}}>{paginationItemsOrders}</Pagination>
        </Container>
    );
};

export {AdminOrders};
