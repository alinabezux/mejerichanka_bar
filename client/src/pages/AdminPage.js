import {Alert, Button, Container, Tab, Tabs} from "react-bootstrap";
import {useEffect, useState} from "react";

import {AdminClients, AdminKatalog, AdminOrders} from "../components";
import {RegisterPage} from "./RegisterPage";
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
                <Button href="/" style={{margin: "5px"}}> ⬅️На головну</Button>
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
                <RegisterPage/>
            </Container>
    );
}

export {AdminPage}