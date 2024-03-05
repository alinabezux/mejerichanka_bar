import {Alert, Button, Form, Modal} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {useCallback, useEffect, useState} from "react";

import {categoriesActions, typesActions} from "../../../redux";
import {useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";
import {typeValidator} from "../../../validators/type.validator";


const CreateType = ({show, onHide}) => {
    const dispatch = useDispatch();

    const [category, setCategory] = useState('');

    const {error} = useSelector(state => state.typesReducer);
    const {categories} = useSelector(state => state.categoriesReducer);

    console.log(category);
    useEffect(() => {
        dispatch(categoriesActions.getAll({isGettingAll: true}))
    }, [dispatch]);

    const {register, handleSubmit, reset, formState: {errors}} = useForm({
        resolver: joiResolver(typeValidator.newTypeValidator),
        mode: 'all'
    });

    const handleCreateType = useCallback(async (data) => {

            let typeProperties = {
                type: data.type,
                _category: category
            };
            console.log(data);

            const res = await dispatch(typesActions.createType({type: typeProperties}));
            if (res.meta.requestStatus === 'fulfilled') {
                onHide();
                reset();
                setCategory('');
            }

        }, [category, dispatch, onHide, reset]
    )

    return (
        <Modal size="lg" show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>
                    Створити новий тип
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit(handleCreateType)}>
                    {(error && <Alert style={{marginTop: "15px"}} variant={"danger"}>{error.message}</Alert>)}

                    {errors.type &&
                        <Alert style={{marginTop: "15px"}} variant={"danger"}>{errors.type.message}</Alert>}
                    <Form.Control className="mb-3"
                                  type="text"
                                  placeholder="Введіть назву типу"
                                  {...register('type')}
                    />
                    {errors._category &&
                        <Alert style={{marginTop: "15px"}} variant={"danger"}>{errors._category.message}</Alert>}
                    <Form.Select className="mb-3" value={category}
                                 onChange={(e) => setCategory(e.target.value)}>
                        <option>Виберіть категорію</option>
                        {categories.map(category =>
                            <option value={category._id} key={category._id}>
                                {category.category}
                            </option>
                        )}
                    </Form.Select>
                    <Button variant="outline-success" type='submit'>Зберегти</Button>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрити</Button>
            </Modal.Footer>
        </Modal>
    );
}

export {CreateType}