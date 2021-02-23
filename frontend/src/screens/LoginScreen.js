import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Form, Button } from 'react-bootstrap';

import Message from '../components/message';
import Loader from '../components/loader';
import { login } from '../actions/userAction';
import FormContianer from '../components/FormContainer';

const LoginScreen = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();

    const userLogin = useSelector(state => state.userLogin);

    const redirect = props.location.search ? props.location.search.split('=')[1] : '/';

    useEffect(() => {
        if (userLogin.userInfo) {
            props.history.push(redirect);
        }
    }, [props.history, userLogin.userInfo, redirect])

    const submitHandler = (event) => {
        event.preventDefault();
        dispatch(login(email, password));
    }

    return (
        <FormContianer>
            <h1>Sign In</h1>
            { userLogin.error && <Message variant='danger'>{userLogin.error}</Message>}
            { userLogin.loading && <Loader />}
            <Form onSubmit={submitHandler}>

                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder="enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label>Password </Form.Label>
                    <Form.Control
                        type='password'
                        placeholder="enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary' >Sign In</Button>

            </Form>
            <Row className='py-3'>
                <Col>
                    New Customer?
                    <Link to=
                        {
                            redirect
                                ? `/register?redirect=${redirect}`
                                : '/register'
                        }
                    >
                        Register</Link>
                </Col>
            </Row>
        </FormContianer>
    )
}

export default LoginScreen;
