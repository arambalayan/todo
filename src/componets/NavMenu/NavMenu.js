import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import styles from './navMenuStyle.module.css';

export default function NavMenu() {
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="/">ToDo</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink to='/'
                            exact
                            activeClassName={styles.activePage}
                            className={styles.navLink}
                        >
                            Home
                        </NavLink>
                        <NavLink
                            to='/about'
                            exact
                            activeClassName={styles.activePage}
                            className={styles.navLink}
                        >
                            About
                        </NavLink>
                        <NavLink
                            to='/contact'
                            exact
                            className={styles.navLink}
                            activeClassName={styles.activePage}
                        >
                            Contact
                        </NavLink>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}