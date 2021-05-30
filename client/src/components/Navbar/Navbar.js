import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Register from "../../Pages/Institute/Register/Register";

import {
  Navbar,
  NavDropdown,
  Nav,
  Form,
  Button,
  FormControl,
} from "react-bootstrap";

const NavBar = () => {
  return (
    <Router>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/">SpeEdLabs</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="mr-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link href="/admin/register">Register</Nav.Link>
            <Nav.Link href="/admin/login">Login</Nav.Link>
            <NavDropdown title="Products" id="navbarScrollingDropdown">
              <NavDropdown.Item href="/admin/products">
                View Products
              </NavDropdown.Item>
              <NavDropdown.Item href="/admin/">
                Create Products
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">
                Another Products
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form className="d-flex">
            <FormControl
              type="search"
              placeholder="Search"
              className="mr-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
    </Router>
  );
};

export default NavBar;
