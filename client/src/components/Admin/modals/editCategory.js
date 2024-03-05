import {Alert, Button, Container, Form, Modal} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import {useCallback, useEffect} from "react";

import {categoriesActions} from "../../../redux";
import {joiResolver} from "@hookform/resolvers/joi";
import {categoryValidator} from "../../../validators/category.validator";


const EditCategory = ({show, onHide}) => {
    const dispatch = useDispatch();
    const {register, handleSubmit, setValue, formState: {errors}} = useForm({
        resolver: joiResolver(categoryValidator.editCategoryValidator),
        mode: "all"
    });

    const {selectedCategory, error} = useSelector(state => state.categoriesReducer);

    useEffect(() => {
        if (selectedCategory) {
            setValue('category', selectedCategory.category)
        }
    }, [setValue, selectedCategory])


    const submit = useCallback(async (data) => {
        const res = await dispatch(categoriesActions.updateCategory(
            {
                categoryId: selectedCategory._id,
                category: data
            }))
        if (res.meta.requestStatus === 'fulfilled') {
            onHide()
        }
    }, [dispatch, onHide, selectedCategory])

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

                        {errors.category &&
                            <Alert style={{marginTop: "15px"}} variant={"danger"}>{errors.category.message}</Alert>}
                        <Form.Control className="mb-3"
                                      type="text"
                                      placeholder={'Введіть назву категорії'}
                                      {...register('category')}
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

export {EditCategory}