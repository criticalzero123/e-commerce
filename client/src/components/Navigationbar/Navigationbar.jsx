import React, { useState } from "react";

import { Nav, NavDropdown, Container, Navbar, Row, Col } from "react-bootstrap";

import { useSelector, useDispatch } from "react-redux";

import "./Navigationbar.scss";

import { Link } from "react-router-dom";
import { logoutUser } from "../../actions/userAction";

function Navigationbar() {
  const _cartReducer = useSelector((state) => state.cartReducer);

  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);

  const { cartItems } = _cartReducer;

  const dispatch = useDispatch();

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const outerTextValidation = (selectName) => {
    const routeName = selectName.toLowerCase();

    // To prevent the error when click outside of the letters and returning all the sub categories
    if (routeName.length < 15) {
      return routeName;
    } else {
      return "";
    }
  };

  const sportsRoute = (e) => {
    const selectName = e.target.outerText;

    const validation = outerTextValidation(selectName);

    if (validation.length > 0) {
      if (validation === "sports") {
        window.location.href = `/shop/sports`;
      } else {
        window.location.href = `/shop/sports/${validation}`;
      }
    }
  };

  const travelsRoute = (e) => {
    const selectName = e.target.outerText;

    const validation = outerTextValidation(selectName);

    if (validation.length > 0) {
      if (validation === "travels") {
        window.location.href = `/shop/travels`;
      } else {
        window.location.href = `/shop/travels/${validation}`;
      }
    }
  };

  return (
    <div>
      <Navbar bg="light" expand="lg" className="fixed-top ">
        <Container>
          <Row>
            <Col>
              <Navbar.Brand as={Link} to="/">
                Mathilda.
              </Navbar.Brand>
            </Col>

            <Col lg={{ order: "last" }}>
              <Nav className="ml-auto ">
                <Nav.Item>
                  <Nav.Link as={Link} to="/cart">
                    Cart({cartItems.length})
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>

            <Col>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse
                id="basic-navbar-nav"
                className="justify-content-end"
              >
                <Nav className="me-auto">
                  <Nav.Link as={Link} to="/shop/all">
                    Shop
                  </Nav.Link>
                  <NavDropdown
                    title="Sports"
                    id="sports"
                    show={show}
                    onMouseEnter={() => setShow(!show)}
                    onMouseLeave={() => setShow(false)}
                    onClick={sportsRoute}
                  >
                    <NavDropdown.Item>Running </NavDropdown.Item>
                    <NavDropdown.Item>Basketball</NavDropdown.Item>
                    <NavDropdown.Item>Tennis</NavDropdown.Item>
                    <NavDropdown.Item>Skateboarding</NavDropdown.Item>
                    <NavDropdown.Item>Snorkeling</NavDropdown.Item>
                  </NavDropdown>
                  <NavDropdown
                    title="Travels"
                    id="travels"
                    show={show1}
                    onMouseEnter={() => setShow1(!show1)}
                    onMouseLeave={() => setShow1(false)}
                    onClick={travelsRoute}
                  >
                    <NavDropdown.Item>Tent </NavDropdown.Item>
                    <NavDropdown.Item>Gloves</NavDropdown.Item>
                    <NavDropdown.Item>Jacket</NavDropdown.Item>
                    <NavDropdown.Item>Bag</NavDropdown.Item>
                    <NavDropdown.Item>Boots</NavDropdown.Item>
                  </NavDropdown>

                  <NavDropdown
                    title={
                      currentUser ? `User ` + currentUser.username : `User`
                    }
                    id="basic-nav-dropdown"
                  >
                    {!currentUser && (
                      <div>
                        <NavDropdown.Item as={Link} to="/login">
                          Login
                        </NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/register">
                          Register
                        </NavDropdown.Item>
                      </div>
                    )}

                    {currentUser && (
                      <div>
                        <NavDropdown.Item as={Link} to="/orders">
                          Orders
                        </NavDropdown.Item>
                        <NavDropdown.Item
                          onClick={() => {
                            dispatch(logoutUser());
                          }}
                        >
                          Logout
                        </NavDropdown.Item>
                      </div>
                    )}
                  </NavDropdown>
                </Nav>
              </Navbar.Collapse>
            </Col>
          </Row>
        </Container>
      </Navbar>
    </div>
  );
}

export default Navigationbar;
