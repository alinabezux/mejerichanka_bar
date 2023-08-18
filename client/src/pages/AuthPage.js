import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {useForm} from "react-hook-form";
import {usersActions} from "../redux";

const AuthPage = () => {

    const location = useLocation();
    const {handleSubmit, register} = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const LogIn = location.pathname.includes('/logIn');


    const click = async (data) => {
        try {
            if (LogIn) {
                document.write('привыт')
            } else {
                await dispatch(usersActions.registerUser({
                    user: {
                        name: data.name,
                        email: data.email,
                        password: data.password
                    }
                }))
                navigate('/logIn');
            }
        } catch (e) {
            console.log(e);
        }
    }


    return (
        <Container
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Card style={{width: 600}} className="m-5 p-5">
                <h2 className="m-auto">{LogIn ? 'Увійти' : 'Зареєструватися'}</h2>
                <Form onSubmit={handleSubmit(click)}
                      style={{
                          display: "flex",
                          flexDirection: "column"
                      }}
                >
                    {!LogIn ?
                        <Form.Control
                            className="mt-3"
                            type="text"
                            placeholder="Введіть ваше ім'я"
                            {...register('name', {required: true})}
                        /> : null
                    }
                    <Form.Control
                        className="mt-3"
                        type="text"
                        placeholder="Введіть ваш email..."
                        {...register('email', {required: true})}
                    />
                    <Form.Control
                        className="mt-3"
                        type="password"
                        placeholder="Введіть ваш пароль..."
                        {...register('password', {required: true})}
                    />
                    {/*{!LogIn ?*/}
                    {/*    <Form.Control*/}
                    {/*        className="mt-3"*/}
                    {/*        placeholder="Підтвердіть пароль..."*/}
                    {/*        type="password"*/}
                    {/*        {...register('password', {required: true})}*/}
                    {/*    /> : null*/}
                    {/*}*/}
                    <Row className="mt-3" style={{alignItems: "center"}}>
                        <Col>
                            <Button variant={"outline-success"} type='submit'>
                                {LogIn ? 'Увійти' : 'Зареєструватися'}
                            </Button>
                        </Col>
                        <Col>
                            {LogIn ?
                                <div>
                                    Немає акаунту? <NavLink to={'/registration'}>Зареєструватися</NavLink>
                                </div>
                                :
                                <div>
                                    Є акаунт? <NavLink to={'/logIn'}>Увійти</NavLink>
                                </div>
                            }
                        </Col>
                    </Row>

                </Form>
            </Card>
        </Container>
    );
}

export {AuthPage}