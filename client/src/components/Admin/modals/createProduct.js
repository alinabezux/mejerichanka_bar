import {Button, Dropdown, Form, Modal} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import {categoriesActions, productsActions, typesActions} from "../../../redux";
import {useEffect} from "react";
import {useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";
import {productValidator} from "../../../validators";

const CreateProduct = ({show, onHide}) => {

    const dispatch = useDispatch();

    const {selectedCategory, categories} = useSelector(state => state.categoriesReducer);
    const {selectedType, types} = useSelector(state => state.typesReducer);

    const {register, handleSubmit, formState: {errors, isValid}} = useForm({
        resolver: joiResolver(productValidator.newProductValidator),
        mode: 'all'
    });

    const [title, setTitle] = useState('');
    const [price, setPrice] = useState(0);
    // const [file, setFile] = useState("");

    useEffect(() => {
        dispatch(categoriesActions.getAll())
        dispatch(typesActions.getAll())
    }, [dispatch]);

    // const selectFile = e => {
    //     setFile(e.target.files[0].name)
    //     console.log(file);
    // }

    const handleCreateProduct = async () => {
        await dispatch(productsActions.createProduct({
                product: {
                    title,
                    category: selectedCategory.category,
                    type: selectedType.type,
                    price,
                    // image: file
                }
            })
        )

        onHide()
        await dispatch(productsActions.getAll({}))
        setTitle('');
        setPrice(0);
        // setFile("");
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
                    {errors.title && <span style={{color: "red"}}>{errors.title.message}</span>}
                    <Form.Control className="mb-3"
                                  type="text"
                                  placeholder="Введіть назву продукту"
                                  value={title}
                                  onChange={(e) => setTitle(e.target.value)}
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
                                  value={price}
                                  onChange={(e) => setPrice(Number(e.target.value))}
                    />

                    {/*<Form.Control className="mt-3"*/}
                    {/*              type="file"*/}
                    {/*              onChange={selectFile}*/}
                    {/*/>*/}
                    <Button variant="outline-success" disabled={!isValid}
                            onClick={handleCreateProduct}>Зберегти</Button>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрити</Button>
            </Modal.Footer>
        </Modal>
    );
}

export {CreateProduct}