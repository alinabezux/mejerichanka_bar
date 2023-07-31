import {Button, Form, Modal} from "react-bootstrap";
import {useDispatch} from "react-redux";
import {useState} from "react";
import {categoriesActions} from "../../../redux";

const CreateCategory = ({show, onHide}) => {
    const dispatch = useDispatch();

    const [category, setCategory] = useState('');
    // const [file, setFile] = useState(null)

    // const selectFile = e => {
    //     setFile(e.target.files[0])
    // }
    const handleCreateCategory = async () => {
        await dispatch(categoriesActions.createCategory({category: category}))
        dispatch(categoriesActions.getAll())
        setCategory('')
        onHide()
    };


    return (
        <Modal size="lg" show={show} onHide={onHide} centered>
            <Modal.Header>
                <Modal.Title>
                    Створити нову категорію
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control className="mb-3"
                                  type="text"
                                  placeholder="Введіть назву категорії"
                                  value={category}
                                  onChange={(e) => setCategory(e.target.value)}
                    />
                    {/*<Form.Control type="file" onChange={selectFile}/>*/}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-success" onClick={handleCreateCategory}>Зберегти</Button>
                <Button variant="outline-danger" onClick={onHide}>Закрити</Button>
            </Modal.Footer>
        </Modal>
    );
}

export {CreateCategory}