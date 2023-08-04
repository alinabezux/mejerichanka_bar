import {Button, Col, Nav, Row, Tab, Table} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {categoriesActions, productsActions, typesActions} from "../../redux";
import {CreateCategory, CreateProduct, CreateType, EditProduct} from "./modals";

const AdminKatalog = () => {
    const dispatch = useDispatch();

    const {products} = useSelector(state => state.productsReducer);
    const {categories} = useSelector(state => state.categoriesReducer);
    const {types} = useSelector(state => state.typesReducer);

    const [productVisible, setProductVisible] = useState(false);
    const [editProductVisible, setEditProductVisible] = useState(false);
    const [categoryVisible, setCategoryVisible] = useState(false);
    const [typeVisible, setTypeVisible] = useState(false);


    const handleEditProduct = (product) => {
        dispatch(productsActions.setSelectedProduct(product))
        setEditProductVisible(true)
    }

    const handleDeleteProduct = async (product) => {
        await dispatch(productsActions.deleteById({productId: product._id}))
        dispatch(productsActions.getAll({}))
    }

    const handleDeleteCategory = async (category) => {
        await dispatch(categoriesActions.deleteById({categoryId: category._id}));
        dispatch(categoriesActions.getAll())
    }

    const handleDeleteType = async (type) => {
        await dispatch(typesActions.deleteById({typeId: type._id}))
        dispatch(typesActions.getAll())
    }

    useEffect(() => {
        dispatch(productsActions.getAll({}))
        dispatch(categoriesActions.getAll())
        dispatch(typesActions.getAll())
    }, [dispatch]);


    return (
        <Tab.Container defaultActiveKey="categories">
            <Row>
                <Col sm={3}>
                    <Nav variant="pills" style={{
                        display: 'flex',
                        flexDirection: 'column',
                        border: '1px solid blue',
                        borderRadius: '10px'
                    }}>
                        <Nav.Item>
                            <Nav.Link eventKey="products">Продукти</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="categories">Категорії</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="types">Типи</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Col>

                <Col sm={9}>
                    <Tab.Content>

                        {/*продукти*/}
                        <Tab.Pane eventKey="products">
                            <Button
                                onClick={() => setProductVisible(true)}
                                variant={'success'}>+ Cтворити</Button>

                            <CreateProduct show={productVisible}
                                           onHide={() => setProductVisible(false)}/>

                            <Table style={{fontFamily: '\'Nunito\', sans-serif'}}>
                                <thead>
                                <tr>
                                    <th>Фото</th>
                                    <th>Назва</th>
                                    <th>Ціна</th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    products.map(product =>
                                        <tr>
                                            <td><img style={{width: '100px'}} src={product.image}
                                                     alt={product.title}/></td>
                                            <td>{product.title}</td>
                                            <td>{product.price} грн.</td>
                                            <td>
                                                <div style={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    margin: '5px'
                                                }}>
                                                    <Button style={{marginBottom: '10px'}}
                                                            onClick={() => handleEditProduct(product)}
                                                    >Редагувати</Button>

                                                    <EditProduct show={editProductVisible}
                                                                 onHide={() => setEditProductVisible(false)}
                                                    />
                                                    <Button onClick={() => handleDeleteProduct(product)}
                                                            variant={'outline-danger'}>Видалити</Button>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                }
                                </tbody>
                            </Table>
                        </Tab.Pane>

                        {/*//категорії*/}
                        <Tab.Pane eventKey="categories">

                            <Button onClick={() => setCategoryVisible(true)}
                                    variant={'success'}>+ Cтворити</Button>

                            <CreateCategory show={categoryVisible}
                                            onHide={() => setCategoryVisible(false)}/>

                            <Table style={{fontFamily: '\'Nunito\', sans-serif'}}>
                                <thead>
                                <tr>
                                    <th>Фото</th>
                                    <th>Категорія</th>
                                </tr>
                                </thead>
                                <tbody>
                                {categories.map(category =>
                                    <tr>
                                        <td>
                                            <img style={{width: '100px'}} src={category.image}
                                                 alt={category.category}/>
                                        </td>
                                        <td>
                                            <div style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                                margin: '5px'
                                            }}>
                                                {category.category}
                                                <Button
                                                    onClick={() => handleDeleteCategory(category)}
                                                    variant={'outline-danger'}>Видалити</Button>
                                            </div>
                                        </td>
                                    </tr>
                                )
                                }
                                </tbody>
                            </Table>
                        </Tab.Pane>

                        {/*//типи*/}
                        <Tab.Pane eventKey="types">

                            <Button onClick={() => setTypeVisible(true)}
                                    variant={'success'}>+ Cтворити</Button>

                            <CreateType show={typeVisible}
                                        onHide={() => setTypeVisible(false)}/>

                            <Table style={{fontFamily: '\'Nunito\', sans-serif'}}>
                                <thead>
                                <tr>
                                    <th>Тип</th>
                                </tr>
                                </thead>
                                <tbody>
                                {types.map(type =>
                                    <tr>
                                        <td>
                                            <div style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                                margin: '5px'
                                            }}>
                                                {type.type}
                                                <Button onClick={() => handleDeleteType(type)}
                                                        variant={'outline-danger'}>Видалити</Button>
                                            </div>
                                        </td>
                                    </tr>
                                )
                                }
                                </tbody>
                            </Table>
                        </Tab.Pane>
                    </Tab.Content>
                </Col>
            </Row>
        </Tab.Container>

    );
}

export {AdminKatalog}