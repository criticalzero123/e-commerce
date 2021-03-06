import React from "react";
import StripeCheckout from "react-stripe-checkout";

import { Button, Modal } from "react-bootstrap";
import Loading from "../Loading/Loading";

import swal from "sweetalert";

import { useDispatch, useSelector } from "react-redux";
import { placeOrder } from "../../actions/orderAction";

const Checkout = ({ amount }) => {
  const dispatch = useDispatch();
  const orderstate = useSelector((state) => state.placeOrderReducer);
  const cartstate = useSelector((state) => state.cartReducer);

  const { loading, success, error, order } = orderstate;
  const { cartItems } = cartstate;

  const tokenHandler = (token) => {
    dispatch(placeOrder(token, amount));
  };

  const validate = () => {
    if (!localStorage.getItem("currentUser")) {
      window.location.href = "/login";
    }

    if (!cartItems.length > 0) {
      swal({
        title: "No Item Found!",
        text: "Your cart is empty, You want to go to shop?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          window.location.href = "/shop/all";
        }
      });
    }
  };

  if (success) {
    swal("Order Success", "Do You want to see your order info?", "success", {
      buttons: {
        cancel: "Cancel",
        Go: {
          text: "Okay",
          value: "go",
        },
      },
    }).then((value) => {
      switch (value) {
        case "go":
          window.location.href = `/orders/${order._id}`;
          break;

        case "cancel":
        default:
          window.location.reload();
          break;
      }
    });
  }

  return (
    <div>
      {error && <h1>error...</h1>}

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
            <h5 className="mt-1">Check Out</h5>
          </Button>
        </StripeCheckout>
      )}

      {loading && (
        <Modal show={true}>
          <Modal.Body className="text-center">
            <Loading /> <br />
            Please wait while we are confirming your payment.
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
};

export default Checkout;
