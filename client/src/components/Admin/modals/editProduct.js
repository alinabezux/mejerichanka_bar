import {Alert, Button, Form, Modal} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import {useEffect} from "react";
import {joiResolver} from "@hookform/resolvers/joi";

import {productValidator} from "../../../validators";
import {productsActions} from "../../../redux";


const EditProduct = ({show, onHide}) => {
    const dispatch = useDispatch();
    const {register, handleSubmit, formState: {errors}, setValue} = useForm(
        {
            resolver: joiResolver(productValidator.editProductValidator),
            mode: 'all'
        }
    );

    const {selectedProduct} = useSelector(state => state.productsReducer);

    useEffect(() => {
        if (selectedProduct) {
            setValue('title', selectedProduct.title)
            setValue('price', selectedProduct.price)
        }
    }, [setValue, selectedProduct])


    const submit = async (data) => {
        await dispatch(productsActions.updateProduct({productId: selectedProduct._id, product: data}))
        onHide()
        await dispatch(productsActions.getAll({}))
    }

    return (
        <Modal size="lg" show={show} onHide={onHide} centered>
            <Modal.Header>
                <Modal.Title>
                    Редагувати
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit(submit)}>
                    {errors.title && <Alert variant={"danger"}>{errors.title.message}</Alert>}
                    <Form.Control className="mb-3"
                                  type="text"
                                  placeholder={'title'}
                                  {...register('title')}
                    />

                    {errors.price && <Alert variant={"danger"}>{errors.price.message}</Alert>}
                    <Form.Control className="mb-3"
                                  type="number"
                                  placeholder={'price'}
                                  {...register('price')}
                    />

                    <Button variant="outline-success" type='submit' onClick={onHide}>Зберегти</Button>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрити</Button>
            </Modal.Footer>
        </Modal>
    );
}

export {EditProduct}