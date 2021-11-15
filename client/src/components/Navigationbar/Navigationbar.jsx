import React, { useState } from "react";

import { Nav, NavDropdown, Container, Navbar, Col } from "react-bootstrap";

import { useSelector, useDispatch } from "react-redux";

import "./Navigationbar.scss";

import { FaUser } from "react-icons/fa";

import { Link } from "react-router-dom";
import { logoutUser } from "../../actions/userAction";

import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";

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
          <Col sm={{ span: 0, offset: 0 }}>
            <Navbar.Brand as={Link} to="/">
              Mathilda.
            </Navbar.Brand>
          </Col>

          <Col
            lg={{ order: "last", span: 0, offset: 0 }}
            xs={{ span: 3, offset: 0 }}
            sm={{ span: 4, offset: 4 }}
            md={{ span: 4, offset: 4 }}
          >
            <Nav
              className="ml-auto justify-content-end"
              style={{ flexDirection: "row" }}
            >
              <NavDropdown title={<FaUser size={20} />} id="basic-nav-dropdown">
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
              <Nav.Item className="ms-2">
                <Nav.Link as={Link} to="/cart">
                  <div className="cart-icon">
                    <ShoppingIcon className="shopping-icon" />
                    <span className="item-count">{cartItems.length}</span>
                  </div>
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>

          <Col sm={{ span: 1, offset: 0 }}>
            <Navbar.Toggle
              aria-controls="basic-navbar-nav"
              className="float-end"
            />
            <Navbar.Collapse id="basic-navbar-nav" className="mx-auto">
              <Nav className="me-auto mx-auto">
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
              </Nav>
            </Navbar.Collapse>
          </Col>
        </Container>
      </Navbar>
    </div>
  );
}

export default Navigationbar;
