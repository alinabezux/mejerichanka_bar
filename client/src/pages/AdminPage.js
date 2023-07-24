import {Button, Col, Container, Row, Tab, Tabs, Nav, Table} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {categoriesActions, productsActions, typesActions} from "../redux";

const AdminPage = () => {

    const dispatch = useDispatch();
    const {products} = useSelector(state => state.productsReducer);
    const {categories} = useSelector(state => state.categoriesReducer);
    const {types} = useSelector(state => state.typesReducer);


    useEffect(() => {
        dispatch(productsActions.getAll({}))
        dispatch(categoriesActions.getAll())
        dispatch(typesActions.getAll())
    }, [dispatch]);

    return (
        <Container style={{margin: '15px', fontFamily: '\'Nunito\', sans-serif'}}>
            <Tabs
                defaultActiveKey="orders"
                id="uncontrolled-tab-example"
                className="mb-3"
            >
                <Tab eventKey="orders" title="Замовлення">
                    Замовлення
                </Tab>
                <Tab eventKey="clients" title="Клієнти">
                    Клієнти
                </Tab>
                <Tab eventKey="catalogue" title="Каталог">
                    <Tab.Container id="left-tabs-example" defaultActiveKey="first">
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
                                    <Tab.Pane eventKey="products">
                                        <Button variant={'success'}>+ Cтворити</Button>
                                        <Table style={{fontFamily: '\'Nunito\', sans-serif'}}>
                                            <thead>
                                            <tr>
                                                <th>Фото</th>
                                                <th>Назва</th>
                                                <th>Ціна</th>
                                                <th></th>
                                                <th></th>
                                                <th></th>
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
                                                        <div style={{display: 'flex',flexDirection:'column', justifyContent: 'space-evenly'}}>
                                                            <Button>Редагувати</Button>
                                                            <Button variant={'outline-danger'}>Видалити</Button>
                                                        </div>
                                                    </tr>
                                                )
                                            }
                                            </tbody>
                                        </Table>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="categories">
                                        <Button variant={'success'}>+ Cтворити</Button>
                                        <Table style={{fontFamily: '\'Nunito\', sans-serif'}}>
                                            <thead>
                                            <tr>
                                                <th>Фото</th>
                                                <th>Категорія</th>
                                                <th></th>
                                                <th></th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {
                                                categories.map(category =>
                                                    <tr>
                                                        <td>
                                                            <img style={{width: '100px'}} src={category.image}
                                                                 alt={category.category}/>
                                                        </td>
                                                        <td>{category.category}</td>
                                                        <div style={{display: "flex", justifyContent: 'space-evenly'}}>
                                                            <Button>Редагувати</Button>
                                                            <Button variant={'outline-danger'}>Видалити</Button>
                                                        </div>
                                                    </tr>
                                                )
                                            }
                                            </tbody>
                                        </Table>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="types">
                                        <Button variant={'success'}>+ Cтворити</Button>
                                        <Table style={{fontFamily: '\'Nunito\', sans-serif'}}>
                                            <thead>
                                            <tr>
                                                <th>Тип</th>
                                                <th></th>
                                                <th></th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {
                                                types.map(type =>
                                                    <tr>
                                                        <td>{type.type}</td>
                                                        <div style={{display: "flex", justifyContent: 'space-evenly'}}>
                                                            <Button>Редагувати</Button>
                                                            <Button variant={'outline-danger'}>Видалити</Button>
                                                        </div>
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

                </Tab>
            </Tabs>


        </Container>
    );
}

export {AdminPage}