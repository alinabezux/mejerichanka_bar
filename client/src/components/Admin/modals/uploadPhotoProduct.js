import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import {Button, Form, Modal} from "react-bootstrap";

import {productsActions} from "../../../redux";

const UploadPhotoProduct = ({show, onHide}) => {

    const [file, setFile] = useState(null)

    const dispatch = useDispatch();
    const {selectedProduct} = useSelector(state => state.productsReducer);

    const selectFile = e => {
        setFile(e.target.files[0])
    }

    const handleUploadFile = async (e) => {
        e.preventDefault()
        try {
            if (file) {
                const formData = new FormData();
                formData.append('image', file);

                await dispatch(productsActions.uploadPhoto({productId: selectedProduct._id, image: formData}))
            }
            onHide();
        } catch (error) {
            console.error('Помилка під час завантаження файлу ', error);
        }
    };

    return (
        <Modal size="lg" show={show} onHide={onHide} centered>
            <Modal.Header>
                <Modal.Title>
                    Завантажити фото
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        className="mt-3"
                        type="file"
                        onChange={selectFile}
                    />
                    <Button className="mt-3" variant="outline-success" type='submit'
                            onClick={handleUploadFile}>Зберегти</Button>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрити</Button>
            </Modal.Footer>
        </Modal>
    );
}

export {UploadPhotoProduct}