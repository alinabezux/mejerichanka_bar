import {Button, Form} from "react-bootstrap";
import {useCallback, useState} from "react";

export default function AdminOrderItem({order, submit, setUpdateOrder}) {
    const [status, setStatus] = useState("");

    const updateStatusHandler = useCallback((e) => {
        setStatus(e.target.value)
    }, [])

    const updateOrderHandler = useCallback(() => {
        setUpdateOrder(order)
    }, [setUpdateOrder, order])

    const submitHandler = useCallback(() => {
        submit(status)
    }, [submit, status])

    return (
        <tr>
            <td>{order.firstName} {order.lastName} <br/>+380{order.number}</td>
            <td>
                <ul>
                    {order.orderItems.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            </td>
            <td>{order.totalPrice}</td>
            <td>
                {order.city}, {order.address}
            </td>
            <td>
                <Form.Select
                    className="mb-3"
                    value={status}
                    onChange={updateStatusHandler}
                    onClick={updateOrderHandler}
                >
                    <option>{order.status}</option>
                    <option value="Прийнято">Прийнято</option>
                    <option value="Відхилено">Відхилено</option>
                    <option value="Доставляється">Доставляється</option>
                    <option value="Виконано">Виконано</option>
                </Form.Select>
                <Button onClick={submitHandler}>Зберегти</Button>
            </td>
        </tr>
    );
}
