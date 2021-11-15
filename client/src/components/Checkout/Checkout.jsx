import React from "react";
import StripeCheckout from "react-stripe-checkout";

import { Button } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { placeOrder } from "../../actions/orderAction";
import Loading from "../Loading/Loading";

const Checkout = ({ amount }) => {
  const dispatch = useDispatch();
  const orderstate = useSelector((state) => state.placeOrderReducer);
  const cartstate = useSelector((state) => state.cartReducer);

  const { loading, success, error } = orderstate;
  const { cartItems } = cartstate;

  const tokenHandler = (token) => {
    dispatch(placeOrder(token, amount));
  };

  const validate = () => {
    if (!localStorage.getItem("currentUser")) {
      window.location.href = "/login";
    }

    if (!cartItems.length > 0) {
      alert("No item found in your cart");
    }
  };

  return (
    <div>
      {error && <h1>error...</h1>}
      {success && <h1>Success</h1>}
      {!cartItems.length > 0 ? (
        <Button
          onClick={validate}
          style={{ width: "100%", borderRadius: "40px", height: "3rem" }}
          variant="primary"
          className="mt-3 shadow"
        >
          <h5 className="mt-1">Check Out</h5>
        </Button>
      ) : (
        <StripeCheckout
          token={tokenHandler}
          name="Mathilda"
          amount={amount * 100}
          billingAddress
          shippingAddress
          currency="PHP"
          stripeKey="pk_test_51H4nyJL4yJIlpmX8YdYhwND9xFKXeWjML0s6ToNT5Ru2dzxaE6VMPs8TOp4qFlw78cYWesygUmchkWUOJLCxGfCP00bZyMFgy0"
        >
          <Button
            onClick={validate}
            style={{ width: "100%", borderRadius: "40px", height: "3rem" }}
            variant="primary"
            className="mt-3 shadow"
          >
            {loading && <Loading />}
            <h5 className="mt-1">Check Out</h5>
          </Button>
        </StripeCheckout>
      )}
    </div>
  );
};

export default Checkout;
