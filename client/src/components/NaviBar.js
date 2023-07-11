import {Button, Nav, Navbar} from "react-bootstrap";

const NaviBar = () => {
    return (
        <Navbar className="p-2" collapseOnSelect expand="lg" bg="dark" variant="dark" sticky="top">
            <Navbar.Brand href="/">
                <img src="https://i.pinimg.com/564x/39/f2/84/39f284be821b93c1a9cf2fd6325c96ac.jpg" width="50"
                     height="50" alt="logo"/>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
            <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end " >
                <Nav>
                    <Nav.Link href="/about"><h5>Про Нас</h5></Nav.Link>
                    <Nav.Link href="/#menu"><h5>Меню</h5></Nav.Link>
                    <Nav.Link href="/about#delivery"><h5>Доставка</h5></Nav.Link>
                    <Nav.Link href="/hookah"><h5>Кальяни</h5></Nav.Link>
                </Nav>
            </Navbar.Collapse>
            <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
                <Button href="/about#reserve" variant="outline-danger">Забронювати</Button>
            </Navbar.Collapse>

        </Navbar>

    );
}

export {NaviBar}