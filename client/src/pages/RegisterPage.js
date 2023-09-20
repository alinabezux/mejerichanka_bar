import {Alert, Button, Card, Container, Form, Spinner} from "react-bootstrap";
import {NavLink, useLocation, useNavigate, useSearchParams} from "react-router-dom";
import {useCallback, useState} from "react";
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";

import {authActions, usersActions} from "../redux";
import {joiResolver} from "@hookform/resolvers/joi";
import {userValidator} from "../validators";

const RegisterPage = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {handleSubmit, register, formState: {errors}} = useForm({
        resolver: joiResolver(userValidator.newUserValidator),
        mode: 'all'
    });

    const [passwordError, setPasswordError] = useState(null);

    const {loading, registerError} = useSelector(state => state.usersReducer);

    const submit = useCallback(async (data) => {
            try {
                if (data.password === data.confirmPassword) {
                    const res = await dispatch(usersActions.registerUser({
                        user: {
                            name: data.name,
                            email: data.email,
                            password: data.password
                        }
                    }))
                    if (res.meta.requestStatus === 'fulfilled') navigate('/logIn')
                } else {
                    console.log('Паролі не співпадають!')
                    setPasswordError('Паролі не співпадають!')
                }
            } catch (e) {
                console.log("catch e: ", e);
            }
        }, [dispatch, usersActions, navigate]
    )


    return (
        <Container className="authPage container"
                   style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
            <Card className="authPage card">
                <h2 className="m-auto">Зареєструватися</h2>
                {(registerError &&
                        <Alert style={{marginTop: "15px"}}
                               variant={"danger"}>{registerError.message}</Alert>) ||
                    (passwordError && <Alert style={{marginTop: "15px"}} variant={"danger"}>{passwordError}</Alert>)
                }

                <Form onSubmit={handleSubmit(submit)}
                      style={{
                          display: "flex",
                          flexDirection: "column"
                      }}>
                    {errors.name &&
                        <Alert style={{marginTop: "15px"}} variant={"danger"}>{errors.name.message}</Alert>}
                    <Form.Control
                        className="mt-3"
                        type="text"
                        placeholder="Введіть ваше ім'я"
                        {...register('name', {required: true})}
                    />

                    {errors.email &&
                        <Alert style={{marginTop: "15px"}} variant={"danger"}>{errors.email.message}</Alert>
                    }
                    <Form.Control
                        className="mt-3"
                        type="text"
                        placeholder="Введіть ваш email..."
                        {...register('email', {required: true})}
                    />

                    {errors.password &&
                        <Alert style={{marginTop: "15px"}} variant={"danger"}>{errors.password.message}</Alert>
                    }
                    <Form.Control
                        className="mt-3"
                        type="password"
                        placeholder="Введіть ваш пароль..."
                        {...register('password', {required: true})}
                    />

                    {errors.confirmPassword &&
                        <Alert style={{marginTop: "15px"}} variant={"danger"}>{errors.confirmPassword.message}</Alert>}
                    <Form.Control
                        className="mt-3"
                        type="password"
                        placeholder="Підтвердіть ваш пароль..."
                        {...register('confirmPassword', {required: true})}
                    />

                    <div className="mt-3 loginOrRegister" style={{alignItems: "center"}}>
                        <div>
                            {loading ? <Spinner/> :
                                <Button variant={"outline-success"} type='submit'>Зареєструватися</Button>}
                        </div>

                        <div style={{display: "flex", justifyContent: "end"}}>
                            <div style={{
                                display: "flex",
                                flexDirection: "column",
                                marginRight: "15px",
                                alignItems: "center"
                            }}>
                                Є акаунт? <NavLink to={'/logIn'}>Увійти</NavLink>
                            </div>
                        </div>
                    </div>
                </Form>
            </Card>
        </Container>
    );
}

export {RegisterPage}