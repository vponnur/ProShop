import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Form, Button, Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import Message from '../components/message';
import Loader from '../components/loader';
import { getUserDetails, udpateUserProfile } from '../actions/userAction';
import { listMyOrders } from '../actions/orderActions';

const ProfileScreen = (props) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null);

    const dispatch = useDispatch();

    const userDts = useSelector(state => state.userDetails);
    const userLogin = useSelector(state => state.userLogin);
    const userUP = useSelector(state => state.userUpdateProfile);
    const userOrderList = useSelector(state => state.orderMyList);

    useEffect(() => {
        if (!userLogin.userInfo) {
            props.history.push('/login');
        }
        else {
            if (!userDts.user.name) {
                dispatch(getUserDetails('profile'));
                dispatch(listMyOrders());
            } else {
                setName(userDts.user.name);
                setEmail(userDts.user.email);
            }
        }
    }, [dispatch, props.history, userLogin.userInfo, userDts])

    const submitHandler = (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            setMessage('Password doesnt match');
        }
        else {
            dispatch(udpateUserProfile({
                id: userDts.user._id,
                name,
                email,
                password
            }));
        }
    }

    return <Row>
        <Col md={3}>
            <h2>User Profile</h2>

            {message && <Message variant='danger'>{message}</Message>}
            {userDts.error && <Message variant='danger'>{userDts.error}</Message>}
            {userUP.success && <Message variant='success'>Profile updated</Message>}

            {userDts.loading && <Loader />}
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

                <Button type='submit' variant='primary' >Update</Button>

            </Form>
        </Col>
        <Col md={9}>
            <h2>My Orders</h2>
            {
                userOrderList.loading
                    ? <Loader />
                    : userOrderList.error
                        ? <Message variant='danger'>{userOrderList.error}</Message>
                        : (
                            <Table striped bordered hover responsive className='table-sm'>
                                <thead>
                                    <tr>
                                        <td>ID</td>
                                        <td>DATE</td>
                                        <td>TOTAL</td>
                                        <td>PAID</td>
                                        <td>DELIVERED</td>
                                        <td></td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        userOrderList.orders.map(order => (
                                            <tr key={order._id}>
                                                <td>{order.createdAt.substring(0, 10)}</td>
                                                <td>{order.totalPrice}</td>
                                                <td>{order.isPaid
                                                    ? order.paidAt.substring(0, 10)
                                                    : (<i className='fas fa-times' style={{ color: 'red' }}></i>)}</td>
                                                <td>{order.isDelivered
                                                    ? order.deliveredAt.substring(0, 10)
                                                    : (<i className='fas fa-times' style={{ color: 'red' }}></i>)}</td>
                                                <td>
                                                    <LinkContainer
                                                        to={`/orders/${order._id}`}>
                                                        <Button className='btn-sm' variant='light'>Details</Button>
                                                    </LinkContainer>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </Table>
                        )
            }
        </Col>
    </Row>
}

export default ProfileScreen;
