import {Container, Table} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import Pagination from "react-bootstrap/Pagination";

import {usersActions} from "../../redux"
import generatePagination from "../Pagination";

const AdminClients = () => {
    const dispatch = useDispatch();

    const {users, totalPagesUsers, currentPageUsers} = useSelector(state => state.usersReducer);

    const handleSetCurrentPageUsers = async (pageNumber) => {
        dispatch(usersActions.setCurrentPageUsers(pageNumber));
    }

    const paginationItemsUsers = generatePagination(totalPagesUsers, currentPageUsers, handleSetCurrentPageUsers);


    useEffect(() => {
        dispatch(usersActions.getAll({page: currentPageUsers}))
    }, [dispatch, currentPageUsers])

    return (
        <Container>
            <Table style={{fontFamily: '\'Nunito\', sans-serif', fontWeight: "normal"}} hover>
                <thead>
                <tr style={{backgroundColor: 'darkgray'}}>
                    <th>ID</th>
                    <th>Ім'я</th>
                    <th>Email</th>
                </tr>
                </thead>
                <tbody>
                {users.slice().reverse().map(user =>
                    <tr key={user._id}>
                        <td>{user._id}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                    </tr>
                )}
                </tbody>
            </Table>
            <Pagination style={{display: "flex", justifyContent: "center"}}>{paginationItemsUsers}</Pagination>
        </Container>
    );
}

export {AdminClients}