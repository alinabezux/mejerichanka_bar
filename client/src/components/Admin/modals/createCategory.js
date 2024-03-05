import {Alert, Button, Form, Modal} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {useCallback} from "react";

import {categoriesActions} from "../../../redux";
import {useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";
import {categoryValidator} from "../../../validators/category.validator";

const CreateCategory = ({show, onHide}) => {
    const dispatch = useDispatch();
    const {error} = useSelector(state => state.categoriesReducer);

    const {register, handleSubmit, reset, formState: {errors}} = useForm({
        resolver: joiResolver(categoryValidator.newCategoryValidator),
        mode: 'all'
    });

    const handleCreateCategory = useCallback(async (data) => {
        const res = await dispatch(categoriesActions.createCategory({category: data}));
        if (res.meta.requestStatus === 'fulfilled') {
            onHide();
            reset();
        }

    }, [dispatch, onHide, reset]);


    return (
        <Modal size="lg" show={show} onHide={onHide} centered>
            <Modal.Header>
                <Modal.Title>
                    Створити нову категорію
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit(handleCreateCategory)}>
                    {(error && <Alert style={{marginTop: "15px"}} variant={"danger"}>{error.message}</Alert>)}

                    {errors.category &&
                        <Alert style={{marginTop: "15px"}} variant={"danger"}>{errors.category.message}</Alert>}
                    <Form.Control className="mb-3"
                                  type="text"
                                  placeholder="Введіть назву категорії"
                                  {...register('category')}
                    />
                    <Button variant="outline-success" type='submit'>Зберегти</Button>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрити</Button>
            </Modal.Footer>
        </Modal>
    );
}

export {CreateCategory}