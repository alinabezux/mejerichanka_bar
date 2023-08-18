import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {usersActions} from "../../redux";
import {Table} from "react-bootstrap";

const AdminClients = () => {
    const dispatch = useDispatch();

    const {users} = useSelector(state => state.usersReducer);

    useEffect(() => {
        dispatch(usersActions.getAll())
    }, [dispatch])

    return (
        <Table style={{fontFamily: '\'Nunito\', sans-serif'}}>
            <thead>
            <tr>
                <th>ID</th>
                <th>Ім'я</th>
                <th>Email</th>
            </tr>
            </thead>
            <tbody>
            {users.map(user =>
                <tr key={user._id}>
                    <td>{user._id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                </tr>
            )
            }
            </tbody>
        </Table>
    );
}

export {AdminClients}