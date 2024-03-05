import {Button, Nav, Navbar} from "react-bootstrap";
import {useState, useEffect} from "react";

import {authService} from "../services";
import {Basket} from "./Basket";

import basket from '../assets/backet.png'


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
        <>
            <Navbar collapseOnSelect expand="md" variant="dark" sticky="top"
                    style={{width: "100%", position: "absolute"}}>
                <Navbar.Toggle className="navbar-toggle" style={{marginLeft: "10px"}}
                               aria-controls="responsive-navbar-nav"/>

                <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-center">

                    <Nav className="navbar-links">
                        <Nav.Link href="/about"><h5>Про Нас</h5></Nav.Link>
                        <Nav.Link href="/#menu"><h5>Меню</h5></Nav.Link>
                        <Nav.Link href="/news"><h5>Новинки</h5></Nav.Link>
                        <div className="buttons-navibar">
                            {(userId === "64ebcc062df84346e2bbadbb") ?
                                <Button href="/admin" variant="outline-light" className="btn-reserv">Admin</Button> :
                                <Button className="btn-reserv" href="/about#reserve"
                                        variant="outline-danger">Забронювати</Button>
                            }
                            <Button style={{marginRight: "7px", marginLeft: "5px"}} variant="dark"
                                    onClick={() => setShow(true)}>
                                <img style={{width: '28px'}} src={basket} alt="basket"/>
                            </Button>
                        </div>
                    </Nav>

                </Navbar.Collapse>
            </Navbar>
            <Basket show={show} onHide={() => setShow(false)}/>
        </>
    );
}

export {NaviBar}