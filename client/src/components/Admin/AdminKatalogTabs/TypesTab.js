import {Button, Tab, Table} from "react-bootstrap";
import Pagination from "react-bootstrap/Pagination";
import {useDispatch, useSelector} from "react-redux";
import {useCallback, useEffect, useState} from "react";

import {typesActions} from "../../../redux";
import generatePagination from "../../Pagination";
import {CreateType} from "../modals";
import {EditType} from "../modals/editType";


const TypesTab = () => {
    const dispatch = useDispatch();

    const {types, totalPagesTypes, currentPageTypes} = useSelector(state => state.typesReducer);
    const [typeVisible, setTypeVisible] = useState(false);
    const [editTypeVisible, setEditTypeVisible] = useState(false);


    const handleSetCurrentPageTypes = async (pageNumber) => {
        dispatch(typesActions.setCurrentPageTypes(pageNumber));
    }

    const paginationItemsTypes = generatePagination(totalPagesTypes, currentPageTypes, handleSetCurrentPageTypes);

    const handleEditType = useCallback(
        (type) => {
            dispatch(typesActions.setSelectedType(type));
            setEditTypeVisible(true);
        }, [dispatch]);

    const handleDeleteType = useCallback(
        async (type) => {
            await dispatch(typesActions.deleteById({typeId: type._id}));
            dispatch(
                typesActions.getAll({page: currentPageTypes, isGettingAll: false})
            );
        }, [dispatch, currentPageTypes]);


    useEffect(() => {
        dispatch(typesActions.getAll({page: currentPageTypes, isGettingAll: false}))
    }, [dispatch, currentPageTypes]);

    return (
        <Tab.Pane eventKey="types">

            <Button onClick={() => setTypeVisible(true)}
                    variant={'success'}>+ Cтворити</Button>

            <CreateType show={typeVisible}
                        onHide={() => setTypeVisible(false)}/>

            <Table style={{
                fontFamily: '\'Nunito\', sans-serif',
                fontWeight: "normal",
                fontSize: "25px"
            }}>
                <thead>
                <tr>
                    <th>Тип</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {types.map(type =>
                    <tr key={type._id}>
                        <td>{type.type}</td>

                        <td>
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '5px'
                            }}>
                                <Button style={{marginBottom: '10px'}}
                                        onClick={() => handleEditType(type)}
                                >Редагувати</Button>

                                <EditType show={editTypeVisible}
                                          onHide={() => setEditTypeVisible(false)}/>


                                <Button onClick={() => handleDeleteType(type)}
                                        variant={'outline-danger'}>Видалити</Button>
                            </div>
                        </td>
                    </tr>
                )
                }
                </tbody>
            </Table>
            <Pagination style={{display: "flex", justifyContent: "center"}}>{paginationItemsTypes}</Pagination>
        </Tab.Pane>
    );
}

export {TypesTab}