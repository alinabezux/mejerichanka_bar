import {Button, Nav, Navbar} from "react-bootstrap";

const NaviBar = () => {
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky="top">
            <Navbar.Brand>Межирічанка
                <img src="/client/public/logo.svg" alt="logo"/>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
            <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-between">
                <Nav>

                    <Nav.Link href="/about">Про Нас</Nav.Link>
                    <Nav.Link href="/menu">Меню</Nav.Link>
                    <Nav.Link href="/about/delivery">Доставка</Nav.Link>
                    <Nav.Link href="/hookah">Кальяни</Nav.Link>
                </Nav>
                <Button href="/about/reserve" variant="outline-danger" className="me-3">Забронювати</Button>
            </Navbar.Collapse>
        </Navbar>
    );
}

export {NaviBar}