import {Alert, Button, Card, Container, Form, Spinner} from "react-bootstrap";
import {NavLink, useLocation, useNavigate, useSearchParams} from "react-router-dom";
import {useCallback} from "react";
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";

import {authActions} from "../redux";


const LogInPage = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [query] = useSearchParams();
    const {handleSubmit, register} = useForm();

    const {loading, error} = useSelector(state => state.authReducer);

    const LogIn = location.pathname.includes('/logIn');
    const isAdmin = location.pathname.includes('/admin');

    const submit = useCallback(async (data) => {
        try {
            const res = await dispatch(authActions.logIn({
                user: {
                    email: data.email,
                    password: data.password
                }
            }))
            if (res.meta.requestStatus === 'fulfilled' && LogIn) navigate('/')
            else if (res.meta.requestStatus === 'fulfilled' && isAdmin) window.location.reload();
        } catch (e) {
            console.log("catch e: ", e);
        }
    }, [dispatch, authActions, error, LogIn, isAdmin, navigate])


    return (
        <Container className="authPage container"
                   style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
            <Card className="authPage card">
                <h2 className="m-auto">Увійти</h2>
                {query.has('expSession') && <Alert className="mt-3" variant={"danger"}>Сесія закінчилась!</Alert>}

                {(error && <Alert style={{marginTop: "15px"}} variant={"danger"}>{error.message}</Alert>)}

                <Form onSubmit={handleSubmit(submit)}
                      style={{
                          display: "flex",
                          flexDirection: "column"
                      }}>

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

                    <div className="mt-3 loginOrRegister" style={{alignItems: "center"}}>
                        <div>
                            {loading ? <Spinner/> : <Button variant={"outline-success"} type='submit'>Увійти</Button>}
                        </div>
                        <div style={{display: "flex", justifyContent: "end"}}>
                            {!isAdmin ?
                                <div style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    marginRight: "5px",
                                    alignItems: "center"
                                }}>
                                    Немає акаунту? <NavLink to={'/registration'}>Зареєструватися</NavLink>
                                </div> : null
                            }
                        </div>
                    </div>
                </Form>
            </Card>
        </Container>
    );
}

export {LogInPage}