import React from "react";

import { Card } from "react-bootstrap";

import Checkout from "../../Checkout/Checkout";

const Paymentinfo = ({ cartItems }) => {
  var subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const numberWithCommas = (x) => {
    return "₱" + x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div>
      <Card className="shadow mt-5 p-2" style={{ borderRadius: "10px" }}>
        <Card.Body>
          <Card.Title>
            <h3>Payment Info.</h3>
          </Card.Title>
          <hr />
          <Card.Title>Order Summary</Card.Title>
          <div className="mt-4">
            {/* Items*/}
            <p className="mb-1" style={{ color: "gray" }}>
              Items ({cartItems.length}):{" "}
              <span className="float-end">{numberWithCommas(subtotal)}</span>
            </p>
            {/* Shipping  & Handling  Shipping = subtotal * 1%*/}
            <p className="mb-1" style={{ color: "gray" }}>
              Shipping & Handling:{" "}
              <span className="float-end">
                {numberWithCommas(Math.round(subtotal * 0.01))}
              </span>
            </p>
            {/* Before Tax */}
            <p className="mb-1" style={{ color: "gray" }}>
              Before tax:{" "}
              <span className="float-end">
                {numberWithCommas(Math.round(subtotal + subtotal * 0.01))}
              </span>
            </p>
            {/* Tax Collected Tax = subtotal * 10% */}
            <p className="mb-1" style={{ color: "gray" }}>
              Tax collected:{" "}
              <span className="float-end">
                {numberWithCommas(Math.round(subtotal * 0.1))}
              </span>
            </p>
            <hr />
            {/* Total Amount */}
            <p>
              Total Amount:{" "}
              <span className="float-end">
                {numberWithCommas(
                  Math.round(subtotal + subtotal * 0.01 + subtotal * 0.1)
                )}
              </span>
            </p>
          </div>

          <Checkout
            amount={Math.round(subtotal + subtotal * 0.01 + subtotal * 0.1)}
          />
          <p
            className="text-center mt-3"
            style={{ color: "gray", fontSize: "0.8rem" }}
          >
            By placing your order, you agree to our company Privacy Policy and
            Conditions of Use.
          </p>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Paymentinfo;
