import {Button, Form, Modal} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {productsActions} from "../../../redux";
import {useForm} from "react-hook-form";
import {useEffect} from "react";
import {productValidator} from "../../../validators";
import {joiResolver} from "@hookform/resolvers/joi";


const EditProduct = ({show, onHide}) => {

    const dispatch = useDispatch();
    const {register, handleSubmit, formState: {errors, isValid}, setValue} = useForm({
        resolver: joiResolver(productValidator.editProductValidator),
        mode: 'all'
    });

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
                    {errors.title && <span style={{color: "red"}}>{errors.title.message}</span>}
                    <Form.Control className="mb-3"
                                  type="text"
                                  placeholder={'title'}
                                  {...register('title', {required: true})}
                    />

                    {errors.price && <span style={{color: "red"}}>{errors.price.message}</span>}
                    <Form.Control className="mb-3"
                                  type="number"
                                  placeholder={'price'}
                                  {...register('price', {required: true})}
                    />

                    <Button variant="outline-success" disabled={!isValid} type='submit'>Зберегти</Button>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрити</Button>
            </Modal.Footer>
        </Modal>
    );
}

export {EditProduct}