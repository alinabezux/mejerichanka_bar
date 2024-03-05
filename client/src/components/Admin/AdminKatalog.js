import {Col, Nav, Row, Tab} from "react-bootstrap";
import {CategoriesTab, NewsTab, ProductsTab, TypesTab} from "./AdminKatalogTabs";


const AdminKatalog = () => {

    return (
        <Tab.Container defaultActiveKey="products">
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
                        <Nav.Item>
                            <Nav.Link eventKey="news">Новинки</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Col>

                <Col sm={9}>
                    <Tab.Content>
                        <ProductsTab/>
                        <CategoriesTab/>
                        <TypesTab/>
                        <NewsTab/>
                    </Tab.Content>
                </Col>
            </Row>
        </Tab.Container>

    );
}

export {AdminKatalog}