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

    const {loading, error} = useSelector(state => state.authReducer);
    const {registerError} = useSelector(state => state.usersReducer);
    const LogIn = location.pathname.includes('/logIn');
    const isAdmin = location.pathname.includes('/admin');
    const isRegister = location.pathname.includes('/registration');


    const submit = useCallback(async (data) => {
        try {
            if (LogIn || isAdmin) {
                const res = await dispatch(authActions.logIn({
                    user: {
                        email: data.email,
                        password: data.password
                    }
                }))
                if (res.meta.requestStatus === 'fulfilled' && LogIn) {
                    navigate('/')
                } else if (res.meta.requestStatus === 'fulfilled' && isAdmin) window.location.reload();

            } else {
                const res = await dispatch(usersActions.registerUser({
                    user: {
                        name: data.name,
                        email: data.email,
                        password: data.password
                    }
                }))
                if (res.meta.requestStatus === 'fulfilled') navigate('/logIn')
            }
        } catch (e) {
            console.log("catch e: ", e);
        }
    }, [dispatch, error, authActions, usersActions, LogIn, navigate])


    return (
        <Container className="authPage container"
                   style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
            <Card className="authPage card">
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
                    {isRegister ?
                        <>
                            <Form.Control
                                className="mt-3"
                                type="password"
                                placeholder="Введіть ваш пароль..."
                                {...register('password', {required: true})}
                            />
                            <Form.Text id="password" muted>
                                Ваш пароль повинен містити не менше 8-ми символів,літери великого та малого регістру
                                та цифри.
                            </Form.Text>
                        </>
                        :
                        <Form.Control
                            className="mt-3"
                            type="password"
                            placeholder="Введіть ваш пароль..."
                            {...register('password', {required: true})}
                        />

                    }
                    {/*{!LogIn ?*/}
                    {/*    <Form.Control*/}
                    {/*        className="mt-3"*/}
                    {/*        placeholder="Підтвердіть пароль..."*/}
                    {/*        type="password"*/}
                    {/*        {...register('password', {required: true})}*/}
                    {/*    /> : null*/}
                    {/*}*/}

                    <div className="mt-3 loginOrRegister" style={{alignItems: "center"}}>
                        <div>
                            {loading ? <Spinner/> : <Button variant={"outline-success"} type='submit'>
                                {isRegister ? 'Зареєструватися' : 'Увійти'}
                            </Button>}
                        </div>
                        <div style={{display: "flex", justifyContent: "end"}}>
                            {!isAdmin ?
                                (LogIn ?
                                        <div style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            marginRight: "5px",
                                            alignItems: "center"
                                        }}>
                                            Немає акаунту? <NavLink to={'/registration'}>Зареєструватися</NavLink>
                                        </div>
                                        :
                                        <div style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            marginRight: "15px",
                                            alignItems: "center"
                                        }}>
                                            Є акаунт? <NavLink to={'/logIn'}>Увійти</NavLink>
                                        </div>
                                ) : null
                            }
                        </div>
                    </div>

                </Form>
            </Card>
        </Container>
    );
}

export {AuthPage}