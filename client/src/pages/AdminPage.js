import {Container, Tab, Tabs} from "react-bootstrap";
import {AdminClients, AdminKatalog, AdminOrders} from "../components";

const AdminPage = () => {
    return (
        <Container style={{margin: '15px', fontFamily: '\'Nunito\', sans-serif'}}>
            <Tabs defaultActiveKey="catalogue" className="mb-4">
                <Tab eventKey="orders" title="Замовлення">
                    <AdminOrders/>
                </Tab>

                <Tab eventKey="clients" title="Клієнти">
                    <AdminClients/>
                </Tab>

                <Tab eventKey="catalogue" title="Каталог">
                    <AdminKatalog/>
                </Tab>
            </Tabs>
        </Container>
    );
}

export {AdminPage}