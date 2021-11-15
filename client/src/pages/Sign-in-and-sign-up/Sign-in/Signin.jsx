import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import {
  Container,
  Form,
  FloatingLabel,
  Col,
  Row,
  Button,
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
      <h1>Login</h1>
      <Container>
        {error && <h1>Invalid Credentials`</h1>}
        {loading && <h1>Loading</h1>}
        <Row>
          <Col>
            <Form onSubmit={login}>
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

              <Button type="submit">LOGIN</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Signin;
