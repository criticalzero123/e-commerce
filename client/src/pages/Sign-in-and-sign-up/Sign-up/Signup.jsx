import React, { useState, useEffect } from "react";

import {
  Container,
  FloatingLabel,
  Form,
  Row,
  Col,
  Button,
} from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { registerNewUser } from "../../../actions/userAction";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthdate, setBirthdate] = useState(new Date());
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const registerstate = useSelector((state) => state.registerNewUserReducer);

  const { loading, error, success } = registerstate;

  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("currentUser")) {
      window.location.href = "/";
    }
  }, []);

  const register = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      const user = {
        first_name: firstName,
        last_name: lastName,
        birth_date: birthdate,
        gender: gender,
        email: email,
        password: password,
        mobile_number: contactNumber,
        username: username,
      };

      dispatch(registerNewUser(user));
    } else {
      alert("Password is not the same");
    }
  };

  return (
    <div>
      <Container>
        {loading && <h1>Loading...</h1>}
        {error && <h1>Account already been used</h1>}
        {success && <h1>Registration successful</h1>}
        <Row>
          <Form onSubmit={register}>
            <Col>
              <h1>Personal Information</h1>
              <Row>
                <Col>
                  <FloatingLabel
                    controlId="floatingInputFirstName"
                    label="First Name"
                    className="mb-3"
                  >
                    <Form.Control
                      type="text"
                      placeholder="First Name"
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                    />
                  </FloatingLabel>
                </Col>
                <Col>
                  <FloatingLabel
                    controlId="floatingInputLastName"
                    label="Last Name"
                    className="mb-3"
                  >
                    <Form.Control
                      type="text"
                      placeholder="Last Name"
                      onChange={(e) => setLastName(e.target.value)}
                      required
                    />
                  </FloatingLabel>
                </Col>
              </Row>
              <h1>Birthdate</h1>
              <DatePicker
                maxDate={new Date()}
                dateFormat="dd/MM/yyyy"
                selected={birthdate}
                onChange={(date) => setBirthdate(date)}
                required
              />

              <h1>Gender</h1>
              <Form.Group required>
                <Form.Check
                  inline
                  label="Male"
                  name="group1"
                  type="radio"
                  id="male"
                  onChange={(e) => setGender(e.target.id)}
                />
                <Form.Check
                  inline
                  label="Female"
                  name="group1"
                  type="radio"
                  id="female"
                  onChange={(e) => setGender(e.target.id)}
                />
                <Form.Check
                  inline
                  label="Other"
                  name="group1"
                  type="radio"
                  id="other"
                  onChange={(e) => setGender(e.target.id)}
                />
              </Form.Group>

              <h1>Contact Info</h1>
              <Row>
                <Col>
                  <FloatingLabel
                    controlId="floatingInputEmail"
                    label="Email"
                    className="mb-3"
                  >
                    <Form.Control
                      type="email"
                      placeholder="Email"
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </FloatingLabel>
                </Col>
                <Col>
                  <FloatingLabel
                    controlId="floatingInputContactNumber"
                    label="Mobile No."
                    className="mb-3"
                  >
                    <Form.Control
                      type="text"
                      placeholder="Mobile No."
                      onChange={(e) => setContactNumber(e.target.value)}
                      required
                    />
                  </FloatingLabel>
                </Col>
              </Row>

              <h1>LOGIN DETAILS</h1>
              <FloatingLabel
                controlId="floatingInputUsername"
                label="Username"
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

              <FloatingLabel
                controlId="floatingConfirmPassword"
                label="Confirm Password"
                className="mb-3"
              >
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </FloatingLabel>
            </Col>
            <Button type="submit">Register</Button>
          </Form>
        </Row>
      </Container>
    </div>
  );
};

export default Signup;
