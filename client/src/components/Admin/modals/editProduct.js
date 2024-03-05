import {Alert, Button, Container, Form, Modal} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import {useCallback, useEffect} from "react";

import {productsActions} from "../../../redux";
import {joiResolver} from "@hookform/resolvers/joi";
import {productValidator} from "../../../validators";


const EditProduct = ({show, onHide}) => {
    const dispatch = useDispatch();
    const {register, handleSubmit, setValue, formState: {errors}} = useForm({
        resolver: joiResolver(productValidator.editProductValidator),
        mode: 'all'
    });

    const {selectedProduct, error} = useSelector(state => state.productsReducer);

    useEffect(() => {
        if (selectedProduct) {
            setValue('title', selectedProduct.title)
            setValue('price', selectedProduct.price)
            setValue('info', selectedProduct.info)
        }
    }, [setValue, selectedProduct])


    const submit = useCallback(async (data) => {
        const res = await dispatch(productsActions.updateProduct(
            {
                productId: selectedProduct._id,
                product: data
            }))
        if (res.meta.requestStatus === 'fulfilled') {
            onHide()
        }
    }, [dispatch, onHide, selectedProduct])

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

                        {errors.title &&
                            <Alert style={{marginTop: "15px"}} variant={"danger"}>{errors.title.message}</Alert>}
                        <Form.Control className="mb-3"
                                      type="text"
                                      placeholder={'Назва продукту'}
                                      {...register('title')}
                        />

                        {errors.info &&
                            <Alert style={{marginTop: "15px"}} variant={"danger"}>{errors.info.message}</Alert>}
                        <Form.Control className="mb-3"
                                      type="text"
                                      placeholder="Опис..."
                                      {...register('info')}
                        />

                        {errors.price &&
                            <Alert style={{marginTop: "15px"}} variant={"danger"}>{errors.price.message}</Alert>}
                        <Form.Control className="mb-3"
                                      type="number"
                                      placeholder={'Ціна'}
                                      {...register('price')}
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

export {EditProduct}