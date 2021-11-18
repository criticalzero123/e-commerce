import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import back from "../../../assets/BACK.mp4";

import Loading from "../../../components/Loading/Loading";

import {
  Container,
  Form,
  FloatingLabel,
  Col,
  Row,
  Alert,
  Button,
  Modal,
} from "react-bootstrap";
import { loginUser } from "../../../actions/userAction";

const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const loginreducer = useSelector((state) => state.loginReducer);

  const { error, loading } = loginreducer;

  const login = (e) => {
    e.preventDefault();
    const user = {
      username: username,
      password: password,
    };

    dispatch(loginUser(user));
  };

  useEffect(() => {
    if (localStorage.getItem("currentUser")) {
      window.location.href = "/";
    }
  }, []);

  return (
    <div>
      <Container>
        {error && <Alert variant="danger">Invalid Credentials</Alert>}
        {loading && (
          <Modal show={true}>
            <Modal.Body className="text-center">
              <Loading /> <br />
              Logging in...
            </Modal.Body>
          </Modal>
        )}
        <Row>
          <Col md={4}>
            <h1 className="mt-5">
              Hello, <br />
            </h1>
            <h1>Welcome Back</h1>
            <Form onSubmit={login} className="mt-5">
              <FloatingLabel
                controlId="floatingInputUsername"
                label="Username / Mobile No / Email"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  placeholder="Username"
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </FloatingLabel>

              <FloatingLabel
                controlId="floatingPassword"
                label="Password"
                className="mb-3"
              >
                <Form.Control
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </FloatingLabel>
              <p style={{ color: "gray" }}> Forget Password?</p>
              <div className="d-grid gap-2">
                <Button variant="outline-primary" type="submit" size="lg">
                  LOGIN
                </Button>
              </div>
              <p className="mt-5">
                Don't have an Account?{" "}
                <span
                  className="fw-bold"
                  style={{ cursor: "pointer" }}
                  onClick={() => (window.location.href = "/register")}
                >
                  Click Here!
                </span>
              </p>
            </Form>
          </Col>
          <Col md={8} className="align-items-center d-lg-flex d-none">
            <Row className="mt-5">
              <video autoPlay muted className="mt-5">
                <source src={back} type="video/mp4" />
              </video>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Signin;
