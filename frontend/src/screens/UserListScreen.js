import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Button } from 'react-bootstrap';

import Message from '../components/message';
import Loader from '../components/loader';

import { listUsers, deleteUser } from '../actions/userAction';

const UserListScreen = ({ history }) => {
    const dispatch = useDispatch();
    const { loading, error, users } = useSelector(state => state.userList);
    const { userInfo } = useSelector(state => state.userLogin);
    const { success: successDelete } = useSelector(state => state.userDelete);

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listUsers());
        }
        else {
            history.push('/login')
        }
    }, [dispatch, history, userInfo, successDelete]);

    const deleteUserHandler = (userId) => {
        if (window.confirm('Are you sure..?')) {

            dispatch(deleteUser(userId));
        }
    }
    return (
        <>
            <h1>Users</h1>
            {
                loading
                    ? <Loader />
                    : error
                        ? <Message variant='danger'>{error}</Message>
                        : (
                            <Table striped bordered hover responsive className='table-sm'>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>NAME</th>
                                        <th>EMAIL</th>
                                        <th>ADMIN</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        users.map(user => (
                                            <tr key={user._id}>
                                                <td>{user._id}</td>
                                                <td>{user.name}</td>
                                                <td>
                                                    <a href={`emailto=${user.email}`}> user.email</a>
                                                </td>
                                                <td>
                                                    {
                                                        user.isAdmin
                                                            ? (<i className='fas fa-check' style={{ color: 'greeen' }}></i>)
                                                            : (<i className='fas fa-times' style={{ color: 'red' }}></i>)
                                                    }
                                                </td>
                                                <td>
                                                    <LinkContainer to={`/admin/user/${user._id}/edit`}>
                                                        <Button variant='light' className='btn-sm'>
                                                            <i className='fas fa-edit'></i>
                                                        </Button>
                                                    </LinkContainer>
                                                    <Button
                                                        variant='danger'
                                                        className='btn-sm'
                                                        onClick={() => deleteUserHandler(user._id)}
                                                    >
                                                        <i className='fas fa-trash'></i>
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </Table>
                        )
            }
        </>
    )
}

export default UserListScreen
