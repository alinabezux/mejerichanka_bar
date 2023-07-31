import {Button, Dropdown, Form, Modal} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import {categoriesActions, productsActions, typesActions} from "../../../redux";
import {useEffect} from "react";

const CreateProduct = ({show, onHide}) => {

    const dispatch = useDispatch();
    const {selectedCategory, categories} = useSelector(state => state.categoriesReducer);
    const {selectedType, types} = useSelector(state => state.typesReducer);

    const [title, setTitle] = useState('')
    const [price, setPrice] = useState(0)

    useEffect(() => {
        dispatch(categoriesActions.getAll())
        dispatch(typesActions.getAll())
    }, [dispatch]);

    const newProduct = {
        title,
        selectedCategory,
        selectedType,
        price
    };

    const handleCreateProduct = async () => {
        await dispatch(productsActions.createProduct({product: newProduct}))
        await dispatch(productsActions.getAll({}))
        setTitle('')
        setPrice(0)
        onHide()
    }

    return (
        <Modal size="lg" show={show} onHide={onHide} centered>
            <Modal.Header>
                <Modal.Title>
                    Створити новий продукт
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control className="mb-3"
                                  type="text"
                                  placeholder="Введіть назву продукту"
                                  value={title}
                                  onChange={(e) => setTitle(e.target.value)}
                    />

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

                    <Form.Control className="mb-3"
                                  type="number"
                                  placeholder="Введіть ціну продукту"
                                  value={price}
                                  onChange={(e) => setPrice(Number(e.target.value))}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-success" onClick={handleCreateProduct}>Зберегти</Button>
                <Button variant="outline-danger" onClick={onHide}>Закрити</Button>
            </Modal.Footer>
        </Modal>
    );
}

export {CreateProduct}