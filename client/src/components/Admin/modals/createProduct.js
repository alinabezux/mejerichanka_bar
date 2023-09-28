import {Alert, Button, Container, Form, Modal} from "react-bootstrap";
import {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";

import {categoriesActions, productsActions, typesActions} from "../../../redux";
import {joiResolver} from "@hookform/resolvers/joi";
import {productValidator} from "../../../validators";


const CreateProduct = ({show, onHide}) => {

    const dispatch = useDispatch();

    const [category, setCategory] = useState('');
    const [type, setType] = useState('');
    const {currentPageProducts} = useSelector(state => state.productsReducer);

    const {error} = useSelector(state => state.productsReducer);
    const {categories} = useSelector(state => state.categoriesReducer);
    const {types} = useSelector(state => state.typesReducer);


    useEffect(() => {
        dispatch(categoriesActions.getAll())
        dispatch(typesActions.getAll())
    }, [dispatch]);

    const {register, handleSubmit, reset, formState: {errors}} = useForm({
        resolver: joiResolver(productValidator.newProductValidator),
        mode: 'all'
    });


    const handleCreateProduct = useCallback(async (data) => {
        let productProperties = {
            title: data.title,
            category: category,
            price: data.price,
        };

        if (type !== '') {
            productProperties.type = type;
        }

        const response = await dispatch(productsActions.createProduct({
            product: productProperties
        }));


        if (response.meta.requestStatus === 'fulfilled') {
            onHide();
            reset();
            setCategory('');
            setType('');
            dispatch(productsActions.getAll({page: currentPageProducts, isGettingAll: false}))
        }
    }, [category, type, dispatch, onHide, reset, setCategory, setType,currentPageProducts])


    return (
        <Modal size="lg" show={show} onHide={onHide} centered>
            <Modal.Header>
                <Modal.Title>
                    Створити новий продукт
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <Form onSubmit={handleSubmit(handleCreateProduct)}>
                        {(error && <Alert style={{marginTop: "15px"}} variant={"danger"}>{error.message}</Alert>)}

                        {errors.title &&
                            <Alert style={{marginTop: "15px"}} variant={"danger"}>{errors.title.message}</Alert>}
                        <Form.Control className="mb-3"
                                      type="text"
                                      placeholder="Введіть назву продукту"
                                      {...register('title')}
                        />

                        {errors.category &&
                            <Alert style={{marginTop: "15px"}} variant={"danger"}>{errors.category.message}</Alert>}
                        <Form.Select className="mb-3" value={category}
                                     onChange={(e) => setCategory(e.target.value)}>
                            <option>Виберіть категорію</option>
                            {categories.map(category =>
                                <option value={category.category} key={category._id}>
                                    {category.category}
                                </option>
                            )}
                        </Form.Select>

                        {category === 'Головне меню' &&
                            <>
                                <Form.Select className="mb-3" value={type}
                                             onChange={(e) => setType(e.target.value)}>
                                    <option>Виберіть тип</option>
                                    {types.map(type =>
                                        <option value={type.type} key={type._id}>
                                            {type.type}
                                        </option>
                                    )}
                                </Form.Select>
                            </>
                        }

                        {errors.price &&
                            <Alert style={{marginTop: "15px"}} variant={"danger"}>{errors.price.message}</Alert>}
                        <Form.Control className="mb-3"
                                      type="number"
                                      placeholder="Введіть ціну продукту"
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

export {CreateProduct}