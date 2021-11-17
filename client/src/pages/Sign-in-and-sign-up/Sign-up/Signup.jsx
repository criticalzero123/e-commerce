import React, { useState, useEffect } from "react";
import swal from "sweetalert";
import {
  Container,
  Form,
  Row,
  Col,
  Button,
  Card,
  InputGroup,
  Alert,
  Modal,
} from "react-bootstrap";

import moment from "moment";
import Loading from "../../../components/Loading/Loading";
import { useDispatch, useSelector } from "react-redux";

import DatePicker from "react-datepicker";

import { FaEye, FaEyeSlash } from "react-icons/fa";

import "react-datepicker/dist/react-datepicker.css";
import { registerNewUser } from "../../../actions/userAction";

var passwordValidator = require("password-validator");

// Create a schema
var schema = new passwordValidator();

schema
  .is()
  .min(8) // Minimum length 8
  .is()
  .max(50) // Maximum length 100
  .has()
  .uppercase() // Must have uppercase letters
  .has()
  .lowercase() // Must have lowercase letters
  .has()
  .digits() // Must have digits
  .has()
  .symbols(); // Must have symbol

const Signup = () => {
  const picture =
    "https://lh4.googleusercontent.com/fnDkiEprk3zMBaDho9fGbiig18a3mXMoHL-YcIoY6R_V3oaFM1-3lBl6drsOVJmCDsjxDKGvYZwkIPZrCZVvA1Rq8lLK5WMexEiewuVbv0XntH8jo9muvyHZDs1LRFTK6pMSkJ0QIg=w2400";

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthdate, setBirthdate] = useState(new Date());
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [passwordShow, setPasswordShow] = useState(false);
  const [confirmPasswordShow, setConfirmPasswordShow] = useState(false);

  const [errorPassword, setErrorPassword] = useState(false);
  const [errorConfirmPassword, setConfirmErrorPassword] = useState(false);
  const [dateError, setDateError] = useState(false);

  const [acceptTerm, setAcceptTerm] = useState(false);

  const registerstate = useSelector((state) => state.registerNewUserReducer);

  const { loading, error, success } = registerstate;

  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("currentUser")) {
      window.location.href = "/";
    }
  }, []);

  const isSameDay = (d1, d2) => {
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getDate() === d2.getDate() &&
      d1.getMonth() === d2.getMonth()
    );
  };

  const register = (e) => {
    e.preventDefault();

    if (isSameDay(birthdate, new Date())) {
      setDateError(true);
    } else {
      if (
        !errorPassword &&
        !errorConfirmPassword &&
        !dateError &&
        acceptTerm &&
        confirmPassword === password
      ) {
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
      }
    }
  };

  if (loading) {
    <Modal show={true}>
      <Modal.Body className="text-center">
        <Loading /> <br />
        Please wait while we are confirming your payment.
      </Modal.Body>
    </Modal>;
  }

  // if the registration is success
  if (success) {
    swal(
      "Account Registered Successfully",
      "Do you want to Login?",
      "success",
      {
        buttons: {
          cancel: "Cancel",
          Go: {
            text: "Okay",
            value: "go",
          },
        },
      }
    ).then((value) => {
      switch (value) {
        case "go":
          window.location.href = `/login`;
          break;

        case "cancel":
        default:
          window.location.reload();
          break;
      }
    });
  }

  const birthdateValidation = (birthDate) => {
    var dateTime = moment(birthDate).format("YYYY/MM/DD");
    var today = new Date();
    var _birthdate = new Date(dateTime);

    var age = today.getFullYear() - _birthdate.getFullYear();
    var month = today.getMonth() - _birthdate.getMonth();

    if (month < 0 || (month === 0 && today.getDate() < _birthdate.getDate())) {
      age--;
    }

    return age;
  };

  return (
    <div>
      {error && <Alert variant="danger">Account Already Registered</Alert>}
      <Container>
        <Row>
          <Col md={6} className="p-3">
            <Form onSubmit={register}>
              <h4>Personal Information</h4>
              <Row>
                <Col>
                  <Form.Control
                    type="text"
                    placeholder="First Name"
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    className="mb-3"
                  />
                </Col>
                <Col>
                  <Form.Control
                    type="text"
                    placeholder="Last Name"
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    className="mb-3"
                  />
                </Col>
              </Row>
              <h4 className="mt-2">Birthdate</h4>
              <DatePicker
                maxDate={new Date()}
                dateFormat="dd/MM/yyyy"
                selected={birthdate}
                onChange={(date) => {
                  if (birthdateValidation(date) < 18) {
                    setDateError(true);
                  } else {
                    setDateError(false);
                    setBirthdate(date);
                  }
                }}
                placeholderText="DD/MM/YYYY"
                showYearDropdown
                scrollableMonthYearDropdown
                fixedHeight
                required
              />
              {dateError && (
                <Alert variant="danger">Age must be above 18</Alert>
              )}
              <h4 className="mt-4">Gender</h4>
              <Form.Group>
                <Form.Check
                  inline
                  label="Male"
                  name="group1"
                  type="radio"
                  id="male"
                  onChange={(e) => setGender(e.target.id)}
                  required
                />
                <Form.Check
                  inline
                  label="Female"
                  name="group1"
                  type="radio"
                  id="female"
                  onChange={(e) => setGender(e.target.id)}
                  required
                />
                <Form.Check
                  inline
                  label="Other"
                  name="group1"
                  type="radio"
                  id="other"
                  onChange={(e) => setGender(e.target.id)}
                  required
                />
              </Form.Group>
              <h4 className="mt-4">Contact Info</h4>
              <Row>
                <Col>
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="mb-3"
                  />
                </Col>
                <Col>
                  <Form.Control
                    onKeyPress={(event) => {
                      if (!/[0-9]/.test(event.key)) {
                        event.preventDefault();
                      }
                    }}
                    type="text"
                    placeholder="Mobile No."
                    onChange={(e) => setContactNumber(e.target.value)}
                    className="mb-3"
                    required
                  />
                </Col>
              </Row>
              <h4 className="mt-3">LOGIN DETAILS</h4>
              <Form.Control
                type="text"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
                required
                className="mb-3"
              />

              <InputGroup className="mb-3">
                <Form.Control
                  type={passwordShow ? "text" : "password"}
                  placeholder="Password"
                  onChange={(e) => {
                    if (!schema.validate(e.target.value)) {
                      setErrorPassword(true);
                    } else {
                      setErrorPassword(false);
                    }
                    setPassword(e.target.value);
                  }}
                  isInvalid={
                    (password !== "" && errorPassword) ||
                    confirmPassword !== password
                  }
                  isValid={password !== "" && !errorPassword}
                  required
                />
                <InputGroup.Text
                  onClick={() => setPasswordShow(!passwordShow)}
                  style={{ cursor: "pointer" }}
                >
                  {passwordShow ? <FaEyeSlash /> : <FaEye />}
                </InputGroup.Text>

                <Form.Control.Feedback type="invalid">
                  {confirmPassword !== password
                    ? "Password is not the same"
                    : "Password must have (Uppercase, Lowercase, Number and Special Character) and must be a 8 characters or more"}
                </Form.Control.Feedback>

                <Form.Control.Feedback type="valid">
                  Looks Good!
                </Form.Control.Feedback>
              </InputGroup>

              <InputGroup className="mb-3">
                <Form.Control
                  type={confirmPasswordShow ? "text" : "password"}
                  placeholder="Confirm Password"
                  onChange={(e) => {
                    if (!schema.validate(e.target.value)) {
                      setConfirmErrorPassword(true);
                    } else {
                      setConfirmErrorPassword(false);
                    }
                    setConfirmPassword(e.target.value);
                  }}
                  isInvalid={
                    (confirmPassword !== "" && errorConfirmPassword) ||
                    confirmPassword !== password
                  }
                  isValid={confirmPassword !== "" && !errorConfirmPassword}
                  required
                />
                <InputGroup.Text
                  onClick={() => setConfirmPasswordShow(!confirmPasswordShow)}
                  style={{ cursor: "pointer" }}
                >
                  {confirmPasswordShow ? <FaEyeSlash /> : <FaEye />}
                </InputGroup.Text>
                <Form.Control.Feedback type="invalid">
                  {confirmPassword !== password
                    ? "Password is not the same"
                    : "Password must have (Uppercase, Lowercase, Number and Special Character) and must be a 8 characters or more"}
                </Form.Control.Feedback>

                <Form.Control.Feedback type="valid">
                  Looks Good!
                </Form.Control.Feedback>
              </InputGroup>
              <Form.Check
                type="checkbox"
                label="I have read and accepted the Terms & Conditions and the Privacy Policy."
                className="mb-4"
                onClick={() => setAcceptTerm(!acceptTerm)}
                isInvalid={
                  !acceptTerm &&
                  !errorPassword &&
                  !errorConfirmPassword &&
                  !dateError &&
                  confirmPassword === password &&
                  password !== "" &&
                  confirmPassword !== ""
                }
                feedback="Please Accept the terms and condition!"
                feedbackType="invalid"
              />
              <Button type="submit">Register</Button>
            </Form>
          </Col>
          <Col md={6} className="d-flex align-items-center d-md-flex d-sm-none">
            <Card className="border-0 ">
              <Card.Img variant="top" src={picture} />
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Signup;
