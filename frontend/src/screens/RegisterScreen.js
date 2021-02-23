import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Form, Button } from 'react-bootstrap';

import Message from '../components/message';
import Loader from '../components/loader';
import { userRegister } from '../actions/userAction';
import FormContianer from '../components/FormContainer';

const LoginScreen = (props) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null);

    const dispatch = useDispatch();

    const userReg = useSelector(state => state.userRegister);

    const redirect = props.location.search ? props.location.search.split('=')[1] : '/';

    useEffect(() => {
        if (userReg.userInfo) {
            props.history.push(redirect);
        }
    }, [props.history, userReg.userInfo, redirect])

    const submitHandler = (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            setMessage('Password doesnt match');
        }
        else {
            dispatch(userRegister(name, email, password));
        }
    }

    return (
        <FormContianer>
            <h1>Sign Up</h1>
            { message && <Message variant='danger'>{message}</Message>}
            { userReg.error && <Message variant='danger'>{userReg.error}</Message>}
            { userReg.loading && <Loader />}
            <Form onSubmit={submitHandler}>

                <Form.Group controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder="Enter name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder="Enter e-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label>Password </Form.Label>
                    <Form.Control
                        type='password'
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='confirmPassword'>
                    <Form.Label>confirmPassword </Form.Label>
                    <Form.Control
                        type='password'
                        placeholder="Enter confirm password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary' >Register</Button>

            </Form>
            <Row className='py-3'>
                <Col>
                    Have an account?
                    <Link to=
                        {
                            redirect
                                ? `/login?redirect=${redirect}`
                                : '/login'
                        }
                    >
                        Login</Link>
                </Col>
            </Row>
        </FormContianer>
    )
}

export default LoginScreen;
