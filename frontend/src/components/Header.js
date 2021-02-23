import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Route } from 'react-router-dom';

import { LinkContainer } from 'react-router-bootstrap';
import { logout } from '../actions/userAction';
import SearchBox from './SearchBox';


const Header = () => {
    const userLogin = useSelector(state => state.userLogin);
    const dispatch = useDispatch();

    const logoutHandler = () => {
        dispatch(logout());
    }
    return (
        <header>
            <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
                <Container>
                    <LinkContainer to='/'>
                        <Navbar.Brand >ProShop</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Route render={({ history }) => <SearchBox history={history} />} />
                        <Nav className="ml-auto">
                            {
                                userLogin.userInfo && userLogin.userInfo.isAdmin
                                &&
                                (
                                    <NavDropdown title='Admin Control' id="adminmenu">

                                        <LinkContainer to='/admin/userlist'>
                                            <NavDropdown.Item>Users</NavDropdown.Item>
                                        </LinkContainer>


                                        <LinkContainer to='/admin/productlist'>
                                            <NavDropdown.Item>Products</NavDropdown.Item>
                                        </LinkContainer>

                                        <LinkContainer to='/admin/orderlist'>
                                            <NavDropdown.Item>Orders</NavDropdown.Item>
                                        </LinkContainer>

                                    </NavDropdown>
                                )
                            }

                            <LinkContainer to='/cart'>
                                <Nav.Link ><i className="fas fa-shopping-cart"></i> Cart</Nav.Link>
                            </LinkContainer>

                            {
                                userLogin.userInfo
                                    ?
                                    (
                                        <NavDropdown title={userLogin.userInfo.name} id="username">
                                            <LinkContainer to='/profile'>
                                                <NavDropdown.Item>Profile</NavDropdown.Item>
                                            </LinkContainer>
                                            <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                                        </NavDropdown>

                                    )
                                    : <LinkContainer to='/login'>
                                        <Nav.Link ><i className="fas fa-user"></i>Sing In</Nav.Link>
                                    </LinkContainer>
                            }

                        </Nav>
                    </Navbar.Collapse>
                </Container>

            </Navbar >
        </header >
    )
}

export default Header
