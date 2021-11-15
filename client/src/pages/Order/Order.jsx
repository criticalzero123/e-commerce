import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Container, Col, Row, Table } from "react-bootstrap";
import { getOrdersByUserId } from "../../actions/orderAction";

import Loading from "../../components/Loading/Loading";

const Order = () => {
  const dispatch = useDispatch();

  const orderstate = useSelector((state) => state.getOrdersByUserIdReducer);

  const { orders, loading, error } = orderstate;

  useEffect(() => {
    if (localStorage.getItem("currentUser")) {
      dispatch(getOrdersByUserId());
    } else {
      window.location.href = "/login";
    }
  }, [dispatch]);

  const numberWithCommas = (x) => {
    return "₱" + x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div>
      {loading && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Loading />
        </div>
      )}

      <Container>
        <h1>MY ORDERS</h1>
        {error && <h1>Error</h1>}
        <Row>
          <Col>
            <Table responsive borderless hover>
              <thead>
                <tr>
                  <th>Order Number</th>
                  <th>Name</th>
                  <th>Date</th>
                  <th>Items</th>
                  <th>Total</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {error && <h1>Error</h1>}
                {orders &&
                  orders.map((order, index) => {
                    return (
                      <tr
                        key={index}
                        onClick={() =>
                          (window.location.href = `/orders/${order._id}`)
                        }
                        style={{ cursor: "pointer" }}
                      >
                        <td>{order._id}</td>
                        <td>{order.name}</td>
                        <td>{order.createdAt.substring(0, 10)}</td>
                        <td>{order.orderItems.length}</td>
                        <td>{numberWithCommas(order.orderAmount)}</td>
                        <td>
                          {order.idDelivered ? "Delivered" : "On Process"}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Order;
