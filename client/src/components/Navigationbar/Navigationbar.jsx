import React, { useState } from "react";

import {
  Nav,
  NavDropdown,
  Container,
  Navbar,
  Col,
  Offcanvas,
  Form,
  InputGroup,
  Accordion,
} from "react-bootstrap";

import { useSelector, useDispatch } from "react-redux";

import "./Navigationbar.scss";

import { FaUser, FaSearch } from "react-icons/fa";

import { Link } from "react-router-dom";
import { logoutUser } from "../../actions/userAction";

import { ReactComponent as Logo } from "../../assets/logo.svg";

import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";

function Navigationbar() {
  const _cartReducer = useSelector((state) => state.cartReducer);

  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

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

  var username = currentUser ? currentUser.username : "";

  return (
    <div>
      <Navbar bg="light" expand="lg" className="fixed-top">
        <Container>
          <Col>
            <Navbar.Brand as={Link} to="/">
              <Logo />
              athilda.
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
              <Nav.Item
                className="mt-1 me-4 d-none d-lg-block"
                onClick={() => setShowSearch(true)}
              >
                <InputGroup>
                  <InputGroup.Text
                    style={{
                      borderRadius: "20px",
                      position: "absolute",
                      zIndex: "99",
                      padding: "10px 12px ",
                      opacity: "40%",
                    }}
                  >
                    <FaSearch />
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="        Search"
                    required
                    style={{
                      borderRadius: "20px",
                      borderLeft: "-10px",
                    }}
                    onChange={(e) => {
                      setShowSearch(true);
                      setSearchQuery(e.target.value);
                    }}
                  />
                </InputGroup>
              </Nav.Item>
              <NavDropdown
                title={<FaUser size={20} />}
                id="basic-nav-dropdown"
                className="d-none d-lg-block"
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

              <Nav.Item className="mt-2 d-block d-lg-none">
                <FaSearch
                  size={18}
                  onClick={() => setShowSearch(true)}
                  style={{ cursor: "pointer" }}
                />
              </Nav.Item>

              <Nav.Item className="ms-1 ms-sm-2">
                <Nav.Link as={Link} to="/cart">
                  <div className="cart-icon">
                    <ShoppingIcon className="shopping-icon" />
                    <span className="item-count">{cartItems.length}</span>
                  </div>
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>

          {/* For smaller device */}
          <Col
            className="d-lg-none"
            sm={{ span: 1, offset: 0 }}
            md={{ span: 0, offset: 0 }}
            lg
          >
            <Navbar.Toggle aria-controls="offcanvasNavbar" />
            <Navbar.Offcanvas
              id="offcanvasNavbar"
              aria-labelledby="offcanvasNavbarLabel"
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id="offcanvasNavbarLabel">
                  Mathilda
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav>
                  <Nav.Link as={Link} to="/shop/all" className="ms-4">
                    Shop
                  </Nav.Link>
                  <Accordion flush>
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>Sports</Accordion.Header>
                      <Accordion.Body>
                        <Link
                          to="/shop/sports/running"
                          style={{ textDecoration: "none" }}
                        >
                          <p>Running</p>
                        </Link>
                        <hr />
                        <Link
                          to="/shop/sports/basketball"
                          style={{ textDecoration: "none" }}
                        >
                          <p>Basketball</p>
                        </Link>
                        <hr />

                        <Link
                          to="/shop/sports/tennis"
                          style={{ textDecoration: "none" }}
                        >
                          <p>Tennis</p>
                        </Link>
                        <hr />
                        <Link
                          to="/shop/sports/skateboarding"
                          style={{ textDecoration: "none" }}
                        >
                          <p>Skateboarding</p>
                        </Link>
                        <hr />
                        <Link
                          to="/shop/sports/snorkeling"
                          style={{ textDecoration: "none" }}
                        >
                          <p>Snorkeling</p>
                        </Link>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>

                  <Accordion flush>
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>Travels</Accordion.Header>
                      <Accordion.Body>
                        <Link
                          to="/shop/travels/tent"
                          style={{ textDecoration: "none" }}
                        >
                          <p>Tent</p>
                        </Link>
                        <hr />
                        <Link
                          to="/shop/travels/gloves"
                          style={{ textDecoration: "none" }}
                        >
                          <p>Gloves</p>
                        </Link>
                        <hr />

                        <Link
                          to="/shop/travels/jacket"
                          style={{ textDecoration: "none" }}
                        >
                          <p>Jacket</p>
                        </Link>
                        <hr />
                        <Link
                          to="/shop/travels/bag"
                          style={{ textDecoration: "none" }}
                        >
                          <p>Bag</p>
                        </Link>
                        <hr />
                        <Link
                          to="/shop/travels/boots"
                          style={{ textDecoration: "none" }}
                        >
                          <p>Boots</p>
                        </Link>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>

                  <Accordion flush>
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>
                        <FaUser size={20} /> {username}
                      </Accordion.Header>
                      <Accordion.Body>
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
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Col>
          {/* For Bigger device */}
          <Col className="d-none d-lg-block">
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
      {/* For the search */}

      <Offcanvas
        show={showSearch}
        onHide={() => setShowSearch(false)}
        placement="top"
        backdrop={true}
        className="h-100"
      >
        <Offcanvas.Header closeButton>
          <Col xs={{ span: 10, offset: 0 }} md={{ span: 6, offset: 3 }}>
            <InputGroup style={{ width: "50%" }} className="mx-auto w-100">
              <Form.Control
                type="text"
                placeholder="Search"
                required
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    window.location.href = `/shop/all/search/${searchQuery}`;
                  }
                }}
              />

              <InputGroup.Text
                onClick={() =>
                  (window.location.href = `/shop/all/search/${searchQuery}`)
                }
                style={{ cursor: "pointer" }}
              >
                <FaSearch />
              </InputGroup.Text>
            </InputGroup>
          </Col>
        </Offcanvas.Header>
        <Offcanvas.Body
          className="text-center"
          onClick={() => setShowSearch(false)}
        >
          <p className="mb-4">Popular Search Terms</p>

          <h6>
            <Link to="/shop/sports/basketball/61920fda7df53d583dc01172">
              Adidas Pro N3XT
            </Link>
          </h6>

          <h6>
            <Link to="/shop/sports/basketball/61808ea66d3b8c95d49d826b">
              Nike Precision IV shoes
            </Link>
          </h6>

          <h6>
            <Link to="/shop/sports/skateboarding/619246a381e768dab0c738b2">
              Vans Old School
            </Link>
          </h6>

          <h6>
            <Link to="/shop/travels/tent/6192567281e768dab0c738c9">
              Bessport Camping
            </Link>
          </h6>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}

export default Navigationbar;
