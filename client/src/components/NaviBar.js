import {Button, Container, Nav, Navbar} from "react-bootstrap";
import basket from '../assets/backet.png'
import {useState} from "react";
import {Basket} from "./Basket";
import {useEffect} from "react";
import {authService} from "../services";

const NaviBar = () => {
    const [userId, setUserId] = useState(null);
    const [show, setShow] = useState(false);

    useEffect(() => {
        const user = authService.getUser();
        if (user) {
            setUserId(user);
        }
    }, [])

    return (
        <Navbar collapseOnSelect expand="md" variant="dark" sticky="top">
            <Navbar.Toggle className="navbar-toggle" style={{marginLeft: "10px"}}
                           aria-controls="responsive-navbar-nav"/>

            <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-center">

                <Nav className="navbar-links">
                    <Nav.Link href="/about"><h5>Про Нас</h5></Nav.Link>
                    <Nav.Link href="/#menu"><h5>Меню</h5></Nav.Link>
                    <Nav.Link href="/about#delivery"><h5>Доставка</h5></Nav.Link>
                    <Nav.Link href="/hookah"><h5>Кальяни</h5></Nav.Link>
                </Nav>
            </Navbar.Collapse>
            <div className="buttons-navibar" style={{marginRight: "10px"}}>
                {(userId === "64ebcc062df84346e2bbadbb") ?
                    <Button href="/admin" variant="outline-light"
                            style={{margin: "5px"}}>Admin</Button> :
                    <Button className="btn-reserv" href="/about#reserve"
                            variant="outline-danger">Забронювати</Button>
                }
                <Button style={{marginRight: "7px", marginLeft: "5px"}}
                        variant="dark" onClick={() => setShow(true)}>
                    <img style={{width: '28px'}} src={basket} alt="basket"/>
                </Button>
            </div>
            <Basket show={show}
                    onHide={() => setShow(false)}/>
        </Navbar>
    );
}

export {NaviBar}