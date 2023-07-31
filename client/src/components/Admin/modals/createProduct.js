import {Button, Form, Modal} from "react-bootstrap";
import {useDispatch} from "react-redux";
import {useState} from "react";
import {productsActions} from "../../../redux";

const CreateProduct = ({show, onHide}) => {

    const dispatch = useDispatch();

    const [title, setTitle] = useState('')
    const [price, setPrice] = useState(0)

    const handleCreateProduct = async () => {
        await dispatch(productsActions.createProduct({product: {title, price}}))
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