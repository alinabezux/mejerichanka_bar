import {Alert, Button, Container, Form, Modal} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import {useCallback, useEffect, useState} from "react";

import {typesActions} from "../../../redux";
import {joiResolver} from "@hookform/resolvers/joi";
import {typeValidator} from "../../../validators/type.validator";


const EditType = ({show, onHide}) => {
    const dispatch = useDispatch();
    const [category, setCategory] = useState('');

    const {register, handleSubmit, setValue, formState: {errors}} = useForm({
        resolver: joiResolver(typeValidator.editTypeValidator),
        mode: 'all'
    });

    const {selectedType, error} = useSelector(state => state.typesReducer);
    const {categories} = useSelector(state => state.categoriesReducer);

    useEffect(() => {
        if (selectedType) {
            setValue('type', selectedType.type)
        }
    }, [setValue, selectedType])


    const submit = useCallback(async (data) => {
        let typeProperties = {
            type: data.type,

        }
        if (category !== '') {
            typeProperties._category = category
        }

        const res = await dispatch(typesActions.updateType(
            {
                typeId: selectedType._id,
                type: typeProperties
            }))

        if (res.meta.requestStatus === 'fulfilled') {
            onHide()
            setCategory('');
        }
    }, [dispatch, onHide, selectedType, category])

    return (
        <Modal size="lg" show={show} onHide={onHide} centered>
            <Modal.Header>
                <Modal.Title>
                    Редагувати
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <Form onSubmit={handleSubmit(submit)}>
                        {(error && <Alert style={{marginTop: "15px"}} variant={"danger"}>{error.message}</Alert>)}

                        {errors.type &&
                            <Alert style={{marginTop: "15px"}} variant={"danger"}>{errors.type.message}</Alert>}
                        <Form.Control className="mb-3"
                                      type="text"
                                      placeholder={'Назва типу'}
                                      {...register('type')}
                        />
                        {selectedType && selectedType._category ?
                            <Form.Select className="mb-3" value={category}
                                         onChange={(e) => setCategory(e.target.value)}>
                                <option>{(categories.find(item => item._id === selectedType._category)).category}</option>
                                {categories.map(category =>
                                    <option value={category._id} key={category._id}>
                                        {category.category}
                                    </option>
                                )}
                            </Form.Select> : null
                        }

                        <Button variant="outline-success" type='submit'>Зберегти</Button>
                    </Form>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрити</Button>
            </Modal.Footer>
        </Modal>
    );
}

export {EditType}