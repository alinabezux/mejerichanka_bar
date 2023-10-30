import {Alert, Button, Container, Form, Modal} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import {useCallback, useEffect} from "react";

import {typesActions} from "../../../redux";
import {joiResolver} from "@hookform/resolvers/joi";
import {typeValidator} from "../../../validators/type.validator";


const EditType = ({show, onHide}) => {
    const dispatch = useDispatch();
    const {register, handleSubmit, setValue, formState: {errors}} = useForm({
        resolver: joiResolver(typeValidator.editTypeValidator),
        mode: 'all'
    });

    const {selectedType, error} = useSelector(state => state.typesReducer);

    useEffect(() => {
        if (selectedType) {
            setValue('type', selectedType.type)
        }
    }, [setValue, selectedType])


    const submit = useCallback(async (data) => {
        const res = await dispatch(typesActions.updateType(
            {
                typeId: selectedType._id,
                type: data
            }))
        if (res.meta.requestStatus === 'fulfilled') {
            onHide()
        }
    }, [dispatch, onHide, selectedType])

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
                                      placeholder={'title'}
                                      {...register('type')}
                        />
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