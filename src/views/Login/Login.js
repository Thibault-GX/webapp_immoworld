import React, {useCallback} from 'react'
import validationFormLogin from './ValidationFormLogin';
import TextFiled from './TextFiled';
import { Formik, Form } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import {login} from '../../Store/AuthAction'
import { Button, Message } from 'rsuite';
import {Redirect} from "react-router-dom";
import './login.css';

function Login() {
    const state = useSelector(state => state)
    const dispatch = useDispatch()
    const isloading = state.loading;
    const isAuth = state.islogged;
    const isError = state.error;

    const redirect = isAuth ? <Redirect to="/home"/> : null;

    const handleSubmit = useCallback(
        (values) => {
            dispatch(login(values));
        },
        [dispatch],
    )
  

    return (
        <div className="Login">
            {redirect}

            <div className="Connection">
                <Formik
                    initialValues ={{
                        email: "",
                        password: "",
                    }}
                    validationSchema={validationFormLogin}
                    onSubmit={values => handleSubmit(values)}
                >
                    {formik => (
                        <div className="Connection">
                            <h1 className="Titlelogin" >Connexion</h1>
                            <Form className="FormConnection">
                                <TextFiled type='text' label='Email :' name='email' id='email' className="InputConnection"/>   
                                <TextFiled type='password' label='Mot de passe :' name='password' id='password' className="InputConnection"/>   
                                <Button className="buttonLoging" appearance="primary" loading={isloading} type="submit" >Se connecter</Button>
                                {isError ?          
                                <Message
                                    showIcon
                                    type="error"
                                    title={isError.message}
                                /> : null
                            }
                            </Form>
                        </div>
                    )}
                </Formik>
                
            </div>
        </div>
    )
}

export default Login

