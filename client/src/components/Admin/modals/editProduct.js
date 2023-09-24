import {Alert, Button, Container, Form, Modal} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import {useEffect} from "react";

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
        }
    }, [setValue, selectedProduct])


    const submit = async (data) => {
        const res = await dispatch(productsActions.updateProduct(
            {
                productId: selectedProduct._id,
                product: data
            }))
        if (res.meta.requestStatus === 'fulfilled') {
            onHide()
        }
    }

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
                                      placeholder={'title'}
                                      {...register('title')}
                        />

                        {errors.price &&
                            <Alert style={{marginTop: "15px"}} variant={"danger"}>{errors.price.message}</Alert>}
                        <Form.Control className="mb-3"
                                      type="number"
                                      placeholder={'price'}
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