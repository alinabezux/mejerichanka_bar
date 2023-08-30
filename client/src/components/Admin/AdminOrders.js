import {Table} from "react-bootstrap";

const AdminOrders = () => {
    return (
        <Table style={{fontFamily: '\'Nunito\', sans-serif', fontSize: "20px"}} striped bordered hover>
            <thead>
            <tr style={{ backgroundColor: 'darkgray' }}>
                <th>Дата</th>
                <th>Клієнт</th>
                <th>Замовлення</th>
                <th>Сума</th>
                <th>Адреса доставки</th>
                <th>Статус</th>
            </tr>
            </thead>
            <tbody>
            {/*{orders.map(order =>*/}
            {/*<tr key={order._id}>*/}
            {/*    <td>{order._id}</td>*/}
            {/*    <td>{order.name}</td>*/}
            {/*    <td>{order.email}</td>*/}
            {/*</tr>*/}
            {/*)*/}
            {/*}*/}
            </tbody>
        </Table>
    );
}

export {AdminOrders}