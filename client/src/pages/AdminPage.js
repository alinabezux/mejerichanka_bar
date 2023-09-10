import {Alert, Container, Tab, Tabs} from "react-bootstrap";
import {useEffect, useState} from "react";

import {AdminClients, AdminKatalog, AdminOrders} from "../components";
import {AuthPage} from "./AuthPage";
import {authService} from "../services";

const AdminPage = () => {
    const [userId, setUserId] = useState(null);
    useEffect(() => {
        const user = authService.getUser();
        if (user) {
            setUserId(user);
        }
    }, [])


    return ((userId === "64ebcc062df84346e2bbadbb") ?
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
            </Container> :
            <Container>
                <Alert variant={"danger"}>
                    Підтвердіть,що ви адміністратор
                </Alert>
                <AuthPage/>
            </Container>
    );
}

export {AdminPage}