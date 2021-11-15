import React from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  Container,
  Row,
  Col,
  Table,
  Image,
  Form,
  Button,
} from "react-bootstrap";
import { addToCart, deleteFromCart } from "../../actions/cartActions";
import { FaTimes } from "react-icons/fa";

import { FaChevronLeft } from "react-icons/fa";
import Paymentinfo from "../../components/Cart/PaymentInfo/Paymentinfo";

const numberWithCommas = (x) => {
  return "₱" + x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const Cart = () => {
  const cartreducerstate = useSelector((state) => state.cartReducer);

  const dispatch = useDispatch();

  const { cartItems } = cartreducerstate;

  return (
    <div>
      <Container fluid className="p-lg-5 pt-lg-0">
        <Row>
          <Col lg={8} md={6} className="mt-5">
            <h2>Shopping Cart.</h2>
            <Table hover responsive borderless className="mt-4">
              <thead>
                <tr style={{ borderBottom: "0.6px #C5C5C5 solid" }}>
                  <th colSpan={2}>Product</th>
                  <th>Size</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total Price</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item, index) => {
                  return (
                    <tr
                      key={index}
                      className="align-middle"
                      style={{ borderBottom: "0.6px #C5C5C5 solid" }}
                    >
                      <td>
                        <Image
                          src={item.image}
                          thumbnail
                          style={{ width: "5rem" }}
                        />
                      </td>
                      <td>
                        <span className="fw-bold">{item.name}</span>

                        <p style={{ color: "gray" }}>{item.color}</p>
                      </td>
                      <td>{item.size}</td>
                      <td>{numberWithCommas(item.price)}</td>
                      <td>
                        <Form.Select
                          value={item.quantity}
                          onChange={(e) =>
                            dispatch(
                              addToCart(
                                item,
                                e.target.value,
                                item.size,
                                item.stock,
                                item.color,
                                item.image
                              )
                            )
                          }
                          style={{ width: "4rem" }}
                        >
                          {[...Array(item.stock)].map((x, i) => (
                            <option value={i + 1} key={i}>
                              {i + 1}
                            </option>
                          ))}
                        </Form.Select>
                      </td>
                      <td>{numberWithCommas(item.quantity * item.price)} </td>
                      <td>
                        <p
                          onClick={() => dispatch(deleteFromCart(item))}
                          style={{ cursor: "pointer", color: "gray" }}
                          className="my-auto"
                        >
                          <FaTimes />
                        </p>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
            <Button
              variant="outline-secondary"
              className="px-4 "
              style={{
                borderRadius: "30px",
                padding: "0.7rem",
              }}
              onClick={() => (window.location.href = "/shop/all")}
            >
              <FaChevronLeft className="me-2 mb-1" />
              <b>Continue Shopping</b>
            </Button>
          </Col>

          <Col lg={4} md={6} className="p-5">
            <Paymentinfo cartItems={cartItems} />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Cart;
