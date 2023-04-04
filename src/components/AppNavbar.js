import Container from 'react-bootstrap/Container';
import { Fragment, useState, useContext } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link, NavLink } from 'react-router-dom';
import UserContext from '../UserContext';

export default function AppNavbar() {

	const { user } = useContext(UserContext);

	return (
		<Navbar bg="light" variant="light" expand="lg">
	       <Container fluid>
	         <Navbar.Brand href="#home">Zuitt Booking</Navbar.Brand>
	         <Navbar.Toggle aria-controls="basic-navbar-nav"/>
	         <Navbar.Collapse id="basic-navbar-nav">
	         	<Nav className="ml-auto">
		           	<Nav.Link as={NavLink} to="/" exact>Home</Nav.Link>
		           	<Nav.Link as={NavLink} to="/products" exact>Products</Nav.Link>
		           	{(user.id !== null) ?
		           		<Nav.Link as={NavLink} to="/logout" exact>Logout</Nav.Link>
		           		:
		           		<Fragment>
		           			<Nav.Link as={NavLink} to="/login" exact>Login</Nav.Link>
		           			<Nav.Link as={NavLink} to="/register" exact>Register</Nav.Link>
		           		</Fragment>
		           	}
	         	</Nav>
	         </Navbar.Collapse>
	       </Container>
		</Navbar>
	)
}