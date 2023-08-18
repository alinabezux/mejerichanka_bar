import {Button, Nav, Navbar} from "react-bootstrap";
import basket from '../assets/backet.png'
import {useState} from "react";
import {Basket} from "./Basket";

const NaviBar = () => {

    const [show, setShow] = useState(false);

    return (
        <Navbar className="p-2" collapseOnSelect expand="lg" variant="dark" sticky="top">

            <Navbar.Toggle aria-controls="responsive-navbar-nav"/>

            <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-center">

                <Nav className="navbar-links">
                    <Nav.Link href="/about"><h5>Про Нас</h5></Nav.Link>
                    <Nav.Link href="/#menu"><h5>Меню</h5></Nav.Link>
                    <Nav.Link href="/about#delivery"><h5>Доставка</h5></Nav.Link>
                    <Nav.Link href="/hookah"><h5>Кальяни</h5></Nav.Link>
                </Nav>

                <Button className="btn-reserv m-1" href="/about#reserve" variant="outline-danger">Забронювати</Button>
                <Button className='m-1'
                        variant="dark">
                    <img style={{width: '28px'}} src={basket} alt="basket"
                         onClick={() => setShow(true)}/>
                </Button>

                <Basket show={show}
                        onHide={() => setShow(false)}/>

            </Navbar.Collapse>
            <Basket/>
        </Navbar>
    );
}

export {NaviBar}