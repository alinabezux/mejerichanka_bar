import {Button, Dropdown, Form, Modal} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {categoriesActions, productsActions, typesActions} from "../../../redux";
import {useEffect} from "react";
import {useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";
import {productValidator} from "../../../validators";


const CreateProduct = ({show, onHide}) => {

    const dispatch = useDispatch();

    const {selectedCategory, categories} = useSelector(state => state.categoriesReducer);
    const {selectedType, types} = useSelector(state => state.typesReducer);

    useEffect(() => {
        dispatch(categoriesActions.getAll())
        dispatch(typesActions.getAll())
    }, [dispatch]);

    const {register, handleSubmit, reset, setValue, formState: {errors}} = useForm({
        defaultValues: {
            title: '',
            price: 0,
        },
        resolver: joiResolver(productValidator.newProductValidator),
        mode: 'all'
    });


    const handleCreateProduct = async (data) => {
        await dispatch(productsActions.createProduct({
            product: {
                title: data.title,
                category: selectedCategory.category,
                type: selectedType.type,
                price: data.price,
            }
        }))
        onHide();
        setValue('title', "");
        setValue('price', 0);
        reset();
        await dispatch(productsActions.getAll({}))
    }


    return (
        <Modal size="lg" show={show} onHide={onHide} centered>
            <Modal.Header>
                <Modal.Title>
                    Створити новий продукт
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit(handleCreateProduct)}>
                    {errors.title && <span style={{color: "red"}}>{errors.title.message}</span>}
                    <Form.Control className="mb-3"
                                  type="text"
                                  placeholder="Введіть назву продукту"
                                  {...register('title', {required: true})}
                    />

                    {errors.category && <span style={{color: "red"}}>{errors.category.message}</span>}
                    <Dropdown className="mt-2 mb-2">
                        <Dropdown.Toggle>{selectedCategory.category || "Виберіть категорію"}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {categories.map(category =>
                                <Dropdown.Item
                                    onClick={() => dispatch(categoriesActions.setSelectedCategory(category))}
                                    key={category.id}
                                >
                                    {category.category}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>

                    {errors.type && <span style={{color: "red"}}>{errors.type.message}</span>}
                    <Dropdown className="mt-2 mb-2">
                        <Dropdown.Toggle>{selectedType.type || "Виберіть тип"}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {types.map(type =>
                                <Dropdown.Item
                                    onClick={() => dispatch(typesActions.setSelectedType(type))}
                                    key={type.id}
                                >
                                    {type.type}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>

                    {errors.price && <span style={{color: "red"}}>{errors.price.message}</span>}
                    <Form.Control className="mb-3"
                                  type="number"
                                  placeholder="Введіть ціну продукту"
                                  {...register('price', {required: true})}
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

export {CreateProduct}