import {Button, Form, Modal} from "react-bootstrap";
import {useCallback, useEffect, useState} from "react";
import {useDispatch} from "react-redux";

import {newsActions} from "../../../redux";

const CreateNew = ({show, onHide}) => {

    const dispatch = useDispatch();
    const [file, setFile] = useState(null)

    useEffect(() => {
        dispatch(newsActions.getAllNews())
    }, [dispatch]);

    const selectFile = e => {
        setFile(e.target.files[0])
    }
    console.log(file);

    const handleCreateNew = useCallback(async (e) => {
        e.preventDefault();
        try {
            if (file) {
                console.log(file);
                const formData = new FormData();
                formData.append("image", file);
                console.log(formData);

                const response = await dispatch(newsActions.createNew({image: formData}));
                if (response.meta.requestStatus === 'fulfilled') {
                    onHide();
                }
            }
        } catch (error) {
            console.error("Помилка під час завантаження файлу ", error);
        }
    }, [dispatch, file, onHide])


    return (
        <Modal size="lg" show={show} onHide={onHide} centered>
            <Modal.Header>
                <Modal.Title>
                    Створити новинку
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <Form.Control
                        className="mt-3"
                        type="file"
                        onChange={selectFile}
                    />
                    <Button className="mt-3" variant="outline-success" type='submit' disabled={!file}
                            onClick={handleCreateNew}>Зберегти</Button>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрити</Button>
            </Modal.Footer>
        </Modal>
    );
}

export {CreateNew}