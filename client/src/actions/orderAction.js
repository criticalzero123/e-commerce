import axios from "axios";
export const placeOrder = (token, subTotal) => (dispatch, getState) => {
  const currentUser = getState().loginReducer.currentUser;
  const cartItems = getState().cartReducer.cartItems;

  dispatch({ type: "PLACE_ORDER_REQUEST" });

  axios
    .post("/api/orders/placeorder", { token, subTotal, currentUser, cartItems })
    .then((res) => {
      dispatch({ type: "PLACE_ORDER_SUCCESS", payload: res.data });
      localStorage.removeItem("cartItems");
    })
    .catch((err) => {
      dispatch({ type: "PLACE_ORDER_FAILED" });
    });
};

export const getOrdersByUserId = () => (dispatch, getState) => {
  const userid = getState().loginReducer.currentUser._id;

  dispatch({ type: "GET_ORDERS_BY_USER_ID_REQUEST" });

  axios
    .post("/api/orders/getordersbyuserid", { userid: userid })
    .then((res) => {
      dispatch({ type: "GET_ORDERS_BY_USER_ID_SUCCESS", payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: "GET_ORDERS_BY_USER_ID_FAILED", payload: err });
    });
};

export const getOrderById = (orderid) => (dispatch) => {
  dispatch({ type: "GET_ORDER_BY_ID_REQUEST" });

  axios
    .post("/api/orders/getorderbyid", { orderid: orderid })
    .then((res) => {
      dispatch({ type: "GET_ORDER_BY_ID_SUCCESS", payload: res.data });
      // console.log(res.data);
    })
    .catch((err) => {
      dispatch({ type: "GET_ORDER_BY__ID_FAILED", payload: err });
    });
};
