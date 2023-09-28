import {Button, Form, Modal} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {useCallback, useState} from "react";

import {typesActions} from "../../../redux";


const CreateType = ({show, onHide}) => {
    const dispatch = useDispatch();

    const [value, setValue] = useState('')
    const {currentPageTypes} = useSelector(state => state.typesReducer);

    const handleCreateType = useCallback(async () => {
        await dispatch(typesActions.createType({type: value}))
        onHide()
        dispatch(typesActions.getAll({page: currentPageTypes, isGettingAll: false}))
        setValue('')
    }, [value, currentPageTypes, dispatch, onHide])

    return (
        <Modal size="lg" show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>
                    Створити новий тип
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        type="text"
                        placeholder="Введіть назву типу"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-success" onClick={handleCreateType}>Зберегти</Button>
                <Button variant="outline-danger" onClick={onHide}>Закрити</Button>
            </Modal.Footer>
        </Modal>
    );
}

export {CreateType}