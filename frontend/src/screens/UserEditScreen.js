import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button } from 'react-bootstrap';

import Message from '../components/message';
import Loader from '../components/loader';
import { getUserDetails, updateUser } from '../actions/userAction';
import FormContianer from '../components/FormContainer';
import { USER_UPDATE_RESET } from '../actions/actionTypes';

const UserEditScreen = (props) => {
    const userId = props.match.params.id;
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

    const dispatch = useDispatch();

    const userDts = useSelector(state => state.userDetails);
    const { user } = userDts;

    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = useSelector(state => state.userUpdate);

    useEffect(() => {
        if (successUpdate) {
            dispatch({
                type: USER_UPDATE_RESET
            });
            props.history.push('/admin/userlist');
        } else {
            if (user._id !== userId || !user.name) {
                dispatch(getUserDetails(userId));
            }
            else {
                setName(user.name);
                setEmail(user.email);
                setIsAdmin(user.isAdmin);
            }
        }

    }, [dispatch, user, userId, successUpdate, props.history])

    const submitHandler = (event) => {
        event.preventDefault();
        dispatch(updateUser({
            _id: userId,
            name,
            email,
            isAdmin
        }));
    }

    return (
        <>
            <Link to='/admin/userlist' className='btn btn-light my-3'>Go Back</Link>

            <FormContianer>
                <h1>Edit User</h1>
                {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant='dangaer'>{errorUpdate}</Message>}
                {
                    userDts.loading
                        ? <Loader />
                        : userDts.error
                            ? <Message variant='danger'>{userDts.error}</Message>
                            : (
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

                                    <Form.Group controlId='isAdmin'>
                                        <Form.Check
                                            type='checkbox'
                                            label='isAdmin'
                                            checked={isAdmin}
                                            onChange={(e) => setIsAdmin(e.target.checked)}
                                        >
                                        </Form.Check>
                                    </Form.Group>

                                    <Button type='submit' variant='primary' >Update</Button>
                                </Form>
                            )
                }

            </FormContianer>
        </>
    )
}

export default UserEditScreen;
