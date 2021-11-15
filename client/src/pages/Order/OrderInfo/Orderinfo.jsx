import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getOrderById } from "../../../actions/orderAction";

import { Link } from "react-router-dom";

import {
  Container,
  Col,
  Row,
  Card,
  Button,
  Table,
  Image,
} from "react-bootstrap";

const Orderinfo = ({ match }) => {
  const dispatch = useDispatch();

  const orderstate = useSelector((state) => state.getOrderByIdReducer);

  const { order, loading, error } = orderstate;

  const numberWithCommas = (x) => {
    return "₱" + x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  useEffect(() => {
    dispatch(getOrderById(match.params.orderid));
  }, [dispatch, match.params.orderid]);

  return (
    <div>
      {error && <h1>Error...</h1>}
      {loading && <h1>Loading...</h1>}
      {order && (
        <div>
          <Container>
            <Row>
              <Col lg={8}>
                <div className="mt-lg-3">
                  <span style={{ fontWeight: "700" }}>
                    Order Number{" "}
                    <span style={{ color: "#9E2792" }}>#{order._id}</span>
                  </span>
                  <hr />
                  <Card>
                    <Card.Body>
                      <Table responsive borderless className="mt-4">
                        <thead>
                          <tr>
                            <th colSpan={2}>Product</th>
                            <th>Size</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total Price</th>
                          </tr>
                        </thead>
                        <tbody>
                          {order.orderItems.map((item, index) => {
                            return (
                              <tr
                                key={index}
                                className="align-middle"
                                style={{ borderTop: "0.6px #C5C5C5 solid" }}
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
                                <td>{item.quantity}</td>
                                <td>
                                  {numberWithCommas(item.quantity * item.price)}
                                </td>
                                <td> </td>
                                <td>
                                  <Link
                                    to={{
                                      pathname: `/shop/${item.category}/${item.subCategory}/${item._id}`,
                                      state: { review: true },
                                    }}
                                  >
                                    <Button variant="outline-warning">
                                      Give Review
                                    </Button>
                                  </Link>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </Table>
                    </Card.Body>
                  </Card>
                </div>
              </Col>
              <Col lg={4}>
                <Card style={{ borderRadius: "8px" }} className="mt-5 p-3 pt-1">
                  <Card.Body>
                    <Card.Title className="mt-2">
                      Order Details{" "}
                      <span className="float-end">
                        <Button
                          variant="light"
                          disabled
                          style={{
                            fontSize: "0.8rem ",
                            color: "#33194F",
                            fontWeight: "500",
                            backgroundColor: "#E2C7E2",
                          }}
                        >
                          {order.isDelivered ? "Delivered" : "On the way"}
                        </Button>
                      </span>
                    </Card.Title>
                    <br />
                    <Card.Text>
                      Transaction ID
                      <span className="float-end">{order.transactionId}</span>
                    </Card.Text>
                    <Card.Text>
                      Date of Order
                      <span className="float-end">
                        {order.createdAt.substring(0, 10)}
                      </span>
                    </Card.Text>
                    <Card.Text>
                      Total Amount
                      <span className="float-end">
                        {numberWithCommas(order.orderAmount)}
                      </span>
                    </Card.Text>
                  </Card.Body>
                </Card>

                <Card style={{ borderRadius: "8px" }} className="mt-3 p-3 pt-1">
                  <Card.Body>
                    <Card.Title className="mt-2">Shipping details</Card.Title>
                    <br />
                    <Card.Text>
                      Address Line
                      <span className="float-end">
                        {order.shippingAddress.address}
                      </span>
                    </Card.Text>
                    <Card.Text>
                      City
                      <span className="float-end">
                        {order.shippingAddress.city}
                      </span>
                    </Card.Text>
                    <Card.Text>
                      Zip code
                      <span className="float-end">
                        {order.shippingAddress.postalCode}
                      </span>
                    </Card.Text>
                    <Card.Text>
                      Country
                      <span className="float-end">
                        {order.shippingAddress.country}
                      </span>
                    </Card.Text>
                  </Card.Body>
                </Card>
                <hr />
                <Card style={{ borderRadius: "8px" }} className="p-3 pt-1">
                  <Card.Body>
                    <Card.Title>Replacement conditions</Card.Title>
                    <Card.Text>BLA BLA BLA</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      )}
    </div>
  );
};

export default Orderinfo;
