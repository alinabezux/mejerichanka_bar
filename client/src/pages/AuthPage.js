import {Alert, Button, Card, Col, Container, Form, Row, Spinner} from "react-bootstrap";
import {NavLink, useLocation, useNavigate, useSearchParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import {authActions, usersActions} from "../redux";
import {useCallback} from "react";

const AuthPage = () => {

    const location = useLocation();
    const {handleSubmit, register} = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [query] = useSearchParams();
    // debugger

    const {loading, error} = useSelector(state => state.authReducer);
    const {registerError} = useSelector(state => state.usersReducer);
    const LogIn = location.pathname.includes('/logIn');
    const isAdmin = location.pathname.includes('/admin');
    const isRegister = location.pathname.includes('/registration');


    const submit = useCallback(async (data) => {
        // debugger
        try {
            if (LogIn || isAdmin) {
                const res = await dispatch(authActions.logIn({
                    user: {
                        email: data.email,
                        password: data.password
                    }
                }))
                console.log("submit error: ", error)
                console.log("submit res: ", res)
                if (res.meta.requestStatus === 'fulfilled' && LogIn) {
                    navigate('/')
                } else navigate('/admin')
            } else {
                const res = await dispatch(usersActions.registerUser({
                    user: {
                        name: data.name,
                        email: data.email,
                        password: data.password
                    }
                }))
                console.log("submit res: ", res)
                if (res.meta.requestStatus === 'fulfilled') navigate('/logIn')
            }
        } catch (e) {
            console.log("catch e: ", e);
        }
    }, [dispatch, error, authActions, usersActions, LogIn, navigate])


    return (
        <Container
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Card style={{width: 600}} className="m-5 p-5">
                <h2 className="m-auto">{(LogIn || isAdmin) ? 'Увійти' : 'Зареєструватися'}</h2>
                {query.has('expSession') && <Alert className="mt-3" variant={"danger"}>Сесія закінчилась!</Alert>}

                {(LogIn || isAdmin) ?
                    (error && <Alert style={{marginTop: "15px"}} variant={"danger"}>{error.message}</Alert>) :
                    (registerError &&
                        <Alert style={{marginTop: "15px"}} variant={"danger"}>{registerError.message}</Alert>)
                }

                <Form onSubmit={handleSubmit(submit)}
                      style={{
                          display: "flex",
                          flexDirection: "column"
                      }}
                >
                    {isRegister ?
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
                            {loading ? <Spinner/> : <Button variant={"outline-success"} type='submit'>
                                {isRegister ? 'Зареєструватися' : 'Увійти'}
                            </Button>}
                        </Col>
                        <Col>
                            {!isAdmin ?
                                (LogIn ?
                                        <div>
                                            Немає акаунту? <NavLink to={'/registration'}>Зареєструватися</NavLink>
                                        </div>
                                        :
                                        <div>
                                            Є акаунт? <NavLink to={'/logIn'}>Увійти</NavLink>
                                        </div>
                                ) : null
                            }
                        </Col>
                    </Row>

                </Form>
            </Card>
        </Container>
    );
}

export {AuthPage}